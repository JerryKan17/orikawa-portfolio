import React from 'react';
import { soundEngine } from '../utils/soundEngine';

interface OrikawaLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const OrikawaLogo: React.FC<OrikawaLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
}) => {
  const isLarge = size === 'lg';
  const isSmall = size === 'sm';

  const handleMouseEnter = () => {
    soundEngine.playKnobTick(1.2);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      className={`group cursor-pointer inline-flex flex-col select-none transition-transform duration-300 hover:scale-[1.02] ${className}`}
    >
      <div className="flex items-baseline gap-2">
        <span
          className={`font-serif font-bold tracking-tight text-[#131522] leading-none ${
            isLarge
              ? 'text-6xl md:text-8xl'
              : isSmall
              ? 'text-2xl'
              : 'text-3xl md:text-4xl'
          }`}
        >
          orikawa
        </span>
        {showSubtitle && (
          <span
            className={`font-serif italic text-[#323A72] font-medium leading-none ${
              isLarge
                ? 'text-2xl md:text-3xl'
                : isSmall
                ? 'text-xs'
                : 'text-sm md:text-base'
            }`}
          >
            laurentin
          </span>
        )}
      </div>

      {/* Brand 3-Layer Chevron / Sound Wave */}
      <div
        className={`w-full overflow-visible mt-1 transition-all duration-300 group-hover:translate-x-1 ${
          isLarge ? 'h-5' : isSmall ? 'h-2.5' : 'h-3.5'
        }`}
      >
        <svg
          viewBox="0 0 160 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full preserve-3d"
        >
          {/* Mint Wave */}
          <path
            d="M2 7 L28 17 L68 3 L110 17 L158 5"
            stroke="#29E3BE"
            strokeWidth={isLarge ? '3.5' : '2.5'}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-500 group-hover:stroke-[#29E3BE] group-hover:translate-y-[-1px]"
          />
          {/* Soft Blue Wave */}
          <path
            d="M2 12 L28 22 L68 8 L110 22 L158 10"
            stroke="#323A72"
            strokeWidth={isLarge ? '3.5' : '2.5'}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-500 delay-75 group-hover:stroke-[#323A72]"
          />
          {/* Midnight Blue Wave */}
          <path
            d="M2 17 L28 27 L68 13 L110 27 L158 15"
            stroke="#131522"
            strokeWidth={isLarge ? '3.5' : '2.5'}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-500 delay-150 group-hover:stroke-[#131522] group-hover:translate-y-[1px]"
          />
        </svg>
      </div>
    </div>
  );
};
