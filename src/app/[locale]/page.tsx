import {CTASection, ComparisonSection, HallOfFameSection, HeroSection, HowItWorksSection, StatsSection} from '@/components/home';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {locales, type Locale} from '@/lib/i18n/routing';
import {notFound} from 'next/navigation';

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props) {
  const {locale: rawLocale} = await params;
  const locale = rawLocale as Locale;
  if (!locales.includes(locale)) notFound();

  const t = await getTranslations({locale, namespace: 'home'});

  const alternateLanguages = Object.fromEntries(
    locales.map(loc => [loc, `/${loc}`])
  );

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      languages: alternateLanguages
    }
  };
}

export default async function Home({params}: Props) {
  const {locale: rawLocale} = await params;
  const locale = rawLocale as Locale;
  if (!locales.includes(locale)) notFound();

  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <ComparisonSection />
      <HallOfFameSection />
      <CTASection />
    </>
  );
}


