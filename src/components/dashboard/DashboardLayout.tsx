import { LandingNavbar } from '../landing/LandingNavbar';
import type { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-page">
      {/* Navbar */}
      <LandingNavbar />

      {/* Main Content with top padding to account for fixed navbar */}
      <main id="main-content" className="pt-20">
        <div className="max-w-[1100px] mx-auto px-6 py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
