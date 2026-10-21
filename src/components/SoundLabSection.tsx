import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface SoundPad {
  id: string;
  name: string;
  type: string;
  color: string;
  key: string;
}

export const SoundLabSection: React.FC = () => {
  const [activePad, setActivePad] = useState<string | null>(null);

  const pads: SoundPad[] = [
    { id: '1', name: 'analog sub', type: 'warm sine 220hz', color: '#29E3BE', key: '1' },
    { id: '2', name: 'harmonic body', type: 'resonant midrange', color: '#FFF951', key: '2' },
    { id: '3', name: 'melodic stinger', type: 'pentatonic chord', color: '#E019D7', key: '3' },
    { id: '4', name: 'air shimmer', type: 'soft top end bell', color: '#29E3BE', key: '4' },
    { id: '5', name: 'fluid drop', type: 'acoustic ripple', color: '#FFF951', key: '5' },
    { id: '6', name: 'mechanical relay', type: 'analog tape click', color: '#E019D7', key: '6' },
  ];

  const handleTriggerPad = (pad: SoundPad) => {
    setActivePad(pad.id);
    setTimeout(() => {
      setActivePad(null);
    }, 400);
  };

  return (
    <section id="sound-lab" className="py-20 md:py-28 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto relative z-10">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
        
        {/* Left Column: Text & Service Description (Clean without AI slop badges) */}
        <ScrollReveal className="lg:col-span-5 space-y-4 sm:space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#131522] leading-tight lowercase">
            sound lab & audio services
          </h2>

          <div className="font-handwriting text-xl sm:text-2xl text-[#323A72]">
            * Visuals and sound designed hand in hand.
          </div>

          <p className="text-xs sm:text-sm md:text-base text-[#131522]/80 leading-relaxed font-sans font-light">
            Behind every motion piece at orikawa, there is an active music producer's ear. Alongside motion design and 3D animation, I compose bespoke <strong className="text-[#131522] font-semibold">sonic brand stingers</strong>, <strong className="text-[#131522] font-semibold">tactile UI micro-sounds</strong> (knob clicks, switches, haptics), and demo tracks tailored for your virtual instruments.
          </p>

          {/* Service items */}
          <div className="space-y-2.5 pt-1">
            {[
              { title: 'sonic logos & brand stingers', desc: 'Distinctive 2-second audio signatures that stick with users' },
              { title: 'ui micro-sounds (audio haptics)', desc: 'Smooth, satisfying clicks and rotary ticks for your audio plugins' },
              { title: 'factory presets & demo tracks', desc: 'Custom sound banks crafted to showcase the character of your DSP engine' },
            ].map((srv, idx) => (
              <div key={idx} className="p-3 bg-[#fffdf7] border border-[#323A72]/20 rounded-md shadow-xs flex items-start gap-2.5">
                <span className="font-mono text-xs font-bold text-[#29E3BE] bg-[#131522] px-2 py-0.5 rounded">
                  0{idx + 1}
                </span>
                <div>
                  <h4 className="text-xs font-bold text-[#131522] font-mono lowercase">{srv.title}</h4>
                  <p className="text-[11px] text-[#323A72]">{srv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Right Column: Visual Pad Matrix */}
        <ScrollReveal delay={150} className="lg:col-span-7">
          <div className="bg-[#131522] p-6 sm:p-8 md:p-10 rounded-xl shadow-xl border-2 sm:border-4 border-[#323A72]/40 text-[#fff7dd] relative overflow-hidden">
            
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(#29E3BE 1px, transparent 1px), linear-gradient(90deg, #29E3BE 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            <div className="flex justify-between items-center pb-5 border-b border-white/10 relative z-10 mb-6">
              <div>
                <span className="text-[10px] font-mono text-[#29E3BE] lowercase tracking-widest block">
                  sound design lab // interactive preview
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white lowercase">
                  exploration matrix
                </h3>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-white/60 lowercase">
                <Volume2 className="w-3.5 h-3.5 text-[#FFF951]" />
                <span className="hidden sm:inline">interactive</span>
              </div>
            </div>

            {/* 6 Trigger Pads */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 relative z-10">
              {pads.map((pad) => {
                const isTriggered = activePad === pad.id;
                return (
                  <button
                    key={pad.id}
                    onClick={() => handleTriggerPad(pad)}
                    className={`group p-3.5 sm:p-5 rounded-lg border flex flex-col justify-between text-left transition-all duration-150 select-none cursor-pointer ${
                      isTriggered
                        ? 'scale-95 bg-white/20 border-white shadow-[0_0_15px_rgba(41,227,190,0.4)]'
                        : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                    }`}
                    style={{
                      borderColor: isTriggered ? pad.color : undefined,
                    }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span
                        className="w-2.5 h-2.5 rounded-full transition-transform group-hover:scale-125"
                        style={{ backgroundColor: pad.color }}
                      />
                      <span className="text-[10px] font-mono text-white/40">pad [0{pad.key}]</span>
                    </div>

                    <div>
                      <span className="font-mono text-xs font-bold text-white block group-hover:text-[#29E3BE] transition-colors lowercase">
                        {pad.name}
                      </span>
                      <span className="font-mono text-[9px] text-white/60 block mt-0.5 lowercase">
                        {pad.type}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between text-[11px] font-mono text-white/50 relative z-10 gap-2">
              <span>zero-latency visual audio integration</span>
              <span className="font-handwriting text-sm sm:text-base text-[#FFF951]">* ready for custom sound design</span>
            </div>

          </div>
        </ScrollReveal>

      </div>

    </section>
  );
};
