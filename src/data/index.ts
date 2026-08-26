import rawData from './community-data.json';
import speakersData from './speakers.json';
import teamData from './team.json';

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

export interface CurrentEvent {
  hasUpcomingEvent: boolean;
  title: string;
  edition: string;
  theme: string;
  date: string;
  time: string;
  targetDateISO: string;
  eventType?: string;
  communityPartners?: { id: string; name: string; type: string; }[];
  collaborationPartners?: { id: string; name: string; type: string; }[];
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
  company: string;
  topic: string;
  bio: string;
  avatar: string;
  socials: Record<string, string>;
  featured?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  socials: Record<string, string>;
}

export interface Sponsor {
  id: string;
  name: string;
  tier: string;
  logo: string;
  url: string;
  description: string;
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
  speakers: speakersData,
  coreTeam: teamData.coreTeam,
  volunteers: teamData.volunteers
} as CommunityData;

export default communityData;
