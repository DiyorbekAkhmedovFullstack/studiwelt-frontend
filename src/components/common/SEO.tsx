/* eslint-disable react-refresh/only-export-components -- SEO metadata helpers are intentionally colocated with the component. */
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import {
  localizePublicPath,
  localePrefix,
  normalizeLocale,
  type SupportedLocale,
} from '../../lib/publicRoutes';

export const SITE_NAME = 'STUDIWELT';
export const SITE_URL = 'https://studiwelt.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.png`;

function absolutePublicUrl(pathname: string): string {
  return `${SITE_URL}${pathname === '/' ? '' : pathname}`;
}

type StructuredData = Record<string, unknown>;

interface SEOProps {
  title?: string;
  description: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article' | 'profile';
  ogImage?: string;
  noIndex?: boolean;
  structuredData?: StructuredData | StructuredData[];
  alternateLanguages?: boolean;
}

type SeoPageKey =
  | 'landing'
  | 'aboutStudienkolleg'
  | 'application'
  | 'entranceExam'
  | 'fsp'
  | 'login'
  | 'register';

type SeoCopy = Record<
  SupportedLocale,
  Record<
    SeoPageKey,
    {
      title?: string;
      description: string;
      noIndex?: boolean;
    }
  >
>;

const SEO_COPY: SeoCopy = {
  en: {
    landing: {
      title: 'Studienkolleg Entrance Exam German Preparation',
      description:
        'Prepare for the Studienkolleg entrance exam with a structured 30-day German course: C-Tests, B2–C1 grammar, reading and vocabulary practice.',
    },
    aboutStudienkolleg: {
      title: 'What Is a Studienkolleg? Requirements, Courses and FSP',
      description:
        'Understand Studienkolleg requirements, T-, M-, W-, G- and S-Courses, application routes, entrance exams and the Feststellungsprüfung.',
    },
    application: {
      title: 'How to Apply to Studienkolleg in Germany',
      description:
        'A practical guide to Studienkolleg applications, uni-assist, required documents, deadlines, entrance exams and visa preparation.',
    },
    entranceExam: {
      title: 'Studienkolleg Entrance Exam: German Test and Preparation',
      description:
        'Learn how the Studienkolleg entrance exam works, what German and subject tests can include, and how to prepare with a focused study plan.',
    },
    fsp: {
      title: 'Feststellungsprüfung (FSP): Subjects, Grades and Preparation',
      description:
        'A clear guide to the Studienkolleg Feststellungsprüfung: exam structure, subjects, grading and practical preparation strategies.',
    },
    login: {
      title: 'Login',
      description: 'Log in to your STUDIWELT learning account.',
      noIndex: true,
    },
    register: {
      title: 'Create Your Free STUDIWELT Account',
      description:
        'Create an account and start six free Studienkolleg entrance-exam preparation lessons.',
      noIndex: true,
    },
  },
  de: {
    landing: {
      title: 'Studienkolleg-Aufnahmeprüfung Deutsch: 30-Tage-Vorbereitung',
      description:
        'Bereite dich in 30 strukturierten Tagen auf die Studienkolleg-Aufnahmeprüfung vor – mit C-Tests, B2–C1-Grammatik, Leseverstehen und Wortschatz.',
    },
    aboutStudienkolleg: {
      title: 'Was ist ein Studienkolleg? Voraussetzungen, Kurse und FSP',
      description:
        'Erfahre alles über Voraussetzungen, T-, M-, W-, G- und S-Kurse, Bewerbung, Aufnahmeprüfung und Feststellungsprüfung am Studienkolleg.',
    },
    application: {
      title: 'Studienkolleg-Bewerbung: Ablauf, Unterlagen und Fristen',
      description:
        'Praktischer Leitfaden zur Studienkolleg-Bewerbung über uni-assist oder direkt – inklusive Unterlagen, Fristen, Aufnahmeprüfung und Visum.',
    },
    entranceExam: {
      title: 'Studienkolleg-Aufnahmeprüfung: Deutschtest und Vorbereitung',
      description:
        'Aufbau der Studienkolleg-Aufnahmeprüfung, mögliche Deutsch- und Fachtests sowie ein klarer Plan für deine Vorbereitung.',
    },
    fsp: {
      title: 'Feststellungsprüfung (FSP): Fächer, Noten und Vorbereitung',
      description:
        'Alles Wichtige zur Feststellungsprüfung am Studienkolleg: Prüfungsaufbau, Fächer, Benotung und konkrete Vorbereitungstipps.',
    },
    login: {
      title: 'Anmelden',
      description: 'Melde dich bei deinem STUDIWELT-Lernkonto an.',
      noIndex: true,
    },
    register: {
      title: 'Kostenloses STUDIWELT-Konto erstellen',
      description:
        'Erstelle ein Konto und starte sechs kostenlose Lektionen zur Vorbereitung auf die Studienkolleg-Aufnahmeprüfung.',
      noIndex: true,
    },
  },
  ru: {
    landing: {
      title: 'Подготовка к Studienkolleg: немецкий и C-Test за 30 дней',
      description:
        'Структурированная подготовка к вступительному экзамену в Studienkolleg: C-Test, грамматика B2–C1, чтение и словарный запас.',
    },
    aboutStudienkolleg: {
      title: 'Что такое Studienkolleg: требования, курсы и экзамен FSP',
      description:
        'Разберитесь в требованиях Studienkolleg, курсах T, M, W, G и S, подаче документов, вступительном экзамене и Feststellungsprüfung.',
    },
    application: {
      title: 'Как поступить в Studienkolleg: документы, сроки и uni-assist',
      description:
        'Практическое руководство по подаче в Studienkolleg: uni-assist, необходимые документы, сроки, вступительный экзамен и виза.',
    },
    entranceExam: {
      title: 'Вступительный экзамен в Studienkolleg: тест и подготовка',
      description:
        'Узнайте, как устроен Aufnahmeprüfung, какие задания по немецкому и профильным предметам встречаются и как к ним готовиться.',
    },
    fsp: {
      title: 'Feststellungsprüfung (FSP): предметы, оценки и подготовка',
      description:
        'Понятное руководство по экзамену FSP в Studienkolleg: структура, предметы, система оценок и практические советы.',
    },
    login: {
      title: 'Войти',
      description: 'Войдите в учебный аккаунт STUDIWELT.',
      noIndex: true,
    },
    register: {
      title: 'Создать бесплатный аккаунт STUDIWELT',
      description:
        'Создайте аккаунт и начните шесть бесплатных уроков для подготовки к вступительному экзамену в Studienkolleg.',
      noIndex: true,
    },
  },
};

const OG_LOCALES: Record<SupportedLocale, string> = {
  en: 'en_US',
  de: 'de_DE',
  ru: 'ru_RU',
};

export function SEO({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
  structuredData,
  alternateLanguages = !noIndex,
}: SEOProps) {
  const { i18n } = useTranslation();
  const location = useLocation();
  const locale = normalizeLocale(i18n.resolvedLanguage ?? i18n.language);
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const localizedPath = localizePublicPath(location.pathname, locale);
  const canonical =
    canonicalUrl ?? `${SITE_URL}${localizedPath === '/' ? '' : localizedPath}`;
  const schemas = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : [];

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta
        name="robots"
        content={
          noIndex
            ? 'noindex, nofollow'
            : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
        }
      />
      <link rel="canonical" href={canonical} />

      {alternateLanguages && (
        <>
          {SUPPORTED_ALTERNATES.map((alternateLocale) => (
            <link
              key={alternateLocale}
              rel="alternate"
              hrefLang={alternateLocale}
              href={absolutePublicUrl(
                localizePublicPath(location.pathname, alternateLocale),
              )}
            />
          ))}
          <link
            rel="alternate"
            hrefLang="x-default"
            href={absolutePublicUrl(
              localizePublicPath(location.pathname, 'en'),
            )}
          />
        </>
      )}

      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={OG_LOCALES[locale]} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta
        property="og:image:alt"
        content={`${SITE_NAME} – ${title ?? 'Studienkolleg preparation'}`}
      />
      <meta property="og:url" content={canonical} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

const SUPPORTED_ALTERNATES: SupportedLocale[] = ['en', 'de', 'ru'];

export function useSEOConfig(page: SeoPageKey) {
  const { i18n } = useTranslation();
  const locale = normalizeLocale(i18n.resolvedLanguage ?? i18n.language);
  const copy = SEO_COPY[locale][page];

  if (page !== 'landing') return copy;

  const localizedHome = localizePublicPath('/', locale);
  const canonicalHome = absolutePublicUrl(localizedHome);

  return {
    ...copy,
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        description: copy.description,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: locale,
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: copy.title,
        description: copy.description,
        url: canonicalHome,
        inLanguage: locale,
        educationalLevel: 'B2–C1',
        provider: { '@id': `${SITE_URL}/#organization` },
        offers: {
          '@type': 'Offer',
          price: '5.00',
          priceCurrency: 'USD',
          category: 'Lifetime access',
          url: absolutePublicUrl(
            `${localePrefix(locale)}/register`,
          ),
          availability: 'https://schema.org/InStock',
        },
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'online',
          courseWorkload: 'P30D',
        },
      },
    ],
  };
}

export function getStudienkollegSEO(
  name: string,
  city: string,
  state: string,
  language?: string,
) {
  const locale = normalizeLocale(language);

  if (locale === 'de') {
    return {
      title: `${name}: Bewerbung und Aufnahmetest`,
      description: `${name} in ${city}, ${state}: angebotene Schwerpunktkurse, Bewerbung, Fristen und Informationen zur Aufnahmeprüfung.`,
    };
  }

  if (locale === 'ru') {
    return {
      title: `${name}: поступление и экзамен`,
      description: `${name} в городе ${city}: доступные курсы, порядок подачи, сроки и информация о вступительном экзамене.`,
    };
  }

  return {
    title: `${name}: Application and Entrance Exam`,
    description: `${name} in ${city}, ${state}: available courses, application route, deadlines and entrance-exam information.`,
  };
}

export function getStateSEO(
  stateName: string,
  germanName: string,
  language?: string,
) {
  const locale = normalizeLocale(language);

  if (locale === 'de') {
    return {
      title: `Studienkollegs in ${germanName}`,
      description: `Studienkollegs und Hochschulen in ${germanName}: Standorte, Schwerpunktkurse, Bewerbungswege und Informationen für internationale Studierende.`,
    };
  }

  if (locale === 'ru') {
    return {
      title: `Studienkolleg в земле ${stateName}`,
      description: `Studienkolleg и университеты земли ${stateName}: города, профильные курсы, поступление и информация для иностранных студентов.`,
    };
  }

  return {
    title: `Studienkollegs in ${stateName}: Study in Germany`,
    description: `Explore Studienkollegs and universities in ${stateName}, Germany, including locations, courses and application routes for international students.`,
  };
}

export function createBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
