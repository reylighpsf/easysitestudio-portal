import { motion } from "framer-motion";
import { Globe, MailCheck, ScanSearch, Settings, Smartphone, SquareDashedMousePointer } from "lucide-react";

const featureItems = [
  {
    title: "Gratis Domain & Hosting",
    desc: "Setup awal lebih cepat dengan bantuan konfigurasi domain dan hosting.",
    icon: Globe,
  },
  {
    title: "Maintenance & Garansi",
    desc: "Perbaikan minor dan support teknis setelah website live.",
    icon: Settings,
  },
  {
    title: "Optimasi SEO Teknis",
    desc: "Struktur halaman, metadata, dan kecepatan disiapkan untuk mesin pencari.",
    icon: ScanSearch,
  },
  {
    title: "WhatsApp Chat",
    desc: "Integrasi kontak cepat agar calon klien mudah terhubung.",
    icon: Smartphone,
  },
  {
    title: "Form Email Otomatis",
    desc: "Leads masuk lebih rapi dengan notifikasi email otomatis.",
    icon: MailCheck,
  },
  {
    title: "Dashboard Statistik",
    desc: "Pantau performa website, leads, dan konten dengan mudah.",
    icon: SquareDashedMousePointer,
  },
];

const ServicesSection = () => {
  return (
    <section
      id="fitur"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#081327_0%,#0a1a33_55%,#07101f_100%)] py-24"
    >
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(#22d3ee_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="container relative">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="mb-12 text-center">
            <span className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.15em] text-cyan-200">
              Keunggulan
            </span>
            <h2 className="mt-4 text-3xl font-black text-white md:text-4xl">
              Fitur Unggulan Yang Anda Dapatkan
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
              Semua paket dirancang agar website Anda siap dipakai untuk branding, lead
              generation, dan penjualan.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featureItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl border border-cyan-300/15 bg-[#0e1a30]/85 p-5 shadow-[0_16px_38px_-28px_rgba(8,145,178,0.9)] backdrop-blur transition hover:-translate-y-1 hover:bg-[#11203a]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-200">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-extrabold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
