import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { toastService } from '../services/toastService';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { useLessonByNumber } from '../hooks/queries/useLessons';
import { useCTestsByLesson, useCreateCTest, useUpdateCTest, useDeleteCTest } from '../hooks/queries/useCTests';
import { Icon } from '../lib/icons';

type Params = {
  lessonNumber?: string;
};

type CtestDiagnostic =
  | { type: 'ok' }
  | { type: 'lengthMismatch'; originalLength: number; gapLength: number }
  | {
      type: 'contentMismatch';
      index: number;
      originalChar: string;
      gapChar: string;
    };

function getCtestDiagnostic(
  originalText: string,
  gapText: string,
): CtestDiagnostic | null {
  if (!originalText && !gapText) return null;
  const originalLength = originalText.length;
  const gapLength = gapText.length;

  if (originalLength === 0 || gapLength === 0) return null;

  if (originalLength !== gapLength) {
    return { type: 'lengthMismatch', originalLength, gapLength };
  }

  for (let i = 0; i < originalLength; i++) {
    const originalChar = originalText[i]!;
    const gapChar = gapText[i]!;

    if (gapChar === '*') continue;
    if (originalChar !== gapChar) {
      return {
        type: 'contentMismatch',
        index: i,
        originalChar,
        gapChar,
      };
    }
  }

  return { type: 'ok' };
}

// COMPREHENSIVE DSH DICTIONARY (Singular & Plural)
// Covers: Environment, Tech, Society, Economy, Health, History, Culture
const COMPOUND_NOUNS = [
  // 1. BASIC ELEMENTS (Environment & Resources)
  'wetter', 'klima', 'wandel', 'schutz', 'erwärmung', 'hitze', 'kälte',
  'luft', 'wind', 'winde', 'sturm', 'stürme', 'wolke', 'wolken',
  'wasser', 'gewässer', 'meer', 'meere', 'see', 'seen', 'ozean', 'ozeane',
  'fluss', 'flüsse', 'quelle', 'quellen', 'pegel', 'spiegel', 'hochwasser',
  'erde', 'boden', 'böden', 'land', 'länder', 'ebene', 'ebenen', 'fläche', 'flächen',
  'wald', 'wälder', 'holz', 'baum', 'bäume', 'blatt', 'blätter', 'wiese', 'wiesen',
  'natur', 'bio', 'art', 'arten', 'vielfalt', 'tier', 'tiere', 'pflanze', 'pflanzen',
  'energie', 'energien', 'strom', 'kraft', 'kräfte', 'werk', 'werke', 'träger',
  'gas', 'gase', 'öl', 'öle', 'kohle', 'atom', 'kern', 'sonne', 'licht',
  'stoff', 'stoffe', 'material', 'materialien', 'ressource', 'ressourcen',
  'müll', 'abfall', 'abfälle', 'rest', 'reste', 'plastik', 'kunststoff',

  // 2. TECHNOLOGY & INFRASTRUCTURE
  'technik', 'techniken', 'technologie', 'technologien', 'digitalisierung', 'elektronik',
  'computer', 'rechner', 'roboter', 'bot', 'bots', 'intelligenz', 'daten', 'datei', 'dateien',
  'netz', 'netze', 'web', 'internet', 'software', 'hardware', 'programm', 'programme',
  'system', 'systeme', 'plattform', 'plattformen', 'medium', 'medien', 'kanal', 'kanäle',
  'gerät', 'geräte', 'maschine', 'maschinen', 'motor', 'motoren', 'automat', 'automaten',
  'auto', 'autos', 'wagen', 'fahrzeug', 'fahrzeuge', 'rad', 'räder', 'antrieb', 'antriebe',
  'verkehr', 'transport', 'mobilität', 'straße', 'straßen', 'weg', 'wege', 'bahn', 'bahnen',
  'flug', 'flüge', 'hafen', 'häfen', 'brücke', 'brücken', 'tunnel', 'stau', 'staus',
  'bau', 'bauten', 'gebäude', 'haus', 'häuser', 'wand', 'wände', 'dach', 'dächer',
  'raum', 'räume', 'zimmer', 'ort', 'orte', 'stelle', 'stellen', 'platz', 'plätze',
  'zentrum', 'zentren', 'stadt', 'städte', 'dorf', 'dörfer', 'zone', 'zonen',

  // 3. SOCIETY, WORK & EDUCATION
  'gesellschaft', 'gesellschaften', 'bevölkerung', 'gemeinschaft', 'leute', 'menschen',
  'gruppe', 'gruppen', 'team', 'teams', 'mitglied', 'mitglieder', 'nachbar', 'nachbarn',
  'familie', 'familien', 'eltern', 'kind', 'kinder', 'frau', 'frauen', 'mann', 'männer',
  'person', 'personen', 'bürger', 'einwohner', 'freund', 'freunde', 'feind', 'feinde',
  'alter', 'jugend', 'senior', 'senioren', 'generation', 'generationen',
  'arbeit', 'arbeiten', 'job', 'jobs', 'beruf', 'berufe', 'karriere',
  'geber', 'nehmer', 'kraft', 'kräfte', 'markt', 'märkte', 'zeit', 'zeiten', 'stunde', 'stunden',
  'freizeit', 'urlaub', 'reise', 'reisen', 'tourismus', 'ziel', 'ziele',
  'bildung', 'ausbildung', 'schule', 'schulen', 'klasse', 'klassen', 'unterricht',
  'studium', 'studien', 'universität', 'universitäten', 'hochschule', 'hochschulen',
  'forschung', 'forschungen', 'wissenschaft', 'wissenschaften', 'labor', 'labore',
  'wissen', 'kompetenz', 'kompetenzen', 'lernen', 'lehre',
  'sprache', 'sprachen', 'wort', 'wörter', 'worte', 'text', 'texte', 'satz', 'sätze',
  'kommunikation', 'gespräch', 'gespräche', 'diskussion', 'diskussionen', 'info', 'infos',

  // 4. HEALTH, BODY & PSYCHOLOGY
  'gesundheit', 'krankheit', 'krankheiten', 'medizin', 'therapie', 'therapien',
  'behandlung', 'behandlungen', 'pflege', 'klinik', 'kliniken', 'praxis', 'praxen',
  'arzt', 'ärzte', 'patient', 'patienten', 'opfer', 'täter',
  'virus', 'viren', 'bakterie', 'bakterien', 'infektion', 'infektionen', 'pandemie',
  'schutz', 'maske', 'masken', 'impfung', 'impfungen', 'hygiene',
  'körper', 'organ', 'organe', 'herz', 'kopf', 'hirn', 'gehirn', 'hand', 'hände', 'fuß', 'füße',
  'ernährung', 'nahrung', 'essen', 'trinken', 'lebensmittel', 'fleisch', 'gemüse', 'obst',
  'schlaf', 'traum', 'träume', 'mangel', 'störung', 'störungen',
  'psyche', 'seele', 'geist', 'stress', 'druck', 'angst', 'ängste', 'furcht',
  'sport', 'bewegung', 'spiel', 'spiele', 'leistung', 'leistungen',

  // 5. ECONOMY, POLITICS & HISTORY
  'wirtschaft', 'ökonomie', 'industrie', 'industrien', 'handel', 'export', 'import', 'globalisierung',
  'firma', 'firmen', 'unternehmen', 'betrieb', 'betriebe', 'konzern', 'konzerne',
  'produkt', 'produkte', 'ware', 'waren', 'gut', 'güter', 'konsum', 'verbrauch',
  'geld', 'finanz', 'finanzen', 'währung', 'kapital', 'bank', 'banken', 'konto', 'konten',
  'preis', 'preise', 'kosten', 'steuer', 'steuern', 'zins', 'zinsen', 'wert', 'werte',
  'gewinn', 'gewinne', 'verlust', 'verluste', 'umsatz', 'ausgabe', 'ausgaben',
  'politik', 'politiker', 'regierung', 'regierungen', 'staat', 'staaten', 'bund', 'union',
  'partei', 'parteien', 'wahl', 'wahlen', 'stimme', 'stimmen', 'macht', 'mächte',
  'gesetz', 'gesetze', 'recht', 'rechte', 'regelung', 'regelungen', 'vorschrift', 'vorschriften',
  'amt', 'ämter', 'behörde', 'behörden', 'verwaltung',
  'geschichte', 'historie', 'vergangenheit', 'zukunft', 'krieg', 'kriege', 'frieden',
  'krise', 'krisen', 'konflikt', 'konflikte', 'problem', 'probleme',
  'kultur', 'kulturen', 'religion', 'religionen', 'geschichte', 'geschichten',

  // 6. ABSTRACT COMPOUND HEADS (Examples: "Stadt-entwicklung", "Energie-versorgung")
  // These are crucial for B2/C level nouns that end in -ung, -heit, -keit.
  'entwicklung', 'entwicklungen', 'versorgung', 'entsorgung', 'bewegung', 'bewegungen',
  'wirkung', 'wirkungen', 'veränderung', 'veränderungen', 'erfahrung', 'erfahrungen',
  'lösung', 'lösungen', 'meinung', 'meinungen', 'bedeutung', 'bedeutungen',
  'nutzung', 'nutzungen', 'anwendung', 'anwendungen', 'verbindung', 'verbindungen',
  'forschung', 'forschungen', 'untersuchung', 'untersuchungen', 'beobachtung', 'beobachtungen',
  'forderung', 'forderungen', 'förderung', 'förderungen', 'herausforderung',
  'sicherheit', 'unsicherheit', 'freiheit', 'freiheiten', 'krankheit', 'krankheiten',
  'geschwindigkeit', 'geschwindigkeiten', 'fähigkeit', 'fähigkeiten', 'möglichkeit', 'möglichkeiten',
  'teil', 'teile', 'anteil', 'anteile', 'vorteil', 'vorteile', 'nachteil', 'nachteile',
  'fall', 'fälle', 'beispiel', 'beispiele', 'form', 'formen', 'art', 'arten', 'weise',
  'grund', 'gründe', 'ursache', 'ursachen', 'folge', 'folgen', 'ergebnis', 'ergebnisse',
  'situation', 'situationen', 'lage', 'lagen', 'zustand', 'zustände',
  'bedingung', 'bedingungen', 'voraussetzung', 'voraussetzungen',
  'maßnahme', 'maßnahmen', 'prozess', 'prozesse', 'projekt', 'projekte',
  'ebene', 'ebenen', 'niveau', 'niveaus', 'grad', 'grade',
  'seite', 'seiten', 'sicht', 'ansicht', 'perspektive', 'perspektiven',
  'frage', 'fragen', 'antwort', 'antworten', 'thema', 'themen',
  'zahl', 'zahlen', 'anzahl', 'menge', 'mengen', 'liste', 'listen',
  'anfang', 'anfänge', 'beginn', 'ende', 'enden', 'schluss',
];

/**
 * Generates C-test gap text with intelligent German compound noun detection.
 * - First sentence: left intact (lead-in)
 * - Remaining text: gaps every 2nd word
 * - Keeps first half of target word/compound part (rounded up)
 * - Auto-detects German compound nouns for proper splitting
 * - Numbers and punctuation: preserved
 */
function generateCtestGapText(originalText: string): string {
  if (!originalText.trim()) return '';

  // 1. Find end of first sentence (lead-in)
  const sentenceEndRegex = /([.!?])(\s+|$)/;
  const match = originalText.match(sentenceEndRegex);
  let leadInIndex = originalText.length;
  if (match) {
    leadInIndex = (match.index ?? 0) + 1;
  }

  const leadIn = originalText.substring(0, leadInIndex);
  const rest = originalText.substring(leadInIndex);

  // 2. Tokenize remaining text
  const parts = rest.split(/(\s+)/);

  let output = leadIn;
  let wordCount = 0;

  for (const part of parts) {
    // Check if token contains letters
    if (/[a-zA-ZäöüÄÖÜß]/.test(part)) {
      wordCount++;
      if (wordCount % 2 === 0) {
        // Gap this word
        output += getGappedWord(part);
      } else {
        // Keep as is
        output += part;
      }
    } else {
      // Whitespace or punctuation only
      output += part;
    }
  }

  return output;
}

/**
 * Processes a single word for C-test gapping with compound noun detection.
 */
function getGappedWord(word: string): string {
  // 1. Separate punctuation
  const matchResult = word.match(/^([^a-zA-ZäöüÄÖÜß]*)([a-zA-ZäöüÄÖÜß]+)([^a-zA-ZäöüÄÖÜß]*)$/);
  if (!matchResult) return word;

  const punctuationBefore = matchResult[1] ?? '';
  const coreWord = matchResult[2] ?? '';
  const punctuationAfter = matchResult[3] ?? '';

  // 2. Identify the part to gap (target)
  let prefix = '';
  let target = coreWord;

  // Auto-detect compound nouns
  // Sort by length (longest first) to prevent partial matching
  const sortedNouns = [...COMPOUND_NOUNS].sort((a, b) => b.length - a.length);

  for (const noun of sortedNouns) {
    // Word must end with this noun and be longer than the noun itself
    if (coreWord.length > noun.length && coreWord.toLowerCase().endsWith(noun)) {
      const splitIndex = coreWord.length - noun.length;
      prefix = coreWord.substring(0, splitIndex);
      target = coreWord.substring(splitIndex);
      break;
    }
  }

  // 3. Apply the 50% rule (keep first half, rounded up)
  const len = target.length;
  const keepCount = len <= 1 ? 1 : Math.ceil(len / 2);

  const visiblePart = target.substring(0, keepCount);
  const missingPartLength = len - keepCount;
  const stars = '*'.repeat(missingPartLength);

  return punctuationBefore + prefix + visiblePart + stars + punctuationAfter;
}

export function AdminCtestPage() {
  const { t } = useTranslation();
  const { lessonNumber } = useParams<Params>();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [originalText, setOriginalText] = useState('');
  const [gapText, setGapText] = useState('');
  const [initialized, setInitialized] = useState(false);

  // Fetch lesson data using React Query
  const {
    data: lesson,
    isLoading: lessonLoading,
    error: lessonError,
  } = useLessonByNumber(lessonNumber ? Number(lessonNumber) : 0);

  const lessonId = lesson?.id;

  // Fetch C-tests (depends on lesson.id)
  const {
    data: ctests = [],
    isLoading: ctestsLoading,
  } = useCTestsByLesson(lessonId ?? 0);

  const ctest = ctests[0] ?? null;

  // Mutations
  const createMutation = useCreateCTest();
  const updateMutation = useUpdateCTest();
  const deleteMutation = useDeleteCTest(lessonId ?? 0);

  const loading = lessonLoading || ctestsLoading;
  const error = lessonError
    ? lessonError instanceof Error
      ? lessonError.message
      : 'Load failed.'
    : null;

  // Initialize form when ctest data loads
  /* eslint-disable react-hooks/set-state-in-effect -- intentional initialization from fetched data */
  useEffect(() => {
    if (!initialized && !loading && ctest) {
      setTitle(ctest.title);
      setDescription(ctest.description ?? '');
      setOriginalText(ctest.originalText);
      setGapText(ctest.gapText);
      setInitialized(true);
    }
  }, [ctest, loading, initialized]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const diagnostic = useMemo(
    () => getCtestDiagnostic(originalText, gapText),
    [originalText, gapText],
  );

  // Auto-generate gap text when original text changes
  const handleOriginalTextChange = (newText: string) => {
    setOriginalText(newText);
    // Only auto-generate if there's text and gap text is empty or was auto-generated
    if (newText.trim()) {
      const generated = generateCtestGapText(newText);
      setGapText(generated);
    } else {
      setGapText('');
    }
  };

  const beginEdit = () => {
    setEditing(true);
  };

  const cancelEdit = () => {
    if (ctest) {
      setTitle(ctest.title);
      setDescription(ctest.description ?? '');
      setOriginalText(ctest.originalText);
      setGapText(ctest.gapText);
    } else {
      setTitle('');
      setDescription('');
      setOriginalText('');
      setGapText('');
    }
    setEditing(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!lesson) return;

    if (!title.trim()) {
      toastService.error(t('toast.ctestTitleRequired'));
      return;
    }
    if (!originalText.trim()) {
      toastService.error(t('toast.ctestOriginalRequired'));
      return;
    }
    if (!gapText.trim()) {
      toastService.error(t('toast.ctestGapRequired'));
      return;
    }

    if (originalText.length !== gapText.length) {
      toastService.error(t('toast.ctestLengthMismatch'));
      return;
    }

    const payload = {
      title: title.trim(),
      description: description.trim() || undefined,
      originalText: originalText,
      gapText: gapText,
      lessonId: lesson.id,
    };

    if (ctest) {
      updateMutation.mutate(
        { testId: ctest.id, payload },
        {
          onSuccess: () => {
            toastService.success(t('toast.ctestUpdated'));
            setEditing(false);
          },
          onError: () => {
            toastService.error(t('toast.ctestSaveFailed'));
          },
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
            toastService.success(t('toast.ctestCreated'));
          setEditing(false);
        },
        onError: () => {
          toastService.error(t('toast.ctestSaveFailed'));
        },
      });
    }
  };

  const handleDelete = () => {
    if (!ctest || !window.confirm('Delete this C‑Test? This cannot be undone.')) {
      return;
    }

    deleteMutation.mutate(ctest.id, {
      onSuccess: () => {
        setTitle('');
        setDescription('');
        setOriginalText('');
        setGapText('');
        setInitialized(false);
        toastService.success(t('toast.ctestDeleted'));
      },
      onError: (err) => {
      toastService.error(t('toast.ctestDeleteFailed'));
      },
    });
  };

  const saving = createMutation.isPending || updateMutation.isPending;
  const deleting = deleteMutation.isPending;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page p-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page p-4">
        <div className="w-full max-w-md rounded-[24px] bg-surface p-8 shadow-card border border-[rgba(0,0,0,0.02)]">
          <p className="mb-4 text-[15px] text-danger" role="alert">
            {error ?? 'Lesson not found.'}
          </p>
          <button
            type="button"
            onClick={() => navigate('/admin/lessons')}
            className="rounded-lg bg-primary px-4 py-3 text-[14px] font-semibold text-white hover:bg-primary-hover transition-colors"
          >
            Back to lessons
          </button>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <header>
          <button
            type="button"
            onClick={() => navigate(`/admin/lessons/${lessonNumber}`)}
            className="mb-4 text-[14px] font-medium text-primary hover:text-primary-hover transition-colors"
          >
            ← Back to lesson detail
          </button>
          <p className="text-[13px] font-semibold uppercase tracking-wider text-text-muted mb-2">
            Day {lesson.lessonNumber} – Admin
          </p>
          <h1 className="text-[2rem] font-serif font-bold text-text-main">
            Manage C‑Test
          </h1>
          <p className="mt-2 text-[15px] text-text-muted leading-relaxed">
            {lesson.title}
          </p>
        </header>

        {/* Existing C-Test summary or empty state */}
        {ctest ? (
          <section className="rounded-[24px] bg-surface p-6 shadow-card border border-[rgba(0,0,0,0.02)]">
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <p className="text-[13px] font-medium text-text-muted">
                  Current C‑Test
                </p>
                <h2 className="mt-1 text-[1.2rem] font-serif font-bold text-text-main">
                  {ctest.title}
                </h2>
                {ctest.description && (
                  <p className="mt-1 text-[14px] text-text-muted">
                    {ctest.description}
                  </p>
                )}
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-[13px] font-semibold text-text-main mb-2">
                      Original text (preview)
                    </p>
                    <p className="text-[14px] text-text-muted line-clamp-4 whitespace-pre-line">
                      {ctest.originalText}
                    </p>
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-text-main mb-2">
                      Gap text (preview)
                    </p>
                    <p className="text-[14px] text-text-muted line-clamp-4 whitespace-pre-line">
                      {ctest.gapText}
                    </p>
                    <p className="mt-2 text-[13px] text-text-muted">
                      Use <span className="font-mono">*</span> for all missing
                      characters. Length must match original text exactly.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={beginEdit}
                  className="rounded-lg border border-border-soft bg-surface px-4 py-2 text-[14px] font-medium text-text-main hover:bg-highlight transition-colors"
                >
                  Edit C‑Test
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="rounded-lg bg-danger px-4 py-2 text-[14px] font-medium text-white hover:bg-[#B93939] disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                >
                  {deleting ? 'Deleting...' : 'Delete C‑Test'}
                </button>
              </div>
            </div>
          </section>
        ) : (
          <section className="rounded-[24px] bg-surface p-8 shadow-card border border-[rgba(0,0,0,0.02)]">
            <p className="text-[15px] text-text-main leading-relaxed">
              No C‑Test has been created for this lesson yet. You can create one
              C‑Test per lesson. The C‑Test is shown as a gap‑based cloze text
              in the student view.
            </p>
            <p className="mt-3 text-[14px] text-text-muted">
              Tip: Start from a coherent German text, then replace the missing
              letters in selected words with <span className="font-mono">*</span>{' '}
              so that <span className="font-mono">originalText</span> and{' '}
              <span className="font-mono">gapText</span> have exactly the same
              length.
            </p>
            <button
              type="button"
              onClick={beginEdit}
              className="mt-6 rounded-lg bg-primary px-6 py-3 text-[14px] font-semibold text-white hover:bg-primary-hover transition-colors"
            >
              Create C‑Test
            </button>
          </section>
        )}

        {/* Create / edit form */}
        {editing && (
          <section className="rounded-[24px] bg-surface p-8 shadow-card border border-[rgba(0,0,0,0.02)]">
            <h2 className="text-[1.2rem] font-serif font-bold text-text-main">
              {ctest ? 'Edit C‑Test' : 'Create C‑Test'}
            </h2>
            <p className="mt-2 text-[14px] text-text-muted leading-relaxed">
              Ensure that the gap text uses <span className="font-mono">*</span>{' '}
              for all missing characters so that both texts have the same
              length. The same positions in <span className="font-mono">**</span>{' '}
              correspond to the removed characters.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-[14px] font-medium text-text-main">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg border border-border-soft px-4 py-3 text-[15px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                />
              </div>
              <div>
                <label className="mb-2 block text-[14px] font-medium text-text-main">
                  Description (optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[80px] w-full rounded-lg border border-border-soft px-4 py-3 text-[15px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                />
              </div>
              <div>
                <label className="mb-2 block text-[14px] font-medium text-text-main">
                  Original text
                </label>
                <textarea
                  required
                  value={originalText}
                  onChange={(e) => handleOriginalTextChange(e.target.value)}
                  className="min-h-[300px] w-full rounded-lg border border-border-soft px-4 py-3 text-[15px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors font-mono resize-y"
                  placeholder="Paste your German text here. The gap text will be generated automatically..."
                />
                <p className="mt-2 text-[13px] text-text-muted">
                  Gap text is auto-generated following C-test rules. You can modify it below if needed.
                </p>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-[14px] font-medium text-text-main">
                    Gap text (use <span className="font-mono">*</span> for missing
                    characters)
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      if (originalText.trim()) {
                        const generated = generateCtestGapText(originalText);
                        setGapText(generated);
                        toastService.success(t('toast.ctestGapRegenerated'));
                      }
                    }}
                    disabled={!originalText.trim()}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border-soft bg-surface px-3 py-1.5 text-[13px] font-medium text-text-main hover:bg-highlight disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Icon.Restart size={14} /> Regenerate
                  </button>
                </div>
                <textarea
                  required
                  value={gapText}
                  onChange={(e) => setGapText(e.target.value)}
                  className="min-h-[300px] w-full rounded-lg border border-border-soft px-4 py-3 text-[15px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors font-mono resize-y"
                  placeholder="Gap text will appear here automatically. You can edit it manually if needed."
                />
                <p className="mt-2 text-[13px] text-text-muted">
                  Length: original {originalText.length} characters, gap{' '}
                  {gapText.length} characters.
                </p>
                {diagnostic && (
                  <p
                    className={`mt-1 text-[13px] ${
                      diagnostic.type === 'ok'
                        ? 'text-success'
                        : diagnostic.type === 'lengthMismatch'
                          ? 'text-danger'
                          : 'text-[#E8971E]'
                    }`}
                  >
                    {diagnostic.type === 'ok' &&
                      'Alignment check: all non-* characters match; gaps look consistent.'}
                    {diagnostic.type === 'lengthMismatch' &&
                      `Warning: lengths differ (original ${diagnostic.originalLength}, gap ${diagnostic.gapLength}). Replace each removed character with "*" so lengths match.`}
                    {diagnostic.type === 'contentMismatch' &&
                      `Warning: possible mismatch near character ${diagnostic.index + 1}: original "${diagnostic.originalChar}", gap "${diagnostic.gapChar}" (not "*"). At non-gap positions, characters should be identical.`}
                  </p>
                )}
              </div>
              <div className="flex justify-end gap-4 pt-2">
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="rounded-lg border border-border-soft bg-surface px-6 py-3 text-[14px] font-semibold text-text-main hover:bg-highlight transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-primary px-6 py-3 text-[14px] font-semibold text-white hover:bg-primary-hover disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                >
                  {saving
                    ? ctest
                      ? 'Saving...'
                      : 'Creating...'
                    : ctest
                      ? 'Save changes'
                      : 'Create C‑Test'}
                </button>
              </div>
            </form>
          </section>
        )}
      </div>
    </DashboardLayout>
  );
}
