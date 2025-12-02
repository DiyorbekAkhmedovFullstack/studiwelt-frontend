import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { progressService } from '../services/progressService';
import type { CourseProgressDto, LessonProgressDto } from '../types/api';
import { useAuth } from './AuthContext';
import {
  SECTION_COMPLETION_THRESHOLD,
  MAX_SECTION_ATTEMPTS,
} from '../constants/progress';

type ProgressContextValue = {
  courseProgress: CourseProgressDto | null;
  lessonProgress: Map<number, LessonProgressDto>; // Keyed by lessonId
  loading: boolean;
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
  const [courseProgress, setCourseProgress] =
    useState<CourseProgressDto | null>(null);
  const [lessonProgress, setLessonProgress] = useState<
    Map<number, LessonProgressDto>
  >(new Map());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshProgress = useCallback(async () => {
    if (!user) {
      // Clear progress if no user
      setCourseProgress(null);
      setLessonProgress(new Map());
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await progressService.getCourseProgress();
      setCourseProgress(data);

      // Build lesson progress map for O(1) lookups
      const progressMap = new Map<number, LessonProgressDto>();
      data.lessonProgress.forEach((lesson) => {
        progressMap.set(lesson.lessonId, lesson);
      });
      setLessonProgress(progressMap);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to load progress.';
      setError(message);
      console.error('Progress fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Auto-fetch progress when user logs in
  useEffect(() => {
    if (user) {
      void refreshProgress();
    } else {
      // Clear progress when user logs out
      setCourseProgress(null);
      setLessonProgress(new Map());
    }
  }, [user, refreshProgress]);

  const getLessonProgress = useCallback(
    (lessonId: number): LessonProgressDto | null => {
      return lessonProgress.get(lessonId) ?? null;
    },
    [lessonProgress],
  );

  const isSectionLocked = useCallback(
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

      return section?.isLocked ?? false;
    },
    [lessonProgress],
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
      courseProgress,
      lessonProgress,
      loading,
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
