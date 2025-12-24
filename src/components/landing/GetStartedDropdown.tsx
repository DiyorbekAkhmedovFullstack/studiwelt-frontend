import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SignUpIcon = () => (
  <svg className="w-[18px] h-[18px] text-text-muted transition-colors group-hover:text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="8.5" cy="7" r="4"></circle>
    <line x1="20" y1="8" x2="20" y2="14"></line>
    <line x1="23" y1="11" x2="17" y2="11"></line>
  </svg>
);

const LoginIcon = () => (
  <svg className="w-[18px] h-[18px] text-text-muted transition-colors group-hover:text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
    <polyline points="10 17 15 12 10 7"></polyline>
    <line x1="15" y1="12" x2="3" y2="12"></line>
  </svg>
);

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

export function GetStartedDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const close = () => setIsOpen(false);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-full text-base transition-all hover:bg-primary-hover shadow-[0_4px_12px_rgba(160,120,92,0.3)] active:scale-[0.98]"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Get Started
        <ChevronIcon isOpen={isOpen} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[90]"
            onClick={close}
            aria-hidden="true"
          />

          <div
            className="absolute top-[125%] right-0 w-[220px] bg-white rounded-2xl p-2 z-[100] transition-all duration-200 opacity-100 translate-y-0"
            style={{
              boxShadow: '0 10px 25px -5px rgba(160, 120, 92, 0.25), 0 8px 10px -6px rgba(160, 120, 92, 0.1)'
            }}
            role="menu"
          >
            <Link
              to="/register"
              onClick={close}
              className="flex items-center gap-3 px-4 py-3 rounded-[10px] text-text-main font-medium text-[15px] transition-colors hover:bg-page hover:text-primary group"
              role="menuitem"
            >
              <SignUpIcon />
              Sign Up
            </Link>

            <Link
              to="/login"
              onClick={close}
              className="flex items-center gap-3 px-4 py-3 mt-1 rounded-[10px] text-text-main font-medium text-[15px] transition-colors hover:bg-page hover:text-primary group"
              role="menuitem"
            >
              <LoginIcon />
              Log In
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
