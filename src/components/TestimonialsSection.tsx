import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Rina Dewi", role: "CEO, TokoBaju.id", text: "Website kami sekarang jauh lebih profesional. Penjualan meningkat 200% sejak redesign!" },
  { name: "Budi Santoso", role: "Founder, FinanceApp", text: "Tim yang sangat responsif dan hasil kerja melampaui ekspektasi. Highly recommended!" },
  { name: "Sari Wulan", role: "Marketing, EduPlatform", text: "Proses pengerjaan sangat transparan dan hasilnya luar biasa. Pasti akan kerja sama lagi." },
];

const TestimonialsSection = () => {
  return (
    <section id="testimoni" className="py-24 bg-card/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary">Testimoni</span>
          <h2 className="text-3xl md:text-5xl font-black mt-2">
            Apa Kata <span className="text-gradient">Klien</span> Kami
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="p-8 rounded-2xl bg-background border border-border/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {Array(5).fill(0).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">"{t.text}"</p>
              <div>
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
