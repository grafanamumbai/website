'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  ShieldCheck,
  Gift,
  Mail,
  Sparkles,
  ExternalLink,
  Shirt,
  Smile,
  CheckCircle2,
  HeartHandshake,
} from 'lucide-react';
import communityData from '@/data';

export default function SponsorsSection() {
  const { sponsors, swags, chapter } = communityData;

  return (
    <section id="sponsors" className="py-16 sm:py-24 md:py-28 2xl:py-36 bg-[#0e1117] text-white border-t border-zinc-800/80">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px]">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl 2xl:max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-400 mb-4">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Community Partners & Sponsors</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-black tracking-tight leading-tight">
            Supported By Industry Leaders
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg 2xl:text-xl text-zinc-300">
            Our events are made possible through the generous support of our partners and open-source champions.
          </p>
        </div>

        {/* Sponsor Cards */}
        <div className="mt-12 sm:mt-16 max-w-3xl 2xl:max-w-4xl mx-auto">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 shadow-xl hover:border-orange-500/50 transition-all duration-300"
            >
              <div className="relative h-20 w-44 sm:h-24 sm:w-48 shrink-0 bg-white/5 rounded-2xl p-3.5 flex items-center justify-center border border-zinc-800">
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={180}
                  height={70}
                  className="object-contain max-h-14 sm:max-h-16 w-auto"
                />
              </div>
              <div className="space-y-2 text-center sm:text-left flex-1">
                <div className="inline-block rounded-full bg-orange-500/20 px-3 py-0.5 text-xs font-semibold text-orange-400 border border-orange-500/30">
                  {sponsor.tier}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">{sponsor.name}</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                  {sponsor.description}
                </p>
                <div className="pt-1">
                  <a
                    href={sponsor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors"
                  >
                    <span>Visit Website</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Swag Showcase Grid */}
        <div className="mt-20 sm:mt-28 mx-auto max-w-4xl 2xl:max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-400 mb-4">
            <Gift className="h-3.5 w-3.5" />
            <span>Attendee Goodies & Swags</span>
          </div>
          <h3 className="text-xl sm:text-3xl font-black text-white">
            Win Exclusive Grafana Merchandise
          </h3>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-zinc-300 max-w-xl mx-auto">
            Participate in our interactive live quizzes, trivia, and community demos to take home official Grafana swag!
          </p>

          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 text-left">
            {swags.map((swag) => (
              <div
                key={swag.id}
                className="p-5 sm:p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 shadow-md hover:border-orange-500/40 hover:bg-zinc-900/80 transition-all duration-300"
              >
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white">{swag.name}</h4>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                  {swag.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsor CTA Box */}
        <div className="mt-14 sm:mt-18 text-center">
          <p className="text-xs sm:text-sm text-zinc-400 mb-4">
            Interested in sponsoring or hosting a future Grafana & Friends meetup in Mumbai?
          </p>
          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white rounded-full px-7 h-11 text-sm font-semibold"
          >
            <a href={`mailto:${chapter.email}`} className="flex items-center justify-center gap-2">
              <Mail className="h-4 w-4 text-orange-400" />
              <span>Contact Organizers to Sponsor</span>
            </a>
          </Button>
        </div>

      </div>
    </section>
  );
}
