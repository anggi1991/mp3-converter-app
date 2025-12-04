import { ArrowLeft, Search, Video, Clock } from 'lucide-react';
import { useState } from 'react';

interface SelectVideoScreenProps {
  onNavigate: (screen: string) => void;
  onSelectVideo: (video: any) => void;
}

const videos = [
  { id: 1, thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop', duration: '3:45', name: 'Summer Vibes Mix', size: '45 MB', resolution: '1920x1080' },
  { id: 2, thumbnail: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop', duration: '24:16', name: 'Podcast Episode', size: '180 MB', resolution: '1280x720' },
  { id: 3, thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', duration: '8:30', name: 'Tutorial Video', size: '95 MB', resolution: '1920x1080' },
  { id: 4, thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop', duration: '5:12', name: 'Concert Recording', size: '68 MB', resolution: '3840x2160' },
  { id: 5, thumbnail: 'https://images.unsplash.com/photo-1445985543470-41fba5c3144a?w=300&h=300&fit=crop', duration: '12:08', name: 'Interview Session', size: '110 MB', resolution: '1920x1080' },
  { id: 6, thumbnail: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&h=300&fit=crop', duration: '6:45', name: 'Product Review', size: '72 MB', resolution: '1920x1080' },
  { id: 7, thumbnail: 'https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=300&h=300&fit=crop', duration: '4:20', name: 'Music Performance', size: '58 MB', resolution: '1280x720' },
  { id: 8, thumbnail: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop', duration: '15:33', name: 'Gaming Stream', size: '145 MB', resolution: '1920x1080' },
  { id: 9, thumbnail: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&h=300&fit=crop', duration: '7:22', name: 'Travel Vlog', size: '82 MB', resolution: '3840x2160' },
];

export function SelectVideoScreen({ onNavigate, onSelectVideo }: SelectVideoScreenProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedVideoData, setSelectedVideoData] = useState<any>(null);

  const handleVideoClick = (video: any) => {
    setSelectedVideoData(video);
  };

  const handleUseVideo = () => {
    onSelectVideo(selectedVideoData);
    onNavigate('video-detail');
  };

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
          <h1 className="text-white flex-1">Pilih Video</h1>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4E4F6E]" />
          <input
            type="text"
            placeholder="Cari video..."
            className="w-full h-14 rounded-[22px] bg-white/10 backdrop-blur-xl border border-white/10 pl-12 pr-4 text-white placeholder-[#4E4F6E] shadow-lg"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-4">
          {['Semua', 'Video', 'Folder'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`px-6 py-2.5 rounded-full transition-all ${
                activeTab === tab.toLowerCase()
                  ? 'bg-gradient-to-r from-[#675CFF] to-[#A88BFF] text-white shadow-lg shadow-[#675CFF]/40'
                  : 'bg-white/5 text-[#4E4F6E] border border-white/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Video Grid */}
      <div className="flex-1 px-6 overflow-y-auto pb-6">
        <div className="grid grid-cols-3 gap-3">
          {videos.map(video => (
            <button
              key={video.id}
              onClick={() => handleVideoClick(video)}
              className="aspect-square rounded-[18px] overflow-hidden relative group"
            >
              <img src={video.thumbnail} alt={video.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm flex items-center gap-1">
                <Clock className="w-3 h-3 text-white" />
                <span className="text-white text-xs">{video.duration}</span>
              </div>
              <div className="absolute inset-0 border-2 border-[#22D3EE] rounded-[18px] opacity-0 group-active:opacity-100 transition-opacity"></div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Sheet */}
      {selectedVideoData && (
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-end"
          onClick={() => setSelectedVideoData(null)}
        >
          <div 
            className="w-full bg-gradient-to-br from-[#1E1F32] to-[#2A2B3E] rounded-t-[32px] p-6 shadow-2xl border-t border-white/10"
            onClick={e => e.stopPropagation()}
          >
            {/* Handle bar */}
            <div className="w-12 h-1.5 rounded-full bg-white/20 mx-auto mb-6"></div>

            {/* Preview */}
            <div className="rounded-[24px] overflow-hidden mb-6 shadow-2xl">
              <img src={selectedVideoData.thumbnail} alt={selectedVideoData.name} className="w-full aspect-video object-cover" />
            </div>

            {/* Info */}
            <div className="mb-6">
              <h3 className="text-white mb-4">{selectedVideoData.name}</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-3 text-center">
                  <Video className="w-5 h-5 text-[#22D3EE] mx-auto mb-1" />
                  <p className="text-[#4E4F6E] text-xs">{selectedVideoData.resolution}</p>
                </div>
                <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-3 text-center">
                  <Clock className="w-5 h-5 text-[#22D3EE] mx-auto mb-1" />
                  <p className="text-[#4E4F6E] text-xs">{selectedVideoData.duration}</p>
                </div>
                <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-3 text-center">
                  <div className="w-5 h-5 mx-auto mb-1 text-[#22D3EE]">📦</div>
                  <p className="text-[#4E4F6E] text-xs">{selectedVideoData.size}</p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleUseVideo}
              className="w-full h-14 rounded-[22px] bg-gradient-to-br from-[#675CFF] via-[#7B6FFF] to-[#22D3EE] text-white shadow-lg shadow-[#675CFF]/40 active:scale-[0.98] transition-transform"
            >
              Gunakan Video Ini
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
