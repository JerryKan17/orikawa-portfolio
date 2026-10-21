import React, { useEffect, useRef } from 'react';
import { soundEngine } from '../utils/soundEngine';

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
  color: string;
}

export const FluidCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const mouseRef = useRef({ x: -100, y: -100, lastX: -100, lastY: -100, speed: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const colors = [
      'rgba(41, 227, 190, 0.45)', // Mint
      'rgba(50, 58, 114, 0.35)',  // Soft Blue
      'rgba(255, 249, 81, 0.3)',  // Mimosa
    ];

    const addRipple = (x: number, y: number, isStrong = false) => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      ripplesRef.current.push({
        x,
        y,
        radius: 4,
        maxRadius: isStrong ? Math.min(width, height) * 0.4 : 120,
        alpha: isStrong ? 0.8 : 0.4,
        speed: isStrong ? 4.5 : 2.5,
        color,
      });

      // Keep ripple array light
      if (ripplesRef.current.length > 25) {
        ripplesRef.current.shift();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const dx = x - mouseRef.current.lastX;
      const dy = y - mouseRef.current.lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 25) {
        addRipple(x, y, false);
        mouseRef.current.lastX = x;
        mouseRef.current.lastY = y;
      }

      mouseRef.current.x = x;
      mouseRef.current.y = y;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      addRipple(x, y, true);
      soundEngine.playWaterDrop(0.9 + Math.random() * 0.4);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);

    // Initial ambient ripple
    addRipple(width * 0.5, height * 0.45, true);

    let tick = 0;
    const render = () => {
      tick += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Subtle water sheen wave lines
      ctx.lineWidth = 1.2;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        const yOffset = height * (0.3 + i * 0.2);
        for (let x = 0; x <= width; x += 30) {
          const waveY =
            yOffset +
            Math.sin(x * 0.005 + tick + i) * 12 +
            Math.cos(x * 0.01 - tick * 0.8) * 8;
          if (x === 0) ctx.moveTo(x, waveY);
          else ctx.lineTo(x, waveY);
        }
        ctx.strokeStyle = i === 0 ? 'rgba(41, 227, 190, 0.08)' : 'rgba(50, 58, 114, 0.06)';
        ctx.stroke();
      }

      // Render ripples
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const r = ripplesRef.current[i];
        r.radius += r.speed;
        r.alpha *= 0.96;

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = r.color.replace(/[\d.]+\)$/, `${r.alpha})`);
        ctx.lineWidth = Math.max(1, 4 * (1 - r.radius / r.maxRadius));
        ctx.stroke();

        // Secondary ring
        if (r.radius > 20) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius * 0.65, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(50, 58, 114, ${r.alpha * 0.4})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        if (r.alpha < 0.01 || r.radius >= r.maxRadius) {
          ripplesRef.current.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto cursor-crosshair z-0"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
};
