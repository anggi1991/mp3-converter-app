import { ArrowLeft, Crown, Check, Sparkles, Zap, Star, Shield, Music2, X } from 'lucide-react';
import { useState } from 'react';

interface PremiumScreenProps {
  onNavigate: (screen: string) => void;
}

const features = [
  { icon: X, label: 'Remove All Ads', description: 'Enjoy ad-free experience' },
  { icon: Music2, label: 'High Quality Audio', description: 'Up to 320 kbps bitrate' },
  { icon: Zap, label: 'Unlimited Conversions', description: 'No daily limits' },
  { icon: Sparkles, label: 'Priority Processing', description: 'Faster conversion speed' },
  { icon: Shield, label: 'Premium Support', description: '24/7 customer service' },
  { icon: Star, label: 'Exclusive Features', description: 'Early access to new tools' },
];

const plans = [
  { id: 'monthly', name: 'Monthly', price: '49.000', period: '/bulan', badge: null, discount: null },
  { id: 'yearly', name: 'Yearly', price: '399.000', period: '/tahun', badge: 'HEMAT 32%', discount: 'Rp 189.000', popular: true },
  { id: 'lifetime', name: 'Lifetime', price: '899.000', period: 'sekali bayar', badge: 'BEST VALUE', discount: null },
];

export function PremiumScreen({ onNavigate }: PremiumScreenProps) {
  const [selectedPlan, setSelectedPlan] = useState('yearly');

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-[#1A1B2E] via-[#1E1F32] to-[#2A2B3E] relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#FFD700] to-transparent opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-40 left-0 w-64 h-64 bg-gradient-to-br from-[#675CFF] to-transparent opacity-20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-tr from-[#22D3EE] to-transparent opacity-20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          >
            <Star className="w-4 h-4 text-[#FFD700] opacity-30 fill-[#FFD700]" />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="px-6 pt-14 pb-4 relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => onNavigate('settings')}
            className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white flex-1">Go Premium</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 overflow-y-auto pb-6 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-8">
          {/* Premium Icon */}
          <div className="relative inline-block mb-6">
            <div className="absolute -inset-8 bg-gradient-to-br from-[#FFD700]/30 to-[#FFA500]/30 rounded-full blur-3xl"></div>
            <div className="relative w-28 h-28 rounded-[32px] bg-gradient-to-br from-[#FFD700] via-[#FFA500] to-[#FF8C00] flex items-center justify-center shadow-2xl shadow-[#FFD700]/50 animate-pulse">
              <Crown className="w-16 h-16 text-white" />
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-[#22D3EE] to-[#675CFF] flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <h2 className="text-white mb-3">Unlock Premium Features</h2>
          <p className="text-[#4E4F6E] mb-2">
            Dapatkan pengalaman terbaik tanpa iklan dan fitur eksklusif
          </p>
          <div className="flex items-center justify-center gap-2">
            <Star className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" />
            <Star className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" />
            <Star className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" />
            <Star className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" />
            <Star className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" />
            <span className="text-[#4E4F6E] text-sm ml-2">12,000+ pengguna premium</span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-8">
          <h3 className="text-white mb-4">Premium Features</h3>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="rounded-[22px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 p-4 flex items-center gap-4 shadow-lg shadow-black/20"
              >
                <div className="w-12 h-12 rounded-[18px] bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/20 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-[#FFD700]" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white text-sm">{feature.label}</h4>
                  <p className="text-[#4E4F6E] text-xs mt-0.5">{feature.description}</p>
                </div>
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#22D3EE] to-[#675CFF] flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="mb-6">
          <h3 className="text-white mb-4">Pilih Paket</h3>
          <div className="space-y-3">
            {plans.map(plan => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`w-full rounded-[24px] backdrop-blur-xl border-2 p-5 shadow-lg transition-all relative overflow-hidden ${
                  selectedPlan === plan.id
                    ? 'bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/10 border-[#FFD700] shadow-[#FFD700]/40'
                    : 'bg-gradient-to-br from-white/10 to-white/5 border-white/10'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-0 right-0 px-4 py-1 bg-gradient-to-r from-[#22D3EE] to-[#675CFF] rounded-bl-[18px] rounded-tr-[22px] shadow-lg">
                    <span className="text-white text-xs">⭐ PALING POPULER</span>
                  </div>
                )}

                {/* Discount Badge */}
                {plan.badge && !plan.popular && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full shadow-lg">
                    <span className="text-white text-xs">{plan.badge}</span>
                  </div>
                )}

                <div className="flex items-center gap-4">
                  {/* Radio Button */}
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    selectedPlan === plan.id
                      ? 'border-[#FFD700] bg-gradient-to-br from-[#FFD700] to-[#FFA500]'
                      : 'border-white/30'
                  }`}>
                    {selectedPlan === plan.id && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>

                  {/* Plan Info */}
                  <div className="flex-1 text-left">
                    <h4 className="text-white mb-1">{plan.name}</h4>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
                        Rp {plan.price}
                      </span>
                      <span className="text-[#4E4F6E] text-sm">{plan.period}</span>
                    </div>
                    {plan.discount && (
                      <p className="text-[#22D3EE] text-xs mt-1">Hemat {plan.discount}</p>
                    )}
                  </div>
                </div>

                {/* Selection Glow */}
                {selectedPlan === plan.id && (
                  <div className="absolute -inset-1 bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/20 rounded-[26px] blur-xl -z-10"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Purchase Button */}
        <button className="w-full h-16 rounded-[24px] bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FF8C00] text-white shadow-2xl shadow-[#FFD700]/50 active:scale-[0.98] transition-transform relative overflow-hidden group mb-4">
          <div className="absolute inset-0 bg-white/20 opacity-0 group-active:opacity-100 transition-opacity"></div>
          <div className="relative flex items-center justify-center gap-2">
            <Crown className="w-6 h-6" />
            <span>Subscribe Now</span>
          </div>
        </button>

        {/* Trust Badges */}
        <div className="rounded-[20px] bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 p-4 mb-4">
          <div className="flex items-center justify-around">
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#22D3EE]/20 to-[#675CFF]/20 flex items-center justify-center mx-auto mb-2">
                <Shield className="w-5 h-5 text-[#22D3EE]" />
              </div>
              <p className="text-[#4E4F6E] text-xs">Aman &<br/>Terpercaya</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/20 flex items-center justify-center mx-auto mb-2">
                <Zap className="w-5 h-5 text-[#FFD700]" />
              </div>
              <p className="text-[#4E4F6E] text-xs">Instant<br/>Activation</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#675CFF]/20 to-[#A88BFF]/20 flex items-center justify-center mx-auto mb-2">
                <Star className="w-5 h-5 text-[#675CFF]" />
              </div>
              <p className="text-[#4E4F6E] text-xs">Cancel<br/>Anytime</p>
            </div>
          </div>
        </div>

        {/* Terms */}
        <p className="text-[#4E4F6E] text-xs text-center mb-2">
          Dengan melanjutkan, Anda menyetujui{' '}
          <span className="text-[#22D3EE]">Syarat & Ketentuan</span> kami
        </p>
        <p className="text-[#4E4F6E] text-xs text-center">
          Pembayaran akan diperpanjang otomatis kecuali dibatalkan 24 jam sebelum periode berakhir
        </p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
      `}</style>
    </div>
  );
}
