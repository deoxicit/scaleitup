import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

export function useWalletConnection() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = async () => {
    try {
      await connect({
        connector: injected(),
      });
    } catch (err) {
      console.error('Failed to connect:', err);
    }
  };

  return {
    address,
    isConnected,
    connect: handleConnect,
    disconnect,
  };
}
