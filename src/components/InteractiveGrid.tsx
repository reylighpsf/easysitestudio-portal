import { useState } from "react";
import { motion } from "framer-motion";

const InteractiveGrid = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const cols = 6;
  const rows = 6;
  const cells = Array.from({ length: cols * rows });

  return (
    <div className="relative aspect-square max-w-[500px] mx-auto">
      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 rounded-3xl blur-3xl" />

      <div className="relative grid gap-2 p-6" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {cells.map((_, i) => {
          const row = Math.floor(i / cols);
          const col = i % cols;
          const isActive = hovered !== null && (
            Math.abs(Math.floor(hovered / cols) - row) + Math.abs((hovered % cols) - col) <= 2
          );

          return (
            <motion.div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              animate={{
                scale: isActive ? 1.1 : 1,
                backgroundColor: isActive
                  ? `hsl(243 75% 59% / ${0.6 - Math.abs(Math.floor(hovered! / cols) - row) * 0.15 - Math.abs((hovered! % cols) - col) * 0.15})`
                  : "hsl(0 0% 96%)",
              }}
              transition={{ duration: 0.2 }}
              className="aspect-square rounded-xl cursor-pointer"
            />
          );
        })}
      </div>

      {/* Floating cards */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute top-8 -right-4 glass rounded-2xl p-4 shadow-xl"
      >
        <div className="text-xs text-muted-foreground">Konversi</div>
        <div className="text-2xl font-bold text-foreground">+127%</div>
        <div className="w-24 h-1.5 bg-primary/20 rounded-full mt-2">
          <div className="w-3/4 h-full bg-primary rounded-full" />
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-12 -left-4 glass rounded-2xl p-4 shadow-xl"
      >
        <div className="text-xs text-muted-foreground">Kecepatan</div>
        <div className="text-2xl font-bold text-foreground">98<span className="text-sm text-primary">/100</span></div>
      </motion.div>
    </div>
  );
};

export default InteractiveGrid;
