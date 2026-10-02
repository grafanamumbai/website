import Link from 'next/link';
import communityData from '@/data';
import { GrotMascot } from '@/components/icons';
import { socialLabel } from '@/lib/social';

const footLink = 'text-paper/75 transition-colors hover:text-paper hover:underline underline-offset-4';

export default function Footer() {
  const { chapter, socials, currentEvent, mascot } = communityData;

  const explore = [
    { href: '/#about', label: 'About' },
    { href: '/#tracks', label: 'Topics' },
    ...(currentEvent.hasUpcomingEvent ? [{ href: '/#schedule', label: 'Schedule' }] : []),
    { href: '/#gallery', label: 'Photos' },
    { href: '/#mascot', label: 'Grot' },
    { href: '/#team', label: 'Team' },
    { href: '/#faq', label: 'FAQ' },
    { href: '/badge', label: 'Attendee badge' },
    { href: '/join', label: 'All community links' },
  ];

  const elsewhere = (['meetup', 'linkedin', 'twitter', 'instagram', 'slack', 'github'] as const).filter(
    (k) => socials[k]
  );

  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-[1200px] px-5 pb-10 pt-16 sm:px-8 lg:px-10 lg:pt-20">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <p className="max-w-3xl font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-semibold leading-[1] tracking-[-0.025em]">
            {chapter.name}
          </p>
          <div className="flex items-end gap-3">
            <div className="-mb-1 h-24 w-32 shrink-0">
              <GrotMascot variant="smile" className="h-full w-full" animate={false} />
            </div>
            <p className="relative mb-4 max-w-[17rem] rounded-xl rounded-bl-sm bg-paper px-4 py-3 text-[0.9375rem] italic leading-snug text-ink">
              {mascot?.quote || '"May your queries be fast, your dashboards clear, and your latency low!"'}
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-10 border-t border-paper/20 pt-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <p className="max-w-xs text-paper/75">{chapter.description}</p>

          <div>
            <p className="font-mono text-[0.8125rem] text-paper/60">Explore</p>
            <ul className="mt-3 space-y-2">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={footLink}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[0.8125rem] text-paper/60">Elsewhere</p>
            <ul className="mt-3 space-y-2">
              {elsewhere.map((k) => (
                <li key={k}>
                  <a href={socials[k]} target="_blank" rel="noopener noreferrer" className={footLink}>
                    {socialLabel(k)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[0.8125rem] text-paper/60">Write to us</p>
            <ul className="mt-3 space-y-2">
              <li>
                <a href={`mailto:${chapter.email}`} className={footLink}>
                  {chapter.email}
                </a>
              </li>
              <li>
                <a href={socials.cfp} target="_blank" rel="noopener noreferrer" className={footLink}>
                  Send a talk proposal
                </a>
              </li>
              <li>
                <a
                  href="https://grafana.com/events/events-code-of-conduct/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={footLink}
                >
                  Code of conduct
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 space-y-1 border-t border-paper/20 pt-6 text-[0.8125rem] text-paper/60">
          <p>
            Grafana is a registered trademark of Grafana Labs. CNCF and Prometheus are registered trademarks of The Linux Foundation.
          </p>
          <p>Grafana &amp; Friends Mumbai is an independent, volunteer-run community chapter.</p>
        </div>
      </div>
    </footer>
  );
}
