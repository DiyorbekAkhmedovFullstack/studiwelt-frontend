import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { authService } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';

export function VerifyAccountPage() {
  const { t } = useTranslation('auth');
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const key = params.get('key');

    const verify = async () => {
      if (!key) {
        setError(t('verifyAccount.failed.keyMissing'));
        setVerifying(false);
        return;
      }

      try {
        const data = await authService.verifyAccount(key);
        setUser(data.user);
        // Navigate to appropriate page based on verification status
        if (data.message === 'Account already verified.') {
          navigate('/already-verified');
        } else {
          navigate('/verification-success');
        }
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : t('verifyAccount.failed.generic');
        setError(msg);
        setVerifying(false);
      }
    };

    void verify();
  }, [location.search, navigate, setUser, t]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-page p-4 relative overflow-hidden">
      {/* Background decoration circles */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[#EBE5DA] -top-[100px] -left-[100px] blur-[60px] opacity-60 -z-10"></div>
      <div className="absolute w-[300px] h-[300px] rounded-full bg-[#E3D4C5] -bottom-[50px] -right-[50px] blur-[60px] opacity-60 -z-10"></div>

      <div className="w-full max-w-[480px] bg-surface rounded-[24px] shadow-[0_10px_40px_rgba(62,54,48,0.08)] p-12 text-center">
        {verifying && (
          <>
            <div className="w-16 h-16 bg-[#FAF6F3] rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#E3D4C5] border-t-primary"></div>
            </div>
            <h2 className="text-[24px] font-serif font-bold mb-3 text-text-main">{t('verifyAccount.verifying.title')}</h2>
            <p className="text-[15px] text-text-muted">{t('verifyAccount.verifying.message')}</p>
          </>
        )}
        {error && (
          <>
            <div className="w-16 h-16 bg-[#FFF5F5] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="h-8 w-8 text-danger"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-[24px] font-serif font-bold mb-3 text-text-main">
              {t('verifyAccount.failed.title')}
            </h2>
            <p className="text-[15px] text-danger mb-8 bg-[#FFF5F5] border border-[#FFDDDD] rounded-lg p-4" role="alert">
              {error}
            </p>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="w-full px-4 py-4 bg-primary text-white rounded-lg text-base font-semibold cursor-pointer transition-all shadow-[0_4px_12px_rgba(166,123,91,0.3)] hover:bg-primary-hover hover:-translate-y-0.5"
            >
              {t('verifyAccount.failed.goToLogin')}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
