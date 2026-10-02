import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/sections/hero';
import NextMeetupSection from '@/components/sections/next-meetup';
import AboutSection from '@/components/sections/about';
import EcosystemSection from '@/components/sections/ecosystem';
import MascotGrotSection from '@/components/sections/mascot-grot';
import SpeakersSection from '@/components/sections/speakers';
import ScheduleSection from '@/components/sections/schedule';
import CoreTeamSection from '@/components/sections/core-team';
import ContestsSection from '@/components/sections/contests';
import SponsorsSection from '@/components/sections/sponsors';
import GallerySection from '@/components/sections/gallery';
import FaqSection from '@/components/sections/faq';
import communityData from '@/data';

export default function Home() {
  const { hasUpcomingEvent } = communityData.currentEvent;
  const hasSpeakers = communityData.speakers && communityData.speakers.length > 0;

  // Section numbers follow what is actually rendered, so hidden sections never leave gaps.
  // (JSX expressions are evaluated top to bottom, and `&&` skips the call when the section is hidden.)
  let count = 0;
  const num = () => String(++count).padStart(2, '0');

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main" className="flex-1">
        <HeroSection />
        {!hasUpcomingEvent && <NextMeetupSection />}
        <AboutSection n={num()} />
        {(hasUpcomingEvent || hasSpeakers) && <SpeakersSection n={num()} />}
        {hasUpcomingEvent && <ScheduleSection n={num()} />}
        <EcosystemSection n={num()} />
        <GallerySection n={num()} />
        <MascotGrotSection n={num()} />
        <CoreTeamSection n={num()} />
        {hasUpcomingEvent && <ContestsSection n={num()} />}
        <SponsorsSection n={num()} />
        <FaqSection n={num()} />
      </main>
      <Footer />
    </div>
  );
}
