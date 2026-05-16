import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RootRouter from './routes/RootRouter';

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RootRouter />
    </QueryClientProvider>
  );
};

export default App;
