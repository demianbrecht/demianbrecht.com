import { describe, expect, it } from 'vitest';
import { shareUrl, shareLinks } from './share';

const URL_ = 'https://demianbrecht.com/posts/my-post';
const TITLE = 'On Abstractions & Their Discontents';

describe('shareUrl', () => {
  it('builds a Bluesky compose intent with title and URL in the text', () => {
    const out = shareUrl('bluesky', URL_, TITLE);
    expect(out).toContain('https://bsky.app/intent/compose?text=');
    // Decoding the text param round-trips to "title url".
    const text = new URL(out).searchParams.get('text');
    expect(text).toBe(`${TITLE} ${URL_}`);
  });

  it('builds an X/Twitter intent with separate text and url params', () => {
    const out = shareUrl('twitter', URL_, TITLE);
    const params = new URL(out).searchParams;
    expect(out.startsWith('https://twitter.com/intent/tweet?')).toBe(true);
    expect(params.get('text')).toBe(TITLE);
    expect(params.get('url')).toBe(URL_);
  });

  it('builds a LinkedIn share-offsite link with only the url param', () => {
    const out = shareUrl('linkedin', URL_, TITLE);
    const params = new URL(out).searchParams;
    expect(out.startsWith('https://www.linkedin.com/sharing/share-offsite/?')).toBe(true);
    expect(params.get('url')).toBe(URL_);
  });

  it('percent-encodes special characters so the URL stays valid', () => {
    const tricky = 'a & b ? c = d #frag';
    const out = shareUrl('twitter', URL_, tricky);
    // No raw ampersand/question mark from the title leaks into the query string.
    expect(out).not.toContain('a & b');
    expect(new URL(out).searchParams.get('text')).toBe(tricky);
  });
});

describe('shareLinks', () => {
  it('returns the four targets in order, copy-link last and href-less', () => {
    const links = shareLinks(URL_, TITLE);
    expect(links.map((l) => l.key)).toEqual(['bluesky', 'twitter', 'linkedin', 'copy']);
    expect(links.at(-1)).toMatchObject({ key: 'copy', label: 'Copy link' });
    expect(links.at(-1)!.href).toBeUndefined();
  });

  it('gives every non-copy link an absolute https href', () => {
    for (const link of shareLinks(URL_, TITLE)) {
      if (link.key === 'copy') continue;
      expect(link.href).toMatch(/^https:\/\//);
    }
  });
});
