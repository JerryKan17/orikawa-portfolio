import React, { useState } from 'react';
import { Radio, Volume2 } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface SoundPad {
  id: string;
  name: string;
  type: string;
  freq: number;
  color: string;
  key: string;
}

export const SoundLabSection: React.FC = () => {
  const [activePad, setActivePad] = useState<string | null>(null);

  const pads: SoundPad[] = [
    { id: '1', name: 'Analog Root (A)', type: 'Sub Sine 220Hz', freq: 220, color: '#29E3BE', key: '1' },
    { id: '2', name: 'Fifth Harmonic', type: 'Resonant Mid 330Hz', freq: 330, color: '#FFF951', key: '2' },
    { id: '3', name: 'Octave Bloom', type: 'Pentatonic Air 440Hz', freq: 440, color: '#E019D7', key: '3' },
    { id: '4', name: 'High Shimmer', type: 'Pure Bell 587Hz', freq: 587, color: '#29E3BE', key: '4' },
    { id: '5', name: 'Acoustic Fluid', type: 'Organic Droplet', freq: 520, color: '#FFF951', key: '5' },
    { id: '6', name: 'Relay Click', type: 'Mechanical Tape', freq: 880, color: '#E019D7', key: '6' },
  ];

  const handleTriggerPad = (pad: SoundPad, index: number) => {
    setActivePad(pad.id);
    if (pad.id === '5') {
      soundEngine.playWaterDrop(1.2);
    } else if (pad.id === '6') {
      soundEngine.playTapeClick(900, 0.05);
    } else {
      soundEngine.playMusicalStinger(index);
    }

    setTimeout(() => {
      setActivePad(null);
    }, 400);
  };

  return (
    <section id="sound-lab" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Text & Service Description */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131522] text-[#fff7dd] text-xs font-mono">
            <Radio className="w-3.5 h-3.5 text-[#29E3BE] animate-pulse" />
            <span>[03] // SOUND LAB BY ORION LAURENTIN</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#131522] leading-tight">
            Sonic Branding & Bespoke Sound Design
          </h2>

          <div className="font-handwriting text-2xl text-[#323A72]">
            * Because visuals are only half the immersion.
          </div>

          <p className="text-sm sm:text-base text-[#131522]/80 leading-relaxed font-sans font-light">
            Behind every motion piece at Orikawa is a dedicated music producer. In addition to motion graphics, we compose custom <strong className="text-[#131522] font-semibold">musical stingers</strong>, <strong className="text-[#131522] font-semibold">tactile UI sound effects</strong> for hardware & software, and factory presets for audio software releases.
          </p>

          {/* Service items */}
          <div className="space-y-3 pt-2">
            {[
              { title: 'Sonic Logo & Identity', desc: 'Distinctive 2-second audio stingers for your brand mark' },
              { title: 'UI Audio & Micro-Sounds', desc: 'Ear-candy rotary knob ticks, switches, and haptic feedback' },
              { title: 'Plugin Preset Design & Demos', desc: 'Factory sound banks that show off your DSP algorithms at their finest' },
            ].map((srv, idx) => (
              <div key={idx} className="p-3 bg-[#fffdf7] border border-[#323A72]/20 rounded-md shadow-sm flex items-start gap-3">
                <span className="font-mono text-xs font-bold text-[#29E3BE] bg-[#131522] px-2 py-0.5 rounded">
                  0{idx + 1}
                </span>
                <div>
                  <h4 className="text-xs font-bold text-[#131522] font-mono">{srv.title}</h4>
                  <p className="text-[11px] text-[#323A72]">{srv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Synthesizer Pad Matrix */}
        <div className="lg:col-span-7 bg-[#131522] p-8 md:p-10 rounded-2xl shadow-2xl border-4 border-[#323A72]/40 text-[#fff7dd] relative overflow-hidden">
          
          {/* Subtle graph background inside synth */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(#29E3BE 1px, transparent 1px), linear-gradient(90deg, #29E3BE 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Synth Header */}
          <div className="flex justify-between items-center pb-6 border-b border-white/10 relative z-10 mb-8">
            <div>
              <span className="text-[10px] font-mono text-[#29E3BE] uppercase tracking-widest block">
                ANALOG MATRIX // LIVE ENGINE
              </span>
              <h3 className="font-serif text-2xl font-bold tracking-tight text-white">
                Interactive Soundboard
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-white/60">
              <Volume2 className="w-4 h-4 text-[#FFF951]" />
              <span>CLICK PADS TO AUDITION</span>
            </div>
          </div>

          {/* 6 Trigger Pads */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 relative z-10">
            {pads.map((pad, idx) => {
              const isTriggered = activePad === pad.id;
              return (
                <button
                  key={pad.id}
                  onClick={() => handleTriggerPad(pad, idx)}
                  className={`group p-5 rounded-xl border flex flex-col justify-between text-left transition-all duration-200 select-none ${
                    isTriggered
                      ? 'scale-95 bg-white/20 border-white shadow-[0_0_20px_rgba(41,227,190,0.5)]'
                      : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                  }`}
                  style={{
                    borderColor: isTriggered ? pad.color : undefined,
                  }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <span
                      className="w-2.5 h-2.5 rounded-full transition-transform group-hover:scale-125"
                      style={{ backgroundColor: pad.color }}
                    />
                    <span className="text-[10px] font-mono text-white/40">PAD [0{pad.key}]</span>
                  </div>

                  <div>
                    <span className="font-mono text-xs font-bold text-white block group-hover:text-[#29E3BE] transition-colors">
                      {pad.name}
                    </span>
                    <span className="font-mono text-[9px] text-white/60 block mt-0.5">
                      {pad.type}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Soundboard footer instructions */}
          <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-[11px] font-mono text-white/50 relative z-10 gap-2">
            <span>Powered by Web Audio API • 100% Procedural synthesis</span>
            <span className="font-handwriting text-base text-[#FFF951]">* Instant sound design proof</span>
          </div>

        </div>

      </div>

    </section>
  );
};
