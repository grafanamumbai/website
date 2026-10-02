import communityData from '@/data';
import { cn } from '@/lib/utils';
import Chapter from './chapter';

const typeLabel: Record<string, string> = {
  welcome: 'Doors open',
  keynote: 'Keynote',
  talk: 'Talk',
  break: 'Break',
  workshop: 'Demos',
  contest: 'Quiz',
  networking: 'Networking',
};

// Rows that are not a session get quieter text so the talks stand out
const quiet = new Set(['welcome', 'break', 'networking']);

export default function ScheduleSection({ n }: { n?: string }) {
  const { schedule, currentEvent } = communityData;

  return (
    <Chapter
      id="schedule"
      n={n}
      label="Schedule"
      tone="deep"
      title="The day, hour by hour"
      intro={`${currentEvent.date} · ${currentEvent.time} · ${currentEvent.venue.name}`}
    >
      <ol className="border-t border-ink">
        {schedule.map((item, index) => (
          <li
            key={index}
            className="grid gap-2 border-b border-rule py-6 md:grid-cols-[11rem_minmax(0,1fr)_13rem] md:gap-8"
          >
            <p className="font-mono text-[0.8125rem] tabular-nums text-ink-soft md:pt-1.5">{item.time}</p>

            <div>
              <h3
                className={cn(
                  'font-display text-xl font-semibold leading-snug tracking-[-0.01em] sm:text-2xl',
                  quiet.has(item.type) && 'text-ink-soft'
                )}
              >
                {item.title}
              </h3>
              {item.description && <p className="mt-1.5 max-w-[56ch] text-ink-soft">{item.description}</p>}
            </div>

            <p className="md:pt-1.5 md:text-right">
              <span className="label block">{typeLabel[item.type] ?? 'Session'}</span>
              {item.speaker && <span className="text-[0.9375rem]">{item.speaker}</span>}
            </p>
          </li>
        ))}
      </ol>
    </Chapter>
  );
}
