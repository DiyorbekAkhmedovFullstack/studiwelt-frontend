import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import './index.css';
import i18n, { i18nReady } from './i18n';
import App from './App.tsx';
import { QueryProvider } from './providers/QueryProvider';
import { AuthProvider } from './contexts/AuthContext';
import { ProgressProvider } from './contexts/ProgressContext';
import {
  getExplicitLocale,
  getNamespacesForPath,
  isIndexablePublicPath,
  localePrefix,
  normalizeLocale,
} from './lib/publicRoutes';

const rawPathname = window.location.pathname;
const explicitLocale = getExplicitLocale(rawPathname);
const basename = explicitLocale ? localePrefix(explicitLocale) : undefined;

async function startApplication() {
  await i18nReady;

  const language = explicitLocale
    ?? (isIndexablePublicPath(rawPathname)
      ? 'en'
      : normalizeLocale(i18n.resolvedLanguage ?? i18n.language));

  await i18n.changeLanguage(language);
  await i18n.loadNamespaces(getNamespacesForPath(rawPathname));
  document.documentElement.lang = language;

  const application = (
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <QueryProvider>
          <BrowserRouter basename={basename}>
            <AuthProvider>
              <ProgressProvider>
                <div id="app-shell">
                  <App />
                </div>
              </ProgressProvider>
            </AuthProvider>
          </BrowserRouter>
        </QueryProvider>
      </I18nextProvider>
    </StrictMode>
  );

  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Missing #root element');

  if (rootElement.hasChildNodes()) {
    hydrateRoot(rootElement, application);
  } else {
    createRoot(rootElement).render(application);
  }
}

void startApplication();
