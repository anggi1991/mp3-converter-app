import { ChevronRight, Crown, Radio, Palette, Globe, Shield, Star, Music } from 'lucide-react';
import { BottomNav } from './BottomNav';

interface SettingsScreenProps {
  onNavigate: (screen: string) => void;
}

const menuItems = [
  { id: 'remove-ads', icon: Crown, label: 'Remove Ads', subtitle: 'Premium', premium: true, color: 'from-[#FFD700] to-[#FFA500]' },
  { id: 'bitrate', icon: Radio, label: 'Default Bitrate', subtitle: '192 kbps', premium: false, color: 'from-[#675CFF] to-[#A88BFF]' },
  { id: 'quality', icon: Star, label: 'High Quality Mode', subtitle: 'Premium only', premium: true, color: 'from-[#22D3EE] to-[#675CFF]' },
  { id: 'theme', icon: Palette, label: 'Theme', subtitle: 'Dark', premium: false, color: 'from-[#675CFF] to-[#22D3EE]' },
  { id: 'language', icon: Globe, label: 'Bahasa', subtitle: 'Indonesia', premium: false, color: 'from-[#A88BFF] to-[#675CFF]' },
  { id: 'privacy', icon: Shield, label: 'Privacy Policy', subtitle: '', premium: false, color: 'from-[#4E4F6E] to-[#675CFF]' },
  { id: 'rate', icon: Star, label: 'Rate App', subtitle: 'Give us 5 stars', premium: false, color: 'from-[#FFD700] to-[#22D3EE]' },
];

export function SettingsScreen({ onNavigate }: SettingsScreenProps) {
  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-[#1A1B2E] via-[#1A1B2E] to-[#2A2B3E] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#675CFF] to-transparent opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-32 left-0 w-48 h-48 bg-gradient-to-tr from-[#22D3EE] to-transparent opacity-10 rounded-full blur-3xl"></div>

      {/* Header */}
      <div className="px-6 pt-14 pb-6">
        <h1 className="text-white">Settings</h1>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 overflow-y-auto pb-24">
        {/* Premium Card */}
        <div className="rounded-[28px] bg-gradient-to-br from-[#FFD700]/20 via-[#FFA500]/10 to-[#FF6B6B]/10 backdrop-blur-xl border border-[#FFD700]/30 p-6 mb-6 shadow-2xl shadow-[#FFD700]/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD700]/20 rounded-full blur-2xl"></div>
          <div className="relative">
            <div className="w-16 h-16 rounded-[20px] bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center mb-4 shadow-xl shadow-[#FFD700]/40">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-white mb-2">Upgrade to Premium</h2>
            <p className="text-[#4E4F6E] text-sm mb-4">
              Remove ads, unlock high quality mode, and get unlimited conversions
            </p>
            <button 
              onClick={() => onNavigate('premium')}
              className="w-full h-12 rounded-[18px] bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-white shadow-lg shadow-[#FFD700]/40 active:scale-[0.98] transition-transform"
            >
              Go Premium
            </button>
          </div>
        </div>

        {/* Settings Menu */}
        <div className="space-y-2">
          {menuItems.map(item => (
            <button
              key={item.id}
              className="w-full rounded-[22px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 p-4 flex items-center gap-4 shadow-lg shadow-black/20 active:scale-[0.98] transition-transform"
            >
              <div className={`w-12 h-12 rounded-[18px] bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-white text-sm">{item.label}</h3>
                  {item.premium && (
                    <div className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] flex items-center gap-1">
                      <Crown className="w-3 h-3 text-white" />
                      <span className="text-white text-xs">PRO</span>
                    </div>
                  )}
                </div>
                {item.subtitle && (
                  <p className="text-[#4E4F6E] text-xs mt-0.5">{item.subtitle}</p>
                )}
              </div>
              <ChevronRight className="w-5 h-5 text-[#4E4F6E] flex-shrink-0" />
            </button>
          ))}
        </div>

        {/* App Info */}
        <div className="mt-8 mb-6 text-center">
          <div className="w-20 h-20 rounded-[24px] bg-gradient-to-br from-[#675CFF] to-[#A88BFF] flex items-center justify-center mx-auto mb-4 shadow-xl shadow-[#675CFF]/30">
            <Music className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-white mb-1">Video to MP3 Converter</h3>
          <p className="text-[#4E4F6E] text-sm mb-1">Audio Extractor</p>
          <p className="text-[#4E4F6E] text-xs">Version 2.5.1</p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav active="settings" onNavigate={onNavigate} />
    </div>
  );
}