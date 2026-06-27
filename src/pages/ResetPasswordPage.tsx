import { useEffect, useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { authService } from '../services/authService';
import { toastService } from '../services/toastService';
import { AuthLayout, PasswordInput } from '../components/auth';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

type VerifyPasswordResult = {
  userId: string;
};

const passwordKeyVerificationCache = new Map<string, Promise<VerifyPasswordResult>>();

function verifyPasswordKeyOnce(key: string): Promise<VerifyPasswordResult> {
  const existing = passwordKeyVerificationCache.get(key);
  if (existing) {
    return existing;
  }

  const promise = authService.verifyPasswordKey(key).then((data) => ({
    userId: data.user.userId,
  }));

  passwordKeyVerificationCache.set(key, promise);
  return promise;
}

export function ResetPasswordPage() {
  const { t } = useTranslation('auth');
  const location = useLocation();
  const navigate = useNavigate();
  const [key, setKey] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const keyParam = params.get('key');
    if (!keyParam) {
      setError(t('resetPassword.invalidLink.keyMissing'));
      setLoading(false);
      return;
    }
    setKey(keyParam);

    const verify = async () => {
      try {
        const { userId: verifiedUserId } = await verifyPasswordKeyOnce(keyParam);
        setUserId(verifiedUserId);
      } catch (err) {
        console.error('Password reset token verification failed', err);
        setError(t('resetPassword.invalidLink.linkExpired'));
      } finally {
        setLoading(false);
      }
    };

    void verify();
  }, [location.search, t]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userId || !key) return;
    if (!newPassword || newPassword !== confirmNewPassword) {
      toastService.error(t('resetPassword.passwordsMustMatch'));
      return;
    }

    setSubmitting(true);
    try {
      await authService.resetPassword({
        userId,
        newPassword,
        confirmNewPassword,
      });
      setShowSuccessModal(true);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : t('resetPassword.failed');
      toastService.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page p-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (error && !userId) {
    return (
      <AuthLayout
        title={t('resetPassword.invalidLink.title')}
        subtitle={t('resetPassword.invalidLink.subtitle')}
        brandSubtitle={t('resetPassword.brandSubtitle')}
        features={[
          t('resetPassword.invalidLink.features.expires'),
          t('resetPassword.invalidLink.features.request'),
          t('resetPassword.invalidLink.features.contact'),
        ]}
      >
        <div className="mb-5 p-4 bg-[#FFF5F5] border border-[#C07766] rounded-lg">
          <p className="text-sm text-[#C07766]" role="alert">
            {error}
          </p>
        </div>

        <Link
          to="/forgot-password"
          className="w-full px-4 py-4 bg-primary text-white rounded-lg text-base font-semibold cursor-pointer transition-all shadow-[0_4px_12px_rgba(166,123,91,0.3)] hover:bg-primary-hover hover:-translate-y-0.5 block text-center"
        >
          {t('resetPassword.invalidLink.requestNew')}
        </Link>

        <div className="text-center text-[15px] mt-8">
          {t('resetPassword.rememberPassword')}{' '}
          <Link to="/login" className="text-primary hover:text-primary-hover font-medium transition-colors">
            {t('resetPassword.backToLogin')}
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <>
      <AuthLayout
        title={t('resetPassword.title')}
        subtitle={t('resetPassword.subtitle')}
        brandSubtitle={t('resetPassword.brandSubtitle')}
        features={[
          t('resetPassword.features.length'),
          t('resetPassword.features.mix'),
          t('resetPassword.features.avoid'),
        ]}
      >
        <form onSubmit={handleSubmit}>
          <PasswordInput
            label={t('resetPassword.newPassword')}
            id="newPassword"
            placeholder="••••••••"
            autoComplete="new-password"
            required
            minLength={8}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <PasswordInput
            label={t('resetPassword.confirmPassword')}
            id="confirmNewPassword"
            placeholder="••••••••"
            autoComplete="new-password"
            required
            minLength={8}
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={submitting}
            className="w-full px-4 py-4 bg-primary text-white rounded-lg text-base font-semibold cursor-pointer transition-all shadow-[0_4px_12px_rgba(166,123,91,0.3)] hover:bg-primary-hover hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          >
            {submitting ? t('resetPassword.submitting') : t('resetPassword.submit')}
          </button>
        </form>

        <div className="text-center text-[15px] mt-8">
          {t('resetPassword.rememberPassword')}{' '}
          <Link to="/login" className="text-primary hover:text-primary-hover font-medium transition-colors">
            {t('resetPassword.backToLogin')}
          </Link>
        </div>
      </AuthLayout>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-surface rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] p-8 max-w-md w-full text-center transform transition-all">
            {/* Success Icon */}
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 bg-[#EBF5EC] rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-[#6B8C6E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-[28px] font-serif font-bold text-text-main mb-3">
              {t('resetPassword.success.title')}
            </h2>

            {/* Message */}
            <p className="text-[15px] text-text-muted mb-8 leading-relaxed">
              {t('resetPassword.success.message')}
            </p>

            {/* Button */}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="w-full px-6 py-4 bg-primary text-white rounded-lg text-base font-semibold cursor-pointer transition-all shadow-[0_4px_12px_rgba(166,123,91,0.3)] hover:bg-primary-hover hover:-translate-y-0.5"
            >
              {t('resetPassword.success.button')}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
