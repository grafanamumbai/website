'use client';

import { useState } from 'react';
import communityData from '@/data';
import { driveThumb, socialLabel } from '@/lib/social';
import Chapter from './chapter';

// Logo on a light tile; falls back to the first letter if the image is missing or fails.
function Logo({ name, src, size }: { name: string; src?: string; size: string }) {
  const [failed, setFailed] = useState(false);
  const url = driveThumb(src);
  return (
    <div className={`flex shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-rule bg-[#fffdf8] ${size}`}>
      {url && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt={`${name} logo`}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className="h-full w-full object-contain p-1.5"
        />
      ) : (
        <span className="font-display text-xl font-semibold text-ember">{name.charAt(0)}</span>
      )}
    </div>
  );
}

type Linkable = { url?: string; linktree?: string; socials?: Record<string, string | undefined> };

function LinkRow({ item }: { item: Linkable }) {
  const links: [string, string][] = [];
  if (item.url) links.push(['Website', item.url]);
  if (item.linktree) links.push(['Linktree', item.linktree]);
  Object.entries(item.socials ?? {}).forEach(([k, u]) => {
    // the website is already listed first
    if (u && u !== item.url && !/^website|web$/i.test(k)) links.push([socialLabel(k), u]);
  });
  return (
    <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[0.9375rem]">
      {links.map(([label, url]) => (
        <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="link">
          {label}
        </a>
      ))}
    </p>
  );
}

export default function SponsorsSection({ n }: { n?: string }) {
  const { sponsors, swags, chapter, currentEvent } = communityData;
  const allPartners = [...(currentEvent.communityPartners || []), ...(currentEvent.collaborationPartners || [])];

  return (
    <Chapter
      id="sponsors"
      n={n}
      label="Partners"
      grot="smile"
      title="Who makes this possible"
      intro="Venues, food and swag come from Grafana Labs and the community groups and companies below."
    >
      {sponsors.map((s) => (
        <article key={s.id} className="flex flex-col gap-5 border-t border-ink pt-6 sm:flex-row sm:gap-8">
          <Logo name={s.name} src={s.logo} size="h-20 w-36" />
          <div>
            <p className="label">{s.tier}</p>
            <h3 className="font-display text-2xl font-semibold tracking-[-0.01em]">{s.name}</h3>
            <p className="mt-2 max-w-[56ch] text-ink-soft">{s.description}</p>
            <LinkRow item={s} />
          </div>
        </article>
      ))}

      {allPartners.length > 0 && (
        <div className="mt-14">
          <h3 className="font-display text-2xl font-semibold tracking-[-0.01em]">Community and collaboration partners</h3>
          <ul className="mt-5 border-t border-ink">
            {allPartners.map((p) => (
              <li key={p.id} className="grid gap-4 border-b border-rule py-6 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-6">
                <Logo name={p.name} src={p.logo} size="h-14 w-14" />
                <div>
                  <p className="flex flex-wrap items-baseline gap-x-3">
                    <span className="font-display text-xl font-semibold tracking-[-0.01em]">{p.name}</span>
                    <span className="label">{p.type}</span>
                  </p>
                  {p.description && <p className="mt-1.5 max-w-[60ch] text-ink-soft">{p.description}</p>}
                  <LinkRow item={p} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {swags.length > 0 && (
        <div className="mt-14">
          <h3 className="font-display text-2xl font-semibold tracking-[-0.01em]">What you can take home</h3>
          <ul className="mt-5 grid gap-x-10 gap-y-6 border-t border-ink pt-6 sm:grid-cols-3">
            {swags.map((s) => (
              <li key={s.id}>
                <p className="font-display text-lg font-semibold leading-snug">{s.name}</p>
                <p className="mt-1.5 text-[0.9375rem] text-ink-soft">{s.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-14 text-lg">
        Can you host, feed or sponsor a meetup in Mumbai?{' '}
        <a href={`mailto:${chapter.email}`} className="link font-medium">
          Email the organisers
        </a>
        .
      </p>
    </Chapter>
  );
}
