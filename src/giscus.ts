import { GISCUS } from './consts';

/** Structural shape of the giscus config; widened from the `as const` literal. */
export type GiscusConfig = {
  readonly repo: string;
  readonly repoId: string;
  readonly category: string;
  readonly categoryId: string;
  readonly mapping: string;
  readonly theme: string;
  readonly lang: string;
};

/** Fields that must be non-empty for the giscus widget to load. */
const REQUIRED_KEYS = ['repo', 'repoId', 'category', 'categoryId'] as const;

/**
 * Whether the giscus config is complete enough to render the widget. Guards
 * against a half-filled config emitting a broken/empty comment box.
 */
export function isGiscusConfigured(config: GiscusConfig = GISCUS): boolean {
  return REQUIRED_KEYS.every((key) => {
    const value = config[key];
    return typeof value === 'string' && value.trim().length > 0;
  });
}
