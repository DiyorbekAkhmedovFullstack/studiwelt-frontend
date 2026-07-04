import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useTranslation } from "react-i18next";
import { authService } from "../services/authService";
import { toastService } from "../services/toastService";
import type { User } from "../types/api";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  isHydrated: boolean;
  error: string | null;
  login: (
    email: string,
    password: string,
  ) => Promise<{
    success: boolean;
    requiresMfa: boolean;
    user: User | null;
    error?: string;
  }>;
  completeMfa: (
    userId: string,
    qrCode: string,
  ) => Promise<{
    success: boolean;
    user: User | null;
    error?: string;
  }>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    let active = true;

    const hydrate = async () => {
      try {
        const data = await authService.getProfile();
        if (!active) return;
        setUser(data.user);
      } catch (err) {
        // Log auth errors for production troubleshooting
        if (import.meta.env.DEV) {
          console.error("[AuthContext] Hydration failed:", err);
        }
        if (!active) return;
        setUser(null);
      } finally {
        if (active) {
          setLoading(false);
          setIsHydrated(true);
        }
      }
    };

    const handleUnauthorized = () => {
      setUser(null);
    };

    hydrate();

    window.addEventListener('auth:unauthorized', handleUnauthorized);

    return () => {
      active = false;
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, []);

  const login: AuthContextValue["login"] = async (email, password) => {
    setError(null);
    try {
      const data = await authService.login({ email, password });
      const loginUser = data.user;
      const requiresMfa = data.requiresMfa ?? loginUser.mfa;

      if (!requiresMfa) {
        setUser(loginUser);
      }

      return {
        success: true,
        requiresMfa,
        user: loginUser,
      };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Login failed. Please try again.";
      setError(message);
      return {
        success: false,
        requiresMfa: false,
        user: null,
        error: message,
      };
    }
  };

  const completeMfa: AuthContextValue["completeMfa"] = async (
    userId,
    qrCode,
  ) => {
    setError(null);
    try {
      const data = await authService.verifyMfa({ userId, qrCode });
      setUser(data.user);

      return {
        success: true,
        user: data.user,
      };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "MFA verification failed.";
      setError(message);
      return {
        success: false,
        user: null,
        error: message,
      };
    }
  };

  const logout: AuthContextValue["logout"] = async () => {
    try {
      await authService.logout();
      toastService.success(t('toast.logoutSuccess'));
    } finally {
      // Always clear local state; cookies are removed by backend.
      setUser(null);
    }
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      isHydrated,
      error,
      login,
      completeMfa,
      logout,
      setUser,
    }),
    [user, loading, isHydrated, error],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
