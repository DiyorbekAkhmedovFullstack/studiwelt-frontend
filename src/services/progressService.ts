import { api } from './api';
import type {
  CourseProgressDto,
  LessonProgressDto,
  SectionProgressDto,
} from '../types/api';

// Response wrapper types to match backend
type CourseProgressResponse = {
  courseProgress: CourseProgressDto;
};

type LessonProgressListResponse = {
  lessonProgress: LessonProgressDto[];
};

type LessonProgressResponse = {
  lessonProgress: LessonProgressDto;
};

type SectionProgressResponse = {
  sectionProgress: SectionProgressDto;
};

type LockStatusResponse = {
  locked: boolean;
};

/**
 * Progress Tracking Service
 * Manages user progress across the 30-day course including:
 * - Overall course progress
 * - Individual lesson progress
 * - Section-level tracking (flashcards, grammar, reading, ctest)
 * - Lock status (3-attempt limit enforcement)
 */
export const progressService = {
  /**
   * GET /api/progress/course
   * Get user's overall course progress including all lessons
   *
   * @returns CourseProgressDto with full course and lesson progress
   */
  getCourseProgress: async () => {
    const response = await api.get<CourseProgressResponse>('/api/progress/course');
    return response.courseProgress;
  },

  /**
   * GET /api/progress/lessons
   * Get progress for all 30 lessons
   *
   * @returns Array of LessonProgressDto for each lesson
   */
  getAllLessonProgress: async () => {
    const response = await api.get<LessonProgressListResponse>('/api/progress/lessons');
    return response.lessonProgress;
  },

  /**
   * GET /api/progress/lessons/{lessonId}
   * Get progress for a specific lesson by lesson ID
   *
   * @param lessonId - The lesson ID (not lesson number!)
   * @returns LessonProgressDto with section progress
   */
  getLessonProgress: async (lessonId: number) => {
    const response = await api.get<LessonProgressResponse>(`/api/progress/lessons/${lessonId}`);
    return response.lessonProgress;
  },

  /**
   * GET /api/progress/sections/{lessonId}/{sectionType}
   * Get detailed progress for a specific section within a lesson
   *
   * @param lessonId - The lesson ID
   * @param sectionType - One of: flashcards, grammar, reading, ctest
   * @returns SectionProgressDto with attempts, scores, and lock status
   */
  getSectionProgress: async (
    lessonId: number,
    sectionType: 'flashcards' | 'grammar' | 'reading' | 'ctest',
  ) => {
    const response = await api.get<SectionProgressResponse>(
      `/api/progress/sections/${lessonId}/${sectionType}`,
    );
    return response.sectionProgress;
  },

  /**
   * GET /api/progress/sections/{lessonId}/{sectionType}/locked
   * Check if a section is locked due to reaching 3 successful attempts
   *
   * @param lessonId - The lesson ID
   * @param sectionType - One of: flashcards, grammar, reading, ctest
   * @returns boolean - true if locked, false if available
   */
  isSectionLocked: async (
    lessonId: number,
    sectionType: 'flashcards' | 'grammar' | 'reading' | 'ctest',
  ) => {
    const response = await api.get<LockStatusResponse>(
      `/api/progress/sections/${lessonId}/${sectionType}/locked`,
    );
    return response.locked;
  },
};
