import React from 'react';
import { MapPin, Mail, Phone, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  simple?: boolean;
  onNavigateHome?: () => void;
  onNavigateMembers?: () => void;
  onNavigateModules?: () => void;
  onOpenAi?: () => void;
}

const Footer: React.FC<FooterProps> = ({ 
    simple = false,
    onNavigateHome,
    onNavigateMembers,
    onNavigateModules,
    onOpenAi
}) => {
  
  const handleMenuClick = (action: string) => {
    switch(action) {
        case 'Home':
            if (onNavigateHome) onNavigateHome();
            break;
        case 'Members':
            if (onNavigateMembers) onNavigateMembers();
            break;
        case 'Materi':
            if (onNavigateModules) onNavigateModules();
            break;
        case 'Tanya AI':
            if (onOpenAi) onOpenAi();
            break;
        default:
            break;
    }
  };

  const menuItems = [
      { label: 'Home', action: 'Home' },
      { label: 'About Me', action: 'Members' },
      { label: 'Materi', action: 'Materi' },
      { label: 'Tanya AI', action: 'Tanya AI' },
  ];

  return (
    <footer className={`relative z-50 bg-dinamik-dark border-t border-white/10 ${simple ? 'py-6' : 'pt-16 pb-8'}`}>
      <div className="container mx-auto px-6">
        
        {/* Konten Utama Footer - Hanya muncul jika simple=false */}
        {!simple && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                {/* Column 1: Brand */}
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        {/* Custom Math Logo - Background removed & size matched to Navbar */}
                        <img 
                            src="/logomtk.png"
                            alt="Math Logo"
                            className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(212,255,0,0.5)]"
                        />
                        <div>
                            <h3 className="font-tech font-bold text-xl text-neon-green tracking-widest">CALCULUS WORLD</h3>
                            <p className="text-xs text-gray-400">Part of Pilkom UPI '25</p>
                        </div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                        Platform ini saya kembangkan secara mandiri sebagai pusat referensi akademis untuk studi kalkulus. Melalui pendekatan yang sistematis, situs ini menguraikan teori-teori matematis yang kompleks agar lebih mudah dipahami dan diterapkan dalam penyelesaian masalah analisis.
                    </p>
                </div>

                {/* Column 2: Menu */}
                <div>
                    <h4 className="font-tech text-neon-green text-xl font-bold mb-6 uppercase tracking-wider">MENU</h4>
                    <ul className="space-y-4">
                        {menuItems.map((item) => (
                            <li key={item.label}>
                                <button 
                                    onClick={() => handleMenuClick(item.action)}
                                    className="flex items-center gap-2 text-gray-400 hover:text-neon-green transition-colors group bg-transparent border-none p-0 cursor-pointer"
                                >
                                    <span className="text-sm">{item.label}</span>
                                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0" />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column 3: Contact */}
                <div>
                    <h4 className="font-tech text-neon-green text-xl font-bold mb-6 uppercase tracking-wider">KONTAK</h4>
                    <ul className="space-y-6">
                        <li className="flex items-start gap-3">
                            <MapPin className="text-neon-green w-5 h-5 flex-shrink-0 mt-1" />
                            <span className="text-gray-300 text-sm">
                                Program Studi Pendidikan Ilmu Komputer, FPMIPA UPI, 
                                Jl. Dr. Setiabudi No.229, Bandung
                            </span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="text-neon-green w-5 h-5 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">luckyluqmanulhakim@student.upi.edu</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone className="text-neon-green w-5 h-5 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">+62 859-1101-22200 (lucky)</span>
                        </li>
                    </ul>
                </div>
            </div>
        )}

        {/* Bottom Bar - Always visible */}
        <div className={`${!simple ? 'border-t border-white/10 pt-8' : ''} flex flex-col md:flex-row justify-between items-center text-xs text-gray-500`}>
            <p>© 2026 The World of Calculus. Crafted by Lucky Luqmanul Hakim.</p>
            <p className="mt-2 md:mt-0">
                Created by <span className="text-neon-green font-bold">LUKAY PROJECT</span>
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;