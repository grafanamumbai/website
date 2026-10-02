import Image from 'next/image';
import communityData from '@/data';
import { cn } from '@/lib/utils';
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
      grot="hat"
      title="From past meetups"
      intro="Real rooms, real people. Come say hello at the next one."
    >
      <div className="grid gap-x-8 gap-y-10 md:grid-cols-12">
        {gallery.map((item, i) => {
          const l = layout[i % layout.length];
          return (
            <figure key={item.id} className={cn(l.span, l.offset)}>
              <div className={cn('relative overflow-hidden rounded-[4px] bg-paper-deep', l.ratio)}>
                <Image
                  src={item.image}
                  alt={`${item.title}. ${item.description}`}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 border-t border-rule pt-2">
                <span className="font-display text-lg font-medium tracking-[-0.01em]">{item.title}</span>
                <span className="label block">{item.description}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </Chapter>
  );
}
