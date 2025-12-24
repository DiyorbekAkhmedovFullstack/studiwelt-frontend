import { useState } from 'react';
import { Link } from 'react-router-dom';
import { type LessonsResponse } from '../services/lessonService';
import { LoadingScreen, ErrorState } from '../components/common';
import { toastService } from '../services/toastService';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { useAdminLessons, useUpdateLesson, usePublishLesson, useUnpublishLesson } from '../hooks/queries/useLessons';

type EditableLesson = LessonsResponse['lessons'][number];

export function AdminLessonsPage() {
  // Fetch lessons using React Query
  const {
    data: lessons = [],
    isLoading: loading,
    error: queryError,
  } = useAdminLessons();

  const [editingLessonNumber, setEditingLessonNumber] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  // Mutations
  const updateMutation = useUpdateLesson();
  const publishMutation = usePublishLesson();
  const unpublishMutation = useUnpublishLesson();

  const error = queryError
    ? queryError instanceof Error
      ? queryError.message
      : 'Load failed.'
    : null;

  const beginEdit = (lesson: EditableLesson) => {
    setEditingLessonNumber(lesson.lessonNumber);
    setEditTitle(lesson.title);
    setEditDescription(lesson.description);
  };

  const cancelEdit = () => {
    setEditingLessonNumber(null);
    setEditTitle('');
    setEditDescription('');
  };

  const saveEdit = (lesson: EditableLesson) => {
    if (!editTitle.trim()) {
      toastService.error('Title cannot be empty.');
      return;
    }

    updateMutation.mutate(
      {
        lessonNumber: lesson.lessonNumber,
        data: {
          title: editTitle.trim(),
          description: editDescription.trim(),
          isPublished: lesson.published,
        },
      },
      {
        onSuccess: () => {
          toastService.success('Lesson updated.');
          cancelEdit();
        },
        onError: () => {
          toastService.error('Failed to update lesson. Please try again.');
        },
      }
    );
  };

  const togglePublish = (lesson: EditableLesson) => {
    if (lesson.published) {
      unpublishMutation.mutate(lesson.lessonNumber, {
        onSuccess: () => {
          toastService.success('Lesson unpublished.');
        },
        onError: () => {
          toastService.error('Failed to update publish state. Please try again.');
        },
      });
    } else {
      publishMutation.mutate(lesson.lessonNumber, {
        onSuccess: () => {
          toastService.success('Lesson published.');
        },
        onError: () => {
          toastService.error('Failed to update publish state. Please try again.');
        },
      });
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorState error={error} backPath="/course" backLabel="Back to Course" />;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 md:space-y-8">
        <header>
          <p className="text-[13px] uppercase tracking-wider text-text-muted font-semibold mb-2">
            Admin Panel
          </p>
          <h1 className="text-[1.5rem] md:text-[2rem] font-serif font-bold text-text-main">
            Manage Lessons
          </h1>
          <p className="mt-2 text-[14px] md:text-[15px] text-text-muted leading-relaxed max-w-[600px]">
            Manage the 30 lessons for the Studienkolleg German course. Admins see all
            lessons, including drafts; students see only published lessons.
          </p>
        </header>

        {/* Mobile Card Layout */}
        <div className="block lg:hidden space-y-4">
          {lessons.map((lesson) => {
            const isEditing = editingLessonNumber === lesson.lessonNumber;
            return (
              <div
                key={lesson.id}
                className="bg-surface rounded-2xl shadow-card border border-[rgba(0,0,0,0.02)] p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="text-[12px] font-semibold text-text-muted uppercase tracking-wider mb-1">
                      Day {lesson.lessonNumber}
                    </div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full rounded-lg border border-border-soft px-3 py-2 text-[14px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    ) : (
                      <h3 className="text-[15px] font-semibold text-text-main">
                        {lesson.title}
                      </h3>
                    )}
                  </div>
                  <span
                    className={`ml-3 inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium whitespace-nowrap ${
                      lesson.published
                        ? 'bg-[#F0F7F1] text-success border border-success/20'
                        : 'bg-[#FFF8E1] text-[#C77700] border border-[#C77700]/20'
                    }`}
                  >
                    {lesson.published ? 'Published' : 'Draft'}
                  </span>
                </div>

                <div className="mb-4">
                  {isEditing ? (
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      rows={3}
                      className="w-full rounded-lg border border-border-soft px-3 py-2 text-[13px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  ) : (
                    <p className="text-[13px] text-text-muted leading-relaxed">
                      {lesson.description}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          void saveEdit(lesson);
                        }}
                        disabled={updateMutation.isPending}
                        className="flex-1 min-w-[100px] rounded-lg bg-primary px-3 py-2 text-[13px] font-semibold text-white hover:bg-primary-hover disabled:opacity-60 transition-colors"
                      >
                        {updateMutation.isPending ? 'Saving…' : 'Save'}
                      </button>
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="flex-1 min-w-[100px] rounded-lg border border-border-soft px-3 py-2 text-[13px] font-semibold text-text-main hover:bg-highlight transition-colors"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => beginEdit(lesson)}
                        className="flex-1 min-w-[80px] rounded-lg border border-border-soft px-3 py-2 text-[13px] font-semibold text-text-main hover:bg-highlight transition-colors"
                      >
                        Edit
                      </button>
                      <Link
                        to={`/admin/lessons/${lesson.lessonNumber}`}
                        className="flex-1 min-w-[80px] text-center rounded-lg border border-border-soft px-3 py-2 text-[13px] font-semibold text-text-main hover:bg-highlight transition-colors"
                      >
                        Details
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          void togglePublish(lesson);
                        }}
                        className="flex-1 min-w-[100px] rounded-lg bg-text-main px-3 py-2 text-[13px] font-semibold text-white hover:bg-text-main/90 transition-colors"
                      >
                        {lesson.published ? 'Unpublish' : 'Publish'}
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Table Layout */}
        <div className="hidden lg:block bg-surface rounded-[24px] shadow-card overflow-hidden border border-[rgba(0,0,0,0.02)]">
          <table className="min-w-full text-left">
            <thead className="bg-highlight">
              <tr>
                <th className="px-6 py-4 text-[13px] font-semibold text-text-main">Day</th>
                <th className="px-6 py-4 text-[13px] font-semibold text-text-main">Title</th>
                <th className="px-6 py-4 text-[13px] font-semibold text-text-main">Description</th>
                <th className="px-6 py-4 text-[13px] font-semibold text-text-main">Status</th>
                <th className="px-6 py-4 text-[13px] font-semibold text-text-main text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {lessons.map((lesson) => {
                const isEditing = editingLessonNumber === lesson.lessonNumber;
                return (
                  <tr key={lesson.id} className="border-t border-[rgba(0,0,0,0.05)]">
                    <td className="px-6 py-4 align-top text-text-main text-[14px]">
                      Day {lesson.lessonNumber}
                    </td>
                    <td className="px-6 py-4 align-top">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="w-full rounded-lg border border-border-soft px-3 py-2 text-[14px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                      ) : (
                        <span className="text-[14px] font-medium text-text-main">
                          {lesson.title}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 align-top">
                      {isEditing ? (
                        <textarea
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          rows={2}
                          className="w-full rounded-lg border border-border-soft px-3 py-2 text-[14px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                      ) : (
                        <span className="text-[14px] text-text-muted">
                          {lesson.description}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 align-top">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-[12px] font-medium ${
                          lesson.published
                            ? 'bg-[#F0F7F1] text-success border border-success/20'
                            : 'bg-[#FFF8E1] text-[#C77700] border border-[#C77700]/20'
                        }`}
                      >
                        {lesson.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 align-top text-right">
                      <div className="flex justify-end gap-2">
                        {isEditing ? (
                          <>
                            <button
                              type="button"
                              onClick={() => {
                                void saveEdit(lesson);
                              }}
                              disabled={updateMutation.isPending}
                              className="rounded-lg bg-primary px-4 py-2 text-[13px] font-semibold text-white hover:bg-primary-hover disabled:opacity-60 transition-colors"
                            >
                              {updateMutation.isPending ? 'Saving…' : 'Save'}
                            </button>
                            <button
                              type="button"
                              onClick={cancelEdit}
                              className="rounded-lg border border-border-soft px-4 py-2 text-[13px] font-semibold text-text-main hover:bg-highlight transition-colors"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => beginEdit(lesson)}
                            className="rounded-lg border border-border-soft px-4 py-2 text-[13px] font-semibold text-text-main hover:bg-highlight transition-colors"
                          >
                            Edit
                          </button>
                        )}
                        <Link
                          to={`/admin/lessons/${lesson.lessonNumber}`}
                          className="rounded-lg border border-border-soft px-4 py-2 text-[13px] font-semibold text-text-main hover:bg-highlight transition-colors"
                        >
                          Details
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            void togglePublish(lesson);
                          }}
                          className="rounded-lg bg-text-main px-4 py-2 text-[13px] font-semibold text-white hover:bg-text-main/90 transition-colors"
                        >
                          {lesson.published ? 'Unpublish' : 'Publish'}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
