import { useState, useTransition } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../contexts/AuthContext";
import { useProgress } from "../../contexts/ProgressContext";
import { ProfileDropdown } from "../common/ProfileDropdown";
import { SkeletonProfile } from "../common/SkeletonProfile";
import { GetStartedDropdown } from "./GetStartedDropdown";
import { LearnMoreDropdown } from "./LearnMoreDropdown";
import { LanguageSwitcher } from "../common/LanguageSwitcher";

const MenuIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const BookIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

const ProfileIcon = () => (
  <svg
    className="text-text-muted w-[18px] h-[18px]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const UpgradeIcon = () => (
  <svg
    className="w-[18px] h-[18px]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
    <polyline points="2 17 12 22 22 17"></polyline>
    <polyline points="2 12 12 17 22 12"></polyline>
  </svg>
);

const LogoutIcon = () => (
  <svg
    className="text-danger opacity-70 w-[18px] h-[18px]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

const SignUpIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="8.5" cy="7" r="4"></circle>
    <line x1="20" y1="8" x2="20" y2="14"></line>
    <line x1="23" y1="11" x2="17" y2="11"></line>
  </svg>
);

const LoginIcon = () => (
  <svg
    className="text-text-muted w-[18px] h-[18px]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
    <polyline points="10 17 15 12 10 7"></polyline>
    <line x1="15" y1="12" x2="3" y2="12"></line>
  </svg>
);

const ApplicationIcon = () => (
  <svg
    className="w-[18px] h-[18px] text-text-muted"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const EntranceExamIcon = () => (
  <svg
    className="w-[18px] h-[18px] text-text-muted"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 11l3 3L22 4"></path>
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
  </svg>
);

const FSPIcon = () => (
  <svg
    className="w-[18px] h-[18px] text-text-muted"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
    <polyline points="2 17 12 22 22 17"></polyline>
    <polyline points="2 12 12 17 22 12"></polyline>
  </svg>
);

const AnimatedDownArrow = () => (
  <svg
    className="w-3.5 h-3.5 text-text-muted animate-bounce"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const MenuChevron = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    className={`w-4 h-4 text-text-muted transition-transform duration-300 ease-out ${isOpen ? "rotate-180" : ""}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

export function LandingNavbar() {
  const { user, isHydrated, logout } = useAuth();
  const { courseProgress } = useProgress();
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const isAuthenticated = !!user;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = async () => {
    closeMobileMenu();
    startTransition(() => {
      void logout().then(() => {
        navigate("/login");
      });
    });
  };

  const completionPercentage = courseProgress?.overallPercentage || 0;

  return (
    <nav className="fixed top-0 w-full z-100 py-5 px-6">
      <div className="max-w-[1100px] mx-auto px-6 py-4 flex justify-between items-center bg-surface/90 backdrop-blur-xl rounded-full border border-[rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(62,54,48,0.06)]">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-serif font-black text-xl"
        >
          <img
            src="/logo-circle-512.png"
            alt="Studiwelt"
            className="w-7 h-7 rounded-md"
          />
          STUDIWELT
        </Link>

        {/* Desktop Navigation */}
        <div
          className="hidden md:flex items-center gap-8"
          style={{ opacity: isPending ? 0.7 : 1, transition: "opacity 0.2s" }}
        >
          {!isHydrated ? (
            <SkeletonProfile />
          ) : isAuthenticated ? (
            <>
              <LearnMoreDropdown />
              <LanguageSwitcher />
              <ProfileDropdown />
            </>
          ) : (
            <>
              <LearnMoreDropdown />
              <LanguageSwitcher />
              <GetStartedDropdown />
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden min-h-11 flex items-center gap-1.5 justify-center"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {!isHydrated ? (
            <div className="animate-pulse w-9 h-9 rounded-full bg-gray-200"></div>
          ) : isAuthenticated && user?.imageUrl ? (
            <>
              <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-primary/20">
                <img
                  src={user.imageUrl}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <MenuChevron isOpen={isMobileMenuOpen} />
            </>
          ) : (
            <>
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              <MenuChevron isOpen={isMobileMenuOpen} />
            </>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-[100px] left-0 right-0 mx-6 bg-surface/95 backdrop-blur-xl rounded-[24px] border border-[rgba(0,0,0,0.06)] shadow-[0_10px_40px_-10px_rgba(62,54,48,0.15)] p-2 overflow-hidden">
          {isAuthenticated ? (
            <AuthenticatedMobileMenu
              user={user}
              completionPercentage={completionPercentage}
              onClose={closeMobileMenu}
              onLogout={handleLogout}
            />
          ) : (
            <GuestMobileMenu onClose={closeMobileMenu} />
          )}
        </div>
      )}
    </nav>
  );
}

interface AuthenticatedMobileMenuProps {
  user: NonNullable<ReturnType<typeof useAuth>["user"]>;
  completionPercentage: number;
  onClose: () => void;
  onLogout: () => void;
}

function AuthenticatedMobileMenu({
  user,
  completionPercentage,
  onClose,
  onLogout,
}: AuthenticatedMobileMenuProps) {
  const { t } = useTranslation('common');
  return (
    <>
      {/* Header Section */}
      <div className="px-4 pt-4 pb-5 border-b border-[rgba(0,0,0,0.06)] mb-2">
        <div className="font-serif font-bold text-[17px] mb-0.5">
          {user.firstName} {user.lastName}
        </div>
        <div className="text-[14px] text-text-muted">{user.email}</div>
      </div>

      {/* Current Course Section */}
      <div className="text-[12px] uppercase tracking-wider text-text-muted font-semibold px-4 py-2 mt-2">
        {t('nav.currentCourse')}
      </div>

      <Link
        to="/course"
        onClick={onClose}
        className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-colors hover:bg-[#FAF6F3]"
      >
        <div className="w-9 h-9 rounded-lg bg-white border border-border-soft flex items-center justify-center text-primary">
          <BookIcon />
        </div>
        <div className="flex-1">
          <span className="block font-semibold text-[14px] mb-1">
            {t('nav.germanLanguage')}
          </span>
          <div className="h-1 bg-border-soft rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>
      </Link>

      <div className="h-px bg-border-soft mx-4 my-2"></div>

      {/* Navigation Links */}
      <Link
        to="/profile"
        onClick={onClose}
        className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg text-text-main font-medium text-[15px] transition-colors hover:bg-[#F7F7F7]"
      >
        <ProfileIcon />
        {t('nav.profileAccount')}
      </Link>

      {user.role === "USER" && (
        <Link
          to="/upgrade"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg bg-primary/5 text-primary font-semibold text-[15px] transition-all hover:bg-primary/10 border border-primary/20"
        >
          <UpgradeIcon />
          {t('nav.upgradeToStudent')}
        </Link>
      )}

      {user.role === "ADMIN" && (
        <Link
          to="/admin/lessons"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg text-text-main font-medium text-[15px] transition-colors hover:bg-[#F7F7F7]"
        >
          <UpgradeIcon />
          {t('nav.adminPanel')}
        </Link>
      )}

      <div className="h-px bg-border-soft mx-4 my-2"></div>

      {/* Learn More Section */}
      <div className="flex items-center gap-2 text-[12px] uppercase tracking-wider text-text-muted font-semibold px-4 py-2">
        {t('nav.learnMore')}
        <AnimatedDownArrow />
      </div>

      <Link
        to="/about-studienkolleg"
        onClick={onClose}
        className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg text-text-main font-medium text-[15px] transition-colors hover:bg-[#F7F7F7]"
      >
        <BookIcon />
        {t('nav.aboutStudienkolleg')}
      </Link>

      <Link
        to="/application"
        onClick={onClose}
        className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg text-text-main font-medium text-[15px] transition-colors hover:bg-[#F7F7F7]"
      >
        <ApplicationIcon />
        {t('nav.application')}
      </Link>

      <Link
        to="/entrance-exam"
        onClick={onClose}
        className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg text-text-main font-medium text-[15px] transition-colors hover:bg-[#F7F7F7]"
      >
        <EntranceExamIcon />
        {t('nav.entranceExam')}
      </Link>

      <Link
        to="/fsp"
        onClick={onClose}
        className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg text-text-main font-medium text-[15px] transition-colors hover:bg-[#F7F7F7]"
      >
        <FSPIcon />
        {t('nav.fsp')}
      </Link>

      <div className="h-px bg-border-soft mx-4 my-2"></div>

      {/* Language Switcher */}
      <div className="px-4 py-2">
        <LanguageSwitcher />
      </div>

      <div className="h-px bg-border-soft mx-4 my-2"></div>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg text-danger font-medium text-[15px] transition-colors hover:bg-[#FFF5F5] w-[calc(100%-16px)]"
      >
        <LogoutIcon />
        {t('nav.logOut')}
      </button>
    </>
  );
}

interface GuestMobileMenuProps {
  onClose: () => void;
}

function GuestMobileMenu({ onClose }: GuestMobileMenuProps) {
  const { t } = useTranslation('common');
  return (
    <>
      {/* Header Section */}
      <div className="px-4 pt-4 pb-5 border-b border-[rgba(0,0,0,0.06)] mb-2">
        <div className="font-serif font-bold text-[17px] mb-0.5">
          {t('nav.welcomeTitle')}
        </div>
        <div className="text-[14px] text-text-muted">
          {t('nav.welcomeSubtitle')}
        </div>
      </div>

      {/* Navigation Section */}
      <div className="text-[12px] uppercase tracking-wider text-text-muted font-semibold px-4 py-2 mt-2">
        {t('nav.getStarted')}
      </div>

      {/* Register Link - Primary Action */}
      <Link
        to="/register"
        onClick={onClose}
        className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg bg-primary/5 text-primary font-semibold text-[15px] transition-all hover:bg-primary/10 border border-primary/20"
      >
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          <SignUpIcon />
        </div>
        <div className="flex-1">
          <span className="block">{t('nav.createAccount')}</span>
          <span className="block text-[12px] text-primary/70 font-normal">
            {t('nav.freeToStart')}
          </span>
        </div>
      </Link>

      {/* Login Link */}
      <Link
        to="/login"
        onClick={onClose}
        className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg text-text-main font-medium text-[15px] transition-colors hover:bg-[#F7F7F7]"
      >
        <LoginIcon />
        {t('nav.alreadyHaveAccount')}
      </Link>

      <div className="h-px bg-border-soft mx-4 my-2"></div>

      {/* Additional Info Section */}
      <div className="flex items-center gap-2 text-[12px] uppercase tracking-wider text-text-muted font-semibold px-4 py-2">
        {t('nav.learnMore')}
        <AnimatedDownArrow />
      </div>

      <Link
        to="/about-studienkolleg"
        onClick={onClose}
        className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg text-text-main font-medium text-[15px] transition-colors hover:bg-[#F7F7F7]"
      >
        <BookIcon />
        {t('nav.aboutStudienkolleg')}
      </Link>

      <Link
        to="/application"
        onClick={onClose}
        className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg text-text-main font-medium text-[15px] transition-colors hover:bg-[#F7F7F7]"
      >
        <ApplicationIcon />
        {t('nav.application')}
      </Link>

      <Link
        to="/entrance-exam"
        onClick={onClose}
        className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg text-text-main font-medium text-[15px] transition-colors hover:bg-[#F7F7F7]"
      >
        <EntranceExamIcon />
        {t('nav.entranceExam')}
      </Link>

      <Link
        to="/fsp"
        onClick={onClose}
        className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg text-text-main font-medium text-[15px] transition-colors hover:bg-[#F7F7F7]"
      >
        <FSPIcon />
        {t('nav.fsp')}
      </Link>

      <div className="h-px bg-border-soft mx-4 my-2"></div>

      {/* Language Switcher */}
      <div className="px-4 py-2">
        <LanguageSwitcher />
      </div>
    </>
  );
}
