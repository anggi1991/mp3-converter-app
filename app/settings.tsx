import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity, Linking, Platform } from 'react-native';

import { Colors } from '../constants/Colors';
import { Spacing } from '../constants/Spacing';
import { Typography } from '../constants/Typography';
import { NavbarGlass } from '../components/NavbarGlass';
import { CardGlass } from '../components/CardGlass';
import { Ionicons } from '@expo/vector-icons';
import { t, changeLanguage, getCurrentLanguage } from '../i18n';
import { useRouter } from 'expo-router';
import { LanguageModal } from '../components/LanguageModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BitrateModal } from '../components/BitrateModal';

export default function SettingsScreen() {
  const router = useRouter();

  const [currentLang, setCurrentLang] = useState('en');
  const [showLangModal, setShowLangModal] = useState(false);
  const [defaultBitrate, setDefaultBitrate] = useState('192k');
  const [showBitrateModal, setShowBitrateModal] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const lang = getCurrentLanguage();
    setCurrentLang(lang);
    
    try {
      const savedBitrate = await AsyncStorage.getItem('defaultBitrate');
      if (savedBitrate) {
        setDefaultBitrate(savedBitrate);
      }
    } catch (e) {
      console.error('Failed to load settings', e);
    }
  };

  const handleBitrateSelect = async (bitrate: string) => {
    try {
      await AsyncStorage.setItem('defaultBitrate', bitrate);
      setDefaultBitrate(bitrate);
      setShowBitrateModal(false);
    } catch (e) {
      console.error('Failed to save bitrate', e);
    }
  };

  const handleRateApp = () => {
    const packageName = 'com.shinigami91.videomp3converter'; // From app.json
    const url = Platform.select({
      android: `market://details?id=${packageName}`,
      ios: `itms-apps://itunes.apple.com/app/id${packageName}`, // Placeholder for iOS
      default: `https://play.google.com/store/apps/details?id=${packageName}`,
    });

    Linking.canOpenURL(url as string).then(supported => {
      if (supported) {
        Linking.openURL(url as string);
      } else {
        Linking.openURL(`https://play.google.com/store/apps/details?id=${packageName}`);
      }
    }).catch(err => console.error('An error occurred', err));
  };

  const handleLanguageSelect = async (lang: 'en' | 'id') => {
    setShowLangModal(false);
    if (lang !== currentLang) {
      await changeLanguage(lang);
      setCurrentLang(lang);
      // Reload to apply changes
      router.replace('/'); 
      setTimeout(() => {
        router.push('/settings');
      }, 100);
    }
  };

  return (
    <View style={styles.container}>
      <NavbarGlass title={t('home.settingsButton')} showBack />
      
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>{t('settings.premium')}</Text>
        <CardGlass style={styles.card}>
          <TouchableOpacity style={styles.row} onPress={() => router.push('/premium')}>
            <View style={styles.rowIcon}>
              <Ionicons name="diamond" size={24} color={Colors.dark.accent} />
            </View>
            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>{t('settings.removeAds')}</Text>
              <Text style={styles.rowDesc}>{t('settings.removeAdsDesc')}</Text>
            </View>
            <Text style={styles.price}>$2.99</Text>
          </TouchableOpacity>
          
          <View style={styles.divider} />

          <TouchableOpacity style={styles.row} onPress={() => router.push('/premium')}>
            <View style={styles.rowIcon}>
              <Ionicons name="star" size={24} color={Colors.dark.accent} />
            </View>
            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>{t('settings.highQuality')}</Text>
              <Text style={styles.rowDesc}>{t('settings.highQualityDesc')}</Text>
            </View>
            <Ionicons name="lock-closed" size={20} color={Colors.dark.textSecondary} />
          </TouchableOpacity>
        </CardGlass>

        <Text style={styles.sectionTitle}>{t('settings.preferences')}</Text>
        <CardGlass style={styles.card}>
          <View style={styles.row}>
            <View style={styles.rowIcon}>
              <Ionicons name="moon" size={24} color={Colors.dark.secondary} />
            </View>
            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>{t('settings.darkMode')}</Text>
              <Text style={styles.rowDesc}>{t('settings.alwaysOn')}</Text>
            </View>
            <Switch 
              value={true} 
              onValueChange={() => {}}
              disabled={true}
              trackColor={{ false: '#767577', true: Colors.dark.primary }}
              thumbColor={Colors.dark.text}
              style={{ opacity: 0.5 }}
            />
          </View>
          
          <View style={styles.divider} />

          <TouchableOpacity style={styles.row} onPress={() => setShowLangModal(true)}>
            <View style={styles.rowIcon}>
              <Ionicons name="language" size={24} color={Colors.dark.secondary} />
            </View>
            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>{t('settings.language')}</Text>
              <Text style={styles.rowDesc}>
                {currentLang === 'en' ? 'English' : 'Bahasa Indonesia'}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.dark.textSecondary} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.row} onPress={() => setShowBitrateModal(true)}>
            <View style={styles.rowIcon}>
              <Ionicons name="options" size={24} color={Colors.dark.secondary} />
            </View>
            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>{t('settings.defaultBitrate')}</Text>
              <Text style={styles.rowDesc}>{defaultBitrate.replace('k', ' kbps')}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.dark.textSecondary} />
          </TouchableOpacity>
        </CardGlass>

        <Text style={styles.sectionTitle}>{t('settings.about')}</Text>
        <CardGlass style={styles.card}>


          <TouchableOpacity style={styles.row} onPress={() => router.push('/privacy-policy')}>
            <View style={styles.rowIcon}>
              <Ionicons name="shield-checkmark-outline" size={24} color={Colors.dark.secondary} />
            </View>
            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>{t('settings.privacyPolicy')}</Text>
            </View>
            <Ionicons name="open-outline" size={20} color={Colors.dark.textSecondary} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.row} onPress={handleRateApp}>
            <View style={styles.rowIcon}>
              <Ionicons name="star-outline" size={24} color={Colors.dark.secondary} />
            </View>
            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>{t('settings.rateApp')}</Text>
              <Text style={styles.rowDesc}>{t('settings.rateAppDesc')}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.dark.textSecondary} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={styles.rowIcon}>
              <Ionicons name="information-circle-outline" size={24} color={Colors.dark.secondary} />
            </View>
            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>{t('settings.version')}</Text>
            </View>
            <Text style={styles.version}>1.0.0</Text>
          </View>
        </CardGlass>
      </ScrollView>

      <LanguageModal 
        visible={showLangModal}
        onClose={() => setShowLangModal(false)}
        onSelect={handleLanguageSelect}
        currentLang={currentLang}
      />

      <BitrateModal
        visible={showBitrateModal}
        onClose={() => setShowBitrateModal(false)}
        onSelect={handleBitrateSelect}
        currentBitrate={defaultBitrate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  content: {
    padding: Spacing.l,
    paddingTop: Spacing.xxl * 2 + Spacing.m,
    gap: Spacing.m,
  },
  sectionTitle: {
    fontSize: Typography.size.m,
    fontWeight: '600',
    color: Colors.dark.textSecondary,
    marginTop: Spacing.s,
  },
  card: {
    padding: Spacing.m,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.s,
  },
  rowIcon: {
    width: 40,
    alignItems: 'center',
    marginRight: Spacing.s,
  },
  rowContent: {
    flex: 1,
  },
  rowTitle: {
    fontSize: Typography.size.m,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  rowDesc: {
    fontSize: Typography.size.s,
    color: Colors.dark.textSecondary,
  },
  price: {
    fontSize: Typography.size.m,
    fontWeight: '700',
    color: Colors.dark.primary,
  },
  version: {
    color: Colors.dark.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.dark.border,
    marginVertical: Spacing.s,
  },
});
