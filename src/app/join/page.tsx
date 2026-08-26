'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Twitter,
  Linkedin,
  Github,
  Instagram,
  Slack,
  Calendar,
  Mic2,
  ArrowRight,
  Sparkles,
  MessageSquare,
  Users2,
  Mail,
} from 'lucide-react';
import communityData from '@/data';
import { MeetupLogo } from '@/components/icons';

export default function JoinPage() {
  const { chapter, socials } = communityData;

  const socialLinks = [
    {
      name: 'Meetup Community Group',
      subtitle: 'Join to RSVP for all upcoming in-person & virtual meetups',
      icon: <MeetupLogo className="h-5 w-5 text-white" />,
      href: socials.meetup,
      badge: 'Main RSVP Hub',
    },
    {
      name: 'LinkedIn Chapter Page',
      subtitle: 'Professional updates, speaker announcements, and event recaps',
      icon: <Linkedin className="h-5 w-5 text-white" />,
      href: socials.linkedin,
      badge: 'Updates',
    },
    {
      name: 'Twitter / X (@grafanamumbai)',
      subtitle: 'Live event updates, memes, and community spotlights',
      icon: <Twitter className="h-5 w-5 text-white" />,
      href: socials.twitter,
      badge: 'Live News',
    },
    {
      name: 'Official Grafana Slack (#grafana-mumbai)',
      subtitle: 'Chat directly with organizers and observability engineers',
      icon: <Slack className="h-5 w-5 text-white" />,
      href: socials.slack,
      badge: 'Discussions',
    },
    {
      name: 'Instagram (@grafanamumbai)',
      subtitle: 'Behind-the-scenes and event photo highlights',
      icon: <Instagram className="h-5 w-5 text-white" />,
      href: socials.instagram,
      badge: 'Photos',
    },
    {
      name: 'GitHub Organization',
      subtitle: 'Contribute to our open-source website and community code',
      icon: <Github className="h-5 w-5 text-white" />,
      href: socials.github,
      badge: 'Open Source',
    },
    {
      name: 'Call for Speakers (CFP)',
      subtitle: 'Submit your talk proposal and speak at our next meetup',
      icon: <Mic2 className="h-5 w-5 text-white" />,
      href: socials.cfp,
      badge: 'CFP Open',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#090b0e] text-white">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center py-12 sm:py-20 md:py-28 px-4 sm:px-6 relative overflow-hidden">
        
        {/* Decorative background glow */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 20%, rgba(244, 104, 0, 0.3) 0%, transparent 60%)',
          }}
        />

        <div className="w-full max-w-2xl 2xl:max-w-3xl relative z-10 flex flex-col items-center">
          
          {/* Header Box */}
          <div className="mb-8 sm:mb-12 flex flex-col items-center text-center">
            <div className="relative mb-4 h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-orange-500/10 p-2 ring-1 ring-orange-500/30 shadow-xl overflow-hidden">
              <Image 
                src="/grafana-logo.png" 
                alt="Grafana & Friends Mumbai" 
                fill 
                className="object-cover" 
              />
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-400 mb-3">
              <Users2 className="h-3.5 w-3.5" />
              <span>Community Links</span>
            </div>
            <h1 className="text-2xl xs:text-3xl sm:text-5xl 2xl:text-6xl font-black tracking-tight text-white leading-tight">
              Connect With Us
            </h1>
            <p className="mt-2 text-xs sm:text-base text-zinc-300 max-w-md">
              Join the fastest growing observability & cloud-native community in Mumbai across all official channels.
            </p>
          </div>

          {/* Social Links List */}
          <div className="w-full space-y-3 sm:space-y-3.5">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 hover:border-orange-500/50 hover:bg-zinc-900 transition-all duration-200 shadow-lg"
              >
                <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/20 border border-orange-500/30 text-orange-400 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-200">
                    {link.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-orange-400 transition-colors truncate">
                        {link.name}
                      </h3>
                      {link.badge && (
                        <span className="hidden xs:inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700/60 shrink-0">
                          {link.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] sm:text-xs text-zinc-400 mt-0.5 line-clamp-1">
                      {link.subtitle}
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-500 group-hover:text-orange-400 group-hover:translate-x-1 transition-all duration-200 shrink-0 ml-2" />
              </a>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
