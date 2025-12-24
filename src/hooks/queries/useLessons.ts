import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { lessonService } from '../../services/lessonService';
import { queryKeys } from '../../lib/queryKeys';

/**
 * Hook to fetch all published lessons
 */
export function useLessons() {
  return useQuery({
    queryKey: queryKeys.lessons.list(),
    queryFn: async () => {
      const response = await lessonService.getAllLessons();
      return response.lessons;
    },
  });
}

/**
 * Hook to fetch all lessons for admin (including unpublished)
 */
export function useAdminLessons() {
  return useQuery({
    queryKey: queryKeys.lessons.adminList(),
    queryFn: async () => {
      const response = await lessonService.getAllLessonsForAdmin();
      return response.lessons;
    },
  });
}

/**
 * Hook to fetch a single lesson by number
 */
export function useLessonByNumber(lessonNumber: number | string) {
  return useQuery({
    queryKey: queryKeys.lessons.detail(Number(lessonNumber)),
    queryFn: async () => {
      const response = await lessonService.getLessonByNumber(lessonNumber);
      return response.lesson;
    },
    enabled: !!lessonNumber,
  });
}

/**
 * Hook to fetch lesson content
 */
export function useLessonContent(lessonNumber: number | string) {
  return useQuery({
    queryKey: queryKeys.lessons.content(Number(lessonNumber)),
    queryFn: async () => {
      const response = await lessonService.getLessonContent(lessonNumber);
      return response.content;
    },
    enabled: !!lessonNumber,
  });
}

/**
 * Hook to update a lesson
 */
export function useUpdateLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      lessonNumber,
      data,
    }: {
      lessonNumber: number | string;
      data: { title: string; description: string; isPublished: boolean };
    }) => lessonService.updateLesson(lessonNumber, data),
    onSuccess: (_, variables) => {
      // Invalidate specific lesson and list
      queryClient.invalidateQueries({
        queryKey: queryKeys.lessons.detail(Number(variables.lessonNumber)),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.lessons.list() });
      queryClient.invalidateQueries({ queryKey: queryKeys.lessons.adminList() });
    },
  });
}

/**
 * Hook to publish a lesson
 */
export function usePublishLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (lessonNumber: number | string) =>
      lessonService.publishLesson(lessonNumber),
    onSuccess: (_, lessonNumber) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.lessons.detail(Number(lessonNumber)),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.lessons.list() });
      queryClient.invalidateQueries({ queryKey: queryKeys.lessons.adminList() });
    },
  });
}

/**
 * Hook to unpublish a lesson
 */
export function useUnpublishLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (lessonNumber: number | string) =>
      lessonService.unpublishLesson(lessonNumber),
    onSuccess: (_, lessonNumber) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.lessons.detail(Number(lessonNumber)),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.lessons.list() });
      queryClient.invalidateQueries({ queryKey: queryKeys.lessons.adminList() });
    },
  });
}
