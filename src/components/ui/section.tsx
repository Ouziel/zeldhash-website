import { type ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

interface SectionTitleProps {
  label?: string;
  title: string;
  className?: string;
}

export function Section({ children, className = "", id }: SectionProps) {
  return (
    <section id={id} className={`w-full py-[50px] px-6 md:px-12 ${className}`}>
      <div className="max-w-[900px] mx-auto">{children}</div>
    </section>
  );
}

export function SectionTitle({ label, title, className = "mb-8" }: SectionTitleProps) {
  return (
    <div className={className}>
      {label && (
        <h2 className="text-sm uppercase tracking-[3px] text-gold-400 mb-4">
          {label}
        </h2>
      )}
      <h3 className="text-[42px] font-light tracking-[-1px] font-serif">
        {title}
      </h3>
    </div>
  );
}

