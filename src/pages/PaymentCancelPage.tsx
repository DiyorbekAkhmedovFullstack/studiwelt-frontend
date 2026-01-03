import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/dashboard';

export function PaymentCancelPage() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div style={{ width: '100%', maxWidth: '672px', margin: '0 auto', textAlign: 'center', paddingTop: '64px', paddingBottom: '64px' }}>
        <div className="bg-surface rounded-xl p-12 shadow-card">
          <div className="w-20 h-20 bg-text-muted/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <h1 className="text-[32px] font-bold mb-4">Payment Cancelled</h1>

          <p className="text-lg text-text-muted mb-8">
            Your payment was cancelled. No charges were made to your account.
          </p>

          <div className="bg-highlight rounded-lg p-6 mb-8">
            <p className="text-sm text-text-muted">
              If you experienced any issues during checkout or have questions about the payment process,
              please don't hesitate to reach out to our support team.
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/upgrade')}
              className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors"
            >
              Try Again
            </button>

            <button
              onClick={() => navigate('/course')}
              className="bg-surface-hover text-text px-8 py-3 rounded-lg font-semibold hover:bg-surface-active transition-colors border border-border"
            >
              Back to Course
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
