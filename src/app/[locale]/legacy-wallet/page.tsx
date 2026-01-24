import {Section} from '@/components/ui';
import {ZeldWalletWrapper, AskZeldAIBlock} from '@/components/wallet';
import {getTranslations} from 'next-intl/server';
import {locales, type Locale, Link} from '@/lib/i18n/routing';
import {notFound} from 'next/navigation';

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props) {
  const {locale: rawLocale} = await params;
  const locale = rawLocale as Locale;
  if (!locales.includes(locale)) notFound();

  const t = await getTranslations({locale, namespace: 'common'});

  const alternateLanguages = Object.fromEntries(
    locales.map(loc => [loc, `/${loc}/legacy-wallet`])
  );

  return {
    title: `${t('legacyWallet.metaTitle')} - ${t('siteTitle')}`,
    description: t('legacyWallet.metaDescription'),
    alternates: {
      languages: alternateLanguages
    }
  };
}

export default async function LegacyWalletPage({params}: Props) {
  const {locale: rawLocale} = await params;
  const locale = rawLocale as Locale;
  if (!locales.includes(locale)) notFound();

  const t = await getTranslations({locale, namespace: 'common'});

  return (
    <div className="w-full">
      {/* Deprecation Banner */}
      <div className="w-full bg-gradient-to-r from-red-600 to-red-700 border-b border-red-500/50">
        <div className="max-w-[900px] mx-auto px-6 md:px-12 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-6 h-6 text-white flex-shrink-0"
              >
                <path 
                  fillRule="evenodd" 
                  d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" 
                  clipRule="evenodd" 
                />
              </svg>
              <span className="font-semibold text-white text-lg">
                {t('legacyWallet.bannerTitle')}
              </span>
            </div>
            <p className="text-white/90 text-sm sm:text-base flex-1">
              {t('legacyWallet.bannerMessage')}
            </p>
            <Link 
              href="/wallet" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg text-white font-medium text-sm transition-colors whitespace-nowrap"
            >
              {t('legacyWallet.goToHorizon')}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor" 
                className="w-4 h-4"
              >
                <path 
                  fillRule="evenodd" 
                  d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" 
                  clipRule="evenodd" 
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <section className="w-full px-6 md:px-12 pt-6 pb-3 border-b border-gold-400/10 bg-black/30">
        <div className="max-w-[900px] mx-auto">
          <h1 className="text-[clamp(40px,7vw,64px)] font-light leading-[1.1] tracking-[-1.5px] mb-4 font-serif">
            <span className="text-gradient-gold">{t('legacyWallet.titlePrefix')}</span>{t('legacyWallet.titleSuffix')}
          </h1>
          <p className="text-lg text-dark-300 leading-[1.7] max-w-[760px]">
            {t('legacyWallet.subtitle')}
          </p>
        </div>
      </section>

      <Section className="!pt-6 !pb-12">
        {/* Wallet Card */}
        <div className="max-w-[720px] mx-auto">
          <ZeldWalletWrapper key={locale} locale={locale} />
          
          {/* Ask ZeldAI Block */}
          <AskZeldAIBlock />
        </div>
      </Section>
    </div>
  );
}
