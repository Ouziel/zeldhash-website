import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/routing";

type FooterLink = {
  href: string;
  label: string;
  external?: boolean;
};

export async function Footer() {
  const t = await getTranslations("common");

  const FOOTER_LINKS: FooterLink[] = [
    { href: "/protocol", label: t("footer.protocol") },
    { href: "/balances", label: t("footer.balances") },
    { href: "/faq", label: t("footer.faq") },
    { href: "https://github.com/ouziel-slama/myhashisnice/", label: t("footer.github"), external: true },
    { href: "https://x.com/myhashisnice", label: t("footer.twitter"), external: true },
  ];

  return (
    <footer className="px-6 md:px-12 py-12 border-t border-gold-400/10 text-center">
      <div className="flex justify-center gap-8 mb-6 text-sm">
        {FOOTER_LINKS.map((link) =>
          link.external ? (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-500 hover:text-gold-400 transition-colors"
            >
              {link.label}
            </a>
          ) : (
            <Link key={link.href} href={link.href} className="text-dark-500 hover:text-gold-400 transition-colors">
              {link.label}
            </Link>
          )
        )}
      </div>
      <p className="text-[13px] text-dark-700">
        {t("footer.motto")}
      </p>
    </footer>
  );
}

