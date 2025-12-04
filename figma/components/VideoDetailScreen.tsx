import { ArrowLeft, Zap, Star } from 'lucide-react';
import { useState } from 'react';

interface VideoDetailScreenProps {
  onNavigate: (screen: string) => void;
  video: any;
}

const bitrates = [96, 128, 192, 256, 320];

export function VideoDetailScreen({ onNavigate, video }: VideoDetailScreenProps) {
  const [selectedBitrate, setSelectedBitrate] = useState(192);
  const [premiumMode, setPremiumMode] = useState(false);

  if (!video) {
    return (
      <div className="h-full flex items-center justify-center bg-[#1A1B2E]">
        <p className="text-white">No video selected</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-[#1A1B2E] via-[#1A1B2E] to-[#2A2B3E] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#675CFF] to-transparent opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#22D3EE] to-transparent opacity-10 rounded-full blur-3xl"></div>

      {/* Header */}
      <div className="px-6 pt-14 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => onNavigate('select-video')}
            className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white flex-1">Video Detail</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 overflow-y-auto pb-6">
        {/* Hero Section */}
        <div className="rounded-[28px] overflow-hidden mb-6 shadow-2xl shadow-black/40 relative">
          <img src={video.thumbnail} alt={video.name} className="w-full aspect-video object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          
          {/* Overlays */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div>
              <h2 className="text-white mb-2">{video.name}</h2>
              <div className="flex gap-2">
                <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs">
                  {video.duration}
                </span>
                <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs">
                  {video.resolution}
                </span>
                <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs">
                  MP4
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bitrate Selector */}
        <div className="mb-6">
          <h3 className="text-white mb-4">Pilih Bitrate</h3>
          <div className="flex gap-2">
            {bitrates.map(bitrate => (
              <button
                key={bitrate}
                onClick={() => setSelectedBitrate(bitrate)}
                className={`flex-1 h-12 rounded-[18px] transition-all relative ${
                  selectedBitrate === bitrate
                    ? 'bg-gradient-to-br from-[#675CFF] to-[#A88BFF] text-white shadow-lg shadow-[#675CFF]/40'
                    : 'bg-white/5 text-[#4E4F6E] border border-white/10'
                }`}
              >
                {selectedBitrate === bitrate && (
                  <div className="absolute -inset-1 bg-[#22D3EE]/30 rounded-[20px] blur-md"></div>
                )}
                <span className="relative text-sm">{bitrate}</span>
                <span className="relative text-xs opacity-70"> kbps</span>
              </button>
            ))}
          </div>
        </div>

        {/* Premium Toggle */}
        <div 
          onClick={() => setPremiumMode(!premiumMode)}
          className="rounded-[24px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 p-5 flex items-center gap-4 mb-6 shadow-lg cursor-pointer active:scale-[0.98] transition-transform"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/20 flex items-center justify-center flex-shrink-0">
            <Star className="w-6 h-6 text-[#FFD700] fill-[#FFD700]" />
          </div>
          <div className="flex-1">
            <h3 className="text-white">High Quality Mode</h3>
            <p className="text-[#4E4F6E] text-sm">Premium Feature</p>
          </div>
          <div className={`w-14 h-8 rounded-full transition-all relative ${
            premiumMode ? 'bg-gradient-to-r from-[#675CFF] to-[#A88BFF]' : 'bg-white/10'
          }`}>
            <div className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-lg transition-all ${
              premiumMode ? 'left-7' : 'left-1'
            }`}></div>
          </div>
        </div>

        {/* Convert Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={() => onNavigate('converting')}
            className="w-full h-16 rounded-[24px] bg-gradient-to-br from-[#675CFF] via-[#7B6FFF] to-[#22D3EE] text-white shadow-lg shadow-[#675CFF]/40 active:scale-[0.98] transition-transform relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-active:opacity-100 transition-opacity"></div>
            <span className="relative">Convert</span>
          </button>

          <button className="w-full h-16 rounded-[24px] bg-transparent border-2 border-[#22D3EE] text-[#22D3EE] shadow-lg shadow-[#22D3EE]/20 active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
            <Zap className="w-5 h-5" />
            <span>Fast Convert (Watch Ad)</span>
          </button>
        </div>

        {/* Ad Placeholder */}
        <div className="rounded-[24px] bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 p-8 flex items-center justify-center shadow-lg">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 mx-auto mb-4 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-[#4E4F6E] border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-[#4E4F6E]">Interstitial Ad</p>
            <p className="text-[#4E4F6E]/60 text-sm mt-1">320 × 480</p>
          </div>
        </div>
      </div>
    </div>
  );
}
