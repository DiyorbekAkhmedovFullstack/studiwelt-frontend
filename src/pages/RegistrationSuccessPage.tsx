import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Icon } from '../lib/icons';

export function RegistrationSuccessPage() {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-page p-4 relative overflow-hidden">
      {/* Background decoration circles */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[#EBE5DA] -top-[100px] -left-[100px] blur-[60px] opacity-60 -z-10"></div>
      <div className="absolute w-[300px] h-[300px] rounded-full bg-[#E3D4C5] -bottom-[50px] -right-[50px] blur-[60px] opacity-60 -z-10"></div>

      <div className="w-full max-w-[520px] bg-surface rounded-[24px] shadow-[0_10px_40px_rgba(62,54,48,0.08)] p-12 text-center">
        {/* Email Icon */}
        <div className="w-20 h-20 bg-[#F0F7F1] rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon.Mail className="h-10 w-10 text-success" />
        </div>

        {/* Message */}
        <h1 className="mb-4 text-[28px] font-serif font-bold text-text-main">
          {t('registrationSuccess.title')}
        </h1>
        <p className="mb-8 text-[16px] text-text-muted leading-relaxed max-w-[400px] mx-auto">
          {t('registrationSuccess.message')}
        </p>

        {/* Info Note */}
        <div className="mb-8 rounded-xl bg-[#FFFCF8] p-5 border border-[rgba(166,123,91,0.15)]">
          <div className="flex items-start gap-3 text-left">
            <Icon.Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-[14px] text-text-main">
              <span className="font-semibold">{t('registrationSuccess.noteTitle')}</span> {t('registrationSuccess.noteMessage')}
            </p>
          </div>
        </div>

        {/* Got it Button */}
        <button
          type="button"
          onClick={() => navigate('/')}
          className="w-full px-4 py-4 bg-primary text-white rounded-lg text-base font-semibold cursor-pointer transition-all shadow-[0_4px_12px_rgba(166,123,91,0.3)] hover:bg-primary-hover hover:-translate-y-0.5"
        >
          {t('registrationSuccess.button')}
        </button>
      </div>
    </div>
  );
}
