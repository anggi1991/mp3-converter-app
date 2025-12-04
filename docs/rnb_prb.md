# RNB (Reason to Build) & PRB (Problem, Response, Benefit)

## RNB (Reason to Build)
**Video to MP3 Converter – Audio Extractor**

1.  **Evergreen Tool**: Aplikasi konversi video ke MP3 adalah alat yang selalu dibutuhkan sepanjang masa. Tidak seperti aplikasi tren sesaat, utilitas ini memiliki umur panjang.
2.  **High Demand**: Kebutuhan untuk mengekstrak audio dari video (ceramah, musik, podcast, meeting) sangat tinggi di berbagai kalangan pengguna.
3.  **High CPM**: Kategori "Media Tools" memiliki CPM AdMob yang relatif besar, memberikan potensi pendapatan pasif yang baik.
4.  **Low Maintenance**: Aplikasi ini bersifat offline-first dan tidak memerlukan server backend yang kompleks, sehingga biaya perawatan sangat rendah.
5.  **Global Market**: Target pasar sangat luas, mencakup pelajar, pekerja, musisi, konten kreator, dan pengguna di negara berkembang dengan perangkat Android spesifikasi rendah hingga menengah.

## PRB (Problem, Response, Benefit)

### Problem (Masalah)
- **Keterbatasan Tools Bawaan**: Banyak HP Android tidak memiliki fitur bawaan untuk mengekstrak audio dari video.
- **Kebutuhan Audio Only**: Pengguna sering ingin mendengarkan materi (ceramah, lagu) tanpa harus menyalakan layar untuk menghemat baterai dan kuota data.
- **Kualitas Audio**: Pengguna membutuhkan kontrol atas kualitas audio (bitrate) yang dihasilkan, dari hemat penyimpanan (96kbps) hingga kualitas tinggi (320kbps).
- **Kompleksitas**: Banyak aplikasi sejenis yang terlalu rumit, penuh iklan yang mengganggu, atau desainnya buruk (tidak terpercaya).

### Response (Solusi Aplikasi)
- **Dedicated Converter**: Aplikasi khusus yang fokus pada satu fungsi utama: konversi Video ke MP3 dengan cepat dan mudah.
- **Customizable Bitrate**: Memberikan pilihan bitrate (96, 128, 192, 256, 320 kbps) sesuai kebutuhan pengguna.
- **Modern & Premium UI**: Menggunakan desain High-Fidelity (Glassmorphism, Gradient, Dark Mode) yang memberikan kesan profesional dan terpercaya.
- **Offline First**: Proses konversi dilakukan secara lokal di perangkat menggunakan FFmpeg, tanpa perlu upload ke server (hemat kuota & privasi terjaga).
- **Additional Features**: Fitur trim audio dan set as ringtone untuk nilai tambah.

### Benefit (Manfaat)
- **Hemat Kuota & Baterai**: Pengguna bisa menikmati konten audio tanpa streaming video terus-menerus.
- **Privasi Terjamin**: File tidak pernah meninggalkan perangkat pengguna.
- **User Experience Terbaik**: Dengan UI yang modern dan flow yang simpel, pengguna merasa nyaman dan akan kembali menggunakan aplikasi.
- **Passive Income**: Bagi developer, aplikasi ini menjadi aset digital yang menghasilkan pendapatan jangka panjang dengan effort maintenance minimal.

## Winning Gap (Celah Kemenangan)
1.  **Validasi Keunggulan Utama**:
    *   **Realita Pasar**: 90% kompetitor memiliki desain kuno dan terkesan "scam".
    *   **Peluang**: Desain **Glassmorphism/Dark Mode** yang premium akan membangun kepercayaan instan.
2.  **Tantangan Teknis & Solusi**:
    *   **APK Size**: Gunakan varian `ffmpeg-kit-react-native` yang optimal (audio-only/https) untuk menjaga ukuran aplikasi tetap kecil.
    *   **Scoped Storage**: Gunakan `FileSystem` (Expo) untuk menyimpan hasil di folder publik agar terbaca oleh Music Player lain.
3.  **The "Hook" (Fitur Pengikat)**:
    *   **ID3 Tag Editor**: Memungkinkan pengguna mengedit Metadata (Judul, Artis, Cover Album) agar file rapi di music player.
4.  **Strategi Monetisasi (User-Friendly)**:
    *   **Native Ads**: Disisipkan secara sopan di List Riwayat.
    *   **Interstitial Ads**: Hanya muncul di "Success Screen" (saat pengguna merasa puas/dopamin hit), bukan sebelum proses.
