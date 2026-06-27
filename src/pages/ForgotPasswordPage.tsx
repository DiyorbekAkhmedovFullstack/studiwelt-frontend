import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { authService } from '../services/authService';
import { toastService } from '../services/toastService';
import { AuthLayout, FormInput } from '../components/auth';

export function ForgotPasswordPage() {
  const { t } = useTranslation('auth');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      await authService.requestPasswordReset(email);
    } catch (err) {
      // For security, do not reveal whether the email exists.
      // Log the error for debugging but always show a generic message to the user.
      console.error('Password reset request failed', err);
    } finally {
      toastService.success(t('forgotPassword.emailSent'));
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title={t('forgotPassword.title')}
      subtitle={t('forgotPassword.subtitle')}
      brandSubtitle={t('forgotPassword.brandSubtitle')}
      features={[
        t('forgotPassword.features.secure'),
        t('forgotPassword.features.expires'),
        t('forgotPassword.features.check'),
      ]}
    >
      <form onSubmit={handleSubmit}>
        <FormInput
          label={t('forgotPassword.email')}
          type="email"
          id="email"
          placeholder={t('forgotPassword.emailPlaceholder')}
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full px-4 py-4 bg-primary text-white rounded-lg text-base font-semibold cursor-pointer transition-all shadow-[0_4px_12px_rgba(166,123,91,0.3)] hover:bg-primary-hover hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
        >
          {submitting ? t('forgotPassword.submitting') : t('forgotPassword.submit')}
        </button>
      </form>

      <div className="text-center text-[15px] mt-8">
        {t('forgotPassword.rememberPassword')}{' '}
        <Link to="/login" className="text-primary hover:text-primary-hover font-medium transition-colors">
          {t('forgotPassword.backToLogin')}
        </Link>
      </div>
    </AuthLayout>
  );
}
