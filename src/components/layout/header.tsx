'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import {
  Menu,
  ArrowRight,
  Sparkles,
  Home,
  Info,
  Mic2,
  CalendarDays,
  Trophy,
  Users2,
  Camera,
  HelpCircle,
  Award,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';
import communityData from '@/data';

const navLinks = [
  { href: '/#about', label: 'About', icon: Info },
  { href: '/#speakers', label: 'Speakers', icon: Mic2 },
  { href: '/#schedule', label: 'Schedule', icon: CalendarDays },
  { href: '/#contests', label: 'Contests & Swag', icon: Trophy },
  { href: '/#team', label: 'Team', icon: Users2 },
  { href: '/#gallery', label: 'Gallery', icon: Camera },
  { href: '/#faq', label: 'FAQ', icon: HelpCircle },
  { href: '/badge', label: 'Badge', icon: Award },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { chapter, currentEvent, socials } = communityData;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-[#0e1117]/90 backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px] items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12">
        
        {/* Brand Logo & Name */}
        <Link 
          href="/" 
          className="group flex items-center gap-2.5 sm:gap-3.5 transition-opacity hover:opacity-90 shrink-0"
        >
          <div className="relative h-9 w-9 sm:h-11 sm:w-11 rounded-xl bg-orange-500/10 p-1.5 ring-1 ring-orange-500/30 transition-transform duration-300 group-hover:scale-105">
            <Image 
              src="/logo-header.png" 
              alt={chapter.name} 
              fill 
              className="object-contain p-0.5" 
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-sm sm:text-base md:text-lg font-bold tracking-tight text-white">
                {chapter.shortName}
              </span>
              <span className="rounded-full bg-orange-500/20 px-2 py-0.5 text-[10px] sm:text-xs font-semibold text-orange-400 border border-orange-500/30">
                Chapter
              </span>
            </div>
            <span className="text-[10px] sm:text-xs text-zinc-400 font-medium">
              Powered by Grafana Labs
            </span>
          </div>
        </Link>

        {/* Desktop Navigation (>= lg) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 px-3 py-2 text-zinc-300 hover:text-white hover:bg-zinc-800/60 rounded-lg transition-all"
              >
                <Icon className="h-4 w-4 text-orange-400/80" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA Action Buttons */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <Button 
            asChild 
            variant="ghost" 
            size="sm" 
            className="text-zinc-300 hover:text-white hover:bg-zinc-800 text-sm h-10 px-4 rounded-xl"
          >
            <Link href="/join">Join Community</Link>
          </Button>

          <Button 
            asChild 
            size="sm" 
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl h-10 px-5 shadow-lg shadow-orange-500/20 transition-all hover:scale-105 active:scale-95"
          >
            <a 
              href={currentEvent.registration.rsvpUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <span>RSVP Now</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>

        {/* Mobile Hamburger & Quick RSVP (< lg) */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button 
            asChild 
            size="sm" 
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg text-xs h-9 px-3.5 shadow-md"
          >
            <a 
              href={currentEvent.registration.rsvpUrl} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              RSVP
            </a>
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-9 w-9 border-zinc-800 bg-zinc-900 text-zinc-200 hover:text-white hover:bg-zinc-800 rounded-lg"
                aria-label="Open Navigation Menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm bg-[#0e1117] border-zinc-800 text-white p-6 flex flex-col justify-between overflow-y-auto">
              <div>
                <SheetHeader className="text-left border-b border-zinc-800/80 pb-4">
                  <SheetTitle asChild>
                    <Link 
                      href="/" 
                      className="flex items-center gap-3 text-lg font-bold text-white" 
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="relative h-8 w-8 rounded-lg bg-orange-500/10 p-1 ring-1 ring-orange-500/30">
                        <Image src="/logo-header.png" alt={chapter.name} fill className="object-contain" />
                      </div>
                      <span>{chapter.shortName}</span>
                    </Link>
                  </SheetTitle>
                  <SheetDescription className="text-xs text-zinc-400 mt-1">
                    {chapter.tagline}
                  </SheetDescription>
                </SheetHeader>
                
                {/* Nav Links with Lucide Icons */}
                <nav className="flex flex-col gap-1.5 mt-6">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-800/80 active:bg-orange-500/20 active:text-orange-400 transition-colors text-base font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-orange-400">
                          <Icon className="h-4 w-4" />
                        </div>
                        <span>{link.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Bottom Drawer Actions */}
              <div className="flex flex-col gap-3 pt-6 border-t border-zinc-800/80 mt-6">
                <Button 
                  asChild 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl h-12 text-base shadow-lg shadow-orange-500/25" 
                  onClick={() => setIsOpen(false)}
                >
                  <a href={currentEvent.registration.rsvpUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                    <span>RSVP for Meetup</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 rounded-xl h-11 text-sm" 
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/join" className="flex items-center justify-center gap-2">
                    <MessageSquare className="h-4 w-4 text-orange-400" />
                    <span>Join Community Channels</span>
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}
