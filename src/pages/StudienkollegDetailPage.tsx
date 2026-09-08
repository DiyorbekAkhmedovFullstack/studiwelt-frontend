import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getStudienkollegBySlug } from '../data/studienkollegData';
import { StudienkollegHeader } from '../components/studienkolleg/StudienkollegHeader';
import { CityInfoCard } from '../components/studienkolleg/CityInfoCard';
import { CoursesCard } from '../components/studienkolleg/CoursesCard';
import { ApplicationCard } from '../components/studienkolleg/ApplicationCard';
import { ExamCard } from '../components/studienkolleg/ExamCard';
import { Ui } from '../lib/icons';
import {
  SEO,
  SITE_URL,
  createBreadcrumbSchema,
  getStudienkollegSEO,
} from '../components/common/SEO';
import { localizePublicPath, normalizeLocale } from '../lib/publicRoutes';

export function StudienkollegDetailPage() {
  const { t, i18n } = useTranslation('studienkolleg');
  const { id } = useParams<{ id: string }>();

  const studienkolleg = id ? getStudienkollegBySlug(id) : undefined;

  if (!studienkolleg) {
    return (
      <main className="min-h-screen bg-page px-6 py-24 text-center">
        <SEO
          title="Studienkolleg not found"
          description="The requested Studienkolleg page does not exist."
          noIndex
        />
        <h1 className="mb-4 text-3xl font-bold">Studienkolleg not found</h1>
        <Link to="/" className="font-semibold text-primary hover:underline">
          {t('backToDirectory')}
        </Link>
      </main>
    );
  }

  const skId = studienkolleg.slug;
  const prefix = `data.${skId}`;
  const td = (key: string, fallback: string) => t(`${prefix}.${key}`, { defaultValue: fallback });

  const typeLabels: Record<string, string> = {
    'Public Institution': t('publicInstitution'),
    'Public University': t('publicUniversity'),
    'Technical University': t('technicalUniversity'),
    'Technical Institute': t('technicalInstitute'),
  };
  const translatedType = typeLabels[studienkolleg.institutionType] ?? studienkolleg.institutionType;

  const locale = normalizeLocale(i18n.resolvedLanguage ?? i18n.language);
  const localizedName = td('name', studienkolleg.name);
  const localizedCity = td('city', studienkolleg.city);
  const localizedLocation = td('location', studienkolleg.location);
  const canonicalPath = localizePublicPath(`/studienkolleg/${studienkolleg.slug}`, locale);
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const seoProps = getStudienkollegSEO(
    localizedName,
    localizedCity,
    localizedLocation,
    locale,
  );
  const structuredData = [
    createBreadcrumbSchema([
      { name: 'STUDIWELT', url: SITE_URL },
      { name: localizedName, url: canonicalUrl },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: seoProps.title,
      description: seoProps.description,
      url: canonicalUrl,
      inLanguage: locale,
      mainEntity: {
        '@type': 'CollegeOrUniversity',
        name: localizedName,
        url: studienkolleg.application.websiteUrl,
        address: {
          '@type': 'PostalAddress',
          addressLocality: localizedCity,
          addressCountry: 'DE',
        },
      },
    },
  ];

  return (
    <div className="min-h-screen bg-page">
      <SEO {...seoProps} ogType="article" structuredData={structuredData} />

      {/* Navigation Bar */}
      <nav className="h-[72px] flex items-center px-10 max-w-[1200px] mx-auto w-full">
        <Link
          to="/"
          className="flex items-center gap-2 text-text-muted hover:text-text-main font-semibold text-sm transition-all duration-200 hover:-translate-x-1"
        >
          <Ui.ArrowLeft size={20} />
          {t('backToDirectory')}
        </Link>
      </nav>

      {/* Main Content */}
      <main id="main-content" className="max-w-[1200px] mx-auto px-6 pb-20 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Header - Full Width */}
        <div className="lg:col-span-3">
          <StudienkollegHeader
            name={localizedName}
            location={localizedLocation}
            institutionType={translatedType}
            badge={studienkolleg.badge}
          />
        </div>

        {/* Left Column - Main Content */}
        <div className="lg:col-span-2">
          <CityInfoCard
            cityName={localizedCity}
            description={td('cityDescription', studienkolleg.cityInfo.description)}
            costOfLiving={td('costOfLiving', studienkolleg.cityInfo.costOfLiving)}
            transit={td('transit', studienkolleg.cityInfo.transit)}
            lifeInLabel={td('lifeIn', '') || undefined}
          />

          <CoursesCard courses={studienkolleg.courses} />
        </div>

        {/* Right Column - Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <ApplicationCard application={studienkolleg.application} />
            <ExamCard
              exam={{
                ...studienkolleg.exam,
                description: td('examDescription', studienkolleg.exam.description),
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
