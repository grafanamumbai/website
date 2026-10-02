'use client';

import { useId, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type TopicCardProps = {
  letter: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  tools: string[];
  /** Tailwind background class for the resting card */
  tint: string;
};

// Resting card shows the headline; a dark popup with the detail opens on mouse hover, keyboard focus, or tap.
// The popup text stays in the DOM so screen readers get it either way.
export default function TopicCard({ letter, title, tagline, description, highlights, tools, tint }: TopicCardProps) {
  const [open, setOpen] = useState(false);
  const lastPointer = useRef<string>('');
  const panelId = useId();

  return (
    <article
      className="relative"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onPointerDown={(e) => (lastPointer.current = e.pointerType)}
        onClick={() => {
          // with a mouse, hover already decides; touch and keyboard toggle
          if (lastPointer.current !== 'mouse') setOpen((o) => !o);
          lastPointer.current = '';
        }}
        onFocus={(e) => e.currentTarget.matches(':focus-visible') && setOpen(true)}
        onBlur={() => setOpen(false)}
        className={cn(
          'flex min-h-[19rem] w-full flex-col justify-between rounded-[22px] p-6 text-left transition-[transform,box-shadow] duration-200 sm:min-h-[21rem] sm:p-8',
          'hover:-translate-y-1 hover:shadow-[0_18px_28px_-18px_rgba(31,28,61,0.5)]',
          tint
        )}
      >
        <span>
          <span className="font-mono text-[0.8125rem] text-ember">{letter}.</span>
          <h3 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-[-0.01em] sm:text-[1.75rem]">{title}</h3>
          <span className="label mt-2 block text-ink-soft">{tagline}</span>
        </span>
        <span className="flex items-center gap-2 text-[0.9375rem] font-semibold">
          <span aria-hidden className="flex h-6 w-6 items-center justify-center rounded-full border border-ink/60 text-base leading-none">
            +
          </span>
          Details
        </span>
      </button>

      <div
        id={panelId}
        onClick={() => setOpen(false)}
        className={cn(
          'absolute -inset-2 z-20 flex flex-col overflow-hidden rounded-[26px] bg-night p-6 text-paper sm:p-8',
          'shadow-[0_28px_44px_-18px_rgba(31,28,61,0.7)] transition-[opacity,transform] duration-200 ease-out',
          open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
        )}
      >
        <p className="font-display text-xl font-semibold leading-snug">{title}</p>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-paper/85">{description}</p>
        <ul className="mt-4 space-y-1.5 text-[0.9375rem]">
          {highlights.map((h) => (
            <li key={h} className="flex gap-2.5">
              <span aria-hidden className="text-brand">–</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
        <p className="mt-auto pt-4 font-mono text-[0.8125rem] leading-snug text-paper/70">
          Tools: {tools.join(' · ')}
        </p>
      </div>
    </article>
  );
}
