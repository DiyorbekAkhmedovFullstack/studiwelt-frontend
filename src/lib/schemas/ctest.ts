import { z } from 'zod';
import { PercentageSchema, ScoreSchema } from './common';

// C-Test schema
export const CTestSchema = z.object({
  id: z.string(),
  lessonId: z.number(),
  title: z.string(),
  description: z.string().nullable().optional(),
  originalText: z.string(),
  gapText: z.string(),
  created: z.string().nullable().optional(),
  updated: z.string().nullable().optional(),
  creatorName: z.string().nullable().optional(),
  lessonNumber: z.number().nullable().optional(),
});

// Individual gap result
export const CTestGapResultSchema = z.object({
  index: z.number().int().min(0),
  userAnswer: z.string().nullable(),
  correctAnswer: z.string().nullable(),
  isCorrect: z.boolean(),
  context: z.string(),
});

// C-Test result
export const CTestResultSchema = z.object({
  attemptId: z.string().optional(),
  score: ScoreSchema,
  totalGaps: z.number().int().min(0),
  percentage: PercentageSchema,
  gaps: z.array(CTestGapResultSchema),
  lessonNumber: z.number().optional(),
  title: z.string().optional(),
});

// Response schemas
export const CTestsResponseSchema = z.object({
  tests: z.array(CTestSchema),
});

export const CTestResponseSchema = z.object({
  test: CTestSchema,
});

export const CTestSubmitResponseSchema = z.object({
  result: CTestResultSchema,
});

// Type exports
export type CTestType = z.infer<typeof CTestSchema>;
export type CTestResultType = z.infer<typeof CTestResultSchema>;
