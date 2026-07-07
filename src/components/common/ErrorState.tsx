import { useNavigate } from 'react-router-dom';
import { Icon, Ui } from '../../lib/icons';

type ErrorStateVariant = 'error' | 'locked' | 'info';

interface ErrorStateProps {
  /** Raw message (e.g. a backend error). Used as the body when `message` is not given. */
  error?: string;
  /** Explicit heading. Falls back to a friendly default per variant. */
  title?: string;
  /** Explicit body copy. Overrides `error`. */
  message?: string;
  /** Visual tone. When omitted it is inferred (a "locked" message renders the lock variant). */
  variant?: ErrorStateVariant;
  onBack?: () => void;
  backLabel?: string;
  backPath?: string;
}

const VARIANTS = {
  error: {
    Glyph: () => <Icon.Warning className="h-10 w-10 text-danger" stroke={2.5} />,
    ring: 'bg-danger/10',
    title: 'Etwas ist schiefgelaufen',
    message: 'Bitte versuche es erneut.',
  },
  locked: {
    Glyph: () => <Ui.Lock className="h-9 w-9 text-primary" />,
    ring: 'bg-primary/10',
    title: 'Diese Lektion ist noch gesperrt',
    message: 'Schließe zuerst die vorherigen Lektionen ab, um diese freizuschalten.',
  },
  info: {
    Glyph: () => <Icon.Info className="h-10 w-10 text-primary" />,
    ring: 'bg-primary/10',
    title: 'Noch nichts hier',
    message: 'Für diesen Bereich gibt es aktuell keine Inhalte.',
  },
} as const;

export function ErrorState({
  error,
  title,
  message,
  variant,
  onBack,
  backLabel = 'Zurück',
  backPath,
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

  const isLocked = !!error && /locked|gesperrt/i.test(error);
  const resolved = variant ?? (isLocked ? 'locked' : 'error');
  const { Glyph, ring, title: defaultTitle, message: defaultMessage } = VARIANTS[resolved];

  // For a genuine error we still surface the backend text; for locked/info we
  // prefer the friendly copy over a raw message.
  const body =
    message ?? (resolved === 'error' ? error ?? defaultMessage : defaultMessage);

  return (
    <div className="min-h-screen flex items-center justify-center bg-page p-4 relative overflow-hidden">
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[#EBE5DA] -top-[100px] -left-[100px] blur-[60px] opacity-60 -z-10"></div>
      <div className="absolute w-[300px] h-[300px] rounded-full bg-[#E3D4C5] -bottom-[50px] -right-[50px] blur-[60px] opacity-60 -z-10"></div>

      <div className="w-full max-w-[520px] bg-surface rounded-[24px] shadow-[0_10px_40px_rgba(62,54,48,0.08)] p-8 sm:p-12 text-center">
        <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${ring}`}>
          <Glyph />
        </div>

        <h1 className="mb-4 text-[28px] font-serif font-bold text-text-main">
          {title ?? defaultTitle}
        </h1>

        <p className="mb-8 text-[16px] text-text-muted leading-relaxed max-w-[400px] mx-auto" role="alert">
          {body}
        </p>

        <button
          onClick={handleBack}
          className="w-full px-4 py-4 bg-primary text-white rounded-lg text-base font-semibold cursor-pointer transition-all shadow-[0_4px_12px_rgba(166,123,91,0.3)] hover:bg-primary-hover hover:-translate-y-0.5"
        >
          {backLabel}
        </button>
      </div>
    </div>
  );
}
