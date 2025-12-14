import { type ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <div
      className={`
        inline-block px-5 py-2
        bg-gold-400/10 border border-gold-400/30
        rounded-full
        text-[13px] uppercase tracking-widest
        text-gold-400
        ${className}
      `}
    >
      {children}
    </div>
  );
}

