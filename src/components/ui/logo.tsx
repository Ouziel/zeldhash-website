"use client";

import Image from "next/image";
import { Link } from "@/lib/i18n/routing";
import { useTranslations } from "next-intl";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  const t = useTranslations("common");

  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <Image
        src="/zeldhash_clean.svg"
        alt={t("logoAlt")}
        width={63}
        height={63}
        className="h-[63px] w-auto"
        priority
      />
    </Link>
  );
}

