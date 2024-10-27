import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  DollarSign,
  Settings 
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
    { name: 'Employees', icon: Users, href: '/employees' },
    { name: 'Invoices', icon: FileText, href: '/invoices' },
    { name: 'Expenses', icon: DollarSign, href: '/expenses' },
    { name: 'Settings', icon: Settings, href: '/settings' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-background border-r">
        <div className="h-16 flex items-center px-6">
          <h1 className="text-xl font-bold">ScaleItUp</h1>
        </div>
        <nav className="p-4">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1">
        <header className="h-16 border-b flex items-center px-6">
          <h2 className="text-lg font-semibold">Dashboard</h2>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;