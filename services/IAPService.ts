import Purchases, {
  PurchasesOffering,
  PurchasesPackage,
} from "react-native-purchases";
import { Platform } from "react-native";

// Replace with your actual RevenueCat API Keys
const API_KEYS = {
  apple: "appl_placeholder", // Add iOS key if needed
  google: process.env.EXPO_PUBLIC_REVENUECAT_API_KEY || "goog_placeholder",
};

export const IAPService = {
  init: async () => {
    try {
      if (Platform.OS === "android") {
        await Purchases.configure({ apiKey: API_KEYS.google });
      } else {
        await Purchases.configure({ apiKey: API_KEYS.apple });
      }
    } catch (e) {
      console.log("IAP Init Error:", e);
    }
  },

  getOfferings: async (): Promise<PurchasesOffering | null> => {
    try {
      const offerings = await Purchases.getOfferings();
      if (offerings.current !== null) {
        return offerings.current;
      }
    } catch (e) {
      console.log("Error fetching offerings:", e);
    }
    return null;
  },

  purchasePackage: async (pack: PurchasesPackage) => {
    try {
      const { customerInfo } = await Purchases.purchasePackage(pack);
      if (typeof customerInfo.entitlements.active["premium"] !== "undefined") {
        return true; // Unlock content
      }
    } catch (e: any) {
      if (!e.userCancelled) {
        console.log("Purchase error:", e);
      }
    }
    return false;
  },

  restorePurchases: async () => {
    try {
      const customerInfo = await Purchases.restorePurchases();
      if (typeof customerInfo.entitlements.active["premium"] !== "undefined") {
        return true;
      }
    } catch (e) {
      console.log("Restore error:", e);
    }
    return false;
  },

  checkSubscription: async () => {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      return typeof customerInfo.entitlements.active["premium"] !== "undefined";
    } catch (e) {
      return false;
    }
  },
};
