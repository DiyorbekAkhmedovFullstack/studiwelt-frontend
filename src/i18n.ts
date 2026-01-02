import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        // Default and fallback language
        fallbackLng: 'en',

        // Supported languages
        supportedLngs: ['de', 'en'],

        // Default namespace
        defaultNS: 'common',

        // Namespaces to load
        ns: ['common', 'landing', 'aboutStudienkolleg', 'application'],

        // Backend configuration for loading translations
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },

        // Language detection options
        detection: {
            order: ['localStorage', 'navigator', 'htmlTag'],
            caches: ['localStorage'],
            lookupLocalStorage: 'i18nextLng',
        },

        // Interpolation settings
        interpolation: {
            escapeValue: false, // React already escapes values
        },

        // React-specific options - disable Suspense to avoid loading issues
        react: {
            useSuspense: false,
        },

        // Debug mode in development
        debug: import.meta.env.DEV,
    });

export default i18n;
