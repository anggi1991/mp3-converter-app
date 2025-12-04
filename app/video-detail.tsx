import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { Spacing } from '../constants/Spacing';
import { Typography } from '../constants/Typography';
import { NavbarGlass } from '../components/NavbarGlass';
import { ButtonPrimary } from '../components/ButtonPrimary';
import { CardGlass } from '../components/CardGlass';
import { ButtonOutline } from '../components/ButtonOutline';
import { Ionicons } from '@expo/vector-icons';
import { t } from '../i18n';

const BITRATES = [
  { label: '96 kbps', value: '96k', key: '96k' },
  { label: '128 kbps', value: '128k', key: '128k' },
  { label: '192 kbps', value: '192k', key: '192k' },
  { label: '320 kbps', value: '320k', key: '320k', locked: true },
];

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function VideoDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [selectedBitrate, setSelectedBitrate] = useState('192k');

  useEffect(() => {
    loadDefaultBitrate();
  }, []);

  const loadDefaultBitrate = async () => {
    try {
      const saved = await AsyncStorage.getItem('defaultBitrate');
      if (saved) {
        setSelectedBitrate(saved);
      }
    } catch (e) {
      console.error('Failed to load default bitrate', e);
    }
  };
  const [showAdPrompt, setShowAdPrompt] = useState(false);

  const { uri, name, size } = params;

  const formatSize = (bytes: number) => {
    if (!bytes) return 'Unknown size';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  const handleConvert = () => {
    router.push({
      pathname: '/convert',
      params: { ...params, bitrate: selectedBitrate }
    });
  };

  const handleBitrateSelect = (value: string, locked: boolean) => {
    if (locked) {
      setShowAdPrompt(true);
      return;
    }
    setSelectedBitrate(value);
  };

  const handleUnlock = () => {
    alert('Simulating Ad... Unlocked 320kbps!');
    setShowAdPrompt(false);
    setSelectedBitrate('320k');
  };

  return (
    <View style={styles.container}>
      <NavbarGlass title={t('videoDetail.title')} showBack />
      
      {/* Ad Prompt Modal */}
      {showAdPrompt && (
        <View style={styles.modalOverlay}>
          <CardGlass style={styles.modalCard}>
            <Ionicons name="diamond" size={48} color={Colors.dark.accent} />
            <Text style={styles.modalTitle}>{t('videoDetail.unlockTitle')}</Text>
            <Text style={styles.modalDesc}>
              {t('videoDetail.unlockDesc')}
            </Text>
            <View style={styles.modalActions}>
              <ButtonOutline 
                title={t('videoDetail.noThanks')}
                onPress={() => setShowAdPrompt(false)} 
                style={{ flex: 1 }}
              />
              <ButtonPrimary 
                title={t('videoDetail.watchAd')}
                onPress={handleUnlock} 
                style={{ flex: 1 }}
                icon={<Ionicons name="play-circle" size={20} color={Colors.dark.text} />}
              />
            </View>
          </CardGlass>
        </View>
      )}
      
      <ScrollView contentContainerStyle={styles.content}>
        {/* Selected Video Info */}
        <Text style={styles.sectionTitle}>{t('videoDetail.selectedVideo')}</Text>
        <CardGlass style={styles.fileCard}>
          <View style={styles.fileIcon}>
            <Ionicons name="videocam" size={32} color={Colors.dark.secondary} />
          </View>
          <View style={styles.fileInfo}>
            <Text style={styles.fileName} numberOfLines={1}>{name}</Text>
            <Text style={styles.fileSize}>{formatSize(Number(size))}</Text>
          </View>
        </CardGlass>

        {/* Output Format Info - Premium Feature */}
        <CardGlass style={styles.featureCard}>
          <View style={styles.featureHeader}>
            <Ionicons name="sparkles" size={20} color={Colors.dark.primary} />
            <Text style={styles.featureTitle}>{t('videoDetail.premiumOutput')}</Text>
          </View>
          <Text style={styles.featureDesc}>
            • {t('videoDetail.benefits.quality')}{'\n'}
            • {t('videoDetail.benefits.size')}{'\n'}
            • {t('videoDetail.benefits.compatibility')}
          </Text>
        </CardGlass>

        {/* Bitrate Selection */}
        <Text style={styles.sectionTitle}>{t('videoDetail.audioQuality')}</Text>
        <View style={styles.bitrateList}>
          {BITRATES.map((option) => (
            <TouchableOpacity 
              key={option.value} 
              onPress={() => handleBitrateSelect(option.value, option.locked || false)}
              activeOpacity={0.8}
            >
              <CardGlass 
                style={[
                  styles.bitrateCard, 
                  selectedBitrate === option.value && styles.bitrateCardSelected
                ]}
              >
                <View style={styles.bitrateHeader}>
                  <View style={styles.labelContainer}>
                    <Text style={[
                      styles.bitrateLabel,
                      selectedBitrate === option.value && styles.textSelected
                    ]}>
                      {option.label}
                    </Text>
                    {option.locked && selectedBitrate !== option.value && (
                      <Ionicons name="lock-closed" size={16} color={Colors.dark.accent} style={{ marginLeft: 8 }} />
                    )}
                  </View>
                  {selectedBitrate === option.value && (
                    <Ionicons name="checkmark-circle" size={24} color={Colors.dark.primary} />
                  )}
                </View>
                <Text style={styles.bitrateDesc}>{t(`videoDetail.bitrates.${option.key}`)}</Text>
              </CardGlass>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Footer CTA */}
      <View style={styles.footer}>
        <ButtonPrimary 
          title={t('videoDetail.extractButton')}
          onPress={handleConvert}
          icon={<Ionicons name="flash" size={24} color={Colors.dark.text} />}
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
  content: {
    padding: Spacing.l,
    paddingTop: Spacing.xxl * 2 + Spacing.m,
    paddingBottom: 100,
    gap: Spacing.m,
  },
  sectionTitle: {
    fontSize: Typography.size.m,
    fontWeight: '600',
    color: Colors.dark.textSecondary,
    marginTop: Spacing.s,
    marginBottom: Spacing.xs,
  },
  
  // File Card
  fileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.m,
    gap: Spacing.m,
  },
  fileIcon: {
    width: 48,
    height: 48,
    borderRadius: Spacing.radius.m,
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: Typography.size.m,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 4,
  },
  fileSize: {
    fontSize: Typography.size.s,
    color: Colors.dark.textSecondary,
  },

  // Feature Card (M4A Info)
  featureCard: {
    padding: Spacing.m,
    borderWidth: 1,
    borderColor: Colors.dark.primary,
    backgroundColor: 'rgba(99, 102, 241, 0.05)',
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  featureTitle: {
    fontSize: Typography.size.m,
    fontWeight: '700',
    color: Colors.dark.primary,
  },
  featureDesc: {
    fontSize: Typography.size.s,
    color: Colors.dark.textSecondary,
    lineHeight: 20,
  },
  
  // Bitrate Selection
  bitrateList: {
    gap: Spacing.s,
  },
  bitrateCard: {
    padding: Spacing.m,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  bitrateCardSelected: {
    borderColor: Colors.dark.primary,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  bitrateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bitrateLabel: {
    fontSize: Typography.size.l,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  textSelected: {
    color: Colors.dark.primary,
  },
  bitrateDesc: {
    fontSize: Typography.size.s,
    color: Colors.dark.textSecondary,
  },
  
  // Modal
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 1000,
    justifyContent: 'center',
    padding: Spacing.l,
  },
  modalCard: {
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.m,
    backgroundColor: Colors.dark.surface,
  },
  modalTitle: {
    fontSize: Typography.size.xl,
    fontWeight: '700',
    color: Colors.dark.text,
    textAlign: 'center',
  },
  modalDesc: {
    fontSize: Typography.size.m,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.s,
  },
  modalActions: {
    flexDirection: 'row',
    gap: Spacing.m,
    width: '100%',
  },
  
  // Footer
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.l,
    paddingBottom: Spacing.xl,
    backgroundColor: Colors.dark.background,
    borderTopWidth: 1,
    borderTopColor: Colors.dark.border,
  },
});
