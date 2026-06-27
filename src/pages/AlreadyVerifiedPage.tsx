import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function AlreadyVerifiedPage() {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-page p-4 relative overflow-hidden">
      {/* Background decoration circles */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[#EBE5DA] -top-[100px] -left-[100px] blur-[60px] opacity-60 -z-10"></div>
      <div className="absolute w-[300px] h-[300px] rounded-full bg-[#E3D4C5] -bottom-[50px] -right-[50px] blur-[60px] opacity-60 -z-10"></div>

      <div className="w-full max-w-[520px] bg-surface rounded-[24px] shadow-[0_10px_40px_rgba(62,54,48,0.08)] p-12 text-center">
        {/* Info Icon */}
        <div className="w-20 h-20 bg-[#F0F4FF] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="h-10 w-10 text-[#5B8DEF]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Message */}
        <h1 className="mb-4 text-[28px] font-serif font-bold text-text-main">
          {t('alreadyVerified.title')}
        </h1>
        <p className="mb-8 text-[16px] text-text-muted leading-relaxed max-w-[400px] mx-auto">
          {t('alreadyVerified.message')}
        </p>

        {/* Action buttons */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => navigate('/course')}
            className="w-full px-4 py-4 bg-primary text-white rounded-lg text-base font-semibold cursor-pointer transition-all shadow-[0_4px_12px_rgba(166,123,91,0.3)] hover:bg-primary-hover hover:-translate-y-0.5"
          >
            {t('alreadyVerified.goToCourse')}
          </button>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full px-4 py-4 bg-surface text-text-main border-2 border-[rgba(166,123,91,0.2)] rounded-lg text-base font-semibold cursor-pointer transition-all hover:border-primary hover:bg-[#FFFCF8]"
          >
            {t('alreadyVerified.goToLogin')}
          </button>
        </div>
      </div>
    </div>
  );
}
