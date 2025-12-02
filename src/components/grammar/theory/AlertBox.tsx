import type { ReactNode } from 'react';

type AlertBoxProps = {
  title: string;
  children: ReactNode;
  variant?: 'success' | 'warning' | 'info' | 'danger';
};

/**
 * Alert/notice box with different color variants
 */
export function AlertBox({ title, children, variant = 'info' }: AlertBoxProps) {
  const variants = {
    success: {
      bg: 'bg-[#F4F9F4]',
      border: 'border-[#6B8C6E]',
      titleColor: 'text-[#2D4A30]',
    },
    warning: {
      bg: 'bg-[#FFF9E5]',
      border: 'border-[#D9A441]',
      titleColor: 'text-[#B07D00]',
    },
    info: {
      bg: 'bg-[#FAF6F3]',
      border: 'border-primary',
      titleColor: 'text-primary',
    },
    danger: {
      bg: 'bg-[#FFF5F5]',
      border: 'border-[#C07766]',
      titleColor: 'text-[#C07766]',
    },
  };

  const styles = variants[variant];

  return (
    <div
      className={`${styles.bg} border-l-4 ${styles.border} px-4 py-4 rounded-r-lg text-text-main text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] sm:text-[0.55rem] sm:text-[0.55rem] md:text-[0.6rem] sm:text-[0.5rem] md:text-[0.6rem] sm:text-[0.55rem] sm:text-[0.55rem] md:text-[0.6rem] md:text-[0.75rem] md:text-[0.95rem] mt-6`}
    >
      <span className={`font-bold ${styles.titleColor} block mb-1`}>{title}</span>
      <div className="leading-relaxed">{children}</div>
    </div>
  );
}
