import { ArrowLeft, Music, Video, Play, Star } from 'lucide-react';

interface StyleGuideScreenProps {
  onNavigate: (screen: string) => void;
}

export function StyleGuideScreen({ onNavigate }: StyleGuideScreenProps) {
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
          <h1 className="text-white flex-1">Style Guide</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 overflow-y-auto pb-6">
        {/* Color Palette */}
        <div className="mb-8">
          <h2 className="text-white mb-4">Color Palette</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-[20px] bg-[#675CFF] p-4 shadow-lg">
              <div className="w-full aspect-square rounded-2xl bg-[#675CFF] mb-3 border-4 border-white/20"></div>
              <p className="text-white text-sm">#675CFF</p>
              <p className="text-white/60 text-xs">Primary</p>
            </div>
            <div className="rounded-[20px] bg-[#22D3EE] p-4 shadow-lg">
              <div className="w-full aspect-square rounded-2xl bg-[#22D3EE] mb-3 border-4 border-white/20"></div>
              <p className="text-white text-sm">#22D3EE</p>
              <p className="text-white/60 text-xs">Accent Cyan</p>
            </div>
            <div className="rounded-[20px] bg-[#1A1B2E] border border-white/10 p-4 shadow-lg">
              <div className="w-full aspect-square rounded-2xl bg-[#1A1B2E] mb-3 border-4 border-white/20"></div>
              <p className="text-white text-sm">#1A1B2E</p>
              <p className="text-white/60 text-xs">Dark Background</p>
            </div>
            <div className="rounded-[20px] bg-[#4E4F6E] p-4 shadow-lg">
              <div className="w-full aspect-square rounded-2xl bg-[#4E4F6E] mb-3 border-4 border-white/20"></div>
              <p className="text-white text-sm">#4E4F6E</p>
              <p className="text-white/60 text-xs">Secondary</p>
            </div>
          </div>

          {/* Gradient Swatches */}
          <div className="mt-3 space-y-3">
            <div className="rounded-[20px] bg-gradient-to-r from-[#675CFF] to-[#A88BFF] p-4 shadow-lg">
              <p className="text-white text-sm">Primary Gradient</p>
              <p className="text-white/60 text-xs">#675CFF → #A88BFF</p>
            </div>
            <div className="rounded-[20px] bg-gradient-to-r from-[#675CFF] via-[#7B6FFF] to-[#22D3EE] p-4 shadow-lg">
              <p className="text-white text-sm">Main Gradient</p>
              <p className="text-white/60 text-xs">#675CFF → #7B6FFF → #22D3EE</p>
            </div>
          </div>
        </div>

        {/* Typography */}
        <div className="mb-8">
          <h2 className="text-white mb-4">Typography</h2>
          <div className="rounded-[24px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 p-6 shadow-lg space-y-4">
            <div>
              <h1 className="text-white mb-1">Heading 1</h1>
              <p className="text-[#4E4F6E] text-xs">Inter / SF Pro / Plus Jakarta Sans</p>
            </div>
            <div>
              <h2 className="text-white mb-1">Heading 2</h2>
              <p className="text-[#4E4F6E] text-xs">Inter / SF Pro / Plus Jakarta Sans</p>
            </div>
            <div>
              <h3 className="text-white mb-1">Heading 3</h3>
              <p className="text-[#4E4F6E] text-xs">Inter / SF Pro / Plus Jakarta Sans</p>
            </div>
            <div>
              <p className="text-white mb-1">Body Text</p>
              <p className="text-[#4E4F6E] text-xs">Regular paragraph text</p>
            </div>
            <div>
              <p className="text-[#4E4F6E]">Secondary Text</p>
              <p className="text-[#4E4F6E] text-xs">Muted text for subtitles</p>
            </div>
          </div>
        </div>

        {/* Button Styles */}
        <div className="mb-8">
          <h2 className="text-white mb-4">Button Styles</h2>
          <div className="space-y-3">
            <button className="w-full h-14 rounded-[22px] bg-gradient-to-br from-[#675CFF] via-[#7B6FFF] to-[#22D3EE] text-white shadow-lg shadow-[#675CFF]/40">
              Primary Button
            </button>
            <button className="w-full h-14 rounded-[22px] bg-transparent border-2 border-[#22D3EE] text-[#22D3EE] shadow-lg shadow-[#22D3EE]/20">
              Outline Button
            </button>
            <button className="w-full h-14 rounded-[22px] bg-white/10 backdrop-blur-xl border border-white/10 text-white shadow-lg">
              Glass Button
            </button>
            <div className="flex gap-3">
              <button className="flex-1 h-12 rounded-[18px] bg-gradient-to-br from-[#675CFF] to-[#A88BFF] text-white shadow-lg shadow-[#675CFF]/40">
                Small Primary
              </button>
              <button className="flex-1 h-12 rounded-[18px] bg-white/5 backdrop-blur-xl border border-white/10 text-white shadow-lg">
                Small Glass
              </button>
            </div>
          </div>
        </div>

        {/* Icon Styles */}
        <div className="mb-8">
          <h2 className="text-white mb-4">Icon Styles</h2>
          <div className="grid grid-cols-4 gap-3">
            <div className="text-center">
              <div className="w-full aspect-square rounded-[20px] bg-gradient-to-br from-[#675CFF] to-[#A88BFF] flex items-center justify-center mb-2 shadow-lg">
                <Music className="w-8 h-8 text-white" />
              </div>
              <p className="text-[#4E4F6E] text-xs">Gradient</p>
            </div>
            <div className="text-center">
              <div className="w-full aspect-square rounded-[20px] bg-gradient-to-br from-[#22D3EE] to-[#22D3EE]/80 flex items-center justify-center mb-2 shadow-lg">
                <Video className="w-8 h-8 text-white" />
              </div>
              <p className="text-[#4E4F6E] text-xs">Cyan</p>
            </div>
            <div className="text-center">
              <div className="w-full aspect-square rounded-[20px] bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center mb-2 shadow-lg">
                <Play className="w-8 h-8 text-white" />
              </div>
              <p className="text-[#4E4F6E] text-xs">Glass</p>
            </div>
            <div className="text-center">
              <div className="w-full aspect-square rounded-[20px] bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center mb-2 shadow-lg">
                <Star className="w-8 h-8 text-white fill-white" />
              </div>
              <p className="text-[#4E4F6E] text-xs">Premium</p>
            </div>
          </div>
        </div>

        {/* Card & Shadow Styles */}
        <div className="mb-8">
          <h2 className="text-white mb-4">Card & Shadow Styles</h2>
          <div className="space-y-4">
            <div className="rounded-[24px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 p-6 shadow-lg shadow-black/20">
              <h3 className="text-white mb-2">Glass Card</h3>
              <p className="text-[#4E4F6E] text-sm">Rounded 24px, backdrop blur, subtle gradient</p>
            </div>
            <div className="rounded-[28px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 p-6 shadow-2xl shadow-black/40">
              <h3 className="text-white mb-2">Hero Card</h3>
              <p className="text-[#4E4F6E] text-sm">Rounded 28px, heavy shadow for emphasis</p>
            </div>
            <div className="rounded-[20px] bg-gradient-to-br from-[#675CFF]/20 to-[#22D3EE]/10 backdrop-blur-xl border border-[#675CFF]/30 p-6 shadow-lg shadow-[#675CFF]/20">
              <h3 className="text-white mb-2">Accent Card</h3>
              <p className="text-[#4E4F6E] text-sm">Colored background with matching border & glow</p>
            </div>
          </div>
        </div>

        {/* Grid & Spacing */}
        <div className="mb-8">
          <h2 className="text-white mb-4">Grid & Spacing Layout</h2>
          <div className="rounded-[24px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 p-6 shadow-lg">
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-1 h-12 rounded-2xl bg-[#675CFF]/30 flex items-center justify-center">
                  <p className="text-white text-xs">12px</p>
                </div>
                <div className="flex-1 h-12 rounded-2xl bg-[#675CFF]/30 flex items-center justify-center">
                  <p className="text-white text-xs">12px</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="h-12 rounded-2xl bg-[#22D3EE]/30 flex items-center justify-center">
                  <p className="text-white text-xs">12px</p>
                </div>
                <div className="h-12 rounded-2xl bg-[#22D3EE]/30 flex items-center justify-center">
                  <p className="text-white text-xs">12px</p>
                </div>
                <div className="h-12 rounded-2xl bg-[#22D3EE]/30 flex items-center justify-center">
                  <p className="text-white text-xs">12px</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[#4E4F6E] text-sm">Border Radius:</p>
                <div className="flex gap-2">
                  <div className="px-3 py-2 rounded-[12px] bg-white/10 text-white text-xs">12px</div>
                  <div className="px-3 py-2 rounded-[18px] bg-white/10 text-white text-xs">18px</div>
                  <div className="px-3 py-2 rounded-[22px] bg-white/10 text-white text-xs">22px</div>
                  <div className="px-3 py-2 rounded-[28px] bg-white/10 text-white text-xs">28px</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Effects */}
        <div className="mb-6">
          <h2 className="text-white mb-4">Special Effects</h2>
          <div className="space-y-4">
            <div className="relative rounded-[24px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 p-6 shadow-lg overflow-hidden">
              <div className="absolute -inset-4 bg-[#22D3EE]/20 rounded-2xl blur-xl"></div>
              <h3 className="text-white mb-2 relative">Glow Effect</h3>
              <p className="text-[#4E4F6E] text-sm relative">Used for active states and emphasis</p>
            </div>
            <div className="rounded-[24px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 p-6 shadow-lg">
              <h3 className="text-white mb-2">Glassmorphism</h3>
              <p className="text-[#4E4F6E] text-sm">Backdrop blur + transparency + border</p>
            </div>
            <div className="rounded-[24px] bg-gradient-to-br from-[#1E1F32] to-[#2A2B3E] p-6 shadow-inner">
              <h3 className="text-white mb-2">Neumorphism (Light)</h3>
              <p className="text-[#4E4F6E] text-sm">Subtle inner shadows for depth</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
