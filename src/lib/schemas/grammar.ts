import { z } from 'zod';
import { OptionLetterSchema, PercentageSchema, ScoreSchema } from './common';

// Grammar topic schema
export const GrammarTopicSchema = z.object({
  id: z.number(),
  topicKey: z.string(),
  title: z.string(),
  description: z.string(),
  questionCount: z.number().int().min(0),
  lessonId: z.number(),
  lessonNumber: z.number().int().min(1).max(30),
});

// Grammar quiz option
export const GrammarQuizOptionSchema = z.object({
  optionLetter: OptionLetterSchema,
  optionText: z.string(),
  isCorrect: z.boolean().nullable().optional(),
});

// Grammar quiz question
export const GrammarQuizQuestionSchema = z.object({
  id: z.number(),
  questionId: z.string(),
  questionText: z.string(),
  explanation: z.string().nullable().optional(),
  questionOrder: z.number().nullable().optional(),
  options: z.array(GrammarQuizOptionSchema),
});

// Grammar question result
export const GrammarQuestionResultSchema = z.object({
  questionId: z.string(),
  questionText: z.string(),
  userAnswer: OptionLetterSchema.nullable(),
  correctAnswer: OptionLetterSchema.nullable(),
  isCorrect: z.boolean(),
  explanation: z.string().nullable().optional(),
  options: z.array(GrammarQuizOptionSchema),
});

// Grammar submit result
export const GrammarSubmitResultSchema = z.object({
  score: ScoreSchema,
  totalQuestions: z.number().int().min(0),
  percentage: PercentageSchema,
  detailedResults: z.array(GrammarQuestionResultSchema),
  topicTitle: z.string(),
});

// Grammar attempt record
export const GrammarAttemptSchema = z.object({
  id: z.number(),
  attemptId: z.string(),
  topicId: z.number(),
  topicTitle: z.string(),
  userId: z.number(),
  score: ScoreSchema,
  totalQuestions: z.number().int().min(0),
  completedAt: z.string(),
});

// Response schemas
export const GrammarTopicsResponseSchema = z.object({
  topics: z.array(GrammarTopicSchema),
});

export const GrammarQuestionsResponseSchema = z.array(GrammarQuizQuestionSchema);

export const GrammarSubmitResponseSchema = GrammarSubmitResultSchema;

export const GrammarAttemptsResponseSchema = z.object({
  attempts: z.array(GrammarAttemptSchema),
});

// Type exports
export type GrammarTopicType = z.infer<typeof GrammarTopicSchema>;
export type GrammarQuizQuestionType = z.infer<typeof GrammarQuizQuestionSchema>;
export type GrammarSubmitResultType = z.infer<typeof GrammarSubmitResultSchema>;
