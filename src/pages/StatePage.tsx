import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LandingNavbar } from '../components/landing/LandingNavbar';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { SEO, getStateSEO } from '../components/common/SEO';
import { OptimizedImage } from '../components/common/OptimizedImage';
import { Icon, Ui } from '../lib/icons';
import { highlightIcon } from '../lib/highlightIcons';
import { statesData, getStateStudienkollegs, type University } from '../data/statesData';

// === Icons ===
const LocationIcon = () => <Icon.Location size={18} />;
const UsersIcon = () => <Icon.Population size={18} />;
const AreaIcon = () => <Icon.Area size={20} />;
const BookIcon = () => <Icon.University size={20} />;
const ArrowLeftIcon = () => <Ui.ArrowLeft size={20} />;

// === Helpers ===

const getTypeBadgeColor = (type: University['type']) => {
  switch (type) {
    case 'university':
      return 'bg-primary-light text-primary';
    case 'technical':
      return 'bg-highlight text-text-main';
    case 'applied':
      return 'bg-success/10 text-success';
    case 'arts':
      return 'bg-page text-text-muted';
    case 'music':
      return 'bg-primary/10 text-primary-hover';
  }
};

const UNIVERSITY_GROUP_CONFIG = [
  { types: ['university', 'technical'] as University['type'][], labelKey: 'researchUniversities', descKey: 'researchUniversitiesDesc' },
  { types: ['applied'] as University['type'][], labelKey: 'universitiesApplied', descKey: 'universitiesAppliedDesc' },
  { types: ['arts', 'music'] as University['type'][], labelKey: 'artMusicAcademies', descKey: 'artMusicAcademiesDesc' },
];

export function StatePage() {
  const { stateId } = useParams<{ stateId: string }>();
  const { t } = useTranslation('statePage');
  const { t: tc } = useTranslation('statesContent');
  const [heroRef, heroVisible] = useScrollAnimation();
  const [statsRef, statsVisible] = useScrollAnimation();
  const [uniRef, uniVisible] = useScrollAnimation();
  const [cultureRef, cultureVisible] = useScrollAnimation();
  const [kollegRef, kollegVisible] = useScrollAnimation();
  const [factsRef, factsVisible] = useScrollAnimation();

  const state = stateId ? statesData[stateId] : null;

  if (!state) {
    return (
      <div className="min-h-screen bg-page">
        <SEO title={t('stateNotFound')} noIndex />
        <LandingNavbar />
        <div className="pt-32 text-center">
          <h1 className="text-3xl font-bold mb-4">{t('stateNotFound')}</h1>
          <p className="text-text-muted mb-8">{t('stateNotFoundDescription')}</p>
          <Link to="/" className="text-primary hover:underline">
            {t('returnToHome')}
          </Link>
        </div>
      </div>
    );
  }

  const seoProps = getStateSEO(state.name, state.germanName);
  const stateStudienkollegs = getStateStudienkollegs(state.id);

  const localizedName = tc(`${state.id}.name`) || state.name;

  const translatedPrograms = (uniIndex: number): string[] => {
    const result = tc(`${state.id}.universities.${uniIndex}.programs`, { returnObjects: true });
    return Array.isArray(result) ? result as string[] : state.universities[uniIndex]?.programs ?? [];
  };

  return (
    <div className="min-h-screen bg-page overflow-x-hidden">
      <SEO {...seoProps} />
      <LandingNavbar />

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8"
          >
            <ArrowLeftIcon />
            <span>{t('backToMap')}</span>
          </Link>

          <div
            ref={heroRef}
            className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          >
            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[16/10]">
              <OptimizedImage
                src={state.image}
                alt={state.name}
                priority
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-text">
                  {state.germanName}
                </span>
              </div>
            </div>

            {/* Info */}
            <div>
              <span className="inline-block px-4 py-1 bg-primary-light text-primary rounded-full text-xs font-semibold mb-4 tracking-wider">
                {t('germanState')}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                {localizedName}
              </h1>
              <p className="text-lg text-text-muted mb-6 leading-relaxed">
                {tc(`${state.id}.description`)}
              </p>
              <p className="text-sm italic text-primary font-medium">"{tc(`${state.id}.motto`)}"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-surface">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div
            ref={statsRef}
            className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 transition-all duration-700 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          >
            <div className="bg-page rounded-xl p-5 text-center shadow-soft">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-primary-light rounded-full mb-3">
                <LocationIcon />
              </div>
              <p className="text-sm text-text-muted mb-1">{t('capital')}</p>
              <p className="text-lg font-semibold">{state.capital}</p>
            </div>
            <div className="bg-page rounded-xl p-5 text-center shadow-soft">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-primary-light rounded-full mb-3">
                <UsersIcon />
              </div>
              <p className="text-sm text-text-muted mb-1">{t('population')}</p>
              <p className="text-lg font-semibold">{state.population}</p>
            </div>
            <div className="bg-page rounded-xl p-5 text-center shadow-soft">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-primary-light rounded-full mb-3">
                <AreaIcon />
              </div>
              <p className="text-sm text-text-muted mb-1">{t('area')}</p>
              <p className="text-lg font-semibold">{state.area}</p>
            </div>
            <div className="bg-page rounded-xl p-5 text-center shadow-soft">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-primary-light rounded-full mb-3">
                <BookIcon />
              </div>
              <p className="text-sm text-text-muted mb-1">{t('institutions')}</p>
              <p className="text-lg font-semibold">{state.universities.length}+</p>
            </div>
          </div>
        </div>
      </section>

      {/* Universities Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div
              ref={uniRef}
              className={`text-center mb-12 transition-all duration-700 ${uniVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            >
              <span className="inline-block px-4 py-1 bg-primary-light text-primary rounded-full text-xs font-semibold mb-4 tracking-wider">
                {t('higherEducation')}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                {t('universitiesIn', { state: localizedName })}
              </h2>
              <p className="text-text-muted max-w-[600px] mx-auto">
                {t('universitiesDescription', { state: localizedName })}
              </p>
            </div>

          <div>
            {UNIVERSITY_GROUP_CONFIG.map((group) => {
              const groupUnis = state.universities.filter((u) =>
                group.types.includes(u.type)
              );
              if (groupUnis.length === 0) return null;

              return (
                <div key={group.labelKey} className="mb-16 last:mb-0">
                  {/* Group header */}
                  <div className="mb-8 pb-4 border-b border-border">
                    <h3 className="text-xl font-bold text-text mb-1">
                      {t(group.labelKey)}
                    </h3>
                    <p className="text-sm text-text-muted">{t(group.descKey)}</p>
                  </div>

                  {/* Each university as its own full-width section */}
                  <div className="space-y-6">
                    {groupUnis.map((uni) => {
                      const globalUniIdx = state.universities.indexOf(uni);
                      return (
                      <div
                        key={uni.name}
                        className="bg-surface rounded-2xl overflow-hidden shadow-soft border border-border/50 hover:shadow-card transition-shadow"
                      >
                        <div className="p-6 md:p-8">
                          {/* Header */}
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <h4 className="text-xl font-bold text-text leading-tight flex-1">
                              {uni.name}
                            </h4>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 ${getTypeBadgeColor(uni.type)}`}
                            >
                              {t(uni.type === 'university' ? 'researchUniversity' : uni.type === 'technical' ? 'technicalUniversity' : uni.type === 'applied' ? 'universityApplied' : uni.type === 'arts' ? 'artAcademy' : 'musicAcademy')}
                            </span>
                          </div>

                          {/* Stats row */}
                          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-text-muted mb-5 pb-5 border-b border-border/40">
                            <span className="flex items-center gap-1.5">
                              <LocationIcon />
                              {uni.city}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <UsersIcon />
                              {uni.students.toLocaleString()} {t('students')}
                            </span>
                          </div>

                          {/* Description */}
                          <p className="text-base text-text leading-relaxed mb-6 max-w-[800px]">
                            {tc(`${state.id}.universities.${globalUniIdx}.description`)}
                          </p>

                          {/* Programs */}
                          {(() => {
                            const progs = translatedPrograms(globalUniIdx);
                            if (progs.length === 0) return null;
                            return (
                            <div className="mb-5">
                              <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2.5">
                                {t('keyPrograms')}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {progs.map((p) => (
                                  <span
                                    key={p}
                                    className="px-3 py-1.5 bg-primary-light text-primary text-sm font-medium rounded-lg"
                                  >
                                    {p}
                                  </span>
                                ))}
                              </div>
                            </div>
                            );
                          })()}

                          {/* Website button */}
                          {uni.website && (
                            <a
                              href={uni.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
                            >
                              <Ui.ExternalLink size={14} />
                              {t('visitWebsite')}
                            </a>
                          )}
                        </div>
                      </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div
            ref={cultureRef}
            className={`transition-all duration-700 ${cultureVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          >
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 bg-primary-light text-primary rounded-full text-xs font-semibold mb-4 tracking-wider">
                {t('cultureTraditions')}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                {t('discoverCulture', { state: localizedName })}
              </h2>
              <p className="text-text-muted max-w-[600px] mx-auto">
                {t('cultureDescription', { state: localizedName })}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {state.culture.map((item, index) => (
                <div
                  key={item.title}
                  className="bg-page rounded-xl p-6 shadow-soft hover:shadow-card transition-all hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-primary mb-4 inline-flex">{highlightIcon(item.icon, 40)}</span>
                  <h3 className="font-semibold text-lg mb-2">{tc(`${state.id}.culture.${index}.title`)}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{tc(`${state.id}.culture.${index}.description`)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Studienkolleg Section */}
      {stateStudienkollegs.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div
              ref={kollegRef}
              className={`transition-all duration-700 ${kollegVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            >
              <div className="text-center mb-12">
                <span className="inline-block px-4 py-1 bg-primary-light text-primary rounded-full text-xs font-semibold mb-4 tracking-wider">
                  {t('forInternationalStudents')}
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                  {t('studienkollegsIn', { state: localizedName })}
                </h2>
                <p className="text-text-muted max-w-[600px] mx-auto">
                  {t('studienkollegsDescription', { count: stateStudienkollegs.length, state: localizedName })}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 max-w-[800px] mx-auto">
                {stateStudienkollegs.map((kolleg) => (
                  <Link
                    key={kolleg.slug}
                    to={`/studienkolleg/${kolleg.slug}`}
                    className="bg-surface rounded-xl p-6 shadow-soft border border-border hover:shadow-card hover:border-primary/30 transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center flex-shrink-0">
                        <BookIcon />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                            {kolleg.name}
                          </h3>
                          <Ui.ArrowRight
                            size={16}
                            className="text-text-muted group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0"
                          />
                        </div>
                        <p className="text-sm text-text-muted mb-3">
                          {kolleg.city} • {kolleg.institutionType}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {kolleg.courses.map((course) => (
                            <span
                              key={course.code}
                              className="px-3 py-1 bg-primary-light text-primary text-xs font-medium rounded-full"
                            >
                              {course.code}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="text-center mt-8">
                <Link
                  to="/about-studienkolleg"
                  className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                >
                  {t('learnMoreAboutSk')}
                  <Ui.ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Numbers Section */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div
            ref={factsRef}
            className={`transition-all duration-700 ${factsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          >
            {/* Key Numbers Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden mb-16">
              {state.keyNumbers.map((item, idx) => (
                <div key={item.label} className="bg-page p-6 md:p-8 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-text mb-1 tabular-nums">
                    {item.value}
                  </div>
                  <div className="text-sm font-medium text-text mb-1">{tc(`${state.id}.keyNumbers.${idx}.label`)}</div>
                  <div className="text-xs text-text-muted">{tc(`${state.id}.keyNumbers.${idx}.context`)}</div>
                </div>
              ))}
            </div>

            {/* Major Employers */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-text-muted uppercase tracking-wide">
                {t('majorEmployers')}
              </h3>

              {/* Desktop: Table */}
              <table className="hidden sm:table w-full">
                <thead>
                  <tr className="border-b border-border text-left text-sm text-text-muted">
                    <th className="pb-3 font-medium">{t('company')}</th>
                    <th className="pb-3 font-medium">{t('sector')}</th>
                    <th className="pb-3 font-medium text-right">{t('headquarters')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {state.majorEmployers.map((employer, idx) => (
                    <tr key={employer.name} className="text-sm">
                      <td className="py-3 font-medium text-text">{employer.name}</td>
                      <td className="py-3 text-text-muted">{tc(`${state.id}.employers.${idx}.sector`)}</td>
                      <td className="py-3 text-text-muted text-right">{tc(`${state.id}.employers.${idx}.hq`)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile: Stacked cards */}
              <div className="sm:hidden grid grid-cols-2 gap-3">
                {state.majorEmployers.map((employer, idx) => (
                  <div key={employer.name} className="bg-page rounded-lg p-4 border border-border">
                    <div className="font-medium text-text mb-1">{employer.name}</div>
                    <div className="text-xs text-text-muted">
                      {tc(`${state.id}.employers.${idx}.sector`)} · {tc(`${state.id}.employers.${idx}.hq`)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            {t('readyToStudy', { state: localizedName })}
          </h2>
          <p className="text-text-muted mb-8 max-w-[500px] mx-auto">
            {t('ctaDescription')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-colors shadow-soft"
            >
              {t('startLearning')}
            </Link>
            <Link
              to="/about-studienkolleg"
              className="px-6 py-3 bg-surface text-text rounded-lg font-medium hover:bg-gray-100 transition-colors border border-border"
            >
              {t('learnAboutSk')}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center text-sm text-text-muted">
          <p>&copy; {new Date().getFullYear()} Studiwelt. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
