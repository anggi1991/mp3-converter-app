import { Home, Library, Settings } from 'lucide-react';

interface BottomNavProps {
  active: 'home' | 'library' | 'settings';
  onNavigate: (screen: string) => void;
}

export function BottomNav({ active, onNavigate }: BottomNavProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-24 px-6 pb-8">
      <div className="h-full rounded-[28px] bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl shadow-black/40 flex items-center justify-around px-8">
        <button 
          onClick={() => onNavigate('home')}
          className="flex flex-col items-center gap-1 relative group"
        >
          {active === 'home' && (
            <>
              <div className="absolute -inset-4 bg-[#22D3EE]/20 rounded-2xl blur-xl"></div>
              <div className="absolute -inset-2 bg-gradient-to-b from-[#22D3EE]/10 to-transparent rounded-2xl"></div>
            </>
          )}
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all relative ${
            active === 'home' 
              ? 'bg-gradient-to-br from-[#675CFF] to-[#22D3EE] shadow-lg shadow-[#22D3EE]/50' 
              : 'bg-transparent group-active:bg-white/5'
          }`}>
            <Home className={`w-6 h-6 ${active === 'home' ? 'text-white' : 'text-[#4E4F6E]'}`} />
          </div>
        </button>

        <button 
          onClick={() => onNavigate('library')}
          className="flex flex-col items-center gap-1 relative group"
        >
          {active === 'library' && (
            <>
              <div className="absolute -inset-4 bg-[#22D3EE]/20 rounded-2xl blur-xl"></div>
              <div className="absolute -inset-2 bg-gradient-to-b from-[#22D3EE]/10 to-transparent rounded-2xl"></div>
            </>
          )}
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all relative ${
            active === 'library' 
              ? 'bg-gradient-to-br from-[#675CFF] to-[#22D3EE] shadow-lg shadow-[#22D3EE]/50' 
              : 'bg-transparent group-active:bg-white/5'
          }`}>
            <Library className={`w-6 h-6 ${active === 'library' ? 'text-white' : 'text-[#4E4F6E]'}`} />
          </div>
        </button>

        <button 
          onClick={() => onNavigate('settings')}
          className="flex flex-col items-center gap-1 relative group"
        >
          {active === 'settings' && (
            <>
              <div className="absolute -inset-4 bg-[#22D3EE]/20 rounded-2xl blur-xl"></div>
              <div className="absolute -inset-2 bg-gradient-to-b from-[#22D3EE]/10 to-transparent rounded-2xl"></div>
            </>
          )}
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all relative ${
            active === 'settings' 
              ? 'bg-gradient-to-br from-[#675CFF] to-[#22D3EE] shadow-lg shadow-[#22D3EE]/50' 
              : 'bg-transparent group-active:bg-white/5'
          }`}>
            <Settings className={`w-6 h-6 ${active === 'settings' ? 'text-white' : 'text-[#4E4F6E]'}`} />
          </div>
        </button>
      </div>
    </div>
  );
}
