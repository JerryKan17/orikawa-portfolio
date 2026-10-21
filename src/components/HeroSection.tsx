import React from 'react';
import { ArrowDown, Sparkles, Radio } from 'lucide-react';
import { FluidCanvas } from './FluidCanvas';
import { InteractiveVUMeter } from './InteractiveVUMeter';
import { soundEngine } from '../utils/soundEngine';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] pt-32 pb-20 px-6 md:px-12 flex flex-col justify-center items-center overflow-hidden bg-notebook-grid">
      {/* Interactive Water Physics & Wave distortion Canvas */}
      <FluidCanvas />

      {/* Floating subtle ambient blurs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-[#29E3BE]/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-[#FFF951]/10 blur-[110px] pointer-events-none" />

      {/* Container */}
      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center text-center">
        
        {/* Handwritten margin annotation */}
        <div className="self-start mb-2 hidden md:block">
          <div className="font-handwriting text-2xl text-[#323A72] rotate-[-4deg] opacity-90 select-none flex items-center gap-2">
            <span>* An audiovisual & motion engineering studio</span>
            <span className="text-xs font-mono text-[#29E3BE] bg-[#131522] px-2 py-0.5 rounded-full">
              est. 2026
            </span>
          </div>
        </div>

        {/* Small subtitle tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#323A72]/10 border border-[#323A72]/20 text-xs font-mono text-[#323A72] mb-6 backdrop-blur-sm animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-[#29E3BE]" />
          <span className="font-semibold tracking-wider uppercase">
            Specialized for Audio Tech & DSP Creators
          </span>
        </div>

        {/* Main Brand Title & Tagline */}
        <div className="space-y-3 mb-8">
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-[#131522] leading-none">
            orikawa
            <span className="font-serif italic font-light text-4xl sm:text-5xl md:text-7xl text-[#323A72] block md:inline md:ml-4">
              laurentin
            </span>
          </h1>

          <div className="relative inline-block mt-2">
            <h2 className="font-serif italic text-3xl sm:text-4xl md:text-6xl text-[#323A72] tracking-wide font-normal">
              Clarity in Motion.
            </h2>
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#29E3BE] to-transparent mt-1" />
          </div>
        </div>

        {/* Short Statement */}
        <p className="max-w-2xl text-base sm:text-lg text-[#131522]/80 leading-relaxed font-sans font-light mb-10">
          Bridging the gap between <strong className="font-semibold text-[#131522]">complex DSP algorithms</strong> and{' '}
          <strong className="font-semibold text-[#131522]">cinematic motion design</strong>. Founded by a music producer, engineered for zero-friction audio translation.
        </p>

        {/* Visual Centerpiece: Interactive Analog VU Meter */}
        <div className="w-full max-w-lg my-4 relative">
          <InteractiveVUMeter />
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-12 z-20">
          <a
            href="#works"
            onClick={() => soundEngine.playTapeClick(650, 0.03)}
            className="group flex items-center gap-3 bg-[#131522] text-[#fff7dd] px-7 py-3.5 rounded-md text-xs font-mono font-medium tracking-wider uppercase hover:bg-[#323A72] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <span>Explore Works</span>
            <ArrowDown className="w-4 h-4 text-[#29E3BE] group-hover:translate-y-1 transition-transform" />
          </a>

          <a
            href="#contact"
            onClick={() => soundEngine.playTapeClick(850, 0.03)}
            className="group flex items-center gap-2.5 bg-[#fff7dd] text-[#131522] border-2 border-[#131522] px-6 py-3 rounded-md text-xs font-mono font-medium tracking-wider uppercase hover:bg-[#131522] hover:text-[#fff7dd] transition-all duration-300"
          >
            <Radio className="w-3.5 h-3.5 text-[#E019D7]" />
            <span>Get in Touch</span>
          </a>
        </div>

        {/* Bottom Feature Badges */}
        <div className="mt-14 pt-8 border-t border-[#323A72]/15 w-full grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          <div className="p-3 bg-[#fff7dd]/80 rounded border border-[#323A72]/15 backdrop-blur-sm">
            <span className="text-[10px] font-mono text-[#323A72] block uppercase tracking-wider">01 // Translation</span>
            <span className="text-xs font-bold text-[#131522]">Complex DSP to Visuals</span>
          </div>
          <div className="p-3 bg-[#fff7dd]/80 rounded border border-[#323A72]/15 backdrop-blur-sm">
            <span className="text-[10px] font-mono text-[#323A72] block uppercase tracking-wider">02 // 0-Friction</span>
            <span className="text-xs font-bold text-[#131522]">Producer-to-Producer</span>
          </div>
          <div className="p-3 bg-[#fff7dd]/80 rounded border border-[#323A72]/15 backdrop-blur-sm">
            <span className="text-[10px] font-mono text-[#323A72] block uppercase tracking-wider">03 // Value</span>
            <span className="text-xs font-bold text-[#131522]">Elevate Product Perception</span>
          </div>
          <div className="p-3 bg-[#fff7dd]/80 rounded border border-[#323A72]/15 backdrop-blur-sm">
            <span className="text-[10px] font-mono text-[#323A72] block uppercase tracking-wider">04 // Audio Sync</span>
            <span className="text-xs font-bold text-[#131522]">Sample-Accurate Motion</span>
          </div>
        </div>

      </div>
    </section>
  );
};
