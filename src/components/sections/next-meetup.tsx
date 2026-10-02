import communityData from '@/data';
import { GrotMascot } from '@/components/icons';

// Shown between events (hasUpcomingEvent === false), in place of the hidden Schedule/Contests.
export default function NextMeetupSection() {
  const { socials } = communityData;

  return (
    <section id="next" className="grain mt-16 bg-butter text-ink sm:mt-20">
      <div className="mx-auto grid max-w-[1200px] items-center gap-6 px-5 py-12 sm:px-8 md:grid-cols-[1fr_auto] lg:px-10">
        <div>
          <p className="font-mono text-[0.8125rem]">Next meetup</p>
          <h2 className="mt-2 max-w-xl font-display text-3xl font-semibold leading-tight tracking-[-0.01em] text-ink sm:text-4xl">
            No date yet. Grot is still looking for a venue.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-ink/80">
            Join the Meetup group and you&apos;ll get the RSVP the moment it opens. Have something to show? Send us a talk and we&apos;ll build the agenda around it.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a href={socials.meetup} target="_blank" rel="noopener noreferrer" className="btn btn-ink">
              Get notified on Meetup <span aria-hidden>→</span>
            </a>
            <a
              href={socials.cfp}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline decoration-ink/40 underline-offset-4 hover:decoration-ink"
            >
              Submit a talk
            </a>
          </div>
        </div>
        <div aria-hidden className="mx-auto -mb-12 h-44 w-60 self-end md:mb-0 md:-mt-20 md:h-52 md:w-72">
          <GrotMascot variant="search" className="h-full w-full drop-shadow-[0_12px_14px_rgba(28,26,23,0.35)]" animate={false} />
        </div>
      </div>
    </section>
  );
}
