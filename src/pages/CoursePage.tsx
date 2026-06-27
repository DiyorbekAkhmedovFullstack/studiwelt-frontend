import { useNavigate } from 'react-router-dom';
import { useLessons } from '../hooks/queries/useLessons';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { useProgress } from '../contexts/ProgressContext';
import { useAuth } from '../contexts/AuthContext';
import { toastService } from '../services/toastService';
import { DashboardLayout, StatCard, LessonCard } from '../components/dashboard';
import { Icon, Ui } from '../lib/icons';

export function CoursePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { courseProgress, lessonProgress, loading: progressLoading } = useProgress();

  // Use React Query for lessons
  const {
    data: lessons = [],
    isLoading: loading,
    error: queryError,
  } = useLessons();

  const error = queryError
    ? queryError instanceof Error
      ? queryError.message
      : 'Laden fehlgeschlagen.'
    : null;

  if (loading || progressLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page p-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page p-4">
        <div className="w-full max-w-md rounded-xl bg-surface p-6 shadow-lg border border-border-soft">
          <p className="text-sm text-danger" role="alert">
            {error}
          </p>
        </div>
      </div>
    );
  }

  // Calculate stats
  const publishedLessons = lessons.length;
  const totalLessons = publishedLessons || courseProgress?.totalLessons || 0;
  const completedLessons = courseProgress?.lessonsCompleted || 0;
  const lastPublishedLessonNumber =
    lessons.length > 0 ? lessons[lessons.length - 1].lessonNumber : 1;
  const currentDay = Math.min(
    courseProgress?.currentLessonNumber || lastPublishedLessonNumber || 1,
    lastPublishedLessonNumber || 1,
  );
  const completionPercentage =
    courseProgress?.overallPercentage ||
    (totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0);

  // Group lessons by weeks (every 6 lessons = 1 week)
  const groupLessonsByWeeks = () => {
    const weeks: Array<{
      weekNumber: number;
      title: string;
      subtitle: string;
      lessons: typeof lessons;
      isCompleted: boolean;
      isActive: boolean;
    }> = [];

    for (let i = 0; i < lessons.length; i += 6) {
      const weekLessons = lessons.slice(i, i + 6);
      const weekNumber = Math.floor(i / 6) + 1;
      const startDay = i + 1;
      const endDay = Math.min(i + 6, lessons.length);

      // Check if week is completed (all lessons before current day)
      const isCompleted = endDay < currentDay;
      const isActive = currentDay >= startDay && currentDay <= endDay;

      weeks.push({
        weekNumber,
        title: `Woche ${weekNumber}`,
        subtitle: `Tage ${startDay}–${endDay}${isCompleted ? ' • Abgeschlossen' : isActive ? ' • In Bearbeitung' : ' • Gesperrt'}`,
        lessons: weekLessons,
        isCompleted,
        isActive,
      });
    }

    return weeks;
  };

  const weeks = groupLessonsByWeeks();

  return (
    <DashboardLayout>
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-[32px] font-bold mb-2">Dein Lernweg</h1>
        <p className="text-text-muted">
          Du bist gerade bei <strong>Tag {currentDay}</strong> von {totalLessons}. Bleib am Ball!
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard
          icon={<Ui.Check className="w-5 h-5" stroke={2.5} />}
          value={`${Math.round(completionPercentage)}%`}
          label="Fortschritt"
        />
        <StatCard
          icon={<Icon.Clock className="w-5 h-5" stroke={2.5} />}
          value={`${completedLessons}/${totalLessons}`}
          label="Abgeschlossen"
          iconBgColor="#E6F0FF"
          iconColor="#4A90E2"
        />
        <StatCard
          icon={<Icon.Bolt className="w-5 h-5" stroke={2.5} />}
          value={`Tag ${currentDay}`}
          label="Aktueller Tag"
          iconBgColor="#FFF4E6"
          iconColor="#FF9F43"
        />
      </div>

      {/* Weeks / Modules */}
      {weeks.map((week) => {
        const opacity = !week.isCompleted && !week.isActive ? 0.6 : 1;

        return (
          <div key={week.weekNumber}>
            <div className="mb-16" style={{ opacity }}>
            {/* Module Header */}
            <div className="flex items-center mb-6 sticky top-0 bg-page z-10 py-2">
              <div
                className="text-[48px] font-serif font-black leading-none mr-4"
                style={{
                  color: week.isActive ? 'var(--accent-primary)' : 'rgba(166, 123, 91, 0.15)',
                  opacity: week.isActive ? 0.4 : 1,
                }}
              >
                {week.weekNumber}
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-main">{week.title}</h3>
                <span
                  className="text-[15px]"
                  style={{ color: week.isActive ? 'var(--accent-primary)' : 'var(--text-muted)' }}
                >
                  {week.subtitle}
                </span>
              </div>
            </div>

            {/* Lesson Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
              {week.lessons.map((lesson) => {
                const lessonNum = lesson.lessonNumber;

                // Get progress info if available
                const progress = lessonProgress?.get(lesson.id);

                // Count completed sections
                let completedSections = 0;
                if (progress) {
                  if (progress.flashcards?.isCompleted) completedSections++;
                  if (progress.grammar?.isCompleted) completedSections++;
                  if (progress.reading?.isCompleted) completedSections++;
                  if (progress.ctest?.isCompleted) completedSections++;
                }

                // Determine lesson state: locked, completed, or active
                // Admins can access all lessons regardless of progress
                const isAdmin = user?.role === 'ADMIN';
                const isUser = user?.role === 'USER';

                // Check if this is a role-restricted lesson (USER trying to access 7-30)
                const isRoleRestricted = isUser && lessonNum > 6;

                // Original accessibility logic: lesson 1 or previous lesson completed
                const isAccessible = isAdmin || (progress?.isAccessible ?? false);
                const isCompleted = progress?.isLessonCompleted ?? false;

                // State: locked if not accessible, completed if done, otherwise active
                const state = !isAccessible ? 'locked' : isCompleted ? 'completed' : 'active';

                // Handle locked lesson clicks
                const handleLockedClick = () => {
                  // Priority 1: Sequential lock (must complete previous lesson first)
                  if (!isAccessible) {
                    toastService.warning(
                      `Lektion ${lessonNum} ist gesperrt. Bitte schließe zuerst Lektion ${lessonNum - 1} ab, um diese Lektion freizuschalten.`,
                      { duration: 5000 }
                    );
                  }
                  // Priority 2: Role restriction (USER trying to access unlocked lesson 7-30)
                  else if (isRoleRestricted) {
                    // USER clicking accessible lessons 7-30: redirect to upgrade
                    navigate('/upgrade');
                  }
                };

                const isClickable = !isAccessible || isRoleRestricted;

                const handleKeyDown = (e: React.KeyboardEvent) => {
                  if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    handleLockedClick();
                  }
                };

                return (
                  <div
                    key={lesson.id}
                    role={isClickable ? 'button' : undefined}
                    tabIndex={isClickable ? 0 : undefined}
                    onClick={isClickable ? handleLockedClick : undefined}
                    onKeyDown={isClickable ? handleKeyDown : undefined}
                  >
                    <LessonCard
                      lessonNumber={lessonNum}
                      title={lesson.title}
                      state={state}
                      duration={completedSections > 0 ? `${completedSections}/4 Abschnitte` : undefined}
                      to={isAccessible && !isRoleRestricted ? `/course/${lessonNum}` : undefined}
                    />
                  </div>
                );
              })}
            </div>
            </div>
          </div>
        );
      })}

      <div className="h-16"></div>
    </DashboardLayout>
  );
}
