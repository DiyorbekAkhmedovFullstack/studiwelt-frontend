/**
 * Progress and scoring constants used throughout the application
 */

/**
 * Minimum score percentage required to complete a section
 */
export const SECTION_COMPLETION_THRESHOLD = 70;

/**
 * Maximum number of attempts allowed per section
 */
export const MAX_SECTION_ATTEMPTS = 3;

/**
 * Minimum passing score percentage for exercises
 */
export const MIN_PASSING_SCORE = 70;

/**
 * Score thresholds for different performance levels
 */
export const SCORE_THRESHOLDS = {
  EXCELLENT: 90,
  GOOD: 80,
  PASS: 70,
  FAIL: 0
} as const;

/**
 * Get performance level based on score
 */
export function getPerformanceLevel(score: number): 'excellent' | 'good' | 'pass' | 'fail' {
  if (score >= SCORE_THRESHOLDS.EXCELLENT) return 'excellent';
  if (score >= SCORE_THRESHOLDS.GOOD) return 'good';
  if (score >= SCORE_THRESHOLDS.PASS) return 'pass';
  return 'fail';
}

/**
 * Check if a score passes the section
 */
export function isPassingScore(score: number): boolean {
  return score >= MIN_PASSING_SCORE;
}
