import createMiddleware from 'next-intl/middleware';
import {defaultLocale, locales, localePrefix} from '@/lib/i18n/routing';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};


