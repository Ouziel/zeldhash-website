'use client';

import dynamic from 'next/dynamic';
import type {LocaleKey} from 'zeldwallet';

interface ZeldWalletWrapperProps {
  lang?: LocaleKey;
}

const WASM_BASE =
  typeof window !== 'undefined' && window.location?.origin
    ? `${window.location.origin}/wasm/`
    : '/wasm/';

// Set the WASM base as early as possible, before the miner is imported.
if (typeof globalThis !== 'undefined' && !(globalThis as any).__ZELDMINER_WASM_BASE__) {
  (globalThis as any).__ZELDMINER_WASM_BASE__ = WASM_BASE;
}

const ZeldWalletCardDynamic = dynamic(
  () => import('zeldwallet').then((mod) => mod.ZeldWalletCard),
  {
    ssr: false,
    loading: () => (
      <div className="w-full max-w-[480px] p-6 bg-dark-800/80 border border-dark-700 rounded-2xl animate-pulse">
        <div className="h-6 w-32 bg-dark-700/50 rounded mb-4"></div>
        <div className="space-y-3">
          <div className="h-16 bg-dark-700/30 rounded-lg"></div>
          <div className="h-16 bg-dark-700/30 rounded-lg"></div>
        </div>
      </div>
    ),
  }
);

export function ZeldWalletWrapper({lang = 'en'}: ZeldWalletWrapperProps) {
  return (
    <ZeldWalletCardDynamic
      lang={lang}
      network="mainnet"
      variant="dark"
      autoconnect
    />
  );
}
