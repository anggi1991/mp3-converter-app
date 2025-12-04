import { NativeModules, Platform } from "react-native";

const LINKING_ERROR =
  `The package 'react-native-audio-extractor' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: "" }) +
  "- You rebuilt the app after installing the package\n" +
  "- You are not using Expo Go\n";

const AudioExtractorNative = NativeModules.AudioExtractor
  ? NativeModules.AudioExtractor
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export interface ExtractOptions {
  videoUri: string;
  outputUri: string;
  bitrate?: number; // kbps, default 192
  onProgress?: (progress: number) => void;
}

export interface ExtractResult {
  outputUri: string;
  size: number;
  format: string;
}

class AudioExtractorModule {
  /**
   * Extract audio from video file
   * @param options Extraction options
   * @returns Promise with extraction result
   */
  async extract(options: ExtractOptions): Promise<ExtractResult> {
    const { videoUri, outputUri, bitrate = 192 } = options;

    if (!this.isSupported()) {
      throw new Error("Platform not supported");
    }

    try {
      const result = await AudioExtractorNative.extractAudio(
        videoUri,
        outputUri,
        bitrate * 1000 // Convert kbps to bps
      );

      return result as ExtractResult;
    } catch (error) {
      console.error("[AudioExtractor] Extraction failed:", error);
      throw error;
    }
  }

  /**
   * Edit tags/metadata of M4A audio file
   * @param audioUri URI of the M4A file
   * @param title Song title (optional)
   * @param artist Artist name (optional)
   * @param album Album name (optional)
   * @param coverUri Cover image URI (optional - currently not supported for saving)
   * @returns Promise with edit result
   */
  async editTags(
    audioUri: string,
    title: string | null,
    artist: string | null,
    album: string | null,
    coverUri: string | null = null
  ): Promise<{ outputUri: string; success: boolean; message: string }> {
    if (!this.isSupported()) {
      throw new Error("Platform not supported");
    }

    try {
      const result = await AudioExtractorNative.editTags(
        audioUri,
        title,
        artist,
        album,
        coverUri
      );

      return result;
    } catch (error) {
      console.error("[AudioExtractor] Tag editing failed:", error);
      throw error;
    }
  }

  /**
   * Get metadata from audio file
   * @param audioUri URI of the audio file
   * @returns Promise with metadata
   */
  async getMetadata(
    audioUri: string
  ): Promise<{ title?: string; artist?: string; album?: string }> {
    if (!this.isSupported()) {
      throw new Error("Platform not supported");
    }

    try {
      return await AudioExtractorNative.getMetadata(audioUri);
    } catch (error) {
      console.error("[AudioExtractor] Failed to get metadata:", error);
      return {};
    }
  }

  /**
   * Get thumbnail from video file
   * @param videoUri URI of the video file
   * @returns Promise with thumbnail URI
   */
  async getThumbnail(videoUri: string): Promise<string> {
    if (!this.isSupported()) {
      throw new Error("Platform not supported");
    }

    try {
      return await AudioExtractorNative.getThumbnail(videoUri);
    } catch (error) {
      console.error("[AudioExtractor] Failed to get thumbnail:", error);
      throw error;
    }
  }

  /**
   * Check if audio extraction is supported on current platform
   */
  isSupported(): boolean {
    return Platform.OS === "android" || Platform.OS === "ios";
  }

  /**
   * Get list of supported video formats
   */
  async getSupportedFormats(): Promise<string[]> {
    if (!this.isSupported()) {
      return [];
    }

    try {
      return await AudioExtractorNative.getSupportedFormats();
    } catch (error) {
      console.error("[AudioExtractor] Failed to get supported formats:", error);
      return [];
    }
  }
}

export default new AudioExtractorModule();
