import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import InteractiveGrid from "./InteractiveGrid";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="w-full h-full" style={{
          backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Jasa Pembuatan Website #1
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.05] mb-6">
            Kami Bangun Website yang{" "}
            <span className="text-gradient">Mengembangkan</span>{" "}
            Bisnis Anda
          </h1>

          <p className="text-lg text-muted-foreground max-w-lg mb-8">
            Landing page, e-commerce, atau web app custom — kami wujudkan visi digital Anda dengan desain modern dan performa tinggi.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button variant="hero" size="lg" className="text-base">
              Mulai Proyek <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
            <Button variant="heroOutline" size="lg" className="text-base">
              Lihat Portfolio
            </Button>
          </div>

          <div className="flex items-center gap-8 mt-10 text-sm text-muted-foreground">
            <div><span className="text-2xl font-bold text-foreground">150+</span><br/>Proyek Selesai</div>
            <div className="w-px h-10 bg-border" />
            <div><span className="text-2xl font-bold text-foreground">50+</span><br/>Klien Puas</div>
            <div className="w-px h-10 bg-border" />
            <div><span className="text-2xl font-bold text-foreground">5★</span><br/>Rating</div>
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
