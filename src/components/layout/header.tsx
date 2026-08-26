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
import { Menu, ArrowRight, Sparkles } from 'lucide-react';
import communityData from '@/data';

const navLinks = [
  { href: '/#about', label: 'About' },
  { href: '/#speakers', label: 'Speakers' },
  { href: '/#schedule', label: 'Schedule' },
  { href: '/#contests', label: 'Contests & Swag' },
  { href: '/#team', label: 'Team' },
  { href: '/#gallery', label: 'Gallery' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/badge', label: 'Badge' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { chapter, currentEvent } = communityData;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0e1117]/85 backdrop-blur-md transition-all duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Brand Logo & Name */}
        <Link 
          href="/" 
          className="group flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <div className="relative h-9 w-9 rounded-lg bg-orange-500/10 p-1 ring-1 ring-orange-500/30 transition-transform duration-300 group-hover:scale-105">
            <Image 
              src="/logo-header.png" 
              alt={chapter.name} 
              fill 
              className="object-contain p-0.5" 
            />
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
              {chapter.shortName}
              <span className="hidden sm:inline-block rounded-full bg-orange-500/20 px-2 py-0.5 text-[11px] font-semibold text-orange-400 border border-orange-500/30">
                Chapter
              </span>
            </span>
            <span className="hidden md:block text-[11px] text-zinc-400 font-medium">
              Powered by Grafana Labs
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-zinc-300 hover:text-orange-400 transition-colors py-1 relative group"
            >
              {link.label}
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full duration-200" />
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button 
            asChild 
            variant="ghost" 
            size="sm" 
            className="hidden sm:inline-flex text-zinc-300 hover:text-white hover:bg-zinc-800"
          >
            <Link href="/join">Join Community</Link>
          </Button>

          <Button 
            asChild 
            size="sm" 
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full shadow-lg shadow-orange-500/20 transition-all hover:scale-105"
          >
            <a 
              href={currentEvent.registration.rsvpUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5"
            >
              <span>RSVP Now</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </Button>

          {/* Mobile Sheet Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="lg:hidden border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:text-white hover:bg-zinc-800"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0e1117] border-zinc-800 text-white p-6">
              <SheetHeader className="text-left border-b border-zinc-800/80 pb-4">
                <SheetTitle asChild>
                  <Link 
                    href="/" 
                    className="flex items-center gap-3 text-lg font-bold text-white" 
                    onClick={() => setIsOpen(false)}
                  >
                    <Image src="/logo-header.png" alt={chapter.name} width={32} height={32} />
                    <span>{chapter.name}</span>
                  </Link>
                </SheetTitle>
                <SheetDescription className="text-xs text-zinc-400">
                  {chapter.tagline}
                </SheetDescription>
              </SheetHeader>
              
              <nav className="flex flex-col gap-4 mt-6 text-base font-medium">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-zinc-300 hover:text-orange-400 py-1 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="flex flex-col gap-3 mt-8 pt-6 border-t border-zinc-800/80">
                <Button 
                  asChild 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg h-11" 
                  onClick={() => setIsOpen(false)}
                >
                  <a href={currentEvent.registration.rsvpUrl} target="_blank" rel="noopener noreferrer">
                    RSVP on Meetup
                  </a>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full border-zinc-700 text-zinc-200 hover:bg-zinc-800 h-11" 
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/join">Join WhatsApp & Slack</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
