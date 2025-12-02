import type { ReactNode } from 'react';

type TheoryCardProps = {
  children: ReactNode;
  className?: string;
};

/**
 * A card container for grammar theory sections with consistent styling.
 * Matches the design system from the new HTML template.
 */
export function TheoryCard({ children, className = '' }: TheoryCardProps) {
  return (
    <section
      className={`bg-surface rounded-[24px] shadow-card p-10 mb-10 ${className}`}
    >
      {children}
    </section>
  );
}
