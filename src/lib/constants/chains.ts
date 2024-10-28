export const SUPPORTED_CHAINS = {
    ETHEREUM: {
      id: 1,
      name: 'Ethereum',
      rpcUrl: import.meta.env.VITE_ETHEREUM_RPC_URL,
      pyusdAddress: '0x6c3ea9036406852006290770bedfcaba0e23a0e8',
      explorer: 'https://etherscan.io',
    },
    SOLANA: {
      name: 'Solana',
      rpcUrl: import.meta.env.VITE_SOLANA_RPC_URL,
      pyusdAddress: '2b1kV6DkPAnxd5ixfnxCpjxmKwqjjaYmCZfHsFu24GXo', // Replace with actual Solana PYUSD address
      explorer: 'https://solscan.io',
    },
  } as const;