import { motion } from "framer-motion";
import { Megaphone, MapPin, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Megaphone,
    step: "١",
    title: "بلّغ عن المشكلة",
    description: "اختر نوع المشكلة واوصفها بالتفصيل — ممكن تضيف صورة عشان توضّح أكتر",
  },
  {
    icon: MapPin,
    step: "٢",
    title: "حدّد الموقع",
    description: "استخدم الخريطة أو ابحث عن منطقتك عشان نعرف مكان المشكلة بالظبط",
  },
  {
    icon: CheckCircle,
    step: "٣",
    title: "تابع البلاغ",
    description: "بلاغك هيتراجع ويتحول للجهة المسؤولة — وتقدر تتابع حالته لحد ما يتحل",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how" className="py-20 bg-background">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground mb-4">
            إزاي <span className="text-primary">تبلّغ؟</span>
          </h2>
          <p className="text-muted-foreground font-body text-lg">٣ خطوات بسيطة وصوتك هيوصل</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-16 left-[15%] right-[15%] h-0.5 bg-gradient-to-l from-primary/20 via-primary/40 to-primary/20" />

          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative text-center group"
            >
              <div className="relative mx-auto w-20 h-20 rounded-2xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
                <step.icon className="w-8 h-8 text-primary" />
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display font-black text-sm shadow-lg shadow-primary/30">
                  {step.step}
                </div>
              </div>
              <h3 className="text-xl font-display font-bold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground font-body leading-relaxed max-w-xs mx-auto">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
