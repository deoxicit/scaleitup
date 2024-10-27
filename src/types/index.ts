export interface Business {
  id: string;
  name: string;
  address: string;
  wallet: string;
}

export interface Employee {
  id: string;
  name: string;
  wallet: string;
  salary: number;
  paymentFrequency: "weekly" | "biweekly" | "monthly";
}

export interface Invoice {
  id: string;
  businessId: string;
  clientName: string;
  amount: number;
  dueDate: Date;
  status: "draft" | "sent" | "paid" | "overdue";
  items: InvoiceItem[];
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Expense {
  id: string;
  businessId: string;
  category: string;
  amount: number;
  date: Date;
  description: string;
  vendor?: string;
}
