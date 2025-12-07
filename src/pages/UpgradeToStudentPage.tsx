import { useState } from 'react';
import { Link } from 'react-router-dom';
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
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#FFF4E6] text-[#FF9F43] px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
            </svg>
            Limited Time Offer
          </div>
          <h1 className="text-[48px] font-serif font-bold text-text-main mb-4">
            Continue Your Learning Journey
          </h1>
          <p className="text-[18px] text-text-muted max-w-2xl mx-auto leading-relaxed">
            You've started strong with your first week. Now unlock all 30 lessons and complete your Studienkolleg preparation.
          </p>
        </div>

        {/* Main Pricing Card */}
        <div className="bg-surface rounded-[24px] shadow-[0_8px_30px_rgba(62,54,48,0.12)] overflow-hidden mb-8">
          {/* Top Banner */}
          <div className="bg-gradient-to-r from-primary to-[#A8856B] px-8 py-6">
            <div className="text-white">
              <div className="text-[15px] font-medium opacity-90 mb-1">Student Access - Lifetime</div>
              <div className="text-[42px] font-bold leading-none">
                $5<span className="text-[24px] font-medium opacity-90">.00</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-10">
            {/* What You Get */}
            <div className="mb-8">
              <h3 className="text-[20px] font-bold mb-6 text-text-main">What's Included</h3>

              <div className="grid md:grid-cols-2 gap-4">
                <FeatureItem
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                      <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                  }
                  title="30 Complete Lessons"
                  description="Full Studienkolleg preparation course"
                />

                <FeatureItem
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="7" width="20" height="14" rx="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                  }
                  title="120+ Activities"
                  description="Flashcards, Grammar, Reading & C-Tests"
                />

                <FeatureItem
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 6v6l4 2"></path>
                    </svg>
                  }
                  title="Learn at Your Pace"
                  description="No deadlines, study when it suits you"
                />

                <FeatureItem
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  }
                  title="Progress Tracking"
                  description="Monitor your improvement with analytics"
                />

                <FeatureItem
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  }
                  title="Lifetime Access"
                  description="One payment, forever access"
                />

                <FeatureItem
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="3" width="20" height="14" rx="2"></rect>
                      <line x1="8" y1="21" x2="16" y2="21"></line>
                      <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                  }
                  title="All Devices"
                  description="Desktop, tablet, and mobile ready"
                />
              </div>
            </div>

            {/* Upgrade Button */}
            <button
              onClick={handleUpgrade}
              disabled={loading}
              className="w-full bg-primary text-white py-5 rounded-[16px] font-bold text-[17px] hover:bg-primary-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_12px_rgba(166,123,91,0.3)] hover:shadow-[0_6px_20px_rgba(166,123,91,0.4)] hover:-translate-y-0.5 flex items-center justify-center gap-3"
            >
              {loading ? (
                'Processing...'
              ) : (
                <>
                  <span>Start Learning Now</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </>
              )}
            </button>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-6 mt-6 text-sm text-text-muted flex-wrap">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                Secure Payment
              </div>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                SSL Encrypted
              </div>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Instant Access
              </div>
            </div>
          </div>
        </div>

        {/* FAQ / Additional Info */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <InfoCard
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            }
            title="Why $5?"
            description="We believe quality education should be accessible. This one-time fee covers our hosting and keeps the platform running."
          />

          <InfoCard
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            }
            title="Need Help?"
            description="Our support team is here to help you succeed. Reach out anytime at support@studiwelt.com"
          />

          <InfoCard
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="7"></circle>
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
              </svg>
            }
            title="Our Promise"
            description="If you're not satisfied within 7 days, we'll refund your payment—no questions asked."
          />
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link
            to="/course"
            className="inline-flex items-center gap-2 text-text-muted hover:text-text-main transition-colors text-[15px]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"></path>
            </svg>
            Back to Course
          </Link>
        </div>

        <div className="h-16"></div>
      </div>
    </DashboardLayout>
  );
}

// Feature Item Component
interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureItem({ icon, title, description }: FeatureItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-xl bg-[#FAF6F3] flex items-center justify-center flex-shrink-0 text-primary">
        <div className="w-5 h-5">{icon}</div>
      </div>
      <div className="flex-1">
        <div className="font-semibold text-[15px] text-text-main mb-0.5">{title}</div>
        <div className="text-[13px] text-text-muted leading-relaxed">{description}</div>
      </div>
    </div>
  );
}

// Info Card Component
interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function InfoCard({ icon, title, description }: InfoCardProps) {
  return (
    <div className="bg-surface rounded-2xl p-6 shadow-card">
      <div className="w-12 h-12 rounded-xl bg-[#EBF5EC] flex items-center justify-center text-[#6B8C6E] mb-4">
        <div className="w-6 h-6">{icon}</div>
      </div>
      <h4 className="font-bold text-[16px] mb-2">{title}</h4>
      <p className="text-[14px] text-text-muted leading-relaxed">{description}</p>
    </div>
  );
}
