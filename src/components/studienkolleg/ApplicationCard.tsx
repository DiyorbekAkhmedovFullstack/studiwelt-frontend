import { useTranslation } from 'react-i18next';
import type { StudienkollegData } from '../../data/studienkollegData';
import { Ui } from '../../lib/icons';

const localeMap: Record<string, string> = {
  en: 'en-US',
  de: 'de-DE',
  ru: 'ru-RU',
};

function localizeDate(dateStr: string, lang: string): string {
  if (!/^[A-Z][a-z]{2}\s\d{1,2},\s\d{4}$/.test(dateStr)) return dateStr;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  try {
    return d.toLocaleDateString(localeMap[lang] || 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

type ApplicationCardProps = {
  application: StudienkollegData['application'];
};

export function ApplicationCard({ application }: ApplicationCardProps) {
  const { t, i18n } = useTranslation('studienkolleg');
  const isOpen = application.status === 'open';

  const methodLabel = application.method === 'assist' ? t('viaUniAssist') : t('directApplication');

  return (
    <div className="bg-surface rounded-[24px] shadow-card p-8 mb-8 border border-[rgba(0,0,0,0.02)]">
      <h2 className="font-serif text-2xl font-bold text-text-main mb-5">{t('application')}</h2>

      {/* Status Badge */}
      <div
        className={`p-3 rounded-lg text-center font-semibold text-sm mb-6 flex items-center justify-center gap-2 ${
          isOpen
            ? 'bg-[#EBF5EC] text-[#2D4A30]'
            : 'bg-gray-100 text-gray-600'
        }`}
      >
        {isOpen && <div className="w-2 h-2 bg-current rounded-full animate-pulse" />}
        {application.statusText}
      </div>

      {/* Application Details */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center py-3 border-b border-dashed border-[rgba(0,0,0,0.1)] text-sm">
          <span className="text-text-muted">{t('method')}</span>
          <span
            className={`font-semibold ${
              application.method === 'assist' ? 'text-[#D9A441]' : 'text-text-main'
            }`}
          >
            {methodLabel}
          </span>
        </div>
        <div className="flex justify-between items-center py-3 border-b border-dashed border-[rgba(0,0,0,0.1)] text-sm">
          <span className="text-text-muted">{t('deadlineWinter')}</span>
          <span className="font-semibold text-text-main">
            {localizeDate(application.winterDeadline, i18n.language)}
          </span>
        </div>
        <div className="flex justify-between items-center py-3 text-sm">
          <span className="text-text-muted">{t('deadlineSummer')}</span>
          <span className="font-semibold text-text-main">
            {localizeDate(application.summerDeadline, i18n.language)}
          </span>
        </div>
      </div>

      <a
        href={application.applicationUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-3.5 px-4 bg-text-main text-white rounded-xl font-semibold text-center transition-all duration-200 hover:bg-primary hover:-translate-y-0.5 shadow-[0_4px_12px_rgba(62,54,48,0.2)] flex items-center justify-center gap-2 mb-3"
      >
        {t('startApplication')}
        <Ui.ExternalLink size={16} />
      </a>
      <a
        href={application.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-3.5 px-4 bg-surface border border-[rgba(0,0,0,0.1)] text-text-main rounded-xl font-semibold text-center transition-all duration-200 hover:border-text-main flex items-center justify-center gap-2"
      >
        {t('officialWebsite')}
      </a>
    </div>
  );
}
