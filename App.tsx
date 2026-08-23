import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Speakers from './components/Speakers';
import Registration from './components/Registration';
import Footer from './components/Footer';
import MatrixRain from './components/MatrixRain';
import CoreModules from './components/CoreModules';
import ModuleDetail from './components/ModuleDetail';
import AskAI from './components/AskAI';

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'modules'>('landing');
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);
  
  // State untuk AI Chat Popup
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);

  const navigateToModules = () => {
    setCurrentView('modules');
    setSelectedModuleId(null); // Reset selection when going to list
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentView('landing');
    setSelectedModuleId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAbout = () => {
    // Jika sedang di modules, pindah ke landing dulu
    if (currentView !== 'landing') {
        setCurrentView('landing');
        setSelectedModuleId(null);
        // Timeout sebentar agar rendering landing selesai baru scroll
        setTimeout(() => {
            const element = document.getElementById('about');
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    } else {
        // Jika sudah di landing, langsung scroll
        const element = document.getElementById('about');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleModuleClick = (id: number) => {
    setSelectedModuleId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToModules = () => {
    setSelectedModuleId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const openAiChat = () => {
      setIsAiChatOpen(true);
  };

  // Logic Updated: Floating Button muncul di view 'modules' (baik list maupun detail)
  const showFloatingButton = currentView === 'modules';

  return (
    <div className="min-h-screen bg-dinamik-dark text-white font-sans selection:bg-neon-green selection:text-dinamik-dark relative">
      <MatrixRain />
      {/* Continuous Grid Wrapper ending before Footer */}
      <div className="bg-grid-pattern bg-grid relative z-10 flex flex-col min-h-screen">
        <Navbar 
          onNavigateHome={navigateToHome} 
          onNavigateModules={navigateToModules} 
          onNavigateMembers={navigateToAbout}
          onOpenAi={openAiChat}
        />
        
        <main className="flex-grow">
          {currentView === 'landing' ? (
            <>
              <Hero onExploreClick={navigateToModules} />
              {/* Placeholder for Countdown section if needed - hidden on mobile */}
              <div id="countdown" className="h-0 md:h-10"></div>
              <Speakers />
              <Registration />
            </>
          ) : (
            // Logic: If a module is selected, show Detail, otherwise show List
            selectedModuleId ? (
                <ModuleDetail 
                    moduleId={selectedModuleId} 
                    onBack={handleBackToModules} 
                    onOpenAi={openAiChat} // Pass function to open AI from detail
                />
            ) : (
                <CoreModules 
                    onModuleClick={handleModuleClick} 
                    onBackHome={navigateToHome}
                    onOpenAi={openAiChat} // Pass function to open AI from list
                />
            )
          )}
        </main>
        
        <Footer 
            simple={currentView === 'modules'} 
            onNavigateHome={navigateToHome}
            onNavigateMembers={navigateToAbout}
            onNavigateModules={navigateToModules}
            onOpenAi={openAiChat}
        />

        {/* Global AI Chat Component */}
        <AskAI 
            isOpen={isAiChatOpen} 
            onClose={() => setIsAiChatOpen(false)} 
            onOpen={openAiChat}
            showFloatingButton={showFloatingButton} // Control floating button visibility
        />
      </div>
    </div>
  );
}

export default App;