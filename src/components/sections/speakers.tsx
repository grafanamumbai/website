'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Linkedin, Twitter, Github, Mic, Sparkles } from 'lucide-react';
import communityData from '@/data';

export default function SpeakersSection() {
  const { speakers, socials } = communityData;

  return (
    <section id="speakers" className="py-20 md:py-28 bg-[#0a0c10] text-white border-t border-zinc-800/80">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-400 mb-4">
            <Mic className="h-3.5 w-3.5" />
            <span>Featured Speakers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Learn From Industry Experts
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-300">
            Hear practical insights, observability deep-dives, and production architecture stories from practitioners.
          </p>
        </div>

        {/* Speakers Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {speakers.map((speaker) => (
            <div
              key={speaker.id}
              className="flex flex-col items-center text-center rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-6 shadow-md hover:border-orange-500/40 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 group"
            >
              {/* Avatar with glow ring */}
              <div className="relative mb-5 h-32 w-32 overflow-hidden rounded-full ring-2 ring-zinc-700 transition-all duration-300 group-hover:ring-orange-500 group-hover:scale-105">
                <Image
                  src={speaker.avatar}
                  alt={speaker.name}
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                {speaker.name}
              </h3>
              
              <p className="text-xs font-semibold text-orange-400 mt-1">
                {speaker.company}
              </p>

              {speaker.topic && (
                <div className="mt-3 rounded-lg bg-zinc-950/80 border border-zinc-800/80 px-3 py-2 text-xs text-zinc-300 font-medium">
                  <span className="text-[10px] text-zinc-500 uppercase block font-semibold mb-0.5">Talk Topic</span>
                  {speaker.topic}
                </div>
              )}

              {/* Social links */}
              <div className="mt-5 flex items-center gap-3">
                {speaker.socials.linkedin && (
                  <a
                    href={speaker.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${speaker.name}'s LinkedIn`}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 hover:bg-orange-500 hover:text-white transition-colors"
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
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 hover:bg-orange-500 hover:text-white transition-colors"
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
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 hover:bg-orange-500 hover:text-white transition-colors"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CFP Banner Card */}
        <div className="mt-16 rounded-2xl border border-orange-500/30 bg-gradient-to-r from-orange-500/10 via-zinc-900/80 to-zinc-900 p-8 text-center max-w-3xl mx-auto shadow-xl">
          <h3 className="text-2xl font-bold text-white">Have an Observability Story or Tool to Share?</h3>
          <p className="mt-2 text-sm text-zinc-300 max-w-xl mx-auto">
            Our Call for Proposals (CFP) is always open for community members of all backgrounds. We'd love to have you on stage!
          </p>
          <div className="mt-6">
            <Button
              asChild
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 h-11 rounded-full shadow-lg shadow-orange-500/20"
            >
              <a href={socials.cfp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Mic className="h-4 w-4" />
                <span>Submit Your Talk Proposal (CFP)</span>
              </a>
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}
