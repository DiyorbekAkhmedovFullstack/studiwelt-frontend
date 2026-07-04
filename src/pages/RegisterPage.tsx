import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { authService } from '../services/authService';
import { toastService } from '../services/toastService';
import { TestimonialAuthLayout, FormInput, PasswordInput } from '../components/auth';
import { registerSchema, type RegisterFormData } from '../lib/validations';
import { SEO, seoConfig } from '../components/common/SEO';
import { useRandomTestimonial } from '../hooks';

export function RegisterPage() {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const testimonial = useRandomTestimonial();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
  });

  const password = watch('password', '');

  const getPasswordStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[a-z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(password);

  const onSubmit = async (data: RegisterFormData) => {
    setSubmitting(true);
    try {
      await authService.register({ ...data, language: i18n.language });
      navigate('/verify-email', { state: { email: data.email } });
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : t('register.failed');
      toastService.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO {...seoConfig.register} />
      <TestimonialAuthLayout
        title={t('register.title')}
        subtitle={t('register.subtitle')}
        testimonialText={testimonial.text}
        testimonialRole={testimonial.role}
        testimonialAvatar={testimonial.avatar}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label htmlFor="firstName" className="block mb-2 text-[14px] font-medium text-text-main">
                {t('register.firstName')}
              </label>
              <input
                type="text"
                id="firstName"
                placeholder={t('register.firstNamePlaceholder')}
                autoComplete="given-name"
                className={`w-full px-4 py-3.5 border rounded-lg font-sans text-base text-text-main bg-white transition-all shadow-[0_2px_6px_rgba(62,54,48,0.04)] focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(166,123,91,0.15)] ${errors.firstName ? 'border-danger' : 'border-[#E0E0E0]'}`}
                {...register('firstName')}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-danger" role="alert">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="lastName" className="block mb-2 text-[14px] font-medium text-text-main">
                {t('register.lastName')}
              </label>
              <input
                type="text"
                id="lastName"
                placeholder={t('register.lastNamePlaceholder')}
                autoComplete="family-name"
                className={`w-full px-4 py-3.5 border rounded-lg font-sans text-base text-text-main bg-white transition-all shadow-[0_2px_6px_rgba(62,54,48,0.04)] focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(166,123,91,0.15)] ${errors.lastName ? 'border-danger' : 'border-[#E0E0E0]'}`}
                {...register('lastName')}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-danger" role="alert">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <FormInput
            label={t('register.email')}
            type="email"
            id="email"
            placeholder={t('register.emailPlaceholder')}
            autoComplete="email"
            error={errors.email?.message}
            {...register('email')}
          />

          <PasswordInput
            label={t('register.password')}
            id="password"
            placeholder={t('register.passwordPlaceholder')}
            autoComplete="new-password"
            error={errors.password?.message}
            {...register('password')}
          />

          {password && (
            <div className="mb-5 -mt-3">
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`h-1 flex-1 rounded-full transition-colors ${passwordStrength >= level
                        ? passwordStrength <= 2
                          ? 'bg-danger'
                          : passwordStrength === 3
                            ? 'bg-yellow-500'
                            : 'bg-success'
                        : 'bg-gray-200'
                      }`}
                  />
                ))}
              </div>
              <p className="text-xs text-text-muted">
                {passwordStrength <= 2 && t('register.passwordStrength.weak')}
                {passwordStrength === 3 && t('register.passwordStrength.good')}
                {passwordStrength === 4 && t('register.passwordStrength.strong')}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full px-4 py-4 bg-primary text-white rounded-lg text-base font-semibold cursor-pointer transition-all mt-3 shadow-[0_4px_12px_rgba(166,123,91,0.3)] hover:bg-primary-hover hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          >
            {submitting ? t('register.submitting') : t('register.submit')}
          </button>
        </form>

        <div className="text-center text-[15px] mt-8">
          {t('register.hasAccount')}{' '}
          <Link to="/login" className="text-primary hover:text-primary-hover font-medium transition-colors">
            {t('register.loginLink')}
          </Link>
        </div>
      </TestimonialAuthLayout>
    </>
  );
}
