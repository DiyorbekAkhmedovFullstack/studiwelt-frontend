import { describe, it, expect } from 'vitest';
import {
  UserSchema,
  LoginResponseSchema,
  LessonSummarySchema,
  CardSchema,
  DeckSchema,
  CTestSchema,
  PercentageSchema,
  ScoreSchema,
  OptionLetterSchema,
} from '../schemas';

describe('API Schemas', () => {
  describe('Common Schemas', () => {
    it('PercentageSchema should accept 0-100', () => {
      expect(PercentageSchema.safeParse(0).success).toBe(true);
      expect(PercentageSchema.safeParse(50).success).toBe(true);
      expect(PercentageSchema.safeParse(100).success).toBe(true);
    });

    it('PercentageSchema should reject out of range', () => {
      expect(PercentageSchema.safeParse(-1).success).toBe(false);
      expect(PercentageSchema.safeParse(101).success).toBe(false);
    });

    it('ScoreSchema should accept non-negative integers', () => {
      expect(ScoreSchema.safeParse(0).success).toBe(true);
      expect(ScoreSchema.safeParse(100).success).toBe(true);
    });

    it('ScoreSchema should reject negative numbers', () => {
      expect(ScoreSchema.safeParse(-1).success).toBe(false);
    });

    it('OptionLetterSchema should accept A, B, C, D', () => {
      expect(OptionLetterSchema.safeParse('A').success).toBe(true);
      expect(OptionLetterSchema.safeParse('B').success).toBe(true);
      expect(OptionLetterSchema.safeParse('C').success).toBe(true);
      expect(OptionLetterSchema.safeParse('D').success).toBe(true);
    });

    it('OptionLetterSchema should reject other letters', () => {
      expect(OptionLetterSchema.safeParse('E').success).toBe(false);
      expect(OptionLetterSchema.safeParse('a').success).toBe(false);
    });
  });

  describe('UserSchema', () => {
    const validUser = {
      id: '123',
      userId: 'user-123',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      role: 'USER',
      mfa: false,
    };

    it('should validate a complete user object', () => {
      const result = UserSchema.safeParse(validUser);
      expect(result.success).toBe(true);
    });

    it('should accept optional fields', () => {
      const result = UserSchema.safeParse({
        ...validUser,
        imageUrl: 'https://example.com/avatar.jpg',
        lastLogin: '2024-01-01T00:00:00Z',
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid role', () => {
      const result = UserSchema.safeParse({ ...validUser, role: 'SUPERADMIN' });
      expect(result.success).toBe(false);
    });

    it('should reject invalid email', () => {
      const result = UserSchema.safeParse({ ...validUser, email: 'invalid' });
      expect(result.success).toBe(false);
    });
  });

  describe('LoginResponseSchema', () => {
    it('should validate login response with user', () => {
      const result = LoginResponseSchema.safeParse({
        user: {
          id: '123',
          userId: 'user-123',
          email: 'test@example.com',
          firstName: 'John',
          lastName: 'Doe',
          role: 'USER',
          mfa: false,
        },
      });
      expect(result.success).toBe(true);
    });

    it('should accept requiresMfa flag', () => {
      const result = LoginResponseSchema.safeParse({
        user: {
          id: '123',
          userId: 'user-123',
          email: 'test@example.com',
          firstName: 'John',
          lastName: 'Doe',
          role: 'USER',
          mfa: true,
        },
        requiresMfa: true,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('LessonSummarySchema', () => {
    it('should validate lesson summary', () => {
      const result = LessonSummarySchema.safeParse({
        id: 1,
        lessonNumber: 5,
        title: 'German Basics',
        description: 'Learn the basics',
        published: true,
      });
      expect(result.success).toBe(true);
    });

    it('should reject lessonNumber outside 1-30 range', () => {
      const result = LessonSummarySchema.safeParse({
        id: 1,
        lessonNumber: 31,
        title: 'Test',
        description: 'Test',
        published: true,
      });
      expect(result.success).toBe(false);
    });
  });

  describe('CardSchema', () => {
    it('should validate a flashcard', () => {
      const result = CardSchema.safeParse({
        id: 'card-1',
        front: 'Hello',
        back: 'Hallo',
        correctCount: 5,
        incorrectCount: 2,
      });
      expect(result.success).toBe(true);
    });

    it('should accept optional lastReview', () => {
      const result = CardSchema.safeParse({
        id: 'card-1',
        front: 'Hello',
        back: 'Hallo',
        correctCount: 0,
        incorrectCount: 0,
        lastReview: '2024-01-01T00:00:00Z',
      });
      expect(result.success).toBe(true);
    });

    it('should reject negative counts', () => {
      const result = CardSchema.safeParse({
        id: 'card-1',
        front: 'Hello',
        back: 'Hallo',
        correctCount: -1,
        incorrectCount: 0,
      });
      expect(result.success).toBe(false);
    });
  });

  describe('DeckSchema', () => {
    it('should validate a deck with cards', () => {
      const result = DeckSchema.safeParse({
        id: 'deck-1',
        name: 'Vocabulary',
        lessonId: 1,
        cards: [
          { id: 'card-1', front: 'Hello', back: 'Hallo', correctCount: 0, incorrectCount: 0 },
        ],
      });
      expect(result.success).toBe(true);
    });

    it('should accept empty cards array', () => {
      const result = DeckSchema.safeParse({
        id: 'deck-1',
        name: 'Empty Deck',
        lessonId: 1,
        cards: [],
      });
      expect(result.success).toBe(true);
    });
  });

  describe('CTestSchema', () => {
    it('should validate a C-Test', () => {
      const result = CTestSchema.safeParse({
        id: 'ctest-1',
        lessonId: 1,
        title: 'Fill in the blanks',
        originalText: 'Das ist ein Test.',
        gapText: 'Das i__ ein Te__.',
      });
      expect(result.success).toBe(true);
    });

    it('should accept optional fields', () => {
      const result = CTestSchema.safeParse({
        id: 'ctest-1',
        lessonId: 1,
        title: 'Test',
        originalText: 'Original',
        gapText: 'Gap',
        description: 'A description',
        creatorName: 'Admin',
        lessonNumber: 5,
      });
      expect(result.success).toBe(true);
    });
  });
});
