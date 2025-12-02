import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faLock,
  faLayerGroup,
  faSpellCheck,
  faBookOpen,
  faListCheck,
} from '@fortawesome/free-solid-svg-icons';
import type { LessonProgressDto } from '../../types/api';
import { ProgressBar } from './ProgressBar';

type LessonProgressCardProps = {
  lessonProgress: LessonProgressDto;
  className?: string;
};

export function LessonProgressCard({
  lessonProgress,
  className = '',
}: LessonProgressCardProps) {
  const allSectionsCompleted =
    lessonProgress.flashcards.isCompleted &&
    lessonProgress.grammar.isCompleted &&
    lessonProgress.reading.isCompleted &&
    lessonProgress.ctest.isCompleted;

  const anyLocked =
    lessonProgress.flashcards.isLocked ||
    lessonProgress.grammar.isLocked ||
    lessonProgress.reading.isLocked ||
    lessonProgress.ctest.isLocked;

  // Calculate progress: each section that has been completed at least once = 25%
  const progressPercentage = useMemo(() => {
    let completedCount = 0;
    if (lessonProgress.flashcards.isCompleted) completedCount++;
    if (lessonProgress.grammar.isCompleted) completedCount++;
    if (lessonProgress.reading.isCompleted) completedCount++;
    if (lessonProgress.ctest.isCompleted) completedCount++;
    return (completedCount / 4) * 100; // 0%, 25%, 50%, 75%, or 100%
  }, [lessonProgress]);

  return (
    <Link
      to={`/course/${lessonProgress.lessonNumber}`}
      className={`group block overflow-hidden rounded-xl border border-border-soft bg-surface p-5 shadow-sm transition hover:border-primary-hover hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-hover focus-visible:ring-offset-2 focus-visible:ring-offset-page ${className}`}
    >
      <div className="mb-3 flex items-start justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border-soft bg-highlight px-2.5 py-0.5 text-xs font-medium text-text-main">
            <span>Day {lessonProgress.lessonNumber}</span>
          </div>
          <h3 className="mt-2 text-base font-semibold text-text-main transition-colors group-hover:text-primary-hover">
            {lessonProgress.lessonTitle}
          </h3>
        </div>

        {allSectionsCompleted && (
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full border border-success/30 bg-success/10"
            aria-label="Lesson completed"
          >
            <FontAwesomeIcon
              icon={faCheck}
              className="h-3.5 w-3.5 text-success"
            />
          </div>
        )}

        {anyLocked && !allSectionsCompleted && (
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full border border-danger/30 bg-danger/10"
            aria-label="Some sections locked"
          >
            <FontAwesomeIcon icon={faLock} className="h-3.5 w-3.5 text-danger" />
          </div>
        )}
      </div>

      <ProgressBar
        percentage={progressPercentage}
        className="mb-3"
        size="sm"
        animated={false}
      />

      <div className="grid grid-cols-2 gap-2">
        {[
          { type: 'flashcards', data: lessonProgress.flashcards, icon: faLayerGroup },
          { type: 'grammar', data: lessonProgress.grammar, icon: faSpellCheck },
          { type: 'reading', data: lessonProgress.reading, icon: faBookOpen },
          { type: 'ctest', data: lessonProgress.ctest, icon: faListCheck },
        ].map(({ type, data, icon }) => (
          <div
            key={type}
            className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 text-xs font-medium transition ${data.isCompleted
                ? 'border-success/30 bg-success/10 text-success'
                : data.isLocked
                  ? 'border-danger/30 bg-danger/10 text-danger'
                  : data.successfulAttempts > 0
                    ? 'border-primary/30 bg-primary/10 text-primary-hover'
                    : 'border-border-soft bg-highlight text-text-muted'
              }`}
          >
            <FontAwesomeIcon
              icon={data.isLocked ? faLock : data.isCompleted ? faCheck : icon}
              className="h-3 w-3"
            />
            <div className="flex-1">
              <div className="truncate capitalize text-xs">{type}</div>
              {data.bestScore > 0 && (
                <div className="text-xs font-semibold">{data.bestScore.toFixed(0)}%</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {lessonProgress.lastActivity && (
        <div className="mt-3 flex items-center gap-1.5 rounded-lg border border-border-soft bg-highlight px-2.5 py-1.5">
          <div className="h-1 w-1 rounded-full bg-primary" />
          <p className="text-xs text-text-muted">
            Last activity: {new Date(lessonProgress.lastActivity).toLocaleDateString()}
          </p>
        </div>
      )}
    </Link>
  );
}
