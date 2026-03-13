import { motion } from "framer-motion";
import { MessageSquare, Pencil, Code, Rocket } from "lucide-react";

const steps = [
  { icon: MessageSquare, title: "Diskusi & Brief", desc: "Kami pahami kebutuhan dan tujuan bisnis Anda secara mendalam." },
  { icon: Pencil, title: "Desain & Prototype", desc: "Mockup interaktif yang bisa Anda review sebelum development." },
  { icon: Code, title: "Development", desc: "Coding dengan teknologi terkini dan standar kualitas tinggi." },
  { icon: Rocket, title: "Launch & Support", desc: "Go live dengan dukungan teknis dan optimasi berkelanjutan." },
];

const ProcessSection = () => {
  return (
    <section id="proses" className="py-24">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary">Proses Kerja</span>
          <h2 className="text-3xl md:text-5xl font-black mt-2">
            4 Langkah <span className="text-gradient">Simpel</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-12">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative flex gap-6 items-start"
              >
                <div className="relative z-10 w-12 h-12 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center flex-shrink-0">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="pt-1">
                  <div className="text-xs font-medium text-muted-foreground mb-1">Langkah {i + 1}</div>
                  <h3 className="text-xl font-bold mb-1">{s.title}</h3>
                  <p className="text-muted-foreground text-sm">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
