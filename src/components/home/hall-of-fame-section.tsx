import { Section, SectionTitle } from "@/components/ui";
import { getTranslations } from "next-intl/server";

const RARE_TRANSACTIONS = [
  { zeros: 12, txid: "000000000000c469d884453cf29b9bc4995e93980fb7fa86d3b8abe66394e843", reward: "67,108,864" },
  { zeros: 8, txid: "00000000f20055df2ea02de851a47e97256ec06f0d196c6d62248648b6c981f2", reward: "4,096" },
  { zeros: 8, txid: "0000000089c1d40e77a9a601adfb263490ad717bc418ebed7f895d9eb41cdd84", reward: "4,096" },
  { zeros: 7, txid: "0000000bb463dde7fd2c72d673c9a393d8962f0b0414ae32bf0aec23e5522a4e", reward: "4,096" },
  { zeros: 6, txid: "000000230a733b1deb2ca7dbc86f315682f7dff4ca64731ed0afe7ac244f2283", reward: "4,096" },
] as const;

function formatTxid(txid: string, zeros: number) {
  const zerosPart = txid.slice(0, zeros);
  const rest = txid.slice(zeros, 20) + "...";
  return { zerosPart, rest };
}

export async function HallOfFameSection() {
  const t = await getTranslations("home");

  return (
    <Section className="bg-black/25">
      <SectionTitle label={t("hallOfFame.label")} title={t("hallOfFame.title")} />

      <div className="flex flex-col gap-3">
        {RARE_TRANSACTIONS.map((tx, i) => {
          const { zerosPart, rest } = formatTxid(tx.txid, tx.zeros);
          const isRecord = i === 0;

          return (
            <a
              key={tx.txid}
              href={`https://mempool.space/tx/${tx.txid}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                flex items-center justify-between py-5 px-6 rounded-lg
                transition-all hover:scale-[1.01]
                ${isRecord
                  ? "bg-gradient-to-br from-gold-400/15 to-gold-400/5 border border-gold-400/40"
                  : "bg-white/[0.02] border border-white/5 hover:border-gold-400/20"
                }
              `}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    text-sm font-semibold
                    ${isRecord
                      ? "bg-gradient-gold text-dark-950"
                      : "bg-gold-400/20 text-gold-400"
                    }
                  `}
                >
                  {isRecord ? "👑" : tx.zeros}
                </div>
                <div>
                  <div className="font-mono text-sm mb-1">
                    <span
                      className={`text-gold-400 ${isRecord ? "drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]" : ""}`}
                    >
                      {zerosPart}
                    </span>
                    <span className="text-dark-600">{rest}</span>
                  </div>
                  <div className="text-xs text-dark-600">
                    {t("hallOfFame.leadingZeros", { count: tx.zeros })} {isRecord ? t("hallOfFame.recordSuffix") : null}
                  </div>
                </div>
              </div>
              <div className="text-end">
                <div className="text-base font-medium text-gold-400 font-mono">
                  {tx.reward}
                </div>
                <div className="text-[11px] text-dark-600 uppercase tracking-wider">
                  {t("hallOfFame.tokenLabel")}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </Section>
  );
}

