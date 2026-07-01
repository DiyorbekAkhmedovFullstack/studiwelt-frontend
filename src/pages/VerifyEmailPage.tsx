import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { authService } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';
import { toastService } from '../services/toastService';
import { OtpInput } from '../components/common/OtpInput';
import { Ui } from '../lib/icons';

type LocationState = {
  email?: string;
};

const RESEND_COOLDOWN_SECONDS = 30;

export function VerifyEmailPage() {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();
  const state = location.state as LocationState | null;
  const email = state?.email;

  const [digits, setDigits] = useState<string[]>(Array(6).fill(''));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const hasSubmittedRef = useRef(false);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  if (!email) {
    return <Navigate to="/register" replace />;
  }

  const submitCode = async (code: string) => {
    if (hasSubmittedRef.current) return;
    if (code.length !== 6) {
      setError(t('verifyEmail.enterAllDigits'));
      return;
    }

    hasSubmittedRef.current = true;
    setSubmitting(true);
    setError(null);

    try {
      const data = await authService.verifyAccountWithCode(email, code);
      setUser(data.user);
      navigate('/verification-success', { replace: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : t('verifyEmail.failed');
      setError(message);
      setDigits(Array(6).fill(''));
      hasSubmittedRef.current = false;
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void submitCode(digits.join(''));
  };

  const handleResend = async () => {
    if (cooldown > 0) return;
    try {
      await authService.resendVerificationCode(email);
      setCooldown(RESEND_COOLDOWN_SECONDS);
      setDigits(Array(6).fill(''));
      setError(null);
      toastService.success(t('verifyEmail.resendSuccess'), { duration: 3000 });
    } catch {
      toastService.error(t('verifyEmail.resendFailed'));
    }
  };

  const allDigitsFilled = digits.every((digit) => digit.length === 1);

  return (
    <div className="min-h-screen flex items-center justify-center bg-page px-4 relative overflow-hidden">
      {/* Background decoration circles */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[#EBE5DA] -top-[100px] -left-[100px] blur-[60px] opacity-60 -z-10"></div>
      <div className="absolute w-[300px] h-[300px] rounded-full bg-[#E3D4C5] -bottom-[50px] -right-[50px] blur-[60px] opacity-60 -z-10"></div>

      <div className="w-full max-w-[480px] bg-surface rounded-[24px] shadow-[0_10px_40px_rgba(62,54,48,0.08)] p-12 text-center">
        {/* Mail Icon */}
        <div className="w-16 h-16 bg-[#FAF6F3] text-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <Ui.Mail size={32} />
        </div>

        <h1 className="text-[28px] font-serif font-bold mb-3 text-text-main">{t('verifyEmail.title')}</h1>
        <p className="text-[16px] text-text-muted leading-relaxed mb-2">
          {t('verifyEmail.description')}
        </p>
        <p className="text-[16px] font-semibold text-text-main mb-8 break-all">{email}</p>

        {error && (
          <p className="mb-6 text-sm text-danger bg-[#FFF5F5] border border-[#FFDDDD] rounded-lg p-3" role="alert">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <OtpInput
              digits={digits}
              onDigitsChange={setDigits}
              onComplete={(code) => void submitCode(code)}
              error={!!error}
            />
          </div>

          <button
            type="submit"
            disabled={!allDigitsFilled || submitting}
            className={`w-full py-4 rounded-xl text-white font-semibold text-[16px] transition-all ${
              allDigitsFilled && !submitting
                ? 'bg-primary hover:bg-[#8E6A4F] hover:-translate-y-0.5 shadow-[0_4px_12px_rgba(166,123,91,0.3)]'
                : 'bg-text-main/30 cursor-not-allowed'
            }`}
          >
            {submitting ? t('verifyEmail.submitting') : t('verifyEmail.submit')}
          </button>
        </form>

        {/* Resend + back */}
        <div className="mt-6 text-[14px] space-y-2">
          <p className="text-text-muted">
            {t('verifyEmail.noCode')}{' '}
            <button
              type="button"
              onClick={() => void handleResend()}
              disabled={cooldown > 0}
              className="text-primary hover:text-primary-hover transition-colors border-b border-transparent hover:border-primary disabled:text-text-muted disabled:cursor-not-allowed disabled:hover:border-transparent"
            >
              {cooldown > 0 ? t('verifyEmail.resendIn', { seconds: cooldown }) : t('verifyEmail.resend')}
            </button>
          </p>
          <p>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-text-muted hover:text-primary transition-colors border-b border-transparent hover:border-primary"
            >
              {t('verifyEmail.backToLogin')}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
