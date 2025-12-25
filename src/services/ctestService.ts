import { api } from './api';
import type { CTest, CTestResult } from '../types/api';
import {
  CTestsResponseSchema,
  CTestResponseSchema,
  CTestSubmitResponseSchema,
} from '../lib/schemas';

export type CTestsResponse = {
  tests: CTest[];
};

export type CTestResponse = {
  test: CTest;
};

export type SubmitCTestAnswersPayload = {
  answers: Record<string, string>;
};

export type SubmitCTestAnswersResponse = {
  result: CTestResult;
};

export const ctestService = {
  getTestsByLesson: (lessonId: number | string) =>
    api.get<CTestsResponse>(`/ctests?lessonId=${lessonId}`, CTestsResponseSchema),

  getTestById: (testId: string) =>
    api.get<CTestResponse>(`/ctests/${testId}`, CTestResponseSchema),

  submitAnswers: (testId: string, payload: SubmitCTestAnswersPayload) =>
    api.post<SubmitCTestAnswersResponse>(`/ctests/${testId}/submit`, payload, CTestSubmitResponseSchema),

  create: (payload: {
    title: string;
    description?: string;
    originalText: string;
    gapText: string;
    lessonId: number;
  }) => api.post<CTestResponse>('/ctests', payload, CTestResponseSchema),

  update: (
    testId: string,
    payload: {
      title: string;
      description?: string;
      originalText: string;
      gapText: string;
      lessonId: number;
    },
  ) => api.put<CTestResponse>(`/ctests/${testId}`, payload, CTestResponseSchema),

  delete: (testId: string) => api.delete<unknown>(`/ctests/${testId}`),
};
