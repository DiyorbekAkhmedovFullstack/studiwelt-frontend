import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { paymentService } from '../services/paymentService';
import { toastService } from '../services/toastService';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { DashboardLayout } from '../components/dashboard';

export function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      toastService.error('Invalid payment session');
      navigate('/course');
      return;
    }

    // Give webhook a moment to process (webhook usually arrives before redirect)
    const timer = setTimeout(async () => {
      try {
        // Check if user now has student access
        const response = await paymentService.hasStudentAccess();

        if (response.hasPaid) {
          setVerified(true);
          toastService.success('Payment successful! You now have full access to all lessons.', { duration: 5000 });

          // Redirect to course page after showing success message
          setTimeout(() => {
            navigate('/course');
          }, 3000);
        } else {
          // Payment might still be processing
          toastService.info('Payment is being processed. Please refresh in a moment.', { duration: 5000 });
          setVerified(true);
          setTimeout(() => {
            navigate('/course');
          }, 3000);
        }
      } catch (error) {
        toastService.error('Failed to verify payment status');
        navigate('/course');
      } finally {
        setVerifying(false);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [searchParams, navigate]);

  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-text-muted">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="bg-surface rounded-xl p-12 shadow-card">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-[32px] font-bold mb-4">Payment Successful!</h1>

          <p className="text-lg text-text-muted mb-8">
            {verified
              ? 'Your account has been upgraded to Student. You now have lifetime access to all 30 lessons!'
              : 'Your payment is being processed. This may take a few moments.'}
          </p>

          <div className="bg-highlight rounded-lg p-6 mb-8">
            <h2 className="font-semibold mb-3">What's Next?</h2>
            <ul className="text-left space-y-2 text-sm text-text-muted">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Access all 30 lessons and 120 learning sections</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Track your progress with detailed analytics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Practice with flashcards, grammar, reading, and C-tests</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Learn at your own pace with lifetime access</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => navigate('/course')}
            className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors"
          >
            Start Learning
          </button>

          <p className="text-sm text-text-muted mt-6">
            Redirecting you to the course page in a moment...
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
