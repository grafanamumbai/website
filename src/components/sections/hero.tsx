'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import communityData from '@/data';
import { GrotMascot } from '@/components/icons';

export default function HeroSection() {
  const { chapter, currentEvent, socials } = communityData;
  const { hasUpcomingEvent } = currentEvent;

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!hasUpcomingEvent || !currentEvent.targetDateISO) return;

    const target = new Date(currentEvent.targetDateISO).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [currentEvent.targetDateISO, hasUpcomingEvent]);

  const showCountdown =
    hasUpcomingEvent && currentEvent.targetDateISO && new Date(currentEvent.targetDateISO).getTime() > new Date().getTime();
  const pad = (n: number) => String(n).padStart(2, '0');

  const stats = [
    { label: 'members', value: chapter.stats.members },
    { label: 'meetups held', value: chapter.stats.meetups },
    { label: 'speakers hosted', value: chapter.stats.speakers },
    { label: 'to attend', value: 'Free' },
  ];

  return (
    <section className="pt-10 sm:pt-14 lg:pt-20">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">

          {/* Copy */}
          <div className="lg:col-span-6">
            <p className="label">Mumbai chapter · powered by Grafana Labs</p>

            <h1 className="mt-5 text-[clamp(2.75rem,6.2vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
              {hasUpcomingEvent ? (
                currentEvent.title
              ) : (
                <>
                  Free meetups for Mumbai&apos;s{' '}
                  <span className="bg-[linear-gradient(transparent_60%,#F05A28_60%,#F05A28_92%,transparent_92%)] px-1 -mx-1">
                    observability
                  </span>{' '}
                  crowd.
                </>
              )}
            </h1>

            <p className="mt-6 max-w-[34rem] text-lg text-ink-soft sm:text-xl">
              {hasUpcomingEvent
                ? `${currentEvent.edition}. ${currentEvent.theme}.`
                : 'Talks and demos on Grafana, Prometheus, Loki, Tempo and OpenTelemetry, from people who run them in production. Anyone can come. Nobody pays.'}
            </p>

            {hasUpcomingEvent && (
              <dl className="mt-8 grid max-w-xl grid-cols-1 border-y-2 border-ink sm:grid-cols-3 sm:divide-x sm:divide-rule">
                {[
                  ['Date', currentEvent.date],
                  ['Time', currentEvent.time],
                  ['Venue', currentEvent.venue.name],
                ].map(([k, v]) => (
                  <div key={k} className="py-3 sm:px-4 sm:first:pl-0">
                    <dt className="label">{k}</dt>
                    <dd className="mt-0.5 font-display text-lg font-medium leading-snug">{v}</dd>
                  </div>
                ))}
              </dl>
            )}

            {showCountdown && (
              <p className="label mt-4 tabular-nums" aria-label="Time until the meetup">
                starts in {timeLeft.days}d {pad(timeLeft.hours)}h {pad(timeLeft.minutes)}m {pad(timeLeft.seconds)}s
              </p>
            )}

            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a
                href={hasUpcomingEvent ? currentEvent.registration.rsvpUrl : socials.meetup}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                {hasUpcomingEvent ? 'RSVP on Meetup' : 'Join the Meetup group'} <span aria-hidden>→</span>
              </a>
              <a href={socials.cfp} target="_blank" rel="noopener noreferrer" className="link font-medium">
                Give a talk
              </a>
            </div>
          </div>

          {/* Photos from past meetups, with Grot standing on the stack */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-[36rem] pb-14 pr-4 sm:pb-16 lg:max-w-none lg:pr-0">
              <figure className="print -rotate-[1.5deg]">
                <div className="relative aspect-[4/3] overflow-hidden bg-paper-deep">
                  <Image
                    src="/photos/event-2.jpg"
                    alt="Attendees and speakers of the CSI-VIT x Grafana x MumPy tech conference on stage together"
                    fill
                    priority
                    sizes="(min-width: 1024px) 560px, 90vw"
                    className="object-cover"
                  />
                </div>
              </figure>
              <figure className="print absolute -bottom-0 left-[-2%] hidden w-[42%] rotate-[3deg] sm:block">
                <div className="relative aspect-[4/3] overflow-hidden bg-paper-deep">
                  <Image
                    src="/photos/event-5.jpg"
                    alt="A speaker presenting a slide on context propagation in distributed tracing"
                    fill
                    sizes="240px"
                    className="object-cover"
                  />
                </div>
              </figure>
              <div className="pointer-events-none absolute -bottom-2 right-0 w-[40%] max-w-[15rem] sm:right-[-2%]">
                <GrotMascot variant="hat" eager animate={false} className="h-full w-full drop-shadow-[0_10px_14px_rgba(60,40,10,0.35)]" />
              </div>
            </div>
          </div>
        </div>

        {/* Facts, as a plain strip */}
        <dl className="mt-14 grid grid-cols-2 border-y border-ink/80 sm:mt-16 md:grid-cols-4 md:divide-x md:divide-rule">
          {stats.map((s) => (
            <div key={s.label} className="px-1 py-5 md:px-6 md:first:pl-0">
              <dd className="font-display text-4xl font-semibold tracking-[-0.01em] sm:text-5xl">{s.value}</dd>
              <dt className="label mt-1">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
