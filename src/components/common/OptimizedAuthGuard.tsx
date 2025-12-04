import { useEffect, useState } from 'react';

type OptimizedAuthGuardProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

/**
 * OptimizedAuthGuard renders children immediately and shows fallback only during hydration.
 * This prevents blocking the entire app render while auth state is loading.
 */
export function OptimizedAuthGuard({ children, fallback }: OptimizedAuthGuardProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content immediately after first render
    setShowContent(true);
  }, []);

  // During SSR or first render, show fallback if provided
  if (!showContent && fallback) {
    return <>{fallback}</>;
  }

  // After hydration completes, always show children
  return <>{children}</>;
}
