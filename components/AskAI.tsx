import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, Sparkles, Loader2 } from 'lucide-react';

interface AskAIProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  showFloatingButton?: boolean;
}

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  visualType?: string; // Tipe visualisasi: 'turunan', 'integral', dll
}

// --- KOMPONEN VISUALISASI MINI UNTUK CHAT ---
const ChatVisual: React.FC<{ type: string }> = ({ type }) => {
    const color = "#D4FF00"; // Neon Green
    
    let path = "";
    let label = "";

    switch(type) {
        case 'turunan': // Sigmoid / Tangent
            path = "M 10 90 C 40 90, 40 10, 90 10";
            label = "Gradient Slope";
            break;
        case 'integral': // Area under curve
            path = "M 10 90 Q 50 10 90 90 L 90 90 L 10 90 Z";
            label = "Area Accumulation";
            break;
        case 'limit': // Approach
            path = "M 10 90 Q 60 90 90 30";
            label = "Approaching Limit";
            break;
        case 'trigonometri': // Sine Wave
            path = "M 10 50 Q 30 10 50 50 T 90 50";
            label = "Periodic Wave";
            break;
        case 'aljabar': // Parabola
            path = "M 10 10 Q 50 90 90 10";
            label = "Quadratic Curve";
            break;
        default:
            return null;
    }

    return (
        <div className="mt-3 mb-1 w-full h-32 bg-[#020d04] border border-neon-green/30 rounded-lg relative overflow-hidden flex items-center justify-center group">
            <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
            <svg viewBox="0 0 100 100" className="w-full h-full p-4 drop-shadow-[0_0_5px_rgba(212,255,0,0.5)]">
                 <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
                 {type === 'integral' && <path d={path} fill={color} fillOpacity="0.2" stroke="none" />}
                 <circle r="3" fill="white">
                    <animateMotion dur="3s" repeatCount="indefinite" path={path} />
                 </circle>
            </svg>
            <div className="absolute bottom-1 right-2 text-[9px] text-neon-green font-tech tracking-widest bg-black/50 px-2 rounded border border-neon-green/20">
                VISUAL: {label}
            </div>
        </div>
    );
};

const AskAI: React.FC<AskAIProps> = ({ isOpen, onClose, onOpen, showFloatingButton = true }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Halo! 👋 Saya Asisten Kalkulus World.\n\nKamu bisa ngobrol santai atau tanya materi seperti:\n1. Rumus Turunan\n2. Rumus Integral\n3. Lihat Visual Integral\n\nMau mulai dari mana?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll ke pesan terakhir
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMsg = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to fetch response');
      }

      const data = await res.json();
      let botText = data.text;
      let visualType: string | undefined = undefined;

      // Parse optional visual tag from AI response
      const visualMatch = botText.match(/\[VISUAL:\s*(turunan|integral|limit|trigonometri|aljabar)\]/i);
      if (visualMatch) {
        visualType = visualMatch[1].toLowerCase();
        botText = botText.replace(visualMatch[0], '').trim();
      }

      setMessages(prev => [...prev, { role: 'model', text: botText, visualType }]);
    } catch (error: any) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: error.message || "Maaf, terjadi kesalahan saat menghubungi server. Silakan coba lagi." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      {showFloatingButton && !isOpen && (
        <button
          onClick={onOpen}
          className="fixed bottom-6 right-6 z-50 group flex items-center justify-center w-14 h-14 bg-neon-green rounded-full shadow-[0_0_20px_rgba(212,255,0,0.4)] hover:scale-110 transition-all duration-300 animate-bounce-slow"
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-full transition-opacity"></div>
          <Bot size={28} className="text-black" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed z-[60] bottom-4 left-4 right-4 md:bottom-24 md:right-6 md:left-auto md:w-[350px] h-[60vh] md:h-[450px] flex flex-col animate-fade-in-up">
          <div className="relative flex flex-col w-full h-full bg-[#050f08]/95 backdrop-blur-xl border border-neon-green/30 rounded-2xl shadow-2xl overflow-hidden">
            
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-neon-green/20 bg-[#020d04]/90 h-14">
              <div className="flex items-center gap-3">
                <div className="relative">
                    <div className="w-2 h-2 absolute top-0 right-0 bg-neon-green rounded-full shadow-[0_0_5px_#D4FF00] animate-pulse"></div>
                    <Bot className="text-neon-green w-5 h-5" />
                </div>
                <div>
                    <h3 className="font-tech text-white text-sm tracking-wider font-bold">CALCULUS BOT</h3>
                    <p className="text-[9px] text-neon-green/70 font-sans tracking-wide leading-none">AUTO ASSISTANT</p>
                </div>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Chat Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide bg-grid-pattern bg-[length:20px_20px]">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[85%] p-3 rounded-2xl text-xs md:text-sm leading-relaxed shadow-lg ${
                      msg.role === 'user' 
                        ? 'bg-neon-green text-black rounded-tr-none font-medium' 
                        : 'bg-[#1a2e20] text-gray-100 border border-white/10 rounded-tl-none'
                    }`}
                  >
                    {msg.role === 'model' && (
                        <div className="flex items-center gap-2 mb-1 opacity-50">
                            <Sparkles size={10} />
                            <span className="text-[9px] font-tech uppercase tracking-wider">Bot Answer</span>
                        </div>
                    )}
                    
                    <div className="whitespace-pre-wrap font-sans">{msg.text}</div>
                    
                    {/* Render Visual if exists */}
                    {msg.visualType && <ChatVisual type={msg.visualType} />}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#1a2e20] border border-white/10 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                    <Loader2 size={14} className="text-neon-green animate-spin" />
                    <span className="text-[10px] text-gray-400 animate-pulse">Typing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-[#020d04] border-t border-neon-green/20">
              <div className="relative flex items-center bg-[#0a1a10] border border-neon-green/30 rounded-xl overflow-hidden focus-within:border-neon-green/80 transition-colors">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ketik pesan..."
                  className="w-full bg-transparent text-white px-3 py-2.5 text-xs md:text-sm focus:outline-none placeholder:text-gray-600 font-sans"
                  disabled={isLoading}
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="p-2.5 text-neon-green hover:bg-neon-green/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default AskAI;