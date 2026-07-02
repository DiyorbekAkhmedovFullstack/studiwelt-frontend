import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../../lib/icons';

interface TestimonialAuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  testimonialText?: string;
  testimonialRole?: string;
  testimonialAvatar?: string;
}

export function TestimonialAuthLayout({
  children,
  title,
  subtitle,
  testimonialText = "The daily lessons kept me consistent. Instead of cramming the night before, I actually walked into the Aufnahmeprüfung feeling ready.",
  testimonialRole = "Passed the entrance exam",
  testimonialAvatar = "https://api.dicebear.com/9.x/notionists/svg?seed=studiwelt",
}: TestimonialAuthLayoutProps) {
  return (
    <div className="min-h-screen flex bg-surface overflow-hidden">
      {/* Left Panel - Brand Atmosphere with Testimonial - Hidden on Mobile */}
      <div className="hidden lg:flex lg:w-[45%] bg-page relative flex-col justify-between p-16 overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute w-[400px] h-[400px] top-[-100px] left-[-100px] rounded-full opacity-50 blur-[40px] bg-highlight"></div>
        <div className="absolute w-[300px] h-[300px] bottom-[-50px] right-[-50px] rounded-full opacity-50 blur-[40px] bg-[#E3D4C5]"></div>
        <div className="absolute w-[150px] h-[150px] top-[40%] left-[20%] rounded-full opacity-30 blur-[40px] bg-[#D6Cabb]"></div>

        {/* Brand Header */}
        <Link to="/" className="relative z-10 flex items-center gap-3 font-serif font-black text-2xl text-text-main">
          <div className="w-9 h-9 bg-primary rounded-lg text-white flex items-center justify-center text-lg">
            S
          </div>
          STUDIWELT
        </Link>

        {/* Testimonial */}
        <div className="relative z-10 max-w-[440px]">
          <div className="font-serif text-[64px] text-primary opacity-20 leading-none mb-[-20px]">"</div>
          <p className="text-[22px] leading-[1.5] text-text-main font-medium mb-6">
            {testimonialText}
          </p>

          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full bg-[#ddd] bg-cover bg-center"
              style={{ backgroundImage: `url(${testimonialAvatar})` }}
            ></div>
            <span className="text-[14px] font-medium text-text-muted">{testimonialRole}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-[13px] opacity-60 text-text-muted">
          &copy; 2025 STUDIWELT
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-[55%] flex flex-col items-center justify-center p-10 relative overflow-y-auto bg-surface">
        {/* Back to Home Button - Top Right */}
        <Link
          to="/"
          className="absolute top-8 right-8 flex items-center gap-2 text-text-muted text-[14px] font-medium hover:text-text-main transition-colors"
        >
          <Icon.Home size={18} />
          Home
        </Link>

        <div className="w-full max-w-[420px]">
          {/* Form Header */}
          <div className="mb-10 text-center">
            <h2 className="text-[26px] md:text-[32px] font-bold mb-3 text-text-main">{title}</h2>
            <p className="text-text-muted text-[15px] md:text-[17px]">{subtitle}</p>
          </div>

          {/* Form Content */}
          {children}
        </div>
      </div>
    </div>
  );
}
