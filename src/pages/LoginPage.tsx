import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../contexts/AuthContext';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { toastService } from '../services/toastService';
import { AuthLayout, FormInput, PasswordInput } from '../components/auth';
import { loginSchema, type LoginFormData } from '../lib/validations';

export function LoginPage() {
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
      toastService.error('Invalid credentials.');
      return;
    }

    if (result.requiresMfa && result.user) {
      toastService.info('MFA required.');
      navigate('/mfa', {
        state: { userId: result.user.userId, email: result.user.email },
      });
      return;
    }

    toastService.success('Signed in successfully.');
    navigate('/course');
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Continue your path to mastery."
      brandSubtitle="Your daily space for focused German learning."
      features={[
        'Syncs progress across all devices',
        'Resume exactly where you left off',
        'Track your improvement in real-time',
      ]}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Email"
          type="email"
          id="email"
          placeholder="alex@example.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />

        <PasswordInput
          label="Password"
          id="password"
          placeholder="••••••••"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register('password')}
        />

        <div className="flex justify-end mb-6 text-[14px]">
          <Link
            to="/forgot-password"
            className="text-primary hover:text-primary-hover transition-colors font-medium"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full px-4 py-4 bg-primary text-white rounded-lg text-base font-semibold cursor-pointer transition-all shadow-[0_4px_12px_rgba(166,123,91,0.3)] hover:bg-primary-hover hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
        >
          {submitting ? 'Signing in...' : 'Log in'}
        </button>
      </form>

      <div className="text-center text-[15px] mt-8">
        Don't have an account?{' '}
        <Link to="/register" className="text-primary hover:text-primary-hover font-medium transition-colors">
          Register here
        </Link>
      </div>
    </AuthLayout>
  );
}
