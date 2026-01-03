import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/landing/Button';
import { FeatureCard } from '../components/landing/FeatureCard';
import { PlatformPreview } from '../components/landing/PlatformPreview';
import { LandingNavbar } from '../components/landing/LandingNavbar';
import { GermanyMapSection } from '../components/landing/GermanyMapSection';
import { StudienkollegCarousel } from '../components/landing/StudienkollegCarousel';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useAuth } from '../contexts/AuthContext';
import { SEO, seoConfig } from '../components/common/SEO';

export function LandingPage() {
  const { t } = useTranslation(['landing', 'common']);
  const { user } = useAuth();
  const isAuthenticated = !!user;
  const [heroRef, heroVisible] = useScrollAnimation();
  const [featuresRef, featuresVisible] = useScrollAnimation();

  return (
    <div className="min-h-screen bg-page overflow-x-hidden">
      <SEO {...seoConfig.landing} />

      {/* Navigation */}
      <LandingNavbar />

      {/* Hero Section */}
      <section className="pt-32 md:pt-40 lg:pt-48 pb-16 md:pb-20 lg:pb-24 text-center relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <div
            ref={heroRef}
            className={`transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
          >
            <span className="inline-block px-2 sm:px-4 py-0.5 sm:py-1 bg-primary-light text-primary rounded-[20px] text-[9px] sm:text-xs font-semibold mb-5 sm:mb-6 tracking-wider">
              {t('landing:hero.badge')}
            </span>

            <h1 className="text-[2rem] sm:text-4xl md:text-5xl lg:text-[60px] leading-tight sm:leading-[1.2] lg:leading-[1.1] font-bold mb-6 sm:mb-6 max-w-[800px] mx-auto px-2">
              {t('landing:hero.titleLine1')}{' '}
              <br className="hidden sm:block" />
              {t('landing:hero.titleLine2')}{' '}
              <span className="text-primary italic">{t('landing:hero.titleHighlight')}</span>
            </h1>

            <p className="text-[11px] sm:text-sm md:text-base text-text-muted max-w-[600px] mx-auto mb-8 sm:mb-10 px-4">
              {t('landing:hero.description')}
            </p>

            <div className="flex justify-center items-center px-4">
              <Link to={isAuthenticated ? "/course" : "/register"}>
                <Button variant="primary">{t('common:buttons.startPlan')}</Button>
              </Link>
            </div>
          </div>

          {/* Platform Preview */}
          <PlatformPreview />
        </div>
      </section>

      {/* Features Section */}
      <section id="method" className="py-16 md:py-20 lg:py-24">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <div
            ref={featuresRef}
            className={`text-center max-w-[700px] mx-auto mb-12 md:mb-16 transition-all duration-700 ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
          >
            <h2 className="text-[32px] md:text-[40px] font-bold mb-3 sm:mb-4 px-4">{t('landing:features.title')}</h2>
            <p className="text-text-muted text-base sm:text-lg px-4">
              {t('landing:features.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
            <FeatureCard
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              }
              title={t('landing:features.pacing.title')}
              description={t('landing:features.pacing.description')}
              delay={0}
            />

            <FeatureCard
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              }
              title={t('landing:features.resources.title')}
              description={t('landing:features.resources.description')}
              delay={100}
            />

            <FeatureCard
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              }
              title={t('landing:features.tracking.title')}
              description={t('landing:features.tracking.description')}
              delay={200}
            />
          </div>
        </div>
      </section>

      {/* Studienkolleg Carousel */}
      <StudienkollegCarousel />

      {/* Germany Map Section */}
      <GermanyMapSection />

    </div>
  );
}

