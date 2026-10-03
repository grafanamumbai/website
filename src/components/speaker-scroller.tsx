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
        // Stays inside the page container like every other section: cards clip at the content edges on both sides.
        // The scrollbar is hidden; the arrows, touch, trackpad and keyboard scroll.
        className="scrollbar-none flex items-stretch gap-6 overflow-x-auto pb-5"
      >
        {children}
      </div>
    </div>
  );
}
