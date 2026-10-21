import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ArrowDown, Play, X, Waves } from 'lucide-react';
import { TriangularWaveSeparator } from './TriangularWaveSeparator';

interface WaterRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  strength: number;
  speed: number;
}

export const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [rippleDistortScale, setRippleDistortScale] = useState(0);

  // Store active water ripples
  const ripplesRef = useRef<WaterRipple[]>([]);
  const lastSpawnRef = useRef<number>(0);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsVideoModalOpen(false);
      }
    };
    if (isVideoModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isVideoModalOpen]);

  // Spawn water drop ripple at coordinates (x, y)
  const addWaterRipple = useCallback((clientX: number, clientY: number, power = 1.0) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ripplesRef.current.push({
      x,
      y,
      radius: 4,
      maxRadius: Math.max(180, Math.min(canvas.width, canvas.height) * 0.35),
      strength: power,
      speed: 3.5,
    });

    // Limit active ripples for 60fps performance
    if (ripplesRef.current.length > 24) {
      ripplesRef.current.shift();
    }
  }, []);

  // Mouse / Touch Drag Handlers for water lake drop shader effect
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    addWaterRipple(e.clientX, e.clientY, 1.2);
    setRippleDistortScale(18);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const now = Date.now();
    // Throttle spawn while dragging
    if (now - lastSpawnRef.current > 40) {
      lastSpawnRef.current = now;
      addWaterRipple(e.clientX, e.clientY, 0.85);
      setRippleDistortScale(prev => Math.min(24, prev + 2));
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Dampen distortion back to zero smoothly
  useEffect(() => {
    if (rippleDistortScale <= 0) return;
    const timer = setInterval(() => {
      setRippleDistortScale(prev => {
        if (prev <= 0.5) return 0;
        return prev * 0.88;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [rippleDistortScale]);

  // Dynamic canvas water ripple & showreel animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initial gentle drop on load
    setTimeout(() => {
      addWaterRipple(width / 2, height / 2 - 40, 1.0);
    }, 500);

    let time = 0;
    const render = () => {
      time += 0.008;
      ctx.clearRect(0, 0, width, height);

      // Warm paper background base
      ctx.fillStyle = '#fff7dd';
      ctx.fillRect(0, 0, width, height);

      // Subtle dynamic motion showreel waves & light pulses
      const numOrbs = 4;
      for (let i = 0; i < numOrbs; i++) {
        const angle = time * 0.8 + (i * Math.PI * 2) / numOrbs;
        const radius = Math.min(width, height) * 0.35;
        const x = width / 2 + Math.cos(angle) * (radius * 0.7);
        const y = height / 2 + Math.sin(angle * 1.2) * (radius * 0.5);

        const grad = ctx.createRadialGradient(x, y, 10, x, y, radius * 1.2);
        if (i % 3 === 0) {
          grad.addColorStop(0, 'rgba(41, 227, 190, 0.16)');
          grad.addColorStop(1, 'rgba(255, 247, 221, 0)');
        } else if (i % 3 === 1) {
          grad.addColorStop(0, 'rgba(50, 58, 114, 0.12)');
          grad.addColorStop(1, 'rgba(255, 247, 221, 0)');
        } else {
          grad.addColorStop(0, 'rgba(255, 249, 81, 0.12)');
          grad.addColorStop(1, 'rgba(255, 247, 221, 0)');
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, radius * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Kinematics grid lines with water wave refraction
      ctx.strokeStyle = 'rgba(50, 58, 114, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // WATER RIPPLE LAKE REFRACTION SHADER EFFECT
      const ripples = ripplesRef.current;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        const life = 1 - r.radius / r.maxRadius;

        if (life <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        const alpha = life * r.strength;

        // Crest ring 1 (Mint refraction)
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(41, 227, 190, ${alpha * 0.55})`;
        ctx.lineWidth = 3.5 * life;
        ctx.stroke();

        // Crest ring 2 (Specularity / light reflection on water surface)
        ctx.beginPath();
        ctx.arc(r.x, r.y, Math.max(0, r.radius - 8), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.75})`;
        ctx.lineWidth = 2 * life;
        ctx.stroke();

        // Trough ring 3 (Soft blue shadow beneath ripple)
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius + 6, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(50, 58, 114, ${alpha * 0.35})`;
        ctx.lineWidth = 2 * life;
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [addWaterRipple]);

  return (
    <div className="relative w-full">
      {/* SVG Water Ripple Displacement Filter for Text */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <filter id="lake-water-displacement" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.035 0.05"
            numOctaves="2"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={rippleDistortScale}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      {/* Full-screen Hero Container with Interactive Water Drop Touch / Drag */}
      <section
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative w-full h-screen min-h-[640px] flex flex-col items-center justify-center overflow-hidden select-none cursor-crosshair"
      >

        {/* Dynamic Video / Motion Background Placeholder */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-90 hidden"
            id="hero-video"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          >
            <source src="/hero-showreel.mp4" type="video/mp4" />
          </video>

          {/* Dynamic canvas showreel & water ripple lake shader */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
          />

          {/* Vignette & Soft Ambient Overlay */}
          <div className="absolute inset-0 bg-radial from-transparent via-[#fff7dd]/30 to-[#fff7dd]/80 pointer-events-none" />
        </div>

        {/* Center: "Clarity in Motion." with Capital C and M and Interactive Water Ripple Shader */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 flex flex-col items-center text-center">
          
          {/* Main Title: strictly "Clarity in Motion." (WITHOUT CSS lowercase) */}
          <div
            className="relative cursor-pointer transition-transform duration-150 active:scale-95"
            style={{
              filter: rippleDistortScale > 0 ? 'url(#lake-water-displacement)' : 'none',
              transform: isDragging ? 'translateY(1px)' : 'none',
            }}
            title="Click & drag to create water ripple waves"
          >
            <h1 className="font-effra-bold-italic text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#131522] tracking-tight leading-none drop-shadow-[0_4px_24px_rgba(19,21,34,0.15)] select-none">
              Clarity in Motion.
            </h1>
          </div>

          {/* Playful interactive hint */}
          <div className="mt-2 flex items-center gap-1.5 text-[10px] font-mono text-[#323A72]/60 select-none">
            <Waves className="w-3 h-3 text-[#29E3BE] animate-pulse" />
            <span>click & drag anywhere to ripple the water</span>
          </div>

          {/* Subtitle strictly mentioning motion design & filmmaking (no 3D) */}
          <p className="mt-3 text-xs sm:text-sm font-mono lowercase tracking-widest text-[#323A72]/80 max-w-md">
            motion design & filmmaking for audio technology and dsp creators
          </p>

          {/* Fancy "who are we?" Button with video trigger */}
          <div className="mt-7">
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="group relative inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-[#323A72]/30 bg-[#fffdf7]/85 backdrop-blur-sm text-xs font-mono lowercase tracking-wider text-[#131522] shadow-sm hover:border-[#29E3BE] hover:shadow-[0_0_24px_rgba(41,227,190,0.35)] hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <span className="w-5 h-5 rounded-full bg-[#323A72] text-[#fff7dd] flex items-center justify-center group-hover:bg-[#29E3BE] group-hover:text-[#131522] transition-colors">
                <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
              </span>
              <span className="font-semibold">who are we?</span>
            </button>
          </div>
        </div>

        {/* Bottom subtle scroll prompt */}
        <a
          href="#works"
          className="absolute bottom-8 z-10 flex flex-col items-center gap-1.5 text-xs font-mono lowercase tracking-wider text-[#323A72]/70 hover:text-[#131522] transition-colors"
        >
          <span>scroll</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </a>

      </section>

      {/* Seamless Condensed & Taller Triangular Wave Separator */}
      <TriangularWaveSeparator />

      {/* Presentation Video Modal - Clean Cinema Lightbox */}
      {isVideoModalOpen && (
        <div
          onClick={() => setIsVideoModalOpen(false)}
          className="fixed inset-0 z-50 bg-[#131522]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in"
        >
          {/* Floating Sleek Close Button */}
          <button
            onClick={() => setIsVideoModalOpen(false)}
            title="Close video (Esc)"
            className="absolute top-5 right-5 sm:top-8 sm:right-8 z-50 flex items-center gap-1.5 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 px-3.5 py-2 rounded-full border border-white/20 transition-all duration-200 cursor-pointer shadow-lg hover:scale-105"
          >
            <X className="w-5 h-5" />
            <span className="text-xs font-mono lowercase">close (esc)</span>
          </button>

          {/* Large Video Player Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl aspect-video bg-black rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden border border-white/15 flex items-center justify-center"
          >
            <video
              controls
              autoPlay
              className="w-full h-full object-contain"
              poster="/moodboard-orikawa.png"
              id="presentation-video"
            >
              {/* Ready to be connected to custom video server */}
              <source src="/orikawa-presentation.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Placeholder overlay if no video src uploaded yet */}
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-6 text-center bg-black/40">
              <div className="w-16 h-16 rounded-full bg-[#29E3BE]/20 border border-[#29E3BE]/50 flex items-center justify-center text-[#29E3BE] mb-3">
                <Play className="w-7 h-7 fill-current ml-1" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-bold lowercase">
                orikawa showreel presentation
              </h3>
              <p className="font-mono text-xs sm:text-sm text-white/70 max-w-md mt-1.5">
                Ready for independent video server stream. Press Esc or click outside to exit.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
