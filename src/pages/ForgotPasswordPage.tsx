import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { toastService } from '../services/toastService';
import { AuthLayout, FormInput } from '../components/auth';

export function ForgotPasswordPage() {
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
      toastService.success('If an account exists, a reset email has been sent.');
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="We'll send you a link to reset your password."
      brandSubtitle="Your daily space for focused German learning."
      features={[
        'Secure password reset process',
        'Link expires in 24 hours',
        'Check your email inbox and spam folder',
      ]}
    >
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email Address"
          type="email"
          id="email"
          placeholder="alex@example.com"
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
          {submitting ? 'Sending link...' : 'Send reset link'}
        </button>
      </form>

      <div className="text-center text-[15px] mt-8">
        Remember your password?{' '}
        <Link to="/login" className="text-primary hover:text-primary-hover font-medium transition-colors">
          Back to login
        </Link>
      </div>
    </AuthLayout>
  );
}
