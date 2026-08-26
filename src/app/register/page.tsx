'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ScheduleSection from '@/components/sections/schedule';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Gift, Users } from 'lucide-react';
import Link from 'next/link';
import communityData from '@/data';

export default function RegisterPage() {
  const { currentEvent, chapter } = communityData;

  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
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
    {
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-400" />,
      title: 'Free Entry & Refreshments',
      description: '100% free community event with complimentary lunch, coffee, and high-tea.',
    },
    {
      icon: <Gift className="h-5 w-5 text-orange-400" />,
      title: 'Exclusive Grafana Swag Pack',
      description: 'Limited edition stickers, community t-shirts, and collectibles for active participants.',
    },
    {
      icon: <Users className="h-5 w-5 text-blue-400" />,
      title: 'High-Value Hallway Track',
      description: 'Network directly with SREs, DevOps architects, speakers, and Grafana community leads.',
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-purple-400" />,
      title: 'Hands-on Demos & Certifications',
      description: 'Real-world use cases, live dashboards, and practical takeaways for your tech stack.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#0c0e14] text-white">
      <Header />
      
      <main className="flex-1 w-full relative overflow-hidden">
        {/* Decorative background glow */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 15%, rgba(244, 122, 32, 0.3) 0%, transparent 60%)',
          }}
        />

        {/* Hero Banner */}
        <section className="relative z-10 py-16 sm:py-24 px-4 container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-orange-400 mb-6">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{currentEvent.registration.statusText} • 100% Free</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Register for{' '}
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
              {currentEvent.title}
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto">
            {currentEvent.theme}
          </p>

          {/* Quick Info Card */}
          <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 backdrop-blur-md shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left divide-y sm:divide-y-0 sm:divide-x divide-zinc-800">
              <div className="flex items-center gap-3.5 pt-2 sm:pt-0">
                <Calendar className="h-6 w-6 text-orange-400 shrink-0" />
                <div>
                  <p className="text-xs text-zinc-400 font-medium">Date</p>
                  <p className="text-sm font-bold text-white">{currentEvent.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3.5 pt-4 sm:pt-0 sm:pl-6">
                <Clock className="h-6 w-6 text-orange-400 shrink-0" />
                <div>
                  <p className="text-xs text-zinc-400 font-medium">Time</p>
                  <p className="text-sm font-bold text-white">{currentEvent.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3.5 pt-4 sm:pt-0 sm:pl-6">
                <MapPin className="h-6 w-6 text-orange-400 shrink-0" />
                <div>
                  <p className="text-xs text-zinc-400 font-medium">Venue</p>
                  <p className="text-sm font-bold text-white">{currentEvent.venue.name}</p>
                </div>
              </div>
            </div>

            {/* Countdown inside card */}
            <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Mins', value: timeLeft.minutes },
                  { label: 'Secs', value: timeLeft.seconds },
                ].map((unit) => (
                  <div key={unit.label} className="text-center rounded-xl bg-zinc-950 px-3 py-2 border border-zinc-800 min-w-[56px]">
                    <span className="font-mono text-lg sm:text-xl font-bold text-white block">
                      {unit.value}
                    </span>
                    <span className="text-[9px] text-zinc-400 uppercase font-semibold">
                      {unit.label}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 h-12 rounded-full shadow-lg shadow-orange-500/25 transition-all hover:scale-105"
              >
                <a href={currentEvent.registration.rsvpUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 justify-center">
                  <span>Confirm RSVP on Meetup</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Perks Grid */}
          <div className="mt-16 text-left">
            <h3 className="text-2xl font-bold text-white text-center mb-8">What to Expect</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {perks.map((perk) => (
                <div key={perk.title} className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 shadow-md">
                  <div className="flex items-center gap-3 mb-2">
                    {perk.icon}
                    <h4 className="text-base font-bold text-white">{perk.title}</h4>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed pl-8">
                    {perk.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Agenda Section */}
        <ScheduleSection />

      </main>

      <Footer />
    </div>
  );
}
