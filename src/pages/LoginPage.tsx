import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { toastService } from '../services/toastService';
import { AuthLayout, FormInput, PasswordInput } from '../components/auth';
import { loginSchema, type LoginFormData } from '../lib/validations';
import { SEO, seoConfig } from '../components/common/SEO';

export function LoginPage() {
  const { t } = useTranslation('auth');
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page p-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/course" replace />;
  }

  const onSubmit = async (data: LoginFormData) => {
    setSubmitting(true);
    const result = await login(data.email, data.password);
    setSubmitting(false);

    if (!result.success) {
      toastService.error(t('login.invalidCredentials'));
      return;
    }

    if (result.requiresMfa && result.user) {
      toastService.info(t('login.mfaRequired'));
      navigate('/mfa', {
        state: { userId: result.user.userId, email: result.user.email },
      });
      return;
    }

    toastService.success(t('login.signedIn'));
    navigate('/course');
  };

  return (
    <>
      <SEO {...seoConfig.login} />
      <AuthLayout
        title={t('login.title')}
        subtitle={t('login.subtitle')}
        brandSubtitle={t('login.brandSubtitle')}
        features={[
          t('login.features.sync'),
          t('login.features.resume'),
          t('login.features.track'),
        ]}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label={t('login.email')}
            type="email"
            id="email"
            placeholder={t('login.emailPlaceholder')}
            autoComplete="email"
            error={errors.email?.message}
            {...register('email')}
          />

          <PasswordInput
            label={t('login.password')}
            id="password"
            placeholder={t('login.passwordPlaceholder')}
            autoComplete="current-password"
            error={errors.password?.message}
            {...register('password')}
          />

          <div className="flex justify-end mb-6 text-[14px]">
            <Link
              to="/forgot-password"
              className="text-primary hover:text-primary-hover transition-colors font-medium"
            >
              {t('login.forgotPassword')}
            </Link>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full px-4 py-4 bg-primary text-white rounded-lg text-base font-semibold cursor-pointer transition-all shadow-[0_4px_12px_rgba(166,123,91,0.3)] hover:bg-primary-hover hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          >
            {submitting ? t('login.submitting') : t('login.submit')}
          </button>
        </form>

        <div className="text-center text-[15px] mt-8">
          {t('login.noAccount')}{' '}
          <Link to="/register" className="text-primary hover:text-primary-hover font-medium transition-colors">
            {t('login.registerLink')}
          </Link>
        </div>
      </AuthLayout>
    </>
  );
}
