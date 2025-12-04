import I18n from "i18n-js";
import { getLocales } from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

import en from "./en.json";
import id from "./id.json";

// Bind translations
I18n.translations = {
  en,
  id,
};

// Set the locale once at the beginning of your app
const deviceLocales = getLocales();
I18n.locale = deviceLocales[0]?.languageCode || "en";

// Enable fallback to English if translation missing
I18n.fallbacks = true;
I18n.defaultLocale = "en";

// Storage key
const LANGUAGE_KEY = "@app_language";

/**
 * Initialize i18n with stored or system language
 */
export const initializeI18n = async () => {
  try {
    // Check if user has manually set a language
    const storedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);

    if (storedLanguage) {
      I18n.locale = storedLanguage;
    } else {
      // Auto-detect from device
      const locales = getLocales();
      const deviceLanguage = locales[0]?.languageCode || "en";

      // If Indonesian, use Indonesian. Otherwise, default to English
      if (deviceLanguage === "id" || deviceLanguage.startsWith("id")) {
        I18n.locale = "id";
      } else {
        I18n.locale = "en";
      }
    }
  } catch (error) {
    console.error("Failed to initialize i18n:", error);
    I18n.locale = "en";
  }
};

/**
 * Change language and persist
 */
export const changeLanguage = async (languageCode: "en" | "id") => {
  try {
    I18n.locale = languageCode;
    await AsyncStorage.setItem(LANGUAGE_KEY, languageCode);
  } catch (error) {
    console.error("Failed to change language:", error);
  }
};

/**
 * Get current language
 */
export const getCurrentLanguage = (): string => {
  return I18n.locale;
};

/**
 * Translation function
 */
export const t = (key: string, options?: object): string => {
  return I18n.t(key, options);
};

export default I18n;
