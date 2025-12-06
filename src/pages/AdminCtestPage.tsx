import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { lessonService, type LessonResponse } from '../services/lessonService';
import { ctestService } from '../services/ctestService';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { toastService } from '../services/toastService';
import type { CTest } from '../types/api';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';

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

/**
 * Generates C-test gap text from original text following the "Rule of Two":
 * - First sentence: left intact
 * - Starting from word 2 of sentence 2: delete second half of every second word
 * - Last sentence: left intact
 * - Proper nouns: not deleted
 *
 * Deletion rules:
 * - Even number of letters: delete larger half (e.g., "word" → "wo**")
 * - Odd number of letters: delete more than half (e.g., "the" → "t**")
 */
function generateCtestGapText(originalText: string): string {
  if (!originalText.trim()) return '';

  // Split into sentences (basic split by . ! ?)
  const sentenceRegex = /[.!?]+/g;
  const sentences: string[] = [];
  let lastIndex = 0;
  let match;

  while ((match = sentenceRegex.exec(originalText)) !== null) {
    const sentence = originalText.slice(lastIndex, match.index + match[0].length);
    sentences.push(sentence);
    lastIndex = match.index + match[0].length;
  }

  // Add remaining text if any
  if (lastIndex < originalText.length) {
    sentences.push(originalText.slice(lastIndex));
  }

  if (sentences.length === 0) {
    // No sentence delimiters found, treat whole text as one sentence
    sentences.push(originalText);
  }

  let result = '';

  for (let sentIdx = 0; sentIdx < sentences.length; sentIdx++) {
    const sentence = sentences[sentIdx]!;

    // First and last sentences remain intact
    if (sentIdx === 0 || sentIdx === sentences.length - 1) {
      result += sentence;
      continue;
    }

    // For middle sentences, apply the "Rule of Two"
    const words = sentence.split(/(\s+)/); // Split but keep whitespace
    let processedSentence = '';
    let wordCount = 0; // Count actual words (not whitespace)

    for (const token of words) {
      // Skip whitespace tokens
      if (/^\s+$/.test(token)) {
        processedSentence += token;
        continue;
      }

      // Separate word from trailing punctuation (comma, semicolon, colon, etc.)
      // Match: word part (only letters) + optional punctuation at the end
      const wordMatch = token.match(/^([a-zA-ZäöüÄÖÜß]+)(.*?)$/);

      if (!wordMatch) {
        // Token doesn't match expected pattern (contains numbers, just punctuation, or other chars)
        // Keep as is without gapping (e.g., "2,5", "123", "2023", etc.)
        processedSentence += token;
        continue;
      }

      const [, word, trailingPunctuation] = wordMatch;

      // Check if trailing part contains any digits - if so, this is likely a number with letters
      // (e.g., "2nd", "3rd") - don't count it as a word to gap
      if (/\d/.test(trailingPunctuation)) {
        processedSentence += token;
        continue;
      }

      wordCount++;

      // Starting from word 2, process every second word
      if (wordCount >= 2 && wordCount % 2 === 0) {
        // Check if it's a proper noun (starts with uppercase and not at sentence start)
        const isProperNoun = /^[A-ZÄÖÜ]/.test(word) && wordCount > 1;

        if (isProperNoun) {
          processedSentence += word + trailingPunctuation;
        } else {
          // Apply gap generation
          const wordLength = word.length;

          if (wordLength === 1) {
            // Single character words remain intact
            processedSentence += word + trailingPunctuation;
          } else if (wordLength % 2 === 0) {
            // Even number of letters: delete larger half
            const keepLength = Math.floor(wordLength / 2);
            const deleteLength = wordLength - keepLength;
            processedSentence += word.slice(0, keepLength) + '*'.repeat(deleteLength) + trailingPunctuation;
          } else {
            // Odd number of letters: delete more than half
            const keepLength = Math.floor(wordLength / 2);
            const deleteLength = wordLength - keepLength;
            processedSentence += word.slice(0, keepLength) + '*'.repeat(deleteLength) + trailingPunctuation;
          }
        }
      } else {
        processedSentence += word + trailingPunctuation;
      }
    }

    result += processedSentence;
  }

  return result;
}

export function AdminCtestPage() {
  const { lessonNumber } = useParams<Params>();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState<LessonResponse['lesson'] | null>(null);
  const [ctest, setCtest] = useState<CTest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [originalText, setOriginalText] = useState('');
  const [gapText, setGapText] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

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

  useEffect(() => {
    if (!lessonNumber) {
      setError('Lesson number is missing.');
      setLoading(false);
      return;
    }

    let active = true;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const lessonData = await lessonService.getLessonByNumber(lessonNumber);
        if (!active) return;

        setLesson(lessonData.lesson);

        const tests = await ctestService.getTestsByLesson(lessonData.lesson.id);
        if (!active) return;

        const existing = tests.tests[0] ?? null;
        setCtest(existing ?? null);

        if (existing) {
          setTitle(existing.title);
          setDescription(existing.description ?? '');
          setOriginalText(existing.originalText);
          setGapText(existing.gapText);
        } else {
          setTitle('');
          setDescription('');
          setOriginalText('');
          setGapText('');
        }
      } catch (err) {
        if (!active) return;
        const message =
          err instanceof Error
            ? err.message
            : 'Load failed.';
        setError(message);
        toastService.error(
          'Load failed.',
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void load();

    return () => {
      active = false;
    };
  }, [lessonNumber]);

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!lesson) return;

    if (!title.trim()) {
      toastService.error('Title is required.');
      return;
    }
    if (!originalText.trim()) {
      toastService.error('Original text is required.');
      return;
    }
    if (!gapText.trim()) {
      toastService.error('Gap text is required.');
      return;
    }

    if (originalText.length !== gapText.length) {
      toastService.error(
        'Original text and gap text must have the same length. Replace missing characters with "*".',
      );
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: title.trim(),
        description: description.trim() || undefined,
        originalText: originalText,
        gapText: gapText,
        lessonId: lesson.id,
      };

      if (ctest) {
        const updated = await ctestService.update(ctest.id, payload);
        setCtest(updated.test);
        toastService.success('C‑Test updated successfully.');
      } else {
        const created = await ctestService.create(payload);
        setCtest(created.test);
        toastService.success('C‑Test created successfully.');
      }

      setEditing(false);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Failed to save C‑Test. Please try again.';
      setError(message);
      toastService.error(message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!ctest || !window.confirm('Delete this C‑Test? This cannot be undone.')) {
      return;
    }

    setDeleting(true);
    try {
      await ctestService.delete(ctest.id);
      setCtest(null);
      setTitle('');
      setDescription('');
      setOriginalText('');
      setGapText('');
      toastService.success('C‑Test deleted.');
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Failed to delete C‑Test. Please try again.';
      setError(message);
      toastService.error(message);
    } finally {
      setDeleting(false);
    }
  };

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
                  ✨ Gap text is auto-generated following C-test rules. You can modify it below if needed.
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
                        toastService.success('Gap text regenerated.');
                      }
                    }}
                    disabled={!originalText.trim()}
                    className="rounded-lg border border-border-soft bg-surface px-3 py-1.5 text-[13px] font-medium text-text-main hover:bg-highlight disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    🔄 Regenerate
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
