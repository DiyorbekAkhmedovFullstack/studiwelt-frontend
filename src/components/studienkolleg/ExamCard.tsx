import { useTranslation } from 'react-i18next';
import type { StudienkollegData } from '../../data/studienkollegData';
import { Icon } from '../../lib/icons';

type ExamCardProps = {
  exam: StudienkollegData['exam'];
};

export function ExamCard({ exam }: ExamCardProps) {
  const { t } = useTranslation('studienkolleg');
  if (!exam.required) {
    return null;
  }

  return (
    <div className="bg-surface rounded-[24px] shadow-card p-8 border border-[rgba(0,0,0,0.02)]">
      <h2 className="font-serif text-2xl font-bold text-text-main mb-5">
        {t('entranceExam')}
      </h2>
      <p className="text-text-muted text-sm leading-relaxed mb-5">
        {exam.description}
      </p>

      {exam.nextDate && (
        <div className="flex justify-between items-center py-3 border-b border-dashed border-[rgba(0,0,0,0.1)] text-sm mb-6">
          <span className="text-text-muted">{t('nextDate')}</span>
          <span className="font-semibold text-text-main">{exam.nextDate}</span>
        </div>
      )}

      {exam.exampleTestsUrl && (
        <a
          href={exam.exampleTestsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 px-4 bg-surface border border-[rgba(0,0,0,0.1)] text-text-main rounded-xl font-semibold text-center transition-all duration-200 hover:border-text-main flex items-center justify-center gap-2"
        >
          <Icon.Documents size={16} />
          {t('exampleTests')}
        </a>
      )}
    </div>
  );
}
