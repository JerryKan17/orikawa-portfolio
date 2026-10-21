import React, { useState, useEffect, useRef } from 'react';
import { Activity } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export const InteractiveVUMeter: React.FC = () => {
  const [needleAngle, setNeedleAngle] = useState(-38); // -45 to +45 deg
  const [driveLevel, setDriveLevel] = useState(45);
  const [resonance, setResonance] = useState(60);
  const [activePreset, setActivePreset] = useState<'dsp' | 'harmonic' | 'transient'>('dsp');
  const [peakLed, setPeakLed] = useState(false);

  const targetAngleRef = useRef(-38);
  const currentAngleRef = useRef(-38);
  const velocityRef = useRef(0);

  // Smooth spring physics loop for the needle
  useEffect(() => {
    let animId: number;
    const springK = 0.12;
    const damping = 0.78;

    const loop = () => {
      // Add natural gentle analog drift
      const baseJitter = (Math.sin(Date.now() * 0.006) * 1.5 + Math.cos(Date.now() * 0.011) * 1.2);
      const target = targetAngleRef.current + baseJitter;

      const force = (target - currentAngleRef.current) * springK;
      velocityRef.current = velocityRef.current * damping + force;
      currentAngleRef.current += velocityRef.current;

      setNeedleAngle(currentAngleRef.current);

      // Light up PEAK LED when reaching +1 dB
      setPeakLed(currentAngleRef.current > 20);

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Set target angle according to drive level & presets
  useEffect(() => {
    const baseAngle = -42 + (driveLevel / 100) * 75;
    targetAngleRef.current = Math.min(38, Math.max(-44, baseAngle));
  }, [driveLevel]);

  // Audio test trigger
  const triggerAudioSpike = () => {
    soundEngine.playMusicalStinger(Math.floor(Math.random() * 5));
    velocityRef.current = 28;
    setPeakLed(true);
  };

  const handleDriveChange = (val: number) => {
    setDriveLevel(val);
    soundEngine.playKnobTick(0.8 + (val / 100) * 0.8);
  };

  const handleResonanceChange = (val: number) => {
    setResonance(val);
    soundEngine.playKnobTick(1.0 + (val / 100) * 0.6);
  };

  return (
    <div
      className="relative max-w-md w-full mx-auto bg-[#181a28] p-5 rounded-2xl shadow-2xl border-2 border-[#323A72]/40 select-none group"
    >
      {/* Masking tape on top corner with handwritten note */}
      <div className="masking-tape -top-3.5 left-8 w-28 h-6 rotate-[-2deg] text-center flex items-center justify-center pointer-events-none">
        <span className="font-handwriting text-xs text-[#131522] font-semibold tracking-wide">
          * Calibrated: 96kHz
        </span>
      </div>

      {/* Header bar */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#29E3BE] animate-ping" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#29E3BE]">
            DSP_METER_MKII // TRUE_RMS
          </span>
        </div>

        {/* Peak LED indicator */}
        <div className="flex items-center gap-1.5">
          <div
            className={`w-2.5 h-2.5 rounded-full transition-colors duration-150 ${
              peakLed ? 'bg-[#E019D7] shadow-[0_0_10px_#E019D7]' : 'bg-[#E019D7]/20'
            }`}
          />
          <span className="font-mono text-[9px] uppercase tracking-widest text-white/50">
            PEAK +3dB
          </span>
        </div>
      </div>

      {/* Analog VU Display Box */}
      <div
        onClick={triggerAudioSpike}
        className="cursor-pointer relative w-full aspect-[16/10] bg-[#fff6d6] rounded-lg border-4 border-[#131522] shadow-[inset_0_4px_12px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col justify-between p-4"
        title="Click to trigger audio impulse response"
      >
        {/* Vintage meter background scale and arc */}
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-start pt-2">
          {/* Calibrated dB markers */}
          <div className="w-[85%] flex justify-between text-[9px] font-mono font-bold text-[#131522]/80 pt-1 tracking-tight">
            <span>-20</span>
            <span>-10</span>
            <span>-7</span>
            <span>-5</span>
            <span>-3</span>
            <span>-1</span>
            <span className="text-[#323A72]">0</span>
            <span className="text-[#E019D7]">+1</span>
            <span className="text-[#E019D7]">+2</span>
            <span className="text-[#E019D7]">+3</span>
          </div>

          {/* Curved scale line SVG */}
          <svg className="w-[90%] h-12 mt-0.5 overflow-visible" viewBox="0 0 200 40">
            <path
              d="M 10 35 Q 100 5 190 35"
              fill="none"
              stroke="#131522"
              strokeWidth="1.5"
            />
            {/* Red zone */}
            <path
              d="M 148 18 Q 170 25 190 35"
              fill="none"
              stroke="#E019D7"
              strokeWidth="2.5"
            />
          </svg>

          {/* Central VU Brand typography */}
          <div className="text-center mt-[-4px]">
            <span className="font-serif font-black text-2xl tracking-widest text-[#131522]">
              VU
            </span>
            <div className="text-[8px] font-mono tracking-widest text-[#323A72] uppercase">
              Orikawa Audio Labs
            </div>
          </div>
        </div>

        {/* Vintage needle */}
        <div
          className="absolute left-1/2 bottom-[-18px] w-0.5 h-36 bg-[#131522] origin-bottom shadow-sm transition-transform ease-out pointer-events-none z-10"
          style={{
            transform: `translateX(-50%) rotate(${needleAngle}deg)`,
          }}
        >
          {/* Needle red tip */}
          <div className="w-1.5 h-8 bg-[#E019D7] -ml-0.5" />
        </div>

        {/* Pivot screw */}
        <div className="absolute left-1/2 bottom-[-8px] -translate-x-1/2 w-6 h-6 rounded-full bg-[#131522] border-2 border-[#fff6d6] z-20 shadow-md flex items-center justify-center">
          <div className="w-2 h-0.5 bg-white/70" />
        </div>

        {/* Subtle click prompt badge */}
        <div className="mt-auto z-20 flex justify-between items-center text-[10px] font-mono text-[#323A72]/70">
          <span className="flex items-center gap-1">
            <Activity className="w-3 h-3 text-[#29E3BE]" />
            TAP TO TEST
          </span>
          <span className="font-handwriting text-sm text-[#131522]">* click meter</span>
        </div>
      </div>

      {/* Interactive Controls & Knobs */}
      <div className="mt-5 grid grid-cols-2 gap-4">
        {/* Drive Knob */}
        <div className="bg-[#131522]/80 p-3 rounded-lg border border-white/5">
          <div className="flex justify-between items-center text-[10px] font-mono text-white/70 mb-2">
            <span>INPUT GAIN</span>
            <span className="text-[#29E3BE] font-bold">{driveLevel}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={driveLevel}
            onChange={(e) => handleDriveChange(Number(e.target.value))}
            className="w-full accent-[#29E3BE] h-1.5 bg-white/10 rounded-lg cursor-pointer"
          />
        </div>

        {/* Resonance Knob */}
        <div className="bg-[#131522]/80 p-3 rounded-lg border border-white/5">
          <div className="flex justify-between items-center text-[10px] font-mono text-white/70 mb-2">
            <span>Q / RESONANCE</span>
            <span className="text-[#FFF951] font-bold">{resonance}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={resonance}
            onChange={(e) => handleResonanceChange(Number(e.target.value))}
            className="w-full accent-[#FFF951] h-1.5 bg-white/10 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Preset Filter Buttons */}
      <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-white/5">
        <span className="text-[10px] font-mono text-white/40">MODE:</span>
        <div className="flex gap-1.5 flex-1 justify-end">
          {(['dsp', 'harmonic', 'transient'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => {
                setActivePreset(mode);
                soundEngine.playTapeClick(700, 0.02);
                if (mode === 'transient') targetAngleRef.current = 22;
                if (mode === 'harmonic') targetAngleRef.current = -5;
                if (mode === 'dsp') targetAngleRef.current = -25;
              }}
              className={`text-[9px] font-mono uppercase px-2.5 py-1 rounded transition-colors ${
                activePreset === mode
                  ? 'bg-[#29E3BE] text-[#131522] font-bold'
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
