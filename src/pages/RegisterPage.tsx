import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { toastService } from '../services/toastService';
import { TestimonialAuthLayout, FormInput, PasswordInput } from '../components/auth';

export function RegisterPage() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await authService.register({ firstName, lastName, email, password });
      navigate('/registration-success');
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : 'Registration failed. Please try again.';
      setError(msg);
      toastService.error('Registration failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <TestimonialAuthLayout
      title="Create your account"
      subtitle="Start your 30-day journey to mastery today."
      testimonialText="I used to stress-study for hours with zero retention. The structured approach and progress tracking completely changed my learning journey."
      testimonialAuthor="Sarah Jenkins"
      testimonialRole="Student • Passed Studienkolleg 2024"
    >
      {error && (
        <div className="mb-5 p-3 bg-danger/10 border border-danger/20 rounded-lg">
          <p className="text-sm text-danger" role="alert">
            {error}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block mb-2 text-[14px] font-medium text-text-main">
              First Name
            </label>
            <input
              type="text"
              required
              placeholder="John"
              autoComplete="given-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-3.5 border border-[#E0E0E0] rounded-lg font-sans text-base text-text-main bg-white transition-all shadow-[0_2px_6px_rgba(62,54,48,0.04)] focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(166,123,91,0.15)]"
            />
          </div>
          <div>
            <label className="block mb-2 text-[14px] font-medium text-text-main">
              Last Name
            </label>
            <input
              type="text"
              required
              placeholder="Doe"
              autoComplete="family-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-3.5 border border-[#E0E0E0] rounded-lg font-sans text-base text-text-main bg-white transition-all shadow-[0_2px_6px_rgba(62,54,48,0.04)] focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(166,123,91,0.15)]"
            />
          </div>
        </div>

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

        <PasswordInput
          label="Password"
          id="password"
          placeholder="••••••••"
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full px-4 py-4 bg-primary text-white rounded-lg text-base font-semibold cursor-pointer transition-all mt-3 shadow-[0_4px_12px_rgba(166,123,91,0.3)] hover:bg-primary-hover hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
        >
          {submitting ? 'Creating account...' : 'Create Account'}
        </button>
      </form>



      <div className="text-center text-[15px] mt-8">
        Already have an account?{' '}
        <Link to="/login" className="text-primary hover:text-primary-hover font-medium transition-colors">
          Log in
        </Link>
      </div>
    </TestimonialAuthLayout>
  );
}
