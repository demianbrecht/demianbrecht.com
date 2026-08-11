export const SITE_TITLE = 'Demian Brecht';
export const SITE_TAGLINE =
  'Software, AI systems, and the occasional argument with an abstraction.';
export const SITE_DESCRIPTION =
  'Software, AI systems, and the occasional argument with an abstraction.';
export const AUTHOR = 'Demian Brecht';

export const NAV_LINKS = [
  { href: '/', label: 'Posts' },
  { href: '/archive', label: 'Archive' },
  { href: '/tags', label: 'Tags' },
  { href: '/about', label: 'About' },
];

/**
 * Giscus (GitHub Discussions-backed comments) config. Rendered on every post
 * when fully configured; the component renders nothing if any field is blank.
 * IDs are public-safe (they appear in the client bundle by design).
 */
export const GISCUS = {
  repo: 'demianbrecht/www',
  repoId: 'R_kgDOQ2Y_Gw',
  category: 'Announcements',
  categoryId: 'DIC_kwDOQ2Y_G84DDKZC',
  mapping: 'pathname',
  theme: 'dark',
  lang: 'en',
} as const;
