import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { HistoryService } from '../services/HistoryService';
import { Colors } from '../constants/Colors';
import { Spacing } from '../constants/Spacing';
import { Typography } from '../constants/Typography';
import { Shadow } from '../constants/Shadow';
import { NavbarGlass } from '../components/NavbarGlass';
import { ButtonPrimary } from '../components/ButtonPrimary';
import { ButtonOutline } from '../components/ButtonOutline';
import { CardGlass } from '../components/CardGlass';
import { AlertModal } from '../components/AlertModal';
import { Ionicons } from '@expo/vector-icons';
import { t } from '../i18n';

export default function ResultScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { outputUri, originalName } = params;
  const [sound, setSound] = useState<Audio.Sound>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentName, setCurrentName] = useState(originalName as string);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(originalName as string);

  // Alert State
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: '',
    message: '',
    type: 'info' as 'success' | 'error' | 'info' | 'warning',
    buttons: undefined as any
  });

  const showAlert = (title: string, message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', buttons?: any) => {
    setAlertConfig({ title, message, type, buttons });
    setAlertVisible(true);
  };

  useEffect(() => {
    checkFile();
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const checkFile = async () => {
    try {
      const info = await FileSystem.getInfoAsync(outputUri as string);
      if (!info.exists) {
        showAlert(
          t('common.error'),
          t('result.fileNotFound'),
          'error',
          [{ text: 'OK', onPress: () => router.back() }]
        );
      }
    } catch (e) {
      console.error('Error checking file:', e);
    }
  };

  const playSound = async () => {
    try {
      if (sound) {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          if (isPlaying) {
            await sound.pauseAsync();
            setIsPlaying(false);
          } else {
            await sound.playAsync();
            setIsPlaying(true);
          }
        } else {
          // Sound exists but unloaded, recreate
          setSound(undefined);
          await createAndPlaySound();
        }
      } else {
        await createAndPlaySound();
      }
    } catch (error) {
      console.error('Error playing sound', error);
      showAlert('Error', 'Unable to play audio.', 'error');
    }
  };

  const createAndPlaySound = async () => {
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: outputUri as string },
        { shouldPlay: true }
      );
      setSound(newSound);
      setIsPlaying(true);
      
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlaying(false);
          newSound.setPositionAsync(0);
        }
      });
    } catch (error) {
      console.error('Error creating sound', error);
      throw error;
    }
  };

  const handleShare = async () => {
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(outputUri as string);
    }
  };

  const handleEditTags = () => {
    router.push({
      pathname: '/tag-editor',
      params: { 
        uri: outputUri, 
        name: originalName,
        thumbnailUri: params.thumbnailUri 
      }
    });
  };

  const handleHome = () => {
    router.dismissAll();
  };

  const handleRename = async () => {
    if (!newName.trim()) return;
    
    try {
      const dir = outputUri?.toString().substring(0, outputUri.toString().lastIndexOf('/') + 1);
      const newUri = dir + newName.trim();
      
      await FileSystem.moveAsync({
        from: outputUri as string,
        to: newUri
      });
      
      // Update history
      await HistoryService.updateItem(outputUri as string, newUri, newName.trim());

      setCurrentName(newName.trim());
      setIsRenaming(false);
      showAlert('Success', 'File renamed successfully', 'success');
    } catch (error) {
      showAlert('Error', 'Failed to rename file', 'error');
    }
  };

  return (
    <View style={styles.container}>
     <NavbarGlass 
        title={t('result.success')}
        rightAction={
          <Ionicons name="close" size={24} color={Colors.dark.text} onPress={handleHome} />
        }
      />
      
      <View style={styles.content}>
        <View style={styles.successIcon}>
          <Ionicons name="checkmark-circle" size={80} color={Colors.dark.success} />
        </View>
        
        <Text style={styles.title}>{t('result.success')}</Text>
        
        {isRenaming ? (
          <View style={styles.renameContainer}>
            <TextInput
              style={styles.renameInput}
              value={newName}
              onChangeText={setNewName}
              autoFocus
              selectTextOnFocus
            />
            <Ionicons name="checkmark-circle" size={32} color={Colors.dark.primary} onPress={handleRename} />
          </View>
        ) : (
          <View style={styles.nameContainer}>
            <Text style={styles.subtitle}>{currentName}</Text>
            <Ionicons 
              name="pencil" 
              size={20} 
              color={Colors.dark.textSecondary} 
              onPress={() => setIsRenaming(true)}
              style={styles.editIcon}
            />
          </View>
        )}

        <CardGlass style={styles.playerCard}>
          <ButtonPrimary 
            title={isPlaying ? t('result.pause') : t('result.preview')}
            onPress={playSound}
            icon={<Ionicons name={isPlaying ? "pause" : "play"} size={24} color={Colors.dark.text} />}
            style={styles.playButton}
          />
        </CardGlass>

        <View style={styles.actions}>
          <ButtonOutline 
            title={t('result.editTags')}
            onPress={handleEditTags}
            icon={<Ionicons name="pricetag-outline" size={20} color={Colors.dark.text} />}
          />
          <ButtonOutline 
            title={t('result.shareFile')}
            onPress={handleShare}
            icon={<Ionicons name="share-social-outline" size={20} color={Colors.dark.text} />}
          />
          <ButtonOutline 
            title={t('result.setRingtone')}
            onPress={() => showAlert('Coming Soon', 'Ringtone feature is coming soon!', 'info')}
            icon={<Ionicons name="notifications-outline" size={20} color={Colors.dark.text} />}
          />
        </View>
        
        <ButtonPrimary 
          title={t('result.convertAnother')}
          onPress={handleHome}
          style={styles.homeButton}
        />
      </View>

      <AlertModal 
        visible={alertVisible}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
        buttons={alertConfig.buttons}
        onClose={() => setAlertVisible(false)}
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
    flex: 1,
    padding: Spacing.l,
    paddingTop: Spacing.xxl * 2,
    alignItems: 'center',
    gap: Spacing.l,
  },
  successIcon: {
    marginBottom: Spacing.s,
    ...Shadow.glow(Colors.dark.success),
  },
  title: {
    fontSize: Typography.size.xl,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.s,
    marginBottom: Spacing.m,
  },
  subtitle: {
    fontSize: Typography.size.m,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
  },
  editIcon: {
    opacity: 0.8,
  },
  renameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.s,
    marginBottom: Spacing.m,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: Spacing.radius.s,
    paddingHorizontal: Spacing.s,
  },
  renameInput: {
    color: Colors.dark.text,
    fontSize: Typography.size.m,
    padding: Spacing.s,
    minWidth: 200,
  },
  playerCard: {
    width: '100%',
    padding: Spacing.l,
    alignItems: 'center',
  },
  playButton: {
    width: '100%',
  },
  actions: {
    width: '100%',
    gap: Spacing.m,
  },
  homeButton: {
    marginTop: 'auto',
    width: '100%',
    backgroundColor: 'transparent',
  },
});
