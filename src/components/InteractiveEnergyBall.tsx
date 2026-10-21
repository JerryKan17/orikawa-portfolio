import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

export const InteractiveEnergyBall: React.FC = () => {
  const [isHolding, setIsHolding] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [chargeLevel, setChargeLevel] = useState(0); // 0 to 1
  const [isClimax, setIsClimax] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const holdStartTimeRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Climax screen shake effect on document body
  useEffect(() => {
    if (isClimax) {
      document.body.classList.add('shake-active');
    } else {
      document.body.classList.remove('shake-active');
    }
    return () => {
      document.body.classList.remove('shake-active');
    };
  }, [isClimax]);

  // Handle Hold Start / End
  const startHold = () => {
    setIsHolding(true);
    holdStartTimeRef.current = Date.now();
  };

  const endHold = () => {
    setIsHolding(false);
    setIsClimax(false);
    setChargeLevel(0);
    holdStartTimeRef.current = null;
  };

  // Canvas drawing loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    const size = 320;
    canvas.width = size;
    canvas.height = size;
    const cx = size / 2;
    const cy = size / 2;

    const render = () => {
      time += isHolding ? 0.08 : 0.025;

      // Charge progression calculation
      let currentCharge = 0;
      if (holdStartTimeRef.current) {
        const elapsed = (Date.now() - holdStartTimeRef.current) / 1000;
        currentCharge = Math.min(1, elapsed / 1.8);
        setChargeLevel(currentCharge);

        if (currentCharge >= 1 && !isClimax) {
          setIsClimax(true);
        }
      }

      ctx.clearRect(0, 0, size, size);

      // Base radius
      const baseRadius = 60 + (isHovered ? 6 : 0) + (isHolding ? currentCharge * 22 : 0);

      // 1. Aura glow background
      if (isHolding) {
        const auraGradient = ctx.createRadialGradient(cx, cy, baseRadius * 0.4, cx, cy, baseRadius * 2.2);
        if (currentCharge >= 1) {
          auraGradient.addColorStop(0, 'rgba(224, 25, 215, 0.45)');
          auraGradient.addColorStop(0.4, 'rgba(41, 227, 190, 0.35)');
          auraGradient.addColorStop(0.8, 'rgba(255, 249, 81, 0.25)');
          auraGradient.addColorStop(1, 'rgba(255, 247, 221, 0)');
        } else {
          auraGradient.addColorStop(0, 'rgba(41, 227, 190, 0.3)');
          auraGradient.addColorStop(0.5, 'rgba(50, 58, 114, 0.2)');
          auraGradient.addColorStop(1, 'rgba(255, 247, 221, 0)');
        }
        ctx.fillStyle = auraGradient;
        ctx.beginPath();
        ctx.arc(cx, cy, baseRadius * 2.2, 0, Math.PI * 2);
        ctx.fill();

        // Radiating energy sparks when holding
        const sparkCount = currentCharge >= 1 ? 16 : 8;
        for (let i = 0; i < sparkCount; i++) {
          const angle = (i / sparkCount) * Math.PI * 2 + time * 1.5;
          const dist = baseRadius * 1.3 + Math.sin(time * 3 + i) * 20 * currentCharge;
          const sx = cx + Math.cos(angle) * dist;
          const sy = cy + Math.sin(angle) * dist;
          ctx.beginPath();
          ctx.arc(sx, sy, 2 + Math.random() * 2, 0, Math.PI * 2);
          ctx.fillStyle = i % 2 === 0 ? '#29E3BE' : '#FFF951';
          ctx.fill();
        }
      }

      // 2. Liquid organic energy ball path (idle water distortion + energetic turbulence)
      const numPoints = 64;
      ctx.beginPath();

      for (let i = 0; i <= numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;

        // Fluid distortion waves
        const wave1 = Math.sin(angle * 3 + time * 2) * (isHolding ? 14 : 5);
        const wave2 = Math.cos(angle * 5 - time * 3) * (isHolding ? 10 : 3);
        const wave3 = isHolding ? Math.sin(angle * 8 + time * 6) * (6 * currentCharge) : 0;

        const r = baseRadius + wave1 + wave2 + wave3;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();

      // Ball Gradient Colors
      const ballGrad = ctx.createRadialGradient(
        cx - baseRadius * 0.3,
        cy - baseRadius * 0.3,
        baseRadius * 0.1,
        cx,
        cy,
        baseRadius * 1.1
      );

      if (isHolding) {
        // High vibrancy colors when holding
        if (currentCharge >= 1) {
          // Climax colors: Mint, Fuchsia, Mimosa, Midnight
          ballGrad.addColorStop(0, '#FFF951');
          ballGrad.addColorStop(0.3, '#29E3BE');
          ballGrad.addColorStop(0.7, '#E019D7');
          ballGrad.addColorStop(1, '#131522');
        } else {
          // Charging up
          ballGrad.addColorStop(0, '#ffffff');
          ballGrad.addColorStop(0.2, '#29E3BE');
          ballGrad.addColorStop(0.6, '#323A72');
          ballGrad.addColorStop(1, '#131522');
        }
      } else {
        // Idle organic water ball (clean, gentle soft blue & cream water sheen)
        ballGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        ballGrad.addColorStop(0.3, isHovered ? 'rgba(41, 227, 190, 0.4)' : 'rgba(50, 58, 114, 0.25)');
        ballGrad.addColorStop(0.75, 'rgba(50, 58, 114, 0.55)');
        ballGrad.addColorStop(1, 'rgba(19, 21, 34, 0.85)');
      }

      ctx.fillStyle = ballGrad;
      ctx.fill();

      // Delicate outline
      ctx.strokeStyle = isHolding
        ? (currentCharge >= 1 ? '#FFF951' : '#29E3BE')
        : (isHovered ? '#29E3BE' : 'rgba(50, 58, 114, 0.4)');
      ctx.lineWidth = isHolding ? 2.5 : 1.5;
      ctx.stroke();

      // 3. Inner fluid light reflections
      ctx.beginPath();
      const innerRadius = baseRadius * 0.55;
      for (let i = 0; i <= 32; i++) {
        const angle = (i / 32) * Math.PI * 2;
        const offset = Math.sin(angle * 2 + time * 1.5) * 3;
        const ix = cx - baseRadius * 0.15 + Math.cos(angle) * (innerRadius + offset);
        const iy = cy - baseRadius * 0.15 + Math.sin(angle) * (innerRadius + offset);
        if (i === 0) ctx.moveTo(ix, iy);
        else ctx.lineTo(ix, iy);
      }
      ctx.closePath();
      ctx.fillStyle = isHolding
        ? 'rgba(255, 255, 255, 0.65)'
        : 'rgba(255, 255, 255, 0.25)';
      ctx.fill();

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isHolding, isHovered, isClimax]);

  return (
    <div className="flex flex-col items-center justify-center select-none my-6">
      
      {/* Arrow & "hold" prompt */}
      <div
        className={`flex flex-col items-center transition-all duration-300 pointer-events-none mb-1 ${
          isHolding ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
        }`}
      >
        <span className="font-handwriting text-2xl md:text-3xl text-[#323A72] font-semibold lowercase tracking-wide">
          maintenir
        </span>
        <ArrowDown className="w-5 h-5 text-[#323A72] animate-bounce -mt-0.5" />
      </div>

      {/* Energy Ball Interactive Trigger */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          if (isHolding) endHold();
        }}
        onMouseDown={startHold}
        onMouseUp={endHold}
        onTouchStart={startHold}
        onTouchEnd={endHold}
        onTouchCancel={endHold}
        className="relative cursor-pointer touch-none active:scale-95 transition-transform duration-150 flex items-center justify-center"
        title="Maintenez appuyé pour charger l'énergie"
      >
        {/* Canvas Render */}
        <canvas
          ref={canvasRef}
          className="w-64 h-64 sm:w-72 sm:h-72 drop-shadow-xl"
        />

        {/* Climax Pulse Ring */}
        {isClimax && (
          <div className="absolute inset-0 rounded-full border-4 border-[#29E3BE] animate-ping pointer-events-none opacity-75" />
        )}

        {/* Charge progress ring */}
        {isHolding && chargeLevel < 1 && (
          <div
            className="absolute inset-4 rounded-full border-2 border-dashed border-[#29E3BE] pointer-events-none animate-spin"
            style={{ animationDuration: '3s' }}
          />
        )}
      </div>

      {/* Climax status badge */}
      <div className="h-6 mt-1 flex items-center justify-center">
        {isClimax ? (
          <span className="text-xs font-mono font-bold text-[#E019D7] bg-[#131522] px-3 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
            climax actif
          </span>
        ) : isHolding ? (
          <span className="text-xs font-mono text-[#323A72] tracking-wider lowercase">
            charge: {Math.round(chargeLevel * 100)}%
          </span>
        ) : (
          <span className="text-[11px] font-mono text-[#323A72]/60 tracking-wider lowercase">
            [cliquer et maintenir]
          </span>
        )}
      </div>

    </div>
  );
};
