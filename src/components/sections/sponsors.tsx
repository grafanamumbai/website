'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  ShieldCheck,
  Gift,
  Mail,
  Sparkles,
  ExternalLink,
  Users2,
  Building2,
  Share2,
  Globe,
  Linkedin,
  Twitter,
  Instagram,
  Github,
  Slack,
  Link as LinkIcon,
  MessageSquare,
} from 'lucide-react';
import communityData, { PartnerItem, Sponsor } from '@/data';
import { GrotMascot, MeetupLogo } from '@/components/icons';

const getSocialIcon = (key: string) => {
  const k = key.toLowerCase();
  if (k === 'linkedin') return <Linkedin className="h-3.5 w-3.5" />;
  if (k === 'twitter' || k === 'x') return <Twitter className="h-3.5 w-3.5" />;
  if (k === 'github') return <Github className="h-3.5 w-3.5" />;
  if (k === 'website' || k === 'web') return <Globe className="h-3.5 w-3.5" />;
  if (k === 'instagram' || k === 'insta') return <Instagram className="h-3.5 w-3.5" />;
  if (k === 'meetup') return <MeetupLogo className="h-3.5 w-3.5" />;
  if (k === 'slack' || k === 'discord') return <MessageSquare className="h-3.5 w-3.5" />;
  if (k === 'linktree') return <Share2 className="h-3.5 w-3.5" />;
  return <LinkIcon className="h-3.5 w-3.5" />;
};

const getAvatarUrl = (url: string | undefined) => {
  if (!url) return '';
  const driveMatch = url.match(/drive\.google\.com\/(?:file\/d\/|drive\/folders\/|open\?id=)([a-zA-Z0-9_-]+)/);
  if (driveMatch && driveMatch[1]) {
    return `https://drive.google.com/thumbnail?id=${driveMatch[1]}&sz=w500-h500`;
  }
  return url;
};

function PartnerCard({ partner }: { partner: PartnerItem }) {
  const [imgError, setImgError] = useState(false);
  const logoSrc = getAvatarUrl(partner.logo);

  return (
    <div className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-orange-500/50 hover:bg-zinc-900/90 transition-all duration-300 shadow-xl hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/5">
      <div>
        {/* Header with Logo / Avatar and Badge */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="relative h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-2xl bg-zinc-950/80 border border-zinc-800 p-1 flex items-center justify-center overflow-hidden shadow-inner">
            {logoSrc && !imgError ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoSrc}
                alt={partner.name}
                onError={() => setImgError(true)}
                className="h-full w-full object-contain p-0.5"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900 text-orange-400 font-bold font-mono text-base">
                {partner.name.charAt(0)}
              </div>
            )}
          </div>

          <span className="text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30">
            {partner.type}
          </span>
        </div>

        {/* Partner Name & Description */}
        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
          {partner.name}
        </h3>

        {partner.description && (
          <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
            {partner.description}
          </p>
        )}
      </div>

      {/* Action Links & Socials */}
      <div className="mt-6 pt-4 border-t border-zinc-800/80 space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          {partner.url && (
            <a
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-orange-500 hover:text-white text-xs font-semibold text-zinc-300 transition-colors"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>Website</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          )}

          {partner.linktree && (
            <a
              href={partner.linktree}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 hover:text-white text-xs font-semibold text-emerald-400 border border-emerald-500/20 transition-colors"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>Linktree</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>

        {/* Social Icons Strip */}
        {partner.socials && Object.keys(partner.socials).length > 0 && (
          <div className="flex items-center gap-1.5 pt-1 flex-wrap">
            {Object.entries(partner.socials).map(([key, url]) => (
              <a
                key={key}
                href={url as string}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${partner.name} ${key}`}
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-950/80 text-zinc-400 hover:bg-orange-500 hover:text-white border border-zinc-800/80 transition-colors active:scale-95"
              >
                {getSocialIcon(key)}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SponsorsSection() {
  const { sponsors, swags, chapter, currentEvent } = communityData;
  const allPartners = [
    ...(currentEvent.communityPartners || []),
    ...(currentEvent.collaborationPartners || []),
  ];

  return (
    <section id="sponsors" className="py-16 sm:py-24 md:py-28 2xl:py-36 bg-[#090b0e] text-white border-t border-zinc-800/80">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px]">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl 2xl:max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-400 mb-4">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Sponsors & Community Ecosystem</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-black tracking-tight leading-tight">
            Supported By Our Partners & Sponsors
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg 2xl:text-xl text-zinc-300">
            Our community meetups, venue arrangements, and open-source initiatives are made possible by Grafana Labs and our valued partners.
          </p>
        </div>

        {/* Primary Sponsor Card */}
        <div className="mt-12 sm:mt-16 max-w-3xl 2xl:max-w-4xl mx-auto">
          {sponsors.map((sponsor) => {
            const logoSrc = getAvatarUrl(sponsor.logo);
            return (
              <div
                key={sponsor.id}
                className="flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 shadow-xl hover:border-orange-500/50 transition-all duration-300"
              >
                <div className="relative h-20 w-44 sm:h-24 sm:w-48 shrink-0 bg-white/5 rounded-2xl p-3.5 flex items-center justify-center border border-zinc-800">
                  {logoSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={logoSrc}
                      alt={sponsor.name}
                      className="object-contain max-h-14 sm:max-h-16 w-auto"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="font-bold text-white text-lg">{sponsor.name}</span>
                  )}
                </div>
                <div className="space-y-2.5 text-center sm:text-left flex-1">
                  <div className="inline-block rounded-full bg-orange-500/20 px-3 py-0.5 text-xs font-semibold text-orange-400 border border-orange-500/30">
                    {sponsor.tier}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">{sponsor.name}</h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                    {sponsor.description}
                  </p>

                  {/* Sponsor Links & Socials */}
                  <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <a
                      href={sponsor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-orange-500/20 hover:bg-orange-500 hover:text-white text-xs font-semibold text-orange-400 border border-orange-500/30 transition-colors"
                    >
                      <Globe className="h-3.5 w-3.5" />
                      <span>Official Website</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>

                    {sponsor.socials && (
                      <div className="flex items-center gap-1.5 pl-1">
                        {Object.entries(sponsor.socials).map(([key, url]) => (
                          <a
                            key={key}
                            href={url as string}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${sponsor.name} ${key}`}
                            className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-950 text-zinc-400 hover:bg-orange-500 hover:text-white border border-zinc-800 transition-colors"
                          >
                            {getSocialIcon(key)}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Community & Collaboration Partners Bento Grid */}
        {allPartners.length > 0 && (
          <div className="mt-14 sm:mt-20">
            <div className="text-center mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-white">Community & Collaboration Partners</h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">Connect with our ecosystem partners across their social channels and Linktree hubs.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
              {allPartners.map((partner) => (
                <PartnerCard key={partner.id} partner={partner} />
              ))}
            </div>
          </div>
        )}

        {/* Swag Showcase Grid with Grot */}
        <div className="mt-20 sm:mt-28 mx-auto max-w-4xl 2xl:max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-400 mb-4">
            <Gift className="h-3.5 w-3.5" />
            <span>Attendee Goodies & Swags</span>
          </div>
          <h3 className="text-xl sm:text-3xl font-black text-white">
            Win Exclusive Grafana & Grot Merchandise
          </h3>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-zinc-300 max-w-xl mx-auto">
            Participate in our interactive live quizzes, trivia, and community demos to take home official Grafana and Grot mascot swag!
          </p>

          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 text-left">
            {swags.map((swag) => (
              <div
                key={swag.id}
                className="group p-5 sm:p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 shadow-md hover:border-orange-500/40 hover:bg-zinc-900/80 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 group-hover:scale-110 transition-transform">
                      {swag.id === 'swag-plushie' ? (
                        <GrotMascot className="h-7 w-7" animate={false} />
                      ) : (
                        <Sparkles className="h-5 w-5" />
                      )}
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-white">{swag.name}</h4>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                    {swag.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsor CTA Box */}
        <div className="mt-14 sm:mt-18 text-center">
          <p className="text-xs sm:text-sm text-zinc-400 mb-4">
            Interested in sponsoring, providing venue, or hosting a future Grafana & Friends meetup in Mumbai?
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
