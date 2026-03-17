import { MessageCircle } from "lucide-react";

const FloatingWhatsAppButton = () => (
  <a
    href="https://wa.me/6281234567890"
    target="_blank"
    rel="noreferrer"
    aria-label="Chat WhatsApp"
    className="fixed bottom-5 right-5 z-[70] inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-bold text-[#04180d] shadow-[0_16px_38px_-16px_rgba(37,211,102,0.85)] transition hover:translate-y-[-1px] hover:bg-[#33dd73] md:bottom-7 md:right-7"
  >
    <MessageCircle className="h-5 w-5" />
    Chat WhatsApp
  </a>
);

export default FloatingWhatsAppButton;
