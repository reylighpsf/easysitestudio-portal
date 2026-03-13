import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Code, Palette, Globe, Zap, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroPerson from "@/assets/hero-person.png";

const floatingIcons = [
  { icon: Code, color: "hsl(243, 75%, 59%)", top: "8%", right: "5%", delay: 0 },
  { icon: Palette, color: "hsl(340, 82%, 52%)", top: "18%", right: "65%", delay: 0.3 },
  { icon: Globe, color: "hsl(199, 89%, 48%)", bottom: "35%", right: "2%", delay: 0.6 },
  { icon: Zap, color: "hsl(45, 93%, 47%)", bottom: "15%", left: "5%", delay: 0.9 },
  { icon: Star, color: "hsl(280, 75%, 59%)", top: "45%", right: "70%", delay: 1.2 },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Subtle pattern background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
      }} />
      
      {/* Gradient blob decorations */}
      <motion.div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
        style={{ background: 'hsl(var(--primary) / 0.4)' }}
        animate={{ scale: [1, 1.1, 1], rotate: [0, 45, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
        style={{ background: 'hsl(280, 75%, 59%, 0.3)' }}
        animate={{ scale: [1, 1.15, 1], rotate: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative z-10 grid lg:grid-cols-2 gap-8 items-center pt-24 pb-12">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-bold mb-8 uppercase tracking-wider"
          >
            <Sparkles className="w-4 h-4" />
            Jasa Pembuatan Website
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.08] mb-6 text-foreground">
            Desain Modern,{" "}
            <span className="text-gradient">Performa</span>{" "}
            <br className="hidden md:block" />
            Luar Biasa
          </h1>

          <p className="text-lg text-muted-foreground max-w-md mb-8 leading-relaxed">
            Dengan sentuhan profesional dan teknologi terkini, kami hadirkan website yang memukau, responsif, dan siap mengembangkan bisnis Anda.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <Button variant="hero" size="lg" className="text-base px-8">
              Konsultasi Gratis <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8">
              Lihat Portfolio
            </Button>
          </div>

          {/* Avatar stack + stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-4"
          >
            <div className="flex -space-x-3">
              {[
                "hsl(243, 75%, 59%)",
                "hsl(340, 82%, 52%)",
                "hsl(45, 93%, 47%)",
                "hsl(160, 84%, 39%)",
              ].map((bg, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: bg }}
                >
                  {["A", "R", "D", "S"][i]}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                <span className="text-foreground font-bold">150+</span> Klien yang Puas
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right - Hero Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden lg:flex items-center justify-center relative"
        >
          {/* Concentric circles */}
          <div className="relative w-[480px] h-[480px]">
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-dashed border-primary/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-6 rounded-full bg-gradient-to-br from-primary/20 to-primary/5" />
            <div className="absolute inset-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/10" />
            
            {/* Person image */}
            <div className="absolute inset-16 rounded-full overflow-hidden bg-gradient-to-b from-primary/20 to-transparent">
              <img
                src={heroPerson}
                alt="Web developer"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Floating icons */}
          {floatingIcons.map(({ icon: Icon, color, delay, ...pos }, i) => (
            <motion.div
              key={i}
              className="absolute w-12 h-12 rounded-xl bg-background shadow-lg border border-border flex items-center justify-center"
              style={{ ...pos }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
              transition={{
                opacity: { delay: 0.6 + delay },
                scale: { delay: 0.6 + delay },
                y: { delay: 0.6 + delay, duration: 3, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <Icon className="w-6 h-6" style={{ color }} />
            </motion.div>
          ))}

          {/* Floating card - top right */}
          <motion.div
            className="absolute top-4 right-0 glass rounded-xl px-4 py-3 shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
            transition={{ opacity: { delay: 1 }, x: { delay: 1 }, y: { delay: 1, duration: 4, repeat: Infinity, ease: "easeInOut" } }}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">Performa A+</p>
                <p className="text-[10px] text-muted-foreground">PageSpeed 98/100</p>
              </div>
            </div>
          </motion.div>

          {/* Floating card - bottom */}
          <motion.div
            className="absolute bottom-8 left-4 glass rounded-xl px-4 py-3 shadow-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
            transition={{ opacity: { delay: 1.2 }, x: { delay: 1.2 }, y: { delay: 1.2, duration: 3.5, repeat: Infinity, ease: "easeInOut" } }}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">Desain Premium</p>
                <p className="text-[10px] text-muted-foreground">UI/UX Profesional</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
