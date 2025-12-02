import { AppRoutes } from './routes/AppRoutes';
import { CustomToaster } from './components/common/CustomToast';

function App() {
  return (
    <>
      <AppRoutes />
      <CustomToaster />
    </>
  );
}

export default App;
