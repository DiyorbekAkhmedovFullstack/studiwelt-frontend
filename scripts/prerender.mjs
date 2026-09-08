import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const projectDirectory = process.cwd();
const distDirectory = resolve(projectDirectory, 'dist');
const prerenderDirectory = resolve(distDirectory, '.prerender');
const template = await readFile(resolve(distDirectory, 'index.html'), 'utf8');
const serverEntryUrl = pathToFileURL(resolve(projectDirectory, 'dist-ssr', 'entry-server.js'));
const { prerenderRoutes, render } = await import(serverEntryUrl.href);
const siteUrl = 'https://studiwelt.com';
const locales = ['en', 'de', 'ru'];
const lastModified = '2026-09-08';

await mkdir(prerenderDirectory, { recursive: true });

function localeForRoute(route) {
  const match = route.match(/^\/(de|ru)(?:\/|$)/);
  return match?.[1] ?? 'en';
}

function stripLocale(route) {
  return route.replace(/^\/(?:de|ru)(?=\/|$)/, '') || '/';
}

function localizeRoute(route, locale) {
  const baseRoute = stripLocale(route);
  return locale === 'en'
    ? baseRoute
    : `/${locale}${baseRoute === '/' ? '' : baseRoute}`;
}

function absoluteUrl(route) {
  return `${siteUrl}${route === '/' ? '' : route}`;
}

function filenameForRoute(route) {
  if (route === '/') return 'en-home.html';
  return `${route.slice(1).replaceAll('/', '--')}.html`;
}

function composeHtml(rendered, locale) {
  if (rendered.includes('<div hidden id="S:') || rendered.includes('<template id="B:')) {
    throw new Error('A public route rendered an unresolved Suspense fallback');
  }

  const appStart = rendered.indexOf('<div id="app-shell">');
  if (appStart === -1) {
    throw new Error('Could not find the server-rendered app shell');
  }

  const routeHead = rendered.slice(0, appStart).trim();
  const appMarkup = rendered.slice(appStart);

  return template
    .replace('<html lang="en">', `<html lang="${locale}">`)
    .replace(
      /<!-- SEO_HEAD_START:[\s\S]*?<!-- SEO_HEAD_END -->/,
      `<!-- SEO_HEAD_START -->\n    ${routeHead}\n    <!-- SEO_HEAD_END -->`,
    )
    .replace('<div id="root"></div>', `<div id="root">${appMarkup}</div>`);
}

const manifest = {};

for (const route of prerenderRoutes) {
  const locale = localeForRoute(route);
  const rendered = await render(route);
  const filename = filenameForRoute(route);
  await writeFile(resolve(prerenderDirectory, filename), composeHtml(rendered, locale));
  manifest[route] = filename;
}

const notFoundMarkup = await render('/__not-found__');
await writeFile(
  resolve(prerenderDirectory, 'not-found.html'),
  composeHtml(notFoundMarkup, 'en'),
);

await writeFile(
  resolve(prerenderDirectory, 'manifest.json'),
  JSON.stringify(manifest, null, 2),
);

const sitemapEntries = prerenderRoutes.map((route) => {
  const alternates = locales
    .map((locale) => {
      const localizedRoute = localizeRoute(route, locale);
      return `    <xhtml:link rel="alternate" hreflang="${locale}" href="${absoluteUrl(localizedRoute)}" />`;
    })
    .join('\n');
  const defaultRoute = localizeRoute(route, 'en');

  return [
    '  <url>',
    `    <loc>${absoluteUrl(route)}</loc>`,
    `    <lastmod>${lastModified}</lastmod>`,
    alternates,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl(defaultRoute)}" />`,
    '  </url>',
  ].join('\n');
});

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...sitemapEntries,
  '</urlset>',
  '',
].join('\n');

await writeFile(resolve(distDirectory, 'sitemap.xml'), sitemap);
await writeFile(
  resolve(distDirectory, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
);

console.log(`Prerendered ${prerenderRoutes.length} localized public pages.`);

// React's Node streaming renderer may retain internal handles after every
// route has finished. All output writes above are awaited, so exit cleanly
// instead of leaving CI builds waiting for those handles to expire.
process.exit(0);
