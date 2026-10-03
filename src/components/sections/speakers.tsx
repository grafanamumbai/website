import communityData, { Speaker } from '@/data';
import PersonPhoto from '@/components/person-photo';
import SpeakerScroller from '@/components/speaker-scroller';
import { socialLabel } from '@/lib/social';
import Chapter, { type Tone } from './chapter';

// Every speaker gets the same card, so a long line-up stays easy to scan.
function SpeakerCard({ speaker }: { speaker: Speaker }) {
  const links = Object.entries(speaker.socials ?? {}).filter(([, url]) => url);

  return (
    <article className="grid w-[min(25rem,80vw)] shrink-0 grid-cols-[6rem_minmax(0,1fr)] content-start gap-5 border-t border-ink pt-6">
      <PersonPhoto
        name={speaker.name}
        avatar={speaker.avatar}
        github={speaker.socials?.github}
        className="w-24"
      />
      <div className="min-w-0">
        <h3 className="font-display text-2xl font-semibold leading-tight tracking-[-0.01em]">{speaker.name}</h3>
        <p className="label mt-1.5">
          {speaker.role}
          {speaker.company ? ` · ${speaker.company}` : ''}
        </p>

        {speaker.topic && (
          <p className="mt-4">
            <span className="label block">Talk</span>
            <span className="font-display text-lg font-medium leading-snug">{speaker.topic}</span>
          </p>
        )}
        {speaker.bio && <p className="mt-3 text-[0.9375rem] text-ink-soft">{speaker.bio}</p>}

        {links.length > 0 && (
          <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[0.9375rem]">
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

export default function SpeakersSection({ n, tone }: { n?: string; tone?: Tone }) {
  const { speakers, socials, currentEvent } = communityData;

  return (
    <Chapter
      id="speakers"
      n={n}
      tone={tone}
      label="Speakers"
      grot="hat"
      wide
      title={currentEvent.hasUpcomingEvent ? "Who's speaking" : 'People who have spoken, and will again'}
      intro="Practitioners sharing what they run, what broke, and what they would do differently."
    >
      {speakers.length > 0 ? (
        <SpeakerScroller label="Speakers">
          {speakers.map((s) => (
            <SpeakerCard key={s.id} speaker={s} />
          ))}
        </SpeakerScroller>
      ) : (
        <p className="border-t border-ink pt-6 text-lg">The line-up is not final yet.</p>
      )}

      <p className="mt-8 text-lg">
        Want to be on this list?{' '}
        <a href={socials.cfp} target="_blank" rel="noopener noreferrer" className="link font-medium">
          Send us a talk proposal
        </a>
        . Lightning demos and first-time speakers are welcome.
      </p>
    </Chapter>
  );
}
