import React, { useState } from 'react';
import { Play, ExternalLink, Layers, Music2 } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

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
    id: 'soothe-analog-ui',
    title: 'EUPHONIA // Neural Resonance Synth',
    client: 'Spectral Audio Labs',
    category: 'dsp',
    description:
      'High-converting 3D teaser and interactive UI walkthrough translating complex non-linear filter resonance curves into intuitive visual metaphors.',
    tags: ['DSP Launch', '3D UI Modeling', 'Walkthrough'],
    tools: ['Blender 4.2', 'After Effects', 'Ableton Live 12', 'DSP Audio Sync'],
    image: '/dsp-plugin-ui.jpg',
    videoRef: 'EUPHONIA_LAUNCH_REEL_4K.mp4',
    annotation: '* Sample-accurate transient animation',
    soundProof: true,
  },
  {
    id: 'harmonic-exciter',
    title: 'AURA 3D // Harmonic Saturator Suite',
    client: 'Oksound Partner Concept',
    category: 'dsp',
    description:
      'Bespoke visual identity and cinematic DAW macro shots for an algorithmic tube saturator. Demonstrates warmth and odd harmonics through dynamic light physics.',
    tags: ['Plugin Ecosystem', 'Visual Identity', 'Social Conversion'],
    tools: ['Cinema 4D', 'Octane Render', 'Custom Shaders'],
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=900&auto=format&fit=crop',
    videoRef: 'AURA_MACRO_TUBE_EXP.mp4',
    annotation: '* 0-friction DAW integration',
    soundProof: true,
  },
  {
    id: 'spectral-eq-walkthrough',
    title: 'RESONANCE // Dynamic EQ Masterclass',
    client: 'Tokyo DSP Works',
    category: 'dsp',
    description:
      'Replacing tedious software manuals with a highly stylized, cinematic 90-second product walkthrough explaining complex sidechain phase alignment.',
    tags: ['Premium Walkthrough', 'Algorithm 3D', 'Tutorial Replacement'],
    tools: ['After Effects', 'DaVinci Resolve', 'Sound Design'],
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=900&auto=format&fit=crop',
    videoRef: 'RESONANCE_EQ_WALKTHROUGH.mov',
    annotation: '* Increased conversion by +42%',
  },

  // TAB 2: INTERACTIVE WEB ASSETS (SOUND DESIGN PROOF)
  {
    id: 'web-dsp-knob-3d',
    title: 'Procedural 3D WebGL Rotary System',
    client: 'Orikawa Internal Lab',
    category: 'web',
    description:
      'Lightweight, high-framerate interactive 3D rotary knob and tactile slider system with real-time Web Audio API frequency sweep feedback.',
    tags: ['Three.js', 'Web Audio API', 'Interactive UI'],
    tools: ['Three.js', 'TypeScript', 'GLSL Shaders', 'Web Audio'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=900&auto=format&fit=crop',
    videoRef: 'WEBGL_KNOB_REACT.webm',
    annotation: '* 60fps micro-interaction on mobile',
    soundProof: true,
  },
  {
    id: 'fluid-water-waveform',
    title: 'Acoustic Fluid Wave Simulator',
    client: 'DSP Interactive Research',
    category: 'web',
    description:
      'Real-time water physics canvas responding to live audio microphone input or procedural oscillator clicks. Organic meets technical.',
    tags: ['Canvas 2D', 'Fluid Physics', 'Audio Reactive'],
    tools: ['HTML5 Canvas', 'Math Physics', 'FFT Analyzer'],
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=900&auto=format&fit=crop',
    videoRef: 'WATER_ACOUSTIC_SIM.mp4',
    annotation: '* Ear-candy sound design test',
    soundProof: true,
  },

  // TAB 3: OTHERS / MOTION GRAPHICS & FILM
  {
    id: 'orikawa-film-identity',
    title: 'Clarity in Nature // Cinematic Short',
    client: 'Artistic Direction',
    category: 'motion',
    description:
      'Poetic documentary exploring the dialogue between vintage electronic instruments and quiet natural landscapes. Shot on vintage anamorphic lenses.',
    tags: ['Filmmaking', 'Color Grading', 'Soundtrack'],
    tools: ['RED Komodo 6K', 'Anamorphic 35mm', 'Custom Score'],
    image: '/cinematic-meadow.jpg',
    videoRef: 'CLARITY_IN_NATURE_4K.mp4',
    annotation: '* Directed & Scored by Orion Laurentin',
    soundProof: true,
  },
  {
    id: 'brand-stinger-motion',
    title: 'Orikawa Kinetic Identity & Logo Stinger',
    client: 'Studio Identity',
    category: 'motion',
    description:
      'Handcrafted chevron wave animation colliding with minimalist Swiss typography and custom synthesized sonic branding.',
    tags: ['Logo Animation', 'Kinetic Type', 'Sonic Logo'],
    tools: ['After Effects', 'Moho', 'Analog Tape Synth'],
    image: '/moodboard-orikawa.png',
    videoRef: 'ORIKAWA_STINGER_MASTER.mov',
    annotation: '* Handcrafted notebook aesthetic',
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
      title: 'Works in DSP Industries',
      subtitle: 'Audio Plugins, UI & Walkthroughs',
      color: 'bg-[#29E3BE] text-[#131522] border-[#29E3BE]',
      inactiveColor: 'bg-[#f4eed4] text-[#131522]/70 hover:bg-[#eae4c9]',
    },
    {
      id: 'web' as const,
      num: '[02]',
      title: 'Interactive Web Assets',
      subtitle: 'WebGL & Sound Design Proof',
      color: 'bg-[#FFF951] text-[#131522] border-[#FFF951]',
      inactiveColor: 'bg-[#f4eed4] text-[#131522]/70 hover:bg-[#eae4c9]',
    },
    {
      id: 'motion' as const,
      num: '[03]',
      title: 'Others & Motion Graphics',
      subtitle: 'Filmmaking, R&D & Stingers',
      color: 'bg-[#323A72] text-[#fff7dd] border-[#323A72]',
      inactiveColor: 'bg-[#f4eed4] text-[#131522]/70 hover:bg-[#eae4c9]',
    },
  ];

  const handleTabChange = (tabId: 'dsp' | 'web' | 'motion') => {
    setActiveTab(tabId);
    soundEngine.playTapeClick(680, 0.03);
  };

  return (
    <section id="works" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#323A72] mb-2">
            <Layers className="w-3.5 h-3.5 text-[#29E3BE]" />
            <span>[01] // PORTFOLIO DOSSIER</span>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl font-bold text-[#131522] tracking-tight">
            Selected Works
          </h2>
          <p className="font-handwriting text-2xl text-[#323A72] mt-1">
            * Curated cases from the studio notebook
          </p>
        </div>

        {/* Note on video placeholders */}
        <div className="bg-[#fff7dd] border border-[#323A72]/20 p-3 rounded text-xs font-mono text-[#323A72] max-w-xs shadow-sm">
          <span className="font-bold text-[#131522] block mb-0.5">Note on media:</span>
          Hosted on high-speed private CDN. Hover any project to preview video simulation & audio sync.
        </div>
      </div>

      {/* NOTEBOOK CONTAINER WITH TABS ON TOP */}
      <div className="relative pt-12">
        
        {/* TABS ON TOP OF NOTEBOOK (User requested: tabs should be on top of notebook) */}
        <div className="absolute top-0 left-0 right-0 flex flex-wrap gap-2 px-4 md:px-8 z-20">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2.5 px-4 md:px-6 py-2.5 text-xs font-mono uppercase tracking-wider rounded-t-lg border-t-2 border-x-2 transition-all duration-300 shadow-sm ${
                  isActive
                    ? `${tab.color} font-bold -mb-[2px] pb-3.5 z-30 shadow-md`
                    : `${tab.inactiveColor} border-[#323A72]/20 hover:-translate-y-0.5`
                }`}
              >
                <span className="font-bold opacity-80">{tab.num}</span>
                <span className="font-semibold">{tab.title}</span>
              </button>
            );
          })}
        </div>

        {/* THE NOTEBOOK BODY (Paper Binder) */}
        <div className="relative bg-[#fcfaf2] border-2 border-[#323A72]/30 rounded-xl rounded-tl-none shadow-2xl p-6 md:p-10 z-10 bg-notebook-grid overflow-hidden">
          
          {/* Notebook binder rings simulation along the top inside margin */}
          <div className="flex justify-between items-center pb-6 mb-8 border-b-2 border-dashed border-[#323A72]/20">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#323A72]/30" />
              <span className="w-3 h-3 rounded-full bg-[#323A72]/30" />
              <span className="w-3 h-3 rounded-full bg-[#323A72]/30" />
              <span className="font-mono text-xs text-[#323A72] font-semibold tracking-widest uppercase ml-2">
                ACTIVE_DOSSIER: {activeTab.toUpperCase()}_INDEX
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-[#323A72]">
              <span className="font-handwriting text-xl text-[#E019D7] rotate-[-2deg]">
                * True-to-scale playback
              </span>
              <span className="hidden sm:inline bg-[#131522] text-[#fff7dd] px-2.5 py-1 rounded text-[10px]">
                {filteredProjects.length} CASES FILED
              </span>
            </div>
          </div>

          {/* PROJECT CARDS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
            {filteredProjects.map((project) => {
              const isHovered = hoveredProjectId === project.id;

              return (
                <div
                  key={project.id}
                  onMouseEnter={() => {
                    setHoveredProjectId(project.id);
                    soundEngine.playKnobTick(1.1);
                  }}
                  onMouseLeave={() => setHoveredProjectId(null)}
                  className="group bg-[#fffdf7] border border-[#323A72]/25 rounded-lg p-5 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 relative flex flex-col justify-between"
                >
                  {/* Masking tape on card corner */}
                  <div className="masking-tape -top-3 right-6 w-24 h-5 rotate-[3deg] flex items-center justify-center">
                    <span className="font-handwriting text-[11px] text-[#131522] font-bold">
                      {project.client}
                    </span>
                  </div>

                  {/* Media / Video Simulation Box */}
                  <div className="relative w-full aspect-[16/10] bg-[#131522] rounded overflow-hidden mb-5 border border-[#323A72]/20 shadow-inner">
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        isHovered ? 'scale-105 opacity-80 blur-[0.5px]' : 'opacity-95'
                      }`}
                    />

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                    {/* Video simulation HUD on hover */}
                    <div
                      className={`absolute inset-0 flex flex-col justify-between p-4 transition-opacity duration-300 ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      {/* Top HUD info */}
                      <div className="flex justify-between items-center text-[10px] font-mono text-[#fff7dd]/80">
                        <span className="bg-black/60 px-2 py-0.5 rounded border border-white/10 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#29E3BE] animate-ping" />
                          PLAYING PREVIEW
                        </span>
                        <span className="bg-black/60 px-2 py-0.5 rounded border border-white/10">
                          {project.videoRef}
                        </span>
                      </div>

                      {/* Center Play Icon with animated ring */}
                      <div className="self-center flex flex-col items-center">
                        <div className="w-14 h-14 rounded-full bg-[#29E3BE] text-[#131522] flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 fill-current ml-1" />
                        </div>
                        <span className="text-[11px] font-mono text-white mt-2 bg-black/70 px-2 py-0.5 rounded">
                          Sample-accurate audio sync
                        </span>
                      </div>

                      {/* Bottom Scrubber simulation & Waveform */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[9px] font-mono text-white/70">
                          <span>00:14 / 00:48</span>
                          <span className="text-[#29E3BE]">96kHz / 24-bit</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                          <div className="w-1/3 h-full bg-[#29E3BE] animate-pulse" />
                        </div>
                      </div>
                    </div>

                    {/* Sound proof badge if audio related */}
                    {project.soundProof && (
                      <div className="absolute bottom-3 left-3 bg-[#131522]/90 text-[#29E3BE] border border-[#29E3BE]/40 px-2.5 py-1 rounded text-[10px] font-mono flex items-center gap-1.5 z-10 backdrop-blur-sm">
                        <Music2 className="w-3 h-3 animate-spin" style={{ animationDuration: '6s' }} />
                        <span>AUDIO PROOF</span>
                      </div>
                    )}
                  </div>

                  {/* Project Details */}
                  <div className="space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Client & Category */}
                      <div className="flex items-center justify-between text-xs font-mono text-[#323A72] mb-1">
                        <span className="font-semibold uppercase tracking-wider">{project.client}</span>
                        <span className="text-[10px] bg-[#323A72]/10 px-2 py-0.5 rounded text-[#323A72]">
                          REF_{project.id.slice(0, 4).toUpperCase()}
                        </span>
                      </div>

                      {/* Project Title */}
                      <h3 className="font-serif font-bold text-2xl text-[#131522] group-hover:text-[#323A72] transition-colors">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-[#131522]/80 font-sans leading-relaxed mt-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Notebook style tools & annotation */}
                    <div className="pt-4 border-t border-[#323A72]/15 space-y-2 mt-4">
                      {/* Handwritten annotation */}
                      <div className="font-handwriting text-lg text-[#323A72] font-semibold">
                        {project.annotation}
                      </div>

                      {/* Tools used */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.tools.map((tool) => (
                          <span
                            key={tool}
                            className="text-[10px] font-mono bg-[#fff7dd] border border-[#323A72]/20 text-[#323A72] px-2 py-0.5 rounded"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Bottom Notebook footnote */}
          <div className="mt-10 pt-6 border-t border-[#323A72]/20 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#323A72] gap-4">
            <span className="font-handwriting text-xl text-[#131522]">
              * More archives and raw DAW sessions available on request
            </span>
            <a
              href="#contact"
              onClick={() => soundEngine.playTapeClick(800, 0.03)}
              className="inline-flex items-center gap-2 bg-[#131522] text-[#fff7dd] px-4 py-2 rounded text-xs font-mono uppercase tracking-wider hover:bg-[#323A72] transition-colors"
            >
              <span>Request Custom Showreel</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#29E3BE]" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
