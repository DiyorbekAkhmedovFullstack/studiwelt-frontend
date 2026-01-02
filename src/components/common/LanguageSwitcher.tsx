import { useTranslation } from 'react-i18next';

const languages = [
    { code: 'de', label: 'DE', name: 'Deutsch' },
    { code: 'en', label: 'EN', name: 'English' },
];

export function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const currentLang = i18n.language?.substring(0, 2) || 'de';

    const toggleLanguage = () => {
        const newLang = currentLang === 'de' ? 'en' : 'de';
        i18n.changeLanguage(newLang);
    };

    const currentLanguage = languages.find(l => l.code === currentLang) || languages[0];
    const otherLanguage = languages.find(l => l.code !== currentLang) || languages[1];

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-text-main hover:bg-page transition-colors"
            title={`Switch to ${otherLanguage.name}`}
            aria-label={`Current language: ${currentLanguage.name}. Click to switch to ${otherLanguage.name}`}
        >
            <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span>{currentLanguage.label}</span>
        </button>
    );
}
