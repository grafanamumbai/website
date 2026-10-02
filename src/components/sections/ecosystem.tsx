import communityData from '@/data';
import TopicCard from '@/components/topic-card';
import Chapter from './chapter';

// One tint per card, cycling if more topics are added.
const tints = ['bg-lilac', 'bg-butter', 'bg-sky', 'bg-sage'];

export default function EcosystemSection({ n }: { n?: string }) {
  const { tracks, socials } = communityData;

  return (
    <Chapter
      id="tracks"
      n={n}
      label="Topics"
      title="What we talk about"
      intro="Four areas come up at almost every meetup. Hover a card (or tap it) to see what we cover."
    >
      <div className="grid gap-7 sm:grid-cols-2">
        {tracks.map((track, i) => (
          <TopicCard
            key={track.id}
            letter={String.fromCharCode(97 + i)}
            title={track.title}
            tagline={track.tagline}
            description={track.description}
            highlights={track.highlights}
            tools={track.technologies}
            tint={tints[i % tints.length]}
          />
        ))}
      </div>

      <p className="mt-12 text-lg">
        Got something for one of these?{' '}
        <a href={socials.cfp} target="_blank" rel="noopener noreferrer" className="link font-medium">
          Send us a talk proposal
        </a>
        .
      </p>
    </Chapter>
  );
}
