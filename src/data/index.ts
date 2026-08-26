import rawData from './community-data.json';
import speakersData from './speakers.json';
import teamData from './team.json';
import sponsorsData from './sponsors.json';

export interface ChapterInfo {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  location: string;
  email: string;
  stats: {
    members: string;
    meetups: string;
    speakers: string;
    communityType: string;
  };
}

export interface SocialLinks {
  website: string;
  meetup: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  slack: string;
  github: string;
  cfp: string;
}

export interface EcosystemItem {
  id: string;
  name: string;
  category: string;
  status: string;
  badge: string;
  description: string;
  url: string;
  icon: string;
  svgUrl?: string;
}

export interface MascotTip {
  id: string;
  topic: string;
  tip: string;
}

export interface MascotInfo {
  name: string;
  title: string;
  bio: string;
  quote: string;
  tips: MascotTip[];
}

export interface PartnerItem {
  id: string;
  name: string;
  type: string;
  tier?: string;
  logo?: string;
  url?: string;
  linktree?: string;
  description?: string;
  socials?: Record<string, string | undefined>;
}

export interface CurrentEvent {
  hasUpcomingEvent: boolean;
  title: string;
  edition: string;
  theme: string;
  date: string;
  time: string;
  targetDateISO: string;
  eventType?: string;
  communityPartners?: PartnerItem[];
  collaborationPartners?: PartnerItem[];
  venue: {
    name: string;
    address: string;
    mapUrl: string;
  };
  registration: {
    isOpen: boolean;
    statusText: string;
    rsvpUrl: string;
    cfpUrl: string;
  };
}

export interface ScheduleItem {
  time: string;
  title: string;
  speaker: string;
  description: string;
  type: 'welcome' | 'keynote' | 'talk' | 'break' | 'workshop' | 'contest' | 'networking';
}

export interface Speaker {
  id: string;
  name: string;
  role: string;
  company?: string;
  topic?: string;
  bio?: string;
  avatar?: string;
  socials?: Record<string, string | undefined>;
  featured?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatar?: string;
  socials?: Record<string, string | undefined>;
}

export interface Sponsor {
  id: string;
  name: string;
  tier: string;
  logo: string;
  url: string;
  linktree?: string;
  description: string;
  socials?: Record<string, string | undefined>;
}

export interface SwagItem {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface ContestItem {
  id: string;
  title: string;
  icon: string;
  description: string;
  rules: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export interface CommunityData {
  chapter: ChapterInfo;
  socials: SocialLinks;
  mascot: MascotInfo;
  ecosystem: EcosystemItem[];
  currentEvent: CurrentEvent;
  schedule: ScheduleItem[];
  speakers: Speaker[];
  coreTeam: TeamMember[];
  volunteers: TeamMember[];
  sponsors: Sponsor[];
  swags: SwagItem[];
  contests: ContestItem[];
  gallery: GalleryItem[];
  faqs: FaqItem[];
}

export const communityData: CommunityData = {
  ...rawData,
  currentEvent: {
    ...rawData.currentEvent,
    communityPartners: (sponsorsData.communityPartners || []) as unknown as PartnerItem[],
    collaborationPartners: (sponsorsData.collaborationPartners || []) as unknown as PartnerItem[],
  },
  speakers: speakersData as unknown as Speaker[],
  coreTeam: (teamData.coreTeam || []) as unknown as TeamMember[],
  volunteers: (teamData.volunteers || []) as unknown as TeamMember[],
  sponsors: (sponsorsData.sponsors || []) as unknown as Sponsor[],
} as CommunityData;

export default communityData;
export { sponsorsData, speakersData, teamData };
