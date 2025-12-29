import { z } from 'zod';
import { OptionLetterSchema, PercentageSchema, ScoreSchema } from './common';

// Reading option schema
export const ReadingOptionSchema = z.object({
  id: z.string(),
  optionLetter: OptionLetterSchema,
  optionText: z.string(),
  isCorrect: z.boolean().optional(), // Only in admin view
});

// Reading question schema
export const ReadingQuestionSchema = z.object({
  id: z.string(),
  questionText: z.string(),
  explanation: z.string().nullable().optional(),
  options: z.array(ReadingOptionSchema),
});

// Reading schema
export const ReadingSchema = z.object({
  id: z.string(),
  title: z.string(),
  text: z.string(),
  lessonId: z.number(),
  created: z.string().nullable().optional(),
  updated: z.string().nullable().optional(),
  questions: z.array(ReadingQuestionSchema),
});

// Question result in attempt
export const QuestionResultSchema = z.object({
  questionId: z.string(),
  questionText: z.string(),
  selectedAnswer: OptionLetterSchema.nullable().optional(),
  correctAnswer: OptionLetterSchema,
  isCorrect: z.boolean(),
  explanation: z.string().nullable().optional(),
  options: z.array(ReadingOptionSchema),
});

// Reading attempt result
export const ReadingAttemptResultSchema = z.object({
  attemptId: z.string(),
  score: ScoreSchema,
  totalQuestions: z.number().int().min(0),
  percentage: PercentageSchema,
  results: z.array(QuestionResultSchema),
  lessonNumber: z.number().optional(),
});

// Reading attempt record
export const ReadingAttemptSchema = z.object({
  id: z.string(),
  readingId: z.string(),
  userId: z.string(),
  score: ScoreSchema,
  totalQuestions: z.number().int().min(0),
  percentage: PercentageSchema,
  attemptedAt: z.string(),
});

// Response schemas
export const ReadingsResponseSchema = z.object({
  readings: z.array(ReadingSchema),
});

export const ReadingResponseSchema = z.object({
  reading: ReadingSchema,
});

export const ReadingSubmitResponseSchema = z.object({
  result: ReadingAttemptResultSchema,
});

export const ReadingAttemptsResponseSchema = z.object({
  attempts: z.array(ReadingAttemptSchema),
});

// Type exports
export type ReadingType = z.infer<typeof ReadingSchema>;
export type ReadingAttemptResultType = z.infer<typeof ReadingAttemptResultSchema>;
