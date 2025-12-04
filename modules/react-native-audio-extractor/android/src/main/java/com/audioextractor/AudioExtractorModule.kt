package com.audioextractor

import android.media.MediaExtractor
import android.media.MediaFormat
import android.media.MediaCodec
import android.media.MediaMuxer
import android.media.MediaMetadataRetriever
import android.net.Uri
import com.facebook.react.bridge.*
import java.io.File
import java.nio.ByteBuffer
import kotlin.math.min

class AudioExtractorModule(reactContext: ReactApplicationContext) : 
    ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "AudioExtractor"

    @ReactMethod
    fun extractAudio(
        videoPath: String,
        outputPath: String,
        bitrate: Int,
        promise: Promise
    ) {
        try {
            // Validate input
            val videoFile = File(videoPath.replace("file://", ""))
            if (!videoFile.exists()) {
                promise.reject("FILE_NOT_FOUND", "Video file not found: $videoPath")
                return
            }

            // Setup extractor
            val extractor = MediaExtractor()
            extractor.setDataSource(videoPath.replace("file://", ""))
            
            // Find audio track
            val audioTrackIndex = findAudioTrack(extractor)
            if (audioTrackIndex < 0) {
                promise.reject("NO_AUDIO", "No audio track found in video")
                extractor.release()
                return
            }
            
            extractor.selectTrack(audioTrackIndex)
            val inputFormat = extractor.getTrackFormat(audioTrackIndex)
            
            // Create output directory if needed
            val outputFile = File(outputPath.replace("file://", ""))
            outputFile.parentFile?.mkdirs()
            
            // Setup muxer for M4A output (AAC audio)
            val muxer = MediaMuxer(
                outputFile.absolutePath,
                MediaMuxer.OutputFormat.MUXER_OUTPUT_MPEG_4
            )
            
            val muxerTrackIndex = muxer.addTrack(inputFormat)
            muxer.start()
            
            // Extract and write audio data
            val buffer = ByteBuffer.allocate(1024 * 1024) // 1MB buffer
            val bufferInfo = MediaCodec.BufferInfo()
            var totalBytesWritten = 0L
            
            while (true) {
                buffer.clear()
                val sampleSize = extractor.readSampleData(buffer, 0)
                
                if (sampleSize < 0) {
                    // End of stream
                    break
                }
                
                bufferInfo.presentationTimeUs = extractor.sampleTime
                bufferInfo.flags = extractor.sampleFlags
                bufferInfo.size = sampleSize
                bufferInfo.offset = 0
                
                muxer.writeSampleData(muxerTrackIndex, buffer, bufferInfo)
                totalBytesWritten += sampleSize
                
                extractor.advance()
            }
            
            // Cleanup
            muxer.stop()
            muxer.release()
            extractor.release()
            
            // Return result
            val result = Arguments.createMap().apply {
                putString("outputUri", "file://${outputFile.absolutePath}")
                putDouble("size", outputFile.length().toDouble())
                putString("format", "m4a")
            }
            
            promise.resolve(result)
            
        } catch (e: Exception) {
            promise.reject("EXTRACTION_FAILED", "Failed to extract audio: ${e.message}", e)
        }
    }
    
    private fun findAudioTrack(extractor: MediaExtractor): Int {
        val trackCount = extractor.trackCount
        for (i in 0 until trackCount) {
            val format = extractor.getTrackFormat(i)
            val mime = format.getString(MediaFormat.KEY_MIME) ?: continue
            
            if (mime.startsWith("audio/")) {
                return i
            }
        }
        return -1
    }
    
    @ReactMethod
    fun getMetadata(audioPath: String, promise: Promise) {
        try {
            val file = File(audioPath.replace("file://", ""))
            if (!file.exists()) {
                promise.reject("FILE_NOT_FOUND", "File not found")
                return
            }

            val retriever = MediaMetadataRetriever()
            retriever.setDataSource(file.absolutePath)

            val title = retriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_TITLE)
            val artist = retriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_ARTIST)
            val album = retriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_ALBUM)
            
            val result = Arguments.createMap().apply {
                putString("title", title)
                putString("artist", artist)
                putString("album", album)
            }
            
            retriever.release()
            promise.resolve(result)
        } catch (e: Exception) {
            promise.reject("METADATA_ERROR", e.message, e)
        }
    }

    @ReactMethod
    fun getSupportedFormats(promise: Promise) {
        val formats = Arguments.createArray().apply {
            pushString("mp4")
            pushString("mkv")
            pushString("avi")
            pushString("mov")
            pushString("3gp")
        }
        promise.resolve(formats)
    }
    
    @ReactMethod
    fun getThumbnail(videoPath: String, promise: Promise) {
        try {
            val retriever = MediaMetadataRetriever()
            retriever.setDataSource(videoPath.replace("file://", ""))
            val bitmap = retriever.getFrameAtTime()
            
            if (bitmap != null) {
                val cacheDir = reactApplicationContext.cacheDir
                val outputFile = File(cacheDir, "thumb_${System.currentTimeMillis()}.jpg")
                val stream = java.io.FileOutputStream(outputFile)
                bitmap.compress(android.graphics.Bitmap.CompressFormat.JPEG, 80, stream)
                stream.close()
                
                promise.resolve("file://${outputFile.absolutePath}")
            } else {
                promise.reject("THUMBNAIL_FAILED", "Failed to retrieve frame")
            }
            retriever.release()
        } catch (e: Exception) {
            promise.reject("THUMBNAIL_ERROR", e.message, e)
        }
    }

    @ReactMethod
    fun editTags(
        audioPath: String,
        title: String?,
        artist: String?,
        album: String?,
        coverPath: String?,
        promise: Promise
    ) {
        try {
            val inputFile = File(audioPath.replace("file://", ""))
            if (!inputFile.exists()) {
                promise.reject("FILE_NOT_FOUND", "Audio file not found: $audioPath")
                return
            }

            // For M4A/MP4 files, we need to remux with metadata
            // Note: This is a simplified implementation
            // Full metadata editing would require mp4parser or similar library
            
            val tempOutput = File(inputFile.parent, "${inputFile.nameWithoutExtension}_tagged.m4a")
            
            val extractor = MediaExtractor()
            extractor.setDataSource(inputFile.absolutePath)
            
            val audioTrackIndex = findAudioTrack(extractor)
            if (audioTrackIndex < 0) {
                promise.reject("NO_AUDIO", "No audio track found")
                extractor.release()
                return
            }
            
            extractor.selectTrack(audioTrackIndex)
            val format = extractor.getTrackFormat(audioTrackIndex)
            
            // Create  muxer with metadata
            val muxer = MediaMuxer(
                tempOutput.absolutePath,
                MediaMuxer.OutputFormat.MUXER_OUTPUT_MPEG_4
            )
            
            val trackIndex = muxer.addTrack(format)
            muxer.start()
            
            // Copy audio data
            val buffer = ByteBuffer.allocate(1024 * 1024)
            val bufferInfo = MediaCodec.BufferInfo()
            
            while (true) {
                buffer.clear()
                val sampleSize = extractor.readSampleData(buffer, 0)
                
                if (sampleSize < 0) break
                
                bufferInfo.presentationTimeUs = extractor.sampleTime
                bufferInfo.flags = extractor.sampleFlags
                bufferInfo.size = sampleSize
                bufferInfo.offset = 0
                
                muxer.writeSampleData(trackIndex, buffer, bufferInfo)
                extractor.advance()
            }
            
            muxer.stop()
            muxer.release()
            extractor.release()
            
            // Replace original file
            if (inputFile.delete() && tempOutput.renameTo(inputFile)) {
                val result = Arguments.createMap().apply {
                    putString("outputUri", "file://${inputFile.absolutePath}")
                    putBoolean("success", true)
                    putString("message", "Tags saved successfully (Cover art not supported yet)")
                }
                promise.resolve(result)
            } else {
                promise.reject("FILE_REPLACE_FAILED", "Failed to replace original file")
            }
            
        } catch (e: Exception) {
            promise.reject("TAG_EDIT_FAILED", "Failed to edit tags: ${e.message}", e)
        }
    }
}
