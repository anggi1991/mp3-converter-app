import { Video, Music, Home, Library, Settings, Play, MoreVertical } from 'lucide-react';
import { BottomNav } from './BottomNav';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

const recentFiles = [
  {
    id: 1,
    thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&h=150&fit=crop',
    name: 'Summer_Vibes_Mix.mp3',
    duration: '3:45'
  },
  {
    id: 2,
    thumbnail: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&h=150&fit=crop',
    name: 'Podcast_Episode_12.mp3',
    duration: '24:16'
  },
  {
    id: 3,
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=150&fit=crop',
    name: 'Tutorial_Video_Audio.mp3',
    duration: '8:30'
  }
];

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-[#1A1B2E] via-[#1A1B2E] to-[#2A2B3E] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#675CFF] to-transparent opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-32 left-0 w-48 h-48 bg-gradient-to-tr from-[#22D3EE] to-transparent opacity-10 rounded-full blur-3xl"></div>

      {/* App Bar */}
      <div className="px-6 pt-14 pb-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#675CFF] to-[#A88BFF] flex items-center justify-center shadow-lg shadow-[#675CFF]/30">
          <Music className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-white">Video to MP3 Converter</h1>
          <p className="text-[#4E4F6E] text-sm">Audio Extractor</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 overflow-y-auto pb-24">
        {/* Main CTA Button */}
        <button 
          onClick={() => onNavigate('select-video')}
          className="w-full h-32 rounded-[28px] bg-gradient-to-br from-[#675CFF] via-[#7B6FFF] to-[#22D3EE] shadow-lg shadow-[#675CFF]/40 flex flex-col items-center justify-center gap-3 mb-8 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-active:opacity-100 transition-opacity"></div>
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Video className="w-8 h-8 text-white" />
          </div>
          <span className="text-white">Pilih Video</span>
        </button>

        {/* Recent Converted Files */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white">Recent Converted Files</h2>
            <button 
              onClick={() => onNavigate('library')}
              className="text-[#22D3EE] text-sm"
            >
              Lihat Semua
            </button>
          </div>

          <div className="space-y-3">
            {recentFiles.map(file => (
              <div 
                key={file.id}
                className="rounded-[24px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 p-4 flex items-center gap-4 shadow-lg shadow-black/20"
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                  <img src={file.thumbnail} alt={file.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white text-sm truncate">{file.name}</h3>
                  <p className="text-[#4E4F6E] text-sm">{file.duration}</p>
                </div>
                <button className="w-10 h-10 rounded-full bg-gradient-to-br from-[#675CFF] to-[#A88BFF] flex items-center justify-center flex-shrink-0 shadow-md shadow-[#675CFF]/30">
                  <Play className="w-5 h-5 text-white fill-white" />
                </button>
                <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                  <MoreVertical className="w-5 h-5 text-[#4E4F6E]" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Ad Placeholder */}
        <div className="rounded-[24px] bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 p-6 flex items-center justify-center shadow-lg shadow-black/20">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-white/5 mx-auto mb-3 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-[#4E4F6E] border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-[#4E4F6E] text-sm">Advertisement Space</p>
            <p className="text-[#4E4F6E]/60 text-xs mt-1">320 × 100</p>
          </div>
        </div>

        {/* Quick Access Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <button className="text-center" onClick={() => onNavigate('style-guide')}>
            <div className="rounded-[20px] bg-white/5 backdrop-blur-xl border border-white/10 p-6 mb-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#675CFF]/20 to-[#A88BFF]/20 mx-auto flex items-center justify-center mb-2">
                <span className="text-2xl">🎨</span>
              </div>
              <p className="text-white text-sm">Style Guide</p>
            </div>
          </button>
          <button className="text-center" onClick={() => onNavigate('flow')}>
            <div className="rounded-[20px] bg-white/5 backdrop-blur-xl border border-white/10 p-6 mb-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#22D3EE]/20 to-[#675CFF]/20 mx-auto flex items-center justify-center mb-2">
                <span className="text-2xl">🔗</span>
              </div>
              <p className="text-white text-sm">App Flow</p>
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav active="home" onNavigate={onNavigate} />
    </div>
  );
}
