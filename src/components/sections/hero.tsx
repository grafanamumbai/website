'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Users,
  Mic2,
  ShieldCheck,
} from 'lucide-react';
import communityData from '@/data';
import { MeetupLogo, GrotMascot } from '@/components/icons';

// Floating "signal" chips orbiting Grot: one per observability pillar.
const orbit = [
  { label: 'Metrics', tool: 'Prometheus', dot: 'bg-red-500', pos: 'top-8 left-0 sm:-left-4', delay: '0s' },
  { label: 'Logs', tool: 'Loki', dot: 'bg-cyan-400', pos: 'top-20 right-0 sm:-right-4', delay: '1.2s' },
  { label: 'Traces', tool: 'Tempo', dot: 'bg-purple-500', pos: 'bottom-28 left-0 sm:-left-8', delay: '2.4s' },
  { label: 'Profiles', tool: 'Pyroscope', dot: 'bg-emerald-400', pos: 'bottom-12 right-2 sm:-right-2', delay: '3.6s' },
];

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

  return (
    <section className="relative overflow-hidden bg-[#090b0e] py-12 sm:py-16 lg:py-20 2xl:py-28 text-white">
      {/* Background: warm glow behind Grot + faint dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at 78% 30%, rgba(244, 104, 0, 0.3) 0%, transparent 55%), radial-gradient(circle at 10% 90%, rgba(66, 92, 199, 0.18) 0%, transparent 50%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">

          {/* Grot stage: first on mobile, right column on desktop */}
          <div className="order-first lg:order-last lg:col-span-5 relative mx-auto w-full max-w-[22rem] sm:max-w-[28rem] lg:max-w-none h-64 sm:h-96 lg:h-[34rem]">
            <div className="absolute inset-4 sm:inset-8 rounded-full bg-orange-500/20 blur-3xl" />
            <div className="absolute inset-8 sm:inset-14 rounded-full border border-orange-500/20" />
            <div className="absolute inset-16 sm:inset-24 rounded-full border border-dashed border-orange-500/10" />
            <div className="absolute inset-0 flex items-center justify-center motion-safe:animate-float">
              <GrotMascot variant="hat" eager animate={false} className="h-full w-full drop-shadow-2xl" />
            </div>
            {orbit.map((chip) => (
              <div
                key={chip.label}
                style={{ animationDelay: chip.delay }}
                className={`absolute ${chip.pos} hidden sm:flex items-center gap-2 rounded-xl border border-zinc-700/70 bg-zinc-900/90 px-3 py-1.5 backdrop-blur-md shadow-lg motion-safe:animate-float`}
              >
                <span className={`h-2 w-2 rounded-full ${chip.dot}`} />
                <span className="text-sm font-bold text-white">{chip.label}</span>
                <span className="text-xs font-mono text-zinc-400">{chip.tool}</span>
              </div>
            ))}
          </div>

          {/* Copy column */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1.5 text-sm font-semibold text-orange-400 backdrop-blur-md shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
              </span>
              <span className="truncate">Official Chapter • Powered by Grafana Labs</span>
            </div>

            <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl 2xl:text-7xl font-black tracking-tight text-white leading-[1.05]">
              {hasUpcomingEvent ? (
                <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                  {currentEvent.title}
                </span>
              ) : (
                <>
                  Grafana & Friends <br className="hidden sm:block" />
                  <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                    Mumbai Chapter
                  </span>
                </>
              )}
            </h1>

            <p className="mt-5 text-base sm:text-lg md:text-xl 2xl:text-2xl text-zinc-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {hasUpcomingEvent ? chapter.description : "The premier hub for developers, SREs, and DevOps professionals in Mumbai exploring metrics, logs, traces, continuous profiling, and cloud-native observability."}
            </p>

            {hasUpcomingEvent && (
              <>
                {/* Event Quick Info Card */}
                <div className="mt-8 max-w-2xl mx-auto lg:mx-0 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 sm:p-5 backdrop-blur-md shadow-2xl">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left divide-y sm:divide-y-0 sm:divide-x divide-zinc-800/80">
                    {[
                      { Icon: Calendar, label: 'Date', value: currentEvent.date },
                      { Icon: Clock, label: 'Time', value: currentEvent.time },
                      { Icon: MapPin, label: 'Location', value: currentEvent.venue.name },
                    ].map(({ Icon, label, value }, i) => (
                      <div key={label} className={`flex items-center gap-3.5 ${i > 0 ? 'pt-3 sm:pt-0 sm:pl-5' : 'pt-1 sm:pt-0'}`}>
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">{label}</p>
                          <p className="text-sm font-bold text-white leading-tight">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Countdown Timer */}
                {currentEvent.targetDateISO && new Date(currentEvent.targetDateISO).getTime() > new Date().getTime() && (
                  <div className="mt-6 flex items-center justify-center lg:justify-start gap-2.5 sm:gap-3">
                    {[
                      { label: 'Days', value: timeLeft.days },
                      { label: 'Hours', value: timeLeft.hours },
                      { label: 'Minutes', value: timeLeft.minutes },
                      { label: 'Seconds', value: timeLeft.seconds },
                    ].map((unit) => (
                      <div
                        key={unit.label}
                        className="flex flex-col items-center justify-center rounded-xl border border-zinc-800/90 bg-zinc-950/90 px-2.5 py-2 sm:px-4 sm:py-3 shadow-lg min-w-[64px] sm:min-w-[84px]"
                      >
                        <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                          {String(unit.value).padStart(2, '0')}
                        </span>
                        <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider mt-0.5">
                          {unit.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto lg:mx-0 w-full">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-base h-12 px-8 rounded-full shadow-xl shadow-orange-500/25 transition-all hover:scale-105"
              >
                <a
                  href={hasUpcomingEvent ? currentEvent.registration.rsvpUrl : socials.meetup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5"
                >
                  <MeetupLogo className="h-4 w-4" />
                  <span>{hasUpcomingEvent ? "RSVP for Meetup (Free)" : "Join Community / Meetup"}</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-zinc-700 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white text-base h-12 px-7 rounded-full transition-all hover:border-zinc-500"
              >
                <a
                  href={socials.cfp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5"
                >
                  <Mic2 className="h-4 w-4 text-orange-400" />
                  <span>Submit a Talk (CFP)</span>
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Community Stats Strip */}
        <div className="mt-14 sm:mt-16 pt-8 border-t border-zinc-800/80 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-center">
          {[
            { Icon: Users, value: chapter.stats.members, label: 'Community Members', tone: 'text-orange-400' },
            { Icon: Calendar, value: chapter.stats.meetups, label: 'Meetups Hosted', tone: 'text-orange-400' },
            { Icon: Mic2, value: chapter.stats.speakers, label: 'Expert Speakers', tone: 'text-orange-400' },
            { Icon: ShieldCheck, value: '100% Free', label: 'Open to Everyone', tone: 'text-emerald-400' },
          ].map(({ Icon, value, label, tone }) => (
            <div key={label} className="p-3 sm:p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
              <div className={`flex justify-center mb-1 ${tone}`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className={`text-2xl sm:text-3xl font-extrabold font-mono ${tone === 'text-emerald-400' ? tone : 'text-white'}`}>{value}</p>
              <p className="text-xs text-zinc-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
