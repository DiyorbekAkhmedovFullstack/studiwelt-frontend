import { describe, it, expect } from 'vitest';
import {
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  forgotPasswordSchema,
} from '../validations';

describe('Validation Schemas', () => {
  describe('loginSchema', () => {
    it('should validate correct login data', () => {
      const result = loginSchema.safeParse({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result.success).toBe(true);
    });

    it('should reject empty email', () => {
      const result = loginSchema.safeParse({
        email: '',
        password: 'password123',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Email is required');
      }
    });

    it('should reject invalid email format', () => {
      const result = loginSchema.safeParse({
        email: 'invalid-email',
        password: 'password123',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Please enter a valid email address');
      }
    });

    it('should reject empty password', () => {
      const result = loginSchema.safeParse({
        email: 'test@example.com',
        password: '',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Password is required');
      }
    });
  });

  describe('registerSchema', () => {
    const validData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'Password123',
    };

    it('should validate correct registration data', () => {
      const result = registerSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject empty first name', () => {
      const result = registerSchema.safeParse({ ...validData, firstName: '' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('First name is required');
      }
    });

    it('should reject first name over 50 characters', () => {
      const result = registerSchema.safeParse({
        ...validData,
        firstName: 'a'.repeat(51),
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('First name must be 50 characters or less');
      }
    });

    it('should reject password without uppercase', () => {
      const result = registerSchema.safeParse({
        ...validData,
        password: 'password123',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Password must contain at least one uppercase letter'
        );
      }
    });

    it('should reject password without lowercase', () => {
      const result = registerSchema.safeParse({
        ...validData,
        password: 'PASSWORD123',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Password must contain at least one lowercase letter'
        );
      }
    });

    it('should reject password without number', () => {
      const result = registerSchema.safeParse({
        ...validData,
        password: 'PasswordABC',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Password must contain at least one number'
        );
      }
    });

    it('should reject password under 8 characters', () => {
      const result = registerSchema.safeParse({
        ...validData,
        password: 'Pass1',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Password must be at least 8 characters'
        );
      }
    });
  });

  describe('resetPasswordSchema', () => {
    it('should validate matching passwords', () => {
      const result = resetPasswordSchema.safeParse({
        newPassword: 'NewPassword123',
        confirmNewPassword: 'NewPassword123',
      });
      expect(result.success).toBe(true);
    });

    it('should reject non-matching passwords', () => {
      const result = resetPasswordSchema.safeParse({
        newPassword: 'NewPassword123',
        confirmNewPassword: 'DifferentPassword123',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        const matchError = result.error.issues.find(
          (i) => i.path.includes('confirmNewPassword') && i.message === 'Passwords do not match'
        );
        expect(matchError).toBeDefined();
      }
    });

    it('should apply password complexity rules', () => {
      const result = resetPasswordSchema.safeParse({
        newPassword: 'weak',
        confirmNewPassword: 'weak',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('forgotPasswordSchema', () => {
    it('should validate correct email', () => {
      const result = forgotPasswordSchema.safeParse({
        email: 'test@example.com',
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty email', () => {
      const result = forgotPasswordSchema.safeParse({ email: '' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Email is required');
      }
    });

    it('should reject invalid email', () => {
      const result = forgotPasswordSchema.safeParse({ email: 'not-an-email' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Please enter a valid email address');
      }
    });
  });
});
