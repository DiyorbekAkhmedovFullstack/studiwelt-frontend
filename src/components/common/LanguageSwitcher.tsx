import { useTranslation } from 'react-i18next';
import { Icon, Ui } from '../../lib/icons';
import { Dropdown, type DropdownItem } from './Dropdown';

const languages = [
    { code: 'de', label: 'DE', name: 'Deutsch' },
    { code: 'en', label: 'EN', name: 'English' },
    { code: 'ru', label: 'RU', name: 'Русский' },
];

export function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const currentLang = i18n.language?.substring(0, 2) || 'de';
    const currentLanguage = languages.find(l => l.code === currentLang) || languages[0];

    const items: DropdownItem[] = languages.map(lang => ({
        label: lang.name,
        icon: lang.code === currentLanguage.code ? <Ui.Check className="w-[18px] h-[18px]" /> : undefined,
        onClick: () => i18n.changeLanguage(lang.code),
    }));

    const trigger = (
        <span
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-text-main hover:bg-page transition-colors"
            title="Change language"
            aria-label={`Current language: ${currentLanguage.name}. Change language`}
        >
            <Icon.Country className="w-4 h-4" />
            <span>{currentLanguage.label}</span>
            <Ui.ChevronDown className="w-3.5 h-3.5" />
        </span>
    );

    return <Dropdown trigger={trigger} items={items} align="right" width="w-[180px]" />;
}
