import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { lessonService, type LessonResponse } from '../services/lessonService';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { toastService } from '../services/toastService';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';

type Params = {
  lessonNumber?: string;
};

export function AdminLessonDetailPage() {
  const { lessonNumber } = useParams<Params>();
  const [lesson, setLesson] = useState<LessonResponse['lesson'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        const data = await lessonService.getLessonByNumber(lessonNumber);
        if (!active) return;
        setLesson(data.lesson);
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
  }, [lessonNumber]);

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
          <Link
            to="/admin/lessons"
            className="inline-block rounded-lg bg-primary px-4 py-3 text-[14px] font-semibold text-white hover:bg-primary-hover transition-colors"
          >
            Back to lessons
          </Link>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <header>
          <Link
            to="/admin/lessons"
            className="flex items-center gap-2 text-text-muted text-[14px] font-medium mb-6 hover:text-text-main transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Lessons
          </Link>
          <p className="text-[13px] uppercase tracking-wider text-text-muted font-semibold mb-2">
            Day {lesson.lessonNumber} – Admin
          </p>
          <h1 className="text-[2rem] font-serif font-bold text-text-main">
            {lesson.title}
          </h1>
          {lesson.description && (
            <p className="mt-2 text-[15px] text-text-muted leading-relaxed max-w-[600px]">
              {lesson.description}
            </p>
          )}
        </header>

        <section className="bg-surface rounded-[24px] p-8 shadow-card border border-[rgba(0,0,0,0.02)]">
          <h2 className="text-[1.2rem] font-serif font-bold text-text-main mb-2">
            Content Sections
          </h2>
          <p className="text-[15px] text-text-muted mb-6">
            Manage the learning content for this lesson.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              to={`/admin/lessons/${lesson.lessonNumber}/deck`}
              className="group relative overflow-hidden rounded-xl bg-[#E8F4F8] p-6 border border-[#7AB8D1]/20 hover:border-[#7AB8D1]/40 transition-all hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#7AB8D1] flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <span className="text-[15px] font-semibold text-[#3E3630]">Manage Deck</span>
              </div>
            </Link>

            <Link
              to={`/admin/lessons/${lesson.lessonNumber}/readings`}
              className="group relative overflow-hidden rounded-xl bg-[#EFF7F0] p-6 border border-success/20 hover:border-success/40 transition-all hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-success flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span className="text-[15px] font-semibold text-[#3E3630]">Manage Readings</span>
              </div>
            </Link>

            <Link
              to={`/admin/lessons/${lesson.lessonNumber}/grammar`}
              className="group relative overflow-hidden rounded-xl bg-[#F3EFF7] p-6 border border-[#9B7EBD]/20 hover:border-[#9B7EBD]/40 transition-all hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#9B7EBD] flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-[15px] font-semibold text-[#3E3630]">Manage Grammar</span>
              </div>
            </Link>

            <Link
              to={`/admin/lessons/${lesson.lessonNumber}/ctest`}
              className="group relative overflow-hidden rounded-xl bg-[#F5F2EB] p-6 border border-text-main/10 hover:border-text-main/20 transition-all hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-text-main flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-[15px] font-semibold text-[#3E3630]">Manage C-Test</span>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
