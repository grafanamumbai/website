import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/sections/hero';
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

  return (
    <div className="flex flex-col min-h-screen bg-[#090b0e]">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <EcosystemSection />
        <MascotGrotSection />
        {(hasUpcomingEvent || hasSpeakers) && <SpeakersSection />}
        {hasUpcomingEvent && <ScheduleSection />}
        <CoreTeamSection />
        {hasUpcomingEvent && <ContestsSection />}
        <SponsorsSection />
        <GallerySection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
