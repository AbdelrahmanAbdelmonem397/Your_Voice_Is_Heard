import { MapPin, Users, CheckCircle, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { icon: AlertTriangle, label: "بلاغ مُسجّل", value: "1,247", color: "text-primary" },
  { icon: MapPin, label: "منطقة مُغطّاة", value: "32", color: "text-accent" },
  { icon: CheckCircle, label: "تم حلها", value: "834", color: "text-success" },
  { icon: Users, label: "مواطن مشارك", value: "3,891", color: "text-info" },
];

const StatsSection = () => {
  return (
    <section id="stats" className="py-16 bg-card border-b border-border">
      <div className="container max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 10px 30px -10px hsl(var(--primary) / 0.2)" }}
              className="text-center p-6 rounded-2xl bg-background transition-shadow"
            >
              <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
              <div className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-body">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
