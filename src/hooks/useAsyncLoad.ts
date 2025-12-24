import { useEffect, useState, useCallback, useRef, type DependencyList } from 'react';

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
  const activeRef = useRef(true);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchFn();
      if (activeRef.current) {
        setData(result);
        setLoading(false);
        optionsRef.current.onSuccess?.(result);
      }
    } catch (err) {
      if (activeRef.current) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to load data';
        setError(errorMessage);
        setLoading(false);
        optionsRef.current.onError?.(errorMessage);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchFn, ...deps]);

  useEffect(() => {
    activeRef.current = true;
    void loadData();

    return () => {
      activeRef.current = false;
    };
  }, [loadData]);

  const refetch = useCallback(async () => {
    await loadData();
  }, [loadData]);

  return { data, loading, error, refetch };
}
