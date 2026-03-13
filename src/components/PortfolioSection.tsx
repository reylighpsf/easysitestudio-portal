import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  { title: "TokoBaju.id", category: "E-commerce", color: "from-indigo-500 to-purple-600" },
  { title: "FinanceApp", category: "Web App", color: "from-emerald-500 to-teal-600" },
  { title: "StartupLanding", category: "Landing Page", color: "from-orange-500 to-red-600" },
  { title: "EduPlatform", category: "Web App", color: "from-blue-500 to-cyan-600" },
  { title: "FoodDelivery", category: "E-commerce", color: "from-pink-500 to-rose-600" },
];

const PortfolioSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section id="portfolio" className="py-24 overflow-hidden bg-card/50">
      <div className="container mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-medium text-primary">Portfolio</span>
          <h2 className="text-3xl md:text-5xl font-black mt-2">
            Karya <span className="text-gradient">Terbaik</span> Kami
          </h2>
        </motion.div>
      </div>

      <div ref={containerRef}>
        <motion.div style={{ x }} className="flex gap-6 pl-8">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="group relative flex-shrink-0 w-[350px] md:w-[450px] aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-90`} />
              <div className="absolute inset-0 flex flex-col justify-between p-8">
                <span className="self-start px-3 py-1 bg-background/20 backdrop-blur-sm rounded-full text-xs font-medium text-primary-foreground">
                  {p.category}
                </span>
                <div>
                  <h3 className="text-2xl font-bold text-primary-foreground mb-2">{p.title}</h3>
                  <div className="flex items-center gap-2 text-primary-foreground/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    Lihat Detail <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
