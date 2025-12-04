Anda adalah asisten coding saya untuk membangun aplikasi Android bernama:
**Video to MP3 Converter – Audio Extractor**

Tujuan aplikasi:
- Menjadi aplikasi evergreen (tidak kadaluarsa)
- Memberikan passive income melalui AdMob + IAP (Remove Ads)
- Menggunakan UI/UX high-fidelity modern dari Figma: E:\projek android\Video to MP3 Converter\figma
  - tema warna indigo + cyan gradient
  - glassmorphism navigation
  - card glossy
  - button gradient
  - waveform placeholder
  - shadow lembut iOS style
  - radius besar 22–28px
  - icon outline modern
  - dark mode default

Stack yang digunakan:
- **React Native Expo 51+** (terbaru)
- **TypeScript strict**
- **Expo Router**
- **React Native Reanimated**
- **React Native Paper** (untuk komponen UI lanjutan)
- **FFmpeg-kit-react-native** untuk konversi video → mp3
- **Expo AV** untuk playback audio
- **AsyncStorage** untuk menyimpan file riwayat
- Tidak memakai database online (offline-first)

Buatkan saya:
1. **RNB (Reason to Build)**
2. **PRB (Problem, Response, Benefit)**
3. **Struktur folder lengkap**
4. **Starter code project (Expo)**
5. **Implementasi UI/UX high-fidelity yang sudah dibuat di Figma**
6. **Setup konversi ffmpeg**
7. **Setup iklan AdMob**
8. **Setup IAP Remove Ads**
9. **Flow app**:
   - Home → Select Video → Video Detail → Convert → Loading → Result → Library → Settings

Detail RNB:
- Aplikasi konversi video ke MP3 adalah evergreen tool
- Bahkan di tahun apa pun, kebutuhan extract audio sangat tinggi
- CPM AdMob untuk kategori “Media Tools” sangat besar
- Maintenancenya ringan, tidak perlu API server
- Pasar global: pelajar, pekerja, musisi, kreator konten, pemilik HP Android lawas

Detail PRB:
- User sering butuh mengambil audio dari video ceramah, musik, meeting online
- Tools internal HP sering tidak mendukung ekstraksi format MP3
- User butuh bitrate sesuai selera: 96–320 kbps
- User perlu fitur tambahan trim audio & ringtone
- Aplikasi harus bisa digunakan offline dan cepat
- Desain harus premium agar terlihat trusted

Buatkan seluruh boilerplate kode berikut:
- `/app/index.tsx` → Home Screen
- `/app/select-video.tsx` → Gallery picker
- `/app/video-detail.tsx` → Bitrate selector + toggle HQ
- `/app/convert.tsx` → Loading + progress bar
- `/app/result.tsx` → Audio player + action buttons
- `/app/library.tsx` → List file MP3
- `/app/settings.tsx` → Remove Ads, Default Quality, Theme, Language

Tambahkan:
- Komponen reusable:
  - ButtonPrimary (gradient)
  - ButtonOutline
  - CardGlass
  - WaveformPlaceholder
  - NavbarGlass
  - ProgressNeon
- File tema:
  - color.ts
  - spacing.ts
  - typography.ts
  - shadow.ts

Instruksi tambahan:
- Gunakan style high-fidelity seperti Figma (glassmorphism, gradient, shadow)
- Gunakan TypeScript, bukan JavaScript
- Hindari placeholder Todo, langsung buat kode lengkapnya
- Semua file audio disimpan di folder `FileSystem.documentDirectory + 'converted/'`
- Riwayat disimpan di AsyncStorage sebagai JSON array
- Library screen membaca file lokal & menampilkannya

Setelah ini, hasilkan:
1. RNB dan PRB lengkap (dalam folder docs)
2. Struktur folder final
3. Konfigurasi package.json
4. File starter App.tsx
5. Semua screen minimal sudah ada layout high-fidelity sesuai Figma
6. Component UI premium siap pakai
7. Pseudocode ffmpeg untuk convert
8. Pseudocode AdMob (Banner + Interstitial)
9. Pseudocode IAP Remove Ads

Mulai generate sekarang.
