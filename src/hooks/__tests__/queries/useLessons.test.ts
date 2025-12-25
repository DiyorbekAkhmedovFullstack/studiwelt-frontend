import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useLessons, useLessonByNumber, useLessonContent } from '../../queries/useLessons';
import { lessonService } from '../../../services/lessonService';
import { createQueryWrapper } from '../../../test/utils';

// Mock the lesson service
vi.mock('../../../services/lessonService', () => ({
  lessonService: {
    getAllLessons: vi.fn(),
    getLessonByNumber: vi.fn(),
    getLessonContent: vi.fn(),
  },
}));

const mockLessons = [
  { id: 1, lessonNumber: 1, title: 'Lesson 1', description: 'First lesson', published: true },
  { id: 2, lessonNumber: 2, title: 'Lesson 2', description: 'Second lesson', published: true },
];

const mockLesson = {
  id: 1,
  lessonNumber: 1,
  title: 'Lesson 1',
  description: 'First lesson',
  published: true,
};

const mockLessonContent = {
  lesson: mockLesson,
  flashcardDecks: [],
  grammarTopic: null,
  readings: [],
  ctests: [],
};

describe('useLessons hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useLessons', () => {
    it('should fetch lessons successfully', async () => {
      vi.mocked(lessonService.getAllLessons).mockResolvedValue({ lessons: mockLessons });

      const { wrapper } = createQueryWrapper();
      const { result } = renderHook(() => useLessons(), { wrapper });

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockLessons);
      expect(lessonService.getAllLessons).toHaveBeenCalledTimes(1);
    });

    it('should handle fetch error', async () => {
      const error = new Error('Failed to fetch lessons');
      vi.mocked(lessonService.getAllLessons).mockRejectedValue(error);

      const { wrapper } = createQueryWrapper();
      const { result } = renderHook(() => useLessons(), { wrapper });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBe(error);
    });
  });

  describe('useLessonByNumber', () => {
    it('should fetch a single lesson by number', async () => {
      vi.mocked(lessonService.getLessonByNumber).mockResolvedValue({ lesson: mockLesson });

      const { wrapper } = createQueryWrapper();
      const { result } = renderHook(() => useLessonByNumber(1), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockLesson);
      expect(lessonService.getLessonByNumber).toHaveBeenCalledWith(1);
    });

    it('should not fetch when lessonNumber is not provided', async () => {
      const { wrapper } = createQueryWrapper();
      // @ts-expect-error - testing invalid input
      const { result } = renderHook(() => useLessonByNumber(null), { wrapper });

      expect(result.current.fetchStatus).toBe('idle');
      expect(lessonService.getLessonByNumber).not.toHaveBeenCalled();
    });

    it('should handle string lesson number', async () => {
      vi.mocked(lessonService.getLessonByNumber).mockResolvedValue({ lesson: mockLesson });

      const { wrapper } = createQueryWrapper();
      const { result } = renderHook(() => useLessonByNumber('1'), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(lessonService.getLessonByNumber).toHaveBeenCalledWith('1');
    });
  });

  describe('useLessonContent', () => {
    it('should fetch lesson content successfully', async () => {
      vi.mocked(lessonService.getLessonContent).mockResolvedValue({ content: mockLessonContent });

      const { wrapper } = createQueryWrapper();
      const { result } = renderHook(() => useLessonContent(1), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockLessonContent);
      expect(lessonService.getLessonContent).toHaveBeenCalledWith(1);
    });

    it('should not fetch when lessonNumber is falsy', async () => {
      const { wrapper } = createQueryWrapper();
      const { result } = renderHook(() => useLessonContent(0), { wrapper });

      expect(result.current.fetchStatus).toBe('idle');
      expect(lessonService.getLessonContent).not.toHaveBeenCalled();
    });
  });
});
