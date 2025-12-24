import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { grammarService, type SubmitGrammarAnswersPayload } from '../../services/grammarService';
import { queryKeys } from '../../lib/queryKeys';

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
    queryKey: [...queryKeys.grammar.quiz(topicKey), 'withAnswers'] as const,
    queryFn: () => grammarService.getQuestionsWithAnswers(topicKey),
    enabled: !!topicKey,
  });
}
