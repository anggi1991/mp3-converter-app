import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../constants/Colors';
import { Spacing } from '../constants/Spacing';
import { Typography } from '../constants/Typography';
import { ButtonPrimary } from '../components/ButtonPrimary';
import { ButtonOutline } from '../components/ButtonOutline';
import { CardGlass } from '../components/CardGlass';
import { Ionicons } from '@expo/vector-icons';
import { t } from '../i18n';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { AdService } from '../services/AdService';

interface RecentFile {
  id: string;
  name: string;
  uri: string;
  date: string;
}

export default function HomeScreen() {
  const router = useRouter();
  const [recentFiles, setRecentFiles] = React.useState<RecentFile[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      loadRecents();
    }, [])
  );

  const loadRecents = async () => {
    try {
      const json = await AsyncStorage.getItem('recent_conversions');
      if (json) {
        setRecentFiles(JSON.parse(json));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.dark.primary, Colors.dark.background]}
        style={styles.background}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.4 }}
      />
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.greeting}>{t('home.title')}</Text>
          <Text style={styles.subtitle}>{t('home.subtitle')}</Text>
        </View>

        <CardGlass style={styles.mainCard}>
          <View style={styles.cardContent}>
            <View style={styles.iconContainer}>
              <Ionicons name="musical-notes" size={48} color={Colors.dark.secondary} />
            </View>
            <Text style={styles.cardTitle}>{t('home.startConversion')}</Text>
            <Text style={styles.cardDescription}>
              {t('home.startDesc')}
            </Text>
            <ButtonPrimary 
              title={t('home.browseFiles')}
              onPress={() => router.push('/select-video')}
              icon={<Ionicons name="folder-open-outline" size={24} color={Colors.dark.text} />}
            />
          </View>
        </CardGlass>

        <View style={styles.actions}>
          <ButtonOutline 
            title={t('home.libraryButton')} 
            onPress={() => router.push('/library')}
            style={styles.actionButton}
            icon={<Ionicons name="library-outline" size={20} color={Colors.dark.text} />}
          />
          <ButtonOutline 
            title={t('home.settingsButton')} 
            onPress={() => router.push('/settings')}
            style={styles.actionButton}
            icon={<Ionicons name="settings-outline" size={20} color={Colors.dark.text} />}
          />
        </View>

        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>{t('home.recentConversions')}</Text>
          {recentFiles.length > 0 ? (
            recentFiles.map((file) => (
              <CardGlass key={file.id} style={styles.recentCard}>
                <View style={styles.recentIcon}>
                  <Ionicons name="musical-note" size={24} color={Colors.dark.primary} />
                </View>
                <View style={styles.recentInfo}>
                  <Text style={styles.recentName} numberOfLines={1}>{file.name}</Text>
                  <Text style={styles.recentDate}>
                    {new Date(file.date).toLocaleDateString()}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => router.push({
                  pathname: '/result',
                  params: { outputUri: file.uri, originalName: file.name }
                })}>
                  <Ionicons name="play-circle" size={32} color={Colors.dark.text} />
                </TouchableOpacity>
              </CardGlass>
            ))
          ) : (
            <CardGlass style={styles.emptyState}>
              <Text style={styles.emptyText}>{t('home.noConversions')}</Text>
            </CardGlass>
          )}
        </View>
      </ScrollView>

      <View style={{ alignItems: 'center', marginVertical: 10 }}>
        <BannerAd
          unitId={AdService.bannerId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 400,
  },
  content: {
    padding: Spacing.l,
    paddingTop: Spacing.xxl * 2,
    gap: Spacing.xl,
  },
  header: {
    marginBottom: Spacing.m,
  },
  greeting: {
    fontSize: Typography.size.display,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  subtitle: {
    fontSize: Typography.size.l,
    color: Colors.dark.textSecondary,
    marginTop: Spacing.xs,
  },
  mainCard: {
    padding: 0, // Reset padding as we'll use inner container
  },
  cardContent: {
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.m,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: Spacing.radius.round,
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.s,
    marginHorizontal: 'auto',
  },
  cardTitle: {
    fontSize: Typography.size.xl,
    fontWeight: '600',
    color: Colors.dark.text,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: Typography.size.m,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.m,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.m,
  },
  actionButton: {
    flex: 1,
  },
  recentSection: {
    gap: Spacing.m,
  },
  sectionTitle: {
    fontSize: Typography.size.l,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  emptyState: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    color: Colors.dark.textSecondary,
  },
  recentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.m,
    gap: Spacing.m,
  },
  recentIcon: {
    width: 40,
    height: 40,
    borderRadius: Spacing.radius.s,
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentInfo: {
    flex: 1,
  },
  recentName: {
    fontSize: Typography.size.m,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 2,
  },
  recentDate: {
    fontSize: Typography.size.xs,
    color: Colors.dark.textSecondary,
  },
});
