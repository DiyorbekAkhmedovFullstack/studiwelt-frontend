import { api } from './api';
import type {
  Reading,
  ReadingAttemptResult,
  ReadingAttempt,
} from '../types/api';

export type ReadingsResponse = {
  readings: Reading[];
};

export type ReadingResponse = {
  reading: Reading;
};

export type SubmitReadingAnswersPayload = {
  readingId: string;
  answers: Record<string, 'A' | 'B' | 'C' | 'D'>; // { questionId: selectedLetter }
};

export type SubmitReadingAnswersResponse = {
  result: ReadingAttemptResult;
};

export type ReadingAttemptsResponse = {
  attempts: ReadingAttempt[];
};

export type CreateReadingPayload = {
  title: string;
  text: string;
  lessonId: number;
  questions: Array<{
    questionText: string;
    explanation?: string;
    options: Array<{
      optionLetter: 'A' | 'B' | 'C' | 'D';
      optionText: string;
      isCorrect: boolean;
    }>;
  }>;
};

export type UpdateReadingPayload = {
  title: string;
  text: string;
  lessonId: number;
  questions: Array<{
    questionText: string;
    explanation?: string;
    options: Array<{
      optionLetter: 'A' | 'B' | 'C' | 'D';
      optionText: string;
      isCorrect: boolean;
    }>;
  }>;
};

export const readingService = {
  /**
   * Get all readings, optionally filtered by lesson ID
   * @param lessonId - Optional lesson ID to filter readings
   */
  getAllReadings: (lessonId?: number | string) => {
    const query = lessonId ? `?lessonId=${lessonId}` : '';
    return api.get<ReadingsResponse>(`/readings${query}`);
  },

  /**
   * Get reading by ID (for taking quiz - no correct answers included)
   * @param readingId - Reading ID
   */
  getReadingForTaking: (readingId: string) =>
    api.get<ReadingResponse>(`/readings/${readingId}/take`),

  /**
   * Get reading by ID (with answers - admin only)
   * @param readingId - Reading ID
   */
  getReadingById: (readingId: string) =>
    api.get<ReadingResponse>(`/readings/${readingId}`),

  /**
   * Submit answers for a reading quiz
   * @param payload - Reading ID and answers object
   */
  submitAnswers: (payload: SubmitReadingAnswersPayload) =>
    api.post<SubmitReadingAnswersResponse>('/readings/submit', payload),

  /**
   * Get user's attempts for a specific reading
   * @param readingId - Reading ID
   */
  getAttempts: (readingId: string) =>
    api.get<ReadingAttemptsResponse>(`/readings/${readingId}/attempts`),

  /**
   * Create a new reading (admin only)
   * @param payload - Reading data with questions
   */
  createReading: (payload: CreateReadingPayload) =>
    api.post<ReadingResponse>('/readings', payload),

  /**
   * Update an existing reading (admin only)
   * @param readingId - Reading ID
   * @param payload - Updated reading data
   */
  updateReading: (readingId: string, payload: UpdateReadingPayload) =>
    api.put<ReadingResponse>(`/readings/${readingId}`, payload),

  /**
   * Delete a reading (admin only)
   * @param readingId - Reading ID
   */
  deleteReading: (readingId: string) =>
    api.delete<unknown>(`/readings/${readingId}`),
};
