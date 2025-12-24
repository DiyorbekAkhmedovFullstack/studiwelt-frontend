import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deckService, type CompleteSessionPayload } from '../../services/deckService';
import { queryKeys } from '../../lib/queryKeys';

/**
 * Hook to fetch decks for a lesson
 */
export function useDecksByLesson(lessonId: number | string) {
  return useQuery({
    queryKey: queryKeys.decks.byLesson(Number(lessonId)),
    queryFn: async () => {
      const response = await deckService.getDecksByLessonId(lessonId);
      return response.decks;
    },
    enabled: !!lessonId,
  });
}

/**
 * Hook to complete a flashcard session
 */
export function useCompleteSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ deckId, payload }: { deckId: string; payload: CompleteSessionPayload }) =>
      deckService.completeSession(deckId, payload),
    onSuccess: () => {
      // Invalidate progress after session completion
      queryClient.invalidateQueries({ queryKey: queryKeys.progress.all });
    },
  });
}

/**
 * Hook to create a deck (admin)
 */
export function useCreateDeck() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { name: string; description: string; lessonId: number }) =>
      deckService.createDeck(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.decks.byLesson(variables.lessonId),
      });
    },
  });
}

/**
 * Hook to update a deck (admin)
 */
export function useUpdateDeck() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      deckId,
      payload,
    }: {
      deckId: string;
      payload: { name: string; description: string; lessonId: number };
    }) => deckService.updateDeck(deckId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.decks.byLesson(variables.payload.lessonId),
      });
    },
  });
}

/**
 * Hook to delete a deck (admin)
 */
export function useDeleteDeck(lessonId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (deckId: string) => deckService.deleteDeck(deckId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.decks.byLesson(lessonId),
      });
    },
  });
}

/**
 * Hook to add a card to a deck (admin)
 */
export function useAddCard(lessonId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ deckId, payload }: { deckId: string; payload: { front: string; back: string } }) =>
      deckService.addCard(deckId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.decks.byLesson(lessonId),
      });
    },
  });
}

/**
 * Hook to upload CSV cards (admin)
 */
export function useUploadCSV(lessonId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ deckId, file }: { deckId: string; file: File }) =>
      deckService.uploadCSV(deckId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.decks.byLesson(lessonId),
      });
    },
  });
}
