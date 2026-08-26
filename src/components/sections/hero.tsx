'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Sparkles,
  Users,
  Mic2,
  Trophy,
  ShieldCheck,
  Radio,
  Cpu,
  Layers,
  Terminal,
  Flame,
} from 'lucide-react';
import communityData from '@/data';
import { MeetupLogo, GrafanaLogo, GrotMascot, CncfIcon } from '@/components/icons';

export default function HeroSection() {
  const { chapter, currentEvent, socials, mascot } = communityData;
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
    <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden bg-[#090b0e] py-12 sm:py-20 md:py-28 2xl:py-36 text-white">
      {/* Background Decorative Mesh & Obsidian Grids */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 10%, rgba(244, 104, 0, 0.25) 0%, transparent 60%), radial-gradient(circle at 85% 85%, rgba(66, 92, 199, 0.18) 0%, transparent 50%)',
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
        <div className="mx-auto max-w-4xl 2xl:max-w-5xl text-center">
          
          {/* Telemetry Status Pill & Grot Greeting */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-orange-400 backdrop-blur-md shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
              </span>
              <span className="truncate">Official Community Chapter • Powered by Grafana Labs</span>
            </div>

            <Link
              href="#mascot"
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/90 px-3 py-1.5 text-xs text-zinc-300 hover:text-white hover:border-orange-500/40 transition-colors shadow-sm"
            >
              <div className="h-4 w-4">
                <GrotMascot className="h-full w-full" animate={false} />
              </div>
              <span>Meet Grot Mascot</span>
            </Link>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl 2xl:text-7xl font-black tracking-tight text-white leading-tight sm:leading-none">
            {hasUpcomingEvent ? (
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent block sm:inline mt-1 sm:mt-0">
                {currentEvent.title}
              </span>
            ) : (
              <>
                Grafana & Friends <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent block sm:inline mt-1 sm:mt-0">
                  Mumbai Chapter
                </span>
              </>
            )}
          </h1>

          <p className="mt-4 sm:mt-6 text-sm xs:text-base sm:text-lg md:text-xl 2xl:text-2xl text-zinc-300 max-w-2xl 2xl:max-w-3xl mx-auto leading-relaxed font-normal">
            {hasUpcomingEvent ? chapter.description : "The premier hub for developers, SREs, and DevOps professionals in Mumbai exploring metrics, logs, traces, continuous profiling, and cloud-native observability."}
          </p>

          {/* Observability Stack Quick Badges Strip */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-zinc-400">
            <span className="px-2.5 py-1 rounded-lg bg-zinc-900/80 border border-zinc-800 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-orange-500"></span>
              Grafana
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-zinc-900/80 border border-zinc-800 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-500"></span>
              Prometheus
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-zinc-900/80 border border-zinc-800 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-500"></span>
              OpenTelemetry
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-zinc-900/80 border border-zinc-800 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
              Loki
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-zinc-900/80 border border-zinc-800 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-purple-500"></span>
              Tempo
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-zinc-900/80 border border-zinc-800 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              Pyroscope
            </span>
          </div>

          {hasUpcomingEvent && (
            <>
              {/* Event Quick Info Card */}
              <div className="mt-8 sm:mt-10 mx-auto max-w-2xl 2xl:max-w-3xl rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 sm:p-6 md:p-7 backdrop-blur-md shadow-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-left divide-y sm:divide-y-0 sm:divide-x divide-zinc-800/80">
                  
                  <div className="flex items-center gap-3.5 pt-1 sm:pt-0">
                    <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[11px] sm:text-xs text-zinc-400 font-medium uppercase tracking-wider">Date</p>
                      <p className="text-xs sm:text-sm font-bold text-white leading-tight">{currentEvent.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5 pt-3 sm:pt-0 sm:pl-5 md:pl-6">
                    <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[11px] sm:text-xs text-zinc-400 font-medium uppercase tracking-wider">Time</p>
                      <p className="text-xs sm:text-sm font-bold text-white leading-tight">{currentEvent.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5 pt-3 sm:pt-0 sm:pl-5 md:pl-6">
                    <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[11px] sm:text-xs text-zinc-400 font-medium uppercase tracking-wider">Location</p>
                      <p className="text-xs sm:text-sm font-bold text-white leading-tight">{currentEvent.venue.name}</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Live Countdown Timer */}
              {currentEvent.targetDateISO && new Date(currentEvent.targetDateISO).getTime() > new Date().getTime() && (
                <div className="mt-8 sm:mt-10 flex items-center justify-center gap-2.5 xs:gap-3 sm:gap-4 md:gap-6">
                  {[
                    { label: 'Days', value: timeLeft.days },
                    { label: 'Hours', value: timeLeft.hours },
                    { label: 'Minutes', value: timeLeft.minutes },
                    { label: 'Seconds', value: timeLeft.seconds },
                  ].map((unit) => (
                    <div
                      key={unit.label}
                      className="flex flex-col items-center justify-center rounded-xl sm:rounded-2xl border border-zinc-800/90 bg-zinc-950/90 px-2.5 py-2 xs:px-3.5 xs:py-2.5 sm:px-5 sm:py-3.5 shadow-lg min-w-[62px] xs:min-w-[70px] sm:min-w-[85px] md:min-w-[100px]"
                    >
                      <span className="font-mono text-xl xs:text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
                        {String(unit.value).padStart(2, '0')}
                      </span>
                      <span className="text-[9px] xs:text-[10px] sm:text-xs text-zinc-400 font-semibold uppercase tracking-wider mt-0.5 sm:mt-1">
                        {unit.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Action Buttons */}
          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto w-full">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-base h-12 sm:h-13 px-8 rounded-full shadow-xl shadow-orange-500/25 transition-all hover:scale-105"
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
              className="w-full sm:w-auto border-zinc-700 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white text-base h-12 sm:h-13 px-7 rounded-full transition-all hover:border-zinc-500"
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

          {/* Community Stats Grid */}
          <div className="mt-14 sm:mt-20 pt-8 sm:pt-12 border-t border-zinc-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
            
            <div className="p-3 sm:p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
              <div className="flex justify-center mb-1 text-orange-400">
                <Users className="h-5 w-5" />
              </div>
              <p className="text-xl xs:text-2xl sm:text-3xl font-extrabold text-white font-mono">{chapter.stats.members}</p>
              <p className="text-[11px] sm:text-xs text-zinc-400 mt-0.5">Community Members</p>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
              <div className="flex justify-center mb-1 text-orange-400">
                <Calendar className="h-5 w-5" />
              </div>
              <p className="text-xl xs:text-2xl sm:text-3xl font-extrabold text-white font-mono">{chapter.stats.meetups}</p>
              <p className="text-[11px] sm:text-xs text-zinc-400 mt-0.5">Meetups Hosted</p>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
              <div className="flex justify-center mb-1 text-orange-400">
                <Mic2 className="h-5 w-5" />
              </div>
              <p className="text-xl xs:text-2xl sm:text-3xl font-extrabold text-white font-mono">{chapter.stats.speakers}</p>
              <p className="text-[11px] sm:text-xs text-zinc-400 mt-0.5">Expert Speakers</p>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
              <div className="flex justify-center mb-1 text-emerald-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <p className="text-xl xs:text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">100% Free</p>
              <p className="text-[11px] sm:text-xs text-zinc-400 mt-0.5">Open to Everyone</p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
