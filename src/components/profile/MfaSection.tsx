import { useState, useRef } from 'react';
import type { KeyboardEvent, ClipboardEvent } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { authService } from '../../services/authService';
import type { User } from '../../types/api';
import { toastService } from '../../services/toastService';

export function MfaSection() {
  const { t } = useTranslation();
  const { user, setUser } = useAuth();
  const [mfaSetup, setMfaSetup] = useState<{ user: User } | null>(null);
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const isMfaEnabled = user?.mfa ?? false;

  const handleSetupMfa = async () => {
    setLoading(true);
    try {
      const data = await authService.setupMfa();
      setMfaSetup(data);
      setUser(data.user);
      toastService.success(t('profile.security.setupStarted'));
    } catch {
      toastService.error(t('profile.security.setupFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleDigitChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) {
      return;
    }

    const newDigits = [...digits];
    newDigits[index] = value.slice(-1); // Only take last character
    setDigits(newDigits);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pasteData)) return;

    const newDigits = pasteData.split('').concat(Array(6).fill('')).slice(0, 6);
    setDigits(newDigits);
    inputRefs.current[Math.min(pasteData.length, 5)]?.focus();
  };

  const handleVerify = async () => {
    const code = digits.join('');
    if (code.length !== 6) {
      toastService.error(t('profile.security.enterAllDigits'));
      return;
    }

    if (!mfaSetup || !user) {
      toastService.error(t('profile.security.userInfoMissing'));
      return;
    }

    setLoading(true);
    try {
      const result = await authService.enableMfa(code, user.userId);
      setUser(result.user);
      setMfaSetup(null);
      setDigits(['', '', '', '', '', '']);
      toastService.success(t('profile.security.mfaEnabledToast'));
    } catch {
      toastService.error(t('profile.security.mfaEnableFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleDisableMfa = async () => {
    if (!window.confirm(t('profile.security.disableConfirm'))) {
      return;
    }

    setLoading(true);
    try {
      const result = await authService.cancelMfa();
      setUser(result.user);
      setMfaSetup(null);
      setDigits(['', '', '', '', '', '']);
      toastService.success(t('profile.security.mfaDisabled'));
    } catch {
      toastService.error(t('profile.security.mfaDisableFailed'));
    } finally {
      setLoading(false);
    }
  };

  const allDigitsFilled = digits.every((digit) => digit.length === 1);

  // If MFA is already enabled, show status
  if (isMfaEnabled && !mfaSetup) {
    return (
      <div className="bg-surface rounded-2xl sm:rounded-[24px] shadow-card p-4 sm:p-6 md:p-10 relative overflow-hidden">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 sm:mb-6 gap-3 sm:gap-0">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold mb-1 sm:mb-2">{t('profile.security.title')}</h2>
            <p className="text-sm sm:text-base text-text-muted">{t('profile.security.subtitle')}</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[rgba(107,140,110,0.1)] text-[#6B8C6E] rounded-full text-[13px] sm:text-[14px] font-semibold w-fit">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            {t('profile.security.mfaEnabled')}
          </div>
        </div>

        <div className="bg-[#F0F7F1] border border-[#D5E8D6] rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <p className="text-[14px] sm:text-[15px] text-text-main">
            <Trans i18nKey="profile.security.mfaEnabledDescription" components={{ strong: <strong /> }} />
          </p>
        </div>

        <button
          onClick={handleDisableMfa}
          disabled={loading}
          className="w-full sm:w-auto px-6 py-3 border border-[#DDD] rounded-lg text-text-main font-medium text-[14px] sm:text-[15px] hover:bg-[#F5F5F5] transition-colors disabled:opacity-50"
        >
          {loading ? t('profile.security.updating') : t('profile.security.disableMfa')}
        </button>
      </div>
    );
  }

  // If setup not started, show setup button
  if (!mfaSetup) {
    return (
      <div className="bg-surface rounded-2xl sm:rounded-[24px] shadow-card p-4 sm:p-6 md:p-10 relative overflow-hidden">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>

        <div className="flex justify-between items-start mb-4 sm:mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold mb-1 sm:mb-2">{t('profile.security.title')}</h2>
            <p className="text-sm sm:text-base text-text-muted">{t('profile.security.subtitle')}</p>
          </div>
        </div>

        <div className="bg-[#FFF9F0] border border-[#F5E6D3] rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <p className="text-[14px] sm:text-[15px] text-text-main mb-0">
            <Trans i18nKey="profile.security.mfaDisabledDescription" components={{ strong: <strong /> }} />
          </p>
        </div>

        <button
          onClick={handleSetupMfa}
          disabled={loading}
          className="w-full sm:w-auto px-6 py-3 bg-text-main text-white rounded-lg font-semibold text-[14px] sm:text-[15px] hover:bg-primary transition-all hover:-translate-y-0.5 disabled:opacity-50"
        >
          {loading ? t('profile.security.startingSetup') : t('profile.security.setupMfa')}
        </button>
      </div>
    );
  }

  // Show setup process
  return (
    <div className="bg-surface rounded-2xl sm:rounded-[24px] shadow-card p-4 sm:p-6 md:p-10 relative overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>

      {/* Step 1 */}
      <span className="block text-[11px] sm:text-[12px] uppercase tracking-wider text-primary font-bold mb-3 sm:mb-4">
        {t('profile.security.step1')}
      </span>
      <h2 className="text-xl sm:text-2xl font-serif font-bold mb-3 sm:mb-4">{t('profile.security.setupAuthenticator')}</h2>
      <p className="text-[14px] sm:text-[16px] leading-relaxed text-text-main mb-6 sm:mb-8 max-w-[500px]">
        {t('profile.security.setupInstructions')}
      </p>

      {/* QR Section */}
      <div className="flex justify-center mb-6 sm:mb-10">
        {/* QR Code */}
        <div className="flex-shrink-0">
          {mfaSetup.user.qrCodeImageUri ? (
            <div className="bg-white p-4 border border-[#E0E0E0] rounded-xl shadow-md">
              <img
                src={mfaSetup.user.qrCodeImageUri}
                alt={t('profile.security.qrCodeAlt')}
                className="w-40 h-40 sm:w-48 sm:h-48"
              />
            </div>
          ) : (
            <div className="bg-white p-4 border border-[#E0E0E0] rounded-xl shadow-md w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center">
              <div className="text-center text-text-muted text-sm">{t('profile.security.qrCodePlaceholder')}</div>
            </div>
          )}
        </div>
      </div>

      {/* Step 2 */}
      <span className="block text-[11px] sm:text-[12px] uppercase tracking-wider text-primary font-bold mb-3 sm:mb-4">
        {t('profile.security.step2')}
      </span>
      <div className="bg-page rounded-xl p-4 sm:p-8 text-center">
        <h3 className="text-[16px] sm:text-[17px] font-semibold mb-1">{t('profile.security.verifyCode')}</h3>
        <p className="text-text-muted text-[13px] sm:text-[14px] mb-4 sm:mb-6">
          {t('profile.security.verifyInstructions')}
        </p>

        {/* 6 Digit Inputs */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleDigitChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className={`w-12 h-14 sm:w-[50px] sm:h-[60px] border-2 rounded-lg bg-white text-center text-xl sm:text-2xl font-semibold text-text-main transition-all focus:outline-none focus:border-primary focus:shadow-[0_4px_12px_rgba(166,123,91,0.2)] focus:-translate-y-0.5 ${
                digit ? 'border-[#DCDCDC]' : 'border-[#DCDCDC]'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          disabled={!allDigitsFilled || loading}
          className={`w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-[14px] sm:text-[15px] transition-all ${
            allDigitsFilled && !loading
              ? 'bg-primary text-white hover:-translate-y-0.5 hover:bg-[#8E6A4F]'
              : 'bg-text-main/30 text-white cursor-not-allowed'
          }`}
        >
          {loading ? t('profile.security.verifying') : t('profile.security.verifyAndEnable')}
        </button>
      </div>
    </div>
  );
}
