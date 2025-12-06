import { useState, useTransition } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { useAuth } from '../../contexts/AuthContext';
import { useProgress } from '../../contexts/ProgressContext';
import { ProfileDropdown } from '../common/ProfileDropdown';
import { SkeletonProfile } from '../common/SkeletonProfile';

export function LandingNavbar() {
  const { user, isHydrated, logout } = useAuth();
  const { courseProgress } = useProgress();
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const isAuthenticated = !!user;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    closeMobileMenu();
    // Use transition for smooth logout without blocking UI
    startTransition(() => {
      void logout().then(() => {
        navigate('/login');
      });
    });
  };

  const completionPercentage = courseProgress?.overallPercentage || 0;

  return (
    <nav className="fixed top-0 w-full z-[100] py-5 px-6">
      <div className="max-w-[1100px] mx-auto px-6 py-4 flex justify-between items-center bg-surface/90 backdrop-blur-xl rounded-full border border-[rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(62,54,48,0.06)]">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-serif font-black text-xl">
          <img src="/logo-circle-512.png" alt="Studiwelt" className="w-7 h-7 rounded-md" />
          STUDIWELT
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8" style={{ opacity: isPending ? 0.7 : 1, transition: 'opacity 0.2s' }}>
          {/* Show skeleton while hydrating, then show auth state */}
          {!isHydrated ? (
            <SkeletonProfile />
          ) : isAuthenticated ? (
            <ProfileDropdown />
          ) : (
            <>
              <Link to="/login" className="text-[15px] font-medium text-text-main hover:text-primary transition-colors flex items-center">
                Log in
              </Link>
              <Link to="/register" className="flex items-center">
                <Button variant="primary" className="!px-6 !py-2.5 !text-sm">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {!isHydrated ? (
            <div className="animate-pulse w-9 h-9 rounded-full bg-gray-200"></div>
          ) : isAuthenticated && user?.imageUrl ? (
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-primary/20">
              <img
                src={user.imageUrl}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-full h-full object-cover"
              />
            </div>
          ) : isMobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-[100px] left-0 right-0 mx-6 bg-surface/95 backdrop-blur-xl rounded-[24px] border border-[rgba(0,0,0,0.06)] shadow-[0_10px_40px_-10px_rgba(62,54,48,0.15)] p-2 overflow-hidden">
          {isAuthenticated ? (
            <>
              {/* Header Section - same as ProfileDropdown */}
              <div className="px-4 pt-4 pb-5 border-b border-[rgba(0,0,0,0.06)] mb-2">
                <div className="font-serif font-bold text-[17px] mb-0.5">
                  {user?.firstName} {user?.lastName}
                </div>
                <div className="text-[14px] text-text-muted">{user?.email}</div>
              </div>

              {/* Current Course Section - same as ProfileDropdown */}
              <div className="text-[12px] uppercase tracking-wider text-text-muted font-semibold px-4 py-2 mt-2">
                Current Course
              </div>

              <Link
                to="/course"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-colors hover:bg-[#FAF6F3]"
              >
                <div className="w-9 h-9 rounded-lg bg-white border border-[rgba(0,0,0,0.05)] flex items-center justify-center text-primary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                </div>
                <div className="flex-1">
                  <span className="block font-semibold text-[14px] mb-1">German Language</span>
                  <div className="h-1 bg-[rgba(0,0,0,0.05)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${completionPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </Link>

              <div className="h-px bg-[rgba(0,0,0,0.05)] mx-4 my-2"></div>

              {/* Navigation Links - same style as ProfileDropdown */}
              <Link
                to="/profile"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg text-text-main font-medium text-[15px] transition-colors hover:bg-[#F7F7F7]"
              >
                <svg className="text-text-muted w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Profile & Account
              </Link>

              {user?.role === 'USER' && (
                <Link
                  to="/upgrade"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg bg-primary/5 text-primary font-semibold text-[15px] transition-all hover:bg-primary/10 border border-primary/20"
                >
                  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <polyline points="2 17 12 22 22 17"></polyline>
                    <polyline points="2 12 12 17 22 12"></polyline>
                  </svg>
                  Upgrade to Student
                </Link>
              )}

              {user?.role === 'ADMIN' && (
                <Link
                  to="/admin/lessons"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg text-text-main font-medium text-[15px] transition-colors hover:bg-[#F7F7F7]"
                >
                  <svg className="text-text-muted w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <polyline points="2 17 12 22 22 17"></polyline>
                    <polyline points="2 12 12 17 22 12"></polyline>
                  </svg>
                  Admin Panel
                </Link>
              )}

              <div className="h-px bg-[rgba(0,0,0,0.05)] mx-4 my-2"></div>

              {/* Logout - same style as ProfileDropdown */}
              <button
                onClick={() => void handleLogout()}
                className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg text-danger font-medium text-[15px] transition-colors hover:bg-[#FFF5F5] w-[calc(100%-16px)]"
              >
                <svg className="text-danger opacity-70 w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Log Out
              </button>
            </>
          ) : (
            <div className="flex flex-col p-4 gap-3">
              <Link to="/login" onClick={closeMobileMenu} className="block">
                <button className="w-full bg-transparent text-text-main font-medium py-3 px-6 rounded-xl text-sm border border-[rgba(0,0,0,0.1)] transition-all hover:bg-[#F7F7F7] active:scale-[0.98]">
                  Log In
                </button>
              </Link>

              <Link to="/register" onClick={closeMobileMenu} className="block">
                <button className="w-full bg-primary text-white font-semibold py-3.5 px-6 rounded-xl text-sm transition-all hover:bg-primary-hover hover:shadow-lg active:scale-[0.98]">
                  Get Started
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
