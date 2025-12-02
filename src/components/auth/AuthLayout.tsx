import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  brandTitle?: string;
  brandSubtitle?: string;
  features?: string[];
}

export function AuthLayout({
  children,
  title,
  subtitle,
  brandTitle = 'STUDIWELT',
  brandSubtitle = 'Your daily space for focused German learning.',
  features = [
    'Syncs progress across all devices',
    'Resume exactly where you left off',
    'Track your improvement in real-time',
  ],
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex bg-surface overflow-hidden">
      {/* Left Panel - Form */}
      <div className="w-full lg:w-[55%] flex flex-col items-center justify-center p-10 relative overflow-y-auto">
        {/* Back to Home Button - Top Left */}
        <Link
          to="/"
          className="absolute top-8 left-8 flex items-center gap-2 text-text-muted text-[14px] font-medium hover:text-text-main transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          Home
        </Link>

        <div className="w-full max-w-[400px]">
          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-[26px] md:text-[32px] font-bold mb-2 text-text-main">{title}</h2>
            <p className="text-text-muted text-[15px] md:text-[17px]">{subtitle}</p>
          </div>

          {/* Form Content */}
          {children}
        </div>
      </div>

      {/* Right Panel - Brand Atmosphere - Hidden on Mobile */}
      <div className="hidden lg:flex lg:w-[45%] bg-page relative flex-col justify-center items-center p-16 overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute w-[500px] h-[500px] top-[-150px] right-[-100px] rounded-full opacity-60 blur-[50px] bg-highlight"></div>
        <div className="absolute w-[300px] h-[300px] bottom-[-50px] left-[-50px] rounded-full opacity-60 blur-[50px] bg-[#E3D4C5]"></div>

        {/* Brand Content */}
        <div className="relative z-10 text-center max-w-[400px]">
          <div className="w-16 h-16 bg-primary rounded-2xl text-white flex items-center justify-center text-3xl mx-auto mb-6 font-serif">
            S
          </div>
          <h2 className="text-[32px] font-bold mb-4">{brandTitle}</h2>
          <p className="text-text-muted text-[18px]">{brandSubtitle}</p>

          {/* Feature List */}
          <div className="mt-8 text-left bg-white/50 backdrop-blur-[10px] p-8 rounded-[24px] shadow-[0_10px_40px_rgba(62,54,48,0.08)]">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 mb-4 last:mb-0 text-[15px] text-text-main">
                <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
