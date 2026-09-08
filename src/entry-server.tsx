import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { renderToString } from 'react-dom/server';
import { prerenderToNodeStream } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { createInstance, type Resource } from 'i18next';
import App from './App';
import { QueryProvider } from './providers/QueryProvider';
import { AuthProvider } from './contexts/AuthContext';
import { ProgressProvider } from './contexts/ProgressContext';
import {
  getAllLocalizedPublicPaths,
  getExplicitLocale,
  localePrefix,
  type SupportedLocale,
} from './lib/publicRoutes';

export const prerenderRoutes = getAllLocalizedPublicPaths();

async function createServerI18n(locale: SupportedLocale) {
  const localeDirectory = resolve(process.cwd(), 'public', 'locales', locale);
  const resources: Resource = { [locale]: {} };

  for (const filename of readdirSync(localeDirectory)) {
    if (!filename.endsWith('.json')) continue;
    const namespace = filename.replace(/\.json$/, '');
    const contents = readFileSync(resolve(localeDirectory, filename), 'utf8');
    resources[locale]![namespace] = JSON.parse(contents) as Record<string, unknown>;
  }

  const instance = createInstance();
  await instance.use(initReactI18next).init({
    lng: locale,
    fallbackLng: 'en',
    supportedLngs: ['en', 'de', 'ru'],
    defaultNS: 'common',
    resources,
    initImmediate: false,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
  return instance;
}

export async function render(url: string): Promise<string> {
  const locale = getExplicitLocale(url) ?? 'en';
  const basename = locale === 'en' ? undefined : localePrefix(locale);
  const serverI18n = await createServerI18n(locale);
  const application = (
    <I18nextProvider i18n={serverI18n}>
      <QueryProvider>
        <StaticRouter location={url} basename={basename}>
          <AuthProvider>
            <ProgressProvider>
              <div id="app-shell">
                <App />
              </div>
            </ProgressProvider>
          </AuthProvider>
        </StaticRouter>
      </QueryProvider>
    </I18nextProvider>
  );

  let renderError: unknown = null;
  const { prelude } = await prerenderToNodeStream(
    application,
    {
      onError(error) {
        renderError = error;
      },
    },
  );

  // The static pass resolves the active route's React.lazy module. Rendering
  // once more produces hydration-ready HTML without fallback/patch scripts.
  for await (const chunk of prelude) {
    // Drain the stream; the final HTML comes from the synchronous pass below.
    void chunk;
  }
  if (renderError) throw renderError;
  return renderToString(application);
}
