import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Transaction {
  id: string
  hash: `0x${string}`
  amount: string
  recipient: `0x${string}`
  sender: `0x${string}`
  status: 'pending' | 'confirmed' | 'failed'
  timestamp: number
  description?: string
}

interface TransactionStore {
  transactions: Transaction[]
  addTransaction: (tx: Omit<Transaction, 'id'>) => void
  updateTransaction: (hash: string, updates: Partial<Transaction>) => void
  getTransactionsByAddress: (address: string) => Transaction[]
}

export const useTransactionStore = create<TransactionStore>()(
  persist(
    (set, get) => ({
      transactions: [],
      
      addTransaction: (tx) => set((state) => ({
        transactions: [
          {
            ...tx,
            id: `${tx.hash}-${Date.now()}`,
          },
          ...state.transactions,
        ],
      })),
      
      updateTransaction: (hash, updates) => set((state) => ({
        transactions: state.transactions.map((tx) =>
          tx.hash === hash ? { ...tx, ...updates } : tx
        ),
      })),
      
      getTransactionsByAddress: (address) => {
        const state = get()
        return state.transactions.filter(
          (tx) => tx.sender === address || tx.recipient === address
        )
      },
    }),
    {
      name: 'transactions',
    }
  )
)