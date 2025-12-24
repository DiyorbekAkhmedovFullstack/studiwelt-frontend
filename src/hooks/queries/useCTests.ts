import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ctestService, type SubmitCTestAnswersPayload } from '../../services/ctestService';
import { queryKeys } from '../../lib/queryKeys';

/**
 * Hook to fetch C-Tests for a lesson
 */
export function useCTestsByLesson(lessonId: number | string) {
  return useQuery({
    queryKey: queryKeys.ctests.byLesson(Number(lessonId)),
    queryFn: async () => {
      const response = await ctestService.getTestsByLesson(lessonId);
      return response.tests;
    },
    enabled: !!lessonId,
  });
}

/**
 * Hook to fetch a single C-Test by ID
 */
export function useCTestById(testId: string) {
  return useQuery({
    queryKey: queryKeys.ctests.detail(Number(testId)),
    queryFn: async () => {
      const response = await ctestService.getTestById(testId);
      return response.test;
    },
    enabled: !!testId,
  });
}

/**
 * Hook to submit C-Test answers
 */
export function useSubmitCTestAnswers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ testId, payload }: { testId: string; payload: SubmitCTestAnswersPayload }) =>
      ctestService.submitAnswers(testId, payload),
    onSuccess: () => {
      // Invalidate progress after submission
      queryClient.invalidateQueries({ queryKey: queryKeys.progress.all });
    },
  });
}

/**
 * Hook to create a C-Test (admin)
 */
export function useCreateCTest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      title: string;
      description?: string;
      originalText: string;
      gapText: string;
      lessonId: number;
    }) => ctestService.create(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.ctests.byLesson(variables.lessonId),
      });
    },
  });
}

/**
 * Hook to update a C-Test (admin)
 */
export function useUpdateCTest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      testId,
      payload,
    }: {
      testId: string;
      payload: {
        title: string;
        description?: string;
        originalText: string;
        gapText: string;
        lessonId: number;
      };
    }) => ctestService.update(testId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.ctests.byLesson(variables.payload.lessonId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.ctests.detail(Number(variables.testId)),
      });
    },
  });
}

/**
 * Hook to delete a C-Test (admin)
 */
export function useDeleteCTest(lessonId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (testId: string) => ctestService.delete(testId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.ctests.byLesson(lessonId),
      });
    },
  });
}
