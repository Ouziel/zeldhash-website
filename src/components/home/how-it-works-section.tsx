import { Section, SectionTitle } from "@/components/ui";
import { getTranslations } from "next-intl/server";

type Step = {
  num: string;
  title: string;
  desc: string;
  icon: string;
};

export async function HowItWorksSection() {
  const t = await getTranslations("home");
  const steps = t.raw("howItWorks.steps") as Step[];

  return (
    <Section id="hunt">
      <SectionTitle label={t("howItWorks.label")} title={t("howItWorks.title")} />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step) => (
          <div
            key={step.num}
            className="p-8 bg-white/[0.02] border border-gold-400/10 rounded-xl hover:border-gold-400/30 transition-colors"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[32px]">{step.icon}</span>
              <span className="text-xs text-gold-400 font-mono">{step.num}</span>
            </div>
            <h4 className="text-xl font-medium mb-3 text-dark-100">{step.title}</h4>
            <p className="text-[15px] text-dark-400 leading-[1.6]">{step.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

