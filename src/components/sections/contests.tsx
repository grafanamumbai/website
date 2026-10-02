import communityData from '@/data';
import Chapter from './chapter';

export default function ContestsSection({ n }: { n?: string }) {
  const { contests, currentEvent } = communityData;

  return (
    <Chapter
      id="contests"
      n={n}
      label="Contests"
      grot="trophy"
      title="Two ways to win swag"
      intro="Both run before and during the meetup. Winners are announced on stage."
    >
      <div className="grid gap-x-12 gap-y-14 md:grid-cols-2">
        {contests.map((contest) => (
          <article key={contest.id} className="border-t border-ink pt-6">
            <h3 className="font-display text-3xl font-semibold leading-tight tracking-[-0.01em]">{contest.title}</h3>
            <p className="mt-3 max-w-[44ch] text-ink-soft">{contest.description}</p>
            <ol className="mt-6">
              {contest.rules.map((rule, i) => (
                <li key={i} className="grid grid-cols-[2rem_1fr] gap-3 border-t border-rule py-3.5">
                  <span className="font-mono text-[0.8125rem] text-ember">{i + 1}</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>

      <div className="mt-14">
        <a href={currentEvent.registration.rsvpUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ink">
          Register to enter <span aria-hidden>→</span>
        </a>
      </div>
    </Chapter>
  );
}
