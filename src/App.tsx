import { Suspense } from 'react';
import { AppRoutes } from './routes/AppRoutes';
import { CustomToaster } from './components/common/CustomToast';
import { NavbarSkeleton } from './components/common/NavbarSkeleton';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { SkipLink } from './components/common/SkipLink';

function App() {
  return (
    <ErrorBoundary>
      <SkipLink />
      <Suspense fallback={<NavbarSkeleton />}>
        <AppRoutes />
      </Suspense>
      <CustomToaster />
    </ErrorBoundary>
  );
}

export default App;
