import { describe, it, expect } from 'vitest';
import { queryKeys } from '../queryKeys';

describe('queryKeys', () => {
  describe('progress', () => {
    it('should have correct base key', () => {
      expect(queryKeys.progress.all).toEqual(['progress']);
    });

    it('should generate course key', () => {
      expect(queryKeys.progress.course()).toEqual(['progress', 'course']);
    });
  });

  describe('lessons', () => {
    it('should have correct base key', () => {
      expect(queryKeys.lessons.all).toEqual(['lessons']);
    });

    it('should generate list key', () => {
      expect(queryKeys.lessons.list()).toEqual(['lessons', 'list']);
    });

    it('should generate admin list key', () => {
      expect(queryKeys.lessons.adminList()).toEqual(['lessons', 'admin', 'list']);
    });

    it('should generate detail key with lesson number', () => {
      expect(queryKeys.lessons.detail(5)).toEqual(['lessons', 'detail', 5]);
      expect(queryKeys.lessons.detail(1)).toEqual(['lessons', 'detail', 1]);
    });

    it('should generate content key with lesson number', () => {
      expect(queryKeys.lessons.content(10)).toEqual(['lessons', 'content', 10]);
    });
  });

  describe('grammar', () => {
    it('should have correct base key', () => {
      expect(queryKeys.grammar.all).toEqual(['grammar']);
    });

    it('should generate topics key with lessonId', () => {
      expect(queryKeys.grammar.topics(1)).toEqual(['grammar', 'topics', 1]);
    });

    it('should generate quiz key with topicKey', () => {
      expect(queryKeys.grammar.quiz('passive-voice')).toEqual(['grammar', 'quiz', 'passive-voice']);
    });

    it('should generate attempts key with topicKey', () => {
      expect(queryKeys.grammar.attempts('passive-voice')).toEqual(['grammar', 'attempts', 'passive-voice']);
    });
  });

  describe('ctests', () => {
    it('should have correct base key', () => {
      expect(queryKeys.ctests.all).toEqual(['ctests']);
    });

    it('should generate byLesson key with lessonId', () => {
      expect(queryKeys.ctests.byLesson(3)).toEqual(['ctests', 'lesson', 3]);
    });

    it('should generate detail key with testId', () => {
      expect(queryKeys.ctests.detail(42)).toEqual(['ctests', 'detail', 42]);
    });
  });

  describe('readings', () => {
    it('should have correct base key', () => {
      expect(queryKeys.readings.all).toEqual(['readings']);
    });

    it('should generate list key without lessonId', () => {
      expect(queryKeys.readings.list()).toEqual(['readings', 'list']);
    });

    it('should generate list key with lessonId', () => {
      expect(queryKeys.readings.list(5)).toEqual(['readings', 'list', 5]);
    });

    it('should generate forTaking key with readingId', () => {
      expect(queryKeys.readings.forTaking(10)).toEqual(['readings', 'take', 10]);
    });

    it('should generate detail key with readingId', () => {
      expect(queryKeys.readings.detail(7)).toEqual(['readings', 'detail', 7]);
    });

    it('should generate attempts key with readingId', () => {
      expect(queryKeys.readings.attempts(3)).toEqual(['readings', 'attempts', 3]);
    });
  });

  describe('decks', () => {
    it('should have correct base key', () => {
      expect(queryKeys.decks.all).toEqual(['decks']);
    });

    it('should generate byLesson key with lessonId', () => {
      expect(queryKeys.decks.byLesson(2)).toEqual(['decks', 'lesson', 2]);
    });
  });

  describe('payments', () => {
    it('should have correct base key', () => {
      expect(queryKeys.payments.all).toEqual(['payments']);
    });

    it('should generate myPayments key', () => {
      expect(queryKeys.payments.myPayments()).toEqual(['payments', 'my']);
    });

    it('should generate hasAccess key', () => {
      expect(queryKeys.payments.hasAccess()).toEqual(['payments', 'hasAccess']);
    });
  });

  describe('user', () => {
    it('should have correct base key', () => {
      expect(queryKeys.user.all).toEqual(['user']);
    });

    it('should generate profile key', () => {
      expect(queryKeys.user.profile()).toEqual(['user', 'profile']);
    });
  });

  describe('key uniqueness', () => {
    it('should generate unique keys for different parameters', () => {
      const key1 = queryKeys.lessons.detail(1);
      const key2 = queryKeys.lessons.detail(2);

      expect(key1).not.toEqual(key2);
    });

    it('should generate consistent keys for same parameters', () => {
      const key1 = queryKeys.grammar.quiz('topic-a');
      const key2 = queryKeys.grammar.quiz('topic-a');

      expect(key1).toEqual(key2);
    });
  });
});
