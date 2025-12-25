import { renderHook, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  useGrammarTopics,
  useGrammarQuiz,
  useGrammarAttempts,
  useSubmitGrammarAnswers,
} from '../../queries/useGrammar';
import { grammarService } from '../../../services/grammarService';
import { createQueryWrapper } from '../../../test/utils';

// Mock the grammar service
vi.mock('../../../services/grammarService', () => ({
  grammarService: {
    getTopicsByLesson: vi.fn(),
    getQuizQuestions: vi.fn(),
    getAttemptsByTopic: vi.fn(),
    submitAnswers: vi.fn(),
  },
}));

const mockTopics = [
  {
    id: 1,
    topicKey: 'passive-voice',
    title: 'Passive Voice',
    description: 'Learn about passive voice in German',
    questionCount: 10,
    lessonId: 1,
    lessonNumber: 1,
  },
];

const mockQuestions = [
  {
    id: 1,
    questionId: 'q1',
    questionText: 'Choose the correct form:',
    options: [
      { optionLetter: 'A' as const, optionText: 'wird gemacht', isCorrect: true },
      { optionLetter: 'B' as const, optionText: 'wurde gemacht', isCorrect: false },
    ],
  },
];

const mockAttempts = [
  {
    id: 1,
    attemptId: 'attempt-1',
    topicId: 1,
    topicTitle: 'Passive Voice',
    userId: 1,
    score: 8,
    totalQuestions: 10,
    completedAt: '2024-01-01T00:00:00Z',
  },
];

const mockSubmitResult = {
  score: 8,
  totalQuestions: 10,
  percentage: 80,
  detailedResults: [],
  topicTitle: 'Passive Voice',
};

describe('useGrammar hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useGrammarTopics', () => {
    it('should fetch grammar topics for a lesson', async () => {
      vi.mocked(grammarService.getTopicsByLesson).mockResolvedValue(mockTopics);

      const { wrapper } = createQueryWrapper();
      const { result } = renderHook(() => useGrammarTopics(1), { wrapper });

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockTopics);
      expect(grammarService.getTopicsByLesson).toHaveBeenCalledWith(1);
    });

    it('should not fetch when lessonId is falsy', async () => {
      const { wrapper } = createQueryWrapper();
      const { result } = renderHook(() => useGrammarTopics(0), { wrapper });

      expect(result.current.fetchStatus).toBe('idle');
      expect(grammarService.getTopicsByLesson).not.toHaveBeenCalled();
    });

    it('should handle fetch error', async () => {
      const error = new Error('Failed to fetch topics');
      vi.mocked(grammarService.getTopicsByLesson).mockRejectedValue(error);

      const { wrapper } = createQueryWrapper();
      const { result } = renderHook(() => useGrammarTopics(1), { wrapper });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBe(error);
    });
  });

  describe('useGrammarQuiz', () => {
    it('should fetch quiz questions for a topic', async () => {
      vi.mocked(grammarService.getQuizQuestions).mockResolvedValue(mockQuestions);

      const { wrapper } = createQueryWrapper();
      const { result } = renderHook(() => useGrammarQuiz('passive-voice'), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockQuestions);
      expect(grammarService.getQuizQuestions).toHaveBeenCalledWith('passive-voice');
    });

    it('should not fetch when topicKey is empty', async () => {
      const { wrapper } = createQueryWrapper();
      const { result } = renderHook(() => useGrammarQuiz(''), { wrapper });

      expect(result.current.fetchStatus).toBe('idle');
      expect(grammarService.getQuizQuestions).not.toHaveBeenCalled();
    });
  });

  describe('useGrammarAttempts', () => {
    it('should fetch attempts for a topic', async () => {
      vi.mocked(grammarService.getAttemptsByTopic).mockResolvedValue(mockAttempts);

      const { wrapper } = createQueryWrapper();
      const { result } = renderHook(() => useGrammarAttempts('passive-voice'), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockAttempts);
      expect(grammarService.getAttemptsByTopic).toHaveBeenCalledWith('passive-voice');
    });

    it('should not fetch when topicKey is empty', async () => {
      const { wrapper } = createQueryWrapper();
      const { result } = renderHook(() => useGrammarAttempts(''), { wrapper });

      expect(result.current.fetchStatus).toBe('idle');
      expect(grammarService.getAttemptsByTopic).not.toHaveBeenCalled();
    });
  });

  describe('useSubmitGrammarAnswers', () => {
    it('should submit grammar answers', async () => {
      vi.mocked(grammarService.submitAnswers).mockResolvedValue(mockSubmitResult);

      const { wrapper } = createQueryWrapper();
      const { result } = renderHook(() => useSubmitGrammarAnswers(), { wrapper });

      await act(async () => {
        result.current.mutate({
          topicKey: 'passive-voice',
          answers: { q1: 'A', q2: 'B' },
        });
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(grammarService.submitAnswers).toHaveBeenCalledWith({
        topicKey: 'passive-voice',
        answers: { q1: 'A', q2: 'B' },
      });
    });

    it('should handle submission error', async () => {
      const error = new Error('Submission failed');
      vi.mocked(grammarService.submitAnswers).mockRejectedValue(error);

      const { wrapper } = createQueryWrapper();
      const { result } = renderHook(() => useSubmitGrammarAnswers(), { wrapper });

      await act(async () => {
        result.current.mutate({
          topicKey: 'passive-voice',
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
