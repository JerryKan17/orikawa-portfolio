import React, { useState } from 'react';
import { Play, ExternalLink, Music2 } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface Project {
  id: string;
  title: string;
  client: string;
  category: 'dsp' | 'web' | 'motion';
  description: string;
  tags: string[];
  tools: string[];
  image: string;
  videoRef: string;
  annotation: string;
  soundProof?: boolean;
}

const PROJECTS: Project[] = [
  // TAB 1: DSP & AUDIO
  {
    id: 'euphonia-synth',
    title: 'EUPHONIA // Neural Resonance Synthesizer',
    client: 'spectral audio labs',
    category: 'dsp',
    description:
      'Product launch trailer and interface motion design translating complex non-linear filter resonance curves into intuitive visual storytelling.',
    tags: ['DSP Launch', 'Interface Motion', 'Walkthrough'],
    tools: ['After Effects', 'Cinema Tools', 'Ableton Live', 'Sample Sync'],
    image: '/dsp-plugin-ui.jpg',
    videoRef: 'EUPHONIA_TEASER_4K.mp4',
    annotation: '* Sample-accurate transient animation',
    soundProof: true,
  },
  {
    id: 'harmonic-exciter',
    title: 'AURA // Harmonic Saturator Suite',
    client: 'dsp partner studio',
    category: 'dsp',
    description:
      'Visual identity and cinematic macro shots for an algorithmic tube saturator. Demonstrates warmth and odd harmonics through dynamic lighting and motion.',
    tags: ['Plugin Ecosystem', 'Motion Design', 'Launch Video'],
    tools: ['After Effects', 'DaVinci Resolve', 'Custom Shaders'],
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=900&auto=format&fit=crop',
    videoRef: 'AURA_TUBE_EXP.mp4',
    annotation: '* Built by a producer for audio creators',
    soundProof: true,
  },
  {
    id: 'dynamic-eq-walkthrough',
    title: 'RESONANCE // Dynamic EQ Masterclass',
    client: 'tokyo audio tech',
    category: 'dsp',
    description:
      'Replacing tedious software manuals with a stylized, cinematic product walkthrough explaining sidechain phase alignment.',
    tags: ['Product Walkthrough', 'DSP Visualization', 'Tutorial'],
    tools: ['After Effects', 'DaVinci Resolve', 'Sound Design'],
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=900&auto=format&fit=crop',
    videoRef: 'RESONANCE_EQ_EXPLAIN.mov',
    annotation: '* Clear, concise, and focused on usability',
  },

  // TAB 2: INTERACTIVE WEB MOTION
  {
    id: 'web-dsp-knob',
    title: 'Interactive Web Rotary Knob System',
    client: 'orikawa internal lab',
    category: 'web',
    description:
      'High-framerate interactive rotary knobs and tactile sliders built directly for audio software landing pages.',
    tags: ['Web Motion', 'TypeScript', 'Interactive UI'],
    tools: ['Canvas', 'TypeScript', 'Web Audio API'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=900&auto=format&fit=crop',
    videoRef: 'KNOB_INTERACTION.webm',
    annotation: '* Smooth 60fps interaction on mobile & desktop',
    soundProof: true,
  },
  {
    id: 'fluid-water-waveform',
    title: 'Acoustic Fluid Waveform Canvas',
    client: 'orikawa internal lab',
    category: 'web',
    description:
      'Real-time water physics canvas responding to sound frequency impulses and cursor movement.',
    tags: ['Canvas 2D', 'Fluid Physics', 'Cursor Reactive'],
    tools: ['HTML5 Canvas', 'Fluid Math', 'Wave Simulation'],
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=900&auto=format&fit=crop',
    videoRef: 'WATER_ACOUSTIC_SIM.mp4',
    annotation: '* Organic meets technical precision',
    soundProof: true,
  },

  // TAB 3: FILMMAKING & MOTION GRAPHICS
  {
    id: 'orikawa-film-identity',
    title: 'Clarity in Nature // Short Film',
    client: 'artistic direction',
    category: 'motion',
    description:
      'Poetic documentary exploring the dialogue between vintage electronic instruments and quiet natural landscapes.',
    tags: ['Filmmaking', 'Color Grading', 'Original Score'],
    tools: ['Cinema Camera', 'Anamorphic Lens', 'Original Score'],
    image: '/cinematic-meadow.jpg',
    videoRef: 'CLARITY_IN_NATURE_4K.mp4',
    annotation: '* Directed and scored by orion laurentin',
    soundProof: true,
  },
  {
    id: 'brand-stinger-motion',
    title: 'Kinetic Identity & Logo Animation',
    client: 'orikawa identity',
    category: 'motion',
    description:
      'Handcrafted chevron wave animation with minimalist typography and custom synthesized sonic branding.',
    tags: ['Logo Animation', 'Typography', 'Sonic Branding'],
    tools: ['After Effects', 'Analog Synthesizers'],
    image: '/moodboard-orikawa.png',
    videoRef: 'ORIKAWA_STINGER_MASTER.mov',
    annotation: '* Handcrafted notebook paper aesthetic',
    soundProof: true,
  },
];

export const NotebookShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dsp' | 'web' | 'motion'>('dsp');
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  const filteredProjects = PROJECTS.filter((p) => p.category === activeTab);

  const tabs = [
    {
      id: 'dsp' as const,
      num: '[01]',
      title: 'dsp & audio software',
      color: 'bg-[#29E3BE] text-[#131522] border-[#29E3BE]',
      inactiveColor: 'bg-[#f4eed4] text-[#131522]/80 hover:bg-[#eae4c9]',
    },
    {
      id: 'web' as const,
      num: '[02]',
      title: 'interactive web motion',
      color: 'bg-[#323A72] text-[#fff7dd] border-[#323A72]',
      inactiveColor: 'bg-[#f4eed4] text-[#131522]/80 hover:bg-[#eae4c9]',
    },
    {
      id: 'motion' as const,
      num: '[03]',
      title: 'filmmaking & motion graphics',
      color: 'bg-[#131522] text-[#fff7dd] border-[#131522]',
      inactiveColor: 'bg-[#f4eed4] text-[#131522]/80 hover:bg-[#eae4c9]',
    },
  ];

  return (
    <section id="works" className="py-20 md:py-28 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto relative z-10">
      
      {/* Section Header with Section Number */}
      <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-10 gap-4">
        <div>
          <span className="text-xs font-mono lowercase tracking-widest text-[#323A72] block mb-1 font-semibold">
            01 // works
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-[#131522] tracking-tight lowercase">
            selected works
          </h2>
          <p className="font-handwriting text-xl sm:text-2xl text-[#323A72] mt-1">
            * Selected cases from the studio notebook
          </p>
        </div>
      </ScrollReveal>

      {/* NOTEBOOK CONTAINER WITH ZERO-GAP TABS */}
      <div className="relative mt-4 sm:mt-6">
        
        {/* TABS DIRECTLY RESTING ON NOTEBOOK SHEET (ZERO GAP) */}
        <div className="flex overflow-x-auto overflow-y-hidden no-scrollbar gap-2 sm:gap-3 px-2 sm:px-6 relative z-20 -mb-[2px]">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 flex items-center gap-2 sm:gap-2.5 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-mono lowercase tracking-wider rounded-t-xl border-t-2 border-x-2 transition-all duration-200 cursor-pointer ${
                  isActive
                    ? `${tab.color} font-bold z-30 shadow-xs border-b-2 border-[#fcfaf2]`
                    : `${tab.inactiveColor} border-[#323A72]/25 opacity-80 hover:opacity-100 border-b-2 border-[#323A72]/30`
                }`}
              >
                <span className="opacity-70 font-mono text-[11px] sm:text-xs font-bold">{tab.num}</span>
                <span className="font-semibold">{tab.title}</span>
              </button>
            );
          })}
        </div>

        {/* THE NOTEBOOK BODY (Paper Binder) */}
        <div className="relative bg-[#fcfaf2] border-2 border-[#323A72]/30 rounded-xl rounded-tl-none shadow-xl p-4 sm:p-6 md:p-10 z-10 bg-notebook-grid overflow-hidden">
          
          {/* Top notebook bar */}
          <div className="flex justify-between items-center pb-4 mb-6 border-b-2 border-dashed border-[#323A72]/20">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#323A72]/30" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#323A72]/30" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#323A72]/30" />
              <span className="font-mono text-xs text-[#323A72] font-semibold tracking-wider lowercase ml-1">
                tab: {activeTab}
              </span>
            </div>

            <span className="bg-[#131522] text-[#fff7dd] px-2.5 py-0.5 rounded text-[11px] font-mono">
              {filteredProjects.length} projects
            </span>
          </div>

          {/* PROJECT CARDS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
            {filteredProjects.map((project, idx) => {
              const isHovered = hoveredProjectId === project.id;

              return (
                <ScrollReveal
                  key={project.id}
                  delay={idx * 100}
                  className="h-full"
                >
                  <div
                    onMouseEnter={() => setHoveredProjectId(project.id)}
                    onMouseLeave={() => setHoveredProjectId(null)}
                    className="group bg-[#fffdf7] border border-[#323A72]/25 rounded-lg p-4 sm:p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 relative flex flex-col justify-between h-full"
                  >
                    {/* Masking tape on card corner - ENLARGED & READABLE */}
                    <div className="masking-tape -top-3.5 sm:-top-4 right-4 sm:right-6 px-4 py-1.5 h-8 sm:h-9 rotate-[2deg] flex items-center justify-center min-w-[130px] border border-[#323A72]/20 shadow-xs">
                      <span className="font-handwriting text-base sm:text-lg text-[#131522] font-bold lowercase tracking-wide whitespace-nowrap">
                        {project.client}
                      </span>
                    </div>

                    {/* Media / Video Simulation Box */}
                    <div className="relative w-full aspect-[16/10] bg-[#131522] rounded overflow-hidden mb-4 border border-[#323A72]/20 shadow-inner mt-2 sm:mt-1">
                      <img
                        src={project.image}
                        alt={project.title}
                        className={`w-full h-full object-cover transition-all duration-500 ${
                          isHovered ? 'scale-105 opacity-80' : 'opacity-95'
                        }`}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                      {/* Video simulation HUD on hover */}
                      <div
                        className={`absolute inset-0 flex flex-col justify-between p-3 sm:p-4 transition-opacity duration-200 ${
                          isHovered ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        <div className="flex justify-between items-center text-[10px] font-mono text-[#fff7dd]/80">
                          <span className="bg-black/60 px-2 py-0.5 rounded border border-white/10 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#29E3BE] animate-ping" />
                            preview
                          </span>
                          <span className="bg-black/60 px-2 py-0.5 rounded border border-white/10 hidden sm:inline">
                            {project.videoRef}
                          </span>
                        </div>

                        <div className="self-center flex flex-col items-center">
                          <div className="w-12 h-12 rounded-full bg-[#29E3BE] text-[#131522] flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          </div>
                          <span className="text-[10px] font-mono text-white mt-2 bg-black/70 px-2 py-0.5 rounded">
                            sample-accurate sync
                          </span>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[9px] font-mono text-white/70">
                            <span>00:14 / 00:48</span>
                            <span className="text-[#29E3BE]">4k 60fps</span>
                          </div>
                          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                            <div className="w-1/3 h-full bg-[#29E3BE] animate-pulse" />
                          </div>
                        </div>
                      </div>

                      {project.soundProof && (
                        <div className="absolute bottom-2.5 left-2.5 bg-[#131522]/90 text-[#29E3BE] border border-[#29E3BE]/40 px-2 py-0.5 rounded text-[10px] font-mono flex items-center gap-1.5 z-10 backdrop-blur-sm lowercase">
                          <Music2 className="w-3 h-3" />
                          <span>sound & motion</span>
                        </div>
                      )}
                    </div>

                    {/* Project Details */}
                    <div className="space-y-2 sm:space-y-3 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Client name prominently displayed */}
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-base sm:text-lg font-bold font-mono text-[#323A72] lowercase tracking-normal">
                            {project.client}
                          </span>
                          <span className="text-[10px] font-mono bg-[#323A72]/10 px-2 py-0.5 rounded text-[#323A72]">
                            #{project.id.slice(0, 4)}
                          </span>
                        </div>

                        {/* Project Title */}
                        <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#131522] group-hover:text-[#323A72] transition-colors leading-snug">
                          {project.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-[#131522]/80 font-sans leading-relaxed mt-2">
                          {project.description}
                        </p>
                      </div>

                      {/* Tools and notes */}
                      <div className="pt-3 sm:pt-4 border-t border-[#323A72]/15 space-y-2 mt-3">
                        <div className="font-handwriting text-base sm:text-lg text-[#323A72] font-semibold">
                          {project.annotation}
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {project.tools.map((tool) => (
                            <span
                              key={tool}
                              className="text-[10px] font-mono bg-[#fff7dd] border border-[#323A72]/20 text-[#323A72] px-2 py-0.5 rounded lowercase"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Bottom Notebook footnote */}
          <ScrollReveal className="mt-8 pt-5 border-t border-[#323A72]/20 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#323A72] gap-3">
            <span className="font-handwriting text-lg sm:text-xl text-[#131522]">
              * More archives and project reels available on request
            </span>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 bg-[#131522] text-[#fff7dd] px-4 py-2 rounded text-xs font-mono lowercase tracking-wider hover:bg-[#323A72] transition-colors"
            >
              <span>discuss a project</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#29E3BE]" />
            </a>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};
