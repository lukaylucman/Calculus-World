import React from 'react';
import { TrendingUp, Calculator, Triangle, ArrowRight, Waves, Home, Bot, Sparkles } from 'lucide-react';

const modules = [
  {
    id: 1,
    title: "TURUNAN",
    desc: "Memahami laju perubahan, aturan rantai, dan aplikasi turunan dalam fungsi.",
    icon: <TrendingUp size={18} />,
    // Kurva sigmoid naik
    graphPath: "M 10 90 C 40 90, 40 10, 90 10", 
    color: "text-neon-green"
  },
  {
    id: 2,
    title: "ALJABAR",
    desc: "Operasi dasar matematika, penyederhanaan ekspresi, dan pemecahan persamaan.",
    icon: <Calculator size={18} />,
    // Parabola terbalik
    graphPath: "M 10 90 Q 50 10 90 90", 
    color: "text-neon-green"
  },
  {
    id: 3,
    title: "TRIGONOMETRI",
    desc: "Hubungan antar sudut, fungsi sinus kosinus, dan identitas trigonometri.",
    icon: <Triangle size={18} />,
    // Gelombang Sinus
    graphPath: "M 10 50 Q 30 10 50 50 T 90 50", 
    color: "text-neon-green"
  },
  {
    id: 4,
    title: "LIMIT",
    desc: "Konsep dasar kontinuitas dan perilaku fungsi mendekati titik tertentu.",
    icon: <ArrowRight size={18} />,
    // Kurva eksponensial naik
    graphPath: "M 10 90 Q 60 90 90 30", 
    color: "text-neon-green"
  },
  {
    id: 5,
    title: "INTEGRAL",
    desc: "Menghitung akumulasi perubahan, luas di bawah kurva, dan volume benda putar.",
    icon: <Waves size={18} />,
    // Kurva S
    graphPath: "M 10 90 C 40 90, 60 10, 90 10", 
    color: "text-neon-green"
  }
];

interface CoreModulesProps {
    onModuleClick?: (id: number) => void;
    onBackHome?: () => void;
    onOpenAi?: () => void; // Prop baru untuk membuka AI Chat
}

const CoreModules: React.FC<CoreModulesProps> = ({ onModuleClick, onBackHome, onOpenAi }) => {
  return (
    <section id="materi" className="min-h-screen pt-24 pb-20 relative animate-fade-in-up overflow-hidden flex flex-col justify-center">
       {/* Background Elements */}
       <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-neon-green/5 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Back Home Button - Posisi disesuaikan ke top-20 agar di tengah antara Navbar dan Judul */}
        {onBackHome && (
            <div className="absolute top-20 left-6 md:left-12 z-30">
                <button 
                    onClick={onBackHome}
                    className="flex items-center gap-2 px-5 py-2 border border-neon-green/30 text-neon-green rounded-full hover:bg-neon-green/10 transition-colors font-tech tracking-wider text-xs bg-black/40 backdrop-blur-sm"
                >
                    <Home size={14} />
                    HOME
                </button>
            </div>
        )}

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="mb-10 mt-8 md:mt-0">
            <h2 className="font-tech text-white text-4xl md:text-6xl font-black tracking-widest mb-2 uppercase glow-text">
                CORE <span className="text-neon-green">MODULES</span>
            </h2>
            <div className="h-1 w-24 bg-neon-green mx-auto rounded-full mb-4 shadow-[0_0_10px_#D4FF00]"></div>
            <p className="text-gray-400 font-sans text-xs md:text-sm tracking-wide max-w-2xl mx-auto opacity-80">
                Pilih modul di bawah untuk memulai petualangan kalkulusmu!
            </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 justify-center items-center mb-16">
          {modules.map((mod) => (
            <div 
                key={mod.id} 
                onClick={() => onModuleClick && onModuleClick(mod.id)}
                className="group relative w-full max-w-[240px] mx-auto h-[270px] transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
                {/* --- HUD FRAME SVG (Background) --- */}
                {/* SVG adjusted for h-[270px] (shorter, compact) */}
                <svg className="absolute inset-0 w-full h-full drop-shadow-[0_0_8px_rgba(212,255,0,0.3)]" viewBox="0 0 300 330" preserveAspectRatio="none">
                    {/* Main Path - Compact Hex/Chamfered Box */}
                    <path 
                        d="M 40 5 L 260 5 L 295 40 L 295 290 L 260 325 L 40 325 L 5 290 L 5 40 Z" 
                        fill="rgba(5, 26, 13, 0.6)" 
                        stroke="#D4FF00" 
                        strokeWidth="2"
                        className="group-hover:stroke-[3px] transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(212,255,0,0.8)]"
                    />
                    
                    {/* Corner Accents */}
                    <path d="M 40 12 L 260 12" stroke="#D4FF00" strokeWidth="1" strokeOpacity="0.5" fill="none" />
                    <path d="M 40 318 L 260 318" stroke="#D4FF00" strokeWidth="1" strokeOpacity="0.5" fill="none" />
                </svg>

                {/* --- CARD CONTENT --- */}
                <div className="absolute inset-0 flex flex-col items-center px-3 py-4 z-10">
                    
                    {/* Top Icon */}
                    <div className="mb-2 text-neon-green group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_5px_rgba(212,255,0,0.8)]">
                        {mod.icon}
                    </div>

                    {/* Title Container */}
                    <div className="relative mb-2 w-full flex justify-center">
                        <div className="absolute inset-0 border border-neon-green/50 skew-x-[-20deg] bg-neon-green/5"></div>
                        <h3 className="relative font-tech text-sm font-bold text-neon-green px-4 py-1 uppercase tracking-widest z-10 group-hover:text-white transition-colors duration-300">
                            {mod.title}
                        </h3>
                    </div>

                    {/* Description - Compact text, no auto margin so it stays close to title */}
                    <p className="font-sans text-[10px] text-gray-400 text-center mb-3 leading-snug px-1 line-clamp-3">
                        {mod.desc}
                    </p>

                    {/* Graph Area - Fixed height, pushed slightly down but no huge gap */}
                    <div className="w-full h-[80px] relative mt-auto mb-2">
                        {/* Container Grafik */}
                        <div className="absolute inset-0 border border-neon-green/30 rounded-md bg-[#020d04]/80 overflow-hidden">
                            {/* Grid Background */}
                            <div className="absolute inset-0" 
                                 style={{
                                     backgroundImage: `linear-gradient(rgba(212, 255, 0, 0.1) 1px, transparent 1px), 
                                                       linear-gradient(90deg, rgba(212, 255, 0, 0.1) 1px, transparent 1px)`,
                                     backgroundSize: '14px 14px'
                                 }}>
                            </div>

                            {/* SVG Curve */}
                            <svg className="absolute inset-0 w-full h-full p-2" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <path 
                                    d={mod.graphPath} 
                                    fill="none" 
                                    stroke="#D4FF00" 
                                    strokeWidth="3" 
                                    strokeLinecap="round"
                                    className="drop-shadow-[0_0_5px_rgba(212,255,0,0.5)]"
                                />
                                <circle r="4" fill="#ff0055" className="drop-shadow-[0_0_8px_#ff0055]">
                                    <animateMotion 
                                        dur="4s" 
                                        repeatCount="indefinite" 
                                        path={mod.graphPath}
                                        keyPoints="0;1;0"
                                        keyTimes="0;0.5;1"
                                        calcMode="linear"
                                    />
                                </circle>
                            </svg>
                        </div>
                    </div>

                </div>
            </div>
          ))}
        </div>

        {/* --- AI HELP SECTION (CTA at the bottom) --- */}
        <div className="max-w-3xl mx-auto px-4">
            <div className="relative overflow-hidden bg-gradient-to-r from-[#0a1f12] to-[#020d04] border border-neon-green/30 rounded-2xl p-8 md:p-10 text-center group">
                
                {/* Background Animation */}
                <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-neon-green/10 rounded-full blur-[60px] animate-pulse"></div>
                <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-neon-green/10 rounded-full blur-[60px] animate-pulse delay-700"></div>

                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-16 h-16 bg-neon-green/10 rounded-full flex items-center justify-center mb-4 border border-neon-green/30 shadow-[0_0_15px_rgba(212,255,0,0.2)]">
                        <Bot className="text-neon-green w-8 h-8" />
                    </div>
                    
                    <h3 className="font-tech text-2xl md:text-3xl text-white font-bold mb-2 uppercase tracking-wide">
                        Masih Bingung dengan Materi?
                    </h3>
                    <p className="text-gray-400 font-sans text-sm md:text-base max-w-lg mb-6 leading-relaxed">
                        Jangan biarkan kalkulus membuatmu pusing. Asisten AI kami siap membantu menjelaskan konsep yang sulit dengan bahasa yang lebih sederhana.
                    </p>
                    
                    <button 
                        onClick={onOpenAi}
                        className="group relative px-8 py-3 bg-neon-green text-black font-tech font-bold text-sm tracking-widest uppercase rounded-xl hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(212,255,0,0.3)] flex items-center gap-2"
                    >
                        <Sparkles size={16} className="group-hover:animate-spin" />
                        <span>Tanya AI Sekarang</span>
                    </button>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default CoreModules;