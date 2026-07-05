import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Icon, Ui } from '../../lib/icons';

const exploreLinks = [
  { to: '/about-studienkolleg', label: 'nav.aboutStudienkolleg', Icon: Icon.Studienkolleg },
  { to: '/application', label: 'nav.application', Icon: Icon.Application },
  { to: '/entrance-exam', label: 'nav.entranceExam', Icon: Icon.EntranceExam },
  { to: '/fsp', label: 'nav.fsp', Icon: Icon.Assessment },
] as const;

const TELEGRAM_URL = 'https://t.me/diorbekakhmedov';
const WHATSAPP_URL = 'https://wa.me/4917676389253';

const socialLinks = [
  { href: TELEGRAM_URL, label: 'telegram', Icon: Icon.Telegram },
  { href: WHATSAPP_URL, label: 'whatsapp', Icon: Icon.Whatsapp },
] as const;

export function Footer() {
  const { t } = useTranslation(['footer', 'common']);
  const year = new Date().getFullYear();

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="border-t border-[rgba(0,0,0,0.06)] bg-surface">
      <div className="max-w-[1100px] mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2 max-w-sm">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="font-serif text-xl font-bold text-text-main">Studiwelt</span>
            </Link>
            <p className="text-sm text-text-muted leading-relaxed">
              {t('footer:tagline')}
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-4">
              {t('footer:explore')}
            </h3>
            <ul className="space-y-3">
              {exploreLinks.map(({ to, label, Icon: LinkIcon }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="group flex items-center gap-2 text-sm text-text-main transition-colors hover:text-primary"
                  >
                    <LinkIcon className="w-4 h-4 text-text-muted transition-colors group-hover:text-primary" />
                    {t(`common:${label}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-4">
              {t('footer:company')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="group flex items-center gap-2 text-sm text-text-main transition-colors hover:text-primary"
                >
                  <Icon.User className="w-4 h-4 text-text-muted transition-colors group-hover:text-primary" />
                  {t('footer:aboutAuthor')}
                </Link>
              </li>
              {socialLinks.map(({ href, label, Icon: SocialIcon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm text-text-main transition-colors hover:text-primary"
                  >
                    <SocialIcon className="w-4 h-4 text-text-muted transition-colors group-hover:text-primary" />
                    {t(`footer:${label}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">{t('footer:rights', { year })}</p>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-1.5 text-xs font-medium text-text-muted transition-colors hover:text-primary"
          >
            {t('footer:backToTop')}
            <Ui.ArrowUp size={14} className="transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
