import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AudioExtractor from '../modules/react-native-audio-extractor/src';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system/legacy';
import { HistoryService } from '../services/HistoryService';
import { Colors } from '../constants/Colors';
import { Spacing } from '../constants/Spacing';
import { Typography } from '../constants/Typography';
import { NavbarGlass } from '../components/NavbarGlass';
import { ButtonPrimary } from '../components/ButtonPrimary';
import { CardGlass } from '../components/CardGlass';
import { AlertModal } from '../components/AlertModal';
import { Ionicons } from '@expo/vector-icons';
import { t } from '../i18n';

export default function TagEditorScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { uri, name, thumbnailUri } = params;

  // Handle name being string or array
  const initialName = Array.isArray(name) ? name[0] : name;
  const initialTitle = initialName?.replace(/\.(mp3|m4a)$/i, '') || '';

  const [title, setTitle] = useState(initialTitle);
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [coverUri, setCoverUri] = useState<string | null>((thumbnailUri as string) || null);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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

  // Load existing metadata
  React.useEffect(() => {
    const loadMetadata = async () => {
      if (!uri) return;
      try {
        // 1. Try to get from HistoryService first (most reliable for app-specific data like cover)
        const history = await HistoryService.getRecents();
        const historyItem = history.find(h => h.uri === uri || h.name === name);

        if (historyItem) {
          if (historyItem.artist) setArtist(historyItem.artist);
          if (historyItem.album) setAlbum(historyItem.album);
          if (historyItem.thumbnailUri) setCoverUri(historyItem.thumbnailUri);
          
          // If title is different from filename, use it (optional logic, but filename usually reflects title)
          // For now, we rely on filename parsing for title unless we store title explicitly in history separate from name
        }

        // 2. Fallback/Augment with native metadata
        const metadata = await AudioExtractor.getMetadata(uri as string);
        if (metadata.title && !title) setTitle(metadata.title); // Only set if not already set (though parsing usually handles it)
        if (metadata.artist && !artist && !historyItem?.artist) setArtist(metadata.artist);
        if (metadata.album && !album && !historyItem?.album) setAlbum(metadata.album);
        
      } catch (e) {
        console.log('Failed to load metadata:', e);
      }
    };
    loadMetadata();
  }, [uri]);

  const pickCover = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'image/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setCoverUri(result.assets[0].uri);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const saveTags = async () => {
    try {
      setIsSaving(true);
      
      const inputUri = uri as string;

      console.log('Saving tags:', { title, artist, album });
      console.log('File:', inputUri);

      // Use native module to edit tags
      const result = await AudioExtractor.editTags(
        inputUri,
        title || null,
        artist || null,
        album || null
      );

      console.log('Tag editing result:', result);

      // Rename file if title changed
      let finalUri = inputUri;
      const originalNameStr = Array.isArray(name) ? name[0] : name;
      
      if (title && title !== originalNameStr?.replace(/\.(mp3|m4a)$/i, '')) {
        try {
          const dir = inputUri.substring(0, inputUri.lastIndexOf('/') + 1);
          const safeName = title.replace(/[^a-z0-9]/gi, '_') + '.m4a';
          const newUri = dir + safeName;
          
          await FileSystem.moveAsync({
            from: inputUri,
            to: newUri
          });
          
          finalUri = newUri;
          await HistoryService.updateItem(inputUri, newUri, safeName, coverUri || undefined, artist, album);
          console.log('File renamed to:', safeName);
        } catch (renameErr) {
          console.warn('Failed to rename file after tagging:', renameErr);
        }
      } else {
        // If name didn't change, still update cover/metadata in history
        await HistoryService.updateItem(inputUri, inputUri, title + '.m4a', coverUri || undefined, artist, album);
      }
      
      setIsSaving(false);
      setShowSuccessModal(true);

    } catch (err) {
      console.error('Tag editing error:', err);
      setIsSaving(false);
      showAlert(
        t('tagEditor.error'),
        (err instanceof Error ? err.message : 'Unknown error'),
        'error'
      );
    }
  };

  return (
    <View style={styles.container}>
      <NavbarGlass title={t('tagEditor.title')} showBack />
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.coverSection}>
          <TouchableOpacity onPress={pickCover}>
            <CardGlass style={styles.coverCard}>
              {coverUri ? (
                <Image source={{ uri: coverUri }} style={styles.coverImage} />
              ) : (
                <View style={styles.placeholderCover}>
                  <Ionicons name="image-outline" size={40} color={Colors.dark.textSecondary} />
                  <Text style={styles.coverText}>{t('tagEditor.addCover')}</Text>
                </View>
              )}
            </CardGlass>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('tagEditor.titleLabel')}</Text>
            <CardGlass style={styles.inputCard}>
              <TextInput 
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder={t('tagEditor.titlePlaceholder')}
                placeholderTextColor={Colors.dark.textSecondary}
              />
            </CardGlass>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('tagEditor.artistLabel')}</Text>
            <CardGlass style={styles.inputCard}>
              <TextInput 
                style={styles.input}
                value={artist}
                onChangeText={setArtist}
                placeholder={t('tagEditor.artistPlaceholder')}
                placeholderTextColor={Colors.dark.textSecondary}
              />
            </CardGlass>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('tagEditor.albumLabel')}</Text>
            <CardGlass style={styles.inputCard}>
              <TextInput 
                style={styles.input}
                value={album}
                onChangeText={setAlbum}
                placeholder={t('tagEditor.albumPlaceholder')}
                placeholderTextColor={Colors.dark.textSecondary}
              />
            </CardGlass>
          </View>
        </View>
      </ScrollView>

      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent
        animationType="fade"
        onRequestClose={() => {}}
      >
        <View style={styles.modalOverlay}>
          <CardGlass style={styles.modalCard}>
            <View style={styles.modalContent}>
              <View style={styles.successIcon}>
                <Ionicons name="checkmark" size={56} color={Colors.dark.success} />
              </View>
              <Text style={styles.modalTitle}>{t('tagEditor.success')}</Text>
              <ButtonPrimary 
                title={t('common.ok')}
                onPress={() => {
                  setShowSuccessModal(false);
                  router.back();
                }}
                style={{ minWidth: 120, alignSelf: 'center' }}
              />
            </View>
          </CardGlass>
        </View>
      </Modal>

      <AlertModal 
        visible={alertVisible}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
        buttons={alertConfig.buttons}
        onClose={() => setAlertVisible(false)}
      />

      <View style={styles.footer}>
        <ButtonPrimary 
          title={isSaving ? t('tagEditor.saving') : t('tagEditor.saveButton')}
          onPress={saveTags}
          disabled={isSaving}
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
    gap: Spacing.xl,
  },
  coverSection: {
    alignItems: 'center',
  },
  coverCard: {
    width: 160,
    height: 160,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  placeholderCover: {
    alignItems: 'center',
    gap: Spacing.s,
  },
  coverText: {
    color: Colors.dark.textSecondary,
    fontSize: Typography.size.s,
  },
  form: {
    gap: Spacing.m,
  },
  inputGroup: {
    gap: Spacing.xs,
  },
  label: {
    color: Colors.dark.textSecondary,
    fontSize: Typography.size.s,
    marginLeft: Spacing.s,
  },
  inputCard: {
    padding: 0,
  },
  input: {
    padding: Spacing.m,
    color: Colors.dark.text,
    fontSize: Typography.size.m,
  },
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.l,
  },
  modalCard: {
    width: '80%',
    maxWidth: 300,
    backgroundColor: Colors.dark.surface,
    padding: 0, // Reset padding as CardGlass adds some, but we control it via modalContent if needed
  },
  modalContent: {
    alignItems: 'center',
    gap: Spacing.xl, // Increased spacing
    padding: Spacing.m,
    width: '100%',
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(16, 185, 129, 0.15)', // Slightly more visible
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  modalTitle: {
    fontSize: Typography.size.l,
    fontWeight: '700',
    color: Colors.dark.text,
    textAlign: 'center',
    lineHeight: 28,
  },
});
