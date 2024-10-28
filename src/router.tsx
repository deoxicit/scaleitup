import { Router, Route, RootRoute, Outlet } from '@tanstack/react-router';
import { DashboardPage } from '@/pages/DashboardPage';
import { PaymentPage } from '@/pages/PaymentPage';
import { EmployeesPage } from '@/pages/EmployeesPage';
import { InvoicesPage } from '@/pages/InvoicesPage';
import { ExpensesPage } from '@/pages/ExpensesPage';
import { Dashboard } from '@/components/layout/Dashboard';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from './wagmi';
import { Toaster } from 'sonner';

const queryClient = new QueryClient();

function Layout() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Dashboard>
          <Outlet />
        </Dashboard>
        <Toaster richColors />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

// Define the root route
const rootRoute = new RootRoute({
  component: Layout,
});

// Define child routes using path only
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: DashboardPage,
});

const paymentRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/payments',
  component: PaymentPage,
});

const employeesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/employees',
  component: EmployeesPage,
});

const invoicesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/invoices',
  component: InvoicesPage,
});

const expensesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/expenses',
  component: ExpensesPage,
});

// Create the route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  paymentRoute,
  employeesRoute,
  invoicesRoute,
  expensesRoute,
]);

// Create the router
export const router = new Router({ 
  routeTree,
  defaultPreload: 'intent',
});

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}