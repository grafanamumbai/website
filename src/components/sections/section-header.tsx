import { GrotMascot } from '@/components/icons';
import { cn } from '@/lib/utils';

type SectionHeaderProps = {
  icon: React.ReactNode;
  label: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  /** Grot pose shown as a sticker next to the header. Omit for none. */
  grot?: 'hat' | 'smile' | 'search' | 'trophy';
  side?: 'left' | 'right';
  className?: string;
};

// Grot sits beside the header on xl+ (room in the gutters), above the pill below that.
export default function SectionHeader({
  icon,
  label,
  title,
  subtitle,
  grot,
  side = 'right',
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('group relative', className)}>
      {grot && (
        <div
          aria-hidden
          className={cn(
            'pointer-events-none mx-auto mb-4 h-20 w-28 xl:absolute xl:top-1/2 xl:mx-0 xl:mb-0 xl:h-32 xl:w-44 xl:-translate-y-1/2',
            side === 'left' ? 'xl:left-0' : 'xl:right-0'
          )}
        >
          <div className="h-full w-full motion-safe:group-hover:animate-wiggle">
            <GrotMascot variant={grot} className="h-full w-full drop-shadow-xl" animate={false} />
          </div>
        </div>
      )}
      <div className="mx-auto max-w-3xl 2xl:max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-400 mb-4">
          {icon}
          <span>{label}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-black tracking-tight leading-tight">
          {title}
        </h2>
        <p className="mt-4 text-base md:text-lg 2xl:text-xl text-zinc-300 leading-relaxed">{subtitle}</p>
      </div>
    </div>
  );
}
