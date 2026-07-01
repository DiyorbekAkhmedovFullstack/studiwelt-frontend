import {
  LoginResponseSchema,
  MfaSetupResponseSchema,
  UserResponseSchema,
} from "../lib/schemas";
import type { User } from "../types/api";
import { api } from "./api";

type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

type VerifyMfaPayload = {
  userId: string;
  qrCode: string;
};

type ResetPasswordPayload = {
  userId: string;
  newPassword: string;
  confirmNewPassword: string;
};

type MfaSetupResponse = {
  user: User;
};

export const authService = {
  register: (payload: RegisterPayload) =>
    api.post<unknown>("/user/register", payload),

  verifyAccount: async (key: string) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8085";
    const response = await fetch(
      `${baseUrl}/user/verify/account?key=${encodeURIComponent(key)}`,
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      },
    );

    const envelope = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(envelope?.message || "Verification failed");
    }

    return {
      user: envelope.data.user,
      message: envelope.message,
    };
  },

  verifyAccountWithCode: (email: string, code: string) =>
    api.post<{ user: User }>(
      "/user/verify/account/code",
      { email, code },
      UserResponseSchema,
    ),

  resendVerificationCode: (email: string) =>
    api.post<unknown>("/user/verify/account/resend", { email }),

  login: (payload: LoginPayload) =>
    api.post<{ user: User; requiresMfa?: boolean }>(
      "/user/login",
      payload,
      LoginResponseSchema,
    ),

  verifyMfa: (payload: VerifyMfaPayload) =>
    api.post<{ user: User }>(
      "/user/verify/qrcode",
      payload,
      UserResponseSchema,
    ),

  logout: () => api.post<unknown>("/user/logout", {}),

  getProfile: () =>
    api.get<{ user: User }>("/user/profile", UserResponseSchema),

  requestPasswordReset: (email: string) =>
    api.post<unknown>("/user/resetpassword", { email }),

  verifyPasswordKey: (key: string) =>
    api.get<{ user: User }>(
      "/user/verify/password?key=" + encodeURIComponent(key),
      UserResponseSchema,
    ),

  resetPassword: (payload: ResetPasswordPayload) =>
    api.post<unknown>("/user/resetpassword/reset", payload),

  setupMfa: () =>
    api.patch<MfaSetupResponse>("/user/mfa/setup", {}, MfaSetupResponseSchema),

  enableMfa: (qrCode: string, userId: string) =>
    api.post<{ user: User }>(
      "/user/mfa/enable",
      { userId, qrCode },
      UserResponseSchema,
    ),

  cancelMfa: () =>
    api.patch<{ user: User }>("/user/mfa/cancel", {}, UserResponseSchema),
};
