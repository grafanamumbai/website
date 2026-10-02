import communityData from '@/data';
import GalleryFigure from '@/components/gallery-figure';
import Chapter from './chapter';

// Deliberately uneven: spans, offsets and crops repeat every five photos.
const layout = [
  { span: 'md:col-span-5', ratio: 'aspect-[4/3]', offset: '' },
  { span: 'md:col-span-7', ratio: 'aspect-[4/3]', offset: 'md:mt-14' },
  { span: 'md:col-span-12', ratio: 'aspect-[2.1/1]', offset: '' },
  { span: 'md:col-span-7', ratio: 'aspect-[4/3]', offset: '' },
  { span: 'md:col-span-5', ratio: 'aspect-[16/10]', offset: 'md:mt-14' },
];

export default function GallerySection({ n }: { n?: string }) {
  const { gallery } = communityData;

  return (
    <Chapter
      id="gallery"
      n={n}
      label="Photos"
      tone="sky"
      grot="hat"
      title="From past meetups"
      intro="Real rooms, real people. Come say hello at the next one."
    >
      <div className="grid gap-x-8 gap-y-10 md:grid-cols-12">
        {gallery.map((item, i) => {
          const l = layout[i % layout.length];
          return (
            <GalleryFigure
              key={item.id}
              src={item.image}
              title={item.title}
              description={item.description}
              ratio={l.ratio}
              className={`${l.span} ${l.offset}`}
            />
          );
        })}
      </div>
    </Chapter>
  );
}
