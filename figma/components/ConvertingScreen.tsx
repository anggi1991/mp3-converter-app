import { useEffect, useState } from 'react';

interface ConvertingScreenProps {
  onNavigate: (screen: string) => void;
  onComplete: (audio: any) => void;
}

export function ConvertingScreen({ onNavigate, onComplete }: ConvertingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete({
              name: 'Summer_Vibes_Mix.mp3',
              bitrate: '192 kbps',
              duration: '3:45',
              size: '5.2 MB'
            });
            onNavigate('result');
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onNavigate, onComplete]);

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-[#1A1B2E] via-[#1E1F32] to-[#2A2B3E] relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-[#675CFF] to-[#22D3EE] opacity-20 blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-[#675CFF] to-transparent opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-gradient-to-tr from-[#22D3EE] to-transparent opacity-20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        {/* Main Circle Progress */}
        <div className="relative mb-12">
          {/* Glow Effect */}
          <div className="absolute -inset-8 bg-gradient-to-br from-[#675CFF]/30 to-[#22D3EE]/30 rounded-full blur-3xl"></div>
          
          {/* Progress Ring */}
          <div className="relative w-48 h-48">
            <svg className="w-full h-full transform -rotate-90">
              {/* Background Circle */}
              <circle
                cx="96"
                cy="96"
                r="88"
                fill="none"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="8"
              />
              {/* Progress Circle */}
              <circle
                cx="96"
                cy="96"
                r="88"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 88}`}
                strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
                className="transition-all duration-300"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#675CFF" />
                  <stop offset="50%" stopColor="#7B6FFF" />
                  <stop offset="100%" stopColor="#22D3EE" />
                </linearGradient>
              </defs>
            </svg>

            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-6xl mb-2 bg-gradient-to-br from-[#675CFF] to-[#22D3EE] bg-clip-text text-transparent">
                {progress}%
              </div>
              <div className="w-12 h-1 rounded-full bg-gradient-to-r from-[#675CFF] to-[#22D3EE]"></div>
            </div>
          </div>
        </div>

        {/* Status Text */}
        <h2 className="text-white mb-3">Sedang Mengonversi...</h2>
        <p className="text-[#4E4F6E] text-center mb-12">
          Ekstraksi audio dari video sedang berlangsung
        </p>

        {/* Progress Bar */}
        <div className="w-full max-w-xs">
          <div className="h-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden shadow-lg">
            <div 
              className="h-full bg-gradient-to-r from-[#675CFF] via-[#7B6FFF] to-[#22D3EE] transition-all duration-300 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Ad Placeholder */}
        <div className="mt-12 w-full max-w-sm rounded-[24px] bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 p-8 shadow-lg">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-white/5 mx-auto mb-3 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-[#4E4F6E] border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-[#4E4F6E] text-sm">Fullscreen Interstitial</p>
            <p className="text-[#4E4F6E]/60 text-xs mt-1">Loading Ad...</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
      `}</style>
    </div>
  );
}
