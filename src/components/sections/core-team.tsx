'use client';

import Image from 'next/image';
import { Linkedin, Twitter, Github, Users, Heart } from 'lucide-react';
import communityData from '@/data';

export default function CoreTeamSection() {
  const { coreTeam, volunteers } = communityData;

  return (
    <section id="team" className="py-20 md:py-28 bg-[#0a0c10] text-white border-t border-zinc-800/80">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-400 mb-4">
            <Users className="h-3.5 w-3.5" />
            <span>Organizing Team</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Meet the Community Organizers
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-300">
            The passionate team of volunteers and community advocates making Grafana & Friends Mumbai happen.
          </p>
        </div>

        {/* Core Team Grid */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {coreTeam.map((member) => (
            <div
              key={member.id}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 shadow-md hover:border-orange-500/40 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 group"
            >
              <div className="relative mb-4 h-28 w-28 overflow-hidden rounded-full ring-2 ring-zinc-700 transition-all duration-300 group-hover:ring-orange-500 group-hover:scale-105">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                {member.name}
              </h3>

              <p className="text-xs font-semibold text-orange-400 mt-1">
                {member.role}
              </p>

              <p className="text-xs text-zinc-400 mt-0.5">
                {member.company}
              </p>

              {member.socials.linkedin && (
                <div className="mt-4">
                  <a
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name}'s LinkedIn`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 hover:bg-orange-500 hover:text-white transition-colors"
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
