'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import communityData from '@/data';
import { GrotMascot } from '@/components/icons';

export default function JoinPage() {
  const { socials } = communityData;

  const links = [
    { name: 'Meetup group', note: 'Join to RSVP for every in-person and virtual meetup.', tag: 'Start here', href: socials.meetup },
    { name: 'Slack, #grafana-mumbai', note: 'Talk to organisers and other observability engineers.', tag: 'Chat', href: socials.slack },
    { name: 'LinkedIn', note: 'Speaker announcements and event recaps.', tag: 'Updates', href: socials.linkedin },
    { name: 'X, @grafanamumbai', note: 'Live updates during events.', tag: 'Updates', href: socials.twitter },
    { name: 'Instagram, @grafanamumbai', note: 'Behind-the-scenes photos.', tag: 'Photos', href: socials.instagram },
    { name: 'GitHub', note: 'This website and our community code are open source.', tag: 'Code', href: socials.github },
    { name: 'Call for speakers', note: 'Submit a talk proposal for the next meetup.', tag: 'Speak', href: socials.cfp },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main" className="mx-auto w-full max-w-[1200px] flex-1 px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-10">
          <div className="h-24 w-36 lg:h-32 lg:w-44">
            <GrotMascot variant="smile" eager animate={false} className="h-full w-full drop-shadow-[0_12px_14px_rgba(60,40,10,0.3)]" />
          </div>
          <div>
            <p className="label">Community</p>
            <h1 className="mt-2 max-w-3xl text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.025em]">
              Every way to find us
            </h1>
            <p className="mt-5 max-w-[56ch] text-lg text-ink-soft">
              If you only join one, make it the Meetup group. That is where RSVPs open.
            </p>

            <ul className="mt-12 border-t border-ink">
              {links.map((l) => (
                <li key={l.name} className="border-b border-rule">
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid gap-1 py-5 transition-colors hover:bg-paper-deep sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-8 sm:px-3 sm:-mx-3"
                  >
                    <span>
                      <span className="font-display text-xl font-semibold tracking-[-0.01em] group-hover:text-ember sm:text-2xl">
                        {l.name}
                      </span>
                      <span className="mt-0.5 block text-ink-soft">{l.note}</span>
                    </span>
                    <span className="label flex items-center gap-3">
                      {l.tag}
                      <span aria-hidden className="text-lg text-ink transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
