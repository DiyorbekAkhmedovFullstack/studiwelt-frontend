import { useNavigate } from 'react-router-dom';
import { Ui } from '../../lib/icons';

interface SectionCompletedStateProps {
  title?: string;
  message?: string;
  onBack?: () => void;
  backLabel?: string;
  backPath?: string;
  score?: number;
}

export function SectionCompletedState({
  title = 'Successfully Completed',
  message = 'You have already completed this section.',
  onBack,
  backLabel = 'Back to Lesson',
  backPath,
  score
}: SectionCompletedStateProps) {
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
      <div
        className="bg-surface rounded-2xl shadow-lg border-2 border-border p-8 text-center"
        style={{ width: '100%', maxWidth: '28rem', minWidth: '320px' }}
      >
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-primary-light rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(166,123,91,0.15)]">
            <Ui.Check className="w-10 h-10 text-success" stroke={3} />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-serif font-bold text-text-main mb-3">
          {title}
        </h2>

        {/* Message */}
        <p className="text-base text-text-muted mb-8 leading-relaxed">
          {message}
        </p>

        {/* Score (optional) */}
        {score !== undefined && (
          <div className="mb-6 text-3xl font-bold text-success">
            {score}%
          </div>
        )}

        {/* Button */}
        <button
          type="button"
          onClick={handleBack}
          className="w-full px-6 py-3.5 bg-primary text-white rounded-xl text-base font-semibold transition-all shadow-md hover:bg-primary-hover hover:-translate-y-0.5"
        >
          {backLabel}
        </button>
      </div>
    </div>
  );
}
