'use client';

import Image from 'next/image';

interface GrotMascotProps {
  className?: string;
  variant?: 'hat' | 'smile' | 'search' | 'trophy';
  animate?: boolean;
}

const variantMap: Record<string, { src: string; alt: string }> = {
  hat: {
    src: '/mascot/grot-hat.png',
    alt: 'Official Grafana Grot Mascot with Explorer Hat',
  },
  smile: {
    src: '/mascot/grot-smile.png',
    alt: 'Official Grafana Grot Mascot Smiling',
  },
  search: {
    src: '/mascot/grot-search.png',
    alt: 'Official Grafana Grot Mascot Investigating Dashboards',
  },
  trophy: {
    src: '/mascot/golden-grot-awards.png',
    alt: 'Official Golden Grot Award Trophy',
  },
};

export function GrotMascot({
  className = 'w-24 h-24',
  variant = 'hat',
  animate = true,
}: GrotMascotProps) {
  const selected = variantMap[variant] || variantMap.hat;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={selected.src}
        alt={selected.alt}
        className={`h-full w-full object-contain ${
          animate ? 'transition-transform duration-500 hover:scale-105' : ''
        }`}
        loading="lazy"
      />
    </div>
  );
}

export default GrotMascot;
