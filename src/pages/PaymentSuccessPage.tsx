import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { paymentService } from '../services/paymentService';
import { toastService } from '../services/toastService';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Icon } from '../lib/icons';

export function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    // Dodo appends ?status=...&payment_id=... to the return URL.
    const paymentId = searchParams.get('payment_id');
    const status = searchParams.get('status');

    if (!paymentId && !status) {
      toastService.error('Invalid payment session');
      navigate('/course');
      return;
    }

    // Give the webhook a moment to process (it usually arrives before the redirect).
    const timer = setTimeout(async () => {
      try {
        const response = await paymentService.hasStudentAccess();
        setVerified(response.hasPaid);
        if (response.hasPaid) {
          toastService.success('Payment successful! You now have full access to all lessons.', { duration: 5000 });
        } else {
          toastService.info('Payment is being processed. Please refresh in a moment.', { duration: 5000 });
        }
      } catch {
        toastService.error('Failed to verify payment status');
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
    <div className="min-h-screen flex items-center justify-center bg-page p-4 relative overflow-hidden">
      {/* Background decoration circles */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[#EBE5DA] -top-[100px] -left-[100px] blur-[60px] opacity-60 -z-10"></div>
      <div className="absolute w-[300px] h-[300px] rounded-full bg-[#E3D4C5] -bottom-[50px] -right-[50px] blur-[60px] opacity-60 -z-10"></div>

      <div className="w-full max-w-[520px] bg-surface rounded-[24px] shadow-[0_10px_40px_rgba(62,54,48,0.08)] p-12 text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-[#F0F7F1] rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon.Success className="h-10 w-10 text-success" stroke={2.5} />
        </div>

        {/* Message */}
        <h1 className="mb-4 text-[28px] font-serif font-bold text-text-main">
          Payment Successful!
        </h1>
        <p className="mb-8 text-[16px] text-text-muted leading-relaxed max-w-[400px] mx-auto">
          {verified
            ? 'Your account has been upgraded to Student. You now have lifetime access to all 30 lessons!'
            : 'Your payment is being processed. This may take a few moments — refresh if access is not active yet.'}
        </p>

        {/* What's next */}
        <div className="mb-8 rounded-xl bg-highlight p-6 border border-border text-left">
          <h2 className="font-semibold text-text-main mb-3">What's Next?</h2>
          <ul className="space-y-2 text-sm text-text-muted">
            {[
              'Access all 30 lessons and 120 learning sections',
              'Track your progress with detailed analytics',
              'Practice with flashcards, grammar, reading, and C-tests',
              'Learn at your own pace with lifetime access',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Manual continue — no auto-redirect, let the user read first */}
        <button
          type="button"
          onClick={() => navigate('/course')}
          className="w-full px-4 py-4 bg-primary text-white rounded-lg text-base font-semibold cursor-pointer transition-all shadow-[0_4px_12px_rgba(166,123,91,0.3)] hover:bg-primary-hover hover:-translate-y-0.5"
        >
          Start Learning
        </button>
      </div>
    </div>
  );
}
