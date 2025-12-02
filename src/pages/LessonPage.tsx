import { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { lessonService, type LessonResponse } from '../services/lessonService';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { toastService } from '../services/toastService';
import { deckService } from '../services/deckService';
import { readingService } from '../services/readingService';
import type { Deck, Reading } from '../types/api';
import { useProgress } from '../contexts/ProgressContext';
import { DashboardLayout } from '../components/dashboard';

type Params = {
  lessonNumber?: string;
};

export function LessonPage() {
  const { lessonNumber } = useParams<Params>();
  const navigate = useNavigate();
  const { isSectionCompleted, getLessonProgress, loading: progressLoading } = useProgress();

  const [lesson, setLesson] = useState<LessonResponse['lesson'] | null>(null);
  const [deck, setDeck] = useState<Deck | null>(null);
  const [readings, setReadings] = useState<Reading[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get lesson progress to calculate completion percentage
  const lessonProgressData = lesson ? getLessonProgress(lesson.id) : null;

  // Calculate progress: each section that has been completed at least once = 25%
  const progressPercentage = useMemo(() => {
    if (!lessonProgressData) return 0;

    let completedCount = 0;
    if (lessonProgressData.flashcards.isCompleted) completedCount++;
    if (lessonProgressData.grammar.isCompleted) completedCount++;
    if (lessonProgressData.reading.isCompleted) completedCount++;
    if (lessonProgressData.ctest.isCompleted) completedCount++;

    return (completedCount / 4) * 100; // 0%, 25%, 50%, 75%, or 100%
  }, [lessonProgressData]);

  const completedCount = useMemo(() => {
    if (!lessonProgressData) return 0;
    let count = 0;
    if (lessonProgressData.flashcards.isCompleted) count++;
    if (lessonProgressData.grammar.isCompleted) count++;
    if (lessonProgressData.reading.isCompleted) count++;
    if (lessonProgressData.ctest.isCompleted) count++;
    return count;
  }, [lessonProgressData]);

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

        const decksData = await deckService.getDecksByLessonId(lessonData.lesson.id);
        if (!active) return;

        const readingsData = await readingService.getAllReadings(lessonData.lesson.id);
        if (!active) return;

        setLesson(lessonData.lesson);
        setDeck(decksData.decks[0] ?? null);
        setReadings(readingsData.readings ?? []);
      } catch (err) {
        if (!active) return;
        const message =
          err instanceof Error
            ? err.message
            : 'Load failed.';
        setError(message);

        // Check if it's a lesson locked error (HTTP 423)
        if (message.includes('locked') || message.includes('complete')) {
          toastService.warning(message, { duration: 6000 });
          // Redirect to course page after showing error
          setTimeout(() => navigate('/course'), 2000);
        } else {
          toastService.error('Load failed.');
        }
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

  if (loading || progressLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page p-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page p-4">
        <div className="w-full max-w-md rounded-xl bg-surface p-6 shadow-lg border border-border-soft">
          <p className="mb-4 text-sm text-danger" role="alert">
            {error ?? 'Lesson not found.'}
          </p>
          <button
            type="button"
            onClick={() => navigate('/course')}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover"
          >
            Back to course
          </button>
        </div>
      </div>
    );
  }

  const primaryReading = readings[0];
  const isFlashcardsCompleted = isSectionCompleted(lesson.id, 'flashcards');
  const isReadingCompleted = isSectionCompleted(lesson.id, 'reading');
  const isGrammarCompleted = isSectionCompleted(lesson.id, 'grammar');
  const isCtestCompleted = isSectionCompleted(lesson.id, 'ctest');

  return (
    <DashboardLayout>
      <div className="max-w-[1000px] mx-auto">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate('/course')}
          className="flex items-center gap-2 text-text-muted text-[14px] font-medium mb-6 hover:text-text-main transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Course
        </button>

        {/* Header */}
        <header className="mb-12">
          <div className="text-[14px] uppercase tracking-wider text-text-muted font-semibold mb-3">
            Day {lesson.lessonNumber}
          </div>
          <h1 className="text-[40px] font-serif font-bold text-text-main mb-6">
            {lesson.title}
          </h1>

          {/* Progress Tracker */}
          <div className="bg-surface rounded-xl shadow-card p-5 flex items-center gap-6">
            {/* Circular Progress */}
            <div className="relative w-[50px] h-[50px] flex-shrink-0">
              <svg width="50" height="50" viewBox="0 0 36 36" className="transform -rotate-90">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#eee"
                  strokeWidth="4"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeWidth="4"
                  strokeDasharray={`${progressPercentage}, 100`}
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[12px] font-bold">
                {Math.round(progressPercentage)}%
              </div>
            </div>

            {/* Progress Info */}
            <div className="flex-1">
              <div className="font-semibold text-[17px] mb-1">Daily Progress</div>
              <div className="text-text-muted text-[14px] mb-2">
                {completedCount} of 4 activities completed
              </div>
              <div className="h-2 bg-[#EEE] rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </header>

        {/* Module Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Grammar */}
          <ModuleCard
            title="Grammar Structure"
            description="Practice German grammar rules and sentence construction patterns."
            icon={
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                <path d="M2 2l7.586 7.586"></path>
                <circle cx="11" cy="11" r="2"></circle>
              </svg>
            }
            to={`/course/${lesson.lessonNumber}/grammar`}
            isCompleted={isGrammarCompleted}
            actionText={isGrammarCompleted ? 'Review Answers' : 'Start Exercise'}
          />

          {/* Reading */}
          {readings.length > 0 && primaryReading ? (
            <ModuleCard
              title="Reading & Quiz"
              description="Read authentic German texts and test your comprehension skills."
              icon={
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
              }
              to={`/course/${lesson.lessonNumber}/reading/${primaryReading.id}`}
              isCompleted={isReadingCompleted}
              actionText={isReadingCompleted ? 'View Results' : 'Start Reading'}
            />
          ) : (
            <div className="bg-[#FAF9F7] rounded-[24px] p-8 border border-dashed border-[#D1D1D1] opacity-70">
              <div className="w-16 h-16 bg-[#FAF6F3] rounded-2xl flex items-center justify-center text-text-muted mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-bold mb-3 text-text-muted">Reading & Quiz</h3>
              <p className="text-text-muted text-[15px]">No reading available for this lesson yet.</p>
            </div>
          )}

          {/* Flashcards */}
          {deck ? (
            <ModuleCard
              title="Flashcards"
              description="Master new vocabulary and key concepts through spaced repetition."
              icon={
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              }
              to={`/course/${lesson.lessonNumber}/deck`}
              isCompleted={isFlashcardsCompleted}
              actionText={isFlashcardsCompleted ? 'Review Deck' : 'Start Practice'}
            />
          ) : (
            <div className="bg-[#FAF9F7] rounded-[24px] p-8 border border-dashed border-[#D1D1D1] opacity-70">
              <div className="w-16 h-16 bg-[#FAF6F3] rounded-2xl flex items-center justify-center text-text-muted mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-bold mb-3 text-text-muted">Flashcards</h3>
              <p className="text-text-muted text-[15px]">No deck available for this lesson yet.</p>
            </div>
          )}

          {/* C-Test */}
          <ModuleCard
            title="C-Test Challenge"
            description="Complete the text by filling in missing word parts and test your language proficiency."
            icon={
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            }
            to={`/course/${lesson.lessonNumber}/ctest`}
            isCompleted={isCtestCompleted}
            actionText={isCtestCompleted ? 'Review Answers' : 'Start Challenge'}
          />
        </section>

        <div className="h-16"></div>
      </div>
    </DashboardLayout>
  );
}

interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  isCompleted: boolean;
  actionText: string;
}

function ModuleCard({ title, description, icon, to, isCompleted, actionText }: ModuleCardProps) {
  return (
    <Link
      to={to}
      className={`bg-surface rounded-[24px] p-8 shadow-card transition-all duration-300 flex flex-col min-h-[280px] border ${isCompleted
        ? 'border-[#EBF5EC] hover:shadow-[0_12px_40px_rgba(107,140,110,0.15)]'
        : 'border-transparent hover:shadow-[0_12px_40px_rgba(62,54,48,0.1)]'
        } hover:-translate-y-1.5`}
    >
      {/* Card Top */}
      <div className="flex justify-between items-start mb-6">
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${isCompleted
            ? 'bg-[#EBF5EC] text-[#6B8C6E]'
            : 'bg-[#FAF6F3] text-primary'
            }`}
        >
          {icon}
        </div>
        {isCompleted && (
          <div className="flex items-center gap-1.5 bg-[#EBF5EC] text-[#6B8C6E] px-3 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-wide">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Done
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex-1">
        <h3 className="text-2xl font-serif font-bold mb-3">{title}</h3>
        <p className="text-text-muted leading-relaxed text-[15px]">{description}</p>
      </div>

      {/* Card Footer */}
      <div
        className={`mt-8 flex items-center gap-2 font-semibold ${isCompleted ? 'text-[#6B8C6E]' : 'text-primary'
          }`}
      >
        {actionText}
        <span>→</span>
      </div>
    </Link>
  );
}
