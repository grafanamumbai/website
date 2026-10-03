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

  // Number and background follow what is actually rendered, so hidden sections never leave gaps and
  // cream/sand always alternate. (JSX expressions run top to bottom, and `&&` skips the call when a section is hidden.)
  let count = 0;
  const sec = () => ({
    n: String(++count).padStart(2, '0'),
    tone: count % 2 === 1 ? ('paper' as const) : ('deep' as const),
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main" className="flex-1">
        <HeroSection />
        {!hasUpcomingEvent && <NextMeetupSection />}
        <AboutSection {...sec()} />
        {(hasUpcomingEvent || hasSpeakers) && <SpeakersSection {...sec()} />}
        {hasUpcomingEvent && <ScheduleSection {...sec()} />}
        <EcosystemSection {...sec()} />
        <GallerySection {...sec()} />
        <MascotGrotSection {...sec()} />
        <CoreTeamSection {...sec()} />
        {hasUpcomingEvent && <ContestsSection {...sec()} />}
        <SponsorsSection {...sec()} />
        <FaqSection {...sec()} />
      </main>
      <Footer />
    </div>
  );
}
