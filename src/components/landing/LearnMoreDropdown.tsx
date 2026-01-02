import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ApplicationIcon = () => (
  <svg className="w-[18px] h-[18px] text-text-muted transition-colors group-hover:text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const EntranceExamIcon = () => (
  <svg className="w-[18px] h-[18px] text-text-muted transition-colors group-hover:text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

const FSPIcon = () => (
  <svg className="w-[18px] h-[18px] text-text-muted transition-colors group-hover:text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
    <polyline points="2 17 12 22 22 17"></polyline>
    <polyline points="2 12 12 17 22 12"></polyline>
  </svg>
);

const BookIcon = () => (
  <svg className="w-[18px] h-[18px] text-text-muted transition-colors group-hover:text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
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

export function LearnMoreDropdown() {
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
        className="flex items-center gap-2 text-text-main font-semibold text-base transition-colors hover:text-primary"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Learn More
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
            className="absolute top-[125%] right-0 w-[240px] bg-white rounded-2xl p-2 z-[100] transition-all duration-200 opacity-100 translate-y-0"
            style={{
              boxShadow: '0 10px 25px -5px rgba(160, 120, 92, 0.25), 0 8px 10px -6px rgba(160, 120, 92, 0.1)'
            }}
            role="menu"
          >
            <Link
              to="/about-studienkolleg"
              onClick={close}
              className="flex items-center gap-3 px-4 py-3 rounded-[10px] text-text-main font-medium text-[15px] transition-colors hover:bg-page hover:text-primary group whitespace-nowrap"
              role="menuitem"
            >
              <BookIcon />
              About Studienkolleg
            </Link>

            <Link
              to="/application"
              onClick={close}
              className="flex items-center gap-3 px-4 py-3 mt-1 rounded-[10px] text-text-main font-medium text-[15px] transition-colors hover:bg-page hover:text-primary group"
              role="menuitem"
            >
              <ApplicationIcon />
              Application
            </Link>

            <Link
              to="/entrance-exam"
              onClick={close}
              className="flex items-center gap-3 px-4 py-3 mt-1 rounded-[10px] text-text-main font-medium text-[15px] transition-colors hover:bg-page hover:text-primary group"
              role="menuitem"
            >
              <EntranceExamIcon />
              Entrance Exam
            </Link>

            <Link
              to="/fsp"
              onClick={close}
              className="flex items-center gap-3 px-4 py-3 mt-1 rounded-[10px] text-text-main font-medium text-[15px] transition-colors hover:bg-page hover:text-primary group"
              role="menuitem"
            >
              <FSPIcon />
              FSP
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
