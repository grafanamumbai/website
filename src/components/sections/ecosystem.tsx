import communityData from '@/data';
import Chapter, { type Tone } from './chapter';

export default function EcosystemSection({ n, tone }: { n?: string; tone?: Tone }) {
  const { tracks, socials } = communityData;

  return (
    <Chapter
      id="tracks"
      n={n}
      tone={tone}
      label="Topics"
      grot="search"
      title="What we talk about"
      intro="Four areas come up at almost every meetup. Pick the one you're fighting with this month."
    >
      <ol className="border-t border-ink">
        {tracks.map((track, i) => (
          // On hover or keyboard focus a row gets a faint lighter surface and a soft shadow, drawn behind the row (::before).
          <li
            key={track.id}
            className="group relative isolate grid gap-5 border-b border-rule py-8 before:absolute before:inset-y-0 before:-inset-x-4 before:-z-10 before:rounded-xl before:bg-white/55 before:opacity-0 before:shadow-[0_6px_16px_-10px_rgba(60,40,10,0.28)] before:transition-opacity before:duration-300 before:content-[''] hover:before:opacity-100 focus-within:before:opacity-100 md:grid-cols-[2.5rem_minmax(0,1.15fr)_minmax(0,1fr)] md:gap-8"
          >
            <span className="font-mono text-[0.8125rem] text-ember">{String.fromCharCode(97 + i)}.</span>

            <div>
              <h3 className="font-display text-2xl font-semibold leading-tight tracking-[-0.01em] sm:text-[1.75rem]">
                {track.title}
              </h3>
              <p className="label mt-1.5">{track.tagline}</p>
              <p className="mt-4 max-w-[52ch] text-ink-soft">{track.description}</p>
            </div>

            <div>
              <ul className="space-y-2">
                {track.highlights.map((h) => (
                  <li key={h} className="flex gap-3">
                    <span aria-hidden className="text-ember">–</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <p className="label mt-5">
                <span className="text-ink">Tools:</span> {track.technologies.join(' · ')}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-10 text-lg">
        Got something for one of these?{' '}
        <a href={socials.cfp} target="_blank" rel="noopener noreferrer" className="link font-medium">
          Send us a talk proposal
        </a>
        .
      </p>
    </Chapter>
  );
}
