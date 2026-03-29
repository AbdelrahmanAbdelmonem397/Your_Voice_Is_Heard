import { useRef } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ReportForm from "@/components/ReportForm";
import ReportsSection from "@/components/ReportsSection";
import MapSection from "@/components/MapSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  const reportRef = useRef<HTMLDivElement>(null);

  const scrollToReport = () => {
    reportRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection onScrollToReport={scrollToReport} />
      <StatsSection />
      <HowItWorksSection />
      <ReportForm ref={reportRef} />
      <ReportsSection />
      <MapSection />
      <FAQSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
