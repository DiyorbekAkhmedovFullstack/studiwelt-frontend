import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LandingNavbar } from '../components/landing/LandingNavbar';
import {
  SEO,
  SITE_URL,
  createBreadcrumbSchema,
} from '../components/common/SEO';
import { localizePublicPath, normalizeLocale } from '../lib/publicRoutes';

type PageCopy = {
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  practiceTitle: string;
  practiceIntro: string;
  check: string;
  retry: string;
  result: (score: number) => string;
  solution: string;
  solutionText: string;
  howTitle: string;
  howSteps: Array<{ title: string; description: string }>;
  strategyTitle: string;
  strategies: string[];
  sourcesTitle: string;
  sourcesIntro: string;
  sourceLabels: [string, string];
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
  reviewed: string;
  author: string;
  ctaTitle: string;
  ctaText: string;
  cta: string;
};

const COPY: Record<'en' | 'de' | 'ru', PageCopy> = {
  en: {
    title: 'Free C-Test Practice for the Studienkolleg Entrance Exam',
    description:
      'Try a free German C-Test exercise and learn a practical method for solving word gaps in the Studienkolleg entrance exam.',
    eyebrow: 'FREE PRACTICE • NO REGISTRATION',
    intro:
      'C-Tests check vocabulary, grammar and reading speed at the same time. Complete the missing word endings below, then use the strategy guide to understand how to improve.',
    practiceTitle: 'Mini C-Test: complete four word endings',
    practiceIntro:
      'Read the whole sentence first. Enter only the missing letters, not the complete word.',
    check: 'Check answers',
    retry: 'Try again',
    result: (score) => `${score} of 4 correct`,
    solution: 'Show the complete sentence',
    solutionText:
      'Regelmäßiges gezieltes Training verbessert systematisch Wortschatz und akademisches Lesetempo.',
    howTitle: 'How a C-Test works',
    howSteps: [
      {
        title: 'Use the sentence, not the isolated gap',
        description:
          'Case, tense, adjective endings and word order usually reveal the grammatical form you need.',
      },
      {
        title: 'Reconstruct the word family',
        description:
          'The visible beginning suggests the word, but the surrounding meaning confirms whether it fits.',
      },
      {
        title: 'Check spelling last',
        description:
          'A plausible word can still lose the point when its ending, umlaut or capitalization is wrong.',
      },
    ],
    strategyTitle: 'A reliable exam strategy',
    strategies: [
      'Read the complete text once before filling difficult gaps.',
      'Solve obvious grammar endings first and mark uncertain vocabulary.',
      'Check that every completed word fits both meaning and sentence structure.',
      'Practise under the time limit shown by your target Studienkolleg.',
      'Use the official sample test of your institution because formats can differ.',
    ],
    sourcesTitle: 'Verify the format with official examples',
    sourcesIntro:
      'Entrance-test formats are set by each institution. These official Berlin pages publish current information and sample material; always confirm the rules with your own Studienkolleg.',
    sourceLabels: ['TU Berlin exam examples', 'FU Berlin entrance-test information'],
    faqTitle: 'Common C-Test questions',
    faqs: [
      {
        question: 'Is every Studienkolleg C-Test identical?',
        answer:
          'No. The number of texts, gaps, time limit and additional tasks can differ. The official sample from your target institution is the safest reference.',
      },
      {
        question: 'What German level should I practise?',
        answer:
          'Requirements vary, but preparation commonly bridges B2 academic German toward the language demands of Studienkolleg and FSP work.',
      },
      {
        question: 'How do I improve fastest?',
        answer:
          'Combine timed C-Tests with vocabulary, grammar and reading practice. Reviewing why an ending was wrong is more useful than repeating gaps mechanically.',
      },
    ],
    reviewed: 'Last reviewed: 8 September 2026',
    author: 'Written and reviewed by Diyorbek, author of STUDIWELT',
    ctaTitle: 'Continue with a structured 30-day plan',
    ctaText:
      'Practise C-Tests together with B2–C1 grammar, academic reading and vocabulary. The first six lessons are free.',
    cta: 'Start six free lessons',
  },
  de: {
    title: 'C-Test-Übungen für die Studienkolleg-Aufnahmeprüfung',
    description:
      'Kostenlose C-Test-Übung mit Lösungsstrategie für den Deutsch-Aufnahmetest am Studienkolleg – direkt online und ohne Anmeldung.',
    eyebrow: 'KOSTENLOSE ÜBUNG • OHNE ANMELDUNG',
    intro:
      'C-Tests prüfen Wortschatz, Grammatik und Lesetempo gleichzeitig. Ergänze unten die fehlenden Wortenden und nutze danach die Strategie, um gezielt besser zu werden.',
    practiceTitle: 'Mini-C-Test: Ergänze vier Wortenden',
    practiceIntro:
      'Lies zuerst den ganzen Satz. Gib nur die fehlenden Buchstaben ein, nicht das vollständige Wort.',
    check: 'Antworten prüfen',
    retry: 'Noch einmal',
    result: (score) => `${score} von 4 richtig`,
    solution: 'Vollständigen Satz anzeigen',
    solutionText:
      'Regelmäßiges gezieltes Training verbessert systematisch Wortschatz und akademisches Lesetempo.',
    howTitle: 'So funktioniert ein C-Test',
    howSteps: [
      {
        title: 'Nutze den ganzen Satz',
        description:
          'Kasus, Zeitform, Adjektivendung und Wortstellung zeigen meistens, welche grammatische Form fehlt.',
      },
      {
        title: 'Rekonstruiere die Wortfamilie',
        description:
          'Der sichtbare Wortanfang liefert eine Vermutung; der Kontext bestätigt, ob das Wort wirklich passt.',
      },
      {
        title: 'Prüfe am Ende die Schreibweise',
        description:
          'Ein inhaltlich passendes Wort kann durch eine falsche Endung, einen Umlaut oder Großschreibung falsch sein.',
      },
    ],
    strategyTitle: 'Eine zuverlässige Prüfungsstrategie',
    strategies: [
      'Lies den vollständigen Text einmal, bevor du schwierige Lücken löst.',
      'Ergänze zuerst eindeutige Grammatikendungen und markiere unsichere Wörter.',
      'Prüfe bei jedem Wort Bedeutung und Satzbau.',
      'Übe mit dem Zeitlimit deines Ziel-Studienkollegs.',
      'Nutze dessen offiziellen Mustertest, denn die Formate unterscheiden sich.',
    ],
    sourcesTitle: 'Prüfungsformat mit offiziellen Beispielen prüfen',
    sourcesIntro:
      'Jedes Studienkolleg legt sein Prüfungsformat selbst fest. Diese offiziellen Berliner Seiten bieten Informationen und Muster; prüfe zusätzlich immer die Angaben deines Ziel-Studienkollegs.',
    sourceLabels: ['Prüfungsbeispiele der TU Berlin', 'Aufnahmetest-Informationen der FU Berlin'],
    faqTitle: 'Häufige Fragen zum C-Test',
    faqs: [
      {
        question: 'Ist jeder Studienkolleg-C-Test gleich?',
        answer:
          'Nein. Anzahl der Texte und Lücken, Zeitlimit und Zusatzaufgaben können abweichen. Maßgeblich ist der offizielle Mustertest deines Studienkollegs.',
      },
      {
        question: 'Auf welchem Deutschniveau sollte ich üben?',
        answer:
          'Die Voraussetzungen unterscheiden sich. Sinnvoll ist meist akademisches Deutsch ab B2 bis zu den sprachlichen Anforderungen im Studienkolleg und in der FSP.',
      },
      {
        question: 'Wie verbessere ich mich am schnellsten?',
        answer:
          'Verbinde C-Tests unter Zeitdruck mit Wortschatz, Grammatik und Leseverstehen. Analysiere jeden Fehler, statt Lücken nur mechanisch zu wiederholen.',
      },
    ],
    reviewed: 'Zuletzt geprüft: 8. September 2026',
    author: 'Geschrieben und geprüft von Diyorbek, Autor von STUDIWELT',
    ctaTitle: 'Mit einem strukturierten 30-Tage-Plan weitermachen',
    ctaText:
      'Trainiere C-Tests zusammen mit B2–C1-Grammatik, akademischem Lesen und Wortschatz. Die ersten sechs Lektionen sind kostenlos.',
    cta: 'Sechs kostenlose Lektionen starten',
  },
  ru: {
    title: 'Бесплатный C-Test для вступительного экзамена в Studienkolleg',
    description:
      'Пройдите бесплатное упражнение C-Test и изучите стратегию заполнения пропусков на вступительном экзамене в Studienkolleg.',
    eyebrow: 'БЕСПЛАТНО • БЕЗ РЕГИСТРАЦИИ',
    intro:
      'C-Test одновременно проверяет словарный запас, грамматику и скорость чтения. Дополните окончания слов, а затем разберите стратегию решения.',
    practiceTitle: 'Мини-C-Test: дополните четыре слова',
    practiceIntro:
      'Сначала прочитайте всё предложение. Вводите только недостающие буквы, а не слово целиком.',
    check: 'Проверить ответы',
    retry: 'Попробовать снова',
    result: (score) => `${score} из 4 правильно`,
    solution: 'Показать полное предложение',
    solutionText:
      'Regelmäßiges gezieltes Training verbessert systematisch Wortschatz und akademisches Lesetempo.',
    howTitle: 'Как работает C-Test',
    howSteps: [
      {
        title: 'Смотрите на всё предложение',
        description:
          'Падеж, время, окончание прилагательного и порядок слов обычно подсказывают нужную грамматическую форму.',
      },
      {
        title: 'Восстановите слово по контексту',
        description:
          'Видимое начало даёт гипотезу, а смысл соседних слов подтверждает, действительно ли слово подходит.',
      },
      {
        title: 'В конце проверьте написание',
        description:
          'Подходящее по смыслу слово может оказаться неверным из-за окончания, умлаута или регистра.',
      },
    ],
    strategyTitle: 'Надёжная стратегия на экзамене',
    strategies: [
      'Сначала один раз прочитайте весь текст.',
      'Заполните очевидные грамматические окончания и отметьте сложные слова.',
      'Проверьте, подходит ли каждое слово одновременно по смыслу и структуре.',
      'Тренируйтесь с лимитом времени вашего Studienkolleg.',
      'Используйте официальный пробный тест выбранного учреждения: форматы различаются.',
    ],
    sourcesTitle: 'Сверяйтесь с официальными примерами',
    sourcesIntro:
      'Формат определяет конкретный Studienkolleg. На этих официальных страницах Берлина есть информация и примеры; дополнительно проверьте сайт своего учреждения.',
    sourceLabels: ['Примеры экзаменов TU Berlin', 'Информация об экзамене FU Berlin'],
    faqTitle: 'Частые вопросы о C-Test',
    faqs: [
      {
        question: 'Во всех Studienkolleg одинаковый C-Test?',
        answer:
          'Нет. Количество текстов и пропусков, время и дополнительные задания могут отличаться. Главный ориентир — официальный пример вашего Studienkolleg.',
      },
      {
        question: 'На каком уровне немецкого тренироваться?',
        answer:
          'Требования различаются. Обычно полезно развивать академический немецкий от B2 к уровню, необходимому для учёбы и FSP.',
      },
      {
        question: 'Как прогрессировать быстрее?',
        answer:
          'Сочетайте C-Test на время со словарём, грамматикой и чтением. Разбор причины каждой ошибки полезнее механического повторения.',
      },
    ],
    reviewed: 'Последняя проверка: 8 сентября 2026 г.',
    author: 'Автор и редактор: Диёрбек, создатель STUDIWELT',
    ctaTitle: 'Продолжите подготовку по плану на 30 дней',
    ctaText:
      'Тренируйте C-Test вместе с грамматикой B2–C1, академическим чтением и словарём. Первые шесть уроков бесплатны.',
    cta: 'Начать шесть бесплатных уроков',
  },
};

const GAPS = [
  { prefix: 'gezie', answer: 'ltes' },
  { prefix: 'verbe', answer: 'ssert' },
  { prefix: 'Worts', answer: 'chatz' },
  { prefix: 'akadem', answer: 'isches' },
] as const;

export function CtestGuidePage() {
  const { i18n } = useTranslation();
  const locale = normalizeLocale(i18n.resolvedLanguage ?? i18n.language);
  const copy = COPY[locale];
  const [answers, setAnswers] = useState<string[]>(() => GAPS.map(() => ''));
  const [checked, setChecked] = useState(false);
  const score = GAPS.reduce(
    (total, gap, index) =>
      total + (answers[index]?.trim().toLocaleLowerCase('de') === gap.answer ? 1 : 0),
    0,
  );
  const canonicalPath = localizePublicPath('/c-test-studienkolleg', locale);
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const schemas = [
    createBreadcrumbSchema([
      { name: 'STUDIWELT', url: SITE_URL },
      { name: 'C-Test', url: canonicalUrl },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: copy.title,
      description: copy.description,
      url: canonicalUrl,
      inLanguage: locale,
      datePublished: '2026-09-08',
      dateModified: '2026-09-08',
      author: {
        '@type': 'Person',
        name: 'Diyorbek',
        url: `${SITE_URL}${localizePublicPath('/about', locale)}`,
      },
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: copy.practiceTitle,
      description: copy.practiceIntro,
      learningResourceType: 'Practice problem',
      educationalLevel: 'B2–C1',
      inLanguage: ['de', locale],
      isAccessibleForFree: true,
      url: canonicalUrl,
    },
  ];

  const updateAnswer = (index: number, value: string) => {
    setAnswers((current) => current.map((answer, i) => (i === index ? value : answer)));
    setChecked(false);
  };

  const reset = () => {
    setAnswers(GAPS.map(() => ''));
    setChecked(false);
  };

  return (
    <div className="min-h-screen bg-page text-text-main">
      <SEO
        title={copy.title}
        description={copy.description}
        ogType="article"
        structuredData={schemas}
      />
      <LandingNavbar />

      <main id="main-content">
        <article>
          <header className="px-4 pb-14 pt-36 text-center sm:px-6 md:pt-44">
            <div className="mx-auto max-w-[850px]">
              <p className="mb-5 text-xs font-bold tracking-[0.14em] text-primary">
                {copy.eyebrow}
              </p>
              <h1 className="mb-6 text-3xl font-bold leading-tight sm:text-4xl md:text-6xl">
                {copy.title}
              </h1>
              <p className="mx-auto max-w-[720px] text-base leading-relaxed text-text-muted sm:text-lg">
                {copy.intro}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-text-muted">
                <span>{copy.author}</span>
                <span aria-hidden="true">•</span>
                <time dateTime="2026-09-08">{copy.reviewed}</time>
              </div>
            </div>
          </header>

          <section className="px-4 pb-20 sm:px-6" aria-labelledby="practice-title">
            <div className="mx-auto max-w-[900px] rounded-[28px] border border-border bg-surface p-6 shadow-card sm:p-10">
              <h2 id="practice-title" className="mb-3 text-2xl font-bold sm:text-3xl">
                {copy.practiceTitle}
              </h2>
              <p className="mb-8 text-text-muted">{copy.practiceIntro}</p>

              <div className="rounded-2xl bg-page p-5 text-lg leading-[2.4] sm:p-7 sm:text-xl">
                <p>
                  Viele internationale Studienbewerber bereiten sich frühzeitig auf die
                  Aufnahmeprüfung vor. Regelmäßiges{' '}
                  <GapInput gap={GAPS[0]} index={0} value={answers[0] ?? ''} checked={checked} onChange={updateAnswer} />{' '}
                  Training{' '}
                  <GapInput gap={GAPS[1]} index={1} value={answers[1] ?? ''} checked={checked} onChange={updateAnswer} />{' '}
                  systematisch{' '}
                  <GapInput gap={GAPS[2]} index={2} value={answers[2] ?? ''} checked={checked} onChange={updateAnswer} />{' '}
                  und{' '}
                  <GapInput gap={GAPS[3]} index={3} value={answers[3] ?? ''} checked={checked} onChange={updateAnswer} />{' '}
                  Lesetempo.
                </p>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setChecked(true)}
                  className="rounded-full bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-hover"
                >
                  {copy.check}
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-full border border-border px-6 py-3 font-semibold hover:bg-page"
                >
                  {copy.retry}
                </button>
                {checked && (
                  <strong className={score === GAPS.length ? 'text-success' : 'text-primary'}>
                    {copy.result(score)}
                  </strong>
                )}
              </div>

              <details className="mt-6 rounded-xl border border-border px-5 py-4">
                <summary className="cursor-pointer font-semibold">{copy.solution}</summary>
                <p className="mt-3 text-text-muted">{copy.solutionText}</p>
              </details>
            </div>
          </section>

          <section className="bg-surface px-4 py-20 sm:px-6">
            <div className="mx-auto max-w-[1000px]">
              <h2 className="mb-10 text-center text-3xl font-bold sm:text-4xl">{copy.howTitle}</h2>
              <div className="grid gap-5 md:grid-cols-3">
                {copy.howSteps.map((step, index) => (
                  <div key={step.title} className="rounded-2xl border border-border bg-page p-6">
                    <span className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <h3 className="mb-2 text-lg font-bold">{step.title}</h3>
                    <p className="leading-relaxed text-text-muted">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-4 py-20 sm:px-6">
            <div className="mx-auto grid max-w-[1000px] gap-10 lg:grid-cols-2">
              <div>
                <h2 className="mb-6 text-3xl font-bold">{copy.strategyTitle}</h2>
                <ol className="space-y-4">
                  {copy.strategies.map((strategy, index) => (
                    <li key={strategy} className="flex gap-4 leading-relaxed text-text-muted">
                      <span className="font-bold text-primary">{index + 1}.</span>
                      <span>{strategy}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <aside className="rounded-2xl border border-border bg-surface p-7">
                <h2 className="mb-3 text-2xl font-bold">{copy.sourcesTitle}</h2>
                <p className="mb-6 leading-relaxed text-text-muted">{copy.sourcesIntro}</p>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="https://www.tu.berlin/international/studierende/studienkolleg/faecher-und-pruefungsbeispiele"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-primary hover:underline"
                    >
                      {copy.sourceLabels[0]} ↗
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.fu-berlin.de/sites/studienkolleg/aufnahmetest/index.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-primary hover:underline"
                    >
                      {copy.sourceLabels[1]} ↗
                    </a>
                  </li>
                </ul>
              </aside>
            </div>
          </section>

          <section className="bg-surface px-4 py-20 sm:px-6">
            <div className="mx-auto max-w-[850px]">
              <h2 className="mb-8 text-center text-3xl font-bold">{copy.faqTitle}</h2>
              <div className="space-y-4">
                {copy.faqs.map((faq) => (
                  <details key={faq.question} className="rounded-2xl border border-border bg-page p-6">
                    <summary className="cursor-pointer text-lg font-bold">{faq.question}</summary>
                    <p className="mt-3 leading-relaxed text-text-muted">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section className="px-4 py-20 text-center sm:px-6">
            <div className="mx-auto max-w-[760px] rounded-[28px] bg-text-main p-8 text-white sm:p-12">
              <h2 className="mb-4 text-3xl font-bold">{copy.ctaTitle}</h2>
              <p className="mb-7 leading-relaxed text-white/75">{copy.ctaText}</p>
              <Link
                to="/register"
                className="inline-flex rounded-full bg-primary px-7 py-3.5 font-bold text-white transition-transform hover:-translate-y-0.5"
              >
                {copy.cta}
              </Link>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}

function GapInput({
  gap,
  index,
  value,
  checked,
  onChange,
}: {
  gap: (typeof GAPS)[number];
  index: number;
  value: string;
  checked: boolean;
  onChange: (index: number, value: string) => void;
}) {
  const isCorrect = value.trim().toLocaleLowerCase('de') === gap.answer;

  return (
    <span className="inline-flex items-baseline whitespace-nowrap font-semibold">
      {gap.prefix}
      <label className="sr-only" htmlFor={`ctest-gap-${index}`}>
        Missing letters for word {index + 1}
      </label>
      <input
        id={`ctest-gap-${index}`}
        value={value}
        onChange={(event) => onChange(index, event.target.value)}
        autoComplete="off"
        spellCheck={false}
        aria-invalid={checked && !isCorrect}
        className={`mx-0.5 w-[5.2rem] border-b-2 bg-transparent px-1 text-center font-semibold outline-none transition-colors ${
          checked
            ? isCorrect
              ? 'border-success text-success'
              : 'border-danger text-danger'
            : 'border-primary focus:border-primary-hover'
        }`}
      />
    </span>
  );
}
