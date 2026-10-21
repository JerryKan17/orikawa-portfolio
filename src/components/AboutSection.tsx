import React from 'react';
import { UserCheck, AudioWaveform, Headphones, Camera } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
      
      {/* Background notebook accent */}
      <div className="bg-[#fffdf7] border-2 border-[#323A72]/25 rounded-2xl p-8 md:p-14 shadow-2xl relative bg-notebook-grid overflow-hidden">
        
        {/* Masking tape on top */}
        <div className="masking-tape -top-3.5 left-1/2 -translate-x-1/2 w-40 h-7 rotate-[-1deg] flex items-center justify-center">
          <span className="font-handwriting text-sm text-[#131522] font-bold">
            Studio Dossier // Orion Laurentin
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Story & Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#323A72]/10 border border-[#323A72]/20 text-xs font-mono text-[#323A72]">
              <UserCheck className="w-3.5 h-3.5 text-[#29E3BE]" />
              <span>[04] // THE FOUNDER & PHILOSOPHY</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#131522] tracking-tight">
              Rooted in Sound. <br />
              <span className="italic font-light text-[#323A72]">Obsessed with Motion.</span>
            </h2>

            <div className="font-handwriting text-2xl text-[#323A72]">
              * Founded by musician and producer Orion Laurentin
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#131522]/85 font-sans leading-relaxed font-light">
              <p>
                Orikawa was born out of a simple observation: modern audio software, DSP plugins, and hardware synthesizers are marvels of human engineering, but their visual presentation often fails to communicate that brilliance.
              </p>
              <p>
                As a music producer and sound designer, Orion Laurentin understands the nuances of frequency spectrums, psychoacoustics, and workflow ergonomics. He founded Orikawa to replace dry DAW screen recordings and generic templates with <strong className="font-semibold text-[#131522]">tactile, cinematic visual ecosystems</strong> that celebrate the art of audio creation.
              </p>
              <p>
                We blend the warmth of physical notebooks, hand-drawn technical sketches, and analog meters with modern 3D rendering and motion graphics.
              </p>
            </div>

            {/* Gear & Tool Stack Checklist */}
            <div className="pt-4 border-t border-[#323A72]/20">
              <span className="text-xs font-mono uppercase tracking-widest text-[#323A72] block mb-3 font-semibold">
                AUDIO & VISUAL REPERTOIRE:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono text-[#131522]">
                <div className="flex items-center gap-2 bg-[#fff7dd] p-2 rounded border border-[#323A72]/15">
                  <Headphones className="w-3.5 h-3.5 text-[#29E3BE]" />
                  <span>Ableton Live 12 / Pro Tools</span>
                </div>
                <div className="flex items-center gap-2 bg-[#fff7dd] p-2 rounded border border-[#323A72]/15">
                  <AudioWaveform className="w-3.5 h-3.5 text-[#FFF951]" />
                  <span>DSP Modeling & FFT</span>
                </div>
                <div className="flex items-center gap-2 bg-[#fff7dd] p-2 rounded border border-[#323A72]/15">
                  <Camera className="w-3.5 h-3.5 text-[#E019D7]" />
                  <span>Cinema 4D / Blender 4</span>
                </div>
              </div>
            </div>

            {/* Handwritten Signature */}
            <div className="pt-2">
              <span className="font-serif italic text-2xl text-[#131522] block">
                Orion Laurentin
              </span>
              <span className="font-handwriting text-lg text-[#323A72]">
                Founder & Creative Director, Orikawa
              </span>
            </div>
          </div>

          {/* Right Column: Visual Notebook Polaroid collage */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* Polaroid Frame */}
            <div
              onMouseEnter={() => soundEngine.playKnobTick(1.2)}
              className="bg-white p-4 pb-8 rounded shadow-2xl border border-[#323A72]/20 rotate-1 hover:rotate-0 transition-all duration-500 max-w-sm w-full relative group"
            >
              {/* Masking tape top right */}
              <div className="masking-tape -top-3.5 right-6 w-20 h-5 rotate-[12deg]" />

              <div className="w-full aspect-[4/3] bg-[#131522] rounded-sm overflow-hidden mb-3 border border-[#323A72]/15">
                <img
                  src="/cinematic-meadow.jpg"
                  alt="Studio Vision"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Polaroid caption in handwriting */}
              <div className="text-center">
                <span className="font-handwriting text-xl text-[#131522] block font-bold">
                  "Where physical resonance meets digital light."
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#323A72]/70 block mt-1">
                  PLATE REF // ORK-LAB-01
                </span>
              </div>
            </div>

            {/* Sticky Note Below */}
            <div className="mt-6 bg-[#fff7dd] border border-[#323A72]/30 p-4 rounded shadow-md max-w-xs rotate-[-2deg]">
              <span className="font-handwriting text-sm text-[#131522] block leading-snug">
                "Our golden rule: if an audio engineer smiles within the first 3 seconds of watching, the motion piece has succeeded."
              </span>
              <span className="font-mono text-[10px] text-[#29E3BE] bg-[#131522] px-2 py-0.5 rounded inline-block mt-2 font-bold">
                T0V PHILOSOPHY
              </span>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
