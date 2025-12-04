import AsyncStorage from "@react-native-async-storage/async-storage";

export interface HistoryItem {
  id: string;
  name: string;
  uri: string;
  date: string;
  size: number;
  duration: number;
  thumbnailUri?: string;
  artist?: string;
  album?: string;
}

const STORAGE_KEY = "recent_conversions";
const MAX_ITEMS = 50; // Increased limit to hold more history for library matching

export const HistoryService = {
  async getRecents(): Promise<HistoryItem[]> {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      return json ? JSON.parse(json) : [];
    } catch (e) {
      console.error("Failed to load history:", e);
      return [];
    }
  },

  async addOrUpdate(item: HistoryItem) {
    try {
      const recents = await this.getRecents();

      // Remove existing item with same ID or URI (to avoid duplicates)
      const filtered = recents.filter(
        (i) => i.uri !== item.uri && i.id !== item.id
      );

      // Add new item to top
      const updated = [item, ...filtered].slice(0, MAX_ITEMS);

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error("Failed to save history:", e);
    }
  },

  async updateItem(
    oldUri: string,
    newUri: string,
    newName: string,
    newThumbnail?: string,
    newArtist?: string,
    newAlbum?: string
  ) {
    try {
      const recents = await this.getRecents();
      const updated = recents.map((item) => {
        if (item.uri === oldUri) {
          return {
            ...item,
            uri: newUri,
            name: newName,
            thumbnailUri:
              newThumbnail !== undefined ? newThumbnail : item.thumbnailUri,
            artist: newArtist !== undefined ? newArtist : item.artist,
            album: newAlbum !== undefined ? newAlbum : item.album,
          };
        }
        return item;
      });

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to update history item:", e);
    }
  },

  async removeItem(uri: string) {
    try {
      const recents = await this.getRecents();
      const updated = recents.filter((item) => item.uri !== uri);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to remove history item:", e);
    }
  },
};
