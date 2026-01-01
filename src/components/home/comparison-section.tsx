import { getTranslations } from "next-intl/server";

type ComparisonRow = [string, string];

export async function ComparisonSection() {
  const t = await getTranslations("home");
  const rows = t.raw("comparison.rows") as ComparisonRow[];

  return (
    <section className="w-full py-[50px] px-6 md:px-12 bg-gradient-to-b from-gold-400/20 via-gold-400/10 to-transparent">
      <div className="max-w-[900px] mx-auto">
        <h2 className="text-sm uppercase tracking-[3px] text-gold-400 mb-4">
          {t("comparison.label")}
        </h2>
        <h3 className="text-[42px] font-light tracking-[-1px] mb-6 font-serif">
          {t("comparison.title")}
        </h3>
        <p className="text-lg text-dark-300 leading-[1.7] mb-16 max-w-[700px]">
          {t("comparison.intro")}
        </p>

        <div className="grid grid-cols-2 gap-[2px] bg-gold-400/20 rounded-xl overflow-hidden">
          {/* Headers */}
          <div className="px-6 py-5 bg-gold-400/10 text-[13px] uppercase tracking-[1px] text-dark-300">
            {t("comparison.oldHeader")}
          </div>
          <div className="px-6 py-5 bg-gold-400/15 text-[13px] uppercase tracking-[1px] text-gold-400">
            {t("comparison.newHeader")}
          </div>

          {/* Comparison rows */}
          {rows.map(([oldWay, newWay], i) => (
            <div key={i} className="contents">
              <div className="px-6 py-4 bg-[#0f0f14] text-dark-500 text-[15px]">
                {oldWay}
              </div>
              <div className="px-6 py-4 bg-dark-900 text-dark-100 text-[15px]">
                {newWay}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

