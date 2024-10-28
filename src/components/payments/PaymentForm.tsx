import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from "sonner"
import { useWalletConnection } from '@/hooks/useWalletConnection';

const paymentSchema = z.object({
  recipient: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address'),
  amount: z.string().min(1, 'Amount is required'),
  description: z.string().optional(),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

export function PaymentForm() {
  const { address, isConnected } = useWalletConnection();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
  });

  const onSubmit = async (data: PaymentFormData) => {
    try {
      // TODO: Implement PYUSD payment logic
      console.log('Processing payment:', data);
      toast.success('Payment Initiated', {
        description: 'Your payment is being processed.',
      });
      reset();
    } catch (error) {
      toast.error('Payment Failed', {
        description: 'Failed to process payment.',
      });
    }
  };

  if (!isConnected) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            Please connect your wallet to make payments.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send Payment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Address</Label>
            <Input
              id="recipient"
              {...register('recipient')}
              placeholder="0x..."
            />
            {errors.recipient && (
              <p className="text-sm text-destructive">{errors.recipient.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (PYUSD)</Label>
            <Input
              id="amount"
              {...register('amount')}
              placeholder="0.00"
              type="number"
              step="0.01"
            />
            {errors.amount && (
              <p className="text-sm text-destructive">{errors.amount.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              {...register('description')}
              placeholder="Payment for..."
            />
          </div>
          
          <Button type="submit" className="w-full">
            Send Payment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}