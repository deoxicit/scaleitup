const categories = ['food', 'transport', 'utilities', 'entertainment', 'other'] as const;
type ExpenseCategory = typeof categories[number];
type ExpenseStatus = 'paid' | 'pending';

export interface ExpenseFormData {
  description: string;
  category: string;
  amount: string;
  payee: string;
  date: string;
}

export interface Expense {
  id: string;
  description: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
  status: ExpenseStatus;
  payee: string;
}