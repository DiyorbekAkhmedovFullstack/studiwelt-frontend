import { api } from './api';
import type { LessonContent, LessonSummary } from '../types/api';
import {
  LessonsResponseSchema,
  LessonResponseSchema,
  LessonContentResponseSchema,
} from '../lib/schemas';

export type LessonsResponse = {
  lessons: LessonSummary[];
};

export type LessonResponse = {
  lesson: LessonSummary;
};

export type LessonContentResponse = {
  content: LessonContent;
};

export const lessonService = {
  getAllLessons: () => api.get<LessonsResponse>('/lessons', LessonsResponseSchema),

  getAllLessonsForAdmin: () => api.get<LessonsResponse>('/lessons/admin/all', LessonsResponseSchema),

  getLessonByNumber: (lessonNumber: number | string) =>
    api.get<LessonResponse>(`/lessons/${lessonNumber}`, LessonResponseSchema),

  getLessonContent: (lessonNumber: number | string) =>
    api.get<LessonContentResponse>(`/lessons/${lessonNumber}/content`, LessonContentResponseSchema),

  updateLesson: (
    lessonNumber: number | string,
    data: { title: string; description: string; isPublished: boolean },
  ) =>
    api.put<LessonResponse>(`/lessons/${lessonNumber}`, data, LessonResponseSchema),

  publishLesson: (lessonNumber: number | string) =>
    api.post<LessonResponse>(`/lessons/${lessonNumber}/publish`, {}, LessonResponseSchema),

  unpublishLesson: (lessonNumber: number | string) =>
    api.post<LessonResponse>(`/lessons/${lessonNumber}/unpublish`, {}, LessonResponseSchema),
};
