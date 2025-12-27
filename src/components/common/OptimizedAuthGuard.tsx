import { useSyncExternalStore } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

type OptimizedAuthGuardProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * OptimizedAuthGuard protects routes by checking authentication state.
 * It handles hydration to prevent flickering and redirects to login if unauthenticated.
 */
export function OptimizedAuthGuard({ children, fallback }: OptimizedAuthGuardProps) {
  const { user, isHydrated } = useAuth();
  const location = useLocation();
  
  const isClient = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);

  // During SSR or before hydration is complete, show fallback
  if ((!isClient || !isHydrated) && fallback) {
    return <>{fallback}</>;
  }

  // If hydration is done and no user is found, redirect to login
  if (isHydrated && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
