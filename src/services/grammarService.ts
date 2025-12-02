import { API_BASE_URL } from './api';
import type {
  GrammarAttempt,
  GrammarQuizOption,
  GrammarQuizQuestion,
  GrammarSubmitResult,
  GrammarTopic,
} from '../types/api';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

type GrammarApiOptions = {
  method?: HttpMethod;
  body?: unknown;
};

async function grammarApiCall<TData>(
  endpoint: string,
  options: GrammarApiOptions = {},
): Promise<TData> {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    method: options.method ?? 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body:
      options.body === undefined
        ? undefined
        : typeof options.body === 'string'
          ? options.body
          : JSON.stringify(options.body),
  });

  let payload: unknown = null;

  try {
    payload = await response.json();
  } catch {
    if (!response.ok) {
      throw new Error('Grammar API request failed');
    }
  }

  if (!response.ok) {
    const message =
      payload &&
      typeof payload === 'object' &&
      'message' in payload &&
      typeof (payload as { message?: unknown }).message === 'string'
        ? (payload as { message: string }).message
        : `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  // Support both wrapped responses (`{ data: ... }`) and bare JSON bodies.
  const data =
    payload &&
    typeof payload === 'object' &&
    payload !== null &&
    'data' in payload
      ? (payload as { data: unknown }).data
      : payload;

  return (data as TData) ?? ({} as TData);
}

export type GrammarTopicsResponse = GrammarTopic[];

export type GrammarQuizQuestionsResponse = GrammarQuizQuestion[];

export type SubmitGrammarAnswersPayload = {
  topicKey: string;
  answers: Record<string, 'A' | 'B' | 'C' | 'D'>;
};

export type GrammarQuestionPayload = {
  questionText: string;
  explanation?: string;
  options: Array<
    Pick<GrammarQuizOption, 'optionLetter' | 'optionText'> & {
      isCorrect: boolean;
    }
  >;
};

export const grammarService = {
  getTopicsByLesson: (lessonId: number | string) =>
    grammarApiCall<GrammarTopicsResponse>(`/grammar/lessons/${lessonId}/topics`),

  getTopicByKey: (topicKey: string) =>
    grammarApiCall<GrammarTopic>(`/grammar/topics/${topicKey}`),

  getQuizQuestions: (topicKey: string) =>
    grammarApiCall<GrammarQuizQuestionsResponse>(`/grammar/topics/${topicKey}/quiz`),

  submitAnswers: (payload: SubmitGrammarAnswersPayload) =>
    grammarApiCall<GrammarSubmitResult>('/grammar/submit', {
      method: 'POST',
      body: payload,
    }),

  getAttemptsByTopic: (topicKey: string) =>
    grammarApiCall<GrammarAttempt[]>(`/grammar/topics/${topicKey}/attempts`),

  getMyAttempts: () => grammarApiCall<GrammarAttempt[]>('/grammar/my-attempts'),

  getQuestionsWithAnswers: (topicKey: string) =>
    grammarApiCall<GrammarQuizQuestionsResponse>(
      `/grammar/topics/${topicKey}/questions`,
    ),

  createQuestion: (topicKey: string, question: GrammarQuestionPayload) =>
    grammarApiCall<GrammarQuizQuestion>('/grammar/questions', {
      method: 'POST',
      body: {
        topicKey,
        questions: [
          {
            questionText: question.questionText,
            explanation: question.explanation ?? null,
            options: question.options.map((opt) => ({
              optionText: opt.optionText,
              optionLetter: opt.optionLetter,
              isCorrect: opt.isCorrect,
            })),
          },
        ],
      },
    }),

  updateQuestion: (questionId: string, question: GrammarQuestionPayload) =>
    grammarApiCall<GrammarQuizQuestion>(`/grammar/questions/${questionId}`, {
      method: 'PUT',
      body: {
        questionText: question.questionText,
        explanation: question.explanation ?? null,
        options: question.options.map((opt) => ({
          optionText: opt.optionText,
          optionLetter: opt.optionLetter,
          isCorrect: opt.isCorrect,
        })),
      },
    }),

  deleteQuestion: (questionId: string) =>
    grammarApiCall<void>(`/grammar/questions/${questionId}`, {
      method: 'DELETE',
    }),
};
