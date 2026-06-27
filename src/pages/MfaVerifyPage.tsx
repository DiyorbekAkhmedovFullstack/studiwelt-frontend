import { useState, useRef, useEffect, type FormEvent, type KeyboardEvent, type ClipboardEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { toastService } from '../services/toastService';

type LocationState = {
  email?: string;
  userId: string;
};

export function MfaVerifyPage() {
  const { t } = useTranslation('auth');
  const { completeMfa } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;

  const [digits, setDigits] = useState<string[]>(Array(6).fill(''));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const hasSubmittedRef = useRef(false);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const submitCode = async (digitsToSubmit: string[]) => {
    if (!state?.userId) {
      setError(t('mfa.missingDetails'));
      return;
    }

    if (hasSubmittedRef.current) return;
    hasSubmittedRef.current = true;
    setSubmitting(true);
    setError(null);

    const code = digitsToSubmit.join('');
    if (code.length !== 6 || digitsToSubmit.some((d) => d.trim() === '')) {
      setError(t('mfa.enterAllDigits'));
      setSubmitting(false);
      hasSubmittedRef.current = false;
      return;
    }

    try {
      const result = await completeMfa(state.userId, code);

      if (!result.success || !result.user) {
        setError(result.error ?? t('mfa.failed'));
        return;
      }

      // Navigate first, then show toast on the new page
      navigate('/course', { replace: true });

      // Show success toast after navigation
      setTimeout(() => {
        toastService.success(
          t('login.signedIn'),
          { duration: 3000 }
        );
      }, 100);
    } finally {
      setSubmitting(false);
      hasSubmittedRef.current = false;
    }
  };

  if (!state?.userId) {
    return <Navigate to="/login" replace />;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submitCode(digits);
  };

  const handleDigitChange = (index: number, value: string) => {
    // Only allow numbers
    const cleanValue = value.replace(/\D/g, '');

    setDigits((prev) => {
      const next = [...prev];
      next[index] = cleanValue.slice(-1); // Only take last character

      // Auto-focus next input
      if (cleanValue && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      // Auto-submit on last digit
      if (cleanValue && index === inputRefs.current.length - 1) {
        void submitCode(next);
      }

      return next;
    });
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);

    setDigits((prev) => {
      const next = [...prev];
      pasteData.split('').forEach((char, i) => {
        if (i < next.length) next[i] = char;
      });

      // Focus last filled or next empty
      const focusIndex = Math.min(pasteData.length, 5);
      inputRefs.current[focusIndex]?.focus();

      return next;
    });
  };

  const allDigitsFilled = digits.every((digit) => digit.length === 1);

  return (
    <div className="min-h-screen flex items-center justify-center bg-page px-4 relative overflow-hidden">
      {/* Background decoration circles */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[#EBE5DA] -top-[100px] -left-[100px] blur-[60px] opacity-60 -z-10"></div>
      <div className="absolute w-[300px] h-[300px] rounded-full bg-[#E3D4C5] -bottom-[50px] -right-[50px] blur-[60px] opacity-60 -z-10"></div>

      <div className="w-full max-w-[480px] bg-surface rounded-[24px] shadow-[0_10px_40px_rgba(62,54,48,0.08)] p-12 text-center">
        {/* Lock Icon */}
        <div className="w-16 h-16 bg-[#FAF6F3] text-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>

        <h1 className="text-[28px] font-serif font-bold mb-3 text-text-main">{t('mfa.title')}</h1>
        <p className="text-[16px] text-text-muted leading-relaxed mb-8">
          {t('mfa.description')}
        </p>

        {error && (
          <p className="mb-6 text-sm text-danger bg-[#FFF5F5] border border-[#FFDDDD] rounded-lg p-3" role="alert">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          {/* 6 Digit Inputs */}
          <div className="flex justify-center gap-2.5 mb-8">
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleDigitChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className={`w-[50px] h-16 border-2 rounded-xl bg-white text-center text-[28px] font-semibold text-text-main transition-all caret-primary focus:outline-none focus:border-primary focus:-translate-y-1 focus:shadow-[0_8px_20px_rgba(166,123,91,0.15)] ${error ? 'border-danger animate-shake' : 'border-[#E0E0E0]'
                  }`}
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            disabled={!allDigitsFilled || submitting}
            className={`w-full py-4 rounded-xl text-white font-semibold text-[16px] transition-all ${allDigitsFilled && !submitting
                ? 'bg-primary hover:bg-[#8E6A4F] hover:-translate-y-0.5 shadow-[0_4px_12px_rgba(166,123,91,0.3)]'
                : 'bg-text-main/30 cursor-not-allowed'
              }`}
          >
            {submitting ? t('mfa.submitting') : t('mfa.submit')}
          </button>
        </form>

        {/* Alternative Options */}
        <div className="mt-6 text-[14px] space-y-2">
          <p>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-text-muted hover:text-primary transition-colors border-b border-transparent hover:border-primary"
            >
              {t('mfa.backToLogin')}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
