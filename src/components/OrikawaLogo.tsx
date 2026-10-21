import React from 'react';

interface OrikawaLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const OrikawaLogo: React.FC<OrikawaLogoProps> = ({
  size = 'md',
  className = '',
}) => {
  const isLarge = size === 'lg';
  const isSmall = size === 'sm';

  return (
    <div
      className={`group inline-flex items-center gap-2 select-none ${className}`}
      title="Logo placeholder - remplacez /logo.png par votre export PNG"
    >
      {/* Check for logo.png or render clean placeholder badge */}
      <div
        className={`flex items-center justify-center border border-dashed border-[#323A72]/50 bg-[#fffdf7] px-3 py-1.5 rounded transition-all duration-300 group-hover:border-[#323A72] ${
          isLarge ? 'h-14 px-6' : isSmall ? 'h-8 px-2.5' : 'h-10 px-3.5'
        }`}
      >
        <div className="flex items-baseline gap-1.5 font-serif text-[#131522] lowercase tracking-tight">
          <span className={`font-bold ${isLarge ? 'text-2xl' : isSmall ? 'text-sm' : 'text-base'}`}>
            orikawa
          </span>
          <span className={`italic text-[#323A72] ${isLarge ? 'text-lg' : isSmall ? 'text-xs' : 'text-xs'}`}>
            laurentin
          </span>
        </div>
        <span className="ml-2 text-[9px] font-mono text-[#323A72]/60 hidden sm:inline">
          [logo.png]
        </span>
      </div>
    </div>
  );
};
