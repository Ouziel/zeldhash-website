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
    title: `${t('nav.hunt')} - ZeldHash`,
    description: t('comingSoon.description'),
  };
}

export default async function HuntPage({params}: Props) {
  const {locale: rawLocale} = await params;
  const locale = rawLocale as Locale;
  if (!locales.includes(locale)) notFound();

  const t = await getTranslations({locale, namespace: 'common'});

  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center">
      <Section className="py-20">
        <div className="text-center max-w-2xl mx-auto">
          <Badge className="mb-6">{t('nav.hunt')}</Badge>
          
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
                d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
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

