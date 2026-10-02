'use client';

import { useState } from 'react';
import { GrotMascot } from '@/components/icons';
import { cn } from '@/lib/utils';
import { driveThumb, githubAvatar } from '@/lib/social';

type PersonPhotoProps = {
  name: string;
  avatar?: string;
  /** Used as a second source if `avatar` fails to load */
  github?: string;
  className?: string;
};

// Squircle portrait. Falls back avatar -> GitHub photo -> Grot, so nobody gets a broken image.
export default function PersonPhoto({ name, avatar, github, className }: PersonPhotoProps) {
  const sources = [driveThumb(avatar) || githubAvatar(github), githubAvatar(github)].filter(
    (s, i, all) => s && all.indexOf(s) === i
  );
  const [attempt, setAttempt] = useState(0);
  const src = sources[attempt];

  return (
    <div className={cn('relative aspect-square overflow-hidden rounded-[18px] bg-paper-deep', className)}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={name}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setAttempt((a) => a + 1)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-end justify-center bg-brand/25 p-[8%]">
          <GrotMascot variant="smile" className="h-full w-full" animate={false} />
        </div>
      )}
    </div>
  );
}
