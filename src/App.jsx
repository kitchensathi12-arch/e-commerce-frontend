import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RootRouter from './routes/RootRouter';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const App = () => {
  // ---------------- all hooks start here ----------------
  const queryClient = new QueryClient();
  const { pathname } = useLocation();

  useEffect(() => {
    // Scrolls to top whenever 'someData' changes
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 5000,
          removeDelay: 1000,

          // Default style for all toasts
          style: {
            background: 'linear-gradient(135deg, #d4860b 0%, #f0a830 100%)',
            color: '#fff',
            fontWeight: '500',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(212, 134, 11, 0.35)',
          },

          success: {
            duration: 3000,
            iconTheme: {
              primary: '#fff',
              secondary: '#d4860b',
            },
          },

          error: {
            iconTheme: {
              primary: '#fff',
              secondary: '#d4860b',
            },
          },
        }}
      />

      <RootRouter />
    </QueryClientProvider>
  );
};

export default App;
