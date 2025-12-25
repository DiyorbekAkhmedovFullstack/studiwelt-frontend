import type {
  GrammarAttempt,
  GrammarQuizOption,
  GrammarQuizQuestion,
  GrammarSubmitResult,
  GrammarTopic,
} from "../types/api";
import { api } from "./api";

// Wrappers for the new API response structure
type TopicsWrapper = { topics: GrammarTopic[] };
type TopicWrapper = { topic: GrammarTopic };
type QuestionsWrapper = { questions: GrammarQuizQuestion[] };
type QuestionWrapper = { question: GrammarQuizQuestion };
type AttemptsWrapper = { attempts: GrammarAttempt[] };

export type GrammarTopicsResponse = GrammarTopic[];

export type GrammarQuizQuestionsResponse = GrammarQuizQuestion[];

export type SubmitGrammarAnswersPayload = {
  topicKey: string;
  answers: Record<string, "A" | "B" | "C" | "D">;
};

export type GrammarQuestionPayload = {
  questionText: string;
  explanation?: string;
  options: Array<
    Pick<GrammarQuizOption, "optionLetter" | "optionText"> & {
      isCorrect: boolean;
    }
  >;
};

export const grammarService = {
  getTopicsByLesson: async (lessonId: number | string) => {
    const response = await api.get<TopicsWrapper>(
      `/grammar/lessons/${lessonId}/topics`,
    );
    return response.topics;
  },

  getTopicByKey: async (topicKey: string) => {
    const response = await api.get<TopicWrapper>(`/grammar/topics/${topicKey}`);
    return response.topic;
  },

  getQuizQuestions: async (topicKey: string) => {
    const response = await api.get<QuestionsWrapper>(
      `/grammar/topics/${topicKey}/quiz`,
    );
    return response.questions;
  },

  // Submit response is not wrapped in a key, it's the data map directly
  submitAnswers: (payload: SubmitGrammarAnswersPayload) =>
    api.post<GrammarSubmitResult>("/grammar/submit", payload),

  getAttemptsByTopic: async (topicKey: string) => {
    const response = await api.get<AttemptsWrapper>(
      `/grammar/topics/${topicKey}/attempts`,
    );
    return response.attempts;
  },

  getMyAttempts: async () => {
    const response = await api.get<AttemptsWrapper>("/grammar/my-attempts");
    return response.attempts;
  },

  getQuestionsWithAnswers: async (topicKey: string) => {
    const response = await api.get<QuestionsWrapper>(
      `/grammar/topics/${topicKey}/questions`,
    );
    return response.questions;
  },

  createQuestion: async (
    topicKey: string,
    question: GrammarQuestionPayload,
  ) => {
    const response = await api.post<QuestionWrapper>("/grammar/questions", {
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
    });
    return response.question;
  },

  updateQuestion: async (
    questionId: string,
    question: GrammarQuestionPayload,
  ) => {
    const response = await api.put<QuestionWrapper>(
      `/grammar/questions/${questionId}`,
      {
        questionText: question.questionText,
        explanation: question.explanation ?? null,
        options: question.options.map((opt) => ({
          optionText: opt.optionText,
          optionLetter: opt.optionLetter,
          isCorrect: opt.isCorrect,
        })),
      },
    );
    return response.question;
  },

  deleteQuestion: (questionId: string) =>
    api.delete<void>(`/grammar/questions/${questionId}`),
};
