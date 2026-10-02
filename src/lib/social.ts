const labels: Record<string, string> = {
  linkedin: 'LinkedIn',
  twitter: 'X',
  x: 'X',
  github: 'GitHub',
  website: 'Website',
  web: 'Website',
  instagram: 'Instagram',
  insta: 'Instagram',
  youtube: 'YouTube',
  facebook: 'Facebook',
  slack: 'Slack',
  discord: 'Discord',
  meetup: 'Meetup',
  linktree: 'Linktree',
};

/** Human label for a social key from the JSON data, e.g. "twitter" -> "X". */
export const socialLabel = (key: string) =>
  labels[key.toLowerCase()] ?? key.charAt(0).toUpperCase() + key.slice(1);

/** Google Drive share links do not hotlink; rewrite them to the thumbnail endpoint. */
export const driveThumb = (url?: string) => {
  if (!url) return '';
  const m = url.match(/drive\.google\.com\/(?:file\/d\/|drive\/folders\/|open\?id=)([a-zA-Z0-9_-]+)/);
  return m?.[1] ? `https://drive.google.com/thumbnail?id=${m[1]}&sz=w500-h500` : url;
};

/** github.com/<user> -> avatar url */
export const githubAvatar = (githubUrl?: string) => {
  if (!githubUrl) return '';
  const user = githubUrl.replace(/https?:\/\/github\.com\//, '').replace(/\/$/, '');
  return user ? `https://github.com/${user}.png` : '';
};
