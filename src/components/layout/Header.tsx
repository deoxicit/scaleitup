import { useWalletConnection } from '@/hooks/useWalletConnection';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';

export function Header() {
  const { address, isConnected, connect, disconnect } = useWalletConnection();

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex flex-1 items-center justify-between">
          <h2 className="text-2xl font-bold">ScaleItUp</h2>
          
          <div className="flex items-center space-x-4">
            {isConnected ? (
              <div className="flex items-center gap-4">
                <span className="text-sm">
                  {`${address?.slice(0, 6)}...${address?.slice(-4)}`}
                </span>
                <Button
                  variant="outline"
                  onClick={() => disconnect()}
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => connect()}
                className="flex items-center gap-2"
              >
                <Wallet className="h-4 w-4" />
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}