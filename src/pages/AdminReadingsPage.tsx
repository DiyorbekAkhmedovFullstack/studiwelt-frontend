import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { toastService } from '../services/toastService';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { useLessonByNumber } from '../hooks/queries/useLessons';
import { useReadings, useDeleteReading } from '../hooks/queries/useReadings';

type Params = {
  lessonNumber?: string;
};

export function AdminReadingsPage() {
  const { t } = useTranslation();
  const { lessonNumber } = useParams<Params>();
  const navigate = useNavigate();

  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch lesson data using React Query
  const {
    data: lesson,
    isLoading: lessonLoading,
    error: lessonError,
  } = useLessonByNumber(lessonNumber ? Number(lessonNumber) : 0);

  const lessonId = lesson?.id;

  // Fetch readings (depends on lesson.id)
  const {
    data: readings = [],
    isLoading: readingsLoading,
  } = useReadings(lessonId);

  // Delete mutation
  const deleteMutation = useDeleteReading(lessonId ?? 0);

  const loading = lessonLoading || readingsLoading;
  const error = lessonError
    ? lessonError instanceof Error
      ? lessonError.message
      : 'Load failed.'
    : null;

  const handleDelete = (readingId: string, readingTitle: string) => {
    if (
      !window.confirm(
        `Are you sure you want to delete the reading "${readingTitle}"? This action cannot be undone.`,
      )
    ) {
      return;
    }

    setDeletingId(readingId);
    deleteMutation.mutate(readingId, {
      onSuccess: () => {
        toastService.success(t('toast.readingDeleted'));
        setDeletingId(null);
      },
      onError: (err) => {
        const message =
          err instanceof Error
            ? err.message
            : 'Failed to delete reading. Please try again.';
        toastService.error(t('toast.readingDeleteFailed'));
        setDeletingId(null);
      },
    });
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
                      disabled={deletingId === reading.id}
                      className="rounded-lg bg-danger px-4 py-2 text-[14px] font-medium text-white hover:bg-[#B93939] disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                    >
                      {deletingId === reading.id ? 'Deleting...' : 'Delete'}
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
