import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RootRouter from './routes/RootRouter';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const App = () => {
  const queryClient = new QueryClient();
  const { pathname } = useLocation();
    useEffect(() => {
      // Scrolls to top whenever 'someData' changes
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [pathname]); 
  return (
    <QueryClientProvider client={queryClient}>
      <RootRouter />
    </QueryClientProvider>
  );
};

export default App;
