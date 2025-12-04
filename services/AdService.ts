import {
  MobileAds,
  InterstitialAd,
  AdEventType,
  TestIds,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : process.env.EXPO_PUBLIC_ADMOB_INTERSTITIAL_ID || "ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyy";

let interstitial: InterstitialAd | null = null;
let isLoaded = false;

export const AdService = {
  init: async () => {
    await MobileAds().initialize();
    AdService.loadInterstitial();
  },

  loadInterstitial: () => {
    if (interstitial) return;

    interstitial = InterstitialAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: true,
    });

    interstitial.addAdEventListener(AdEventType.LOADED, () => {
      isLoaded = true;
    });

    interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      isLoaded = false;
      interstitial = null;
      AdService.loadInterstitial(); // Reload for next time
    });

    interstitial.load();
  },

  showInterstitial: async (): Promise<boolean> => {
    if (isLoaded && interstitial) {
      try {
        await interstitial.show();
        return true;
      } catch (error) {
        console.error("Ad show failed", error);
        return false;
      }
    }
    return false;
  },

  bannerId: __DEV__ ? TestIds.BANNER : process.env.EXPO_PUBLIC_ADMOB_BANNER_ID || "ca-app-pub-xxxxxxxxxxxxx/zzzzzzzzzz",
};
