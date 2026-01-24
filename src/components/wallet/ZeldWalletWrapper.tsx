'use client';

import dynamic from 'next/dynamic';
import {useLocale} from 'next-intl';
import {languages, type LocaleKey} from 'zeldwallet';
import type {Locale} from '@/lib/i18n/routing';

// Note: zeldhash-miner >= 0.3.1 auto-resolves asset path to /zeldhash-miner/

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

// Map site locale to the closest zeldwallet supported locale
function getWalletLocale(siteLocale: string): LocaleKey {
  const normalized = siteLocale.trim().toLowerCase();
  const codes = languages.map(l => l.code);

  // Exact (case-insensitive)
  const exact = codes.find(code => code.toLowerCase() === normalized);
  if (exact) return exact as LocaleKey;

  // Match by base language (e.g., fr-FR -> fr)
  const base = normalized.split('-')[0];
  const baseMatch = codes.find(code => code.split('-')[0].toLowerCase() === base);
  if (baseMatch) return baseMatch as LocaleKey;

  return 'en';
}

type Props = {
  locale?: Locale;
};

export function ZeldWalletWrapper({locale}: Props) {
  const clientLocale = useLocale();
  const siteLocale = locale ?? clientLocale;
  const lang = getWalletLocale(siteLocale);

  return (
    <ZeldWalletCardDynamic
      key={lang}
      lang={lang}
      network="mainnet"
      variant="dark"
      autoconnect
    />
  );
}
