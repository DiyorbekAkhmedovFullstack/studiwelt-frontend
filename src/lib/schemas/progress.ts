import { z } from 'zod';
import { PercentageSchema } from './common';

// Section type enum
export const SectionTypeSchema = z.enum(['flashcards', 'grammar', 'reading', 'ctest']);

// Section progress schema
export const SectionProgressSchema = z.object({
  sectionType: SectionTypeSchema,
  isCompleted: z.boolean(),
  bestScore: PercentageSchema,
  successfulAttempts: z.number().int().min(0).max(3),
  isLocked: z.boolean(),
  attemptsRemaining: z.number().int().min(0).max(3),
});

// Lesson progress schema
export const LessonProgressSchema = z.object({
  lessonId: z.number(),
  lessonNumber: z.number().int().min(1).max(30),
  lessonTitle: z.string(),
  flashcards: SectionProgressSchema,
  grammar: SectionProgressSchema,
  reading: SectionProgressSchema,
  ctest: SectionProgressSchema,
  overallPercentage: PercentageSchema,
  isLessonCompleted: z.boolean(),
  isAccessible: z.boolean(),
  lastActivity: z.string().nullable(),
  completedAt: z.string().nullable(),
});

// Course progress schema
export const CourseProgressSchema = z.object({
  userId: z.number(),
  currentLessonNumber: z.number().int().min(1).max(30),
  lessonsCompleted: z.number().int().min(0).max(30),
  totalLessons: z.literal(30), // Always 30 lessons
  overallPercentage: PercentageSchema,
  isCourseCompleted: z.boolean(),
  startedAt: z.string(),
  lastActivityAt: z.string(),
  completedAt: z.string().nullable(),
  lessonProgress: z.array(LessonProgressSchema),
});

// Response schemas
export const CourseProgressResponseSchema = z.object({
  progress: CourseProgressSchema,
});

export const LessonProgressResponseSchema = z.object({
  progress: LessonProgressSchema,
});

export const SectionProgressResponseSchema = z.object({
  progress: SectionProgressSchema,
});

// Type exports
export type SectionProgressType = z.infer<typeof SectionProgressSchema>;
export type LessonProgressType = z.infer<typeof LessonProgressSchema>;
export type CourseProgressType = z.infer<typeof CourseProgressSchema>;
