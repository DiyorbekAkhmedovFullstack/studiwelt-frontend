import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { lessonService, type LessonsResponse } from '../services/lessonService';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { toastService } from '../services/toastService';
import { useProgress } from '../contexts/ProgressContext';
import { useAuth } from '../contexts/AuthContext';
import { DashboardLayout, StatCard, LessonCard } from '../components/dashboard';

export function CoursePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { courseProgress, lessonProgress, loading: progressLoading } = useProgress();
  const [lessons, setLessons] = useState<LessonsResponse['lessons']>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await lessonService.getAllLessons();
        if (!active) return;
        setLessons(data.lessons);
      } catch (err) {
        if (!active) return;
        const message =
          err instanceof Error
            ? err.message
            : 'Load failed.';
        setError(message);
        toastService.error('Load failed.');
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
  }, []);

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
        title: `Week ${weekNumber}`,
        subtitle: `Days ${startDay}-${endDay}${isCompleted ? ' • Completed' : isActive ? ' • In Progress' : ' • Locked'}`,
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
        <h1 className="text-[32px] font-bold mb-2">Your Journey</h1>
        <p className="text-text-muted">
          You are currently on <strong>Day {currentDay}</strong> of {totalLessons}. Keep the rhythm going.
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          }
          value={`${Math.round(completionPercentage)}%`}
          label="Completion"
        />
        <StatCard
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          }
          value={`${completedLessons}/${totalLessons}`}
          label="Lessons Done"
          iconBgColor="#E6F0FF"
          iconColor="#4A90E2"
        />
        <StatCard
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
            </svg>
          }
          value={`Day ${currentDay}`}
          label="Current Day"
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

                // USER role can access lessons 1-6, but needs upgrade for 7-30
                const isRoleRestricted = isUser && lessonNum > 6;
                const isAccessible = isAdmin || (progress?.isAccessible ?? true); // Default to accessible if no progress
                const isCompleted = progress?.isLessonCompleted ?? false;

                // For USER role, show all lessons as accessible (not locked) visually
                // But handle click differently for lessons 7-30
                const state = !isAccessible && !isUser ? 'locked' : isCompleted ? 'completed' : 'active';

                // Handle lesson clicks
                const handleLessonClick = () => {
                  if (isRoleRestricted) {
                    // Redirect USER to upgrade page for lessons 7-30
                    navigate('/upgrade');
                  } else if (!isAccessible) {
                    toastService.warning(
                      `Lesson ${lessonNum} is locked. Please complete Lesson ${lessonNum - 1} first to unlock this lesson.`,
                      { duration: 5000 }
                    );
                  }
                };

                return (
                  <div key={lesson.id} onClick={!isAccessible && !isRoleRestricted ? handleLessonClick : isRoleRestricted ? handleLessonClick : undefined}>
                    <LessonCard
                      lessonNumber={lessonNum}
                      title={lesson.title}
                      state={state}
                      duration={completedSections > 0 ? `${completedSections}/4 sections` : undefined}
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
