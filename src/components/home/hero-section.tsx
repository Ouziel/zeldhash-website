"use client";

import { WalletIcon, ExplorerIcon, ZeldAIIcon } from "@/components/ui";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";

type CTARowProps = {
  icon: React.ReactNode;
  title: string;
  buttonText: string;
  href: string;
  variant: "primary" | "secondary" | "tertiary";
};

function CTARow({ icon, title, buttonText, href, variant }: CTARowProps) {
  const variantStyles = {
    primary: "from-gold-400/20 to-gold-400/5 border-gold-400/40 hover:border-gold-400/60",
    secondary: "from-gold-400/10 to-transparent border-gold-400/20 hover:border-gold-400/40",
    tertiary: "from-gold-400/5 to-transparent border-gold-400/15 hover:border-gold-400/30",
  };

  const iconStyles = {
    primary: "bg-gold-400/20 text-gold-400",
    secondary: "bg-gold-400/10 text-gold-300",
    tertiary: "bg-gold-400/10 text-gold-300",
  };

  return (
    <Link
      href={href}
      className={`group flex items-center gap-4 px-4 py-3 rounded-xl bg-gradient-to-r border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(212,175,55,0.12)] ${variantStyles[variant]}`}
    >
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${iconStyles[variant]}`}>
        {icon}
      </div>
      <span className="text-[15px] font-medium text-dark-100 group-hover:text-gold-400 transition-colors flex-1">
        {title}
      </span>
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold-400 group-hover:gap-2.5 transition-all shrink-0">
        {buttonText}
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </span>
    </Link>
  );
}

export function HeroSection() {
  const t = useTranslations("home");

  return (
    <section className="w-full px-6 md:px-12 pt-8 md:pt-16 pb-20">
      <div className="w-full grid lg:grid-cols-2 items-center gap-12 lg:gap-16">
        {/* Left: Title & Subtitle */}
        <div className="text-start max-w-xl mx-auto lg:mx-0">
          <h1 className="text-[clamp(44px,7vw,68px)] font-light leading-[1.08] tracking-[-2px] mb-6 font-serif">
            <span className="text-gradient-gold font-semibold">{t("hero.titleLine1")}</span>
            <br />
            {t("hero.titleLine2")}
          </h1>

          <p className="text-[20px] md:text-[22px] text-dark-300 mb-8 leading-[1.6] font-light">
            {t("hero.subtitleBeforeZeros")}{" "}
            <bdi className="text-gold-400 font-mono px-1.5">000000...</bdi>{" "}
            {t("hero.subtitleAfterZeros", { token: "ZELD" })}
          </p>

          {/* Tagline */}
          <p className="text-sm uppercase tracking-[2px] text-gold-400/80 font-medium">
            {t("hero.tagline")}
          </p>
        </div>

        {/* Right: 3 CTA Rows - compact */}
        <div className="flex flex-col gap-3 w-full max-w-md mx-auto lg:ms-auto">
          <CTARow
            icon={<WalletIcon className="w-4.5 h-4.5" />}
            title={t("hero.cta.hunt.title")}
            buttonText={t("hero.cta.hunt.button")}
            href="/wallet"
            variant="primary"
          />
          <CTARow
            icon={<ExplorerIcon className="w-4.5 h-4.5" />}
            title={t("hero.cta.explorer.title")}
            buttonText={t("hero.cta.explorer.button")}
            href="/explorer"
            variant="secondary"
          />
          <CTARow
            icon={<ZeldAIIcon className="w-4.5 h-4.5" />}
            title={t("hero.cta.learn.title")}
            buttonText={t("hero.cta.learn.button")}
            href="/faq"
            variant="tertiary"
          />
        </div>
      </div>
    </section>
  );
}
