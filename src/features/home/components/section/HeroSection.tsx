import { motion } from "framer-motion";
import { ArrowRight, GaugeCircle, Palette, ShieldCheck, Star, WalletCards } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import heroPerson from "@/assets/hero-person.png";

const heroHighlights = [
  {
    title: "Mengapa Memilih Kami?",
    desc: "Tim berpengalaman dengan standar kerja profesional.",
    icon: ShieldCheck,
  },
  {
    title: "Pengerjaan Cepat",
    desc: "Alur kerja jelas, komunikasi aktif, hasil tepat waktu.",
    icon: GaugeCircle,
  },
  {
    title: "Desain Premium",
    desc: "UI/UX modern yang fokus ke konversi.",
    icon: Palette,
  },
  {
    title: "Harga Terjangkau",
    desc: "Paket fleksibel sesuai kebutuhan bisnis Anda.",
    icon: WalletCards,
  },
];

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_20%_0%,#10213f_0%,#070b14_55%,#05070d_100%)] pb-16 pt-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="pointer-events-none absolute -left-24 -top-20 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-24 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl" />

      <div className="container grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">
            Website Profesional
          </span>
          <h1 className="mt-5 text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl">
            Desain Modern,{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-sky-400 bg-clip-text text-transparent">
              Performa
            </span>{" "}
            Luar Biasa
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
            Dengan sentuhan profesional dan teknologi terkini, kami hadirkan website yang memukau,
            responsif, dan siap mengembangkan bisnis Anda.
          </p>

          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.45 }}
          >
            <Button
              asChild
              size="lg"
              className="rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 px-8 text-white hover:from-cyan-400 hover:to-sky-400"
            >
              <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer">
                Hubungi Kami <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-cyan-400/40 bg-[#0c1322] px-8 text-cyan-200 hover:bg-[#0f1a2f] hover:text-cyan-100"
            >
              <a href="#portfolio">Lihat Portfolio</a>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="relative mx-auto flex w-full max-w-md justify-center"
        >
          <div className="relative h-[360px] w-[360px] rounded-full bg-gradient-to-b from-sky-500/35 via-cyan-400/20 to-transparent p-6 ring-1 ring-cyan-300/20 md:h-[430px] md:w-[430px]">
            <div className="absolute inset-5 rounded-full border-2 border-dashed border-cyan-300/40" />
            <div className="absolute inset-11 rounded-full bg-gradient-to-br from-sky-500/85 to-cyan-500/70" />
            <img
              src={heroPerson}
              alt="Hero"
              className="absolute inset-x-0 bottom-0 mx-auto h-[310px] object-contain md:h-[365px]"
            />
          </div>

          <motion.div
            className="absolute -left-2 top-10 rounded-2xl border border-cyan-300/20 bg-[#0c1527]/90 px-3 py-2 shadow-lg backdrop-blur"
            initial={{ opacity: 0, x: -16, y: 8 }}
            animate={{ opacity: 1, x: 0, y: [0, -4, 0] }}
            transition={{ delay: 0.4, duration: 3.5, repeat: Infinity, repeatType: "loop" }}
          >
            <p className="text-xs font-semibold text-slate-400">Instagram</p>
            <p className="text-sm font-bold text-white">Konten aktif</p>
          </motion.div>
          <motion.div
            className="absolute -right-2 bottom-16 rounded-2xl border border-cyan-300/20 bg-[#0c1527]/90 px-3 py-2 shadow-lg backdrop-blur"
            initial={{ opacity: 0, x: 16, y: 8 }}
            animate={{ opacity: 1, x: 0, y: [0, 4, 0] }}
            transition={{ delay: 0.48, duration: 3.7, repeat: Infinity, repeatType: "loop" }}
          >
            <p className="text-xs font-semibold text-slate-400">Google Speed</p>
            <p className="text-sm font-bold text-white">A+ / 98</p>
          </motion.div>
        </motion.div>
      </div>

      <div className="container mt-12">
        <div className="grid gap-4 rounded-3xl border border-cyan-300/20 bg-[#0b1527]/80 p-5 text-white shadow-[0_26px_52px_-34px_rgba(8,145,178,0.85)] backdrop-blur md:grid-cols-2 md:p-6 lg:grid-cols-4">
          {heroHighlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08, duration: 0.42 }}
              className="rounded-2xl border border-cyan-300/15 bg-white/[0.03] p-4 backdrop-blur"
            >
              <item.icon className="h-5 w-5 text-cyan-300" />
              <p className="mt-3 text-sm font-extrabold">{item.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-300">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
