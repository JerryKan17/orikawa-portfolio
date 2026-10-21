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
      setIsScrolled(window.scrollY > 40);
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
    { name: 'Works', href: '#works', label: '01' },
    { name: 'T0V Formula', href: '#services', label: '02' },
    { name: 'Sound Lab', href: '#sound-lab', label: '03' },
    { name: 'About', href: '#about', label: '04' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#fff7dd]/85 backdrop-blur-md border-b border-[#323A72]/15 py-3.5 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo with wave */}
        <a href="#" className="flex items-center gap-3">
          <OrikawaLogo size="md" />
        </a>

        {/* Navigation links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider text-[#323A72]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => soundEngine.playTapeClick(750, 0.02)}
              className="group flex items-center gap-1.5 py-1 text-[#131522]/80 hover:text-[#131522] transition-colors relative"
            >
              <span className="text-[10px] text-[#29E3BE] font-bold group-hover:text-[#131522] transition-colors">
                [{link.label}]
              </span>
              <span>{link.name}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#29E3BE] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Action Tools: Audio Toggle & Contact CTA */}
        <div className="flex items-center gap-3">
          {/* Interactive Sound Engine Switch */}
          <button
            onClick={handleSoundToggle}
            title={isMuted ? 'Unmute procedural sound design' : 'Mute audio feedback'}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono transition-all duration-300 shadow-sm ${
              !isMuted
                ? 'bg-[#131522] text-[#fff7dd] border-[#131522]'
                : 'bg-[#fff7dd] text-[#131522]/70 border-[#323A72]/30 hover:border-[#131522]'
            } ${audioPulsing ? 'scale-105' : ''}`}
          >
            {!isMuted ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#29E3BE] animate-pulse" />
                <span className="hidden sm:inline text-[10px]">SOUND: ON</span>
                {/* Mini audio wave visualizer */}
                <span className="flex items-end gap-0.5 h-3 ml-0.5">
                  <span className="w-0.5 h-2 bg-[#29E3BE] animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-0.5 h-3 bg-[#FFF951] animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-0.5 h-1.5 bg-[#E019D7] animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-gray-400" />
                <span className="hidden sm:inline text-[10px] text-gray-500">SOUND: OFF</span>
              </>
            )}
          </button>

          {/* Contact Button */}
          <a
            href="#contact"
            onClick={() => soundEngine.playTapeClick(850, 0.03)}
            className="flex items-center gap-1.5 text-xs font-mono font-medium bg-[#323A72] text-[#fff7dd] px-4 py-2 rounded-sm hover:bg-[#131522] hover:shadow-md transition-all duration-300"
          >
            <span>Initiate</span>
            <Send className="w-3 h-3 text-[#29E3BE]" />
          </a>
        </div>
      </div>
    </header>
  );
};
