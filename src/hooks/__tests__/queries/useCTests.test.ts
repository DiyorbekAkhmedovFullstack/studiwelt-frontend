import { renderHook, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useCTestsByLesson, useCTestById, useSubmitCTestAnswers, useCreateCTest } from '../../queries/useCTests';
import { ctestService } from '../../../services/ctestService';
import { createQueryWrapper } from '../../../test/utils';

// Mock the ctest service
vi.mock('../../../services/ctestService', () => ({
  ctestService: {
    getTestsByLesson: vi.fn(),
    getTestById: vi.fn(),
    submitAnswers: vi.fn(),
    create: vi.fn(),
  },
}));

const mockCTests = [
  {
    id: 'ctest-1',
    lessonId: 1,
    title: 'German Fill-in-the-blank',
    description: 'Complete the words',
    originalText: 'Das ist ein Test.',
    gapText: 'Das i__ ein Te__.',
  },
];

const mockSubmitResult = {
  result: {
    attemptId: 'attempt-1',
    score: 8,
    totalGaps: 10,
    percentage: 80,
    gaps: [],
  },
};

describe('useCTests hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useCTestsByLesson', () => {
    it('should fetch C-Tests for a lesson', async () => {
      vi.mocked(ctestService.getTestsByLesson).mockResolvedValue({ tests: mockCTests });

      const { wrapper } = createQueryWrapper();
      const { result } = renderHook(() => useCTestsByLesson(1), { wrapper });

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockCTests);
      expect(ctestService.getTestsByLesson).toHaveBeenCalledWith(1);
    });

    it('should not fetch when lessonId is falsy', async () => {
      const { wrapper } = createQueryWrapper();
      const { result } = renderHook(() => useCTestsByLesson(0), { wrapper });

      expect(result.current.fetchStatus).toBe('idle');
      expect(ctestService.getTestsByLesson).not.toHaveBeenCalled();
    });

    it('should handle fetch error', async () => {
      const error = new Error('Failed to fetch');
      vi.mocked(ctestService.getTestsByLesson).mockRejectedValue(error);

      const { wrapper } = createQueryWrapper();
      const { result } = renderHook(() => useCTestsByLesson(1), { wrapper });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBe(error);
    });
  });

  describe('useCTestById', () => {
    it('should fetch a single C-Test by ID', async () => {
      vi.mocked(ctestService.getTestById).mockResolvedValue({ test: mockCTests[0] });

      const { wrapper } = createQueryWrapper();
      const { result } = renderHook(() => useCTestById('ctest-1'), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockCTests[0]);
      expect(ctestService.getTestById).toHaveBeenCalledWith('ctest-1');
    });

    it('should not fetch when testId is empty', async () => {
      const { wrapper } = createQueryWrapper();
      const { result } = renderHook(() => useCTestById(''), { wrapper });

      expect(result.current.fetchStatus).toBe('idle');
      expect(ctestService.getTestById).not.toHaveBeenCalled();
    });
  });

  describe('useSubmitCTestAnswers', () => {
    it('should submit C-Test answers', async () => {
      vi.mocked(ctestService.submitAnswers).mockResolvedValue(mockSubmitResult);

      const { wrapper } = createQueryWrapper();
      const { result } = renderHook(() => useSubmitCTestAnswers(), { wrapper });

      await act(async () => {
        result.current.mutate({
          testId: 'ctest-1',
          payload: { answers: { '0': 'st', '1': 'st' } },
        });
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(ctestService.submitAnswers).toHaveBeenCalledWith('ctest-1', {
        answers: { '0': 'st', '1': 'st' },
      });
    });

    it('should handle submission error', async () => {
      const error = new Error('Submission failed');
      vi.mocked(ctestService.submitAnswers).mockRejectedValue(error);

      const { wrapper } = createQueryWrapper();
      const { result } = renderHook(() => useSubmitCTestAnswers(), { wrapper });

      await act(async () => {
        result.current.mutate({
          testId: 'ctest-1',
          payload: { answers: { '0': 'st' } },
        });
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBe(error);
    });
  });

  describe('useCreateCTest', () => {
    it('should create a new C-Test', async () => {
      vi.mocked(ctestService.create).mockResolvedValue({ test: mockCTests[0] });

      const { wrapper } = createQueryWrapper();
      const { result } = renderHook(() => useCreateCTest(), { wrapper });

      await act(async () => {
        result.current.mutate({
          title: 'New Test',
          originalText: 'Original text',
          gapText: 'Gap text',
          lessonId: 1,
        });
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(ctestService.create).toHaveBeenCalledWith({
        title: 'New Test',
        originalText: 'Original text',
        gapText: 'Gap text',
        lessonId: 1,
      });
    });
  });
});
