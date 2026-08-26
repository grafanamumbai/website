'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Mic2,
  Sparkles,
  Linkedin,
  Twitter,
  Github,
  Briefcase,
  ExternalLink,
  Presentation,
  Send,
} from 'lucide-react';
import communityData from '@/data';

export default function SpeakersSection() {
  const { speakers, socials } = communityData;

  return (
    <section id="speakers" className="py-16 sm:py-24 md:py-28 2xl:py-36 bg-[#0a0c10] text-white border-t border-zinc-800/80">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px]">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl 2xl:max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-400 mb-4">
            <Mic2 className="h-3.5 w-3.5" />
            <span>Featured Speakers</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-black tracking-tight leading-tight">
            Learn From Industry Experts
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg 2xl:text-xl text-zinc-300">
            Hear practical insights, observability deep-dives, and production architecture stories from practitioners.
          </p>
        </div>

        {/* Speakers Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {speakers.map((speaker) => (
            <div
              key={speaker.id}
              className="flex flex-col justify-between items-center text-center rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-6 sm:p-7 shadow-lg hover:border-orange-500/50 hover:bg-zinc-900/90 transition-all duration-300 group"
            >
              <div className="flex flex-col items-center w-full">
                {/* Avatar with glow ring */}
                <div className="relative mb-5 h-28 w-28 sm:h-32 sm:w-32 overflow-hidden rounded-full ring-2 ring-zinc-700 transition-all duration-300 group-hover:ring-orange-500 group-hover:scale-105 shadow-md">
                  <Image
                    src={speaker.avatar}
                    alt={speaker.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                  {speaker.name}
                </h3>
                
                <div className="flex items-center gap-1.5 text-xs font-semibold text-orange-400 mt-1">
                  <Briefcase className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{speaker.company}</span>
                </div>

                {speaker.topic && (
                  <div className="mt-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 p-3 text-xs text-zinc-300 font-medium text-left w-full">
                    <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-semibold uppercase tracking-wider mb-1">
                      <Presentation className="h-3 w-3 text-orange-400" />
                      <span>Talk Topic</span>
                    </div>
                    <p className="line-clamp-2 leading-relaxed text-zinc-200">{speaker.topic}</p>
                  </div>
                )}
              </div>

              {/* Social Links Row */}
              <div className="mt-5 flex items-center justify-center gap-2.5 pt-3 border-t border-zinc-800/60 w-full">
                {speaker.socials.linkedin && (
                  <a
                    href={speaker.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${speaker.name}'s LinkedIn`}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-800/80 text-zinc-300 hover:bg-orange-500 hover:text-white transition-all active:scale-95"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                )}
                {speaker.socials.twitter && (
                  <a
                    href={speaker.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${speaker.name}'s Twitter`}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-800/80 text-zinc-300 hover:bg-orange-500 hover:text-white transition-all active:scale-95"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                )}
                {speaker.socials.github && (
                  <a
                    href={speaker.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${speaker.name}'s GitHub`}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-800/80 text-zinc-300 hover:bg-orange-500 hover:text-white transition-all active:scale-95"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CFP Banner Card */}
        <div className="mt-14 sm:mt-18 rounded-2xl border border-orange-500/30 bg-gradient-to-r from-orange-500/10 via-zinc-900/90 to-zinc-900 p-6 sm:p-10 text-center max-w-3xl 2xl:max-w-4xl mx-auto shadow-2xl">
          <div className="flex justify-center mb-3 text-orange-400">
            <Sparkles className="h-8 w-8" />
          </div>
          <h3 className="text-xl sm:text-2xl 2xl:text-3xl font-black text-white">
            Have an Observability Story or Tool to Share?
          </h3>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-zinc-300 max-w-xl mx-auto leading-relaxed">
            Our Call for Proposals (CFP) is open for community members of all backgrounds. First-time speakers and student developers are warmly supported!
          </p>
          <div className="mt-6 flex justify-center">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm sm:text-base px-8 h-12 rounded-full shadow-lg shadow-orange-500/25 active:scale-95 transition-all hover:scale-105"
            >
              <a href={socials.cfp} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                <Send className="h-4 w-4" />
                <span>Submit Your Talk Proposal (CFP)</span>
              </a>
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}
