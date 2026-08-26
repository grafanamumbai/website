'use client';

import Image from 'next/image';
import {
  Users2,
  Linkedin,
  Twitter,
  Github,
  Heart,
  Briefcase,
  ShieldCheck,
  HeartHandshake,
} from 'lucide-react';
import communityData from '@/data';

export default function CoreTeamSection() {
  const { coreTeam, volunteers } = communityData;

  return (
    <section id="team" className="py-16 sm:py-24 md:py-28 2xl:py-36 bg-[#0a0c10] text-white border-t border-zinc-800/80">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px]">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl 2xl:max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-400 mb-4">
            <Users2 className="h-3.5 w-3.5" />
            <span>Organizing Team</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-black tracking-tight leading-tight">
            Meet the Community Organizers
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg 2xl:text-xl text-zinc-300">
            The passionate volunteers and advocates making Grafana & Friends Mumbai happen.
          </p>
        </div>

        {/* Core Team Grid (2 cols mobile, 3 tablet, 4 desktop/2k/4k) */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {coreTeam.map((member) => (
            <div
              key={member.id}
              className="flex flex-col justify-between items-center text-center p-4 sm:p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 shadow-lg hover:border-orange-500/40 hover:bg-zinc-900/90 transition-all duration-300 group"
            >
              <div className="flex flex-col items-center w-full">
                {/* Avatar with ring */}
                <div className="relative mb-3.5 sm:mb-4 h-20 w-20 xs:h-24 xs:w-24 sm:h-28 sm:w-28 overflow-hidden rounded-full ring-2 ring-zinc-700 transition-all duration-300 group-hover:ring-orange-500 group-hover:scale-105 shadow-md">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <h3 className="text-sm xs:text-base sm:text-lg font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-1">
                  {member.name}
                </h3>

                <p className="text-[11px] sm:text-xs font-semibold text-orange-400 mt-0.5 line-clamp-1">
                  {member.role}
                </p>

                <p className="text-[10px] sm:text-xs text-zinc-400 mt-0.5 line-clamp-1">
                  {member.company}
                </p>
              </div>

              {member.socials.linkedin && (
                <div className="mt-4 pt-3 border-t border-zinc-800/60 w-full flex justify-center">
                  <a
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name}'s LinkedIn`}
                    className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-zinc-800/80 text-zinc-300 hover:bg-orange-500 hover:text-white transition-colors active:scale-95"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
