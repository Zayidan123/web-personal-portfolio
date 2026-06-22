import { create } from 'zustand'

interface WalletState {
  status: 'disconnected' | 'connecting' | 'connected'
  address: string | null
  connect: () => void
  disconnect: () => void
}

function generateMockAddress(): string {
  const chars = '0123456789abcdef'
  let addr = '0x'
  for (let i = 0; i < 40; i++) {
    addr += chars[Math.floor(Math.random() * chars.length)]
  }
  return addr
}

function shortenAddress(addr: string): string {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`
}

export { shortenAddress }

export const useWalletStore = create<WalletState>((set) => ({
  status: 'disconnected',
  address: null,
  connect: () => {
    set({ status: 'connecting' })
    // Simulate connection delay
    setTimeout(() => {
      const addr = generateMockAddress()
      set({ status: 'connected', address: addr })
    }, 1500)
  },
  disconnect: () => {
    set({ status: 'disconnected', address: null })
  },
}))