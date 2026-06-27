import { useTranslation } from 'react-i18next';
import { Icon } from '../../lib/icons';

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
            <Icon.Country className="w-4 h-4" />
            <span>{currentLanguage.label}</span>
        </button>
    );
}
