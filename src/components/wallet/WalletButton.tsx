import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Wallet, 
  ExternalLink, 
  Copy, 
  LogOut, 
  CheckCircle2,
  Globe,
  ChevronDown
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface WalletButtonProps {
  address: string;
  isConnected: boolean;
  chainId?: number;
  connect: () => void;
  disconnect: () => void;
}

export function WalletButton({ 
  address, 
  isConnected, 
  chainId,
  connect, 
  disconnect 
}: WalletButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getNetworkName = (chainId?: number) => {
    switch (chainId) {
      case 1:
        return "Ethereum Mainnet";
      case 137:
        return "Polygon";
      case 8453:
        return "Base";
      default:
        return "Unknown Network";
    }
  };

  const getNetworkColor = (chainId?: number) => {
    switch (chainId) {
      case 1:
        return "text-blue-500";
      case 137:
        return "text-purple-500";
      case 8453:
        return "text-blue-400";
      default:
        return "text-gray-500";
    }
  };

  const copyAddress = async () => {
    await navigator.clipboard.writeText(address);
    toast.success('Address copied to clipboard');
  };

  const openExplorer = () => {
    // Adjust explorer URL based on network
    const baseUrl = chainId === 137 
      ? 'https://polygonscan.com'
      : chainId === 8453
      ? 'https://basescan.org'
      : 'https://etherscan.io';
    
    const explorerUrl = `${baseUrl}/address/${address}`;
    window.open(explorerUrl, '_blank');
  };

  if (!isConnected) {
    return (
      <Button onClick={connect} className="flex items-center gap-2">
        <Wallet className="h-4 w-4" />
        Connect Wallet
      </Button>
    );
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <div className="flex items-center">
            <div className={cn(
              "h-2 w-2 rounded-full mr-2",
              getNetworkColor(chainId)
            )} />
            {`${address.slice(0, 6)}...${address.slice(-4)}`}
          </div>
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-normal text-muted-foreground">Connected Wallet</p>
            <div className="flex items-center">
              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
              <span className="font-mono">
                {`${address.slice(0, 6)}...${address.slice(-4)}`}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-normal text-muted-foreground">Network</p>
            <div className="flex items-center">
              <Globe className={cn("h-4 w-4 mr-2", getNetworkColor(chainId))} />
              <span>{getNetworkName(chainId)}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={copyAddress}
          className="cursor-pointer"
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy Address
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={openExplorer}
          className="cursor-pointer"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          View on Explorer
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={() => {
            disconnect();
            setIsOpen(false);
            toast.success('Wallet disconnected');
          }}
          className="text-red-600 cursor-pointer focus:text-red-600"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}