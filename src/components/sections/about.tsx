import communityData from '@/data';
import Chapter, { type Tone } from './chapter';

const things = [
  {
    title: 'Learn',
    text: 'Talks and demos on the LGTM stack (Loki, Grafana, Tempo, Mimir), Prometheus and OpenTelemetry, with enough detail to use on Monday.',
  },
  {
    title: 'Meet people',
    text: 'SREs, platform engineers and developers from across Mumbai. The hallway track is where most of the useful answers turn up.',
  },
  {
    title: 'Show your work',
    text: 'Bring a dashboard, a plugin, an eBPF experiment or an incident story. Lightning talks and demos are open to everyone.',
  },
];

export default function AboutSection({ n, tone }: { n?: string; tone?: Tone }) {
  const { chapter } = communityData;

  return (
    <Chapter
      id="about"
      n={n}
      tone={tone}
      label="About"
      grot="smile"
      title="Run by volunteers. Open to anyone."
      intro={chapter.description}
    >
      <ol className="border-t border-ink">
        {things.map((t, i) => (
          <li
            key={t.title}
            className="grid gap-2 border-b border-rule py-7 md:grid-cols-[3.5rem_13rem_minmax(0,1fr)] md:gap-8"
          >
            <span className="font-mono text-[0.8125rem] text-ember">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="font-display text-2xl font-semibold tracking-[-0.01em]">{t.title}</h3>
            <p className="max-w-[56ch] text-ink-soft">{t.text}</p>
          </li>
        ))}
      </ol>
    </Chapter>
  );
}
