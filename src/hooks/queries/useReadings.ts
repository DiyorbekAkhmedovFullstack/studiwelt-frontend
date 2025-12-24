import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  readingService,
  type SubmitReadingAnswersPayload,
  type CreateReadingPayload,
  type UpdateReadingPayload,
} from '../../services/readingService';
import { queryKeys } from '../../lib/queryKeys';

/**
 * Hook to fetch all readings, optionally filtered by lesson
 */
export function useReadings(lessonId?: number | string) {
  return useQuery({
    queryKey: queryKeys.readings.list(lessonId ? Number(lessonId) : undefined),
    queryFn: async () => {
      const response = await readingService.getAllReadings(lessonId);
      return response.readings;
    },
  });
}

/**
 * Hook to fetch a reading for taking quiz (no answers)
 */
export function useReadingForTaking(readingId: string) {
  return useQuery({
    queryKey: queryKeys.readings.forTaking(Number(readingId)),
    queryFn: async () => {
      const response = await readingService.getReadingForTaking(readingId);
      return response.reading;
    },
    enabled: !!readingId,
  });
}

/**
 * Hook to fetch a reading by ID (with answers - admin)
 */
export function useReadingById(readingId: string) {
  return useQuery({
    queryKey: queryKeys.readings.detail(Number(readingId)),
    queryFn: async () => {
      const response = await readingService.getReadingById(readingId);
      return response.reading;
    },
    enabled: !!readingId,
  });
}

/**
 * Hook to fetch reading attempts
 */
export function useReadingAttempts(readingId: string) {
  return useQuery({
    queryKey: queryKeys.readings.attempts(Number(readingId)),
    queryFn: async () => {
      const response = await readingService.getAttempts(readingId);
      return response.attempts;
    },
    enabled: !!readingId,
  });
}

/**
 * Hook to submit reading answers
 */
export function useSubmitReadingAnswers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SubmitReadingAnswersPayload) =>
      readingService.submitAnswers(payload),
    onSuccess: (_, variables) => {
      // Invalidate progress after submission
      queryClient.invalidateQueries({ queryKey: queryKeys.progress.all });
      // Invalidate attempts for this reading
      queryClient.invalidateQueries({
        queryKey: queryKeys.readings.attempts(Number(variables.readingId)),
      });
    },
  });
}

/**
 * Hook to create a reading (admin)
 */
export function useCreateReading() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateReadingPayload) =>
      readingService.createReading(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.readings.list(variables.lessonId),
      });
    },
  });
}

/**
 * Hook to update a reading (admin)
 */
export function useUpdateReading() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      readingId,
      payload,
    }: {
      readingId: string;
      payload: UpdateReadingPayload;
    }) => readingService.updateReading(readingId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.readings.list(variables.payload.lessonId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.readings.detail(Number(variables.readingId)),
      });
    },
  });
}

/**
 * Hook to delete a reading (admin)
 */
export function useDeleteReading(lessonId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (readingId: string) => readingService.deleteReading(readingId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.readings.list(lessonId),
      });
    },
  });
}
