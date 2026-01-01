import { Button, WalletIcon, ExplorerIcon, ZeldAIIcon } from "@/components/ui";
import { Link } from "@/lib/i18n/routing";
import { getTranslations } from "next-intl/server";

type CTAButtonProps = {
  icon: React.ReactNode;
  label: string;
  href: string;
  variant: "primary" | "secondary";
};

function CTAButton({ icon, label, href, variant }: CTAButtonProps) {
  const isPrimary = variant === "primary";
  
  return (
    <Link
      href={href}
      className={`
        group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold uppercase tracking-wider text-[15px]
        transition-all duration-300 hover:-translate-y-0.5
        ${isPrimary 
          ? "bg-gradient-gold text-dark-950 shadow-[0_4px_16px_rgba(212,175,55,0.2)] hover:shadow-[0_8px_32px_rgba(212,175,55,0.4)]"
          : "bg-transparent border border-gold-400/40 text-gold-400 hover:bg-gold-400/10 hover:border-gold-400/60"
        }
      `}
    >
      <span className="w-5 h-5">{icon}</span>
      {label}
    </Link>
  );
}

export async function CTASection() {
  const t = await getTranslations("home");

  return (
    <section className="w-full py-[50px] px-6 md:px-12 text-center bg-gradient-to-b from-transparent to-gold-400/[0.08]">
      <div className="max-w-[1000px] mx-auto">
        <h3 className="text-5xl font-light tracking-[-1px] mb-6 font-serif">
          {t("cta.title")}
        </h3>
        <p className="text-lg text-dark-300 mb-12 max-w-xl mx-auto">
          {t("cta.subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
          <CTAButton
            icon={<WalletIcon className="w-5 h-5" />}
            label={t("cta.startHunting")}
            href="/wallet"
            variant="primary"
          />
          <CTAButton
            icon={<ExplorerIcon className="w-5 h-5" />}
            label={t("cta.checkBalance")}
            href="/explorer"
            variant="secondary"
          />
          <CTAButton
            icon={<ZeldAIIcon className="w-5 h-5" />}
            label={t("cta.askZeldAI")}
            href="/faq"
            variant="secondary"
          />
        </div>
      </div>
    </section>
  );
}
