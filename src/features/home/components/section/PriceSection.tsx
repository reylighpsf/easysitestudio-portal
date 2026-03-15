import { motion } from "framer-motion";
import { Check, Crown, Sparkles, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PricePlan } from "@/lib/api";

type PriceSectionProps = {
  plans: PricePlan[];
};

const iconList = [Wallet, Sparkles, Crown];
const rupiahFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

const PriceSection = ({ plans }: PriceSectionProps) => {
  return (
    <section id="harga" className="bg-[linear-gradient(180deg,#050a14_0%,#070e1c_100%)] py-24">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="mb-12 text-center">
            <span className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.15em] text-cyan-200">
              Pricing
            </span>
            <h2 className="mt-4 text-3xl font-black text-white md:text-4xl">Harga Terbaik Hanya Untuk Anda</h2>
          </div>
        </motion.div>

        {plans.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-cyan-300/20 bg-[#0b1527] p-8 text-center text-slate-300"
          >
            Paket harga belum tersedia. Silakan tambahkan dari dashboard admin.
          </motion.div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-3">
            {plans.map((plan, index) => {
              const Icon = iconList[index % iconList.length];
              const points =
                plan.features.length > 0
                  ? plan.features
                  : ["Konsultasi kebutuhan", "Desain responsif", "Support implementasi"];

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className={
                    plan.isHighlighted
                      ? "relative rounded-3xl border border-cyan-300/35 bg-gradient-to-b from-[#10233f] to-[#0a162a] p-6 shadow-[0_22px_48px_-30px_rgba(8,145,178,0.95)]"
                      : "rounded-3xl border border-cyan-300/20 bg-[#0b1527] p-6"
                  }
                >
                  {plan.isHighlighted ? (
                    <span className="absolute -top-3 right-6 rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 px-3 py-1 text-xs font-bold text-white">
                      Paling Populer
                    </span>
                  ) : null}

                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-cyan-300/10 p-2 text-cyan-200 shadow-sm">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">{plan.name}</p>
                      <p className="text-2xl font-black text-white">{rupiahFormatter.format(plan.price)}</p>
                    </div>
                  </div>

                  <ul className="mt-6 space-y-2">
                    {points.map((point, pointIndex) => (
                      <li key={`${plan.id}-${pointIndex}`} className="flex items-start gap-2 text-sm text-slate-300">
                        <Check className="mt-0.5 h-4 w-4 text-cyan-300" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <Button className="mt-6 w-full rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 text-white hover:from-cyan-400 hover:to-sky-400">
                    Pilih Paket
                  </Button>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default PriceSection;
