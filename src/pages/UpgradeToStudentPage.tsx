import { useState } from 'react';
import { paymentService } from '../services/paymentService';
import { toastService } from '../services/toastService';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { DashboardLayout } from '../components/dashboard';

export function UpgradeToStudentPage() {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const response = await paymentService.createStudentUpgradeSession();

      // Redirect to Stripe Checkout
      window.location.href = response.session.url;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create checkout session';
      toastService.error(message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-[40px] font-bold mb-4">Upgrade to Student</h1>
          <p className="text-lg text-text-muted">
            Unlock full access to all 30 lessons and premium features
          </p>
        </div>

        <div className="bg-surface rounded-xl p-8 shadow-card mb-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Student Access</h2>
              <p className="text-text-muted">One-time payment for lifetime access</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-primary">$49.99</div>
              <div className="text-sm text-text-muted">One-time payment</div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <h3 className="font-semibold text-lg mb-4">What's included:</h3>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <div className="font-semibold">All 30 Lessons</div>
                <div className="text-sm text-text-muted">Complete access to the entire German Studienkolleg bootcamp</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <div className="font-semibold">4 Learning Sections Per Lesson</div>
                <div className="text-sm text-text-muted">Flashcards, Grammar, Reading Comprehension, and C-Tests</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <div className="font-semibold">Progress Tracking</div>
                <div className="text-sm text-text-muted">Track your progress with detailed analytics and scores</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <div className="font-semibold">Lifetime Access</div>
                <div className="text-sm text-text-muted">Learn at your own pace with permanent access to all content</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <div className="font-semibold">Mobile & Desktop Access</div>
                <div className="text-sm text-text-muted">Study anywhere, anytime on any device</div>
              </div>
            </div>
          </div>

          <button
            onClick={handleUpgrade}
            disabled={loading}
            className="w-full bg-primary text-white py-4 rounded-lg font-semibold text-lg hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Upgrade Now'}
          </button>

          <p className="text-center text-sm text-text-muted mt-4">
            Secure payment powered by Stripe • Money-back guarantee
          </p>
        </div>

        <div className="bg-highlight rounded-xl p-6 text-center">
          <p className="text-sm text-text-muted">
            🔒 Your payment information is secure and encrypted. We never store your credit card details.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
