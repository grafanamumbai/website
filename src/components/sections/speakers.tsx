'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Mic2,
  Building2,
  Sparkles,
  Send,
  Linkedin,
  Twitter,
  Github,
  Globe,
  Youtube,
  Instagram,
  Facebook,
  MessageSquare,
  User,
  Link as LinkIcon,
} from 'lucide-react';
import communityData from '@/data';

const getSocialIcon = (key: string) => {
  const k = key.toLowerCase();
  if (k === 'linkedin') return <Linkedin className="h-4 w-4" />;
  if (k === 'twitter' || k === 'x') return <Twitter className="h-4 w-4" />;
  if (k === 'github') return <Github className="h-4 w-4" />;
  if (k === 'website' || k === 'web') return <Globe className="h-4 w-4" />;
  if (k === 'youtube') return <Youtube className="h-4 w-4" />;
  if (k === 'instagram' || k === 'insta') return <Instagram className="h-4 w-4" />;
  if (k === 'facebook' || k === 'fb') return <Facebook className="h-4 w-4" />;
  if (k === 'discord' || k === 'slack') return <MessageSquare className="h-4 w-4" />;
  return <LinkIcon className="h-4 w-4" />;
};

const getAvatarUrl = (url: string | undefined) => {
  if (!url) return '';
  const driveMatch = url.match(/drive\.google\.com\/(?:file\/d\/|drive\/folders\/|open\?id=)([a-zA-Z0-9_-]+)/);
  if (driveMatch && driveMatch[1]) {
    return `https://drive.google.com/thumbnail?id=${driveMatch[1]}&sz=w500-h500`;
  }
  return url;
};

export default function SpeakersSection() {
  const { speakers, socials } = communityData;

  const SpeakerCard = ({ speaker }: { speaker: any }) => {
    const [imgError, setImgError] = useState(false);
    const avatarSrc = getAvatarUrl(speaker.avatar);

    return (
      <div
        className={`group flex h-full flex-col rounded-3xl border ${
          speaker.featured ? 'border-orange-500/50 bg-orange-500/5' : 'border-zinc-800/80 bg-zinc-900/40'
        } p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-orange-500/30 hover:bg-zinc-900 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/10`}
      >
        <div className="flex items-start gap-4 sm:gap-6">
          {/* Avatar with safe fallback */}
          <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-800 flex items-center justify-center">
            {avatarSrc && !imgError ? (
              <img
                src={avatarSrc}
                alt={speaker.name}
                onError={() => setImgError(true)}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-orange-400 font-bold text-lg font-mono">
                {speaker.name ? speaker.name.charAt(0) : <User className="h-6 w-6" />}
              </div>
            )}
          </div>
          
          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-orange-400 transition-colors truncate">
              {speaker.name}
            </h3>
            <p className="text-sm font-semibold text-zinc-400 mt-0.5">{speaker.role}</p>
            {speaker.company && (
              <div className="flex items-center gap-1.5 mt-1.5 text-xs text-zinc-500">
                <Building2 className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{speaker.company}</span>
              </div>
            )}
          </div>
        </div>

        {/* Talk Topic */}
        <div className="mt-6 flex-1">
          <div className="inline-block rounded-lg bg-zinc-800/80 px-3 py-1.5 text-xs font-semibold text-zinc-300 mb-3 border border-zinc-700/50">
            Talk Topic
          </div>
          <h4 className="text-base sm:text-lg font-bold text-zinc-100 leading-snug">
            {speaker.topic}
          </h4>
          {speaker.bio && (
            <p className="mt-3 text-sm text-zinc-400 line-clamp-3 leading-relaxed">
              {speaker.bio}
            </p>
          )}
        </div>

        {/* Social Links */}
        <div className="mt-6 flex items-center gap-2 pt-4 border-t border-zinc-800/60 flex-wrap">
          {speaker.socials && Object.entries(speaker.socials).map(([key, url]) => (
            <a
              key={key}
              href={url as string}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${speaker.name}'s ${key}`}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-800/80 text-zinc-300 hover:bg-orange-500 hover:text-white transition-all active:scale-95"
            >
              {getSocialIcon(key)}
            </a>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="speakers" className="py-16 sm:py-24 md:py-28 2xl:py-36 bg-[#090b0e] text-white border-t border-zinc-800/80">
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

        {/* Speakers Layout */}
        <div className="mt-12 sm:mt-16 md:mt-20">
          {speakers.length <= 3 ? (
            <div className="grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {speakers.map((speaker) => (
                <SpeakerCard key={speaker.id} speaker={speaker} />
              ))}
            </div>
          ) : (
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4 sm:-ml-6 md:-ml-8">
                {speakers.map((speaker) => (
                  <CarouselItem key={speaker.id} className="pl-4 sm:pl-6 md:pl-8 md:basis-1/2 lg:basis-1/3">
                    <SpeakerCard speaker={speaker} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex items-center justify-center gap-4 mt-12">
                <CarouselPrevious className="position-static transform-none static h-12 w-12 border-zinc-800 bg-zinc-900/50 hover:bg-orange-500 hover:text-white" />
                <CarouselNext className="position-static transform-none static h-12 w-12 border-zinc-800 bg-zinc-900/50 hover:bg-orange-500 hover:text-white" />
              </div>
            </Carousel>
          )}
        </div>

        {/* CFP Banner Card */}
        <div className="mt-14 sm:mt-18 rounded-2xl border border-orange-500/30 bg-gradient-to-r from-orange-500/10 via-zinc-900/90 to-zinc-900 p-6 sm:p-10 text-center max-w-3xl 2xl:max-w-4xl mx-auto shadow-2xl">
          <div className="flex justify-center mb-3 text-orange-400">
            <Sparkles className="h-8 w-8" />
          </div>
          <h3 className="text-xl sm:text-2xl 2xl:text-3xl font-black text-white">
            Have an Observability Story or Tool to Share?
          </h3>
          <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
            We are always looking for passionate speakers to share their experiences, case studies, or deep dives into the Grafana and CNCF ecosystem.
          </p>
          <div className="mt-6 sm:mt-8 flex justify-center">
            <Button
              asChild
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold h-12 px-8 rounded-full shadow-lg shadow-orange-500/25 transition-all hover:scale-105"
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
