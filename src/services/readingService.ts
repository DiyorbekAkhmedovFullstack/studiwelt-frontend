import { api } from './api';
import type {
  Reading,
  ReadingAttemptResult,
  ReadingAttempt,
} from '../types/api';
import {
  ReadingsResponseSchema,
  ReadingResponseSchema,
  ReadingSubmitResponseSchema,
  ReadingAttemptsResponseSchema,
} from '../lib/schemas';

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
  getAllReadings: (lessonId?: number | string) => {
    const query = lessonId ? `?lessonId=${lessonId}` : '';
    return api.get<ReadingsResponse>(`/readings${query}`, ReadingsResponseSchema);
  },

  getReadingForTaking: (readingId: string) =>
    api.get<ReadingResponse>(`/readings/${readingId}/take`, ReadingResponseSchema),

  getReadingById: (readingId: string) =>
    api.get<ReadingResponse>(`/readings/${readingId}`, ReadingResponseSchema),

  submitAnswers: (payload: SubmitReadingAnswersPayload) =>
    api.post<SubmitReadingAnswersResponse>('/readings/submit', payload, ReadingSubmitResponseSchema),

  getAttempts: (readingId: string) =>
    api.get<ReadingAttemptsResponse>(`/readings/${readingId}/attempts`, ReadingAttemptsResponseSchema),

  createReading: (payload: CreateReadingPayload) =>
    api.post<ReadingResponse>('/readings', payload, ReadingResponseSchema),

  updateReading: (readingId: string, payload: UpdateReadingPayload) =>
    api.put<ReadingResponse>(`/readings/${readingId}`, payload, ReadingResponseSchema),

  deleteReading: (readingId: string) =>
    api.delete<unknown>(`/readings/${readingId}`),
};
