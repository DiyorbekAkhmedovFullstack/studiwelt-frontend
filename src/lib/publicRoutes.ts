export const SUPPORTED_LOCALES = ['en', 'de', 'ru'] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const STATE_SLUGS = [
  'bavaria',
  'baden-wurttemberg',
  'saarland',
  'rhineland-palatinate',
  'hesse',
  'thuringia',
  'saxony',
  'north-rhine-westphalia',
  'saxony-anhalt',
  'lower-saxony',
  'brandenburg',
  'berlin',
  'bremen',
  'mecklenburg-vorpommern',
  'schleswig-holstein',
  'hamburg',
] as const;

export const STUDIENKOLLEG_SLUGS = [
  'munich',
  'berlin',
  'fu-berlin',
  'hamburg',
  'karlsruhe',
  'leipzig',
  'heidelberg',
  'halle',
  'darmstadt',
  'frankfurt',
  'hannover',
  'koethen',
] as const;

export const STATIC_PUBLIC_PATHS = [
  '/',
  '/about',
  '/about-studienkolleg',
  '/application',
  '/entrance-exam',
  '/fsp',
  '/c-test-studienkolleg',
] as const;

export const BASE_PUBLIC_PATHS = [
  ...STATIC_PUBLIC_PATHS,
  ...STATE_SLUGS.map((slug) => `/state/${slug}`),
  ...STUDIENKOLLEG_SLUGS.map((slug) => `/studienkolleg/${slug}`),
];

const basePublicPathSet = new Set<string>(BASE_PUBLIC_PATHS);

export function normalizeLocale(language?: string): SupportedLocale {
  const shortLanguage = language?.slice(0, 2).toLowerCase();
  return SUPPORTED_LOCALES.includes(shortLanguage as SupportedLocale)
    ? (shortLanguage as SupportedLocale)
    : 'en';
}

export function localePrefix(locale: SupportedLocale): string {
  return locale === 'en' ? '' : `/${locale}`;
}

export function getExplicitLocale(pathname: string): SupportedLocale | null {
  const match = pathname.match(/^\/(de|ru)(?:\/|$)/);
  return match ? (match[1] as SupportedLocale) : null;
}

export function stripLocalePrefix(pathname: string): string {
  const stripped = pathname.replace(/^\/(?:de|ru)(?=\/|$)/, '');
  return stripped || '/';
}

export function normalizePathname(pathname: string): string {
  const withoutTrailingSlash = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return withoutTrailingSlash || '/';
}

export function localizePublicPath(
  pathname: string,
  locale: SupportedLocale,
): string {
  const basePath = normalizePathname(stripLocalePrefix(pathname));
  return `${localePrefix(locale)}${basePath === '/' ? '' : basePath}` || '/';
}

export function isIndexablePublicPath(pathname: string): boolean {
  return basePublicPathSet.has(normalizePathname(stripLocalePrefix(pathname)));
}

export function getAllLocalizedPublicPaths(): string[] {
  return SUPPORTED_LOCALES.flatMap((locale) =>
    BASE_PUBLIC_PATHS.map((pathname) => localizePublicPath(pathname, locale)),
  );
}

export function getNamespacesForPath(pathname: string): string[] {
  const basePath = normalizePathname(stripLocalePrefix(pathname));
  const namespaces = new Set(['common']);

  if (basePath === '/') {
    namespaces.add('landing');
    namespaces.add('studienkolleg');
    namespaces.add('statesContent');
  } else if (basePath === '/about') {
    namespaces.add('about');
  } else if (basePath === '/about-studienkolleg') {
    namespaces.add('aboutStudienkolleg');
  } else if (basePath === '/application') {
    namespaces.add('application');
  } else if (basePath === '/entrance-exam') {
    namespaces.add('entranceExam');
  } else if (basePath === '/fsp') {
    namespaces.add('fsp');
  } else if (basePath.startsWith('/state/')) {
    namespaces.add('statePage');
    namespaces.add('statesContent');
  } else if (basePath.startsWith('/studienkolleg/')) {
    namespaces.add('studienkolleg');
  } else if (
    basePath === '/login' ||
    basePath === '/register' ||
    basePath.includes('password') ||
    basePath.includes('verify') ||
    basePath === '/mfa' ||
    basePath === '/registration-success' ||
    basePath === '/already-verified'
  ) {
    namespaces.add('auth');
  } else if (basePath === '/upgrade') {
    namespaces.add('upgrade');
  }

  return [...namespaces];
}
