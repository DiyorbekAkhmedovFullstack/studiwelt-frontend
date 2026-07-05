import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LandingNavbar } from '../components/landing/LandingNavbar';
import { Button } from '../components/landing/Button';
import { SEO } from '../components/common/SEO';
import { useAuth } from '../contexts/AuthContext';

export function AboutPage() {
  const { t } = useTranslation('about');
  const { user } = useAuth();
  const isAuthenticated = !!user;

  const sections = ['motivation', 'goal', 'vision'] as const;

  return (
    <div className="min-h-screen bg-page overflow-x-hidden">
      <SEO title={t('seoTitle')} description={t('seoDescription')} />

      <LandingNavbar />

      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-20 relative overflow-hidden">
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

      {/* CTA */}
      <section className="pb-24">
        <div className="max-w-[860px] mx-auto px-4 sm:px-6">
          <div className="bg-surface rounded-[28px] shadow-card border border-[rgba(0,0,0,0.03)] p-10 md:p-14 text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-text-main mb-3">
              {t('cta.title')}
            </h2>
            <p className="text-text-muted mb-8 max-w-[520px] mx-auto">
              {t('cta.description')}
            </p>
            <div className="flex justify-center">
              <Link to={isAuthenticated ? '/course' : '/register'}>
                <Button variant="primary">{t('cta.button')}</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
