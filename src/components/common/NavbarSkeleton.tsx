export function NavbarSkeleton() {
  return (
    <nav className="fixed top-0 w-full z-[100] py-5 px-6">
      <div className="max-w-[1100px] mx-auto px-6 py-4 flex justify-between items-center bg-surface/90 backdrop-blur-xl rounded-full border border-[rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(62,54,48,0.06)]">
        {/* Logo */}
        <div className="flex items-center gap-2 font-serif font-black text-xl">
          <img src="/logo-circle-512.png" alt="Studiwelt" className="w-7 h-7 rounded-md" />
          STUDIWELT
        </div>

        {/* Desktop Skeleton */}
        <div className="hidden md:flex items-center gap-8">
          <div className="animate-pulse flex items-center gap-3 bg-surface px-5 pr-2 py-1.5 rounded-full border border-[rgba(0,0,0,0.05)]">
            <div className="h-5 w-32 bg-gray-200 rounded"></div>
            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
            <div className="w-4 h-4 bg-gray-200 rounded ml-1 mr-2"></div>
          </div>
        </div>

        {/* Mobile Menu Button Skeleton */}
        <div className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center">
          <div className="animate-pulse w-9 h-9 rounded-full bg-gray-200"></div>
        </div>
      </div>
    </nav>
  );
}
