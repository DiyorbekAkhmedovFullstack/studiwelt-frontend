import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useCallback } from "react";
import { queryKeys } from "../../lib/queryKeys";
import {
  grammarService,
  type SubmitGrammarAnswersPayload,
} from "../../services/grammarService";

/**
 * Hook to fetch grammar topics for a lesson
 */
export function useGrammarTopics(lessonId: number | string) {
  return useQuery({
    queryKey: queryKeys.grammar.topics(Number(lessonId)),
    queryFn: () => grammarService.getTopicsByLesson(lessonId),
    enabled: !!lessonId,
  });
}

/**
 * Hook to fetch grammar quiz questions
 */
export function useGrammarQuiz(topicKey: string) {
  return useQuery({
    queryKey: queryKeys.grammar.quiz(topicKey),
    queryFn: () => grammarService.getQuizQuestions(topicKey),
    enabled: !!topicKey,
  });
}

/**
 * Hook to fetch grammar attempts for a topic
 */
export function useGrammarAttempts(topicKey: string) {
  return useQuery({
    queryKey: queryKeys.grammar.attempts(topicKey),
    queryFn: () => grammarService.getAttemptsByTopic(topicKey),
    enabled: !!topicKey,
  });
}

/**
 * Hook to submit grammar quiz answers
 */
export function useSubmitGrammarAnswers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SubmitGrammarAnswersPayload) =>
      grammarService.submitAnswers(payload),
    onSuccess: (_, variables) => {
      // Invalidate progress after submission
      queryClient.invalidateQueries({ queryKey: queryKeys.progress.all });
      // Invalidate attempts for this topic
      queryClient.invalidateQueries({
        queryKey: queryKeys.grammar.attempts(variables.topicKey),
      });
    },
  });
}

/**
 * Hook to get questions with answers (for admin)
 */
export function useGrammarQuestionsWithAnswers(topicKey: string) {
  return useQuery({
    queryKey: [...queryKeys.grammar.quiz(topicKey), "withAnswers"] as const,
    queryFn: () => grammarService.getQuestionsWithAnswers(topicKey),
    enabled: !!topicKey,
  });
}

/**
 * Hook to prefetch grammar data for a lesson
 * Call this on hover/focus of grammar link to start loading early
 */
export function usePrefetchGrammar() {
  const queryClient = useQueryClient();

  const prefetchGrammarForLesson = useCallback(
    async (lessonId: number) => {
      if (!lessonId) return;

      // Prefetch topics first
      const topics = await queryClient.fetchQuery({
        queryKey: queryKeys.grammar.topics(lessonId),
        queryFn: () => grammarService.getTopicsByLesson(lessonId),
        staleTime: 5 * 60 * 1000, // 5 minutes
      });

      // If we got topics, prefetch the quiz for the first topic
      if (topics && topics.length > 0) {
        const topicKey = topics[0].topicKey;
        queryClient.prefetchQuery({
          queryKey: queryKeys.grammar.quiz(topicKey),
          queryFn: () => grammarService.getQuizQuestions(topicKey),
          staleTime: 5 * 60 * 1000,
        });
      }
    },
    [queryClient],
  );

  return { prefetchGrammarForLesson };
}

/**
 * Hook to fetch both topics and quiz in parallel when we know the lesson
 * This reduces the waterfall by fetching everything we need upfront
 */
export function useGrammarData(
  lessonId: number,
  topicKey: string,
  isLocked: boolean,
) {
  const results = useQueries({
    queries: [
      {
        queryKey: queryKeys.grammar.topics(lessonId),
        queryFn: () => grammarService.getTopicsByLesson(lessonId),
        enabled: !!lessonId,
        staleTime: 5 * 60 * 1000,
      },
      {
        queryKey: queryKeys.grammar.quiz(topicKey),
        queryFn: () => grammarService.getQuizQuestions(topicKey),
        enabled: !!topicKey && !isLocked,
        staleTime: 5 * 60 * 1000,
      },
    ],
  });

  const [topicsQuery, quizQuery] = results;

  return {
    topics: topicsQuery.data ?? [],
    questions: quizQuery.data ?? [],
    isLoading: topicsQuery.isLoading || quizQuery.isLoading,
    isTopicsLoading: topicsQuery.isLoading,
    isQuizLoading: quizQuery.isLoading,
    error: topicsQuery.error || quizQuery.error,
  };
}
