import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import { Colors } from '../constants/Colors';
import { Spacing } from '../constants/Spacing';
import { Typography } from '../constants/Typography';
import { NavbarGlass } from '../components/NavbarGlass';
import { ButtonPrimary } from '../components/ButtonPrimary';
import { Ionicons } from '@expo/vector-icons';
import { CardGlass } from '../components/CardGlass';
import { t } from '../i18n';

export default function SelectVideoScreen() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const pickVideo = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'video/*',
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        return;
      }

      const asset = result.assets[0];
      
      // Navigate to detail with asset info
      router.push({
        pathname: '/video-detail',
        params: { 
          uri: asset.uri,
          name: asset.name,
          size: asset.size,
          mimeType: asset.mimeType
        }
      });
      
    } catch (err) {
      setError('selectVideo.error');
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <NavbarGlass title={t('selectVideo.title')} showBack />
      
      <View style={styles.content}>
        <CardGlass style={styles.card}>
          <View style={styles.iconContainer}>
            <Ionicons name="videocam" size={64} color={Colors.dark.primary} />
          </View>
          <Text style={styles.title}>{t('selectVideo.chooseTitle')}</Text>
          <Text style={styles.description}>
            {t('selectVideo.chooseDesc')}
          </Text>
          
          <ButtonPrimary 
            title={t('selectVideo.browseButton')} 
            onPress={pickVideo}
            style={styles.button}
            icon={<Ionicons name="folder-open" size={24} color={Colors.dark.text} />}
          />
        </CardGlass>

        {error && (
          <Text style={styles.error}>{t('selectVideo.error')}</Text>
        )}
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
    flex: 1,
    justifyContent: 'center',
    padding: Spacing.l,
  },
  card: {
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.l,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: Spacing.radius.round,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.s,
    borderWidth: 1,
    borderColor: Colors.dark.primary,
  },
  title: {
    fontSize: Typography.size.xl,
    fontWeight: '700',
    color: Colors.dark.text,
    textAlign: 'center',
  },
  description: {
    fontSize: Typography.size.m,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
    lineHeight: Typography.lineHeight.m,
  },
  button: {
    minWidth: 200,
    marginTop: Spacing.m,
  },
  error: {
    color: Colors.dark.error,
    textAlign: 'center',
    marginTop: Spacing.m,
  },
});
