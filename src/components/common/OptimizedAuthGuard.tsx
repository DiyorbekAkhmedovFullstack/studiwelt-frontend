import { useSyncExternalStore } from 'react';

type OptimizedAuthGuardProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

// useSyncExternalStore pattern for detecting client-side rendering
const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * OptimizedAuthGuard renders children immediately and shows fallback only during hydration.
 * This prevents blocking the entire app render while auth state is loading.
 */
export function OptimizedAuthGuard({ children, fallback }: OptimizedAuthGuardProps) {
  // Returns false during SSR, true on client - no extra render needed
  const isClient = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);

  // During SSR, show fallback if provided
  if (!isClient && fallback) {
    return <>{fallback}</>;
  }

  // On client, always show children
  return <>{children}</>;
}
