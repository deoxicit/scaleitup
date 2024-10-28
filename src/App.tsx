import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Dashboard } from '@/components/layout/Dashboard';
import { config } from './wagmi';
import { Toaster } from 'sonner';
import { Outlet } from '@tanstack/react-router';

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Dashboard>
          <Outlet />
        </Dashboard>
        <Toaster richColors position="top-right" />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;