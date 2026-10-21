import React from 'react';
import { Sparkles, CheckCircle2, MessageSquare, Compass, Sliders, PackageCheck } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export const T0VProcess: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'First Call (Needs & Goals)',
      handwritten: '* Aligning on audio algorithm & target audience',
      desc: 'We dissect your DSP algorithm, plugin GUI, and release timeline. We establish the emotional hook and the key visual metaphors that will make your tech immediately clear.',
      icon: <MessageSquare className="w-5 h-5 text-[#29E3BE]" />,
      tape: 'tape-top',
      badge: 'AUDIO AUDIT',
    },
    {
      num: '02',
      title: 'Starting Production',
      handwritten: '* Bespoke 3D modeling, lighting & motion design',
      desc: 'Full-scale creative execution. Bespoke 3D knob and chassis modeling, dynamic lighting, organic fluid simulations, and sample-accurate audio sync to your stems or custom sound design.',
      icon: <Compass className="w-5 h-5 text-[#FFF951]" />,
      tape: 'tape-top',
      badge: 'THE FORGE',
    },
    {
      num: '03',
      title: 'Review and Correction',
      handwritten: '* Pixel & sample-accurate iterations',
      desc: 'Collaborative revision cycles. We fine-tune EQ curve representations, color grading, pacing, and DAW alignment until both the engineering and creative teams are thrilled.',
      icon: <Sliders className="w-5 h-5 text-[#E019D7]" />,
      tape: 'tape-top',
      badge: 'ZERO COMPROMISE',
    },
    {
      num: '04',
      title: 'Final Delivery & Launch Kit',
      handwritten: '* 4K Master Reels, Web loops & Social conversion',
      desc: 'You receive a complete conversion ecosystem: vertical 9:16 reels for social hype, 16:9 4K product hero videos, and lightweight looped assets optimized for your landing page.',
      icon: <PackageCheck className="w-5 h-5 text-[#29E3BE]" />,
      tape: 'tape-top',
      badge: 'READY TO CONVERT',
    },
  ];

  return (
    <section id="services" className="py-24 px-6 md:px-12 bg-[#f6f1dc] border-y border-[#323A72]/20 relative z-10 bg-notebook-lines">
      <div className="max-w-7xl mx-auto">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#323A72]/10 border border-[#323A72]/20 text-xs font-mono text-[#323A72] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#29E3BE]" />
            <span>[02] // METHODOLOGY & PHILOSOPHY</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl font-bold text-[#131522] tracking-tight">
            The Golden Rule: T0V Formula
          </h2>
          <p className="font-handwriting text-2xl sm:text-3xl text-[#323A72] mt-2">
            * Why DSP creators and audio engineers trust Orikawa
          </p>
        </div>

        {/* THE T0V 3 PILLARS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          
          {/* T: Translation */}
          <div
            onMouseEnter={() => soundEngine.playKnobTick(0.9)}
            className="bg-[#fffdf7] border-2 border-[#323A72]/30 p-8 rounded-xl shadow-lg relative hover:-translate-y-1 transition-all duration-300"
          >
            <div className="masking-tape -top-3.5 left-8 w-24 h-6 rotate-[-3deg] flex items-center justify-center">
              <span className="font-handwriting text-xs text-[#131522] font-bold">Rule #01</span>
            </div>

            <div className="text-5xl font-serif font-black text-[#29E3BE] mb-3">
              T
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#131522] mb-2">
              Translation
            </h3>
            <p className="text-xs font-mono text-[#323A72] uppercase tracking-wider mb-4 font-semibold">
              Complex Algorithms into Pure Clarity
            </p>
            <p className="text-sm text-[#131522]/80 font-sans leading-relaxed">
              We translate difficult audio concepts — non-linear saturation, convolution reverb, phase cancellation, spectral masking — into simple, beautiful, and intuitive visual storytelling that anyone can instantly grasp.
            </p>
          </div>

          {/* 0: Zero Friction */}
          <div
            onMouseEnter={() => soundEngine.playKnobTick(1.1)}
            className="bg-[#fffdf7] border-2 border-[#323A72]/30 p-8 rounded-xl shadow-lg relative hover:-translate-y-1 transition-all duration-300"
          >
            <div className="masking-tape -top-3.5 left-8 w-24 h-6 rotate-[2deg] flex items-center justify-center">
              <span className="font-handwriting text-xs text-[#131522] font-bold">Rule #02</span>
            </div>

            <div className="text-5xl font-serif font-black text-[#FFF951] mb-3">
              0
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#131522] mb-2">
              0-Friction
            </h3>
            <p className="text-xs font-mono text-[#323A72] uppercase tracking-wider mb-4 font-semibold">
              Musician-to-Musician Communication
            </p>
            <p className="text-sm text-[#131522]/80 font-sans leading-relaxed">
              No endless emails explaining what a DAW stem, sidechain pump, or VST wrapper is. Founded by producer Orion Laurentin, we speak the exact language of audio developers and producers from day one.
            </p>
          </div>

          {/* V: Value */}
          <div
            onMouseEnter={() => soundEngine.playKnobTick(1.3)}
            className="bg-[#fffdf7] border-2 border-[#323A72]/30 p-8 rounded-xl shadow-lg relative hover:-translate-y-1 transition-all duration-300"
          >
            <div className="masking-tape -top-3.5 left-8 w-24 h-6 rotate-[-1deg] flex items-center justify-center">
              <span className="font-handwriting text-xs text-[#131522] font-bold">Rule #03</span>
            </div>

            <div className="text-5xl font-serif font-black text-[#E019D7] mb-3">
              V
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#131522] mb-2">
              Value
            </h3>
            <p className="text-xs font-mono text-[#323A72] uppercase tracking-wider mb-4 font-semibold">
              Elevating Perceived Quality & Sales
            </p>
            <p className="text-sm text-[#131522]/80 font-sans leading-relaxed">
              Cheap visuals make even the most brilliant DSP code feel like a hobby tool. We deliver the premium aesthetic of Apple, Teenage Engineering, and FabFilter, dramatically raising the perceived value of your software.
            </p>
          </div>

        </div>

        {/* PENCIL-WRITTEN TYPICAL PROJECT WORKFLOW */}
        <div className="bg-[#fffdf7] border-2 border-[#323A72]/30 rounded-2xl p-8 md:p-12 shadow-2xl relative">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-10 border-b border-[#323A72]/20 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#323A72] block mb-1">
                EXECUTION PROTOCOL
              </span>
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-[#131522]">
                Typical Project Roadmap
              </h3>
            </div>
            <div className="font-handwriting text-2xl text-[#323A72] rotate-[-2deg]">
              * Handcrafted with discipline & precision
            </div>
          </div>

          {/* Stepped Blueprint Process */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {steps.map((step, idx) => (
              <div
                key={step.num}
                onMouseEnter={() => soundEngine.playTapeClick(700 + idx * 50, 0.02)}
                className="bg-[#fcfaf2] border border-[#323A72]/25 rounded-lg p-6 flex flex-col justify-between hover:border-[#323A72] hover:shadow-lg transition-all duration-300 relative group"
              >
                {/* Step number badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold bg-[#131522] text-[#fff7dd] px-2.5 py-1 rounded">
                    PHASE {step.num}
                  </span>
                  <div className="p-2 rounded-full bg-[#fff7dd] border border-[#323A72]/20">
                    {step.icon}
                  </div>
                </div>

                {/* Step title */}
                <h4 className="font-serif font-bold text-xl text-[#131522] mb-2 group-hover:text-[#323A72] transition-colors">
                  {step.title}
                </h4>

                {/* Pencil handwritten annotation */}
                <p className="font-handwriting text-lg text-[#323A72] mb-3 leading-snug">
                  {step.handwritten}
                </p>

                {/* Description */}
                <p className="text-xs text-[#131522]/80 font-sans leading-relaxed mt-auto pt-3 border-t border-[#323A72]/15">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Process footer note */}
          <div className="mt-10 pt-6 border-t border-[#323A72]/20 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#323A72]">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#29E3BE]" />
              <span>Full commercial licensing & source stems provided on delivery</span>
            </span>
            <span className="bg-[#fff7dd] px-3 py-1 rounded border border-[#323A72]/20">
              Average turnaround: 2-3 weeks
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
