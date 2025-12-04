import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { initializeI18n } from '../i18n';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { AdService } from '../services/AdService';
import { IAPService } from '../services/IAPService';

export default function RootLayout() {
  // Initialize i18n with auto-detect
  useEffect(() => {
    initializeI18n();
    AdService.init();
    IAPService.init();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.dark.background },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="select-video" options={{ presentation: 'modal' }} />
        <Stack.Screen name="video-detail" />
        <Stack.Screen name="convert" options={{ gestureEnabled: false }} />
        <Stack.Screen name="result" />
        <Stack.Screen name="tag-editor" />
        <Stack.Screen name="library" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="premium" options={{ presentation: 'modal' }} />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
});
