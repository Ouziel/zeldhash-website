"use client";

import { type ButtonHTMLAttributes, forwardRef } from "react";
import { Link } from "@/lib/i18n/routing";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  as?: "button" | "a" | "link";
  href?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-gradient-gold text-dark-950 
    hover:bg-gradient-gold-hover hover:-translate-y-0.5
    shadow-[0_4px_16px_rgba(212,175,55,0.2)]
    hover:shadow-[0_8px_32px_rgba(212,175,55,0.4)]
  `,
  secondary: `
    bg-transparent border border-gold-400/40 text-gold-400
    hover:bg-gold-400/10 hover:border-gold-400/60
  `,
  ghost: `
    bg-transparent text-dark-200 
    hover:text-gold-400
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-[15px]",
  lg: "px-10 py-4 text-[15px]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", as = "button", href, children, ...props }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center
      font-semibold uppercase tracking-wider
      rounded-lg transition-all duration-300
      cursor-pointer
    `;

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim();

    if (as === "link" && href) {
      return (
        <Link href={href} className={combinedClassName}>
          {children}
        </Link>
      );
    }

    if (as === "a" && href) {
      return (
        <a href={href} className={combinedClassName}>
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

