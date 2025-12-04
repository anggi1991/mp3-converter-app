import { ArrowLeft, Play, Pause } from 'lucide-react';
import { useState } from 'react';

interface AudioCutterScreenProps {
  onNavigate: (screen: string) => void;
  audio: any;
}

export function AudioCutterScreen({ onNavigate, audio }: AudioCutterScreenProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [startTime, setStartTime] = useState(15);
  const [endTime, setEndTime] = useState(180);
  const totalTime = 225; // 3:45 in seconds

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-[#1A1B2E] via-[#1A1B2E] to-[#2A2B3E] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#675CFF] to-transparent opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-32 left-0 w-48 h-48 bg-gradient-to-tr from-[#22D3EE] to-transparent opacity-10 rounded-full blur-3xl"></div>

      {/* Header */}
      <div className="px-6 pt-14 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => onNavigate('result')}
            className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white flex-1">Audio Cutter</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 overflow-y-auto pb-6">
        {/* File Info */}
        <div className="rounded-[24px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 p-5 mb-6 shadow-lg">
          <h3 className="text-white mb-2">{audio?.name || 'Audio File'}</h3>
          <p className="text-[#4E4F6E] text-sm">Original Duration: {audio?.duration || '3:45'}</p>
        </div>

        {/* Waveform */}
        <div className="rounded-[28px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 p-6 mb-6 shadow-2xl shadow-black/20">
          <div className="relative">
            {/* Waveform Bars */}
            <div className="flex items-end justify-between h-40 gap-1 mb-6">
              {[...Array(60)].map((_, i) => {
                const height = Math.sin(i / 4) * 40 + 50;
                const position = (i / 60) * totalTime;
                const isInRange = position >= startTime && position <= endTime;
                return (
                  <div
                    key={i}
                    className="flex-1 rounded-full transition-all duration-200"
                    style={{
                      height: `${height}%`,
                      background: isInRange
                        ? 'linear-gradient(to top, #675CFF, #22D3EE)'
                        : 'rgba(255, 255, 255, 0.1)'
                    }}
                  ></div>
                );
              })}
            </div>

            {/* Range Overlay */}
            <div 
              className="absolute top-0 bottom-6 border-2 border-[#22D3EE] rounded-xl pointer-events-none"
              style={{
                left: `${(startTime / totalTime) * 100}%`,
                right: `${100 - (endTime / totalTime) * 100}%`
              }}
            >
              <div className="absolute inset-0 bg-[#22D3EE]/10 rounded-lg"></div>
            </div>
          </div>

          {/* Two-Handle Slider */}
          <div className="relative h-12 mb-4">
            {/* Track */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 rounded-full bg-white/10">
              {/* Active Range */}
              <div 
                className="absolute h-full rounded-full bg-gradient-to-r from-[#675CFF] to-[#22D3EE]"
                style={{
                  left: `${(startTime / totalTime) * 100}%`,
                  right: `${100 - (endTime / totalTime) * 100}%`
                }}
              ></div>
            </div>

            {/* Start Handle */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#675CFF] to-[#A88BFF] shadow-xl shadow-[#675CFF]/40 flex items-center justify-center cursor-grab active:cursor-grabbing border-4 border-white/20"
              style={{ left: `${(startTime / totalTime) * 100}%` }}
              onMouseDown={(e) => {
                const handleDrag = (moveEvent: MouseEvent) => {
                  const bounds = e.currentTarget.parentElement!.getBoundingClientRect();
                  const x = Math.max(0, Math.min(moveEvent.clientX - bounds.left, bounds.width));
                  const newTime = Math.floor((x / bounds.width) * totalTime);
                  setStartTime(Math.min(newTime, endTime - 5));
                };
                const handleUp = () => {
                  document.removeEventListener('mousemove', handleDrag);
                  document.removeEventListener('mouseup', handleUp);
                };
                document.addEventListener('mousemove', handleDrag);
                document.addEventListener('mouseup', handleUp);
              }}
              onTouchStart={(e) => {
                const handleDrag = (moveEvent: TouchEvent) => {
                  const bounds = e.currentTarget.parentElement!.getBoundingClientRect();
                  const x = Math.max(0, Math.min(moveEvent.touches[0].clientX - bounds.left, bounds.width));
                  const newTime = Math.floor((x / bounds.width) * totalTime);
                  setStartTime(Math.min(newTime, endTime - 5));
                };
                const handleUp = () => {
                  document.removeEventListener('touchmove', handleDrag);
                  document.removeEventListener('touchend', handleUp);
                };
                document.addEventListener('touchmove', handleDrag);
                document.addEventListener('touchend', handleUp);
              }}
            >
              <div className="w-1 h-6 rounded-full bg-white"></div>
            </div>

            {/* End Handle */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#22D3EE] to-[#22D3EE]/80 shadow-xl shadow-[#22D3EE]/40 flex items-center justify-center cursor-grab active:cursor-grabbing border-4 border-white/20"
              style={{ left: `${(endTime / totalTime) * 100}%` }}
              onMouseDown={(e) => {
                const handleDrag = (moveEvent: MouseEvent) => {
                  const bounds = e.currentTarget.parentElement!.getBoundingClientRect();
                  const x = Math.max(0, Math.min(moveEvent.clientX - bounds.left, bounds.width));
                  const newTime = Math.floor((x / bounds.width) * totalTime);
                  setEndTime(Math.max(newTime, startTime + 5));
                };
                const handleUp = () => {
                  document.removeEventListener('mousemove', handleDrag);
                  document.removeEventListener('mouseup', handleUp);
                };
                document.addEventListener('mousemove', handleDrag);
                document.addEventListener('mouseup', handleUp);
              }}
              onTouchStart={(e) => {
                const handleDrag = (moveEvent: TouchEvent) => {
                  const bounds = e.currentTarget.parentElement!.getBoundingClientRect();
                  const x = Math.max(0, Math.min(moveEvent.touches[0].clientX - bounds.left, bounds.width));
                  const newTime = Math.floor((x / bounds.width) * totalTime);
                  setEndTime(Math.max(newTime, startTime + 5));
                };
                const handleUp = () => {
                  document.removeEventListener('touchmove', handleDrag);
                  document.removeEventListener('touchend', handleUp);
                };
                document.addEventListener('touchmove', handleDrag);
                document.addEventListener('touchend', handleUp);
              }}
            >
              <div className="w-1 h-6 rounded-full bg-white"></div>
            </div>
          </div>

          {/* Time Display */}
          <div className="flex justify-between mb-4">
            <span className="text-[#675CFF]">{formatTime(startTime)}</span>
            <span className="text-[#22D3EE]">{formatTime(endTime)}</span>
          </div>

          {/* Preview Player */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-14 h-14 rounded-full bg-gradient-to-br from-[#675CFF] to-[#22D3EE] flex items-center justify-center shadow-lg shadow-[#675CFF]/40 flex-shrink-0 active:scale-95 transition-transform"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white fill-white" />
              ) : (
                <Play className="w-6 h-6 text-white fill-white ml-0.5" />
              )}
            </button>
            <div className="flex-1">
              <p className="text-white text-sm mb-1">Preview Selection</p>
              <p className="text-[#4E4F6E] text-xs">Duration: {formatTime(endTime - startTime)}</p>
            </div>
          </div>
        </div>

        {/* Manual Time Input */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="rounded-[20px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 p-4 shadow-lg">
            <p className="text-[#4E4F6E] text-xs mb-2">Start Time</p>
            <input
              type="text"
              value={formatTime(startTime)}
              readOnly
              className="w-full bg-transparent text-white text-center"
            />
          </div>
          <div className="rounded-[20px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 p-4 shadow-lg">
            <p className="text-[#4E4F6E] text-xs mb-2">End Time</p>
            <input
              type="text"
              value={formatTime(endTime)}
              readOnly
              className="w-full bg-transparent text-white text-center"
            />
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={() => onNavigate('result')}
          className="w-full h-16 rounded-[24px] bg-gradient-to-br from-[#675CFF] via-[#7B6FFF] to-[#22D3EE] text-white shadow-lg shadow-[#675CFF]/40 active:scale-[0.98] transition-transform"
        >
          Save Trimmed Audio
        </button>
      </div>
    </div>
  );
}
