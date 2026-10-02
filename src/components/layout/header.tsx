'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import communityData from '@/data';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/#about', label: 'About' },
  { href: '/#speakers', label: 'Speakers' },
  { href: '/#schedule', label: 'Schedule' },
  { href: '/#tracks', label: 'Topics' },
  { href: '/#gallery', label: 'Photos' },
  { href: '/#team', label: 'Team' },
  { href: '/#contests', label: 'Contests' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/join', label: 'Community' },
];

// Sections only rendered while an event is upcoming (see page.tsx)
const eventOnly = ['/#schedule', '/#contests'];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState('');
  const pathname = usePathname();
  const { chapter, currentEvent, speakers } = communityData;

  const links = navLinks.filter((l) => {
    if (!currentEvent.hasUpcomingEvent && eventOnly.includes(l.href)) return false;
    if (l.href === '/#speakers' && !currentEvent.hasUpcomingEvent && speakers.length === 0) return false;
    return true;
  });

  // Highlight the section currently in view (home page only)
  useEffect(() => {
    if (pathname !== '/') return;
    const els = links
      .filter((l) => l.href.startsWith('/#'))
      .map((l) => document.getElementById(l.href.slice(2)))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-25% 0px -65% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const isActive = (href: string) =>
    href.startsWith('/#') ? active === href.slice(2) && pathname === '/' : pathname === href;

  const ctaLabel = currentEvent.hasUpcomingEvent ? 'RSVP' : 'Join on Meetup';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-rule bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <span className="relative h-10 w-10 overflow-hidden rounded-full ring-1 ring-ink/15">
            <Image src="/grafana-logo.png" alt="" fill sizes="40px" className="object-cover" />
          </span>
          <span className="font-display text-lg font-semibold leading-none tracking-[-0.01em]">
            {chapter.name}
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 xl:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'true' : undefined}
              className={cn(
                'border-b-2 py-1 text-[0.9375rem] transition-colors',
                isActive(link.href)
                  ? 'border-brand text-ink'
                  : 'border-transparent text-ink-soft hover:text-ink'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={currentEvent.registration.rsvpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary whitespace-nowrap !px-4 !py-2.5"
          >
            {currentEvent.hasUpcomingEvent ? (
              'RSVP'
            ) : (
              <>
                Join<span className="hidden sm:inline"> on Meetup</span>
              </>
            )}
          </a>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-md border border-rule xl:hidden"
              >
                <span className="h-0.5 w-5 bg-ink" />
                <span className="h-0.5 w-5 bg-ink" />
                <span className="h-0.5 w-3 self-start bg-ink ml-[10px]" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-[85vw] max-w-sm flex-col justify-between overflow-y-auto border-rule bg-paper p-6 text-ink">
              <div>
                <SheetHeader className="text-left">
                  <SheetTitle className="font-display text-2xl font-semibold text-ink">{chapter.name}</SheetTitle>
                  <SheetDescription className="text-ink-mute">{chapter.tagline}</SheetDescription>
                </SheetHeader>
                <nav aria-label="Mobile" className="mt-8 flex flex-col">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="border-t border-rule py-3.5 font-display text-2xl font-medium tracking-[-0.01em] text-ink hover:text-ember"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href="/badge"
                    onClick={() => setIsOpen(false)}
                    className="border-y border-rule py-3.5 font-display text-2xl font-medium tracking-[-0.01em] text-ink hover:text-ember"
                  >
                    Attendee badge
                  </Link>
                </nav>
              </div>
              <a
                href={currentEvent.registration.rsvpUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="btn btn-primary mt-8 w-full"
              >
                {ctaLabel} →
              </a>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
