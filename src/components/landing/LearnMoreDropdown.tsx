import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Icon, Ui } from '../../lib/icons';

const itemIconClass =
  'w-[18px] h-[18px] text-text-muted transition-colors group-hover:text-primary';

const ApplicationIcon = () => <Icon.Application className={itemIconClass} />;
const EntranceExamIcon = () => <Icon.EntranceExam className={itemIconClass} />;
const FSPIcon = () => <Icon.Assessment className={itemIconClass} />;
const BookIcon = () => <Icon.Studienkolleg className={itemIconClass} />;

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <Ui.ChevronDown
    size={16}
    stroke={3}
    className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
  />
);

export function LearnMoreDropdown() {
  const { t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const close = () => setIsOpen(false);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-text-main font-semibold text-base transition-colors hover:text-primary"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {t('nav.learnMore')}
        <ChevronIcon isOpen={isOpen} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[90]"
            onClick={close}
            aria-hidden="true"
          />

          <div
            className="absolute top-[125%] right-0 w-[240px] bg-white rounded-2xl p-2 z-[100] transition-all duration-200 opacity-100 translate-y-0"
            style={{
              boxShadow: '0 10px 25px -5px rgba(160, 120, 92, 0.25), 0 8px 10px -6px rgba(160, 120, 92, 0.1)'
            }}
            role="menu"
          >
            <Link
              to="/about-studienkolleg"
              onClick={close}
              className="flex items-center gap-3 px-4 py-3 rounded-[10px] text-text-main font-medium text-[15px] transition-colors hover:bg-page hover:text-primary group whitespace-nowrap"
              role="menuitem"
            >
              <BookIcon />
              {t('nav.aboutStudienkolleg')}
            </Link>

            <Link
              to="/application"
              onClick={close}
              className="flex items-center gap-3 px-4 py-3 mt-1 rounded-[10px] text-text-main font-medium text-[15px] transition-colors hover:bg-page hover:text-primary group"
              role="menuitem"
            >
              <ApplicationIcon />
              {t('nav.application')}
            </Link>

            <Link
              to="/entrance-exam"
              onClick={close}
              className="flex items-center gap-3 px-4 py-3 mt-1 rounded-[10px] text-text-main font-medium text-[15px] transition-colors hover:bg-page hover:text-primary group"
              role="menuitem"
            >
              <EntranceExamIcon />
              {t('nav.entranceExam')}
            </Link>

            <Link
              to="/fsp"
              onClick={close}
              className="flex items-center gap-3 px-4 py-3 mt-1 rounded-[10px] text-text-main font-medium text-[15px] transition-colors hover:bg-page hover:text-primary group"
              role="menuitem"
            >
              <FSPIcon />
              {t('nav.fsp')}
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

