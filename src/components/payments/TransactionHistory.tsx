import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PaymentTransaction } from '@/types/payment';

interface TransactionHistoryProps {
  transactions: PaymentTransaction[];
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <p className="font-medium">{tx.description || 'Payment'}</p>
                <p className="text-sm text-muted-foreground">
                  To: {tx.recipient.slice(0, 6)}...{tx.recipient.slice(-4)}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">{tx.amount} PYUSD</p>
                <p className={`text-sm ${
                  tx.status === 'completed' ? 'text-green-500' :
                  tx.status === 'failed' ? 'text-red-500' :
                  'text-yellow-500'
                }`}>
                  {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}