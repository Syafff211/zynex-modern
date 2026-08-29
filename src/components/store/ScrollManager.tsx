import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export const ScrollManager: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentScroll = window.scrollY;
      if (totalScroll > 0) {
        setScrollProgress((currentScroll / totalScroll) * 100);
      }
      setShowBackToTop(currentScroll > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Top Subtle Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-teal-400 to-purple-500 transition-all duration-150 ease-out shadow-sm shadow-cyan-400/50"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Smooth Scroll to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-5 left-5 z-40 p-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-700/80 backdrop-blur-xl shadow-lg transition-all duration-200 transform hover:-translate-y-1"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      )}
    </>
  );
};
