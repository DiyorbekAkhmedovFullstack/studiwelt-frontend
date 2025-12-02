import { useNavigate } from 'react-router-dom';

interface ErrorStateProps {
  error: string;
  onBack?: () => void;
  backLabel?: string;
  backPath?: string;
}

export function ErrorState({
  error,
  onBack,
  backLabel = 'Go Back',
  backPath
}: ErrorStateProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (backPath) {
      navigate(backPath);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-page p-4">
      <div className="w-full max-w-md rounded-xl bg-surface p-6 shadow-lg border border-border-soft">
        <div className="mb-4 flex items-start gap-3">
          <div className="flex-shrink-0">
            <svg
              className="h-6 w-6 text-danger"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-text-main mb-1">Error</h3>
            <p className="text-sm text-danger" role="alert">
              {error}
            </p>
          </div>
        </div>
        <button
          onClick={handleBack}
          className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
        >
          {backLabel}
        </button>
      </div>
    </div>
  );
}
