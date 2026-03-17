import { motion } from "framer-motion";
import type { ApiHealth } from "@/lib/api";

type FooterProps = {
  apiHealth?: ApiHealth;
};


const footerLinks = [
  { href: "#fitur", label: "Fitur" },
  { href: "#harga", label: "Harga" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#kontak", label: "Kontak" },
];

const Footer = ({ apiHealth }: FooterProps) => (
  <footer>
    <section className="bg-[linear-gradient(180deg,#030711_0%,#02050d_100%)] py-10 text-white">
      <div className="container grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <span className="text-xl font-extrabold text-white">SiteStudio</span>
          <p className="mt-2 text-xs text-cyan-100/85">
            API Status: <span className="font-bold">{apiHealth?.status ?? "offline"}</span>
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-4 text-sm text-slate-300"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08, duration: 0.35 }}
        >
          {footerLinks.map((link, index) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 + index * 0.04, duration: 0.25 }}
              className="transition hover:text-cyan-200"
            >
              {link.label}
            </motion.a>
          ))}
        </motion.div>

        <motion.p
          className="text-xs text-slate-400 md:text-right"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.14, duration: 0.35 }}
        >
          (c) 2026 SiteStudio. All rights reserved.
        </motion.p>
      </div>
    </section>
  </footer>
);

export default Footer;
