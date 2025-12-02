export type ApiEnvelope<T> = {
  time: string;
  code: number;
  path: string;
  status: string;
  message: string;
  exception?: string | null;
  data: T;
};

export type UserRole = 'USER' | 'STUDENT' | 'ADMIN';

export type User = {
  id: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  mfa: boolean;
  imageUrl?: string | null;
  qrCodeImageUri?: string | null;
  lastLogin?: string | null;
  enabled?: boolean;
  accountNonLocked?: boolean;
};

export type LessonSummary = {
  id: number;
  lessonNumber: number;
  title: string;
  description: string;
  published: boolean;
};

export type LessonContent = {
  lesson: LessonSummary;
  flashcardDecks: Deck[];
  grammarTopic: unknown;
  readings: Reading[];
  ctests: CTest[];
};

export type Card = {
  id: string;
  front: string;
  back: string;
  correctCount: number;
  incorrectCount: number;
  lastReview?: string | null;
};

export type Deck = {
  id: string;
  name: string;
  description?: string | null;
  lessonId: number;
  created?: string | null;
  updated?: string | null;
  cards: Card[];
};

export type ReadingOption = {
  id: string;
  optionLetter: 'A' | 'B' | 'C' | 'D';
  optionText: string;
  isCorrect?: boolean; // Only present in admin view with answers
};

export type ReadingQuestion = {
  id: string;
  questionText: string;
  explanation?: string | null;
  options: ReadingOption[];
};

export type Reading = {
  id: string;
  title: string;
  text: string; // The reading passage
  lessonId: number;
  created?: string | null;
  updated?: string | null;
  questions: ReadingQuestion[];
};

export type QuestionResult = {
  questionId: string;
  questionText: string;
  selectedAnswer: 'A' | 'B' | 'C' | 'D';
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  isCorrect: boolean;
  explanation: string;
  options: ReadingOption[];
};

export type ReadingAttemptResult = {
  attemptId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  results: QuestionResult[];
  lessonNumber?: number;
};

export type ReadingAttempt = {
  id: string;
  readingId: string;
  userId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  attemptedAt: string;
};

export type CTest = {
  id: string;
  lessonId: number;
  title: string;
  description?: string | null;
  originalText: string;
  gapText: string;
  created?: string | null;
  updated?: string | null;
  creatorName?: string | null;
  lessonNumber?: number | null;
};

export type GrammarTopic = {
  id: number;
  topicKey: string;
  title: string;
  description: string;
  questionCount: number;
  lessonId: number;
  lessonNumber: number;
};

export type GrammarQuizOption = {
  optionLetter: 'A' | 'B' | 'C' | 'D';
  optionText: string;
  isCorrect?: boolean | null;
};

export type GrammarQuizQuestion = {
  id: number;
  questionId: string;
  questionText: string;
  explanation?: string | null;
  questionOrder?: number | null;
  options: GrammarQuizOption[];
};

export type GrammarQuestionResult = {
  questionId: string;
  questionText: string;
  userAnswer: 'A' | 'B' | 'C' | 'D' | null;
  correctAnswer: 'A' | 'B' | 'C' | 'D' | null;
  isCorrect: boolean;
  explanation?: string | null;
  options: GrammarQuizOption[];
};

export type GrammarSubmitResult = {
  score: number;
  totalQuestions: number;
  percentage: number;
  detailedResults: GrammarQuestionResult[];
  topicTitle: string;
};

export type GrammarAttempt = {
  id: number;
  attemptId: string;
  topicId: number;
  topicTitle: string;
  userId: number;
  score: number;
  totalQuestions: number;
  completedAt: string;
};

export type CTestGapResult = {
  index: number;
  userAnswer: string | null;
  correctAnswer: string | null;
  isCorrect: boolean;
  context: string;
};

export type CTestResult = {
  attemptId?: string;
  score: number;
  totalGaps: number;
  percentage: number;
  gaps: CTestGapResult[];
  lessonNumber?: number;
  title?: string;
};

// ===== PROGRESS TRACKING TYPES =====

export type SectionProgressDto = {
  sectionType: 'flashcards' | 'grammar' | 'reading' | 'ctest';
  isCompleted: boolean;
  bestScore: number; // 0-100
  successfulAttempts: number; // 0-3
  isLocked: boolean;
  attemptsRemaining: number; // 3 - successfulAttempts
};

export type LessonProgressDto = {
  lessonId: number;
  lessonNumber: number;
  lessonTitle: string;
  flashcards: SectionProgressDto;
  grammar: SectionProgressDto;
  reading: SectionProgressDto;
  ctest: SectionProgressDto;
  overallPercentage: number; // Average of all 4 sections
  isLessonCompleted: boolean; // All 4 sections completed
  isAccessible: boolean; // Lesson 1 or previous lesson completed
  lastActivity: string | null; // ISO date
  completedAt: string | null; // ISO date
};

export type CourseProgressDto = {
  userId: number;
  currentLessonNumber: number;
  lessonsCompleted: number;
  totalLessons: number; // Always 30
  overallPercentage: number; // Course-wide average
  isCourseCompleted: boolean;
  startedAt: string; // ISO date
  lastActivityAt: string; // ISO date
  completedAt: string | null; // ISO date
  lessonProgress: LessonProgressDto[];
};

export type FlashcardSessionResult = {
  sessionId: string;
  cardsReviewed: number;
  cardsCorrect: number;
  totalCards: number;
  percentage: number;
  deckName: string;
};

export type BulkUploadResultDto = {
  deckId: string;
  deckName: string;
  totalCardsUploaded: number;
  successfulInserts: number;
  failedInserts: number;
  errors: string[] | null;
  message: string;
};
