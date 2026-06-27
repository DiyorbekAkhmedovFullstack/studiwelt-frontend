import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LandingNavbar } from '../components/landing/LandingNavbar';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { SEO, seoConfig } from '../components/common/SEO';

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
/*  Icons                                                                      */
/* -------------------------------------------------------------------------- */

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const journeyIcons: ReactNode[] = [
  // Application
  <svg key="i0" viewBox="0 0 24 24" {...stroke}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
  // Entrance exam
  <svg key="i1" viewBox="0 0 24 24" {...stroke}><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>,
  // Two semesters
  <svg key="i2" viewBox="0 0 24 24" {...stroke}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>,
  // FSP
  <svg key="i3" viewBox="0 0 24 24" {...stroke}><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>,
  // University
  <svg key="i4" viewBox="0 0 24 24" {...stroke}><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>,
];

const Check = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" {...stroke}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const Arrow = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const whyIcons: Record<string, ReactNode> = {
  bridge: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  ),
  german: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  path: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
};

/* -------------------------------------------------------------------------- */
/*  Static config (non-translated)                                            */
/* -------------------------------------------------------------------------- */

const courseTypes = [
  { letter: 'T', accent: 'bg-blue-100 text-blue-600' },
  { letter: 'M', accent: 'bg-red-100 text-red-600' },
  { letter: 'W', accent: 'bg-green-100 text-green-600' },
  { letter: 'G', accent: 'bg-purple-100 text-purple-600' },
  { letter: 'S', accent: 'bg-amber-100 text-amber-600' },
] as const;

const eligibilityTiers = [
  { key: 'direct', dot: 'bg-success', tag: 'bg-[#E6F0E7] text-success' },
  { key: 'restricted', dot: 'bg-[#D9A441]', tag: 'bg-[#FBF1DC] text-[#9A7218]' },
  { key: 'kolleg', dot: 'bg-primary', tag: 'bg-primary-light text-primary' },
] as const;

const requirementBlocks = [
  {
    key: 'language',
    accent: 'bg-blue-100 text-blue-600',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    key: 'documents',
    accent: 'bg-purple-100 text-purple-600',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  },
  {
    key: 'finances',
    accent: 'bg-green-100 text-green-600',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}>
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
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
                <Arrow />
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
              {journeySteps.map((step, i) => (
                <Reveal key={i} delay={i * 90} className="relative">
                  <div className="flex flex-col items-center text-center h-full">
                    <div className="relative z-10 w-[68px] h-[68px] rounded-full bg-page border-2 border-primary-light flex items-center justify-center text-primary mb-5 shadow-card [&>svg]:w-7 [&>svg]:h-7">
                      {journeyIcons[i]}
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
              ))}
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
            {(['bridge', 'german', 'path'] as const).map((key, i) => (
              <Reveal key={key} delay={i * 80}>
                <div className="bg-surface p-6 sm:p-8 rounded-[20px] shadow-card border border-transparent transition-all duration-300 hover:-translate-y-1 hover:border-primary-light h-full">
                  <div className="w-12 h-12 bg-primary-light text-primary rounded-xl flex items-center justify-center mb-5 [&>svg]:w-6 [&>svg]:h-6">
                    {whyIcons[key]}
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
                      className={`w-11 h-11 rounded-xl flex items-center justify-center font-serif font-bold text-lg ${course.accent}`}
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
                    <span className={`w-3 h-3 rounded-full ${tier.dot}`} />
                    <span
                      className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${tier.tag}`}
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
              return (
                <Reveal key={block.key} delay={i * 80}>
                  <div className="bg-page p-6 sm:p-7 rounded-[20px] h-full">
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${block.accent}`}
                      >
                        {block.icon}
                      </div>
                      <h3 className="font-bold text-lg">
                        {t(`requirements.${block.key}.title`)}
                      </h3>
                    </div>
                    <ul className="space-y-3 text-[14px] text-text-muted">
                      {items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check className="w-[18px] h-[18px] text-success mt-0.5 flex-shrink-0" />
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
                <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}>
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
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
                <Arrow />
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
