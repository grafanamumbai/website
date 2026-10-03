'use client';

import { useState } from 'react';
import communityData from '@/data';
import { GrotMascot } from '@/components/icons';
import Chapter, { type Tone } from './chapter';

const poses = ['search', 'hat', 'smile', 'trophy'] as const;

const fallbackTips = [
  {
    id: 'tip-1',
    topic: 'PromQL / Metrics',
    tip: 'Use rate() on counters with a time window at least 4x your scrape interval to avoid noisy spikes caused by missed scrapes.',
  },
  {
    id: 'tip-2',
    topic: 'LogQL / Loki',
    tip: 'Filter high-volume logs with stream selectors first (e.g. {env="prod", app="gateway"}) before running heavy regex or line extraction.',
  },
];

export default function MascotGrotSection({ n, tone }: { n?: string; tone?: Tone }) {
  const { mascot } = communityData;
  const tips = mascot?.tips?.length ? mascot.tips : fallbackTips;
  const [i, setI] = useState(0);
  const tip = tips[i];

  return (
    <Chapter
      id="mascot"
      n={n}
      tone={tone}
      label="Grot"
      grot="smile"
      title="Meet Grot, our mascot"
      intro="Grot is Grafana's dinosaur. According to the lore it slept for 65 million years before waking up to triage dashboards. It has opinions about your queries."
    >
      <div className="grid items-center gap-8 md:grid-cols-[17rem_minmax(0,1fr)] lg:gap-12">
        <div className="mx-auto h-56 w-64 md:h-60 md:w-full">
          <GrotMascot variant={poses[i % poses.length]} className="h-full w-full drop-shadow-[0_14px_16px_rgba(60,40,10,0.3)]" />
        </div>

        <figure className="relative rounded-xl border-2 border-ink bg-[#fffdf8] p-6 sm:p-8">
          {/* speech-bubble tail, pointing at Grot */}
          <span
            aria-hidden
            className="absolute -top-[9px] left-12 h-4 w-4 rotate-45 border-l-2 border-t-2 border-ink bg-[#fffdf8] md:-left-[9px] md:top-14 md:border-b-2 md:border-l-2 md:border-t-0 md:border-r-0 md:[border-top-width:0] md:[border-left-width:2px] md:[border-bottom-width:2px]"
          />
          <figcaption className="label">Grot&apos;s tip · {tip.topic}</figcaption>
          <blockquote className="mt-3 font-display text-xl font-medium leading-snug tracking-[-0.01em] sm:text-2xl" aria-live="polite">
            {tip.tip}
          </blockquote>
          <div className="mt-6 flex items-center justify-between gap-4">
            <span className="label tabular-nums">
              {i + 1} of {tips.length}
            </span>
            <button type="button" onClick={() => setI((i + 1) % tips.length)} className="link font-medium">
              Another tip →
            </button>
          </div>
        </figure>
      </div>

      <p className="mt-10 max-w-[56ch] font-display text-xl italic text-ink-soft">
        {mascot?.quote || '"May your queries be fast, your dashboards clear, and your latency low!"'}
      </p>
    </Chapter>
  );
}
