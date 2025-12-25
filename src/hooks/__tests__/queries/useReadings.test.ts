import { renderHook, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useReadings, useReadingForTaking, useSubmitReadingAnswers } from '../../queries/useReadings';
import { readingService } from '../../../services/readingService';
import { createQueryWrapper } from '../../../test/utils';

// Mock the reading service
vi.mock('../../../services/readingService', () => ({
  readingService: {
    getAllReadings: vi.fn(),
    getReadingForTaking: vi.fn(),
    submitAnswers: vi.fn(),
  },
}));

const mockReadings = [
  {
    id: 'reading-1',
    title: 'German Culture',
    text: 'Germany is known for...',
    lessonId: 1,
    questions: [
      {
        id: 'q1',
        questionText: 'What is Germany known for?',
        options: [
          { id: 'o1', optionLetter: 'A' as const, optionText: 'Cars' },
          { id: 'o2', optionLetter: 'B' as const, optionText: 'Food' },
        ],
      },
    ],
  },
];

const mockSubmitResult = {
  result: {
    attemptId: 'attempt-1',
    score: 8,
    totalQuestions: 10,
    percentage: 80,
    results: [],
  },
};

describe('useReadings hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useReadings', () => {
    it('should fetch all readings', async () => {
      vi.mocked(readingService.getAllReadings).mockResolvedValue({ readings: mockReadings });

      const { wrapper } = createQueryWrapper();
      const { result } = renderHook(() => useReadings(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockReadings);
      expect(readingService.getAllReadings).toHaveBeenCalledWith(undefined);
    });

    it('should fetch readings filtered by lessonId', async () => {
      vi.mocked(readingService.getAllReadings).mockResolvedValue({ readings: mockReadings });

      const { wrapper } = createQueryWrapper();
      const { result } = renderHook(() => useReadings(1), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(readingService.getAllReadings).toHaveBeenCalledWith(1);
    });

    it('should handle fetch error', async () => {
      const error = new Error('Failed to fetch');
      vi.mocked(readingService.getAllReadings).mockRejectedValue(error);

      const { wrapper } = createQueryWrapper();
      const { result } = renderHook(() => useReadings(), { wrapper });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBe(error);
    });
  });

  describe('useReadingForTaking', () => {
    it('should fetch a reading for taking quiz', async () => {
      vi.mocked(readingService.getReadingForTaking).mockResolvedValue({
        reading: mockReadings[0],
      });

      const { wrapper } = createQueryWrapper();
      const { result } = renderHook(() => useReadingForTaking('reading-1'), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockReadings[0]);
      expect(readingService.getReadingForTaking).toHaveBeenCalledWith('reading-1');
    });

    it('should not fetch when readingId is empty', async () => {
      const { wrapper } = createQueryWrapper();
      const { result } = renderHook(() => useReadingForTaking(''), { wrapper });

      expect(result.current.fetchStatus).toBe('idle');
      expect(readingService.getReadingForTaking).not.toHaveBeenCalled();
    });
  });

  describe('useSubmitReadingAnswers', () => {
    it('should submit reading answers', async () => {
      vi.mocked(readingService.submitAnswers).mockResolvedValue(mockSubmitResult);

      const { wrapper } = createQueryWrapper();
      const { result } = renderHook(() => useSubmitReadingAnswers(), { wrapper });

      await act(async () => {
        result.current.mutate({
          readingId: 'reading-1',
          answers: { q1: 'A', q2: 'B' },
        });
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(readingService.submitAnswers).toHaveBeenCalledWith({
        readingId: 'reading-1',
        answers: { q1: 'A', q2: 'B' },
      });
    });

    it('should handle submission error', async () => {
      const error = new Error('Submission failed');
      vi.mocked(readingService.submitAnswers).mockRejectedValue(error);

      const { wrapper } = createQueryWrapper();
      const { result } = renderHook(() => useSubmitReadingAnswers(), { wrapper });

      await act(async () => {
        result.current.mutate({
          readingId: 'reading-1',
          answers: { q1: 'A' },
        });
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBe(error);
    });
  });
});
