import { Icon } from '../../lib/icons';

type StudienkollegHeaderProps = {
  name: string;
  location: string;
  institutionType: string;
  badge: string;
};

export function StudienkollegHeader({
  name,
  location,
  institutionType,
  badge,
}: StudienkollegHeaderProps) {
  return (
    <div className="bg-surface rounded-[24px] shadow-card border border-[rgba(0,0,0,0.02)] p-10">
      {/* Badge */}
      <div className="mb-4">
        <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide">
          {badge}
        </span>
      </div>

      {/* Header Content */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="flex-1">
          <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl font-bold text-text-main mb-4 leading-tight break-words">
            {name}
          </h1>
          <div className="flex flex-wrap gap-4 text-text-muted text-sm font-medium">
            <span className="flex items-center gap-2">
              <Icon.Location size={16} />
              {location}
            </span>
            <span className="flex items-center gap-2">
              <Icon.University size={16} />
              {institutionType}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
