import { useState, useRef, useEffect, useTransition } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { useProgress } from '../../contexts/ProgressContext';

export function ProfileDropdown() {
  const { t } = useTranslation('common');
  const { user, logout } = useAuth();
  const { courseProgress, isPending: isProgressPending } = useProgress();
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsOpen(false);
    // Use transition for smooth logout
    startTransition(() => {
      void logout().then(() => {
        navigate('/login');
      });
    });
  };

  const avatarUrl =
    user?.imageUrl ||
    `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(
      user?.firstName || 'User',
    )}`;
  const completionPercentage = courseProgress?.overallPercentage || 0;

  return (
    <div ref={menuRef} className={`relative z-[100] ${isOpen ? 'active' : ''}`} style={{ opacity: isPending || isProgressPending ? 0.7 : 1, transition: 'opacity 0.2s' }}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-surface px-5 pr-2 py-1.5 rounded-full border border-[rgba(0,0,0,0.05)] cursor-pointer transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:bg-white hover:shadow-[0_4px_12px_rgba(62,54,48,0.08)] hover:-translate-y-0.5"
      >
        <div className="font-semibold text-[15px] text-text-main">
          {user?.firstName} {user?.lastName}
        </div>
        <div className="w-10 h-10 rounded-full bg-[#E3D4C5] border-2 border-white shadow-[0_2px_5px_rgba(0,0,0,0.05)] overflow-hidden">
          <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <svg
          className={`text-text-muted ml-1 mr-2 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown Panel */}
      <div
        className={`absolute top-[calc(100%+16px)] right-0 w-80 bg-surface rounded-[24px] shadow-[0_10px_40px_-10px_rgba(62,54,48,0.15)] p-2 border border-[rgba(0,0,0,0.06)] transition-all duration-200 ${isOpen
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto visible'
          : 'opacity-0 -translate-y-2.5 scale-98 pointer-events-none invisible'
          }`}
      >
        {/* Header Section */}
        <div className="px-4 pt-4 pb-5 border-b border-[rgba(0,0,0,0.06)] mb-2">
          <div className="font-serif font-bold text-[17px] mb-0.5">
            {user?.firstName} {user?.lastName}
          </div>
          <div className="text-[14px] text-text-muted">{user?.email}</div>
        </div>

        {/* Current Course Section */}
        <div className="text-[12px] uppercase tracking-wider text-text-muted font-semibold px-4 py-2 mt-2">
          {t('nav.currentCourse')}
        </div>

        <Link
          to="/course"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-colors hover:bg-[#FAF6F3]"
        >
          <div className="w-9 h-9 rounded-lg bg-white border border-[rgba(0,0,0,0.05)] flex items-center justify-center text-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
          </div>
          <div className="flex-1">
            <span className="block font-semibold text-[14px] mb-1">{t('nav.germanLanguage')}</span>
            <div className="h-1 bg-[rgba(0,0,0,0.05)] rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>
        </Link>

        <div className="h-px bg-[rgba(0,0,0,0.05)] mx-4 my-2"></div>

        {/* Navigation Links */}
        <Link
          to="/profile"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg text-text-main font-medium text-[15px] transition-colors hover:bg-[#F7F7F7]"
        >
          <svg className="text-text-muted w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          {t('nav.profileAccount')}
        </Link>

        {user?.role === 'USER' && (
          <Link
            to="/upgrade"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg bg-primary/5 text-primary font-semibold text-[15px] transition-all hover:bg-primary/10 border border-primary/20"
          >
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
            {t('nav.upgradeToStudent')}
          </Link>
        )}

        {user?.role === 'ADMIN' && (
          <Link
            to="/admin/lessons"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg text-text-main font-medium text-[15px] transition-colors hover:bg-[#F7F7F7]"
          >
            <svg className="text-text-muted w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
            {t('nav.adminPanel')}
          </Link>
        )}

        <div className="h-px bg-[rgba(0,0,0,0.05)] mx-4 my-2"></div>

        {/* Logout */}
        <button
          onClick={() => void handleLogout()}
          className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg text-danger font-medium text-[15px] transition-colors hover:bg-[#FFF5F5] w-[calc(100%-16px)]"
        >
          <svg className="text-danger opacity-70 w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          {t('nav.logOut')}
        </button>
      </div>
    </div>
  );
}
