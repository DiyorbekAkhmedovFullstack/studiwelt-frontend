import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLock,
  faCheck,
  faCircle,
} from '@fortawesome/free-solid-svg-icons';
import type { SectionProgressDto } from '../../types/api';

type SectionProgressBadgeProps = {
  progress: SectionProgressDto;
  size?: 'sm' | 'md' | 'lg';
  showAttempts?: boolean;
  className?: string;
};

export function SectionProgressBadge({
  progress,
  size = 'md',
  showAttempts = true,
  className = '',
}: SectionProgressBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5',
    lg: 'px-3 py-1.5 text-sm gap-2',
  };

  const iconSizeClasses = {
    sm: 'h-2.5 w-2.5',
    md: 'h-3 w-3',
    lg: 'h-3.5 w-3.5',
  };

  // Locked state (maximum attempts reached)
  if (progress.isLocked) {
    return (
      <div
        className={`inline-flex items-center rounded-full border border-danger/30 bg-danger/10 font-medium text-danger ${sizeClasses[size]} ${className}`}
        role="status"
        aria-label="Section locked"
      >
        <FontAwesomeIcon icon={faLock} className={iconSizeClasses[size]} />
        <span>Locked</span>
      </div>
    );
  }

  // Completed state
  if (progress.isCompleted) {
    return (
      <div
        className={`inline-flex items-center rounded-full border border-success/30 bg-success/10 font-medium text-success ${sizeClasses[size]} ${className}`}
        role="status"
        aria-label={`Completed with ${progress.bestScore}%`}
      >
        <FontAwesomeIcon icon={faCheck} className={iconSizeClasses[size]} />
        <span className="font-semibold">
          {progress.bestScore.toFixed(0)}%
        </span>
        {showAttempts && (
          <span className="opacity-70">
            ({progress.successfulAttempts}/3)
          </span>
        )}
      </div>
    );
  }

  // In progress state
  if (progress.successfulAttempts > 0) {
    return (
      <div
        className={`inline-flex items-center rounded-full border border-primary/30 bg-primary/10 font-medium text-primary-hover ${sizeClasses[size]} ${className}`}
        role="status"
        aria-label={`In progress: ${progress.bestScore}%`}
      >
        <span className="font-semibold">{progress.bestScore.toFixed(0)}%</span>
        {showAttempts && (
          <span className="opacity-70">
            {progress.attemptsRemaining} left
          </span>
        )}
      </div>
    );
  }

  // Not started state
  return (
    <div
      className={`inline-flex items-center rounded-full border border-border-soft bg-highlight font-medium text-text-muted ${sizeClasses[size]} ${className}`}
      role="status"
      aria-label="Not started"
    >
      <FontAwesomeIcon icon={faCircle} className="h-1.5 w-1.5" />
      <span>Start</span>
      {showAttempts && <span className="opacity-60">(3 tries)</span>}
    </div>
  );
}
