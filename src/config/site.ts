import { 
    LayoutDashboard, 
    Wallet, 
    Users, 
    FileText, 
    Receipt,
    LucideIcon
  } from 'lucide-react';
  
  interface NavItem {
    title: string;
    href: string;
    icon: LucideIcon;
  }
  
  export const siteConfig = {
    name: "ScaleItUp",
    description: "Complete Web3 toolkit for small businesses",
    navigation: [
      {
        title: "Dashboard",
        href: "/",
        icon: LayoutDashboard
      },
      {
        title: "Payments",
        href: "/payments",
        icon: Wallet
      },
      {
        title: "Employees",
        href: "/employees",
        icon: Users
      },
      {
        title: "Invoices",
        href: "/invoices",
        icon: FileText
      },
      {
        title: "Expenses",
        href: "/expenses",
        icon: Receipt
      }
    ] as NavItem[]
  };
  