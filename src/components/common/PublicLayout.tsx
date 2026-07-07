import { Outlet } from 'react-router-dom';

/**
 * Layout wrapper for public marketing pages.
 * Each page renders its own <LandingNavbar /> and content.
 */
export function PublicLayout() {
  return <Outlet />;
}
