import { GrotMascot } from '@/components/icons';
import { cn } from '@/lib/utils';

export type Tone = 'paper' | 'deep';

// Section backgrounds: cream (paper) and sand (deep). page.tsx alternates them in render order.
const tones: Record<Tone, string> = {
  paper: 'border-t border-rule',
  deep: 'grain bg-paper-deep',
};

type ChapterProps = {
  id: string;
  /** Section number shown in the rail, e.g. "02" */
  n?: string;
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** Grot pose that sits in the left rail (follows you down the section on desktop) */
  grot?: 'hat' | 'smile' | 'search' | 'trophy';
  tone?: Tone;
  /** Render children across the full container width, below the title (for scrollers) */
  wide?: boolean;
  children?: React.ReactNode;
};

// Editorial section shell: narrow rail on the left (number, label, Grot), content on the right.
export default function Chapter({ id, n, label, title, intro, grot, tone = 'paper', wide, children }: ChapterProps) {
  const body = (
    <div className={cn(intro ? 'mt-10 lg:mt-14' : 'mt-8 lg:mt-12')}>{children}</div>
  );

  return (
    <section id={id} className={cn('py-16 sm:py-20 lg:py-28', tones[tone])}>
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10">
        <div className="lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-10">
          <div className="group mb-8 flex items-center justify-between lg:mb-0 lg:block">
            <div className="lg:sticky lg:top-28">
              <p className="label">
                {n && (
                  <>
                    <span className="text-ember">{n}</span>
                    <span className="mx-2 text-ink/25">/</span>
                  </>
                )}
                {label}
              </p>
              {grot && (
                <div aria-hidden className="mt-5 hidden h-28 w-40 lg:block">
                  <div className="h-full w-full origin-bottom motion-safe:group-hover:animate-wiggle">
                    <GrotMascot variant={grot} className="h-full w-full" animate={false} />
                  </div>
                </div>
              )}
            </div>
            {grot && (
              <div aria-hidden className="h-14 w-20 lg:hidden">
                <GrotMascot variant={grot} className="h-full w-full" animate={false} />
              </div>
            )}
          </div>

          <div className="min-w-0">
            <h2 className="max-w-3xl text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.02em]">
              {title}
            </h2>
            {intro && <p className="mt-5 max-w-[62ch] text-lg text-ink-soft">{intro}</p>}
            {!wide && body}
          </div>
        </div>
        {wide && body}
      </div>
    </section>
  );
}
