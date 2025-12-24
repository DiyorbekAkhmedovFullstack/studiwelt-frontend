import { useState, useRef, useEffect, type ReactNode } from 'react';

export interface DropdownItem {
  label: string;
  icon?: ReactNode;
  to?: string;
  onClick?: () => void;
  className?: string;
}

interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
  width?: string;
  className?: string;
}

export function Dropdown({
  trigger,
  items,
  align = 'right',
  width = 'w-[220px]',
  className = '',
}: DropdownProps) {
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

  const handleItemClick = (item: DropdownItem) => {
    if (item.onClick) {
      item.onClick();
    }
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="flex items-center"
      >
        {trigger}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[90]"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <div
            className={`absolute top-[125%] ${align === 'right' ? 'right-0' : 'left-0'} ${width} bg-white rounded-2xl p-2 z-[100] transition-all duration-200 opacity-100 translate-y-0`}
            style={{
              boxShadow: '0 10px 25px -5px rgba(160, 120, 92, 0.25), 0 8px 10px -6px rgba(160, 120, 92, 0.1)'
            }}
            role="menu"
          >
            {items.map((item, index) => {
              const baseClasses = 'flex items-center gap-3 px-4 py-3 rounded-[10px] text-text-main font-medium text-[15px] transition-colors hover:bg-page hover:text-primary group w-full text-left';
              const itemClasses = item.className ? `${baseClasses} ${item.className}` : baseClasses;

              if (item.to) {
                return (
                  <a
                    key={index}
                    href={item.to}
                    className={`${itemClasses} ${index > 0 ? 'mt-1' : ''}`}
                    role="menuitem"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon && (
                      <span className="w-[18px] h-[18px] text-text-muted transition-colors group-hover:text-primary">
                        {item.icon}
                      </span>
                    )}
                    {item.label}
                  </a>
                );
              }

              return (
                <button
                  key={index}
                  onClick={() => handleItemClick(item)}
                  className={`${itemClasses} ${index > 0 ? 'mt-1' : ''}`}
                  role="menuitem"
                >
                  {item.icon && (
                    <span className="w-[18px] h-[18px] text-text-muted transition-colors group-hover:text-primary">
                      {item.icon}
                    </span>
                  )}
                  {item.label}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
