import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function Dashboard({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header onMenuClick={toggleSidebar} />

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} />
        
        {/* Backdrop */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/10 transition-opacity lg:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Main Content */}
        <main 
          className={cn(
            "flex-1 w-full transition-all duration-200 ease-in-out",
            isSidebarOpen ? "lg:pl-64" : "pl-0"
          )}
        >
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}