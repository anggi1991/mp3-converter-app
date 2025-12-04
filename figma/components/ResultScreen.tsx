import { ArrowLeft, Play, Pause, Share2, Download, Scissors, Music2, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface ResultScreenProps {
  onNavigate: (screen: string) => void;
  audio: any;
}

export function ResultScreen({ onNavigate, audio }: ResultScreenProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(45);
  const totalTime = 225; // 3:45 in seconds

  if (!audio) {
    return null;
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-[#1A1B2E] via-[#1A1B2E] to-[#2A2B3E] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#675CFF] to-transparent opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-32 left-0 w-48 h-48 bg-gradient-to-tr from-[#22D3EE] to-transparent opacity-10 rounded-full blur-3xl"></div>

      {/* Header */}
      <div className="px-6 pt-14 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => onNavigate('home')}
            className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white flex-1">Hasil Konversi</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 overflow-y-auto pb-6">
        {/* Success Banner */}
        <div className="rounded-[24px] bg-gradient-to-br from-[#22D3EE]/20 to-[#22D3EE]/5 backdrop-blur-xl border border-[#22D3EE]/30 p-5 flex items-center gap-4 mb-6 shadow-lg shadow-[#22D3EE]/10">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#22D3EE] to-[#22D3EE]/80 flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#22D3EE]/30">
            <CheckCircle2 className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-white">Konversi Berhasil!</h3>
            <p className="text-[#22D3EE] text-sm">Audio telah siap digunakan</p>
          </div>
        </div>

        {/* Waveform Visual */}
        <div className="rounded-[28px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 p-6 mb-6 shadow-2xl shadow-black/20">
          <div className="flex items-end justify-between h-32 gap-1 mb-4">
            {[...Array(40)].map((_, i) => {
              const height = Math.sin(i / 3) * 40 + 50;
              const isActive = (i / 40) * totalTime <= currentTime;
              return (
                <div
                  key={i}
                  className="flex-1 rounded-full transition-all duration-300"
                  style={{
                    height: `${height}%`,
                    background: isActive 
                      ? 'linear-gradient(to top, #675CFF, #22D3EE)'
                      : 'rgba(255, 255, 255, 0.1)'
                  }}
                ></div>
              );
            })}
          </div>

          {/* Audio Player Controls */}
          <div className="space-y-4">
            {/* Timeline */}
            <div className="relative">
              <div className="h-1.5 rounded-full bg-white/10">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-[#675CFF] to-[#22D3EE] transition-all"
                  style={{ width: `${(currentTime / totalTime) * 100}%` }}
                ></div>
              </div>
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-lg"
                style={{ left: `${(currentTime / totalTime) * 100}%`, transform: 'translate(-50%, -50%)' }}
              ></div>
            </div>

            {/* Time */}
            <div className="flex justify-between text-sm">
              <span className="text-[#4E4F6E]">0:{currentTime.toString().padStart(2, '0')}</span>
              <span className="text-[#4E4F6E]">{audio.duration}</span>
            </div>

            {/* Play Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-[#675CFF] to-[#22D3EE] flex items-center justify-center mx-auto shadow-xl shadow-[#675CFF]/40 active:scale-95 transition-transform"
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 text-white fill-white" />
              ) : (
                <Play className="w-7 h-7 text-white fill-white ml-1" />
              )}
            </button>
          </div>
        </div>

        {/* Info Card */}
        <div className="rounded-[24px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 p-5 mb-6 shadow-lg">
          <h3 className="text-white mb-4">{audio.name}</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#675CFF]/20 to-[#A88BFF]/20 flex items-center justify-center mx-auto mb-2">
                <Music2 className="w-5 h-5 text-[#675CFF]" />
              </div>
              <p className="text-[#4E4F6E] text-xs">Bitrate</p>
              <p className="text-white text-sm">{audio.bitrate}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#22D3EE]/20 to-[#22D3EE]/10 flex items-center justify-center mx-auto mb-2">
                <span className="text-[#22D3EE]">⏱️</span>
              </div>
              <p className="text-[#4E4F6E] text-xs">Duration</p>
              <p className="text-white text-sm">{audio.duration}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#675CFF]/20 to-[#22D3EE]/20 flex items-center justify-center mx-auto mb-2">
                <span className="text-[#675CFF]">📦</span>
              </div>
              <p className="text-[#4E4F6E] text-xs">Size</p>
              <p className="text-white text-sm">{audio.size}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button className="h-14 rounded-[20px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center gap-2 text-white shadow-lg active:scale-95 transition-transform">
            <Download className="w-5 h-5" />
            <span>Save</span>
          </button>
          <button className="h-14 rounded-[20px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center gap-2 text-white shadow-lg active:scale-95 transition-transform">
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => onNavigate('audio-cutter')}
            className="h-14 rounded-[20px] bg-gradient-to-br from-[#675CFF]/20 to-[#A88BFF]/10 backdrop-blur-xl border border-[#675CFF]/30 flex items-center justify-center gap-2 text-[#675CFF] shadow-lg active:scale-95 transition-transform"
          >
            <Scissors className="w-5 h-5" />
            <span>Trim Audio</span>
          </button>
          <button className="h-14 rounded-[20px] bg-gradient-to-br from-[#22D3EE]/20 to-[#22D3EE]/10 backdrop-blur-xl border border-[#22D3EE]/30 flex items-center justify-center gap-2 text-[#22D3EE] shadow-lg active:scale-95 transition-transform">
            <Music2 className="w-5 h-5" />
            <span>Ringtone</span>
          </button>
        </div>
      </div>
    </div>
  );
}
