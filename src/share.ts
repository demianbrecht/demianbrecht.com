/**
 * Share-intent URL builders. Pure functions so the encoding/formatting is
 * unit-testable; the .astro component is a thin shell over these.
 */

export type ShareTarget = 'bluesky' | 'twitter' | 'linkedin';

/** A share link the component renders. `copy` has no href — it's handled in JS. */
export type ShareLink = {
  key: ShareTarget | 'copy';
  label: string;
  href?: string;
};

/**
 * Build the intent URL for a platform. `url` and `title` are the raw article
 * values; each platform's params are encoded here.
 */
export function shareUrl(target: ShareTarget, url: string, title: string): string {
  const u = encodeURIComponent(url);

  switch (target) {
    case 'bluesky':
      // Bluesky's composer takes a single free-text field; include title + URL.
      return `https://bsky.app/intent/compose?text=${encodeURIComponent(`${title} ${url}`)}`;
    case 'twitter':
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${u}`;
    case 'linkedin':
      // LinkedIn pulls title/description from the page's OpenGraph tags.
      return `https://www.linkedin.com/sharing/share-offsite/?url=${u}`;
  }
}

/** The full ordered set of share links for a post, including copy-link. */
export function shareLinks(url: string, title: string): ShareLink[] {
  return [
    { key: 'bluesky', label: 'Bluesky', href: shareUrl('bluesky', url, title) },
    { key: 'twitter', label: 'X', href: shareUrl('twitter', url, title) },
    { key: 'linkedin', label: 'LinkedIn', href: shareUrl('linkedin', url, title) },
    { key: 'copy', label: 'Copy link' },
  ];
}
