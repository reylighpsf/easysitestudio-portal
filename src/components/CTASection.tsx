import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl bg-gradient-to-br from-primary to-[hsl(280,75%,50%)] p-12 md:p-20 text-center overflow-hidden"
        >
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-background/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-background/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-primary-foreground mb-4">
              Siap Wujudkan Website Impian?
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-lg mx-auto mb-8">
              Konsultasi gratis dan dapatkan penawaran terbaik untuk proyek Anda.
            </p>
            <Button
              size="lg"
              className="bg-background text-foreground hover:bg-background/90 shadow-xl text-base font-semibold"
            >
              Mulai Konsultasi Gratis <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
