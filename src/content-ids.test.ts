import { describe, expect, it } from 'vitest';
import { assertUniqueFlatPostIds, flatPostId } from './content-ids';

describe('flat post IDs', () => {
  it('uses the basename for nested Markdown entries', () => {
    expect(flatPostId('series/example.mdx')).toBe('example');
    expect(flatPostId('other/example.md')).toBe('example');
  });

  it('rejects duplicate basenames from different source files', () => {
    expect(() => assertUniqueFlatPostIds([
      'first/example.mdx',
      'second/example.md',
    ])).toThrow(
      /duplicate flattened post ID.*example.*first\/example\.mdx.*second\/example\.md/i,
    );
  });

  it('accepts unique basenames', () => {
    expect(() => assertUniqueFlatPostIds([
      'first/one.mdx',
      'second/two.md',
    ])).not.toThrow();
  });
});
