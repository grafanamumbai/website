'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type GalleryFigureProps = {
  src: string;
  title: string;
  description: string;
  className?: string;
  ratio: string;
};

// A photo with a caption. If the file is missing (e.g. a photo listed in the JSON but not uploaded yet),
// the whole figure disappears instead of showing a broken image.
export default function GalleryFigure({ src, title, description, className, ratio }: GalleryFigureProps) {
  const [missing, setMissing] = useState(false);
  if (missing) return null;

  return (
    <figure className={className}>
      <div className={cn('relative overflow-hidden rounded-[4px] bg-paper-deep', ratio)}>
        <Image
          src={src}
          alt={`${title}. ${description}`}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
          onError={() => setMissing(true)}
        />
      </div>
      <figcaption className="mt-3 border-t border-ink/20 pt-2">
        <span className="font-display text-lg font-medium tracking-[-0.01em]">{title}</span>
        <span className="label block">{description}</span>
      </figcaption>
    </figure>
  );
}
