import { renderHook, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useDecksByLesson, useCompleteSession, useCreateDeck } from '../../queries/useDecks';
import { deckService } from '../../../services/deckService';
import { createQueryWrapper } from '../../../test/utils';

// Mock the deck service
vi.mock('../../../services/deckService', () => ({
  deckService: {
    getDecksByLessonId: vi.fn(),
    completeSession: vi.fn(),
    createDeck: vi.fn(),
  },
}));

const mockDecks = [
  {
    id: 'deck-1',
    name: 'Vocabulary',
    description: 'German vocabulary',
    lessonId: 1,
    cards: [
      { id: 'card-1', front: 'Hello', back: 'Hallo', correctCount: 0, incorrectCount: 0 },
    ],
  },
];

const mockSessionResult = {
  result: {
    sessionId: 'session-1',
    cardsReviewed: 10,
    cardsCorrect: 8,
    totalCards: 10,
    percentage: 80,
    deckName: 'Vocabulary',
  },
};

describe('useDecks hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useDecksByLesson', () => {
    it('should fetch decks for a lesson', async () => {
      vi.mocked(deckService.getDecksByLessonId).mockResolvedValue({ decks: mockDecks });

      const { wrapper } = createQueryWrapper();
      const { result } = renderHook(() => useDecksByLesson(1), { wrapper });

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockDecks);
      expect(deckService.getDecksByLessonId).toHaveBeenCalledWith(1);
    });

    it('should not fetch when lessonId is falsy', async () => {
      const { wrapper } = createQueryWrapper();
      const { result } = renderHook(() => useDecksByLesson(0), { wrapper });

      expect(result.current.fetchStatus).toBe('idle');
      expect(deckService.getDecksByLessonId).not.toHaveBeenCalled();
    });

    it('should handle string lessonId', async () => {
      vi.mocked(deckService.getDecksByLessonId).mockResolvedValue({ decks: mockDecks });

      const { wrapper } = createQueryWrapper();
      const { result } = renderHook(() => useDecksByLesson('1'), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(deckService.getDecksByLessonId).toHaveBeenCalledWith('1');
    });
  });

  describe('useCompleteSession', () => {
    it('should complete a flashcard session', async () => {
      vi.mocked(deckService.completeSession).mockResolvedValue(mockSessionResult as never);

      const { wrapper } = createQueryWrapper();
      const { result } = renderHook(() => useCompleteSession(), { wrapper });

      await act(async () => {
        result.current.mutate({
          deckId: 'deck-1',
          payload: {
            cardsReviewed: 10,
            cardsCorrect: 8,
            totalCards: 10,
          },
        });
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(deckService.completeSession).toHaveBeenCalledWith('deck-1', {
        cardsReviewed: 10,
        cardsCorrect: 8,
        totalCards: 10,
      });
    });

    it('should handle session completion error', async () => {
      const error = new Error('Session failed');
      vi.mocked(deckService.completeSession).mockRejectedValue(error);

      const { wrapper } = createQueryWrapper();
      const { result } = renderHook(() => useCompleteSession(), { wrapper });

      await act(async () => {
        result.current.mutate({
          deckId: 'deck-1',
          payload: { cardsReviewed: 10, cardsCorrect: 8, totalCards: 10 },
        });
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBe(error);
    });
  });

  describe('useCreateDeck', () => {
    it('should create a new deck', async () => {
      const newDeck = { ...mockDecks[0], id: 'new-deck' };
      vi.mocked(deckService.createDeck).mockResolvedValue({ deck: newDeck });

      const { wrapper } = createQueryWrapper();
      const { result } = renderHook(() => useCreateDeck(), { wrapper });

      await act(async () => {
        result.current.mutate({
          name: 'New Deck',
          description: 'A new deck',
          lessonId: 1,
        });
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(deckService.createDeck).toHaveBeenCalledWith({
        name: 'New Deck',
        description: 'A new deck',
        lessonId: 1,
      });
    });
  });
});
