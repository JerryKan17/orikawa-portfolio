import React from 'react';

export const TriangularWaveSeparator: React.FC<{ className?: string }> = ({ className = '' }) => {
  // Pure mathematical regular triangular wave generator
  // period = 100px -> 12 symmetric cycles over 1200px width
  // Extends from x = -25 to x = 1225 to guarantee 100% seamless overlap between segments
  const generateRegularWave = (yMid: number, amp: number) => {
    const period = 100;
    const cycles = 12; // 12 * 100 = 1200

    // Lead-in from x = -25 (coming down from peak to mid)
    const points: string[] = [
      `M -25 ${yMid - amp}`,
      `L 0 ${yMid}`,
    ];

    for (let k = 0; k < cycles; k++) {
      const x0 = k * period;
      const xValley = x0 + 25;
      const xMid2 = x0 + 50;
      const xPeak = x0 + 75;
      const xEnd = (k + 1) * period;
      points.push(`L ${xValley} ${yMid + amp}`);
      points.push(`L ${xMid2} ${yMid}`);
      points.push(`L ${xPeak} ${yMid - amp}`);
      points.push(`L ${xEnd} ${yMid}`);
    }

    // Lead-out to x = 1225 (continuing down to valley)
    points.push(`L 1225 ${yMid + amp}`);

    return points.join(' ');
  };

  // 3 strictly parallel, thick and LINKED (touching) triangular waves based on orikavague.png
  // Center lines spaced by 9px with strokeWidth of 8.5px: virtually touching/linked
  const amp = 26;
  const waveMint = generateRegularWave(51, amp);     // Top Wave: Mint #29E3BE
  const waveSoftBlue = generateRegularWave(60, amp); // Middle Wave: Soft Blue #323A72
  const waveMidnight = generateRegularWave(69, amp); // Bottom Wave: Midnight #131522

  // Helper component to render a single 1200px wave segment
  const WaveSegment = () => (
    <div className="w-[1200px] flex-shrink-0 select-none overflow-visible">
      <svg
        viewBox="0 0 1200 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[1200px] h-16 sm:h-20 md:h-24 block overflow-visible"
      >
        {/* Top Wave: Mint #29E3BE - Thick and linked */}
        <path
          d={waveMint}
          stroke="#29E3BE"
          strokeWidth="8.5"
          strokeLinecap="butt"
          strokeLinejoin="round"
        />
        {/* Middle Wave: Soft Blue #323A72 - Thick and linked */}
        <path
          d={waveSoftBlue}
          stroke="#323A72"
          strokeWidth="8.5"
          strokeLinecap="butt"
          strokeLinejoin="round"
        />
        {/* Bottom Wave: Midnight #131522 - Thick and linked */}
        <path
          d={waveMidnight}
          stroke="#131522"
          strokeWidth="8.5"
          strokeLinecap="butt"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );

  return (
    <div
      className={`w-full overflow-hidden select-none pointer-events-none py-1 sm:py-2 relative bg-white-tech-grid flex items-center justify-center ${className}`}
      aria-hidden="true"
    >
      {/* 100% Seamless Linked Triangular Waves (No background text, pure and crisp) */}
      <div className="animate-triangular-wave flex items-center relative z-10 w-max overflow-visible">
        <WaveSegment />
        <WaveSegment />
        <WaveSegment />
        <WaveSegment />
      </div>
    </div>
  );
};
