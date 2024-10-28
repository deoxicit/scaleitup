// src/types/employee.ts

export interface Employee {
    id: number;
    name: string;
    role: string;
    walletAddress: string;
    email: string;
    status: 'Active' | 'Inactive' | 'Pending';
    paymentSchedule: 'Monthly' | 'Bi-weekly' | 'Weekly';
    salary: string;
  }
  
  export interface PayrollStats {
    totalEmployees: number;
    monthlyPayroll: string;
    averageSalary: string;
  }