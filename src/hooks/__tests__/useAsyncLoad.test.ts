import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useAsyncLoad } from '../useAsyncLoad';

describe('useAsyncLoad', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should start with loading state', () => {
    const fetchFn = vi.fn(() => new Promise(() => {}));
    const { result } = renderHook(() => useAsyncLoad(fetchFn));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
  });

  it('should load data successfully', async () => {
    const mockData = { id: 1, name: 'Test' };
    const fetchFn = vi.fn(() => Promise.resolve(mockData));

    const { result } = renderHook(() => useAsyncLoad(fetchFn));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
    expect(fetchFn).toHaveBeenCalledTimes(1);
  });

  it('should handle errors', async () => {
    const errorMessage = 'Fetch failed';
    const fetchFn = vi.fn(() => Promise.reject(new Error(errorMessage)));

    const { result } = renderHook(() => useAsyncLoad(fetchFn));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(errorMessage);
  });

  it('should call onSuccess callback', async () => {
    const mockData = { id: 1 };
    const fetchFn = vi.fn(() => Promise.resolve(mockData));
    const onSuccess = vi.fn();

    const { result } = renderHook(() =>
      useAsyncLoad(fetchFn, [], { onSuccess })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(onSuccess).toHaveBeenCalledWith(mockData);
  });

  it('should call onError callback', async () => {
    const errorMessage = 'Fetch failed';
    const fetchFn = vi.fn(() => Promise.reject(new Error(errorMessage)));
    const onError = vi.fn();

    const { result } = renderHook(() =>
      useAsyncLoad(fetchFn, [], { onError })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(onError).toHaveBeenCalledWith(errorMessage);
  });

  it('should refetch data when refetch is called', async () => {
    let callCount = 0;
    const fetchFn = vi.fn(() => Promise.resolve({ count: ++callCount }));

    const { result } = renderHook(() => useAsyncLoad(fetchFn));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual({ count: 1 });

    await act(async () => {
      await result.current.refetch();
    });

    expect(result.current.data).toEqual({ count: 2 });
    expect(fetchFn).toHaveBeenCalledTimes(2);
  });

  it('should use initial data when provided', () => {
    const initialData = { initial: true };
    const fetchFn = vi.fn(() => new Promise(() => {}));

    const { result } = renderHook(() =>
      useAsyncLoad(fetchFn, [], { initialData })
    );

    expect(result.current.data).toEqual(initialData);
  });

  it('should not update state after unmount', async () => {
    let resolvePromise: (value: unknown) => void;
    const fetchFn = vi.fn(
      () => new Promise((resolve) => { resolvePromise = resolve; })
    );

    const { result, unmount } = renderHook(() => useAsyncLoad(fetchFn));

    expect(result.current.loading).toBe(true);

    unmount();

    // Resolve after unmount
    resolvePromise!({ data: 'test' });

    // Should not throw or cause issues
    await new Promise((r) => setTimeout(r, 10));
  });
});
