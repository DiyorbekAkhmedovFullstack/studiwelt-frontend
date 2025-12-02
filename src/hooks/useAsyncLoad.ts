import { useEffect, useState, useCallback, type DependencyList } from 'react';

interface UseAsyncLoadResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook for handling async data fetching with loading and error states
 *
 * @param fetchFn - Async function that fetches data
 * @param deps - Dependency array for re-fetching
 * @param options - Optional configuration
 * @returns Object with data, loading, error states and refetch function
 *
 * @example
 * ```tsx
 * const { data, loading, error } = useAsyncLoad(
 *   () => lessonService.getLessons(),
 *   []
 * );
 * ```
 */
export function useAsyncLoad<T>(
  fetchFn: () => Promise<T>,
  deps: DependencyList = [],
  options: {
    onSuccess?: (data: T) => void;
    onError?: (error: string) => void;
    initialData?: T;
  } = {}
): UseAsyncLoadResult<T> {
  const [data, setData] = useState<T | null>(options.initialData ?? null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    let active = true;
    setLoading(true);
    setError(null);

    try {
      const result = await fetchFn();
      if (active) {
        setData(result);
        setLoading(false);
        options.onSuccess?.(result);
      }
    } catch (err) {
      if (active) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to load data';
        setError(errorMessage);
        setLoading(false);
        options.onError?.(errorMessage);
      }
    }

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchFn, ...deps]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const refetch = useCallback(async () => {
    await loadData();
  }, [loadData]);

  return { data, loading, error, refetch };
}
