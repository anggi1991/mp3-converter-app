import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AudioExtractor from '../modules/react-native-audio-extractor/src';
import * as FileSystem from 'expo-file-system/legacy';
import { HistoryService } from '../services/HistoryService';
import { Colors } from '../constants/Colors';
import { Spacing } from '../constants/Spacing';
import { Typography } from '../constants/Typography';
import { NavbarGlass } from '../components/NavbarGlass';
import { ProgressNeon } from '../components/ProgressNeon';
import { CardGlass } from '../components/CardGlass';
import { WaveformPlaceholder } from '../components/WaveformPlaceholder';
import { t } from '../i18n';

export default function ConvertScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { uri, name, bitrate } = params;
  
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState(t('convert.initializing'));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    startConversion();
  }, []);

  const startConversion = async () => {
    try {
      setStatus(t('convert.preparing'));
      
      // Create output directory if not exists
      const outputDir = ((FileSystem as any).documentDirectory || '') + 'converted/';
      const dirInfo = await FileSystem.getInfoAsync(outputDir);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(outputDir);
      }

      // Clean filename
      const safeName = (name as string).replace(/\.[^/.]+$/, "").replace(/[^a-z0-9]/gi, '_');
      const outputUri = outputDir + safeName + '.m4a'; // Native module outputs M4A

      setStatus(t('convert.converting'));
      
      // Parse bitrate value
      const bitrateStr = Array.isArray(bitrate) ? bitrate[0] : (bitrate || '192k');
      const bitrateNum = parseInt(bitrateStr.replace('k', ''), 10);

      console.log('Starting native audio extraction...');
      console.log('Input:', uri);
      console.log('Output:', outputUri);
      console.log('Bitrate:', bitrateNum);

      setStatus(t('convert.extracting'));
      setProgress(0.3);
      
      // Extract thumbnail (best effort)
      let thumbnailUri = null;
      try {
        thumbnailUri = await AudioExtractor.getThumbnail(uri as string);
        console.log('Thumbnail extracted:', thumbnailUri);
      } catch (thumbErr) {
        console.warn('Failed to extract thumbnail:', thumbErr);
      }

      const result = await AudioExtractor.extract({
        videoUri: uri as string,
        outputUri,
        bitrate: bitrateNum,
      });
      
      console.log('Extraction result:', result);
      
      // Save to Recent Conversions
      try {
        await HistoryService.addOrUpdate({
          id: Date.now().toString(),
          name: safeName + '.m4a',
          uri: outputUri,
          date: new Date().toISOString(),
          size: result.size || 0,
          duration: 0,
          thumbnailUri: thumbnailUri || undefined
        });
      } catch (e) {
        console.error('Failed to save recent conversion:', e);
      }

      setStatus(t('convert.finalizing'));
      setProgress(1);
      
      // Navigate to result
      setTimeout(() => {
        router.replace({
          pathname: '/result',
          params: { 
            outputUri: result.outputUri, 
            originalName: safeName + '.m4a', // Pass the new name
            bitrate: bitrateStr,
            thumbnailUri: thumbnailUri || ''
          }
        });
      }, 500);

    } catch (err) {
      console.error('Extraction error:', err);
      const errorMessage = err instanceof Error ? err.message : t('convert.failed');
      setError(errorMessage);
      setStatus(t('convert.failed'));
    }
  };

  return (
    <View style={styles.container}>
      <NavbarGlass title={t('convert.converting')} />
      
      <View style={styles.content}>
        <CardGlass style={styles.card}>
          <WaveformPlaceholder active={true} />
          
          <Text style={styles.status}>{status}</Text>
          
          <ProgressNeon progress={progress} indeterminate={progress === 0} />
          
          {error && <Text style={styles.error}>{error}</Text>}
          
          <Text style={styles.hint}>
            {t('convert.keepOpen')}
          </Text>
        </CardGlass>
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
    gap: Spacing.xl,
  },
  status: {
    fontSize: Typography.size.l,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  error: {
    color: Colors.dark.error,
    marginTop: Spacing.s,
  },
  hint: {
    fontSize: Typography.size.s,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
  },
});
