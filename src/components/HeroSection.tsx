import heroBg from "@/assets/hero-bg.jpg";
import { Megaphone, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = ({ onScrollToReport }: { onScrollToReport: () => void }) => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="حي سكني" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay-from)/0.92)] via-[hsl(var(--hero-overlay-from)/0.65)] to-[hsl(var(--hero-overlay-from)/0.35)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-3 mb-6 px-5 py-2.5 rounded-full glass animate-fade-up">
          <Megaphone className="w-5 h-5 text-primary" />
          <span className="text-primary text-sm font-display font-bold">منصة مجتمعية للإبلاغ عن مشاكل حيّك</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-black text-primary-foreground mb-4 sm:mb-6 leading-tight animate-fade-up" style={{ animationDelay: "0.15s" }}>
          صوتك <span className="text-primary">مسموع</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-primary-foreground/80 font-body max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed animate-fade-up px-2" style={{ animationDelay: "0.3s" }}>
          بلّغ عن أي مشكلة في شارعك أو حيّك — عمود نور مكسور، قمامة متراكمة، حفرة في الطريق.
          صوتك هيوصل ومش هيضيع.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.45s" }}>
          <Button
            size="lg"
            onClick={onScrollToReport}
            className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-xl font-display font-bold animate-pulse-glow"
          >
            <Megaphone className="w-5 h-5 ml-2" />
            بلّغ عن مشكلة
          </Button>
          <Button
            size="lg"
            onClick={() => document.getElementById("hotmap")?.scrollIntoView({ behavior: "smooth" })}
            className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-xl font-display font-bold bg-primary-foreground/20 text-primary-foreground border-2 border-primary-foreground/40 hover:bg-primary-foreground/30 backdrop-blur-sm"
          >
            استكشف البلاغات
            <ArrowDown className="w-5 h-5 mr-2" />
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-primary-foreground/50" />
      </div>
    </section>
  );
};

export default HeroSection;
