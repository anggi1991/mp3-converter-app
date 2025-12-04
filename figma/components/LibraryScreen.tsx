import { Search, Play, Edit3, Trash2, Share2 } from 'lucide-react';
import { BottomNav } from './BottomNav';

interface LibraryScreenProps {
  onNavigate: (screen: string) => void;
}

const audioFiles = [
  { id: 1, name: 'Summer_Vibes_Mix.mp3', bitrate: '192 kbps', duration: '3:45', size: '5.2 MB', date: 'Today' },
  { id: 2, name: 'Podcast_Episode_12.mp3', bitrate: '256 kbps', duration: '24:16', size: '42.8 MB', date: 'Yesterday' },
  { id: 3, name: 'Tutorial_Video_Audio.mp3', bitrate: '128 kbps', duration: '8:30', size: '8.1 MB', date: '2 days ago' },
  { id: 4, name: 'Concert_Recording.mp3', bitrate: '320 kbps', duration: '5:12', size: '11.5 MB', date: '3 days ago' },
  { id: 5, name: 'Interview_Session.mp3', bitrate: '192 kbps', duration: '12:08', size: '16.8 MB', date: '4 days ago' },
  { id: 6, name: 'Product_Review_Audio.mp3', bitrate: '192 kbps', duration: '6:45', size: '9.3 MB', date: '5 days ago' },
  { id: 7, name: 'Music_Performance.mp3', bitrate: '256 kbps', duration: '4:20', size: '9.6 MB', date: '1 week ago' },
  { id: 8, name: 'Gaming_Stream_Audio.mp3', bitrate: '128 kbps', duration: '15:33', size: '14.8 MB', date: '1 week ago' },
];

export function LibraryScreen({ onNavigate }: LibraryScreenProps) {
  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-[#1A1B2E] via-[#1A1B2E] to-[#2A2B3E] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#675CFF] to-transparent opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-32 left-0 w-48 h-48 bg-gradient-to-tr from-[#22D3EE] to-transparent opacity-10 rounded-full blur-3xl"></div>

      {/* Header */}
      <div className="px-6 pt-14 pb-4">
        <h1 className="text-white mb-6">Library</h1>

        {/* Search Bar - Sticky */}
        <div className="relative sticky top-0 z-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4E4F6E]" />
          <input
            type="text"
            placeholder="Cari audio..."
            className="w-full h-14 rounded-[22px] bg-white/10 backdrop-blur-xl border border-white/10 pl-12 pr-4 text-white placeholder-[#4E4F6E] shadow-lg"
          />
        </div>
      </div>

      {/* Audio List */}
      <div className="flex-1 px-6 overflow-y-auto pb-24">
        <div className="space-y-3">
          {audioFiles.map(file => (
            <div 
              key={file.id}
              className="rounded-[24px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 p-4 shadow-lg shadow-black/20"
            >
              <div className="flex items-start gap-4">
                {/* Waveform Thumbnail */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#675CFF]/20 to-[#22D3EE]/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <div className="flex items-end justify-between h-8 gap-0.5 px-2">
                    {[...Array(8)].map((_, i) => {
                      const height = Math.sin(i / 2) * 40 + 50;
                      return (
                        <div
                          key={i}
                          className="w-0.5 rounded-full bg-gradient-to-t from-[#675CFF] to-[#22D3EE]"
                          style={{ height: `${height}%` }}
                        ></div>
                      );
                    })}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white text-sm truncate mb-1">{file.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-[#4E4F6E] mb-2">
                    <span>{file.bitrate}</span>
                    <span>•</span>
                    <span>{file.duration}</span>
                    <span>•</span>
                    <span>{file.size}</span>
                  </div>
                  <p className="text-[#4E4F6E] text-xs">{file.date}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-4">
                <button className="flex-1 h-10 rounded-[16px] bg-gradient-to-br from-[#675CFF] to-[#22D3EE] text-white flex items-center justify-center gap-2 shadow-lg shadow-[#675CFF]/30 active:scale-95 transition-transform">
                  <Play className="w-4 h-4 fill-white" />
                  <span className="text-sm">Play</span>
                </button>
                <button className="w-10 h-10 rounded-[16px] bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center active:scale-95 transition-transform">
                  <Edit3 className="w-4 h-4 text-[#4E4F6E]" />
                </button>
                <button className="w-10 h-10 rounded-[16px] bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center active:scale-95 transition-transform">
                  <Share2 className="w-4 h-4 text-[#4E4F6E]" />
                </button>
                <button className="w-10 h-10 rounded-[16px] bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center active:scale-95 transition-transform">
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty space for scroll */}
        <div className="h-4"></div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav active="library" onNavigate={onNavigate} />
    </div>
  );
}
