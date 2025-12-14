import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {defaultLocale, locales, type Locale} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  // In next-intl v4+, requestLocale is a Promise that must be awaited
  const locale = await requestLocale;
  const resolvedLocale = (locale ?? defaultLocale) as Locale;
  if (!locales.includes(resolvedLocale)) notFound();

  const [common, home, faq] = await Promise.all([
    import(`../../../messages/${resolvedLocale}/common.json`),
    import(`../../../messages/${resolvedLocale}/home.json`),
    import(`../../../messages/${resolvedLocale}/faq.json`)
  ]);

  return {
    locale: resolvedLocale,
    messages: {
      common: common.default,
      home: home.default,
      faq: faq.default
    }
  };
});


