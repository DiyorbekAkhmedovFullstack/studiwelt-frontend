import { act, renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { authService } from "../../services/authService";
import { toastService } from "../../services/toastService";
import type { User } from "../../types/api";
import { AuthProvider, useAuth } from "../AuthContext";

// Mock services
vi.mock("../../services/authService", () => ({
  authService: {
    getProfile: vi.fn(),
    login: vi.fn(),
    verifyMfa: vi.fn(),
    logout: vi.fn(),
  },
}));

vi.mock("../../services/toastService", () => ({
  toastService: {
    success: vi.fn(),
  },
}));

const mockUser: User = {
  id: "1",
  userId: "user-123",
  email: "test@example.com",
  firstName: "Test",
  lastName: "User",
  role: "USER",
  mfa: false,
  imageUrl: null,
  qrCodeImageUri: null,
  lastLogin: null,
  enabled: true,
  accountNonLocked: true,
};

const wrapper = ({ children }: { children: ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe("AuthContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("useAuth hook", () => {
    it("should throw error when used outside AuthProvider", () => {
      expect(() => {
        renderHook(() => useAuth());
      }).toThrow("useAuth must be used within an AuthProvider");
    });
  });

  describe("initial state and hydration", () => {
    it("should start with loading false and null user", async () => {
      vi.mocked(authService.getProfile).mockRejectedValue(
        new Error("Not authenticated"),
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      // Loading should become false quickly
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.user).toBeNull();
    });

    it("should hydrate user from profile on mount", async () => {
      vi.mocked(authService.getProfile).mockResolvedValue({ user: mockUser });

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isHydrated).toBe(true);
      });

      expect(result.current.user).toEqual(mockUser);
    });

    it("should set isHydrated even when profile fails", async () => {
      vi.mocked(authService.getProfile).mockRejectedValue(
        new Error("Not authenticated"),
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isHydrated).toBe(true);
      });

      expect(result.current.user).toBeNull();
    });
  });

  describe("login", () => {
    it("should login successfully without MFA", async () => {
      vi.mocked(authService.getProfile).mockRejectedValue(
        new Error("Not authenticated"),
      );
      vi.mocked(authService.login).mockResolvedValue({
        user: mockUser,
        requiresMfa: false,
      });

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      let loginResult: Awaited<ReturnType<typeof result.current.login>>;
      await act(async () => {
        loginResult = await result.current.login(
          "test@example.com",
          "password123",
        );
      });

      expect(loginResult!.success).toBe(true);
      expect(loginResult!.requiresMfa).toBe(false);
      expect(loginResult!.user).toEqual(mockUser);
      expect(result.current.user).toEqual(mockUser);
    });

    it("should handle login with MFA required", async () => {
      const mfaUser: User = { ...mockUser, mfa: true };
      vi.mocked(authService.getProfile).mockRejectedValue(
        new Error("Not authenticated"),
      );
      vi.mocked(authService.login).mockResolvedValue({
        user: mfaUser,
        requiresMfa: true,
      });

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      let loginResult: Awaited<ReturnType<typeof result.current.login>>;
      await act(async () => {
        loginResult = await result.current.login(
          "test@example.com",
          "password123",
        );
      });

      expect(loginResult!.success).toBe(true);
      expect(loginResult!.requiresMfa).toBe(true);
      // User should NOT be set when MFA is required
      expect(result.current.user).toBeNull();
    });

    it("should handle login error", async () => {
      vi.mocked(authService.getProfile).mockRejectedValue(
        new Error("Not authenticated"),
      );
      vi.mocked(authService.login).mockRejectedValue(
        new Error("Invalid credentials"),
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      let loginResult: Awaited<ReturnType<typeof result.current.login>>;
      await act(async () => {
        loginResult = await result.current.login("test@example.com", "wrong");
      });

      expect(loginResult!.success).toBe(false);
      expect(loginResult!.error).toBe("Invalid credentials");
      expect(result.current.error).toBe("Invalid credentials");
      expect(result.current.user).toBeNull();
    });
  });

  describe("completeMfa", () => {
    it("should complete MFA verification successfully", async () => {
      vi.mocked(authService.getProfile).mockRejectedValue(
        new Error("Not authenticated"),
      );
      vi.mocked(authService.verifyMfa).mockResolvedValue({ user: mockUser });

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      let mfaResult: Awaited<ReturnType<typeof result.current.completeMfa>>;
      await act(async () => {
        mfaResult = await result.current.completeMfa("user-id", "123456");
      });

      expect(mfaResult!.success).toBe(true);
      expect(mfaResult!.user).toEqual(mockUser);
      expect(result.current.user).toEqual(mockUser);
    });

    it("should handle MFA verification error", async () => {
      vi.mocked(authService.getProfile).mockRejectedValue(
        new Error("Not authenticated"),
      );
      vi.mocked(authService.verifyMfa).mockRejectedValue(
        new Error("Invalid code"),
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      let mfaResult: Awaited<ReturnType<typeof result.current.completeMfa>>;
      await act(async () => {
        mfaResult = await result.current.completeMfa("user-id", "wrong");
      });

      expect(mfaResult!.success).toBe(false);
      expect(mfaResult!.error).toBe("Invalid code");
      expect(result.current.error).toBe("Invalid code");
    });
  });

  describe("logout", () => {
    it("should logout successfully", async () => {
      vi.mocked(authService.getProfile).mockResolvedValue({ user: mockUser });
      vi.mocked(authService.logout).mockResolvedValue(undefined);

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.user).toEqual(mockUser);
      });

      await act(async () => {
        await result.current.logout();
      });

      expect(result.current.user).toBeNull();
      expect(toastService.success).toHaveBeenCalledWith(
        "Successfully logged out.",
      );
    });

    it("should clear user even if logout API fails", async () => {
      vi.mocked(authService.getProfile).mockResolvedValue({ user: mockUser });
      vi.mocked(authService.logout).mockRejectedValue(
        new Error("Network error"),
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.user).toEqual(mockUser);
      });

      await act(async () => {
        // Error propagates but finally block still clears user
        try {
          await result.current.logout();
        } catch {
          // Expected to throw
        }
      });

      // User should still be cleared even on error
      expect(result.current.user).toBeNull();
    });
  });

  describe("setUser", () => {
    it("should allow manually setting user", async () => {
      vi.mocked(authService.getProfile).mockRejectedValue(
        new Error("Not authenticated"),
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      act(() => {
        result.current.setUser(mockUser);
      });

      expect(result.current.user).toEqual(mockUser);
    });
  });
});
