import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon, Ui } from '../../lib/icons';

const SUPPORTED_LANGUAGES = ['de', 'en', 'ru'];
const STORAGE_KEY = 'i18nextLng';

interface LanguageOption {
  code: string;
  label: string;
  nativeName: string;
}

const languages: LanguageOption[] = [
  { code: 'de', label: 'Deutsch', nativeName: 'German' },
  { code: 'en', label: 'English', nativeName: 'English' },
  { code: 'ru', label: 'Русский', nativeName: 'Russian' },
];

export function LanguagePromptBanner() {
  const { i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Check if user has already made a language choice
    const savedLanguage = localStorage.getItem(STORAGE_KEY);
    if (savedLanguage) {
      return;
    }

    // Check if browser language matches any supported language
    const browserLang = navigator.language?.slice(0, 2).toLowerCase();
    const isSupported = SUPPORTED_LANGUAGES.includes(browserLang);

    // Show banner only if browser language is not supported
    if (!isSupported) {
      // Small delay for smooth entrance after page load
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSelectLanguage = (langCode: string) => {
    setIsClosing(true);
    setTimeout(() => {
      i18n.changeLanguage(langCode);
      setIsVisible(false);
    }, 300);
  };

  const handleDismiss = () => {
    setIsClosing(true);
    setTimeout(() => {
      // Save current language to prevent banner from showing again
      localStorage.setItem(STORAGE_KEY, i18n.language || 'en');
      setIsVisible(false);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="language-prompt-title"
      aria-modal="false"
      className={`fixed bottom-4 left-4 right-4 sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-sm z-50
        transition-all duration-300 ease-out
        ${isClosing ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
    >
      <div className="bg-surface rounded-xl shadow-lg border border-border-soft p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
              <Icon.Country className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2
                id="language-prompt-title"
                className="text-base font-semibold text-text-main"
              >
                Choose your language
              </h2>
              <p className="text-sm text-text-muted">
                Wählen Sie Ihre Sprache
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="p-1.5 rounded-lg text-text-muted hover:text-text-main hover:bg-highlight transition-colors"
            aria-label="Dismiss language selection"
          >
            <Ui.Close className="w-5 h-5" />
          </button>
        </div>

        {/* Language options */}
        <div className="flex gap-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelectLanguage(lang.code)}
              className="flex-1 px-4 py-3 rounded-lg font-medium text-sm
                bg-page hover:bg-highlight border border-border-soft
                text-text-main hover:border-primary
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                min-h-[44px]"
            >
              <span className="block">{lang.label}</span>
              <span className="block text-xs text-text-muted mt-0.5">
                {lang.nativeName}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
