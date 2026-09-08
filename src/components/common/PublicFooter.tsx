import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { normalizeLocale } from '../../lib/publicRoutes';

const COPY = {
  en: {
    summary: 'Focused German preparation for the Studienkolleg entrance exam.',
    guides: 'Preparation guides',
    ctest: 'Free C-Test practice',
    author: 'About the author',
    contact: 'Questions and support',
  },
  de: {
    summary: 'Gezielte Deutsch-Vorbereitung für die Studienkolleg-Aufnahmeprüfung.',
    guides: 'Ratgeber zur Vorbereitung',
    ctest: 'Kostenlose C-Test-Übung',
    author: 'Über den Autor',
    contact: 'Fragen und Support',
  },
  ru: {
    summary: 'Системная подготовка по немецкому к вступительному экзамену в Studienkolleg.',
    guides: 'Руководства по подготовке',
    ctest: 'Бесплатный C-Test',
    author: 'Об авторе',
    contact: 'Вопросы и поддержка',
  },
} as const;

export function PublicFooter() {
  const { t, i18n } = useTranslation('common');
  const locale = normalizeLocale(i18n.resolvedLanguage ?? i18n.language);
  const copy = COPY[locale];

  return (
    <footer className="border-t border-border bg-surface px-4 py-12 sm:px-6">
      <div className="mx-auto grid max-w-[1100px] gap-9 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Link to="/" className="font-serif text-xl font-black text-text-main">
            STUDIWELT
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-text-muted">{copy.summary}</p>
        </div>

        <nav aria-label={copy.guides}>
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-text-main">
            {copy.guides}
          </h2>
          <ul className="space-y-2.5 text-sm text-text-muted">
            <li><Link className="hover:text-primary" to="/c-test-studienkolleg">{copy.ctest}</Link></li>
            <li><Link className="hover:text-primary" to="/entrance-exam">{t('nav.entranceExam')}</Link></li>
            <li><Link className="hover:text-primary" to="/application">{t('nav.application')}</Link></li>
            <li><Link className="hover:text-primary" to="/fsp">{t('nav.fsp')}</Link></li>
            <li><Link className="hover:text-primary" to="/about-studienkolleg">{t('nav.aboutStudienkolleg')}</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-text-main">
            STUDIWELT
          </h2>
          <ul className="space-y-2.5 text-sm text-text-muted">
            <li><Link className="hover:text-primary" to="/about">{copy.author}</Link></li>
            <li><Link className="hover:text-primary" to="/register">{t('nav.signUp')}</Link></li>
            <li>
              <a className="hover:text-primary" href="mailto:support@studiwelt.com">
                {copy.contact}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-[1100px] border-t border-border pt-6 text-xs text-text-muted">
        © {new Date().getFullYear()} STUDIWELT
      </p>
    </footer>
  );
}
