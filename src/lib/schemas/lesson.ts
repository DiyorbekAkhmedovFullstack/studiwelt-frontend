import { z } from 'zod';
import { DeckSchema } from './flashcard';
import { ReadingSchema } from './reading';
import { CTestSchema } from './ctest';

// Lesson summary schema
export const LessonSummarySchema = z.object({
  id: z.number(),
  lessonNumber: z.number().int().min(1).max(30),
  title: z.string(),
  description: z.string(),
  published: z.boolean(),
});

// Lesson content schema (full lesson with all content)
export const LessonContentSchema = z.object({
  lesson: LessonSummarySchema,
  flashcardDecks: z.array(DeckSchema),
  grammarTopic: z.unknown(), // Grammar topic structure varies
  readings: z.array(ReadingSchema),
  ctests: z.array(CTestSchema),
});

// Response schemas
export const LessonsResponseSchema = z.object({
  lessons: z.array(LessonSummarySchema),
});

export const LessonResponseSchema = z.object({
  lesson: LessonSummarySchema,
});

export const LessonContentResponseSchema = z.object({
  content: LessonContentSchema,
});

// Type exports
export type LessonSummaryType = z.infer<typeof LessonSummarySchema>;
export type LessonContentType = z.infer<typeof LessonContentSchema>;
