import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <>
      <div className="w-full overflow-x-hidden">
        <AppRoutes />
        <Toaster position="top-right" />
      </div>
    </>
  );
};

export default App;
