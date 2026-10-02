import communityData, { Speaker } from '@/data';
import PersonPhoto from '@/components/person-photo';
import { socialLabel } from '@/lib/social';
import { cn } from '@/lib/utils';
import Chapter from './chapter';

function SpeakerEntry({ speaker, lead }: { speaker: Speaker; lead?: boolean }) {
  const links = Object.entries(speaker.socials ?? {}).filter(([, url]) => url);

  return (
    <article
      className={cn(
        'grid gap-5 border-t border-ink pt-6',
        lead ? 'sm:col-span-2 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-8' : 'sm:grid-cols-[7rem_minmax(0,1fr)]'
      )}
    >
      <PersonPhoto
        name={speaker.name}
        avatar={speaker.avatar}
        github={speaker.socials?.github}
        className={lead ? 'w-40 sm:w-full' : 'w-24 sm:w-full'}
      />
      <div>
        <h3
          className={cn(
            'font-display font-semibold leading-tight tracking-[-0.01em]',
            lead ? 'text-3xl sm:text-4xl' : 'text-2xl'
          )}
        >
          {speaker.name}
        </h3>
        <p className="label mt-1.5">
          {speaker.role}
          {speaker.company ? ` · ${speaker.company}` : ''}
        </p>

        {speaker.topic && (
          <p className="mt-5">
            <span className="label block">Talk</span>
            <span className="font-display text-xl font-medium leading-snug">{speaker.topic}</span>
          </p>
        )}
        {speaker.bio && <p className="mt-3 max-w-[54ch] text-ink-soft">{speaker.bio}</p>}

        {links.length > 0 && (
          <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[0.9375rem]">
            {links.map(([key, url]) => (
              <a key={key} href={url as string} target="_blank" rel="noopener noreferrer" className="link">
                {socialLabel(key)}
              </a>
            ))}
          </p>
        )}
      </div>
    </article>
  );
}

export default function SpeakersSection({ n }: { n?: string }) {
  const { speakers, socials, currentEvent } = communityData;
  // the first (featured) speaker leads at full width; the rest sit two per row
  const ordered = [...speakers].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

  return (
    <Chapter
      id="speakers"
      n={n}
      label="Speakers"
      grot="hat"
      title={currentEvent.hasUpcomingEvent ? "Who's speaking" : 'People who have spoken, and will again'}
      intro="Practitioners sharing what they run, what broke, and what they would do differently."
    >
      {ordered.length > 0 ? (
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {ordered.map((s, i) => (
            <SpeakerEntry key={s.id} speaker={s} lead={i === 0} />
          ))}
        </div>
      ) : (
        <p className="border-t border-ink pt-6 text-lg">The line-up is not final yet.</p>
      )}

      <p className="mt-14 text-lg">
        Want to be on this list?{' '}
        <a href={socials.cfp} target="_blank" rel="noopener noreferrer" className="link font-medium">
          Send us a talk proposal
        </a>
        . Lightning demos and first-time speakers are welcome.
      </p>
    </Chapter>
  );
}
