import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Send } from 'lucide-react';
import { OrikawaLogo } from './OrikawaLogo';
import { soundEngine } from '../utils/soundEngine';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(soundEngine.getMuted());
  const [audioPulsing, setAudioPulsing] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const newMuted = soundEngine.toggleMute();
    setIsMuted(newMuted);
    if (!newMuted) {
      setAudioPulsing(true);
      setTimeout(() => setAudioPulsing(false), 800);
    }
  };

  const navLinks = [
    { name: '[01] works', href: '#works' },
    { name: '[02] process', href: '#process' },
    { name: '[03] about us', href: '#about' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 border-b transition-[background-color,border-color,backdrop-filter,padding] duration-500 ease-out ${
        isScrolled
          ? 'bg-[#fff7dd]/90 backdrop-blur-md border-[#323A72]/15 py-3 shadow-xs'
          : 'bg-transparent border-transparent py-4 md:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo placeholder */}
        <a href="#" className="flex items-center">
          <OrikawaLogo size="md" />
        </a>

        {/* Navigation links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono lowercase tracking-wider text-[#323A72]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="group flex items-center py-1 text-[#131522]/80 hover:text-[#131522] transition-colors relative"
            >
              <span>{link.name}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#29E3BE] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Tools: Sound Toggle & Contact */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            title={isMuted ? 'Turn on sound' : 'Mute sound'}
            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full border text-xs font-mono transition-all duration-300 shadow-xs cursor-pointer ${
              !isMuted
                ? 'bg-[#323A72] text-[#fff7dd] border-[#323A72]'
                : 'bg-[#fff7dd] text-[#131522]/70 border-[#323A72]/30 hover:border-[#131522]'
            } ${audioPulsing ? 'scale-105' : ''}`}
          >
            {!isMuted ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#29E3BE]" />
                <span className="hidden sm:inline text-[10px] lowercase">sound: on</span>
                <span className="flex items-end gap-0.5 h-2.5 ml-0.5">
                  <span className="w-0.5 h-2 bg-[#29E3BE] animate-pulse" />
                  <span className="w-0.5 h-2.5 bg-[#FFF951] animate-pulse" style={{ animationDelay: '150ms' }} />
                  <span className="w-0.5 h-1.5 bg-[#E019D7] animate-pulse" style={{ animationDelay: '300ms' }} />
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-gray-400" />
                <span className="hidden sm:inline text-[10px] text-gray-500 lowercase">sound: off</span>
              </>
            )}
          </button>

          {/* Contact Button */}
          <a
            href="#contact"
            className="flex items-center gap-1.5 text-xs font-mono lowercase bg-[#323A72] text-[#fff7dd] px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-sm hover:bg-[#131522] transition-all duration-200 shadow-xs"
          >
            <span>contact</span>
            <Send className="w-3 h-3 text-[#29E3BE]" />
          </a>
        </div>
      </div>
    </header>
  );
};
