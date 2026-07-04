import { Suspense } from 'react';
import { AppRoutes } from './routes/AppRoutes';
import { CustomToaster } from './components/common/CustomToast';
import { NavbarSkeleton } from './components/common/NavbarSkeleton';
import { ErrorBoundaryWithAuth } from './components/common/ErrorBoundary';
import { SkipLink } from './components/common/SkipLink';
import { LanguagePromptBanner } from './components/common/LanguagePromptBanner';

function App() {
  return (
    <ErrorBoundaryWithAuth>
      <SkipLink />
      <Suspense fallback={<NavbarSkeleton />}>
        <AppRoutes />
      </Suspense>
      <CustomToaster />
      <LanguagePromptBanner />
    </ErrorBoundaryWithAuth>
  );
}

export default App;
