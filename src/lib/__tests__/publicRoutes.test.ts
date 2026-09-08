import { describe, expect, it } from 'vitest';
import { statesData } from '../../data/statesData';
import { getAllStudienkollegs } from '../../data/studienkollegData';
import {
  BASE_PUBLIC_PATHS,
  STATE_SLUGS,
  STUDIENKOLLEG_SLUGS,
  getAllLocalizedPublicPaths,
  getExplicitLocale,
  isIndexablePublicPath,
  localizePublicPath,
  normalizePathname,
  stripLocalePrefix,
} from '../publicRoutes';

describe('publicRoutes', () => {
  it('creates a unique URL for every public page in every locale', () => {
    const routes = getAllLocalizedPublicPaths();

    expect(routes).toHaveLength(BASE_PUBLIC_PATHS.length * 3);
    expect(new Set(routes).size).toBe(routes.length);
    expect(routes).toContain('/c-test-studienkolleg');
    expect(routes).toContain('/de/c-test-studienkolleg');
    expect(routes).toContain('/ru/c-test-studienkolleg');
  });

  it('keeps the prerender inventory aligned with the content data', () => {
    expect([...STATE_SLUGS].sort()).toEqual(Object.keys(statesData).sort());
    expect([...STUDIENKOLLEG_SLUGS].sort()).toEqual(
      getAllStudienkollegs().map(({ slug }) => slug).sort(),
    );
  });

  it('moves indexable routes between locale-specific URLs', () => {
    expect(localizePublicPath('/state/bavaria', 'de')).toBe('/de/state/bavaria');
    expect(localizePublicPath('/de/state/bavaria/', 'ru')).toBe('/ru/state/bavaria');
    expect(localizePublicPath('/ru', 'en')).toBe('/');
  });

  it('normalizes locale prefixes and trailing slashes for lookup', () => {
    expect(getExplicitLocale('/de/application')).toBe('de');
    expect(getExplicitLocale('/application')).toBeNull();
    expect(stripLocalePrefix('/ru/studienkolleg/munich')).toBe('/studienkolleg/munich');
    expect(normalizePathname('/fsp///')).toBe('/fsp');
    expect(isIndexablePublicPath('/de/fsp/')).toBe(true);
    expect(isIndexablePublicPath('/de/not-a-page')).toBe(false);
  });
});
