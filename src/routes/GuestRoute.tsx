import type { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

type GuestRouteProps = {
  element: ReactElement;
};

// Full-screen loader matching the Suspense fallback in AppRoutes
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-page">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="mt-4 text-text-muted">Loading...</p>
      </div>
    </div>
  );
}

// Guest-only guard: keeps authenticated users out of auth pages (login/register)
export function GuestRoute({ element }: GuestRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return <PageLoader />;
  }

  if (user) {
    return <Navigate to="/course" replace />;
  }

  return element;
}
