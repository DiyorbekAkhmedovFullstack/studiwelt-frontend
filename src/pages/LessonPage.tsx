import { useEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { ErrorState } from "../components/common";
import { DashboardLayout } from "../components/dashboard";
import { useProgress } from "../contexts/ProgressContext";
import { useDecksByLesson } from "../hooks/queries/useDecks";
import { usePrefetchGrammar } from "../hooks/queries/useGrammar";
import { useLessonByNumber } from "../hooks/queries/useLessons";
import { useReadings } from "../hooks/queries/useReadings";
import { toastService } from "../services/toastService";
import { Icon, Ui } from "../lib/icons";

type Params = {
  lessonNumber?: string;
};

export function LessonPage() {
  const { lessonNumber } = useParams<Params>();
  const navigate = useNavigate();
  const {
    isSectionCompleted,
    getLessonProgress,
    loading: progressLoading,
  } = useProgress();

  // Prefetch hook for grammar data
  const { prefetchGrammarForLesson } = usePrefetchGrammar();

  // Fetch lesson data using React Query
  const {
    data: lesson,
    isLoading: lessonLoading,
    error: lessonError,
  } = useLessonByNumber(lessonNumber ? Number(lessonNumber) : 0);

  // Fetch decks and readings (depends on lesson.id)
  const lessonId = lesson?.id;
  const { data: decks = [], isLoading: decksLoading } = useDecksByLesson(
    lessonId ?? 0,
  );

  const { data: readings = [], isLoading: readingsLoading } =
    useReadings(lessonId);

  const deck = decks[0] ?? null;

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

  // Handle error cases
  const error = lessonError
    ? lessonError instanceof Error
      ? lessonError.message
      : "Laden fehlgeschlagen."
    : null;

  // Show error toast for locked lessons and redirect
  useEffect(() => {
    if (error && (error.includes("locked") || error.includes("complete"))) {
      toastService.warning(error, { duration: 6000 });
      const timer = setTimeout(() => navigate("/course"), 2000);
      return () => clearTimeout(timer);
    }
  }, [error, navigate]);

  const isLoading =
    lessonLoading || decksLoading || readingsLoading || progressLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <ErrorState
        error={error ?? undefined}
        title={error ? undefined : "Lektion nicht gefunden"}
        message={
          error ? undefined : "Diese Lektion existiert nicht oder ist noch nicht verfügbar."
        }
        backLabel="Zurück zum Kurs"
        backPath="/course"
      />
    );
  }

  const primaryReading = readings[0];
  const isFlashcardsCompleted = isSectionCompleted(lesson.id, "flashcards");
  const isReadingCompleted = isSectionCompleted(lesson.id, "reading");
  const isGrammarCompleted = isSectionCompleted(lesson.id, "grammar");
  const isCtestCompleted = isSectionCompleted(lesson.id, "ctest");

  return (
    <DashboardLayout>
      <div className="max-w-[1000px] mx-auto">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/course")}
          className="flex items-center gap-2 text-text-muted text-[14px] font-medium mb-6 hover:text-text-main transition-colors"
        >
          <Ui.ArrowLeft size={18} />
          Zurück zum Kurs
        </button>

        {/* Header */}
        <header className="mb-12">
          <div className="text-[14px] uppercase tracking-wider text-text-muted font-semibold mb-3">
            Tag {lesson.lessonNumber}
          </div>
          <h1 className="text-[40px] font-serif font-bold text-text-main mb-6">
            {lesson.title}
          </h1>

          {/* Progress Tracker */}
          <div className="bg-surface rounded-xl shadow-card p-5 flex items-center gap-6">
            {/* Circular Progress */}
            <div className="relative w-[50px] h-[50px] shrink-0">
              <svg
                width="50"
                height="50"
                viewBox="0 0 36 36"
                className="transform -rotate-90"
              >
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
              <div className="font-semibold text-[17px] mb-1">
                Tagesfortschritt
              </div>
              <div className="text-text-muted text-[14px] mb-2">
                {completedCount} von 4 Übungen abgeschlossen
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
          {/* Grammar - prefetch on hover for faster loading */}
          <ModuleCard
            title="Grammatik"
            description="Übe deutsche Grammatikregeln und Satzbaumuster."
            onPrefetch={() => lesson && prefetchGrammarForLesson(lesson.id)}
            icon={<Icon.Grammar />}
            to={`/course/${lesson.lessonNumber}/grammar`}
            isCompleted={isGrammarCompleted}
            actionText={
              isGrammarCompleted ? "Antworten ansehen" : "Übung starten"
            }
          />

          {/* Reading */}
          {readings.length > 0 && primaryReading ? (
            <ModuleCard
              title="Leseverstehen"
              description="Lies authentische deutsche Texte und teste dein Leseverständnis."
              icon={<Icon.Reading />}
              to={`/course/${lesson.lessonNumber}/reading/${primaryReading.id}`}
              isCompleted={isReadingCompleted}
              actionText={isReadingCompleted ? "Ergebnisse ansehen" : "Lesen starten"}
            />
          ) : (
            <div className="bg-[#FAFAFA] rounded-2xl p-6 border-2 border-dashed border-[#E0E0E0] flex flex-col">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-[#F0F0F0] text-text-muted">
                  <Icon.Reading size={24} />
                </div>
                <h3 className="text-lg font-bold text-text-muted">Leseverstehen</h3>
              </div>
              <p className="text-text-muted text-sm leading-relaxed flex-1 mb-5">
                Noch kein Lesetext für diese Lektion verfügbar.
              </p>
              <div className="py-3 px-4 rounded-xl bg-[#F5F5F5] text-text-muted text-sm font-medium text-center">
                Demnächst verfügbar
              </div>
            </div>
          )}

          {/* Flashcards */}
          {deck ? (
            <ModuleCard
              title="Lernkarten"
              description="Lerne neuen Wortschatz und wichtige Konzepte durch wiederholtes Üben."
              icon={<Icon.Flashcards />}
              to={`/course/${lesson.lessonNumber}/deck`}
              isCompleted={isFlashcardsCompleted}
              actionText={
                isFlashcardsCompleted ? "Karten wiederholen" : "Üben starten"
              }
            />
          ) : (
            <div className="bg-[#FAFAFA] rounded-2xl p-6 border-2 border-dashed border-[#E0E0E0] flex flex-col">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-[#F0F0F0] text-text-muted">
                  <Icon.Flashcards size={24} />
                </div>
                <h3 className="text-lg font-bold text-text-muted">Lernkarten</h3>
              </div>
              <p className="text-text-muted text-sm leading-relaxed flex-1 mb-5">
                Noch keine Lernkarten für diese Lektion verfügbar.
              </p>
              <div className="py-3 px-4 rounded-xl bg-[#F5F5F5] text-text-muted text-sm font-medium text-center">
                Demnächst verfügbar
              </div>
            </div>
          )}

          {/* C-Test */}
          <ModuleCard
            title="C-Test"
            description="Ergänze die fehlenden Wortteile und teste deine Sprachkenntnisse."
            icon={<Icon.Ctest />}
            to={`/course/${lesson.lessonNumber}/ctest`}
            isCompleted={isCtestCompleted}
            actionText={isCtestCompleted ? "Antworten ansehen" : "C-Test starten"}
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
  onPrefetch?: () => void;
}

function ModuleCard({
  title,
  description,
  icon,
  to,
  isCompleted,
  actionText,
  onPrefetch,
}: ModuleCardProps) {
  return (
    <Link
      to={to}
      onMouseEnter={onPrefetch}
      onFocus={onPrefetch}
      className={`group bg-surface rounded-2xl p-6 shadow-card transition-all duration-300 flex flex-col border-2 ${
        isCompleted
          ? "border-success/20 bg-gradient-to-br from-white to-[#F8FBF8]"
          : "border-transparent hover:border-primary/10"
      } hover:shadow-[0_16px_48px_rgba(62,54,48,0.12)] hover:-translate-y-1`}
    >
      {/* Card Header - Icon and Status inline */}
      <div className="flex items-center gap-4 mb-5">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
            isCompleted
              ? "bg-success/10 text-success"
              : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
          }`}
        >
          <div className="w-6 h-6 [&>svg]:w-full [&>svg]:h-full">
            {icon}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-text-main truncate">{title}</h3>
          {isCompleted && (
            <span className="text-xs font-semibold text-success flex items-center gap-1 mt-0.5">
              <Ui.Check size={12} stroke={3} />
              Erledigt
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-text-muted text-sm leading-relaxed flex-1 mb-5">
        {description}
      </p>

      {/* Action Button */}
      <div
        className={`flex items-center justify-between py-3 px-4 rounded-xl transition-all duration-200 ${
          isCompleted
            ? "bg-success/5 text-success"
            : "bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white"
        }`}
      >
        <span className="font-semibold text-sm">{actionText}</span>
        <Ui.ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
