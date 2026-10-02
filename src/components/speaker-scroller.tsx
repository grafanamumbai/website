'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { GrotMascot } from '@/components/icons';
import { cn } from '@/lib/utils';

// Horizontal track that ends in a wall. The cards slide *behind* the wall (z-order), Grot stands in front of it.
// The track's right padding equals the wall width, so the last card can always be scrolled fully into view.
export default function SpeakerScroller({ children, label }: { children: React.ReactNode; label: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    update();
    const el = track.current;
    el?.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el?.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [update]);

  const scrollBy = (dir: -1 | 1) =>
    track.current?.scrollBy({ left: dir * Math.min(440, track.current.clientWidth * 0.8), behavior: 'smooth' });

  const arrow =
    'flex h-10 w-10 items-center justify-center rounded-md border border-ink/60 text-lg transition-[background-color,opacity] hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink';

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="label">Scroll sideways, or use the arrows</p>
        <div className="flex gap-2">
          <button type="button" className={arrow} aria-label="Previous speakers" onClick={() => scrollBy(-1)} disabled={atStart}>
            <span aria-hidden>←</span>
          </button>
          <button type="button" className={arrow} aria-label="Next speakers" onClick={() => scrollBy(1)} disabled={atEnd}>
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>

      <div className="relative">
        <div
          ref={track}
          tabIndex={0}
          role="region"
          aria-label={label}
          className="flex snap-x snap-proximity items-stretch gap-6 overflow-x-auto pb-5 pr-[9rem] sm:pr-[13rem] lg:pr-[16rem]"
        >
          {children}
        </div>

        {/* the wall */}
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute bottom-5 right-0 top-0 z-10 w-[9rem] overflow-hidden rounded-r-xl bg-iris sm:w-[13rem] lg:w-[16rem]',
            'shadow-[-22px_0_32px_-14px_rgba(31,28,61,0.55)]'
          )}
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.09) 1px, transparent 1px)',
            backgroundSize: '100% 2.5rem, 5rem 100%',
          }}
        >
          <p className="p-4 font-mono text-[0.8125rem] leading-snug text-paper/80">
            That&apos;s the line-up so far.
          </p>
        </div>

        {/* Grot stands in front of the wall */}
        <div aria-hidden className="pointer-events-none absolute bottom-5 right-[0.5rem] z-20 h-36 w-44 sm:right-[2.5rem] sm:h-44 sm:w-56 lg:right-[3.5rem] lg:h-52 lg:w-64">
          <GrotMascot variant="smile" className="h-full w-full drop-shadow-[0_14px_14px_rgba(15,12,40,0.5)]" animate={false} />
        </div>
      </div>
    </div>
  );
}
