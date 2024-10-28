import { useWalletConnection } from '@/hooks/useWalletConnection';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { WalletButton } from '@/components/wallet/WalletButton';
import { useAccount } from 'wagmi';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { address, isConnected, connect, disconnect } = useWalletConnection();
  const { chain } = useAccount();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="mr-4"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex flex-1 items-center justify-between">
          <h2 className="text-2xl font-bold">ScaleItUp</h2>
          
          <WalletButton
            address={address || ''}
            isConnected={isConnected}
            chainId={chain?.id}
            connect={connect}
            disconnect={disconnect}
          />
        </div>
      </div>
    </header>
  );
}