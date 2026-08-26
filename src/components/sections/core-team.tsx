'use client';

import { useState } from 'react';
import {
  Users,
  ShieldCheck,
  Heart,
  Sparkles,
  User,
  ArrowRight,
  ExternalLink,
  Linkedin,
  Twitter,
  Github,
  Globe,
  Instagram,
  Link as LinkIcon,
} from 'lucide-react';
import communityData, { TeamMember } from '@/data';
import { Button } from '@/components/ui/button';

const getSocialIcon = (key: string) => {
  const k = key.toLowerCase();
  if (k === 'linkedin') return <Linkedin className="h-3.5 w-3.5" />;
  if (k === 'twitter' || k === 'x') return <Twitter className="h-3.5 w-3.5" />;
  if (k === 'github') return <Github className="h-3.5 w-3.5" />;
  if (k === 'website' || k === 'web') return <Globe className="h-3.5 w-3.5" />;
  if (k === 'instagram' || k === 'insta') return <Instagram className="h-3.5 w-3.5" />;
  return <LinkIcon className="h-3.5 w-3.5" />;
};

function CoreLeaderCard({ member }: { member: TeamMember }) {
  const githubUrl = member.socials?.github;
  const initialAvatar = member.avatar || (githubUrl ? `https://github.com/${githubUrl.replace(/https?:\/\/github\.com\//, '').replace(/\/$/, '')}.png` : '');
  const [src, setSrc] = useState(initialAvatar);
  const [imgError, setImgError] = useState(false);

  const handleError = () => {
    if (githubUrl && !src.includes('github.com')) {
      const user = githubUrl.replace(/https?:\/\/github\.com\//, '').replace(/\/$/, '');
      setSrc(`https://github.com/${user}.png`);
    } else {
      setImgError(true);
    }
  };

  return (
    <div className="group relative flex flex-col items-center justify-between rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-6 sm:p-7 backdrop-blur-md transition-all duration-300 hover:border-orange-500/40 hover:bg-zinc-900/80 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/10">
      <div className="flex flex-col items-center text-center w-full">
        {/* Avatar with Glow Ring */}
        <div className="relative mb-4 h-24 w-24 sm:h-28 sm:w-28 rounded-full p-1 bg-gradient-to-br from-zinc-800 to-zinc-900 group-hover:from-orange-500/50 group-hover:to-yellow-500/50 transition-colors duration-500 shadow-xl">
          <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-zinc-950 bg-zinc-800 flex items-center justify-center">
            {src && !imgError ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt={member.name}
                onError={handleError}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-orange-400 font-bold text-xl font-mono">
                {member.name ? member.name.charAt(0) : <User className="h-8 w-8" />}
              </div>
            )}
          </div>
        </div>

        {/* Name & Role */}
        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
          {member.name}
        </h3>
        <p className="mt-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30">
          {member.role}
        </p>
        {member.company && (
          <p className="mt-1.5 text-xs text-zinc-400 line-clamp-1">
            {member.company}
          </p>
        )}
      </div>

      {/* Socials */}
      {member.socials && Object.keys(member.socials).length > 0 && (
        <div className="mt-4 pt-3 border-t border-zinc-800/60 w-full flex justify-center gap-1.5 flex-wrap">
          {Object.entries(member.socials).map(([key, url]) => (
            <a
              key={key}
              href={url as string}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name}'s ${key}`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-800/80 text-zinc-300 hover:bg-orange-500 hover:text-white transition-colors active:scale-95"
            >
              {getSocialIcon(key)}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function VolunteerCard({ member }: { member: TeamMember }) {
  const githubUrl = member.socials?.github;
  const initialAvatar = member.avatar || (githubUrl ? `https://github.com/${githubUrl.replace(/https?:\/\/github\.com\//, '').replace(/\/$/, '')}.png` : '');
  const [src, setSrc] = useState(initialAvatar);
  const [imgError, setImgError] = useState(false);

  const handleError = () => {
    if (githubUrl && !src.includes('github.com')) {
      const user = githubUrl.replace(/https?:\/\/github\.com\//, '').replace(/\/$/, '');
      setSrc(`https://github.com/${user}.png`);
    } else {
      setImgError(true);
    }
  };

  return (
    <div className="group relative flex items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/70 hover:border-orange-500/40 hover:bg-zinc-900/80 transition-all duration-300 shadow-md hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-500/5">
      <div className="flex items-center gap-3.5 min-w-0">
        {/* Compact Avatar */}
        <div className="relative h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-inner">
          {src && !imgError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={member.name}
              onError={handleError}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-orange-400 font-bold font-mono text-base">
              {member.name ? member.name.charAt(0) : <User className="h-5 w-5" />}
            </div>
          )}
        </div>

        {/* Member Details */}
        <div className="min-w-0">
          <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-orange-400 transition-colors truncate">
            {member.name}
          </h4>
          <p className="text-[11px] sm:text-xs text-orange-400 font-medium truncate">
            {member.role}
          </p>
          {member.company && (
            <p className="text-[10px] sm:text-[11px] text-zinc-400 truncate mt-0.5">
              {member.company}
            </p>
          )}
        </div>
      </div>

      {/* Social Strip */}
      {member.socials && Object.keys(member.socials).length > 0 && (
        <div className="flex items-center gap-1.5 shrink-0">
          {Object.entries(member.socials).map(([key, url]) => (
            <a
              key={key}
              href={url as string}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name}'s ${key}`}
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-950/80 text-zinc-400 hover:bg-orange-500 hover:text-white border border-zinc-800/80 transition-colors active:scale-95"
            >
              {getSocialIcon(key)}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CoreTeamSection() {
  const { coreTeam, volunteers, chapter } = communityData;
  const [filter, setFilter] = useState<'all' | 'core' | 'volunteers'>('all');

  const showCore = filter === 'all' || filter === 'core';
  const showVolunteers = filter === 'all' || filter === 'volunteers';

  return (
    <section id="team" className="py-16 sm:py-24 md:py-28 2xl:py-36 bg-[#090b0e] text-white border-t border-zinc-800/80">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px]">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl 2xl:max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-400 mb-4">
            <Users className="h-3.5 w-3.5" />
            <span>Community Team & Volunteers</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-black tracking-tight leading-tight">
            The People Behind the Scenes
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg 2xl:text-xl text-zinc-400">
            Meet the passionate organizers, advocates, and volunteers driving Mumbai&apos;s observability community.
          </p>

          {/* Filter Tabs */}
          <div className="mt-8 inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-zinc-900 border border-zinc-800/80">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              All Contributors ({coreTeam.length + volunteers.length})
            </button>
            <button
              onClick={() => setFilter('core')}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filter === 'core'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Core Organizers ({coreTeam.length})
            </button>
            <button
              onClick={() => setFilter('volunteers')}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filter === 'volunteers'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Community Volunteers ({volunteers.length})
            </button>
          </div>
        </div>

        {/* 1. Core Organizers Spotlight */}
        {showCore && (
          <div className="mt-12 sm:mt-16">
            <div className="text-center mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-white">Core Organizing Leadership</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {coreTeam.map((member) => (
                <CoreLeaderCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        )}

        {/* 2. Community Volunteers & Champions Wall */}
        {showVolunteers && volunteers.length > 0 && (
          <div className="mt-14 sm:mt-18">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-400 uppercase tracking-wider mb-1">
                <Heart className="h-3.5 w-3.5 text-orange-400" />
                <span>Community Champions & Volunteers</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">Event Operations & Community Advocates</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {volunteers.map((member) => (
                <VolunteerCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        )}

        {/* Volunteer Callout Banner */}
        <div className="mt-16 sm:mt-20 rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-6 sm:p-8 text-center max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">Want to join the team?</h4>
              <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">Help organize meetups, manage stage AV, design swag, or lead workshops.</p>
            </div>
          </div>
          <Button
            asChild
            variant="outline"
            className="shrink-0 border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white rounded-full px-6 h-10 text-xs sm:text-sm font-semibold"
          >
            <a href={`mailto:${chapter.email}?subject=Interested in volunteering for Grafana %26 Friends Mumbai`} className="flex items-center gap-2">
              <span>Join as Volunteer</span>
              <ArrowRight className="h-3.5 w-3.5 text-orange-400" />
            </a>
          </Button>
        </div>

      </div>
    </section>
  );
}
