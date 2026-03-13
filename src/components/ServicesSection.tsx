import { motion } from "framer-motion";
import { Globe, ShoppingCart, Code2, Palette, Rocket, Search } from "lucide-react";

const services = [
  { icon: Globe, title: "Landing Page", desc: "Halaman yang dioptimasi untuk konversi tinggi dan first impression yang kuat." },
  { icon: ShoppingCart, title: "E-commerce", desc: "Toko online lengkap dengan payment gateway dan manajemen produk." },
  { icon: Code2, title: "Web App Custom", desc: "Aplikasi web tailor-made sesuai kebutuhan bisnis Anda." },
  { icon: Palette, title: "UI/UX Design", desc: "Desain antarmuka yang intuitif dan pengalaman pengguna yang menyenangkan." },
  { icon: Rocket, title: "Optimasi Performa", desc: "Website cepat, responsif, dan skor Lighthouse sempurna." },
  { icon: Search, title: "SEO", desc: "Optimasi mesin pencari agar bisnis Anda mudah ditemukan." },
];

const ServicesSection = () => {
  return (
    <section id="layanan" className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary">Layanan Kami</span>
          <h2 className="text-3xl md:text-5xl font-black mt-2">
            Solusi Digital <span className="text-gradient">Lengkap</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              <div className="mt-4 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Pelajari lebih lanjut →
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
