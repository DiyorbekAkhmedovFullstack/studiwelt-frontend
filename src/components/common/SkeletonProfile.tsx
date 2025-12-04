export function SkeletonProfile() {
  return (
    <div className="flex items-center gap-3 bg-surface px-5 pr-2 py-1.5 rounded-full border border-[rgba(0,0,0,0.05)] animate-pulse">
      <div className="h-5 w-32 bg-gray-200 rounded"></div>
      <div className="w-10 h-10 rounded-full bg-gray-200"></div>
      <div className="w-4 h-4 bg-gray-200 rounded ml-1 mr-2"></div>
    </div>
  );
}
