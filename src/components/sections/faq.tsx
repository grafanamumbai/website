import communityData from '@/data';
import Chapter, { type Tone } from './chapter';

// Every answer is visible at once: only 6 questions, so an accordion would just hide them.
export default function FaqSection({ n, tone }: { n?: string; tone?: Tone }) {
  const { faqs, chapter } = communityData;

  return (
    <Chapter id="faq" n={n}
      tone={tone} label="FAQ" grot="search" title="Questions people ask">
      <dl className="grid gap-x-12 gap-y-10 md:grid-cols-2">
        {faqs.map((faq) => (
          <div key={faq.question} className="border-t border-ink pt-5">
            <dt className="font-display text-xl font-semibold leading-snug tracking-[-0.01em]">{faq.question}</dt>
            <dd className="mt-2.5 text-ink-soft">{faq.answer}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-14 text-lg">
        Something else?{' '}
        <a href={`mailto:${chapter.email}`} className="link font-medium">
          {chapter.email}
        </a>{' '}
        gets to the organisers.
      </p>
    </Chapter>
  );
}
