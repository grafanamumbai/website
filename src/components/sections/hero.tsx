'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, ArrowRight, Sparkles, Users, Mic, Award } from 'lucide-react';
import communityData from '@/data';

export default function HeroSection() {
  const { chapter, currentEvent, socials } = communityData;

  // Countdown timer calculation
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
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
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [currentEvent.targetDateISO]);

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-[#0c0e14] py-16 md:py-24 text-white">
      {/* Background Decorative Gradient & Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 20%, rgba(244, 122, 32, 0.25) 0%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(50, 116, 217, 0.15) 0%, transparent 50%)',
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none opacity-10" 
        style={{ 
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)', 
          backgroundSize: '32px 32px' 
        }} 
      />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          
          {/* Chapter Status Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-orange-400 backdrop-blur-md mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span>Official Community Chapter • Powered by Grafana Labs</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
            GrafanaCon Local{' '}
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
              Mumbai 2026
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            {chapter.description}
          </p>

          {/* Event Quick Info Card */}
          <div className="mt-8 mx-auto max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 sm:p-6 backdrop-blur-md shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left divide-y sm:divide-y-0 sm:divide-x divide-zinc-800">
              <div className="flex items-center gap-3 sm:justify-start justify-center pt-2 sm:pt-0">
                <Calendar className="h-5 w-5 text-orange-400 shrink-0" />
                <div>
                  <p className="text-xs text-zinc-400 font-medium">Date</p>
                  <p className="text-sm font-semibold text-white">{currentEvent.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:justify-start justify-center pt-3 sm:pt-0 sm:pl-4">
                <Clock className="h-5 w-5 text-orange-400 shrink-0" />
                <div>
                  <p className="text-xs text-zinc-400 font-medium">Time</p>
                  <p className="text-sm font-semibold text-white">{currentEvent.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:justify-start justify-center pt-3 sm:pt-0 sm:pl-4">
                <MapPin className="h-5 w-5 text-orange-400 shrink-0" />
                <div>
                  <p className="text-xs text-zinc-400 font-medium">Venue</p>
                  <p className="text-sm font-semibold text-white">{currentEvent.venue.name}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Live Countdown Timer */}
          <div className="mt-8 flex items-center justify-center gap-3 sm:gap-4">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((unit) => (
              <div
                key={unit.label}
                className="flex flex-col items-center rounded-xl border border-zinc-800 bg-zinc-950/80 px-3 py-2 sm:px-5 sm:py-3 shadow-md min-w-[64px] sm:min-w-[80px]"
              >
                <span className="font-mono text-2xl sm:text-3xl font-bold text-white">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs text-zinc-400 font-medium uppercase tracking-wider">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          {/* Call to Actions */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 h-12 rounded-full shadow-lg shadow-orange-500/25 transition-all hover:scale-105"
            >
              <a
                href={currentEvent.registration.rsvpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <span>RSVP for Meetup</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-zinc-700 bg-zinc-900/80 text-zinc-200 hover:text-white hover:bg-zinc-800 px-6 h-12 rounded-full transition-all hover:border-zinc-500"
            >
              <a
                href={currentEvent.registration.cfpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Mic className="h-4 w-4 text-orange-400" />
                <span>Submit a Talk (CFP)</span>
              </a>
            </Button>
          </div>

          {/* Stats Bar */}
          <div className="mt-16 pt-10 border-t border-zinc-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{chapter.stats.members}</p>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">Community Members</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{chapter.stats.meetups}</p>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">Meetups Hosted</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{chapter.stats.speakers}</p>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">Expert Speakers</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-orange-400 font-mono">100% Free</p>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">Open to Everyone</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
