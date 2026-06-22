'use client'

import { useWalletStore, shortenAddress } from '@/store/wallet-store'
import { useLanguageStore } from '@/store/language-store'
import { useState, useRef, useEffect } from 'react'
import { Wallet, Loader2, ChevronDown, LogOut } from 'lucide-react'

export function WalletConnectButton() {
  const { status, address, connect, disconnect } = useWalletStore()
  const { t } = useLanguageStore()
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (status === 'connected' && address) {
    return (
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="relative flex items-center gap-2 px-3 py-1.5 rounded-lg glass font-mono-custom text-xs text-[var(--neon-cyan)] transition-all duration-300 hover:shadow-[var(--glow-cyan)]"
          aria-label="Wallet options"
        >
          <Wallet className="h-3.5 w-3.5" />
          <span>{shortenAddress(address)}</span>
          <ChevronDown className="h-3 w-3 transition-transform duration-200" style={{ transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)' }} />
        </button>
        {showDropdown && (
          <div className="absolute right-0 top-full mt-2 w-48 rounded-lg glass p-2 z-50 border border-[var(--glass-border)]">
            <button
              onClick={() => {
                disconnect()
                setShowDropdown(false)
              }}
              className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm text-[var(--text-secondary)] hover:text-[var(--neon-magenta)] hover:bg-[var(--glass-bg)] transition-colors duration-200"
            >
              <LogOut className="h-4 w-4" />
              <span>{t('wallet.disconnect')}</span>
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <button
      onClick={connect}
      disabled={status === 'connecting'}
      className="relative flex items-center gap-2 px-3 py-1.5 rounded-lg glass font-display text-xs tracking-wider text-[var(--neon-magenta)] border border-[var(--neon-magenta)]/30 transition-all duration-300 hover:shadow-[var(--glow-magenta)] hover:border-[var(--neon-magenta)] disabled:opacity-60"
      aria-label="Connect wallet"
    >
      {status === 'connecting' ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          <span>{t('wallet.connecting')}</span>
        </>
      ) : (
        <>
          <Wallet className="h-3.5 w-3.5" />
          <span>{t('wallet.connect')}</span>
        </>
      )}
    </button>
  )
}