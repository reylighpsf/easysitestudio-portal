import Navbar from "@/features/home/components/layout/Navbar";
import Footer from "@/features/home/components/layout/Footer";
import FloatingWhatsAppButton from "@/features/home/components/layout/FloatingWhatsAppButton";
import HeroSection from "@/features/home/components/section/HeroSection";
import AboutSection from "@/features/home/components/section/AboutSection";
import FiturSection from "@/features/home/components/section/FiturSection";
import PriceSection from "@/features/home/components/section/PriceSection";
import PortfolioSection from "@/features/home/components/section/PortfolioSection";
import ContactSection from "@/features/home/components/section/ContactSection";
import { useSiteData } from "@/hooks/use-site-data";

const HomePage = () => {
  const { apiHealth, portfolioProducts, pricePlans } = useSiteData();

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FiturSection />
      <PriceSection plans={pricePlans} />
      <PortfolioSection products={portfolioProducts} />
      <ContactSection />
      <FloatingWhatsAppButton />
      <Footer apiHealth={apiHealth} />
    </div>
  );
};

export default HomePage;
