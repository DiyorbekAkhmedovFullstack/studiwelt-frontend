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
import { Icon, Ui } from "../../lib/icons";

const MenuIcon = () => <Icon.Menu size={24} />;
const CloseIcon = () => <Ui.Close size={24} />;
const BookIcon = () => <Icon.Curriculum size={18} />;
const ProfileIcon = () => <Icon.User className="text-text-muted w-[18px] h-[18px]" />;
const UpgradeIcon = () => <Icon.Upgrade className="w-[18px] h-[18px]" />;
const AdminIcon = () => <Icon.Settings className="text-text-muted w-[18px] h-[18px]" />;
const LogoutIcon = () => <Icon.Logout className="text-danger opacity-70 w-[18px] h-[18px]" />;
const SignUpIcon = () => <Icon.SignUp size={18} />;
const LoginIcon = () => <Icon.Login className="text-text-muted w-[18px] h-[18px]" />;
const ApplicationIcon = () => <Icon.Application className="w-[18px] h-[18px] text-text-muted" />;
const EntranceExamIcon = () => <Icon.EntranceExam className="w-[18px] h-[18px] text-text-muted" />;
const FSPIcon = () => <Icon.Assessment className="w-[18px] h-[18px] text-text-muted" />;

const AnimatedDownArrow = () => (
  <Ui.ChevronDown
    size={14}
    stroke={2.5}
    className="text-text-muted animate-bounce"
  />
);

const MenuChevron = ({ isOpen }: { isOpen: boolean }) => (
  <Ui.ChevronDown
    stroke={2.5}
    className={`w-4 h-4 text-text-muted transition-transform duration-300 ease-out ${isOpen ? "rotate-180" : ""}`}
  />
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
        <>
          <Link
            to="/admin/lessons"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg text-text-main font-medium text-[15px] transition-colors hover:bg-[#F7F7F7]"
          >
            <AdminIcon />
            {t('nav.adminPanel')}
          </Link>
          <Link
            to="/admin/activation-codes"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg text-text-main font-medium text-[15px] transition-colors hover:bg-[#F7F7F7]"
          >
            <Icon.News className="text-text-muted w-[18px] h-[18px]" />
            Activation Codes
          </Link>
        </>
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
