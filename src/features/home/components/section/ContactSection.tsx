import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactSection = () => (
  <section id="kontak" className="bg-[#050b16] py-20">
    <div className="container space-y-14">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          className="space-y-5"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.14em] text-cyan-200">
            Hubungi Kami
          </span>
          <h3 className="text-3xl font-black text-white">Siap Bangun Website Anda?</h3>
          <p className="max-w-md text-slate-300">
            Konsultasikan kebutuhan Anda sekarang. Tim kami akan bantu dari konsep sampai website
            live.
          </p>

          <div className="space-y-3">
            <motion.p
              className="flex items-center gap-2 text-sm text-slate-200"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06, duration: 0.3 }}
            >
              <Phone className="h-4 w-4 text-cyan-300" /> +62 812-3456-7890
            </motion.p>
            <motion.p
              className="flex items-center gap-2 text-sm text-slate-200"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12, duration: 0.3 }}
            >
              <Mail className="h-4 w-4 text-cyan-300" /> support@easysitestudio.com
            </motion.p>
            <motion.p
              className="flex items-center gap-2 text-sm text-slate-200"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.18, duration: 0.3 }}
            >
              <MapPin className="h-4 w-4 text-cyan-300" /> Jakarta, Indonesia
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          className="rounded-3xl border border-cyan-300/20 bg-[#0d182d] p-6 shadow-[0_20px_46px_-30px_rgba(8,145,178,0.9)]"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <Input
              placeholder="Nama"
              className="border-cyan-300/20 bg-[#091325] text-slate-100 placeholder:text-slate-400"
            />
            <Input
              placeholder="Email"
              type="email"
              className="border-cyan-300/20 bg-[#091325] text-slate-100 placeholder:text-slate-400"
            />
          </div>
          <Input
            className="mt-3 border-cyan-300/20 bg-[#091325] text-slate-100 placeholder:text-slate-400"
            placeholder="Subjek"
          />
          <Textarea
            className="mt-3 min-h-[140px] border-cyan-300/20 bg-[#091325] text-slate-100 placeholder:text-slate-400"
            placeholder="Tulis kebutuhan website Anda..."
          />
          <Button
            asChild
            className="mt-4 rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 px-8 text-white hover:from-cyan-400 hover:to-sky-400"
          >
            <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer">
              Kirim via WhatsApp
            </a>
          </Button>
        </motion.div>
      </div>
    </div>
  </section>
);

export default ContactSection;
