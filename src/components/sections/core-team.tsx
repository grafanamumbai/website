import communityData, { TeamMember } from '@/data';
import PersonPhoto from '@/components/person-photo';
import { socialLabel } from '@/lib/social';
import Chapter from './chapter';

function Links({ member, className }: { member: TeamMember; className?: string }) {
  const links = Object.entries(member.socials ?? {}).filter(([, url]) => url);
  if (links.length === 0) return null;
  return (
    <p className={className}>
      {links.map(([key, url]) => (
        <a
          key={key}
          href={url as string}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on ${socialLabel(key)}`}
          className="link mr-4 text-[0.9375rem]"
        >
          {socialLabel(key)}
        </a>
      ))}
    </p>
  );
}

export default function CoreTeamSection({ n }: { n?: string }) {
  const { coreTeam, volunteers } = communityData;

  return (
    <Chapter
      id="team"
      n={n}
      label="Team"
      grot="smile"
      title="The people behind it"
      intro="The organisers and volunteers who put these meetups together."
    >
      <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
        {coreTeam.map((m) => (
          <article key={m.id} className="border-t border-ink pt-6">
            <PersonPhoto name={m.name} avatar={m.avatar} github={m.socials?.github} className="w-36" />
            <h3 className="mt-5 font-display text-2xl font-semibold leading-tight tracking-[-0.01em]">{m.name}</h3>
            <p className="label mt-1.5">{m.role}</p>
            {m.company && <p className="mt-0.5 text-[0.9375rem] text-ink-soft">{m.company}</p>}
            <Links member={m} className="mt-3" />
          </article>
        ))}
      </div>

      {volunteers && volunteers.length > 0 && (
        <div className="mt-16">
          <h3 className="font-display text-2xl font-semibold tracking-[-0.01em]">Core Members</h3>
          <ul className="mt-5 border-t border-ink">
            {volunteers.map((m) => (
              <li
                key={m.id}
                className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-rule py-4"
              >
                <PersonPhoto name={m.name} avatar={m.avatar} github={m.socials?.github} className="w-14 !rounded-[12px]" />
                <div className="min-w-0 flex-1 basis-56">
                  <p className="font-display text-lg font-semibold leading-tight">{m.name}</p>
                  <p className="label mt-0.5">
                    {m.role}
                    {m.company ? ` · ${m.company}` : ''}
                  </p>
                </div>
                <Links member={m} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </Chapter>
  );
}
