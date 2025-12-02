import { useEffect, useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
      setError('Reset key is missing.');
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
        setError('Invalid or expired reset link.');
      } finally {
        setLoading(false);
      }
    };

    void verify();
  }, [location.search]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userId || !key) return;
    if (!newPassword || newPassword !== confirmNewPassword) {
      setError('Passwords must match and not be empty.');
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      await authService.resetPassword({
        userId,
        newPassword,
        confirmNewPassword,
      });
      setShowSuccessModal(true);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : 'Failed to reset password.';
      setError(msg);
      toastService.error('Password reset failed.');
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
        title="Invalid reset link"
        subtitle="This password reset link is invalid or has expired."
        brandSubtitle="Your daily space for focused German learning."
        features={[
          'Reset links expire after 24 hours',
          'Request a new reset link if needed',
          'Contact support if issues persist',
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
          Request new reset link
        </Link>

        <div className="text-center text-[15px] mt-8">
          Remember your password?{' '}
          <Link to="/login" className="text-primary hover:text-primary-hover font-medium transition-colors">
            Back to login
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <>
      <AuthLayout
        title="Set new password"
        subtitle="Choose a strong password for your account."
        brandSubtitle="Your daily space for focused German learning."
        features={[
          'Use at least 8 characters',
          'Mix letters, numbers, and symbols',
          'Avoid common words or patterns',
        ]}
      >
        {error && (
          <div className="mb-5 p-4 bg-[#FFF5F5] border border-[#C07766] rounded-lg">
            <p className="text-sm text-[#C07766]" role="alert">
              {error}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <PasswordInput
            label="New Password"
            id="newPassword"
            placeholder="••••••••"
            autoComplete="new-password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <PasswordInput
            label="Confirm New Password"
            id="confirmNewPassword"
            placeholder="••••••••"
            autoComplete="new-password"
            required
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={submitting}
            className="w-full px-4 py-4 bg-primary text-white rounded-lg text-base font-semibold cursor-pointer transition-all shadow-[0_4px_12px_rgba(166,123,91,0.3)] hover:bg-primary-hover hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          >
            {submitting ? 'Saving...' : 'Reset password'}
          </button>
        </form>

        <div className="text-center text-[15px] mt-8">
          Remember your password?{' '}
          <Link to="/login" className="text-primary hover:text-primary-hover font-medium transition-colors">
            Back to login
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
              Password Reset!
            </h2>

            {/* Message */}
            <p className="text-[15px] text-text-muted mb-8 leading-relaxed">
              Your password has been successfully reset. You can now sign in with your new password.
            </p>

            {/* Button */}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="w-full px-6 py-4 bg-primary text-white rounded-lg text-base font-semibold cursor-pointer transition-all shadow-[0_4px_12px_rgba(166,123,91,0.3)] hover:bg-primary-hover hover:-translate-y-0.5"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
