import Link from 'next/link';
import Image from 'next/image';
import {
  Twitter,
  Linkedin,
  Github,
  Instagram,
  Slack,
  Mail,
  Heart,
  Calendar,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  MapPin,
} from 'lucide-react';
import communityData from '@/data';
import { MeetupLogo, CncfIcon, GrotMascot } from '@/components/icons';

export default function Footer() {
  const { chapter, socials, currentEvent } = communityData;

  return (
    <footer className="border-t border-zinc-800/80 bg-[#07080b] text-zinc-300">
      <div className="mx-auto max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px] px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10 mb-12">
          
          {/* Col 1: Chapter info & Grot */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-full bg-orange-500/10 p-1 ring-1 ring-orange-500/30 overflow-hidden">
                <Image 
                  src="/grafana-logo.png" 
                  alt={chapter.name} 
                  fill 
                  className="object-cover" 
                />
              </div>
              <span className="text-base sm:text-lg font-bold tracking-tight text-white">
                {chapter.name}
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed">
              {chapter.description}
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-400 pt-1">
              <div className="h-4 w-4">
                <GrotMascot className="h-full w-full" animate={false} />
              </div>
              <span>Grafana & Friends Mumbai is powered by Grafana Labs.</span>
            </div>
          </div>

          {/* Col 2: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-white tracking-wider uppercase">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-400">
              <li><Link href="/#about" className="hover:text-orange-400 transition-colors">About Chapter</Link></li>
              <li><Link href="/#ecosystem" className="hover:text-orange-400 transition-colors">CNCF & Observability Stack</Link></li>
              <li><Link href="/#mascot" className="hover:text-orange-400 transition-colors">Meet Grot Mascot</Link></li>
              <li><Link href="/#speakers" className="hover:text-orange-400 transition-colors">Speakers & Talks</Link></li>
              <li><Link href="/#schedule" className="hover:text-orange-400 transition-colors">Schedule & Agenda</Link></li>
              <li><Link href="/#contests" className="hover:text-orange-400 transition-colors">Contests & Swag</Link></li>
              <li><Link href="/#team" className="hover:text-orange-400 transition-colors">Team & Volunteers</Link></li>
              <li><Link href="/#faq" className="hover:text-orange-400 transition-colors">FAQ</Link></li>
              <li><Link href="/badge" className="hover:text-orange-400 transition-colors">Badge Generator</Link></li>
            </ul>
          </div>

          {/* Col 3: Community & Socials */}
          <div className="space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-white tracking-wider uppercase">
              Connect With Us
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Join discussions, stay updated on upcoming meetups, and share your observability journey.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <a
                href={socials.meetup}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Meetup"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-orange-500/50 hover:bg-orange-500/10 transition-colors active:scale-95"
              >
                <MeetupLogo className="h-4 w-4" />
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-orange-500/50 hover:bg-orange-500/10 transition-colors active:scale-95"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-orange-500/50 hover:bg-orange-500/10 transition-colors active:scale-95"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-orange-500/50 hover:bg-orange-500/10 transition-colors active:scale-95"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={socials.slack}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Slack"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-orange-500/50 hover:bg-orange-500/10 transition-colors active:scale-95"
              >
                <Slack className="h-4 w-4" />
              </a>
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-orange-500/50 hover:bg-orange-500/10 transition-colors active:scale-95"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Legal & Trademark Disclosure Bar */}
        <div className="pt-6 border-t border-zinc-800/60 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500 text-center md:text-left">
          <div className="space-y-1">
            <p>
              Grafana is a registered trademark of Grafana Labs. CNCF and Prometheus are registered trademarks of The Linux Foundation.
            </p>
            <p>
              Grafana & Friends Mumbai is an independent open-source community chapter.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 flex-wrap shrink-0">
            <a href={`mailto:${chapter.email}`} className="hover:text-zinc-400 transition-colors flex items-center gap-1">
              <Mail className="h-3 w-3" />
              <span>{chapter.email}</span>
            </a>
            <span>•</span>
            <Link href="https://grafana.com/events/events-code-of-conduct/" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 transition-colors">
              Code of Conduct
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
