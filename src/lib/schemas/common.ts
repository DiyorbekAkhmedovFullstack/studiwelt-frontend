import { z } from 'zod';

// Common option letter type used across quizzes
export const OptionLetterSchema = z.enum(['A', 'B', 'C', 'D']);

// API Envelope wrapper - all responses are wrapped in this structure
export const ApiEnvelopeSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    time: z.string(),
    code: z.number(),
    path: z.string(),
    status: z.string(),
    message: z.string(),
    exception: z.string().nullable().optional(),
    data: dataSchema,
  });

// ISO date string validation
export const ISODateSchema = z.string().datetime().optional().nullable();

// Percentage validation (0-100)
export const PercentageSchema = z.number().min(0).max(100);

// Score validation (non-negative integer)
export const ScoreSchema = z.number().int().min(0);
