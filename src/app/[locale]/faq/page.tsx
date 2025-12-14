import Link from 'next/link';
import {CTASection} from '@/components/home';
import {Badge, Section} from '@/components/ui';
import type {ReactNode} from 'react';
import {getTranslations} from 'next-intl/server';
import {locales, type Locale} from '@/lib/i18n/routing';
import {notFound} from 'next/navigation';

type FaqItem = {
  question: string;
  answer: ReactNode;
};

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props) {
  const {locale: rawLocale} = await params;
  const locale = rawLocale as Locale;
  if (!locales.includes(locale)) notFound();

  const t = await getTranslations({locale, namespace: 'faq'});

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      languages: {
        en: '/en/faq',
        fr: '/fr/faq',
        es: '/es/faq'
      }
    }
  };
}

export default async function FAQPage({params}: Props) {
  const {locale: rawLocale} = await params;
  const locale = rawLocale as Locale;
  if (!locales.includes(locale)) notFound();

  const t = await getTranslations({locale, namespace: 'faq'});

  const FAQ_ITEMS: FaqItem[] = [
    {
      question: t('items.whatIsZeldHash.q'),
      answer: <p>{t('items.whatIsZeldHash.a')}</p>
    },
    {
      question: t('items.whyName.q'),
      answer: (
        <>
          <p>{t('items.whyName.a1')}</p>
          <p>{t('items.whyName.a2')}</p>
        </>
      )
    },
    {
      question: t('items.whatIsHash.q'),
      answer: (
        <>
          <p>{t('items.whatIsHash.a1')}</p>
          <p>
            {t.rich('items.whatIsHash.a2', {
              mempool: (chunks) => (
                <Link
                  href="https://mempool.space/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-400 hover:text-gold-300"
                >
                  {chunks}
                </Link>
              )
            })}
          </p>
        </>
      )
    },
    {
      question: t('items.bitcoinRelation.q'),
      answer: <p>{t('items.bitcoinRelation.a')}</p>
    },
    {
      question: t('items.rareTxHash.q'),
      answer: <p>{t('items.rareTxHash.a')}</p>
    },
    {
      question: t('items.huntHow.q'),
      answer: <p>{t('items.huntHow.a')}</p>
    },
    {
      question: t('items.whatIsZeld.q'),
      answer: <p>{t('items.whatIsZeld.a')}</p>
    },
    {
      question: t('items.inCirculation.q'),
      answer: <p>{t('items.inCirculation.a')}</p>
    },
    {
      question: t('items.ownWithoutKnowing.q'),
      answer: <p>{t('items.ownWithoutKnowing.a')}</p>
    },
    {
      question: t('items.centralized.q'),
      answer: <p>{t('items.centralized.a')}</p>
    },
    {
      question: t('items.rewards.q'),
      answer: <p>{t('items.rewards.a')}</p>
    },
    {
      question: t('items.startHunting.q'),
      answer: (
        <p>
          {t.rich('items.startHunting.a', {
            site: (chunks) => (
              <Link
                href="https://zeldhash.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-400 hover:text-gold-300"
              >
                {chunks}
              </Link>
            )
          })}
        </p>
      )
    }
  ];

  return (
    <div className="w-full">
      <section className="w-full px-6 md:px-12 pt-16 pb-12 border-b border-gold-400/10 bg-black/30">
        <div className="max-w-[900px] mx-auto">
          <Badge className="mb-5">{t('badge')}</Badge>
          <h1 className="text-[clamp(40px,7vw,64px)] font-light leading-[1.1] tracking-[-1.5px] mb-4 font-serif">
            {t('heading')}
          </h1>
          <p className="text-lg text-dark-300 leading-[1.7] max-w-[760px]">
            {t('intro')}
            <span className="text-gold-400 font-semibold ms-2">{t('huntIsOn')}</span>
          </p>
        </div>
      </section>

      <Section className="pt-12 pb-12">
        <div className="space-y-4">
          {FAQ_ITEMS.map((item) => (
            <div
              key={item.question}
              className="p-6 md:p-7 bg-white/[0.02] border border-gold-400/10 rounded-xl hover:border-gold-400/30 transition-colors"
            >
              <h3 className="text-xl font-medium text-dark-100 mb-3">{item.question}</h3>
              <div className="text-[15px] text-dark-300 leading-[1.7] space-y-3">{item.answer}</div>
            </div>
          ))}
        </div>
      </Section>

      <CTASection />
    </div>
  );
}


