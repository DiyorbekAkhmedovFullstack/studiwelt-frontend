import { z } from 'zod';
import { PercentageSchema } from './common';

// Individual card schema
export const CardSchema = z.object({
  id: z.string(),
  front: z.string(),
  back: z.string(),
  correctCount: z.number().int().min(0),
  incorrectCount: z.number().int().min(0),
  lastReview: z.string().nullable().optional(),
});

// Deck schema (collection of cards)
export const DeckSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable().optional(),
  lessonId: z.number(),
  created: z.string().nullable().optional(),
  updated: z.string().nullable().optional(),
  cards: z.array(CardSchema),
});

// Flashcard session result
export const FlashcardSessionResultSchema = z.object({
  sessionId: z.string(),
  cardsReviewed: z.number().int().min(0),
  cardsCorrect: z.number().int().min(0),
  totalCards: z.number().int().min(0),
  percentage: PercentageSchema,
  deckName: z.string(),
});

// Bulk upload result
export const BulkUploadResultSchema = z.object({
  deckId: z.string(),
  deckName: z.string(),
  totalCardsUploaded: z.number().int().min(0),
  successfulInserts: z.number().int().min(0),
  failedInserts: z.number().int().min(0),
  errors: z.array(z.string()).nullable(),
  message: z.string(),
});

// Response schemas
export const DecksResponseSchema = z.object({
  decks: z.array(DeckSchema),
});

export const DeckResponseSchema = z.object({
  deck: DeckSchema,
});

export const CardResponseSchema = z.object({
  card: CardSchema,
});

export const SessionResultResponseSchema = z.object({
  result: FlashcardSessionResultSchema,
});

// Type exports
export type CardType = z.infer<typeof CardSchema>;
export type DeckType = z.infer<typeof DeckSchema>;
export type FlashcardSessionResultType = z.infer<typeof FlashcardSessionResultSchema>;
