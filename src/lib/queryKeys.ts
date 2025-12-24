// Centralized query key factory for type-safe cache management
export const queryKeys = {
  // Progress
  progress: {
    all: ['progress'] as const,
    course: () => [...queryKeys.progress.all, 'course'] as const,
  },

  // Lessons
  lessons: {
    all: ['lessons'] as const,
    list: () => [...queryKeys.lessons.all, 'list'] as const,
    adminList: () => [...queryKeys.lessons.all, 'admin', 'list'] as const,
    detail: (lessonNumber: number) => [...queryKeys.lessons.all, 'detail', lessonNumber] as const,
    content: (lessonNumber: number) => [...queryKeys.lessons.all, 'content', lessonNumber] as const,
  },

  // Grammar
  grammar: {
    all: ['grammar'] as const,
    topics: (lessonId: number) => [...queryKeys.grammar.all, 'topics', lessonId] as const,
    quiz: (topicKey: string) => [...queryKeys.grammar.all, 'quiz', topicKey] as const,
    attempts: (topicKey: string) => [...queryKeys.grammar.all, 'attempts', topicKey] as const,
  },

  // CTests
  ctests: {
    all: ['ctests'] as const,
    byLesson: (lessonId: number) => [...queryKeys.ctests.all, 'lesson', lessonId] as const,
    detail: (testId: number) => [...queryKeys.ctests.all, 'detail', testId] as const,
  },

  // Readings
  readings: {
    all: ['readings'] as const,
    list: (lessonId?: number) => lessonId
      ? [...queryKeys.readings.all, 'list', lessonId] as const
      : [...queryKeys.readings.all, 'list'] as const,
    forTaking: (readingId: number) => [...queryKeys.readings.all, 'take', readingId] as const,
    detail: (readingId: number) => [...queryKeys.readings.all, 'detail', readingId] as const,
    attempts: (readingId: number) => [...queryKeys.readings.all, 'attempts', readingId] as const,
  },

  // Decks (Flashcards)
  decks: {
    all: ['decks'] as const,
    byLesson: (lessonId: number) => [...queryKeys.decks.all, 'lesson', lessonId] as const,
  },

  // Payments
  payments: {
    all: ['payments'] as const,
    myPayments: () => [...queryKeys.payments.all, 'my'] as const,
    hasAccess: () => [...queryKeys.payments.all, 'hasAccess'] as const,
  },

  // User/Auth
  user: {
    all: ['user'] as const,
    profile: () => [...queryKeys.user.all, 'profile'] as const,
  },
};
