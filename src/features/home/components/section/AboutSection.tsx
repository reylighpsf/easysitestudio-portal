import { motion } from "framer-motion";
import { CheckCircle2, Clock3, Shield, Sparkles } from "lucide-react";
import aboutImage from "@/assets/hero-person.png";

const benefitItems = [
  {
    title: "User Friendly",
    desc: "Navigasi jelas dan pengalaman pengguna dibuat nyaman di semua device.",
    icon: Sparkles,
  },
  {
    title: "Server Terbaik",
    desc: "Arsitektur ringan, stabil, dan mudah di-scale saat trafik meningkat.",
    icon: Shield,
  },
  {
    title: "Support Andal",
    desc: "Pendampingan revisi, update konten, dan monitoring performa.",
    icon: Clock3,
  },
];

const AboutSection = () => {
  return (
    <section id="proses" className="bg-[#060c18] py-20">
      <div className="container grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative mx-auto"
        >
          <div className="h-[320px] w-[320px] overflow-hidden rounded-full bg-gradient-to-br from-cyan-500/25 to-sky-600/20 ring-1 ring-cyan-300/20 md:h-[380px] md:w-[380px]">
            <img src={aboutImage} alt="About" className="h-full w-full object-cover object-center" />
          </div>
          <motion.div
            className="absolute -left-6 top-8 rounded-full border border-cyan-300/20 bg-[#0e1729]/90 px-4 py-2 shadow-md backdrop-blur"
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18, duration: 0.35 }}
          >
            <p className="text-xs font-semibold text-slate-400">Kecepatan</p>
            <p className="text-sm font-bold text-white">120% lebih cepat</p>
          </motion.div>
          <motion.div
            className="absolute -right-4 bottom-10 rounded-full border border-cyan-300/20 bg-[#0e1729]/90 px-4 py-2 shadow-md backdrop-blur"
            initial={{ opacity: 0, x: 14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.24, duration: 0.35 }}
          >
            <p className="text-xs font-semibold text-slate-400">Kepuasan</p>
            <p className="text-sm font-bold text-white">98% klien repeat</p>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.16em] text-cyan-200">
            Mengapa Kami
          </span>
          <h2 className="mt-4 text-3xl font-black text-white md:text-4xl">
            Solusi Digital yang
            <span className="bg-gradient-to-r from-cyan-300 to-sky-400 bg-clip-text text-transparent">
              {" "}
              Fokus Hasil
            </span>
          </h2>
          <p className="mt-3 max-w-xl text-slate-300">
            Kami menggabungkan desain yang elegan, performa yang cepat, dan pendampingan teknis
            yang jelas agar website Anda bukan hanya menarik, tapi juga menghasilkan.
          </p>

          <div className="mt-7 space-y-3">
            {benefitItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.08, duration: 0.35 }}
                className="rounded-2xl border border-cyan-300/20 bg-[#0c1527]/80 p-4 shadow-sm transition hover:-translate-y-0.5 hover:bg-[#0f1a30]"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-cyan-300/10 p-2 text-cyan-300 shadow-sm">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-bold text-white">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-300">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18, duration: 0.35 }}
          >
            <CheckCircle2 className="h-4 w-4 text-cyan-300" />
            Tim support siap bantu setiap hari kerja
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
