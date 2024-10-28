export interface PaymentTransaction {
  id: string;
  amount: string;
  token: string;
  recipient: `0x${string}`;
  sender: `0x${string}`;
  status: "pending" | "completed" | "failed";
  type: "payment" | "payroll" | "invoice";
  timestamp: Date;
  description?: string;
}

export interface PayrollSchedule {
  employeeId: string;
  amount: string;
  frequency: "weekly" | "biweekly" | "monthly";
  nextPaymentDate: Date;
  active: boolean;
}

export type ChainType = "ETHEREUM" | "SOLANA";

export interface PaymentDetails {
  amount: string;
  recipient: string;
  chain: ChainType;
  description?: string;
}
