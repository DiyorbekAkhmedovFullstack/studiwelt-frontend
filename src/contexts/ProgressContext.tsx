import {
  createContext,
  useContext,
  useMemo,
  useCallback,
  type ReactNode,
} from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useCourseProgress } from '../hooks/queries/useProgress';
import { queryKeys } from '../lib/queryKeys';
import type { CourseProgressDto, LessonProgressDto } from '../types/api';
import { useAuth } from './AuthContext';
import {
  SECTION_COMPLETION_THRESHOLD,
  MAX_SECTION_ATTEMPTS,
} from '../constants/progress';

type ProgressContextValue = {
  courseProgress: CourseProgressDto | null;
  lessonProgress: Map<number, LessonProgressDto>;
  loading: boolean;
  isPending: boolean;
  error: string | null;
  refreshProgress: () => Promise<void>;
  getLessonProgress: (lessonId: number) => LessonProgressDto | null;
  isSectionLocked: (lessonId: number, sectionType: string) => boolean;
  isSectionCompleted: (lessonId: number, sectionType: string) => boolean;
  getAttemptsRemaining: (lessonId: number, sectionType: string) => number;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

type ProgressProviderProps = {
  children: ReactNode;
};

export function ProgressProvider({ children }: ProgressProviderProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Use React Query for data fetching
  const {
    data: courseProgress,
    isLoading: loading,
    isFetching: isPending,
    error: queryError,
  } = useCourseProgress();

  // Build lesson progress map for O(1) lookups
  const lessonProgress = useMemo(() => {
    const progressMap = new Map<number, LessonProgressDto>();
    if (courseProgress?.lessonProgress) {
      courseProgress.lessonProgress.forEach((lesson) => {
        progressMap.set(lesson.lessonId, lesson);
      });
    }
    return progressMap;
  }, [courseProgress]);

  // Error message
  const error = queryError
    ? queryError instanceof Error
      ? queryError.message
      : 'Failed to load progress.'
    : null;

  // Refresh progress by invalidating the query
  const refreshProgress = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: queryKeys.progress.all });
  }, [queryClient]);

  const getLessonProgress = useCallback(
    (lessonId: number): LessonProgressDto | null => {
      return lessonProgress.get(lessonId) ?? null;
    },
    [lessonProgress],
  );

  const isSectionLocked = useCallback(
    (lessonId: number, sectionType: string): boolean => {
      // Admins can access all sections regardless of lock status
      if (user?.role === 'ADMIN') return false;

      const lesson = lessonProgress.get(lessonId);
      if (!lesson) return false;

      const section =
        sectionType === 'flashcards'
          ? lesson.flashcards
          : sectionType === 'grammar'
            ? lesson.grammar
            : sectionType === 'reading'
              ? lesson.reading
              : sectionType === 'ctest'
                ? lesson.ctest
                : null;

      return section?.isLocked ?? false;
    },
    [lessonProgress, user],
  );

  const isSectionCompleted = useCallback(
    (lessonId: number, sectionType: string): boolean => {
      const lesson = lessonProgress.get(lessonId);
      if (!lesson) return false;

      const section =
        sectionType === 'flashcards'
          ? lesson.flashcards
          : sectionType === 'grammar'
            ? lesson.grammar
            : sectionType === 'reading'
              ? lesson.reading
              : sectionType === 'ctest'
                ? lesson.ctest
                : null;

      // Section is completed if bestScore is above threshold
      return (section?.bestScore ?? 0) >= SECTION_COMPLETION_THRESHOLD;
    },
    [lessonProgress],
  );

  const getAttemptsRemaining = useCallback(
    (lessonId: number, sectionType: string): number => {
      const lesson = lessonProgress.get(lessonId);
      if (!lesson) return MAX_SECTION_ATTEMPTS;

      const section =
        sectionType === 'flashcards'
          ? lesson.flashcards
          : sectionType === 'grammar'
            ? lesson.grammar
            : sectionType === 'reading'
              ? lesson.reading
              : sectionType === 'ctest'
                ? lesson.ctest
                : null;

      return section?.attemptsRemaining ?? MAX_SECTION_ATTEMPTS;
    },
    [lessonProgress],
  );

  const value = useMemo<ProgressContextValue>(
    () => ({
      courseProgress: courseProgress ?? null,
      lessonProgress,
      loading,
      isPending,
      error,
      refreshProgress,
      getLessonProgress,
      isSectionLocked,
      isSectionCompleted,
      getAttemptsRemaining,
    }),
    [
      courseProgress,
      lessonProgress,
      loading,
      isPending,
      error,
      refreshProgress,
      getLessonProgress,
      isSectionLocked,
      isSectionCompleted,
      getAttemptsRemaining,
    ],
  );

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return ctx;
}
