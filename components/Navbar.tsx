import React, { useState, useEffect } from 'react';
import { NavItem } from '../types';
import { Menu, X } from 'lucide-react';

const navItems: NavItem[] = [
  { label: 'HOME', href: '#home' },
  { label: 'ABOUT ME', href: '#about' },
  { label: 'MATERI', href: '#materi' }, 
  { label: 'TANYA AI', href: '#tanya ai' },
];

interface NavbarProps {
  onNavigateHome: () => void;
  onNavigateModules: () => void;
  onNavigateMembers: () => void;
  onOpenAi: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigateHome, onNavigateModules, onNavigateMembers, onOpenAi }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (item.label === 'HOME') {
      onNavigateHome();
    } else if (item.label === 'MATERI') {
      onNavigateModules();
    } else if (item.label === 'ABOUT ME') {
      onNavigateMembers();
    } else if (item.label === 'TANYA AI') {
      onOpenAi();
    }
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-white/5 ${
        scrolled 
          ? 'bg-nav-dark/90 backdrop-blur-xl py-2 shadow-lg shadow-neon-green/5' 
          : 'bg-nav-dark/40 backdrop-blur-md py-4' 
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={onNavigateHome}>
          <div className="relative">
            <div className="absolute inset-0 bg-neon-green blur-md opacity-20"></div>
            {/* Custom Math Logo */}
            <img 
              src="/logomtk.png"
              alt="Math Logo"
              className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(212,255,0,0.5)] relative z-10"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-tech font-bold text-lg tracking-widest text-neon-green leading-none">
              CALCULUS
            </span>
            <span className="text-[9px] text-neon-green-dim tracking-wide font-sans">
              CONQUER MATH WITH TECHNOLOGY
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item)}
              className="font-tech text-xs tracking-wider text-white hover:text-neon-green transition-colors duration-300 uppercase cursor-pointer"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Content - UPDATED STYLE */}
      {mobileMenuOpen && (
        // Dropdown di kanan (right-0), lebar secukupnya (min-w-[200px]), teks rata kiri (items-start)
        <div className="md:hidden bg-nav-dark/95 backdrop-blur-md border-b border-l border-white/10 absolute top-full right-0 w-auto min-w-[200px] rounded-bl-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] animate-fade-in-up">
          <div className="flex flex-col p-6 space-y-5 items-start">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className="font-tech text-white hover:text-neon-green text-sm uppercase tracking-widest transition-colors duration-200 w-full text-left cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;