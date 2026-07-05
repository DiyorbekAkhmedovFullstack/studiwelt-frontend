import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';

/**
 * Layout wrapper for public marketing pages.
 * Renders the routed page, then a shared site footer beneath it.
 * Each page still renders its own <LandingNavbar />.
 */
export function PublicLayout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}
