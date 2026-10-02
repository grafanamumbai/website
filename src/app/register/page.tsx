'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ScheduleSection from '@/components/sections/schedule';
import communityData from '@/data';
import { GrotMascot } from '@/components/icons';

export default function RegisterPage() {
  const { currentEvent } = communityData;

  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    if (!currentEvent.targetDateISO) return;
    const target = new Date(currentEvent.targetDateISO).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24).toString().padStart(2, '0'),
          minutes: Math.floor((diff / 1000 / 60) % 60).toString().padStart(2, '0'),
          seconds: Math.floor((diff / 1000) % 60).toString().padStart(2, '0'),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [currentEvent.targetDateISO]);

  const perks = [
    { title: 'Free entry and refreshments', text: 'Nothing to pay. Coffee, snacks and high tea are on us.' },
    { title: 'Grafana and Grot swag', text: 'Stickers, tees and collectibles for quiz winners and active participants.' },
    { title: 'The hallway track', text: 'Time to talk with SREs, DevOps engineers, speakers and Grafana community leads.' },
    { title: 'Demos with real dashboards', text: 'Live setups and practical takeaways you can try on your own stack.' },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main id="main" className="flex-1">
        <section className="mx-auto max-w-[1200px] px-5 pb-16 pt-14 sm:px-8 sm:pt-20 lg:px-10">
          <p className="label">
            {currentEvent.registration.statusText || 'Registration'} · free to attend
          </p>
          <h1 className="mt-3 max-w-4xl text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
            Register for {currentEvent.title}
          </h1>
          <p className="mt-5 max-w-[56ch] text-lg text-ink-soft sm:text-xl">{currentEvent.theme}</p>

          <dl className="mt-10 grid max-w-3xl border-y-2 border-ink sm:grid-cols-3 sm:divide-x sm:divide-rule">
            {[
              ['Date', currentEvent.date],
              ['Time', currentEvent.time],
              ['Venue', currentEvent.venue.name],
            ].map(([k, v]) => (
              <div key={k} className="py-4 sm:px-5 sm:first:pl-0">
                <dt className="label">{k}</dt>
                <dd className="mt-0.5 font-display text-xl font-medium leading-snug">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
            <a href={currentEvent.registration.rsvpUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Confirm your RSVP on Meetup <span aria-hidden>→</span>
            </a>
            <p className="label tabular-nums">
              starts in {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            </p>
          </div>

          <div className="mt-20 grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem]">
            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.02em]">What to expect</h2>
              <ul className="mt-6 border-t border-ink">
                {perks.map((p) => (
                  <li key={p.title} className="grid gap-1 border-b border-rule py-5 sm:grid-cols-[16rem_1fr] sm:gap-8">
                    <h3 className="font-display text-xl font-semibold tracking-[-0.01em]">{p.title}</h3>
                    <p className="text-ink-soft">{p.text}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div aria-hidden className="mx-auto hidden h-52 w-60 lg:block">
              <GrotMascot variant="trophy" className="h-full w-full" animate={false} />
            </div>
          </div>
        </section>

        <ScheduleSection tone="deep" />
      </main>

      <Footer />
    </div>
  );
}
