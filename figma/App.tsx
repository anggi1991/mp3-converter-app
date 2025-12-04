import { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { SelectVideoScreen } from './components/SelectVideoScreen';
import { VideoDetailScreen } from './components/VideoDetailScreen';
import { ConvertingScreen } from './components/ConvertingScreen';
import { ResultScreen } from './components/ResultScreen';
import { AudioCutterScreen } from './components/AudioCutterScreen';
import { LibraryScreen } from './components/LibraryScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { PremiumScreen } from './components/PremiumScreen';
import { StyleGuideScreen } from './components/StyleGuideScreen';
import { FlowDiagram } from './components/FlowDiagram';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [convertedAudio, setConvertedAudio] = useState<any>(null);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={setCurrentScreen} />;
      case 'select-video':
        return <SelectVideoScreen onNavigate={setCurrentScreen} onSelectVideo={setSelectedVideo} />;
      case 'video-detail':
        return <VideoDetailScreen onNavigate={setCurrentScreen} video={selectedVideo} />;
      case 'converting':
        return <ConvertingScreen onNavigate={setCurrentScreen} onComplete={setConvertedAudio} />;
      case 'result':
        return <ResultScreen onNavigate={setCurrentScreen} audio={convertedAudio} />;
      case 'audio-cutter':
        return <AudioCutterScreen onNavigate={setCurrentScreen} audio={convertedAudio} />;
      case 'library':
        return <LibraryScreen onNavigate={setCurrentScreen} />;
      case 'settings':
        return <SettingsScreen onNavigate={setCurrentScreen} />;
      case 'premium':
        return <PremiumScreen onNavigate={setCurrentScreen} />;
      case 'style-guide':
        return <StyleGuideScreen onNavigate={setCurrentScreen} />;
      case 'flow':
        return <FlowDiagram onNavigate={setCurrentScreen} />;
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1B2E] flex items-center justify-center p-4">
      <div className="w-full max-w-[390px] h-[844px] bg-[#1A1B2E] rounded-[40px] shadow-2xl overflow-hidden relative">
        {renderScreen()}
      </div>
    </div>
  );
}