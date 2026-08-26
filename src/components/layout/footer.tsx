import Link from 'next/link';
import Image from 'next/image';
import { Twitter, Linkedin, Github, Instagram, Slack, Mail, Heart, Calendar } from 'lucide-react';
import communityData from '@/data';

export default function Footer() {
  const { chapter, socials, currentEvent } = communityData;

  return (
    <footer className="border-t border-zinc-800/80 bg-[#0a0c10] text-zinc-300">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Chapter info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-8 w-8 rounded-lg bg-orange-500/10 p-1 ring-1 ring-orange-500/30">
                <Image 
                  src="/logo-header.png" 
                  alt={chapter.name} 
                  fill 
                  className="object-contain p-0.5" 
                />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                {chapter.name}
              </span>
            </Link>
            <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
              {chapter.description}
            </p>
            <div className="flex items-center gap-3 text-xs text-orange-400 font-medium">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Next Meetup: {currentEvent.date}</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Navigation</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><Link href="/#about" className="hover:text-orange-400 transition-colors">About Chapter</Link></li>
              <li><Link href="/#speakers" className="hover:text-orange-400 transition-colors">Speakers</Link></li>
              <li><Link href="/#schedule" className="hover:text-orange-400 transition-colors">Event Agenda</Link></li>
              <li><Link href="/#contests" className="hover:text-orange-400 transition-colors">Contests & Swags</Link></li>
              <li><Link href="/#team" className="hover:text-orange-400 transition-colors">Core Team</Link></li>
              <li><Link href="/badge" className="hover:text-orange-400 transition-colors">Badge Generator</Link></li>
            </ul>
          </div>

          {/* Col 3: Community & Socials */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Get Connected</h4>
            <p className="text-xs text-zinc-400">
              Join discussions, stay updated on upcoming meetups, and share your observability journey.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <a
                href={socials.meetup}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Meetup"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-orange-500/50 hover:bg-orange-500/10 transition-colors"
              >
                <Calendar className="h-4 w-4" />
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-orange-500/50 hover:bg-orange-500/10 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-orange-500/50 hover:bg-orange-500/10 transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-orange-500/50 hover:bg-orange-500/10 transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={socials.slack}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Slack"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-orange-500/50 hover:bg-orange-500/10 transition-colors"
              >
                <Slack className="h-4 w-4" />
              </a>
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-orange-500/50 hover:bg-orange-500/10 transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-1.5">
            <span>Made with</span>
            <Heart className="h-3.5 w-3.5 text-orange-500 fill-orange-500" />
            <span>by Grafana & Friends Mumbai Community</span>
          </div>
          <div className="flex items-center gap-4">
            <a href={`mailto:${chapter.email}`} className="hover:text-zinc-400 transition-colors flex items-center gap-1">
              <Mail className="h-3.5 w-3.5" />
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
