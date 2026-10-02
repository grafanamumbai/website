'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// Horizontal row of speaker cards with previous/next buttons. Also scrolls with touch, trackpad and the keyboard.
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
      <div className="mb-5 flex justify-end gap-2">
        <button type="button" className={arrow} aria-label="Previous speakers" onClick={() => scrollBy(-1)} disabled={atStart}>
          <span aria-hidden>←</span>
        </button>
        <button type="button" className={arrow} aria-label="Next speakers" onClick={() => scrollBy(1)} disabled={atEnd}>
          <span aria-hidden>→</span>
        </button>
      </div>

      <div
        ref={track}
        tabIndex={0}
        role="region"
        aria-label={label}
        // Bleeds to both screen edges so cards slide off either side. The equal padding lines the first card up with the page
        // content at rest (and the last one at the end). No scroll-snap: its percentages resolve against the scroll box, not the
        // parent, which would misalign it. The scrollbar is hidden; arrows, touch and keys scroll.
        className="scrollbar-none -mx-[calc(50vw-50%)] flex items-stretch gap-6 overflow-x-auto px-[calc(50vw-50%)] pb-5"
      >
        {children}
      </div>
    </div>
  );
}
