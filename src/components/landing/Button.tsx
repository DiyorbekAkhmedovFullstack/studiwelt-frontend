import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'white';
  children: ReactNode;
  href?: string;
  asLink?: boolean;
}

export function Button({
  variant = 'primary',
  children,
  className = '',
  href,
  asLink = false,
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 min-h-[44px] rounded-full font-semibold text-sm sm:text-base transition-all duration-300 cursor-pointer whitespace-nowrap';

  const variantClasses = {
    primary: 'bg-text-main text-white hover:bg-primary hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(166,123,91,0.2)]',
    outline: 'border-2 border-text-main/30 text-text-main bg-surface/50 hover:border-text-main hover:bg-surface',
    white: 'bg-surface text-text-main hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(166,123,91,0.15)]',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (asLink && href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
