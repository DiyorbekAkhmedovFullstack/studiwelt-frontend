import { api } from './api';
import type { Card, Deck, FlashcardSessionResult, BulkUploadResultDto } from '../types/api';

export type DecksResponse = {
  decks: Deck[];
};

export type DeckResponse = {
  deck: Deck;
};

export type CardResponse = {
  card: Card;
};

export type CompleteSessionPayload = {
  cardsReviewed: number;
  cardsCorrect: number;
  totalCards: number;
};

export const deckService = {
  getDecksByLessonId: (lessonId: number | string) =>
    api.get<DecksResponse>(`/decks?lessonId=${lessonId}`),

  createDeck: (payload: { name: string; description: string; lessonId: number }) =>
    api.post<DeckResponse>('/decks', payload),

  updateDeck: (
    deckId: string,
    payload: { name: string; description: string; lessonId: number },
  ) => api.put<DeckResponse>(`/decks/${deckId}`, payload),

  deleteDeck: (deckId: string) => api.delete<unknown>(`/decks/${deckId}`),

  addCard: (
    deckId: string,
    payload: { front: string; back: string },
  ) => api.post<CardResponse>(`/decks/${deckId}/cards`, payload),

  updateCard: (cardId: string, payload: { front: string; back: string }) =>
    api.put<CardResponse>(`/decks/cards/${cardId}`, payload),

  deleteCard: (cardId: string) => api.delete<unknown>(`/decks/cards/${cardId}`),

  reviewCard: (cardId: string, isCorrect: boolean) =>
    api.post<CardResponse>(`/decks/cards/${cardId}/review`, { isCorrect }),

  /**
   * POST /decks/{deckId}/sessions/complete
   * Complete a flashcard study session and update progress tracking
   *
   * This endpoint:
   * - Saves the session data
   * - Calculates percentage score
   * - Updates lesson progress
   * - Enforces 3-attempt limit (locks section after 3 successful attempts)
   *
   * @param deckId - The deck ID
   * @param payload - Session data (cards reviewed, correct answers, total cards)
   * @returns FlashcardSessionResult with session ID and percentage
   * @throws Error if section is locked (403)
   */
  completeSession: (deckId: string, payload: CompleteSessionPayload) =>
    api.post<FlashcardSessionResult>(
      `/decks/${deckId}/sessions/complete`,
      payload,
    ),

  /**
   * POST /decks/{deckId}/cards/upload
   * Bulk upload flashcards from a CSV file (standard comma delimiter)
   *
   * This endpoint:
   * - Accepts CSV file with format: front,back
   * - Validates file size (max 10MB)
   * - Parses CSV and creates cards in bulk
   * - Returns detailed results with success/failure counts
   *
   * @param deckId - The deck ID to upload cards to
   * @param file - CSV file to upload
   * @returns BulkUploadResultDto with upload results
   * @throws Error if file validation fails or upload errors
   */
  uploadCSV: (deckId: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post<{ result: BulkUploadResultDto }>(
      `/decks/${deckId}/cards/upload`,
      formData,
    );
  },

  /**
   * POST /decks/{deckId}/cards/upload/custom
   * Bulk upload flashcards from a file with custom delimiter
   *
   * This endpoint:
   * - Accepts files with custom delimiters (semicolon, tab, pipe, etc.)
   * - Validates file size (max 10MB)
   * - Parses file and creates cards in bulk
   * - Returns detailed results with success/failure counts
   *
   * @param deckId - The deck ID to upload cards to
   * @param file - File to upload
   * @param delimiter - Delimiter character (e.g., ';', '\t', '|')
   * @returns BulkUploadResultDto with upload results
   * @throws Error if file validation fails or upload errors
   */
  uploadCSVWithDelimiter: (deckId: string, file: File, delimiter: string) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post<{ result: BulkUploadResultDto }>(
      `/decks/${deckId}/cards/upload/custom?delimiter=${encodeURIComponent(delimiter)}`,
      formData,
    );
  },
};
