import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto relative z-20">

      {/* Background notebook accent */}
      <ScrollReveal>
        <div className="bg-[#fffdf7] border border-[#323A72]/25 rounded-2xl p-6 sm:p-10 md:p-14 shadow-xl relative bg-notebook-grid mt-4">

          {/* Masking tape on top - RENAMED TO "orikawa's foundation" */}
          <div className="masking-tape -top-4 sm:-top-5 left-1/2 -translate-x-1/2 z-30 px-6 py-2 h-9 sm:h-10 rotate-[-1deg] flex items-center justify-center border border-[#323A72]/20 shadow-xs min-w-[210px]">
            <span className="font-handwriting text-base sm:text-lg text-[#131522] font-bold lowercase tracking-wide whitespace-nowrap">
              orikawa's foundation
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center pt-2">

            {/* Left Column: Story & Philosophy */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <div>
                <span className="text-xs font-mono lowercase tracking-widest text-[#323A72] block mb-1 font-semibold">
                  03 // about us
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#131522] tracking-tight lowercase">
                  from sound to motion, <br />
                  <span className="italic font-light text-[#323A72]">without friction.</span>
                </h2>
              </div>

              <div className="font-handwriting text-xl sm:text-2xl text-[#323A72]">
                orikawa laurentin, founded by laurentin rivière
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[#131522]/90 font-sans leading-relaxed font-light">
                <p>
                  orikawa was born out of a clear observation: audio software, DSP plugins, and electronic hardware are marvels of technical engineering, yet their visual presentation often lacks rhythm, warmth, and cinematic pacing.
                </p>
                <p>
                  As an active music producer, I know the satisfaction of a clean EQ curve, the tactile weight of analog hardware, and the exact timing required to tell a musical story. I founded orikawa to deliver tailored motion design and filmmaking that speak authentically to sound creators.
                </p>
              </div>

              {/* Redirect to laurentinriviere.com */}
              <div className="pt-3 border-t border-[#323A72]/20">
                <span className="text-xs font-mono lowercase tracking-wider text-[#323A72] block mb-2 font-semibold">
                  explore wider creative projects:
                </span>

                <a
                  href="https://laurentinriviere.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-[#323A72] text-[#fff7dd] px-5 py-2.5 rounded text-xs font-mono lowercase tracking-wider hover:bg-[#131522] transition-all duration-200 shadow-xs group"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#29E3BE]" />
                  <span>visit laurentinriviere.com</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#29E3BE] group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Right Column: Visual Notebook Polaroid collage */}
            <div className="lg:col-span-5 flex flex-col items-center">

              {/* Polaroid Frame (Removed 'orion' tape as requested) */}
              <div className="bg-white p-3 sm:p-4 pb-6 sm:pb-7 rounded shadow-xl border border-[#323A72]/20 rotate-1 hover:rotate-0 transition-all duration-300 max-w-sm w-full relative">
                <div className="w-full aspect-[4/3] bg-[#131522] rounded-xs overflow-hidden mb-3 border border-[#323A72]/15">
                  <img
                    src="/cinematic-meadow.jpg"
                    alt="Studio atmosphere"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-center">
                  <span className="font-handwriting text-xl sm:text-2xl text-[#131522] block font-bold lowercase">
                    "the precision of code, the warmth of analog."
                  </span>
                  <span className="font-mono text-[10px] lowercase tracking-widest text-[#323A72]/80 block mt-1">
                    studio journal // plate 01
                  </span>
                </div>
              </div>

              {/* Quote card with ENLARGED typography and soft shadow */}
              <div className="mt-6 bg-[#fff7dd] border border-[#323A72]/30 p-4 sm:p-5 rounded-lg shadow-md max-w-sm rotate-[-1deg] backdrop-blur-xs">
                <span className="font-handwriting text-base sm:text-lg text-[#131522] block leading-relaxed font-bold drop-shadow-[0_1px_2px_rgba(19,21,34,0.12)]">
                  "A motion piece succeeds when an audio engineer instantly feels the musical gesture behind every frame."
                </span>
                <span className="font-mono text-[10px] text-[#323A72] block mt-2 lowercase tracking-wider">
                  — orikawa philosophy
                </span>
              </div>

            </div>

          </div>

        </div>
      </ScrollReveal>

    </section>
  );
};
