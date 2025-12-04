import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
// ... (existing imports)

// ... (existing code)


import { useRouter } from 'expo-router';
import * as FileSystem from 'expo-file-system/legacy';
import { Audio } from 'expo-av';
import * as Sharing from 'expo-sharing';
import { Colors } from '../constants/Colors';
import { Spacing } from '../constants/Spacing';
import { Typography } from '../constants/Typography';
import { NavbarGlass } from '../components/NavbarGlass';
import { CardGlass } from '../components/CardGlass';
import { Ionicons } from '@expo/vector-icons';
import { t } from '../i18n';
import { useFocusEffect } from 'expo-router';

import { HistoryService, HistoryItem } from '../services/HistoryService';

interface AudioFile {
  name: string;
  uri: string;
  size?: number;
  date?: string;
  duration?: string;
  artist?: string;
  album?: string;
  thumbnailUri?: string;
}

export default function LibraryScreen() {
  const router = useRouter();
  const [files, setFiles] = useState<AudioFile[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<AudioFile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [playingUri, setPlayingUri] = useState<string | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      loadFiles();
      return () => {
        if (sound) sound.unloadAsync();
      };
    }, [])
  );

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredFiles(files);
    } else {
      setFilteredFiles(files.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase())));
    }
  }, [searchQuery, files]);

  const loadFiles = async () => {
    const dir = ((FileSystem as any).documentDirectory || '') + 'converted/';
    const dirInfo = await FileSystem.getInfoAsync(dir);
    
    if (dirInfo.exists) {
      const fileList = await FileSystem.readDirectoryAsync(dir);
      const history = await HistoryService.getRecents();
      
      const audioFiles = await Promise.all(fileList
        .filter(f => f.endsWith('.mp3') || f.endsWith('.m4a'))
        .map(async f => {
          const uri = dir + f;
          const info = await FileSystem.getInfoAsync(uri);
          const historyItem = history.find(h => h.uri === uri || h.name === f);
          
          return {
            name: f,
            uri: uri,
            size: info.exists ? info.size : 0,
            date: info.exists ? new Date(info.modificationTime * 1000).toLocaleDateString() : t('common.unknown'),
            artist: historyItem?.artist,
            album: historyItem?.album,
            thumbnailUri: historyItem?.thumbnailUri
          };
        }));
      
      const sortedFiles = audioFiles.reverse();
      setFiles(sortedFiles);
      setFilteredFiles(sortedFiles);
    }
  };

  const playFile = async (uri: string) => {
    try {
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
        setPlayingUri(null);
      }

      if (playingUri !== uri) {
        const { sound: newSound } = await Audio.Sound.createAsync({ uri });
        setSound(newSound);
        setPlayingUri(uri);
        await newSound.playAsync();
        
        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            setPlayingUri(null);
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const shareFile = async (uri: string) => {
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri);
    }
  };

  const deleteFile = async (uri: string) => {
    await FileSystem.deleteAsync(uri);
    loadFiles();
  };

  const renderItem = ({ item, index }: { item: AudioFile, index: number }) => {
    // Native Ad Placeholder
    if (index === 2) {
      return (
        <View style={styles.adContainer}>
          <CardGlass style={styles.adCard}>
            <Text style={styles.adLabel}>{t('library.adLabel')}</Text>
            <Text style={styles.adText}>{t('library.adText')}</Text>
          </CardGlass>
        </View>
      );
    }

    const isPlaying = playingUri === item.uri;

    return (
      <CardGlass style={styles.fileCard}>
        <View style={styles.cardHeader}>
          {/* Cover Art or Waveform */}
          <View style={styles.thumbnailContainer}>
            {item.thumbnailUri ? (
              <Image source={{ uri: item.thumbnailUri }} style={styles.thumbnail} />
            ) : (
              <View style={styles.waveformPlaceholder}>
                 <View style={styles.waveformBar} />
                 <View style={[styles.waveformBar, { height: '60%' }]} />
                 <View style={[styles.waveformBar, { height: '80%' }]} />
                 <View style={[styles.waveformBar, { height: '40%' }]} />
                 <View style={[styles.waveformBar, { height: '70%' }]} />
              </View>
            )}
          </View>

          <View style={styles.fileInfo}>
            <Text style={styles.fileName} numberOfLines={1}>{item.name}</Text>
            
            {/* Metadata Row */}
            {(item.artist || item.album) && (
              <Text style={styles.fileArtist} numberOfLines={1}>
                {item.artist || t('common.unknown')} {item.album ? `• ${item.album}` : ''}
              </Text>
            )}

            <View style={styles.metaRow}>
              <Text style={styles.fileMeta}>192 kbps</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.fileMeta}>{item.size ? (item.size / 1024 / 1024).toFixed(1) + ' MB' : t('common.unknown')}</Text>
            </View>
            <Text style={styles.fileDate}>{item.date || t('common.unknown')}</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.playButton}
            onPress={() => playFile(item.uri)}
          >
            <Ionicons name={isPlaying ? "pause" : "play"} size={16} color="#FFF" />
            <Text style={styles.playText}>{t('library.play')}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.iconButton} onPress={() => router.push({ pathname: '/tag-editor', params: { uri: item.uri } })}>
            <Ionicons name="create-outline" size={18} color={Colors.dark.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.iconButton} onPress={() => shareFile(item.uri)}>
            <Ionicons name="share-social-outline" size={18} color={Colors.dark.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.iconButton} onPress={() => deleteFile(item.uri)}>
            <Ionicons name="trash-outline" size={18} color={Colors.dark.error} />
          </TouchableOpacity>
        </View>
      </CardGlass>
    );
  };

  return (
    <View style={styles.container}>
      <NavbarGlass title={t('library.title')} showBack />
      
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={Colors.dark.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={t('library.searchPlaceholder')}
          placeholderTextColor={Colors.dark.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredFiles}
        renderItem={renderItem}
        keyExtractor={item => item.uri}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>{t('library.empty')}</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  searchContainer: {
    marginHorizontal: Spacing.l,
    marginTop: Spacing.xxl * 3, // Increased to ensure it clears the header completely
    marginBottom: Spacing.m,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: Spacing.radius.l,
    paddingHorizontal: Spacing.m,
    height: 48,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  searchIcon: {
    marginRight: Spacing.s,
  },
  searchInput: {
    flex: 1,
    color: Colors.dark.text,
    fontSize: Typography.size.m,
  },
  list: {
    padding: Spacing.l,
    paddingTop: Spacing.s,
    gap: Spacing.m,
    paddingBottom: 100,
  },
  fileCard: {
    padding: Spacing.m,
    gap: Spacing.m,
  },
  cardHeader: {
    flexDirection: 'row',
    gap: Spacing.m,
  },
  waveformContainer: {
    width: 56,
    height: 56,
    borderRadius: Spacing.radius.m,
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 2,
    paddingBottom: 12,
    overflow: 'hidden',
  },
  waveformBar: {
    width: 4,
    height: '40%',
    backgroundColor: Colors.dark.primary,
    borderRadius: 2,
  },
  fileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  fileName: {
    fontSize: Typography.size.m,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  fileMeta: {
    fontSize: Typography.size.xs,
    color: Colors.dark.textSecondary,
  },
  dot: {
    fontSize: Typography.size.xs,
    color: Colors.dark.textSecondary,
    marginHorizontal: 4,
  },
  thumbnailContainer: {
    width: 56,
    height: 56,
    borderRadius: Spacing.radius.m,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  waveformPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 2,
    paddingBottom: 12,
  },
  fileArtist: {
    fontSize: Typography.size.s,
    color: Colors.dark.textSecondary,
    marginBottom: 2,
  },

  fileDate: {
    fontSize: Typography.size.xs,
    color: Colors.dark.textSecondary,
    opacity: 0.7,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.s,
    marginTop: Spacing.xs,
  },
  playButton: {
    flex: 1,
    height: 36,
    backgroundColor: Colors.dark.primary,
    borderRadius: Spacing.radius.m,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.s,
  },
  playText: {
    color: '#FFF',
    fontSize: Typography.size.s,
    fontWeight: '600',
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: Spacing.radius.m,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  adContainer: {
    marginBottom: Spacing.m,
  },
  adCard: {
    padding: Spacing.m,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  adLabel: {
    fontSize: Typography.size.xs,
    color: Colors.dark.warning,
    fontWeight: '700',
    marginBottom: 4,
  },
  adText: {
    color: Colors.dark.text,
  },
  empty: {
    alignItems: 'center',
    marginTop: Spacing.xxl,
  },
  emptyText: {
    color: Colors.dark.textSecondary,
  },
});
