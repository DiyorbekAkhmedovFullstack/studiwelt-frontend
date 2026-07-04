import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LandingNavbar } from '../components/landing/LandingNavbar';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { SEO, seoConfig } from '../components/common/SEO';
import { Icon, Ui } from '../lib/icons';

/* -------------------------------------------------------------------------- */
/*  Small reveal-on-scroll wrapper (matches the platform's fade-up muse)      */
/* -------------------------------------------------------------------------- */

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const [ref, visible] = useScrollAnimation();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
    >
      {children}
    </div>
  );
}

function SectionHeading({
  badge,
  title,
  highlight,
  description,
}: {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;
}) {
  return (
    <div className="text-center max-w-[720px] mx-auto mb-12 md:mb-16">
      {badge && (
        <span className="inline-block px-4 py-1 bg-primary-light text-primary rounded-full text-[11px] font-semibold mb-5 tracking-[0.12em] uppercase">
          {badge}
        </span>
      )}
      <h2 className="text-[28px] md:text-[40px] font-bold mb-4">
        {title}
        {highlight && <span className="text-primary italic"> {highlight}</span>}
      </h2>
      {description && (
        <p className="text-text-muted text-base sm:text-lg leading-relaxed mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Static config (non-translated)                                            */
/* -------------------------------------------------------------------------- */

// Journey steps share their order with the i18n `journey.steps` array.
const journeyIcons = [
  Icon.Application,
  Icon.EntranceExam,
  Icon.Semesters,
  Icon.Assessment,
  Icon.University,
] as const;

const whyCards = [
  { key: 'bridge', icon: Icon.BridgeEducation },
  { key: 'german', icon: Icon.AcademicGerman },
  { key: 'path', icon: Icon.RecognisedPath },
] as const;

const courseTypes = [
  { letter: 'T' },
  { letter: 'M' },
  { letter: 'W' },
  { letter: 'G' },
  { letter: 'S' },
] as const;

const eligibilityTiers = [
  { key: 'direct' },
  { key: 'restricted' },
  { key: 'kolleg' },
] as const;

const requirementBlocks = [
  { key: 'language', icon: Icon.LanguageReq },
  { key: 'documents', icon: Icon.Documents },
  { key: 'finances', icon: Icon.Finances },
] as const;

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

export function AboutStudienkollegPage() {
  const { t } = useTranslation('aboutStudienkolleg');

  const heroStats = t('hero.stats', { returnObjects: true }) as Array<{
    value: string;
    label: string;
  }>;
  const journeySteps = t('journey.steps', { returnObjects: true }) as Array<{
    label: string;
    title: string;
    description: string;
  }>;

  return (
    <div className="min-h-screen bg-page overflow-x-hidden">
      <SEO {...seoConfig.aboutStudienkolleg} />
      <LandingNavbar />

      {/* ============================ HERO ============================ */}
      <section className="relative pt-32 md:pt-40 lg:pt-44 pb-16 md:pb-20 text-center overflow-hidden">
        {/* Ambient gradient blobs */}
        <div className="absolute top-24 -left-24 w-72 h-72 bg-primary/10 blur-[90px] rounded-full pointer-events-none" />
        <div className="absolute top-10 -right-20 w-64 h-64 bg-[#6B8C6E]/10 blur-[90px] rounded-full pointer-events-none" />

        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 relative">
          <Reveal>
            <span className="inline-block px-4 py-1 bg-primary-light text-primary rounded-full text-[11px] font-semibold mb-6 tracking-[0.12em] uppercase">
              {t('hero.badge')}
            </span>

            <h1 className="text-[2rem] sm:text-4xl md:text-5xl lg:text-[56px] leading-tight font-bold mb-6 max-w-[820px] mx-auto">
              {t('hero.title')}{' '}
              <span className="text-primary italic">
                {t('hero.titleHighlight')}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-text-muted max-w-[640px] mx-auto mb-9 leading-relaxed">
              {t('hero.description')}
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3.5 rounded-full text-[15px] transition-all hover:bg-primary-hover hover:-translate-y-0.5 shadow-[0_8px_20px_rgba(166,123,91,0.28)] active:scale-[0.98]"
              >
                {t('hero.ctaPrimary')}
                <Ui.ArrowRight size={20} />
              </Link>
              <Link
                to="/#studienkolleg-carousel"
                className="inline-flex items-center gap-2 bg-surface text-text-main font-semibold px-7 py-3.5 rounded-full text-[15px] transition-all hover:-translate-y-0.5 hover:shadow-card border border-border"
              >
                {t('hero.ctaSecondary')}
              </Link>
            </div>
          </Reveal>

          {/* Stat strip */}
          <Reveal delay={120}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-[860px] mx-auto">
              {heroStats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-surface rounded-2xl p-4 sm:p-5 shadow-card border border-[rgba(0,0,0,0.03)]"
                >
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[11px] sm:text-xs text-text-muted uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================ JOURNEY ROADMAP ============================ */}
      <section className="py-16 md:py-20 lg:py-24 bg-surface">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <Reveal>
            <SectionHeading
              badge={t('journey.badge')}
              title={t('journey.title')}
              highlight={t('journey.titleHighlight')}
              description={t('journey.description')}
            />
          </Reveal>

          <div className="relative">
            {/* Connecting line (desktop) */}
            <div className="hidden lg:block absolute top-[34px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-primary-light via-primary/40 to-primary-light" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
              {journeySteps.map((step, i) => {
                const StepIcon = journeyIcons[i];
                return (
                <Reveal key={i} delay={i * 90} className="relative">
                  <div className="flex flex-col items-center text-center h-full">
                    <div className="relative z-10 w-[68px] h-[68px] rounded-full bg-page border-2 border-primary-light flex items-center justify-center text-primary mb-5 shadow-card">
                      {StepIcon && <StepIcon size={28} stroke={2} />}
                      <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-primary uppercase tracking-wider mb-1.5">
                      {step.label}
                    </span>
                    <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                    <p className="text-text-muted text-[14px] leading-relaxed max-w-[230px]">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================ WHY ============================ */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <Reveal>
            <SectionHeading
              title={t('why.title')}
              description={t('why.description')}
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {whyCards.map(({ key, icon: WhyIcon }, i) => (
              <Reveal key={key} delay={i * 80}>
                <div className="bg-surface p-6 sm:p-8 rounded-[20px] shadow-card border border-transparent transition-all duration-300 hover:-translate-y-1 hover:border-primary-light h-full">
                  <div className="w-12 h-12 bg-primary-light text-primary rounded-xl flex items-center justify-center mb-5">
                    <WhyIcon size={24} stroke={2} />
                  </div>
                  <h3 className="text-lg font-bold mb-2">
                    {t(`why.cards.${key}.title`)}
                  </h3>
                  <p className="text-text-muted text-[15px] leading-relaxed">
                    {t(`why.cards.${key}.description`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ COURSE TRACKS ============================ */}
      <section className="py-16 md:py-20 lg:py-24 bg-surface">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <Reveal>
            <SectionHeading
              title={t('courses.title')}
              description={t('courses.description')}
            />
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {courseTypes.map((course, i) => (
              <Reveal key={course.letter} delay={i * 60}>
                <div className="group relative bg-page p-6 rounded-[20px] shadow-card border border-transparent overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary-light h-full">
                  {/* Big serif monogram watermark */}
                  <span className="absolute -top-4 -right-2 text-[110px] leading-none font-serif font-black text-primary/[0.06] select-none pointer-events-none transition-colors group-hover:text-primary/[0.1]">
                    {course.letter}
                  </span>

                  <div className="relative flex items-center gap-3 mb-4">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center font-serif font-bold text-lg bg-primary-light text-primary`}
                    >
                      {course.letter}
                    </div>
                    <div>
                      <span className="font-bold text-[17px] block leading-tight">
                        {course.letter}-Kurs
                      </span>
                      <span className="block text-[13px] text-text-muted">
                        {t(`courses.types.${course.letter}.fullName`)}
                      </span>
                    </div>
                  </div>

                  <p className="relative text-text-muted text-[14px] leading-relaxed mb-4">
                    {t(`courses.types.${course.letter}.description`)}
                  </p>

                  <p className="relative text-xs text-primary font-medium pt-3 border-t border-border-soft">
                    {t(`courses.types.${course.letter}.examples`)}
                  </p>
                </div>
              </Reveal>
            ))}

            {/* FH note card */}
            <Reveal delay={courseTypes.length * 60}>
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-[20px] border border-primary-light h-full flex items-center">
                <p className="text-[14px] text-text-main leading-relaxed">
                  {t('courses.fhNote')}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================ ELIGIBILITY ============================ */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <Reveal>
            <SectionHeading
              badge={t('eligibility.badge')}
              title={t('eligibility.title')}
              description={t('eligibility.description')}
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {eligibilityTiers.map((tier, i) => (
              <Reveal key={tier.key} delay={i * 80}>
                  <div className="bg-surface p-7 rounded-[20px] shadow-card border border-transparent transition-all duration-300 hover:-translate-y-1 hover:border-primary-light h-full">
                  <div className="flex items-center gap-2.5 mb-5">
                    <span className="w-3 h-3 rounded-full bg-primary" />
                    <span
                      className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary-light text-primary"
                    >
                      {t(`eligibility.tiers.${tier.key}.tag`)}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">
                    {t(`eligibility.tiers.${tier.key}.title`)}
                  </h3>
                  <p className="text-text-muted text-[14px] leading-relaxed">
                    {t(`eligibility.tiers.${tier.key}.description`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ REQUIREMENTS ============================ */}
      <section className="py-16 md:py-20 lg:py-24 bg-surface">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <Reveal>
            <SectionHeading
              title={t('requirements.title')}
              description={t('requirements.description')}
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {requirementBlocks.map((block, i) => {
              const items = t(`requirements.${block.key}.items`, {
                returnObjects: true,
              }) as string[];
              const BlockIcon = block.icon;
              return (
                <Reveal key={block.key} delay={i * 80}>
                  <div className="bg-page p-6 sm:p-7 rounded-[20px] h-full">
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary-light text-primary"
                      >
                        <BlockIcon size={20} stroke={2} />
                      </div>
                      <h3 className="font-bold text-lg">
                        {t(`requirements.${block.key}.title`)}
                      </h3>
                    </div>
                    <ul className="space-y-3 text-[14px] text-text-muted">
                      {items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Ui.Check className="text-success mt-0.5 flex-shrink-0" size={18} stroke={2.5} />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Timeline strip */}
          <Reveal delay={120}>
            <div className="bg-page p-6 sm:p-8 rounded-[20px]">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-primary-light text-primary rounded-lg flex items-center justify-center">
                  <Icon.Timeline size={20} stroke={2} />
                </div>
                <h3 className="font-bold text-lg">
                  {t('requirements.timeline.title')}
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[15px] mb-4">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                  <span
                    dangerouslySetInnerHTML={{
                      __html: t('requirements.timeline.winter'),
                    }}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                  <span
                    dangerouslySetInnerHTML={{
                      __html: t('requirements.timeline.summer'),
                    }}
                  />
                </div>
              </div>
              <p className="text-[13px] text-text-muted italic">
                {t('requirements.timeline.note')}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================ FSP ============================ */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="relative bg-gradient-to-br from-primary/5 to-primary/10 rounded-[24px] p-8 md:p-12 lg:p-16 overflow-hidden">
              <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-primary/10 blur-[70px] rounded-full pointer-events-none" />

              <div className="relative max-w-[720px] mx-auto text-center">
                <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-[11px] font-semibold mb-6 tracking-[0.12em] uppercase">
                  {t('fsp.badge')}
                </span>

                <h2 className="text-[28px] md:text-[40px] font-bold mb-4">
                  {t('fsp.title')}
                </h2>

                <p className="text-text-muted text-base sm:text-lg mb-9 leading-relaxed mx-auto">
                  {t('fsp.description')}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                  {(['tested', 'format', 'after'] as const).map((key) => (
                    <div
                      key={key}
                      className="bg-surface p-5 rounded-xl shadow-card"
                    >
                      <h4 className="font-bold mb-2">
                        {t(`fsp.cards.${key}.title`)}
                      </h4>
                      <p className="text-sm text-text-muted leading-relaxed">
                        {t(`fsp.cards.${key}.description`)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================ CTA ============================ */}
      <section className="py-16 md:py-20 lg:py-24 bg-surface">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <Reveal className="text-center">
            <h2 className="text-[28px] md:text-[40px] font-bold mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-text-muted text-base sm:text-lg max-w-[620px] mx-auto mb-8 leading-relaxed">
              {t('cta.description')}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/#studienkolleg-carousel"
                className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-4 rounded-full text-base transition-all hover:bg-primary-hover hover:-translate-y-0.5 shadow-[0_8px_20px_rgba(166,123,91,0.28)] active:scale-[0.98]"
              >
                {t('cta.exploreButton')}
                <Ui.ArrowRight size={20} />
              </Link>

              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-transparent text-text-main font-semibold px-8 py-4 rounded-full text-base transition-all hover:bg-page border border-border"
              >
                {t('cta.startButton')}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
