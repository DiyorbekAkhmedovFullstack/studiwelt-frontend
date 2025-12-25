import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as AuthContext from "../../../contexts/AuthContext";
import { progressService } from "../../../services/progressService";
import type { CourseProgressDto } from "../../../types/api";
import {
  useCourseProgress,
  useInvalidateProgress,
  usePrefetchProgress,
} from "../../queries/useProgress";

// Mock the progress service
vi.mock("../../../services/progressService", () => ({
  progressService: {
    getCourseProgress: vi.fn(),
  },
}));

// Mock the auth context
vi.mock("../../../contexts/AuthContext", async () => {
  const actual = await vi.importActual("../../../contexts/AuthContext");
  return {
    ...actual,
    useAuth: vi.fn(),
  };
});

const mockCourseProgress: CourseProgressDto = {
  userId: 1,
  currentLessonNumber: 11,
  lessonsCompleted: 10,
  totalLessons: 30,
  overallPercentage: 33,
  isCourseCompleted: false,
  startedAt: "2024-01-01T00:00:00Z",
  lastActivityAt: "2024-01-15T12:00:00Z",
  completedAt: null,
  lessonProgress: [],
};

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });
}

function createWrapper(queryClient: QueryClient) {
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe("useProgress hooks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("useCourseProgress", () => {
    it("should fetch course progress when user is authenticated", async () => {
      vi.mocked(AuthContext.useAuth).mockReturnValue({
        user: { id: "1", email: "test@example.com" },
        isAuthenticated: true,
        isLoading: false,
        login: vi.fn(),
        register: vi.fn(),
        logout: vi.fn(),
      } as never);
      vi.mocked(progressService.getCourseProgress).mockResolvedValue(
        mockCourseProgress,
      );

      const queryClient = createTestQueryClient();
      const { result } = renderHook(() => useCourseProgress(), {
        wrapper: createWrapper(queryClient),
      });

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockCourseProgress);
      expect(progressService.getCourseProgress).toHaveBeenCalledTimes(1);
    });

    it("should not fetch when user is not authenticated", async () => {
      vi.mocked(AuthContext.useAuth).mockReturnValue({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        login: vi.fn(),
        register: vi.fn(),
        logout: vi.fn(),
      } as never);

      const queryClient = createTestQueryClient();
      const { result } = renderHook(() => useCourseProgress(), {
        wrapper: createWrapper(queryClient),
      });

      expect(result.current.fetchStatus).toBe("idle");
      expect(progressService.getCourseProgress).not.toHaveBeenCalled();
    });

    it("should handle fetch error", async () => {
      vi.mocked(AuthContext.useAuth).mockReturnValue({
        user: { id: "1", email: "test@example.com" },
        isAuthenticated: true,
        isLoading: false,
        login: vi.fn(),
        register: vi.fn(),
        logout: vi.fn(),
      } as never);
      const error = new Error("Failed to fetch progress");
      vi.mocked(progressService.getCourseProgress).mockRejectedValue(error);

      const queryClient = createTestQueryClient();
      const { result } = renderHook(() => useCourseProgress(), {
        wrapper: createWrapper(queryClient),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBe(error);
    });
  });

  describe("useInvalidateProgress", () => {
    it("should return a function that invalidates progress queries", async () => {
      const queryClient = createTestQueryClient();
      const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

      const { result } = renderHook(() => useInvalidateProgress(), {
        wrapper: createWrapper(queryClient),
      });

      expect(typeof result.current).toBe("function");

      result.current();

      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: ["progress"],
      });
    });
  });

  describe("usePrefetchProgress", () => {
    it("should return a function that prefetches progress data", async () => {
      vi.mocked(progressService.getCourseProgress).mockResolvedValue(
        mockCourseProgress,
      );

      const queryClient = createTestQueryClient();
      const prefetchSpy = vi.spyOn(queryClient, "prefetchQuery");

      const { result } = renderHook(() => usePrefetchProgress(), {
        wrapper: createWrapper(queryClient),
      });

      expect(typeof result.current).toBe("function");

      await result.current();

      expect(prefetchSpy).toHaveBeenCalledWith({
        queryKey: ["progress", "course"],
        queryFn: progressService.getCourseProgress,
      });
    });
  });
});
