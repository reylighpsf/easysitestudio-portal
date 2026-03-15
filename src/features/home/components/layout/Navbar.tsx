import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import navbarLogo from "@/assets/navbar-logo.svg";

const homeNavLinks = [
  { href: "#fitur", label: "Fitur" },
  { href: "#harga", label: "Harga" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#kontak", label: "Kontak" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed left-0 right-0 top-0 z-50 border-b border-cyan-500/20 bg-[#08101f]/85 shadow-[0_14px_40px_-28px_rgba(8,145,178,0.9)] backdrop-blur-xl"
    >
      <div className="container flex h-20 items-center justify-between">
        <a href="#" className="flex items-center gap-3 text-white">
          <img
            src={navbarLogo}
            alt="Logo SiteStudio"
            className="h-14 w-14 "
          />
          <div className="leading-tight">
            <p className="text-xl font-black text-white">SiteStudio</p>
            <p className="hidden text-xs font-semibold uppercase tracking-[0.08em] text-cyan-200/90 sm:block">
              Jasa Website dan Landing Page
            </p>
          </div>
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {homeNavLinks.map((link, index) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 + index * 0.06, duration: 0.3 }}
              className="text-sm font-semibold text-slate-300 transition-colors hover:text-cyan-300"
            >
              {link.label}
            </motion.a>
          ))}
          <Button
            asChild
            size="sm"
            className="rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 px-5 text-white hover:from-cyan-400 hover:to-sky-400"
          >
            <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer">
              Hubungi Kami
            </a>
          </Button>
        </div>

        <button
          type="button"
          className="rounded-md border border-cyan-500/25 p-2 text-slate-200 md:hidden"
          aria-label={open ? "Tutup menu navigasi" : "Buka menu navigasi"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-cyan-500/20 bg-[#091325]/95 md:hidden"
          >
            <div className="container flex flex-col gap-4 py-4">
              {homeNavLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + index * 0.04, duration: 0.25 }}
                  className="text-sm font-semibold text-slate-200"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <Button
                asChild
                size="sm"
                className="w-fit rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400"
              >
                <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer">
                  Hubungi Kami
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
