import { useTranslation } from 'react-i18next';
import { LandingNavbar } from '../components/landing/LandingNavbar';
import { SEO } from '../components/common/SEO';
import { Icon } from '../lib/icons';

const TELEGRAM_URL = 'https://t.me/diorbekakhmedov';
const WHATSAPP_URL = 'https://wa.me/4917676389253';

export function AboutPage() {
  const { t } = useTranslation('about');

  const sections = ['motivation', 'goal', 'vision'] as const;

  return (
    <div className="min-h-screen bg-page overflow-x-hidden">
      <SEO title={t('seoTitle')} description={t('seoDescription')} />

      <LandingNavbar />

      {/* Hero */}
      <section id="main-content" className="pt-32 md:pt-40 pb-16 md:pb-20 relative overflow-hidden">
        <div className="absolute top-24 -left-24 w-72 h-72 bg-primary/10 blur-[90px] rounded-full pointer-events-none" />
        <div className="absolute top-10 -right-20 w-64 h-64 bg-[#6B8C6E]/10 blur-[90px] rounded-full pointer-events-none" />

        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Photo */}
            <div className="order-1 lg:order-none flex justify-center">
              <picture>
                <source srcSet="/about.webp" type="image/webp" />
                <img
                  src="/about.jpg"
                  alt={t('photoAlt')}
                  width={1200}
                  height={900}
                  loading="eager"
                  className="w-full max-w-[460px] aspect-[4/3] object-cover rounded-[28px] shadow-card border border-[rgba(0,0,0,0.04)]"
                />
              </picture>
            </div>

            {/* Intro */}
            <div>
              <span className="inline-block px-4 py-1 bg-primary-light text-primary rounded-[20px] text-xs font-semibold mb-5 tracking-wider">
                {t('hero.badge')}
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-text-main mb-3">
                {t('hero.name')}
              </h1>
              <p className="text-primary font-semibold mb-6">{t('hero.role')}</p>
              <p className="text-text-muted text-lg leading-relaxed">{t('hero.intro')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story sections */}
      <section className="pb-16 md:pb-20">
        <div className="max-w-[760px] mx-auto px-4 sm:px-6 space-y-12">
          {sections.map((key) => (
            <div key={key}>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-text-main mb-4">
                {t(`sections.${key}.title`)}
              </h2>
              <p className="text-text-muted text-base md:text-lg leading-relaxed">
                {t(`sections.${key}.body`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="pb-24">
        <div className="max-w-[860px] mx-auto px-4 sm:px-6">
          <div className="bg-surface rounded-[28px] shadow-card border border-[rgba(0,0,0,0.03)] p-10 md:p-14 text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-text-main mb-3">
              {t('contact.title')}
            </h2>
            <p className="text-text-muted mb-8 max-w-[560px] mx-auto leading-relaxed">
              {t('contact.description')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 min-h-[44px] rounded-full font-semibold text-sm sm:text-base transition-all duration-300 bg-text-main text-white hover:bg-primary hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(166,123,91,0.2)]"
              >
                <Icon.Telegram className="w-5 h-5" />
                {t('contact.telegram')}
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 min-h-[44px] rounded-full font-semibold text-sm sm:text-base transition-all duration-300 border-2 border-text-main/30 text-text-main bg-surface/50 hover:border-text-main hover:bg-surface"
              >
                <Icon.Whatsapp className="w-5 h-5" />
                {t('contact.whatsapp')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
