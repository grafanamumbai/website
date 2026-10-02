import { ArrowRight, Mic2 } from 'lucide-react';
import communityData from '@/data';
import { GrotMascot, MeetupLogo } from '@/components/icons';

// Shown between events (hasUpcomingEvent === false): replaces the hidden Schedule/Contests with a clear next step.
export default function NextMeetupSection() {
  const { socials } = communityData;

  return (
    <section id="next" className="bg-[#0c0e14] py-12 sm:py-16 border-t border-zinc-800/80">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl 2xl:max-w-[1600px]">
        <div className="mx-auto max-w-5xl rounded-3xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 via-zinc-900/80 to-zinc-900 p-6 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <div className="h-40 w-52 sm:h-48 sm:w-64 shrink-0">
            <GrotMascot variant="search" className="h-full w-full drop-shadow-2xl" animate={false} />
          </div>
          <div className="text-center md:text-left">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-orange-400">Next meetup: scanning dashboards…</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">Grot is hunting for the next venue</h2>
            <p className="mt-3 text-base text-zinc-300 leading-relaxed">
              The next Mumbai meetup is being planned. Join the Meetup group to get the RSVP the moment it opens, or pitch a talk and help shape the agenda.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3">
              <a
                href={socials.meetup}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-orange-500 hover:bg-orange-600 px-6 h-11 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:scale-105"
              >
                <MeetupLogo className="h-4 w-4" />
                <span>Get notified on Meetup</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={socials.cfp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 px-6 h-11 text-sm font-semibold text-zinc-200 transition-colors"
              >
                <Mic2 className="h-4 w-4 text-orange-400" />
                <span>Submit a talk</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
