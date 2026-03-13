import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import InteractiveGrid from "./InteractiveGrid";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Fullpage background image */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>

      <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center pt-24">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary-foreground text-sm font-medium mb-6 border border-primary/30"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            Jasa Pembuatan Website #1
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.05] mb-6 text-primary-foreground">
            Kami Bangun Website yang{" "}
            <span className="text-gradient">Mengembangkan</span>{" "}
            Bisnis Anda
          </h1>

          <p className="text-lg text-primary-foreground/70 max-w-lg mb-8">
            Landing page, e-commerce, atau web app custom — kami wujudkan visi digital Anda dengan desain modern dan performa tinggi.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button variant="hero" size="lg" className="text-base">
              Mulai Proyek <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
            <Button size="lg" className="text-base border-2 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 transition-all duration-300 hover:-translate-y-0.5">
              Lihat Portfolio
            </Button>
          </div>

          <div className="flex items-center gap-8 mt-10 text-sm text-primary-foreground/60">
            <div><span className="text-2xl font-bold text-primary-foreground">150+</span><br/>Proyek Selesai</div>
            <div className="w-px h-10 bg-primary-foreground/20" />
            <div><span className="text-2xl font-bold text-primary-foreground">50+</span><br/>Klien Puas</div>
            <div className="w-px h-10 bg-primary-foreground/20" />
            <div><span className="text-2xl font-bold text-primary-foreground">5★</span><br/>Rating</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden lg:block"
        >
          <InteractiveGrid />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
