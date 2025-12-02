type ProgressBarProps = {
  percentage: number; // 0-100
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animated?: boolean;
};

export function ProgressBar({
  percentage,
  label,
  showPercentage = true,
  size = 'md',
  className = '',
  animated = false,
}: ProgressBarProps) {
  const clampedPercentage = Math.min(100, Math.max(0, percentage));

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between">
          {label && (
            <span className="text-xs font-medium text-text-muted">{label}</span>
          )}
          {showPercentage && (
            <span className="text-xs font-semibold tabular-nums text-text-main">
              {clampedPercentage.toFixed(0)}%
            </span>
          )}
        </div>
      )}
      <div className="relative">
        <div
          className={`w-full overflow-hidden rounded-full bg-highlight ${heightClasses[size]}`}
        >
          <div
            className={`h-full rounded-full bg-primary transition-all duration-500 ease-out ${animated ? 'transition-all' : ''}`}
            style={{ width: `${clampedPercentage}%` }}
            role="progressbar"
            aria-valuenow={clampedPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={label || `Progress: ${clampedPercentage}%`}
          />
        </div>
      </div>
    </div>
  );
}
