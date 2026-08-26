'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Twitter, Linkedin, Github, Instagram, Slack, Calendar, Mic, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import communityData from '@/data';

export default function JoinPage() {
  const { chapter, socials } = communityData;

  const socialLinks = [
    {
      name: 'Meetup Community Group',
      subtitle: 'Join to RSVP for all upcoming in-person & virtual meetups',
      icon: <Calendar className="h-5 w-5 text-white" />,
      href: socials.meetup,
    },
    {
      name: 'LinkedIn Chapter Page',
      subtitle: 'Professional updates, speaker announcements, and recaps',
      icon: <Linkedin className="h-5 w-5 text-white" />,
      href: socials.linkedin,
    },
    {
      name: 'Twitter / X (@grafanamumbai)',
      subtitle: 'Live event updates, memes, and community spotlights',
      icon: <Twitter className="h-5 w-5 text-white" />,
      href: socials.twitter,
    },
    {
      name: 'Official Grafana Slack (#grafana-mumbai)',
      subtitle: 'Chat directly with organizers and observability engineers',
      icon: <Slack className="h-5 w-5 text-white" />,
      href: socials.slack,
    },
    {
      name: 'Instagram (@grafanamumbai)',
      subtitle: 'Behind-the-scenes and event photo highlights',
      icon: <Instagram className="h-5 w-5 text-white" />,
      href: socials.instagram,
    },
    {
      name: 'GitHub Organization',
      subtitle: 'Contribute to our open-source website and community code',
      icon: <Github className="h-5 w-5 text-white" />,
      href: socials.github,
    },
    {
      name: 'Call for Speakers (CFP)',
      subtitle: 'Submit your talk proposal and speak at our next meetup',
      icon: <Mic className="h-5 w-5 text-white" />,
      href: socials.cfp,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#0c0e14] text-white">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center py-16 sm:py-24 px-4 relative overflow-hidden">
        {/* Decorative background glow */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 20%, rgba(244, 122, 32, 0.3) 0%, transparent 60%)',
          }}
        />

        <div className="w-full max-w-2xl relative z-10 flex flex-col items-center">
          <div className="mb-10 flex flex-col items-center text-center">
            <div className="relative mb-4 h-20 w-20 rounded-2xl bg-orange-500/10 p-3 ring-1 ring-orange-500/30 shadow-xl">
              <Image 
                src="/logo-header.png" 
                alt="Grafana & Friends Mumbai" 
                fill 
                className="object-contain p-2" 
              />
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Connect With Us
            </h1>
            <p className="mt-3 text-sm sm:text-base text-zinc-300 max-w-md">
              Join the fastest growing observability & cloud-native community in Mumbai across all official platforms.
            </p>
          </div>

          <div className="w-full space-y-3.5">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 hover:border-orange-500/50 hover:bg-zinc-900 transition-all duration-200 shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/20 border border-orange-500/30 text-orange-400 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-200">
                    {link.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-orange-400 transition-colors">
                      {link.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      {link.subtitle}
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-zinc-500 group-hover:text-orange-400 group-hover:translate-x-1 transition-all duration-200 shrink-0 ml-2" />
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
