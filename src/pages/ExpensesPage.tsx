import { PaymentForm } from "@/components/payments/PaymentForm";
import { TransactionHistory } from "@/components/payments/TransactionHistory";

export function ExpensesPage() {
  // TODO: Replace with real data from your state management
  const mockTransactions = [
    {
      id: "1",
      amount: "100.00",
      token: "PYUSD",
      recipient: "0x1234567890123456789012345678901234567890" as `0x${string}`,
      sender: "0x0987654321098765432109876543210987654321" as `0x${string}`,
      status: "completed" as const,
      type: "payment" as const,
      timestamp: new Date(),
      description: "Payment for services",
    },
    // Add more mock transactions as needed
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Payments</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <PaymentForm />
        <TransactionHistory transactions={mockTransactions} />
      </div>
    </div>
  );
}
