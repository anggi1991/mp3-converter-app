import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Video to MP3 Converter",
  slug: "videomp3converter",
  scheme: "videomp3converter",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  newArchEnabled: true,
  splash: {
    image: "./assets/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.shinigami91.videomp3converter",
    infoPlist: {
      NSUserTrackingUsageDescription:
        "This identifier will be used to deliver personalized ads to you.",
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    package: "com.shinigami91.videomp3converter",
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  plugins: [
    "expo-router",
    [
      "react-native-google-mobile-ads",
      {
        androidAppId:
          process.env.EXPO_PUBLIC_ADMOB_APP_ID_ANDROID ||
          "ca-app-pub-3940256099942544~3347511713",
        iosAppId:
          process.env.EXPO_PUBLIC_ADMOB_APP_ID_IOS ||
          "ca-app-pub-3940256099942544~1458002511",
      },
    ],
    [
      "expo-build-properties",
      {
        android: {
          kotlinVersion: "2.0.20",
          packagingOptions: {
            pickFirsts: [
              "lib/**/libreact_native_modules.so",
              "lib/**/libreactnative.so",
              "lib/**/libreactnativejni.so",
              "lib/**/libfbjni.so",
            ],
          },
        },
      },
    ],
  ],
});
