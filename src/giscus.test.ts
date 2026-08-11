import { describe, expect, it } from 'vitest';
import { isGiscusConfigured, type GiscusConfig } from './giscus';
import { GISCUS } from './consts';

const complete: GiscusConfig = {
  repo: 'owner/repo',
  repoId: 'R_abc',
  category: 'Announcements',
  categoryId: 'DIC_abc',
  mapping: 'pathname',
  theme: 'dark',
  lang: 'en',
};

describe('isGiscusConfigured', () => {
  it('is true when all required identifiers are present', () => {
    expect(isGiscusConfigured(complete)).toBe(true);
  });

  it('treats the shipped config as configured', () => {
    expect(isGiscusConfigured(GISCUS)).toBe(true);
  });

  for (const key of ['repo', 'repoId', 'category', 'categoryId'] as const) {
    it(`is false when ${key} is empty`, () => {
      expect(isGiscusConfigured({ ...complete, [key]: '' })).toBe(false);
    });

    it(`is false when ${key} is whitespace only`, () => {
      expect(isGiscusConfigured({ ...complete, [key]: '   ' })).toBe(false);
    });
  }
});
