import type { ReactNode } from 'react';

interface StatCardProps {
  icon: ReactNode;
  value: string | number;
  label: string;
  iconBgColor?: string;
  iconColor?: string;
}

export function StatCard({
  icon,
  value,
  label,
  iconBgColor = 'var(--accent-subtle)',
  iconColor = 'var(--accent-primary)',
}: StatCardProps) {
  return (
    <div className="bg-surface p-6 rounded-[24px] shadow-card flex items-center gap-5">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{ backgroundColor: iconBgColor, color: iconColor }}
      >
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold font-serif text-text-main">{value}</div>
        <div className="text-[13px] text-text-muted uppercase tracking-wider mt-1">
          {label}
        </div>
      </div>
    </div>
  );
}
