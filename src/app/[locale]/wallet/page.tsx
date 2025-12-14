import {Badge, Section} from '@/components/ui';
import {getTranslations} from 'next-intl/server';
import {locales, type Locale} from '@/lib/i18n/routing';
import {notFound} from 'next/navigation';

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props) {
  const {locale: rawLocale} = await params;
  const locale = rawLocale as Locale;
  if (!locales.includes(locale)) notFound();

  const t = await getTranslations({locale, namespace: 'common'});

  return {
    title: `${t('nav.wallet')} - ZeldHash`,
    description: t('comingSoon.description'),
  };
}

export default async function WalletPage({params}: Props) {
  const {locale: rawLocale} = await params;
  const locale = rawLocale as Locale;
  if (!locales.includes(locale)) notFound();

  const t = await getTranslations({locale, namespace: 'common'});

  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center">
      <Section className="py-20">
        <div className="text-center max-w-2xl mx-auto">
          <Badge className="mb-6">{t('nav.wallet')}</Badge>
          
          <div className="mb-8">
            <svg
              className="w-24 h-24 mx-auto text-gold-400/60"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
              />
            </svg>
          </div>

          <h1 className="text-[clamp(32px,5vw,48px)] font-light leading-[1.1] tracking-[-1px] mb-4 font-serif text-dark-100">
            {t('comingSoon.title')}
          </h1>
          
          <p className="text-lg text-dark-300 leading-[1.7] mb-8">
            {t('comingSoon.description')}
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-400 text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-400"></span>
            </span>
            {t('comingSoon.status')}
          </div>
        </div>
      </Section>
    </div>
  );
}

