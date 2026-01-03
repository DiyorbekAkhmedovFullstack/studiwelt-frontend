import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article' | 'profile';
  ogImage?: string;
  noIndex?: boolean;
  structuredData?: object;
}

const DEFAULT_TITLE = 'STUDIWELT - Master German for Studienkolleg';
const DEFAULT_DESCRIPTION =
  'Master German language skills for Studienkolleg entrance exams with our comprehensive 30-day course. Prepare for your path to German universities.';
const SITE_NAME = 'STUDIWELT';
const SITE_URL = 'https://studiwelt.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords,
  canonicalUrl,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
  structuredData,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const canonical = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : '');

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      {canonical && <meta property="og:url" content={canonical} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}
    </Helmet>
  );
}

// Pre-configured SEO for common pages
export const seoConfig = {
  landing: {
    title: undefined, // Uses default
    description:
      'Master German language skills for Studienkolleg entrance exams with our comprehensive 30-day course. Interactive lessons, C-Tests, and grammar exercises.',
    keywords:
      'Studienkolleg, German course, Aufnahmeprüfung, FSP, German university, international students, German language',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'STUDIWELT',
      description: 'Online German language course for Studienkolleg entrance exams',
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      sameAs: [],
    },
  },

  aboutStudienkolleg: {
    title: 'What is Studienkolleg?',
    description:
      'Learn everything about Studienkolleg - the preparatory course for international students in Germany. Course types (T, M, W, G, S), requirements, and how to apply.',
    keywords:
      'Studienkolleg, what is Studienkolleg, preparatory course Germany, T-Kurs, M-Kurs, W-Kurs, G-Kurs, S-Kurs, international students Germany',
  },

  entranceExam: {
    title: 'Entrance Exam (Aufnahmeprüfung)',
    description:
      'Complete guide to the Studienkolleg entrance exam (Aufnahmeprüfung). Learn about the German language test, subject-specific exams, and preparation tips.',
    keywords:
      'Aufnahmeprüfung, entrance exam, Studienkolleg test, German exam, math test Studienkolleg',
  },

  fsp: {
    title: 'FSP (Feststellungsprüfung)',
    description:
      'Everything you need to know about the FSP - Feststellungsprüfung. Exam structure, grading system, subjects tested, and how to prepare for success.',
    keywords:
      'FSP, Feststellungsprüfung, final exam Studienkolleg, German university qualification, FSP preparation',
  },

  application: {
    title: 'How to Apply to Studienkolleg',
    description:
      'Step-by-step guide to applying to Studienkolleg in Germany. Application routes, required documents, deadlines, and visa requirements.',
    keywords:
      'Studienkolleg application, apply to Studienkolleg, uni-assist, German student visa, application deadlines',
  },

  login: {
    title: 'Login',
    description: 'Login to your STUDIWELT account to continue your German language learning journey.',
    noIndex: true,
  },

  register: {
    title: 'Create Account',
    description:
      'Create your free STUDIWELT account and start preparing for your Studienkolleg entrance exam today.',
    keywords: 'register, create account, Studienkolleg preparation, German course',
  },
};

// Helper function to generate studienkolleg detail page SEO
export function getStudienkollegSEO(name: string, city: string, state: string) {
  return {
    title: `${name} - Studienkolleg in ${city}`,
    description: `Information about ${name} in ${city}, ${state}. Courses offered, application process, entrance exam details, and more.`,
    keywords: `${name}, Studienkolleg ${city}, ${state} Studienkolleg, German preparatory course`,
  };
}

// Helper function to generate state page SEO
export function getStateSEO(stateName: string, germanName: string) {
  return {
    title: `Studienkollegs in ${stateName} (${germanName})`,
    description: `Explore Studienkollegs and universities in ${stateName}, Germany. Find the best options for your studies in ${germanName}.`,
    keywords: `Studienkolleg ${stateName}, universities ${stateName}, study in ${germanName}, ${stateName} education`,
  };
}
