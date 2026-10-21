import React, { useState } from 'react';
import { CheckCircle2, MessageSquare, Compass, Sliders, PackageCheck, Pencil } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const T0VProcess: React.FC = () => {
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);

  const steps = [
    {
      num: '01',
      title: 'First call',
      handwritten: '* Defining needs & goals',
      desc: 'We discuss your plugin, instrument, or software release, your launch timeline, and what makes your product unique. We map out the visual narrative and key sound metaphors.',
      pencilNote: 'no stress, 20-min relaxed chat over coffee. we listen to your audio stems, clarify your launch timeline, and sketch visual directions together — 100% zero commitment, pure listening.',
      icon: <MessageSquare className="w-5 h-5 text-[#29E3BE]" />,
    },
    {
      num: '02',
      title: 'Starting production',
      handwritten: '* Interface motion design & audio sync',
      desc: 'Creating the visual identity, UI motion animations, dynamic lighting, and pacing, timed sample-accurately to your stems and music.',
      pencilNote: 'you get a private live staging link. every waveform, knob rotation, and lighting cue is timed sample-accurately to your stems with total transparency and frequent updates.',
      icon: <Compass className="w-5 h-5 text-[#323A72]" />,
    },
    {
      num: '03',
      title: 'Review and correction',
      handwritten: '* Precision & shared refinements',
      desc: 'We fine-tune the curves, pacing, lighting, and detail together so the end result matches your vision precisely.',
      pencilNote: 'unlimited fine-tuning rounds. we tweak cuts, timing, and colors until you feel absolute goosebumps watching your product in motion. we do not stop until you are completely thrilled.',
      icon: <Sliders className="w-5 h-5 text-[#E019D7]" />,
    },
    {
      num: '04',
      title: 'Final delivery',
      handwritten: '* Ready for your website & feeds',
      desc: 'You receive all masters in full resolution: 4K 16:9 for your landing page, vertical reels for social channels, and lightweight web loops.',
      pencilNote: 'ready-to-publish master files for 4K youtube, crisp 9:16 reels, twitter teasers, and website hero loops. full archive delivered directly to your inbox on schedule.',
      icon: <PackageCheck className="w-5 h-5 text-[#29E3BE]" />,
    },
  ];

  return (
    <section id="process" className="py-20 md:py-28 px-4 sm:px-6 md:px-12 bg-[#f6f1dc] border-y border-[#323A72]/20 relative z-10 bg-notebook-lines">
      {/* Anchor for backwards compatibility */}
      <div id="services" className="absolute -top-20" />

      <div className="max-w-7xl mx-auto">
        
        {/* SECTION HEADER WITH NUMBER */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
          <span className="text-xs font-mono lowercase tracking-widest text-[#323A72] block mb-1 font-semibold">
            02 // process
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-[#131522] tracking-tight lowercase">
            the t0v formula
          </h2>
          <p className="font-handwriting text-xl sm:text-2xl text-[#323A72] mt-2">
            * A simple golden rule for seamless collaboration
          </p>
        </ScrollReveal>

        {/* THE T0V 3 PILLARS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16 md:mb-24">
          
          {/* T: Translation */}
          <ScrollReveal delay={0}>
            <div className="bg-[#fffdf7] border border-[#323A72]/30 p-6 sm:p-8 rounded-xl shadow-sm relative hover:-translate-y-0.5 transition-all duration-200 h-full flex flex-col justify-between">
              {/* Enlarged, readable masking tape */}
              <div className="masking-tape -top-4 left-6 sm:left-8 px-4 py-1.5 h-8 sm:h-9 rotate-[-2deg] flex items-center justify-center min-w-[120px] border border-[#323A72]/20 shadow-xs">
                <span className="font-handwriting text-base sm:text-lg text-[#131522] font-bold lowercase tracking-wide">
                  rule t
                </span>
              </div>

              <div>
                <div className="text-4xl sm:text-5xl font-serif font-black text-[#29E3BE] mb-2 mt-1">
                  t
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#131522] mb-1.5 lowercase">
                  translation
                </h3>
                <p className="text-xs font-mono text-[#323A72] lowercase tracking-wider mb-3 font-semibold">
                  complex ideas into simple clarity
                </p>
                <p className="text-sm sm:text-base text-[#131522]/85 font-sans leading-relaxed">
                  Translating intricate audio concepts — non-linear saturation, convolution reverb, dynamic EQ curves, filter resonance — into intuitive, captivating visual motion.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* 0: Zero Friction */}
          <ScrollReveal delay={100}>
            <div className="bg-[#fffdf7] border border-[#323A72]/30 p-6 sm:p-8 rounded-xl shadow-sm relative hover:-translate-y-0.5 transition-all duration-200 h-full flex flex-col justify-between">
              {/* Enlarged, readable masking tape */}
              <div className="masking-tape -top-4 left-6 sm:left-8 px-4 py-1.5 h-8 sm:h-9 rotate-[2deg] flex items-center justify-center min-w-[120px] border border-[#323A72]/20 shadow-xs">
                <span className="font-handwriting text-base sm:text-lg text-[#131522] font-bold lowercase tracking-wide">
                  rule 0
                </span>
              </div>

              <div>
                <div className="text-4xl sm:text-5xl font-serif font-black text-[#323A72] mb-2 mt-1">
                  0
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#131522] mb-1.5 lowercase">
                  0-friction
                </h3>
                <p className="text-xs font-mono text-[#323A72] lowercase tracking-wider mb-3 font-semibold">
                  producer-to-producer dialogue
                </p>
                <p className="text-sm sm:text-base text-[#131522]/85 font-sans leading-relaxed">
                  No need to explain what a DAW stem, sidechain pump, or VST wrapper is. orikawa laurentin is founded by an active producer who understands your technical needs immediately.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* V: Value */}
          <ScrollReveal delay={200}>
            <div className="bg-[#fffdf7] border border-[#323A72]/30 p-6 sm:p-8 rounded-xl shadow-sm relative hover:-translate-y-0.5 transition-all duration-200 h-full flex flex-col justify-between">
              {/* Enlarged, readable masking tape */}
              <div className="masking-tape -top-4 left-6 sm:left-8 px-4 py-1.5 h-8 sm:h-9 rotate-[-1deg] flex items-center justify-center min-w-[120px] border border-[#323A72]/20 shadow-xs">
                <span className="font-handwriting text-base sm:text-lg text-[#131522] font-bold lowercase tracking-wide">
                  rule v
                </span>
              </div>

              <div>
                <div className="text-4xl sm:text-5xl font-serif font-black text-[#E019D7] mb-2 mt-1">
                  v
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#131522] mb-1.5 lowercase">
                  value
                </h3>
                <p className="text-xs font-mono text-[#323A72] lowercase tracking-wider mb-3 font-semibold">
                  elevating product perception
                </p>
                <p className="text-sm sm:text-base text-[#131522]/85 font-sans leading-relaxed">
                  Exceptional audio engineering deserves visuals to match. We deliver high-end aesthetic fidelity that elevates the perceived value of your software and hardware instruments.
                </p>
              </div>
            </div>
          </ScrollReveal>

        </div>

        {/* TYPICAL PROJECT ROADMAP */}
        <ScrollReveal>
          <div className="bg-[#fffdf7] border border-[#323A72]/30 rounded-xl p-5 sm:p-8 md:p-12 shadow-md relative">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-[#323A72]/20 gap-3">
              <div>
                <span className="text-xs font-mono lowercase tracking-widest text-[#323A72] block mb-1">
                  workflow
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#131522] lowercase">
                  how we work together
                </h3>
              </div>
              <div className="font-handwriting text-xl sm:text-2xl text-[#323A72]">
                * Hover steps for client backstage notes
              </div>
            </div>

            {/* Stepped Process Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 relative">
              {steps.map((step) => {
                const isHovered = hoveredStep === step.num;

                return (
                  <div
                    key={step.num}
                    onClick={() => setHoveredStep(isHovered ? null : step.num)}
                    onMouseEnter={() => setHoveredStep(step.num)}
                    onMouseLeave={() => setHoveredStep(null)}
                    className="group bg-[#fcfaf2] border border-[#323A72]/25 rounded-lg p-5 flex flex-col justify-between hover:border-[#323A72] hover:shadow-lg transition-all duration-300 relative cursor-pointer select-none"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono font-bold bg-[#131522] text-[#fff7dd] px-2.5 py-0.5 rounded lowercase">
                          step {step.num}
                        </span>
                        <div className="p-1.5 rounded-full bg-[#fff7dd] border border-[#323A72]/20 group-hover:border-[#29E3BE] transition-colors">
                          {step.icon}
                        </div>
                      </div>

                      <h4 className="font-serif font-bold text-xl text-[#131522] mb-1.5 lowercase group-hover:text-[#323A72] transition-colors">
                        {step.title}
                      </h4>

                      <p className="font-handwriting text-lg text-[#323A72] mb-2 leading-snug">
                        {step.handwritten}
                      </p>

                      <p className="text-sm text-[#131522]/85 font-sans leading-relaxed pt-2.5 border-t border-[#323A72]/15">
                        {step.desc}
                      </p>
                    </div>

                    {/* DYNAMIC HANDWRITTEN PENCIL NOTE (Visible strictly on hover / touch) */}
                    <div className="mt-4 pt-3 border-t border-dashed border-[#323A72]/20 min-h-[40px] flex flex-col justify-end">
                      {isHovered ? (
                        <div className="bg-[#fff7dd] border border-[#323A72]/40 rounded-md p-3 shadow-sm animate-pencil-reveal">
                          <div className="flex items-center justify-between text-[11px] font-mono text-[#323A72] mb-1">
                            <span className="flex items-center gap-1 font-bold lowercase">
                              <Pencil className="w-3 h-3 text-[#323A72]" />
                              backstage note:
                            </span>
                            <span className="text-[9px] text-[#323A72]/60 font-mono sm:hidden">[tap to hide]</span>
                          </div>
                          <p className="font-handwriting text-sm sm:text-base leading-snug text-[#131522] font-bold">
                            "{step.pencilNote}"
                          </p>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between text-[11px] font-mono text-[#323A72]/60 py-1">
                          <span className="flex items-center gap-1">
                            <Pencil className="w-3 h-3 text-[#323A72]/50" />
                            <span>backstage note</span>
                          </span>
                          <span className="text-[10px] text-[#29E3BE] font-bold font-mono lowercase">
                            [tap / hover]
                          </span>
                        </div>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Process footer note */}
            <div className="mt-8 pt-5 border-t border-[#323A72]/20 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-mono text-[#323A72]">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#29E3BE]" />
                <span>Full commercial rights and deliverables included</span>
              </span>
              <span className="bg-[#fff7dd] px-3.5 py-1.5 rounded border border-[#323A72]/20 lowercase font-medium">
                typical turnaround: 2 to 3 weeks
              </span>
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
