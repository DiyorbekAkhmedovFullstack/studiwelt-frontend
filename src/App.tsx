import { Suspense } from 'react';
import { AppRoutes } from './routes/AppRoutes';
import { CustomToaster } from './components/common/CustomToast';
import { NavbarSkeleton } from './components/common/NavbarSkeleton';

function App() {
  return (
    <>
      <Suspense fallback={<NavbarSkeleton />}>
        <AppRoutes />
      </Suspense>
      <CustomToaster />
    </>
  );
}

export default App;
