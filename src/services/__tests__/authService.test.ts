import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authService } from '../authService';
import { api } from '../api';

// Mock the api module
vi.mock('../api', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
  },
}));

const mockUser = {
  id: 1,
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
  mfa: false,
};

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('register', () => {
    it('should call api.post with registration data', async () => {
      vi.mocked(api.post).mockResolvedValue({});

      await authService.register({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
      });

      expect(api.post).toHaveBeenCalledWith('/user/register', {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
      });
    });
  });

  describe('login', () => {
    it('should call api.post with login credentials', async () => {
      vi.mocked(api.post).mockResolvedValue({ user: mockUser });

      const result = await authService.login({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(api.post).toHaveBeenCalledWith(
        '/user/login',
        { email: 'test@example.com', password: 'password123' },
        expect.anything()
      );
      expect(result).toEqual({ user: mockUser });
    });
  });

  describe('verifyMfa', () => {
    it('should call api.post with MFA verification data', async () => {
      vi.mocked(api.post).mockResolvedValue({ user: mockUser });

      await authService.verifyMfa({
        userId: 'user-123',
        qrCode: '123456',
      });

      expect(api.post).toHaveBeenCalledWith(
        '/user/verify/qrcode',
        { userId: 'user-123', qrCode: '123456' },
        expect.anything()
      );
    });
  });

  describe('logout', () => {
    it('should call api.post to logout', async () => {
      vi.mocked(api.post).mockResolvedValue({});

      await authService.logout();

      expect(api.post).toHaveBeenCalledWith('/user/logout', {});
    });
  });

  describe('getProfile', () => {
    it('should call api.get to fetch user profile', async () => {
      vi.mocked(api.get).mockResolvedValue({ user: mockUser });

      const result = await authService.getProfile();

      expect(api.get).toHaveBeenCalledWith('/user/profile', expect.anything());
      expect(result).toEqual({ user: mockUser });
    });
  });

  describe('requestPasswordReset', () => {
    it('should call api.post with email for password reset', async () => {
      vi.mocked(api.post).mockResolvedValue({});

      await authService.requestPasswordReset('test@example.com');

      expect(api.post).toHaveBeenCalledWith('/user/resetpassword', {
        email: 'test@example.com',
      });
    });
  });

  describe('verifyPasswordKey', () => {
    it('should call api.get with encoded password key', async () => {
      vi.mocked(api.get).mockResolvedValue({ user: mockUser });

      await authService.verifyPasswordKey('reset-key-123');

      expect(api.get).toHaveBeenCalledWith(
        '/user/verify/password?key=reset-key-123',
        expect.anything()
      );
    });

    it('should encode special characters in key', async () => {
      vi.mocked(api.get).mockResolvedValue({ user: mockUser });

      await authService.verifyPasswordKey('key with spaces&special=chars');

      expect(api.get).toHaveBeenCalledWith(
        '/user/verify/password?key=key%20with%20spaces%26special%3Dchars',
        expect.anything()
      );
    });
  });

  describe('resetPassword', () => {
    it('should call api.post with reset password data', async () => {
      vi.mocked(api.post).mockResolvedValue({});

      await authService.resetPassword({
        userId: 'user-123',
        newPassword: 'newPassword123',
        confirmNewPassword: 'newPassword123',
      });

      expect(api.post).toHaveBeenCalledWith('/user/resetpassword/reset', {
        userId: 'user-123',
        newPassword: 'newPassword123',
        confirmNewPassword: 'newPassword123',
      });
    });
  });

  describe('setupMfa', () => {
    it('should call api.patch to setup MFA', async () => {
      vi.mocked(api.patch).mockResolvedValue({
        user: mockUser,
      });

      const result = await authService.setupMfa();

      expect(api.patch).toHaveBeenCalledWith(
        '/user/mfa/setup',
        {},
        expect.anything()
      );
      expect(result).toEqual({ user: mockUser });
    });
  });

  describe('enableMfa', () => {
    it('should call api.post with MFA enable data', async () => {
      vi.mocked(api.post).mockResolvedValue({ user: mockUser });

      await authService.enableMfa('123456', 'user-123');

      expect(api.post).toHaveBeenCalledWith(
        '/user/mfa/enable',
        { userId: 'user-123', qrCode: '123456' },
        expect.anything()
      );
    });
  });

  describe('cancelMfa', () => {
    it('should call api.patch to cancel MFA', async () => {
      vi.mocked(api.patch).mockResolvedValue({ user: mockUser });

      await authService.cancelMfa();

      expect(api.patch).toHaveBeenCalledWith(
        '/user/mfa/cancel',
        {},
        expect.anything()
      );
    });
  });
});
