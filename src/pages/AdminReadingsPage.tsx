import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { readingService } from '../services/readingService';
import { lessonService } from '../services/lessonService';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { toastService } from '../services/toastService';
import type { Reading, LessonSummary } from '../types/api';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';

type Params = {
  lessonNumber?: string;
};

export function AdminReadingsPage() {
  const { lessonNumber } = useParams<Params>();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState<LessonSummary | null>(null);
  const [readings, setReadings] = useState<Reading[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
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
        const lessonData = await lessonService.getLessonByNumber(lessonNumber);
        if (!active) return;

        const readingsData = await readingService.getAllReadings(
          lessonData.lesson.id,
        );
        if (!active) return;

        setLesson(lessonData.lesson);
        setReadings(readingsData.readings ?? []);
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

  const handleDelete = async (readingId: string, readingTitle: string) => {
    if (
      !window.confirm(
        `Are you sure you want to delete the reading "${readingTitle}"? This action cannot be undone.`,
      )
    ) {
      return;
    }

    setDeleting(readingId);
    try {
      await readingService.deleteReading(readingId);
      setReadings((prev) => prev.filter((r) => r.id !== readingId));
      toastService.success('Reading deleted successfully!');
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Failed to delete reading. Please try again.';
      toastService.error(message);
    } finally {
      setDeleting(null);
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
        {/* Header */}
        <header>
          <button
            type="button"
            onClick={() => navigate(`/admin/lessons/${lessonNumber}`)}
            className="mb-4 text-[14px] font-medium text-primary hover:text-primary-hover transition-colors"
          >
            ← Back to lesson detail
          </button>
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-wider text-text-muted mb-2">
                Day {lesson.lessonNumber} - Admin
              </p>
              <h1 className="text-[2rem] font-serif font-bold text-text-main">
                Manage Readings
              </h1>
              <p className="mt-2 text-[15px] text-text-muted leading-relaxed">
                {lesson.title}
              </p>
            </div>
            <Link
              to={`/admin/lessons/${lessonNumber}/readings/new`}
              className="rounded-lg bg-primary px-4 py-3 text-[14px] font-semibold text-white hover:bg-primary-hover transition-colors whitespace-nowrap"
            >
              + Create Reading
            </Link>
          </div>
        </header>

        {/* Readings List */}
        {readings.length === 0 && (
          <div className="rounded-[24px] bg-surface p-12 text-center shadow-card border border-[rgba(0,0,0,0.02)]">
            <p className="text-[15px] text-text-muted mb-6">
              No readings created yet for this lesson.
            </p>
            <Link
              to={`/admin/lessons/${lessonNumber}/readings/new`}
              className="inline-flex rounded-lg bg-primary px-6 py-3 text-[14px] font-semibold text-white hover:bg-primary-hover transition-colors"
            >
              Create First Reading
            </Link>
          </div>
        )}

        {readings.length > 0 && (
          <div className="space-y-4">
            {readings.map((reading) => (
              <div
                key={reading.id}
                className="rounded-[24px] bg-surface p-6 shadow-card border border-[rgba(0,0,0,0.02)]"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <h2 className="text-[1.2rem] font-serif font-bold text-text-main">
                      {reading.title}
                    </h2>
                    <p className="mt-1 text-[14px] text-text-muted">
                      {reading.questions.length} question
                      {reading.questions.length !== 1 ? 's' : ''}
                    </p>
                    <p className="mt-3 text-[15px] text-text-muted leading-relaxed line-clamp-2">
                      {reading.text.substring(0, 150)}
                      {reading.text.length > 150 ? '...' : ''}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Link
                      to={`/admin/lessons/${lessonNumber}/readings/${reading.id}/edit`}
                      className="rounded-lg border border-border-soft bg-surface px-4 py-2 text-[14px] font-medium text-text-main hover:bg-highlight transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(reading.id, reading.title)}
                      disabled={deleting === reading.id}
                      className="rounded-lg bg-danger px-4 py-2 text-[14px] font-medium text-white hover:bg-[#B93939] disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                    >
                      {deleting === reading.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
