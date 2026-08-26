import Image from 'next/image';
import { Users, Code, PenTool, Database, Camera, Lightbulb } from 'lucide-react';
import {
  Linkedin,
  Twitter,
  Github,
  Globe,
  Youtube,
  Instagram,
  Facebook,
  MessageSquare,
  Link as LinkIcon
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
  return <LinkIcon className="h-4 w-4" />; // default icon
};

const roleIcons: Record<string, any> = {
  'Lead Organizer': Users,
  'Co-Organizer': Users,
  'Web & Tech Lead': Code,
  'Social Media & Outreach Lead': PenTool,
  'Infrastructure & Logistics': Database,
  'Community Coordinator': Lightbulb,
  'Design & Media Lead': Camera,
  'Community Advisor': Users,
  'Operations & Speaker Liaison': Lightbulb,
};

export default function CoreTeamSection() {
  const { coreTeam } = communityData;

  return (
    <section id="team" className="py-16 sm:py-24 md:py-28 2xl:py-36 bg-[#0a0c10] text-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px]">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl 2xl:max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-400 mb-4">
            <Users className="h-3.5 w-3.5" />
            <span>Community Core Team</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-black tracking-tight leading-tight">
            The People Behind the Scenes
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg 2xl:text-xl text-zinc-400">
            Meet the volunteers dedicated to bringing the Grafana community together in Mumbai.
          </p>
        </div>

        {/* Team Grid */}
        <div className="mt-12 sm:mt-16 md:mt-20 grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
          {coreTeam.map((member) => {
            const Icon = roleIcons[member.role] || Users;
            return (
              <div
                key={member.id}
                className="group relative flex w-full max-w-[280px] sm:max-w-[320px] flex-col items-center rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-orange-500/30 hover:bg-zinc-900 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/10"
              >
                {/* Image Container with Glow */}
                <div className="relative mb-5 sm:mb-6 h-28 w-28 sm:h-32 sm:w-32 rounded-full p-1 bg-gradient-to-br from-zinc-800 to-zinc-900 group-hover:from-orange-500/50 group-hover:to-yellow-500/50 transition-colors duration-500">
                  <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-zinc-950 bg-zinc-800">
                    <Image
                      src={member.avatar || '/placeholder-avatar.png'}
                      alt={member.name}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  {/* Floating Role Icon */}
                  <div className="absolute -bottom-2 -right-2 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border-4 border-[#0a0c10] bg-zinc-800 text-zinc-400 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="text-center w-full flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm font-semibold tracking-wide text-zinc-400">
                      {member.role}
                    </p>
                    {member.company && (
                      <p className="mt-1.5 text-xs sm:text-sm text-zinc-500">
                        {member.company}
                      </p>
                    )}
                  </div>

                  {/* Socials - dynamic mapping */}
                  {member.socials && Object.keys(member.socials).length > 0 && (
                    <div className="mt-4 pt-3 border-t border-zinc-800/60 w-full flex justify-center gap-2 flex-wrap">
                      {Object.entries(member.socials).map(([key, url]) => (
                        <a
                          key={key}
                          href={url as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name}'s ${key}`}
                          className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-zinc-800/80 text-zinc-300 hover:bg-orange-500 hover:text-white transition-colors active:scale-95"
                        >
                          {getSocialIcon(key)}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
