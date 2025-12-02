import { useState, useRef } from 'react';
import type { KeyboardEvent, ClipboardEvent } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { authService } from '../../services/authService';
import type { User } from '../../types/api';
import { toastService } from '../../services/toastService';

export function MfaSection() {
  const { user, setUser } = useAuth();
  const [mfaSetup, setMfaSetup] = useState<{ user: User; qrCodeSecret: string } | null>(null);
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const isMfaEnabled = user?.mfa ?? false;

  const handleSetupMfa = async () => {
    setLoading(true);
    try {
      const data = await authService.setupMfa();
      setMfaSetup(data);
      setUser(data.user);
      toastService.success('MFA setup started.');
    } catch {
      toastService.error('MFA setup failed.');
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
      toastService.error('Enter all 6 digits.');
      return;
    }

    if (!mfaSetup || !user) {
      toastService.error('User information missing.');
      return;
    }

    setLoading(true);
    try {
      const result = await authService.enableMfa(code, user.userId);
      setUser(result.user);
      setMfaSetup(null);
      setDigits(['', '', '', '', '', '']);
      toastService.success('MFA enabled.');
    } catch {
      toastService.error('MFA enable failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleDisableMfa = async () => {
    if (!window.confirm('Are you sure you want to disable MFA for your account?')) {
      return;
    }

    setLoading(true);
    try {
      const result = await authService.cancelMfa();
      setUser(result.user);
      setMfaSetup(null);
      setDigits(['', '', '', '', '', '']);
      toastService.success('MFA disabled.');
    } catch {
      toastService.error('MFA disable failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyKey = () => {
    if (mfaSetup?.qrCodeSecret) {
      navigator.clipboard.writeText(mfaSetup.qrCodeSecret);
      setCopied(true);
      toastService.success('Secret key copied.');

      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
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
            <h2 className="text-xl sm:text-2xl font-serif font-bold mb-1 sm:mb-2">Security</h2>
            <p className="text-sm sm:text-base text-text-muted">Manage your password and 2-step verification.</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[rgba(107,140,110,0.1)] text-[#6B8C6E] rounded-full text-[13px] sm:text-[14px] font-semibold w-fit">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            MFA Enabled
          </div>
        </div>

        <div className="bg-[#F0F7F1] border border-[#D5E8D6] rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <p className="text-[14px] sm:text-[15px] text-text-main">
            ✓ Multi-factor authentication is currently <strong>enabled</strong> for your account.
            Your account has an extra layer of security.
          </p>
        </div>

        <button
          onClick={handleDisableMfa}
          disabled={loading}
          className="w-full sm:w-auto px-6 py-3 border border-[#DDD] rounded-lg text-text-main font-medium text-[14px] sm:text-[15px] hover:bg-[#F5F5F5] transition-colors disabled:opacity-50"
        >
          {loading ? 'Updating...' : 'Disable MFA'}
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
            <h2 className="text-xl sm:text-2xl font-serif font-bold mb-1 sm:mb-2">Security</h2>
            <p className="text-sm sm:text-base text-text-muted">Manage your password and 2-step verification.</p>
          </div>
        </div>

        <div className="bg-[#FFF9F0] border border-[#F5E6D3] rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <p className="text-[14px] sm:text-[15px] text-text-main mb-0">
            MFA is currently <strong>disabled</strong> for your account. Add an extra layer of protection with a time-based one-time password (TOTP) app such as Google Authenticator or 1Password.
          </p>
        </div>

        <button
          onClick={handleSetupMfa}
          disabled={loading}
          className="w-full sm:w-auto px-6 py-3 bg-text-main text-white rounded-lg font-semibold text-[14px] sm:text-[15px] hover:bg-primary transition-all hover:-translate-y-0.5 disabled:opacity-50"
        >
          {loading ? 'Starting setup...' : 'Set up MFA'}
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
        Step 1 of 2
      </span>
      <h2 className="text-xl sm:text-2xl font-serif font-bold mb-3 sm:mb-4">Set up Authenticator App</h2>
      <p className="text-[14px] sm:text-[16px] leading-relaxed text-text-main mb-6 sm:mb-8 max-w-[500px]">
        Use your authenticator app (Google Authenticator, Authy, etc.) to scan the QR code below.
        This will link your STUDIWELT account to your device.
      </p>

      {/* QR Section */}
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start mb-6 sm:mb-10">
        {/* QR Code */}
        <div className="flex-shrink-0 w-full sm:w-auto flex justify-center sm:block">
          {mfaSetup.user.qrCodeImageUri ? (
            <div className="bg-white p-4 border border-[#E0E0E0] rounded-xl shadow-md">
              <img
                src={mfaSetup.user.qrCodeImageUri}
                alt="MFA QR code"
                className="w-32 h-32 sm:w-40 sm:h-40"
              />
            </div>
          ) : (
            <div className="bg-white p-4 border border-[#E0E0E0] rounded-xl shadow-md w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center">
              <div className="text-center text-text-muted text-sm">QR Code</div>
            </div>
          )}
        </div>

        {/* Manual Key */}
        <div className="flex-1 w-full">
          <div className="text-[13px] sm:text-[14px] font-medium text-text-muted mb-2">Can't scan the code?</div>
          <p className="text-[13px] sm:text-[14px] text-text-muted mb-3">
            Enter this text code into your app manually.
          </p>
          <div className="flex items-center justify-between bg-[#FAFAFA] border border-[#E0E0E0] rounded-lg overflow-hidden">
            <input
              type="text"
              readOnly
              value={mfaSetup.qrCodeSecret}
              className="flex-1 font-mono text-[11px] sm:text-[13px] md:text-[14px] text-text-main tracking-wide bg-transparent px-3 sm:px-4 py-3 outline-none border-none"
            />
            <button
              onClick={handleCopyKey}
              className="flex-shrink-0 px-4 sm:px-5 py-3 text-primary hover:bg-[rgba(166,123,91,0.08)] transition-colors border-l border-[#E0E0E0]"
              aria-label={copied ? 'Copied' : 'Copy to clipboard'}
            >
              {copied ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Step 2 */}
      <span className="block text-[11px] sm:text-[12px] uppercase tracking-wider text-primary font-bold mb-3 sm:mb-4">
        Step 2 of 2
      </span>
      <div className="bg-page rounded-xl p-4 sm:p-8 text-center">
        <h3 className="text-[16px] sm:text-[17px] font-semibold mb-1">Verify the code</h3>
        <p className="text-text-muted text-[13px] sm:text-[14px] mb-4 sm:mb-6">
          Enter the 6-digit code from your app to finish.
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
          {loading ? 'Verifying...' : 'Verify & Enable'}
        </button>
      </div>
    </div>
  );
}
