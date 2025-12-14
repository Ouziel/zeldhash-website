import { Link } from "@/lib/i18n/routing";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <img
        src="/zeldhash_clean.svg"
        alt="ZeldHash Logo"
        className="h-[63px]"
      />
    </Link>
  );
}

