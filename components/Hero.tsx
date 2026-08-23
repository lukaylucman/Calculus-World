import React from 'react';

interface HeroProps {
  onExploreClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  
  const handleAboutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[auto] md:min-h-screen flex flex-col justify-start items-center text-center pt-24 sm:pt-28 md:pt-20 lg:pt-20 pb-10 md:pb-0 overflow-hidden">
      
      {/* Central Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-green/1 blur-[120px] rounded-full pointer-events-none"></div>

      {/* --- DESKTOP LEFT ROBOT CONTAINER (Hanya muncul di XL screens) --- */}
      <div className="hidden xl:block absolute left-[1%] top-[55%] -translate-y-1/2 w-[350px] h-[460px] z-0 pointer-events-none select-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] bg-neon-green/20 blur-[90px] rounded-full animate-pulse"></div>
          <img 
            src="https://i.ibb.co.com/d0WsgRZ1/Desain-tanpa-judul-3-removebg-preview.png" 
            alt="Robot Left"
            className="w-full h-full object-contain animate-float drop-shadow-[0_0_20px_rgba(212,255,0,0.2)]"
          />
      </div>

      {/* --- DESKTOP RIGHT ROBOT CONTAINER (Hanya muncul di XL screens) --- */}
      <div className="hidden xl:block absolute right-[2%] top-[55%] -translate-y-1/2 w-[360px] h-[480px] z-0 pointer-events-none select-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] bg-neon-green/20 blur-[80px] rounded-full animate-pulse"></div>
          <img 
            src="https://i.ibb.co.com/Sw9PJDfZ/Gemini-Generated-Image-2vkbc52vkbc52vkb-removebg-preview-1.png" 
            alt="Robot Right"
            className="w-full h-full object-contain animate-float-delayed drop-shadow-[0_0_20px_rgba(212,255,0,0.2)]"
          />
      </div>

      {/* Container utama: Padding diatur agar konten tidak mepet layar */}
      <div className="relative z-10 flex flex-col items-center max-w-5xl px-6 md:px-6 animate-fade-in-up w-full">
        
        {/* --- LOGO & ROBOTS CONTAINER (Flex Row for Mobile) --- */}
        <div className="flex items-center justify-center w-full max-w-3xl mx-auto mb-6 md:mb-8 gap-4 sm:gap-8 relative">
            
            {/* --- MOBILE LEFT ROBOT --- */}
            <div className="block xl:hidden w-24 h-24 sm:w-28 sm:h-28 shrink-0 relative animate-float">
                 <div className="absolute inset-0 bg-neon-green/10 blur-xl rounded-full"></div>
                 <img 
                    src="https://i.ibb.co.com/d0WsgRZ1/Desain-tanpa-judul-3-removebg-preview.png" 
                    alt="Robot Left Mobile"
                    className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(212,255,0,0.3)]"
                 />
            </div>

            {/* --- Brand Logo --- */}
            <a 
                href="https://www.instagram.com/lukayproject"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group shrink-0 cursor-pointer block hover:scale-105 transition-transform duration-300"
            >
                <div className="absolute inset-0 bg-neon-green blur-[25px] opacity-40 group-hover:opacity-70 transition-opacity duration-500 rounded-3xl scale-90"></div>
                <img 
                    src="/logobrand.png" 
                    alt="Brand Logo"
                    className="w-24 h-24 sm:w-32 sm:h-32 relative z-10 drop-shadow-[0_0_15px_rgba(212,255,0,0.6)] object-contain"
                />
            </a>

             {/* --- MOBILE RIGHT ROBOT --- */}
            <div className="block xl:hidden w-24 h-24 sm:w-28 sm:h-28 shrink-0 relative animate-float-delayed">
                 <div className="absolute inset-0 bg-neon-green/10 blur-xl rounded-full"></div>
                 <img 
                    src="https://i.ibb.co.com/Sw9PJDfZ/Gemini-Generated-Image-2vkbc52vkbc52vkb-removebg-preview-1.png" 
                    alt="Robot Right Mobile"
                    className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(212,255,0,0.3)]"
                 />
            </div>

        </div>

        {/* Badge */}
        <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-neon-green-dim"></div>
            <span className="font-tech text-neon-green text-[10px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase border border-neon-green/30 px-3 py-1 rounded-full bg-neon-green/5 whitespace-nowrap">
            A LUKAY PROJECT PRODUCTION
            </span>
            <div className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-neon-green-dim"></div>
        </div>

        {/* Main Title - UPDATED: text-3xl on mobile, tracking-wide (not widest) to fit screen while being larger */}
        <h1 className="font-tech font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-wide sm:tracking-widest leading-none mb-2 glow-text whitespace-nowrap">
          THE WORLD OF
        </h1>
        <h1 className="font-tech font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-neon-green tracking-wide sm:tracking-widest leading-none mb-10 glow-text whitespace-nowrap">
          CALCULUS
        </h1>

        {/* Subtitle / Tagline */}
        <h2 className="font-tech font-bold text-sm sm:text-base md:text-lg text-neon-green uppercase tracking-widest mb-6">
          EXPLORING THE WORLD OF CALCULUS STEP BY STEP
        </h2>

        {/* Description Paragraph */}
        <p className="font-sans text-gray-400 text-xs sm:text-sm md:text-base max-w-3xl mx-auto leading-relaxed mb-10 px-4 text-center">
          Dive into the fundamental study of continuous change. From derivatives to integrals, discover how calculus models the universe, optimizes systems, and explains the infinite. Join me on my journey to explore the beauty of mathematical precision.
        </p>

        {/* Buttons Container */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 justify-center w-full sm:w-auto relative">
          <style>{`
            @keyframes arrow-pulse-right {
              0%, 100% { transform: translateX(0); opacity: 0.4; text-shadow: 0 0 5px rgba(212,255,0,0.2); }
              50% { transform: translateX(6px); opacity: 1; text-shadow: 0 0 15px rgba(212,255,0,0.9); }
            }
            @keyframes arrow-pulse-left {
              0%, 100% { transform: translateX(0); opacity: 0.4; text-shadow: 0 0 5px rgba(212,255,0,0.2); }
              50% { transform: translateX(-6px); opacity: 1; text-shadow: 0 0 15px rgba(212,255,0,0.9); }
            }
            .animate-arrow-right { animation: arrow-pulse-right 1.5s ease-in-out infinite; }
            .animate-arrow-left { animation: arrow-pulse-left 1.5s ease-in-out infinite; }
          `}</style>
          
          <div className="flex items-center justify-center gap-3 sm:gap-5 w-full sm:w-auto">
            {/* Left Arrows */}
            <span className="text-neon-green font-tech font-black text-lg sm:text-2xl tracking-tighter animate-arrow-right select-none">
              &gt;&gt;&gt;
            </span>
            
            <button 
              onClick={onExploreClick}
              className="px-6 py-2 sm:px-8 sm:py-3 bg-neon-green text-dinamik-dark font-tech font-bold text-sm md:text-lg tracking-wider rounded-2xl hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(212,255,0,0.4)] flex items-center justify-center z-10 shrink-0"
            >
              EXPLORE NOW
            </button>
            
            {/* Right Arrows */}
            <span className="text-neon-green font-tech font-black text-lg sm:text-2xl tracking-tighter animate-arrow-left select-none">
              &lt;&lt;&lt;
            </span>
          </div>

          <a 
            href="#about"
            onClick={handleAboutClick}
            className="px-6 py-2 sm:px-8 sm:py-3 bg-transparent border-2 border-neon-green text-neon-green font-tech font-bold text-sm md:text-lg tracking-wider rounded-2xl hover:bg-neon-green/10 transition-all duration-300 flex items-center justify-center cursor-pointer shrink-0"
          >
            ABOUT ME
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;