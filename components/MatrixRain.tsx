import React, { useEffect, useRef } from 'react';

const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configuration
    const fontSize = 12; // Diperkecil biar ga terlalu gede
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    // State for drops needs to be mutable across resizes
    let drops: number[] = [];

    const initRain = (width: number) => {
      const columns = Math.ceil(width / fontSize);
      // Ensure drops array has enough elements for the current width
      for (let i = 0; i < columns; i++) {
        if (drops[i] === undefined) {
           // Start new drops at random vertical positions above viewport
           drops[i] = Math.random() * -100;
        }
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initRain(canvas.width);
    };

    // Listen for resize
    window.addEventListener('resize', resizeCanvas);
    
    // Initial setup
    resizeCanvas();

    const draw = () => {
      // Trail effect
      // Use the background color with low opacity to create fading trails
      ctx.fillStyle = 'rgba(5, 26, 13, 0.1)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Text Color - Neon Yellow (#D4FF00)
      ctx.fillStyle = '#D4FF00'; 
      ctx.font = `${fontSize}px "Orbitron", monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        
        // Draw text
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly to create varied rain density
        // Increased threshold to 0.99 because smaller font = more columns = needs to be sparser
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.99) {
          drops[i] = 0;
        }

        // Move drop down
        drops[i]++;
      }
    };

    // Run animation at ~20FPS
    const intervalId = setInterval(draw, 50);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
        // Added opacity and blur to make it "agak kabur" and "jangan terlalu terang"
        style={{ opacity: 0.3, filter: 'blur(0.5px)' }}
    />
  );
};

export default MatrixRain;