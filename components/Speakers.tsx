import React from 'react';
import { Play, PlusSquare } from 'lucide-react';

interface Member {
  id: string;
  name: string;
  nim: string;
  quote: string;
  major: string;
  image: string;
}

const members: Member[] = [
  {
    id: "1",
    name: "Lucky Luqmanul Hakim",
    nim: "2502735",
    quote: "\"PENGEN JADI ORANG YANG GA GAMPANG BERHARAP DAN TERLALU EXCITED SAMA SESUATU.\"",
    major: "PENDIDIKAN ILMU KOMPUTER UPI",
    image: "/siganteng.png", 
  }
];

const Speakers: React.FC = () => {
  return (
    // Updated: pb-0 on mobile (removed padding entirely), kept pb-20 for md/desktop
    <section id="about" className="relative pt-0 pb-0 md:pb-20 bg-transparent">
       {/* Section Header */}
      <div className="container mx-auto px-6 mb-8 md:mb-16 text-center">
        {/* Ukuran mobile dikecilkan ke text-3xl */}
        <h2 className="font-tech font-black text-3xl md:text-6xl text-white uppercase tracking-wider leading-none mb-2">
          MEET THE <span className="text-neon-green">CREATOR</span>
        </h2>
        <p className="text-gray-400 text-sm md:text-base font-light tracking-wide mt-4">
          Kenali developer di balik eksplorasi dunia kalkulus ini
        </p>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex justify-center w-full">
          {members.map((member) => (
            <div key={member.id} className="flex flex-col items-center text-center md:flex-row md:items-stretch md:text-left gap-8 md:gap-12 bg-[#051a0d]/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 md:p-12 max-w-4xl w-full mx-auto group relative overflow-hidden shadow-2xl">
              
              {/* Background Ambient Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-neon-green/5 blur-[80px] rounded-full pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-neon-green/5 blur-[60px] rounded-full pointer-events-none"></div>

              {/* Left Column: Profile Photo & NIM */}
              <div className="flex flex-col items-center shrink-0 relative z-10 w-full md:w-1/3">
                <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full border-[2px] border-neon-green/30 p-2 shadow-[0_0_15px_rgba(212,255,0,0.1)] group-hover:border-neon-green group-hover:shadow-[0_0_30px_rgba(212,255,0,0.4)] transition-all duration-500">
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#0a150f]">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                </div>
                
                {/* NIM Badge under photo */}
                <div className="mt-4 md:mt-6">
                  <div className="bg-[#051a0d] border border-neon-green/50 rounded-md px-4 py-2 flex items-center justify-center gap-2 shadow-lg transition-colors duration-300 group-hover:border-neon-green group-hover:bg-[#0a2e17]">
                    <div className="w-2 h-2 rounded-full bg-neon-green flex items-center justify-center animate-pulse shrink-0">
                         <div className="w-1 h-1 bg-black rounded-full"></div>
                    </div>
                    <span className="font-tech text-neon-green font-bold text-xs md:text-sm tracking-[0.2em] flex items-center leading-none mt-0.5">
                        {member.nim}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Name, Quote, & Major */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 relative z-10 w-full justify-center">
                
                {/* Name */}
                <h3 className="font-sans font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-wide uppercase mb-4 md:mb-6 drop-shadow-md text-center md:text-left w-full">
                  LUCKY LUQMANUL HAKIM
                </h3>
                
                {/* Quote Glassmorphism Box */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 sm:p-5 md:p-6 mb-6 md:mb-8 shadow-lg w-full relative overflow-hidden group-hover:border-white/20 transition-colors duration-300 text-center md:text-left">
                  {/* Decorative quote mark */}
                  <div className="absolute -top-2 -left-2 opacity-10">
                     <span className="font-serif text-8xl text-neon-green">"</span>
                  </div>
                  <p className="text-gray-300 text-xs sm:text-sm md:text-base font-light italic leading-relaxed relative z-10 px-2">
                      {member.quote}
                  </p>
                </div>
                
                {/* Major Badge (Modern Button style) */}
                <div className="mt-2 md:mt-0 w-full flex justify-center md:justify-start">
                  <div className="inline-flex items-center justify-center gap-2 border-2 border-neon-green/60 text-neon-green px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg text-[9px] sm:text-[10px] md:text-xs font-bold tracking-widest uppercase hover:bg-neon-green hover:text-black transition-all duration-300 shadow-[0_0_10px_rgba(212,255,0,0.1)] group-hover:shadow-[0_0_20px_rgba(212,255,0,0.4)] cursor-default bg-black/20 backdrop-blur-sm">
                      <PlusSquare size={16} className="group-hover:text-black transition-colors" />
                      <span>{member.major}</span>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Speakers;