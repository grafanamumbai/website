'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Gift, Mail, Sparkles, ExternalLink } from 'lucide-react';
import communityData from '@/data';

export default function SponsorsSection() {
  const { sponsors, swags, chapter } = communityData;

  return (
    <section id="sponsors" className="py-20 md:py-28 bg-[#0e1117] text-white border-t border-zinc-800/80">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Sponsors Part */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-400 mb-4">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Community Partners & Sponsors</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Supported By Industry Leaders
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-300">
            Our events are made possible through the generous support of our sponsors and partners.
          </p>
        </div>

        {/* Sponsor Cards */}
        <div className="mt-12 max-w-2xl mx-auto">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="flex flex-col sm:flex-row items-center gap-6 p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 shadow-lg hover:border-orange-500/40 transition-all duration-300"
            >
              <div className="relative h-20 w-44 shrink-0 bg-white/5 rounded-xl p-3 flex items-center justify-center border border-zinc-800">
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={160}
                  height={60}
                  className="object-contain max-h-14 w-auto"
                />
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <div className="inline-block rounded-full bg-orange-500/20 px-3 py-0.5 text-xs font-semibold text-orange-400 border border-orange-500/30">
                  {sponsor.tier}
                </div>
                <h3 className="text-xl font-bold text-white">{sponsor.name}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {sponsor.description}
                </p>
                <div className="pt-1">
                  <a
                    href={sponsor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-orange-400 hover:text-orange-300"
                  >
                    <span>Visit Website</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Swag Showcase */}
        <div className="mt-24 mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-400 mb-4">
            <Gift className="h-3.5 w-3.5" />
            <span>Attendee Goodies & Swags</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Win Exclusive Grafana Merchandise
          </h3>
          <p className="mt-2 text-sm sm:text-base text-zinc-300 max-w-xl mx-auto">
            Participate in our interactive live quizzes, trivia, and community demos to take home official Grafana swag!
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            {swags.map((swag) => (
              <div
                key={swag.id}
                className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 shadow-md hover:border-orange-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h4 className="text-base font-bold text-white">{swag.name}</h4>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {swag.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsor CTA */}
        <div className="mt-16 text-center">
          <p className="text-sm text-zinc-400 mb-4">
            Interested in sponsoring or hosting a future Grafana & Friends meetup in Mumbai?
          </p>
          <Button
            asChild
            variant="outline"
            className="border-zinc-700 bg-zinc-900 text-zinc-200 hover:text-white hover:bg-zinc-800 rounded-full px-6"
          >
            <a href={`mailto:${chapter.email}`} className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-orange-400" />
              <span>Contact Organizers to Sponsor</span>
            </a>
          </Button>
        </div>

      </div>
    </section>
  );
}
