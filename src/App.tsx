import { Suspense } from 'react';
import { AppRoutes } from './routes/AppRoutes';
import { CustomToaster } from './components/common/CustomToast';
import { NavbarSkeleton } from './components/common/NavbarSkeleton';
import { ErrorBoundary } from './components/common/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<NavbarSkeleton />}>
        <AppRoutes />
      </Suspense>
      <CustomToaster />
    </ErrorBoundary>
  );
}

export default App;
