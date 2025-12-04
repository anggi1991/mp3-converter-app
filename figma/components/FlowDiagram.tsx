import { ArrowLeft, ArrowRight, Home, Video, Settings as SettingsIcon, Music, Scissors, FolderOpen } from 'lucide-react';

interface FlowDiagramProps {
  onNavigate: (screen: string) => void;
}

export function FlowDiagram({ onNavigate }: FlowDiagramProps) {
  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-[#1A1B2E] via-[#1A1B2E] to-[#2A2B3E] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#675CFF] to-transparent opacity-10 rounded-full blur-3xl"></div>

      {/* Header */}
      <div className="px-6 pt-14 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => onNavigate('home')}
            className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white flex-1">App Flow Diagram</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 overflow-y-auto pb-6">
        <div className="space-y-6">
          {/* Flow Item */}
          <div className="space-y-3">
            {/* Home Screen */}
            <button 
              onClick={() => onNavigate('home')}
              className="w-full rounded-[24px] bg-gradient-to-br from-[#675CFF]/30 to-[#A88BFF]/20 backdrop-blur-xl border-2 border-[#675CFF]/50 p-5 shadow-lg shadow-[#675CFF]/30 active:scale-95 transition-transform"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-[18px] bg-gradient-to-br from-[#675CFF] to-[#A88BFF] flex items-center justify-center shadow-lg">
                  <Home className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-white">Home Screen</h3>
                  <p className="text-[#A88BFF] text-sm">Main entry point • Recent files</p>
                </div>
              </div>
            </button>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="w-1 h-8 bg-gradient-to-b from-[#675CFF] to-[#22D3EE] rounded-full relative">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-[#22D3EE]"></div>
              </div>
            </div>

            {/* Select Video Screen */}
            <button 
              onClick={() => onNavigate('select-video')}
              className="w-full rounded-[24px] bg-gradient-to-br from-[#22D3EE]/30 to-[#22D3EE]/20 backdrop-blur-xl border-2 border-[#22D3EE]/50 p-5 shadow-lg shadow-[#22D3EE]/30 active:scale-95 transition-transform"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-[18px] bg-gradient-to-br from-[#22D3EE] to-[#22D3EE]/80 flex items-center justify-center shadow-lg">
                  <Video className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-white">Select Video Screen</h3>
                  <p className="text-[#22D3EE] text-sm">Gallery picker • Video selection</p>
                </div>
              </div>
            </button>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="w-1 h-8 bg-gradient-to-b from-[#22D3EE] to-[#675CFF] rounded-full relative">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-[#675CFF]"></div>
              </div>
            </div>

            {/* Video Detail Screen */}
            <button 
              onClick={() => onNavigate('video-detail')}
              className="w-full rounded-[24px] bg-gradient-to-br from-[#675CFF]/30 to-[#A88BFF]/20 backdrop-blur-xl border-2 border-[#675CFF]/50 p-5 shadow-lg shadow-[#675CFF]/30 active:scale-95 transition-transform"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-[18px] bg-gradient-to-br from-[#675CFF] to-[#A88BFF] flex items-center justify-center shadow-lg">
                  <SettingsIcon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-white">Video Detail & Convert</h3>
                  <p className="text-[#A88BFF] text-sm">Bitrate selection • Settings</p>
                </div>
              </div>
            </button>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="w-1 h-8 bg-gradient-to-b from-[#675CFF] to-[#22D3EE] rounded-full relative">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-[#22D3EE]"></div>
              </div>
            </div>

            {/* Converting Screen */}
            <button 
              onClick={() => onNavigate('converting')}
              className="w-full rounded-[24px] bg-gradient-to-br from-[#22D3EE]/30 to-[#22D3EE]/20 backdrop-blur-xl border-2 border-[#22D3EE]/50 p-5 shadow-lg shadow-[#22D3EE]/30 active:scale-95 transition-transform"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-[18px] bg-gradient-to-br from-[#22D3EE] to-[#22D3EE]/80 flex items-center justify-center shadow-lg">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-white">Converting Screen</h3>
                  <p className="text-[#22D3EE] text-sm">Progress indicator • Loading</p>
                </div>
              </div>
            </button>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="w-1 h-8 bg-gradient-to-b from-[#22D3EE] to-[#675CFF] rounded-full relative">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-[#675CFF]"></div>
              </div>
            </div>

            {/* Result Screen */}
            <button 
              onClick={() => onNavigate('result')}
              className="w-full rounded-[24px] bg-gradient-to-br from-[#675CFF]/30 to-[#A88BFF]/20 backdrop-blur-xl border-2 border-[#675CFF]/50 p-5 shadow-lg shadow-[#675CFF]/30 active:scale-95 transition-transform"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-[18px] bg-gradient-to-br from-[#675CFF] to-[#A88BFF] flex items-center justify-center shadow-lg">
                  <Music className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-white">Result Screen</h3>
                  <p className="text-[#A88BFF] text-sm">Audio player • Actions</p>
                </div>
              </div>
            </button>

            {/* Branching Arrow */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-[200px]">
                <div className="absolute left-1/2 top-0 w-1 h-8 bg-gradient-to-b from-[#675CFF] to-[#22D3EE] rounded-full -translate-x-1/2"></div>
                <div className="absolute left-0 top-8 right-1/2 h-1 bg-gradient-to-r from-[#22D3EE] to-[#675CFF] rounded-full"></div>
                <div className="absolute left-1/2 top-8 right-0 h-1 bg-gradient-to-r from-[#675CFF] to-[#22D3EE] rounded-full"></div>
                <div className="absolute left-0 top-8 w-1 h-8 bg-gradient-to-b from-[#22D3EE] to-[#675CFF] rounded-full">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-[#675CFF]"></div>
                </div>
                <div className="absolute right-0 top-8 w-1 h-8 bg-gradient-to-b from-[#22D3EE] to-[#675CFF] rounded-full">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-[#675CFF]"></div>
                </div>
              </div>
            </div>

            {/* Audio Cutter & Library */}
            <div className="grid grid-cols-2 gap-3 mt-12">
              <button 
                onClick={() => onNavigate('audio-cutter')}
                className="rounded-[20px] bg-gradient-to-br from-[#675CFF]/30 to-[#A88BFF]/20 backdrop-blur-xl border-2 border-[#675CFF]/50 p-4 shadow-lg active:scale-95 transition-transform"
              >
                <div className="w-12 h-12 rounded-[16px] bg-gradient-to-br from-[#675CFF] to-[#A88BFF] flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Scissors className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white text-sm">Audio Cutter</h3>
                <p className="text-[#A88BFF] text-xs mt-1">Trim audio</p>
              </button>

              <button 
                onClick={() => onNavigate('library')}
                className="rounded-[20px] bg-gradient-to-br from-[#22D3EE]/30 to-[#22D3EE]/20 backdrop-blur-xl border-2 border-[#22D3EE]/50 p-4 shadow-lg active:scale-95 transition-transform"
              >
                <div className="w-12 h-12 rounded-[16px] bg-gradient-to-br from-[#22D3EE] to-[#22D3EE]/80 flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <FolderOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white text-sm">Library</h3>
                <p className="text-[#22D3EE] text-xs mt-1">All files</p>
              </button>
            </div>

            {/* Settings */}
            <div className="mt-6">
              <div className="flex justify-center mb-3">
                <div className="w-1 h-8 bg-gradient-to-b from-[#675CFF] to-[#22D3EE] rounded-full relative">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-[#22D3EE]"></div>
                </div>
              </div>
              <button 
                onClick={() => onNavigate('settings')}
                className="w-full rounded-[24px] bg-gradient-to-br from-[#4E4F6E]/30 to-[#4E4F6E]/20 backdrop-blur-xl border-2 border-[#4E4F6E]/50 p-5 shadow-lg active:scale-95 transition-transform"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-[18px] bg-gradient-to-br from-[#4E4F6E] to-[#675CFF] flex items-center justify-center shadow-lg">
                    <SettingsIcon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-white">Settings Screen</h3>
                    <p className="text-[#4E4F6E] text-sm">App configuration • Preferences</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Legend */}
          <div className="rounded-[24px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 p-6 shadow-lg mt-8">
            <h3 className="text-white mb-4">Navigation Flow</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-1 rounded-full bg-gradient-to-r from-[#675CFF] to-[#22D3EE]"></div>
                <p className="text-[#4E4F6E]">Primary Flow Path</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#675CFF] to-[#A88BFF]"></div>
                <p className="text-[#4E4F6E]">Main Screens</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#22D3EE] to-[#22D3EE]/80"></div>
                <p className="text-[#4E4F6E]">Action Screens</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
