import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Mail, PlayCircle, Fingerprint, Layers, Cpu, Sparkles } from 'lucide-react';

const BINDER_TABS = [
  {
    id: 'launch',
    short: '[01]',
    title: '01_LAUNCH_ECOSYSTEM',
    color: 'bg-[#8CA196]', // Vert Sauge
    content: (
      <div className="space-y-4 animate-fade-in">
        <h2 className="text-xl font-bold tracking-tight uppercase font-serif">Social Media & Launch</h2>
        <p className="text-sm opacity-90 text-[#4A5568]">You build the DSP. We build the hype. High-converting short-form assets perfectly synced to your audio.</p>
        
        <div className="w-full aspect-video bg-[#1A1A1A] rounded-sm border border-[#C7C2B5] relative overflow-hidden flex items-center justify-center shadow-inner group">
          {/* Faux contenu vidéo */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          <PlayCircle className="w-12 h-12 text-[#8CA196]/80 group-hover:scale-110 group-hover:text-[#8CA196] transition-all duration-500 z-10" strokeWidth={1} />
          <span className="absolute bottom-2 left-2 text-[10px] text-white/50 font-mono tracking-widest">REF: SOOTHE_UI_LOOP.mp4</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="border border-[#C7C2B5] p-3 bg-[#F4F1EA] relative">
            <div className="absolute -top-2 -right-2 text-[#D9B340] font-handwriting text-lg rotate-12">*crucial</div>
            <h3 className="text-xs font-bold mb-1">Visual Identity</h3>
            <p className="text-[10px] text-[#5C6B73] leading-tight">Custom UI modeling. No generic stock assets.</p>
          </div>
          <div className="border border-[#C7C2B5] p-3 bg-[#F4F1EA]">
            <h3 className="text-xs font-bold mb-1">Conversion Kit</h3>
            <p className="text-[10px] text-[#5C6B73] leading-tight">Vertical Reels + Web UI Loops for landing pages.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'walkthrough',
    short: '[02]',
    title: '02_PREMIUM_WALKTHROUGH',
    color: 'bg-[#5C6B73]', // Bleu Ardoise
    content: (
      <div className="space-y-4 animate-fade-in">
        <h2 className="text-xl font-bold tracking-tight uppercase font-serif">Premium Walkthroughs</h2>
        <p className="text-sm opacity-90 text-[#4A5568]">Replacing boring DAW tutorials with highly stylized, cinematic explanations of your complex algorithms.</p>
        
        <div className="w-full aspect-video bg-[#EAE7E0] border border-[#C7C2B5] relative overflow-hidden flex flex-col p-4 shadow-inner group">
          <div className="flex-1 border-2 border-dashed border-[#5C6B73]/50 flex items-center justify-center bg-white/30 backdrop-blur-sm group-hover:bg-white/50 transition-colors">
             <span className="text-[#5C6B73] text-xs font-bold tracking-widest">[MACRO ZOOM ON EQ CURVE]</span>
          </div>
          <div className="h-6 mt-2 flex items-end gap-1">
             <div className="h-full w-2 bg-[#5C6B73]/40 animate-pulse"></div>
             <div className="h-3/4 w-2 bg-[#5C6B73]/60 animate-pulse" style={{animationDelay: '100ms'}}></div>
             <div className="h-full w-2 bg-[#5C6B73] animate-pulse" style={{animationDelay: '200ms'}}></div>
             <span className="text-[10px] ml-2 text-[#4A5568] font-handwriting text-sm">Perfect audio sync to the ms.</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'web',
    short: '[03]',
    title: '03_WEB_ASSETS',
    color: 'bg-[#D9B340]', // Ocre
    content: (
      <div className="space-y-4 animate-fade-in">
        <h2 className="text-xl font-bold tracking-tight uppercase font-serif">Landing Page Ecosystem</h2>
        <p className="text-sm opacity-90 text-[#4A5568]">Lightweight, perfectly looped animations to make your website feel alive and premium.</p>
        
        <div className="grid grid-cols-2 gap-4">
           <div className="aspect-square bg-[#1A1A1A] border border-[#C7C2B5] flex items-center justify-center relative overflow-hidden">
              <div className="w-16 h-16 rounded-full border-4 border-[#D9B340]/20 border-t-[#D9B340] animate-spin"></div>
              <span className="absolute bottom-2 left-2 text-[10px] text-white/50 font-mono">KNOB_REACT.webm</span>
           </div>
           <div className="aspect-square bg-[#FCFBF8] border border-[#C7C2B5] flex items-center justify-center relative bg-[radial-gradient(#C7C2B5_1px,transparent_1px)] [background-size:10px_10px]">
              <div className="w-full h-8 bg-gradient-to-r from-transparent via-[#8CA196]/30 to-transparent flex items-center">
                 <div className="w-full h-px bg-[#8CA196]"></div>
              </div>
              <span className="absolute bottom-2 right-2 text-[10px] text-[#5C6B73] font-mono">WAVEFORM.mp4</span>
           </div>
        </div>
      </div>
    )
  }
];

const Reveal = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    if (ref.current) observer.observe(ref.current);
    return () => { if (observer) observer.disconnect(); }
  }, []);

  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}>
      {children}
    </div>
  );
};

export default function OrikawaWebPortfolio() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTabId, setActiveTabId] = useState('launch');
  const activeTabData = BINDER_TABS.find(t => t.id === activeTabId) || BINDER_TABS[0];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#FCFBF8] text-[#2D2D2D] font-mono relative selection:bg-[#8CA196] selection:text-white overflow-x-hidden">
      
      {/* GLOBAL STYLES INJECTION */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap');
        
        .font-handwriting { font-family: 'Caveat', cursive; }
        
        .masking-tape {
          position: absolute;
          background-color: rgba(255, 255, 255, 0.4);
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          backdrop-filter: blur(2px);
          transform: rotate(-2deg);
          z-index: 20;
        }
        .tape-top { top: -10px; left: 50%; transform: translateX(-50%) rotate(-3deg); width: 80px; height: 25px; }
        .tape-bottom-right { bottom: -10px; right: -10px; transform: rotate(-45deg); width: 60px; height: 20px; }

        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 15s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />

      {/* BACKGROUND TEXTURES (Blueprint Organique) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.12] z-50 mix-blend-multiply" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}>
      </div>
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-0" 
           style={{ backgroundImage: 'linear-gradient(#5C6B73 1px, transparent 1px), linear-gradient(90deg, #5C6B73 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      {/* FLOATING ORGANIC BLOBS */}
      <div className="fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#8CA196] opacity-[0.07] blur-[100px] animate-blob pointer-events-none z-0"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-[#D9B340] opacity-[0.05] blur-[120px] animate-blob animation-delay-2000 pointer-events-none z-0"></div>

      {}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-500 ${isScrolled ? 'bg-[#FCFBF8]/80 backdrop-blur-md border-b border-[#C7C2B5]/50 py-4 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="font-serif font-bold text-2xl tracking-tighter">orikawa</div>
          <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest text-[#5C6B73]">
            <a href="#featured" className="hover:text-[#2D2D2D] transition-colors">The Binder</a>
            <a href="#side-projects" className="hover:text-[#2D2D2D] transition-colors">prjc //</a>
            <a href="#process" className="hover:text-[#2D2D2D] transition-colors">Methodology</a>
          </div>
          <a href="#contact" className="text-xs uppercase tracking-widest border border-[#2D2D2D] px-4 py-2 hover:bg-[#2D2D2D] hover:text-[#FCFBF8] transition-colors">
            Initiate Contact
          </a>
        </div>
      </nav>

      {}
      <header className="pt-32 pb-16 md:pt-48 md:pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[85vh] relative z-10">
        
        {/* Handwritten Annotation */}
        <div className="absolute top-32 left-10 md:left-24 text-[#8CA196] font-handwriting text-2xl -rotate-6 opacity-80 hidden md:block">
          * A visual engineering studio
        </div>

        <Reveal className="text-center mb-16 w-full flex flex-col items-center">
          <h1 className="font-serif text-7xl md:text-9xl font-bold tracking-tighter text-[#1A1A1A]">orikawa</h1>
          <p className="font-handwriting text-3xl md:text-4xl mt-2 text-[#5C6B73] -rotate-2">laurentin</p>
        </Reveal>

        {/* Moodboard with Masking Tape Effect */}
        <Reveal delay={200} className="w-full relative max-w-4xl mx-auto">
          {/* Masking Tape */}
          <div className="masking-tape tape-top"></div>
          <div className="masking-tape tape-bottom-right"></div>
          
          {/* Handwritten dimension note */}
          <div className="absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 font-handwriting text-[#A39E93] text-xl hidden md:block">
            Scale: 1:1 (True Sync)
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-1 h-64 md:h-80 relative overflow-hidden group shadow-2xl p-2 bg-white border border-[#EAE7E0] transform rotate-1">
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none bg-black/10 group-hover:bg-black/0 transition-all duration-700">
              <h2 className="font-serif text-3xl md:text-5xl text-white drop-shadow-2xl italic font-light transform group-hover:scale-105 transition-transform duration-700">Clarity in Motion.</h2>
            </div>
            <img src="https://images.unsplash.com/photo-1440688807730-73e4e2169fb8?q=80&w=800&auto=format&fit=crop" alt="Water" className="w-full h-full object-cover grayscale-[0.5]" />
            <img src="https://images.unsplash.com/photo-1547394765-185e1e68f34e?q=80&w=800&auto=format&fit=crop" alt="Tech" className="w-full h-full object-cover grayscale-[0.5]" />
            <img src="https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=800&auto=format&fit=crop" alt="Light" className="w-full h-full object-cover grayscale-[0.5]" />
            <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop" alt="Nature" className="w-full h-full object-cover grayscale-[0.5]" />
          </div>
        </Reveal>
        
        <Reveal delay={400} className="mt-16 text-center max-w-2xl text-sm leading-relaxed text-[#4A5568]">
          <p>The specialized visual studio for the <strong className="text-[#2D2D2D]">audio-tech & DSP industry</strong>.</p>
          <p className="mt-2 opacity-80">We translate complex algorithms into premium, converting visual ecosystems. Perfect audio sync, bespoke UI animation, and organic aesthetics.</p>
        </Reveal>
      </header>

      {}
      <section id="featured" className="py-24 px-2 md:px-12 max-w-6xl mx-auto relative z-10">
        <Reveal className="mb-12 text-center md:text-left md:pl-8">
          <h3 className="text-xs uppercase tracking-widest text-[#8CA196] mb-2 flex items-center justify-center md:justify-start gap-2">
            <Sparkles className="w-3 h-3" /> [01] // THE DOSSIER
          </h3>
          <h2 className="font-serif text-4xl md:text-5xl font-bold">Solutions B2B</h2>
          <p className="font-handwriting text-2xl text-[#5C6B73] mt-2">* Browse the active files</p>
        </Reveal>

        <Reveal delay={200} className="relative w-full h-[650px] md:h-[500px] flex flex-col md:flex-row z-10 shadow-2xl">
          
          {/* THE BINDER LEFT SPINE / COVER (Desktop only) */}
          <div className="hidden md:flex w-1/3 h-full bg-[#F4F1EA] border-y border-l border-[#C7C2B5] relative overflow-hidden flex-col p-8">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#8CA196 1px, transparent 1px), linear-gradient(90deg, #8CA196 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            <h3 className="font-serif text-3xl font-bold text-[#1A1A1A] mb-2 z-10">orikawa</h3>
            <p className="text-[10px] uppercase tracking-widest text-[#5C6B73] border-b border-[#C7C2B5] pb-4 z-10">Client Operations</p>
            <div className="mt-auto z-10">
               <p className="font-handwriting text-2xl text-[#8CA196] rotate-[-5deg]">"Bridging code and emotion."</p>
            </div>
            {/* Binder Rings */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-black/10 border-l border-[#C7C2B5]"></div>
          </div>

          {/* THE BINDER CONTENT (Right Page) */}
          <div className="flex-1 h-full bg-[#FCFBF8] border-y border-x md:border-l-0 border-[#C7C2B5] relative p-6 md:p-10 flex flex-col">
            <div className="flex justify-between items-end border-b border-[#C7C2B5] pb-4 mb-6">
              <div>
                <p className="text-[10px] tracking-widest text-[#5C6B73] uppercase">Active File</p>
                <h2 className="font-mono text-sm font-bold text-[#1A1A1A]">{activeTabData.title}</h2>
              </div>
              <div className="text-[10px] text-[#A39E93]">REF: ORK-{activeTabData.id.toUpperCase()}</div>
            </div>
            
            {/* Dynamic Content */}
            <div className="flex-1 overflow-y-auto">
               {activeTabData.content}
            </div>
          </div>

          {/* THE BINDER TABS (Bottom on Mobile, Right on Desktop) */}
          <div className="absolute bottom-[-60px] left-0 w-full h-[60px] md:relative md:bottom-auto md:left-auto md:w-12 md:h-full flex flex-row md:flex-col z-0">
            {BINDER_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`flex-1 md:flex-none md:h-1/3 flex items-center justify-center transition-all duration-300 border border-[#2D2D2D]/20 shadow-md hover:brightness-110 ${tab.color} text-[#FCFBF8] font-bold text-xs tracking-widest
                  rounded-b-md md:rounded-b-none md:rounded-r-md
                  ${activeTabId === tab.id 
                    ? 'h-[70px] mt-0 md:w-16 md:-ml-4 z-20 shadow-xl brightness-110' 
                    : 'h-[50px] -mt-[10px] md:mt-0 md:w-12 md:hover:w-14 z-10 opacity-90'
                  }
                `}
              >
                {/* Desktop Text */}
                <span className="hidden md:block transform rotate-90 whitespace-nowrap">{tab.short}</span>
                {/* Mobile Text */}
                <span className="block md:hidden">{tab.short}</span>
              </button>
            ))}
          </div>
        </Reveal>
      </section>

      {}
      <section id="side-projects" className="py-24 bg-[#EAE7E0] border-y border-[#C7C2B5]/50 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <h3 className="text-xs uppercase tracking-widest text-[#D9B340] mb-2">[02] // SIDE PROJECTS & RESEARCH</h3>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-2">Curiosités (prjc)</h2>
              <p className="font-handwriting text-xl text-[#5C6B73] mb-4">* The R&D laboratory</p>
              <p className="text-sm text-[#4A5568] leading-relaxed">
                An exploration of science, nature, and the physical world. Where the organic meets the technical.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
             {/* Sticky note */}
             <div className="absolute -top-10 right-10 bg-[#F4F1EA] p-4 shadow-lg border border-[#C7C2B5] w-48 rotate-3 z-20 hidden md:block">
                <div className="w-4 h-4 bg-red-400 rounded-full absolute -top-2 left-1/2 -translate-x-1/2 shadow-sm"></div>
                <p className="font-handwriting text-sm text-[#1A1A1A]">Remember to test the water tension physics animation here!</p>
             </div>

             {[1, 2, 3].map((item, idx) => (
                <Reveal key={item} delay={idx * 150} className="bg-[#FCFBF8] p-4 group hover:-translate-y-2 hover:border-[#D9B340]/50 transition-all duration-500 cursor-pointer shadow-sm hover:shadow-xl relative border border-[#C7C2B5]">
                   {/* Tape on photos */}
                   <div className="masking-tape tape-top opacity-70"></div>
                   
                   <div className="w-full aspect-square bg-[#1A1A1A] mb-4 relative overflow-hidden rounded-sm">
                     <div className="absolute inset-0 opacity-40 mix-blend-screen bg-gradient-to-tr from-[#D9B340] to-[#8CA196] group-hover:scale-110 transition-transform duration-1000"></div>
                     <span className="absolute bottom-2 left-2 text-[10px] text-white/80 bg-black/40 px-2 py-1 border border-white/10 backdrop-blur-sm">EXPERIMENT_{item}.mov</span>
                   </div>
                   <h4 className="font-bold text-sm mb-1 group-hover:text-[#D9B340] transition-colors">Dossier #{item}</h4>
                   <p className="text-xs text-[#5C6B73] line-clamp-2">Exploration of physical constraints and organic algorithms.</p>
                </Reveal>
             ))}
          </div>
        </div>
      </section>

      {}
      <section id="process" className="py-24 px-6 md:px-12 max-w-4xl mx-auto relative z-10">
        <Reveal className="text-center mb-20">
          <h3 className="text-xs uppercase tracking-widest text-[#5C6B73] mb-2">[03] // METHODOLOGY</h3>
          <h2 className="font-serif text-4xl font-bold">Engineering Workflow</h2>
          <p className="font-handwriting text-2xl text-[#8CA196] mt-2">Precision at every step.</p>
        </Reveal>

        <div className="relative">
          {/* Blueprint dashed line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-[#C7C2B5] md:-translate-x-1/2 z-0"></div>

          {[
            { step: '01', title: 'Audit & Blueprint', desc: 'We dissect your DSP algorithm to define the visual metaphors.', icon: <Fingerprint className="w-5 h-5" /> },
            { step: '02', title: 'The Forge', desc: 'Custom UI modeling, fluid animations, and bespoke sound design.', icon: <Cpu className="w-5 h-5" /> },
            { step: '03', title: 'Ecosystem Delivery', desc: 'A full conversion kit ready for your social feed and landing page.', icon: <Layers className="w-5 h-5" /> }
          ].map((item, idx) => (
            <Reveal key={item.step} delay={idx * 200} className={`relative flex items-center justify-between md:justify-normal mb-16 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''} group z-10`}>
              
              <div className="absolute left-6 md:left-1/2 w-12 h-12 rounded-full bg-[#FCFBF8] border-2 border-[#5C6B73] md:-translate-x-1/2 flex items-center justify-center text-[#5C6B73] group-hover:bg-[#5C6B73] group-hover:text-white transition-colors duration-300">
                {item.icon}
              </div>

              <div className="w-full pl-20 md:pl-0 md:w-[45%] flex flex-col">
                <div className={`p-4 border-b border-[#C7C2B5] relative ${idx % 2 === 0 ? 'md:text-left md:border-l md:border-b-0' : 'md:text-right md:border-r md:border-b-0'}`}>
                  <span className="text-xs font-bold text-[#8CA196] mb-1 block">PHASE_{item.step}</span>
                  <h4 className="font-bold text-lg">{item.title}</h4>
                  <p className="text-sm text-[#4A5568] mt-2">{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {}
      <section id="contact" className="py-24 bg-[#1A1A1A] text-[#FCFBF8] relative overflow-hidden z-10">
         <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
         
         <Reveal className="max-w-3xl mx-auto px-6 relative z-10">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Initialize Transmission</h2>
              <p className="font-handwriting text-2xl text-[#8CA196]">* Let's elevate your next DSP release.</p>
            </div>

            <form className="space-y-8 bg-white/5 p-8 border border-white/10 rounded-sm backdrop-blur-md" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col group">
                  <label className="text-[10px] text-[#8CA196] mb-1 uppercase tracking-widest">01_Name</label>
                  <input type="text" className="bg-transparent border-b border-white/20 py-2 outline-none focus:border-[#8CA196] text-white text-sm" placeholder="John Doe" />
                </div>
                <div className="flex flex-col group">
                  <label className="text-[10px] text-[#8CA196] mb-1 uppercase tracking-widest">02_DSP Company</label>
                  <input type="text" className="bg-transparent border-b border-white/20 py-2 outline-none focus:border-[#8CA196] text-white text-sm" placeholder="e.g. Oeksound" />
                </div>
              </div>
              
              <div className="flex flex-col group">
                <label className="text-[10px] text-[#8CA196] mb-1 uppercase tracking-widest">03_Project Scope</label>
                <textarea rows="3" className="bg-transparent border-b border-white/20 py-2 outline-none focus:border-[#8CA196] text-white text-sm resize-none" placeholder="Tell me about your upcoming plugin..."></textarea>
              </div>

              <div className="flex justify-center pt-6">
                <button className="bg-[#FCFBF8] text-[#1A1A1A] font-bold px-8 py-3 text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-[#8CA196] hover:text-white transition-all duration-300">
                  <Mail className="w-4 h-4" /> Send Message
                </button>
              </div>
            </form>
         </Reveal>
      </section>

      <footer className="bg-[#111] text-[#5C6B73] py-6 text-center text-xs border-t border-white/10 relative z-10">
        <p>© {new Date().getFullYear()} orikawa. Acoustic & Visual Engineering.</p>
      </footer>
    </div>
  );
}