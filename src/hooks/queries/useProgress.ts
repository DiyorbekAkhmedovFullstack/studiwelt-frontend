import { useQuery, useQueryClient } from '@tanstack/react-query';
import { progressService } from '../../services/progressService';
import { queryKeys } from '../../lib/queryKeys';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Hook to fetch course progress
 * Only fetches when user is authenticated
 */
export function useCourseProgress() {
  const { user } = useAuth();

  return useQuery({
    queryKey: queryKeys.progress.course(),
    queryFn: progressService.getCourseProgress,
    enabled: !!user,
    staleTime: 2 * 60 * 1000, // 2 minutes - progress can change frequently
  });
}

/**
 * Hook to invalidate progress cache
 * Call this after submitting quiz answers, completing sessions, etc.
 */
export function useInvalidateProgress() {
  const queryClient = useQueryClient();

  return () => {
    return queryClient.invalidateQueries({ queryKey: queryKeys.progress.all });
  };
}

/**
 * Hook to prefetch progress data
 */
export function usePrefetchProgress() {
  const queryClient = useQueryClient();

  return () => {
    return queryClient.prefetchQuery({
      queryKey: queryKeys.progress.course(),
      queryFn: progressService.getCourseProgress,
    });
  };
}
