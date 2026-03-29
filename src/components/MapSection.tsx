import { MapPin, Flame } from "lucide-react";

const hotspots = [
  { name: "شبرا", count: 156, top: "25%", right: "40%", size: "lg" },
  { name: "مدينة نصر", count: 132, top: "45%", right: "25%", size: "lg" },
  { name: "الدقي", count: 89, top: "55%", right: "55%", size: "md" },
  { name: "المعادي", count: 67, top: "70%", right: "45%", size: "md" },
  { name: "مصر الجديدة", count: 94, top: "30%", right: "20%", size: "md" },
  { name: "حلوان", count: 45, top: "85%", right: "50%", size: "sm" },
  { name: "6 أكتوبر", count: 78, top: "40%", right: "75%", size: "md" },
  { name: "الزمالك", count: 34, top: "45%", right: "42%", size: "sm" },
];

const sizeMap = {
  lg: "w-16 h-16 text-xs",
  md: "w-12 h-12 text-[10px]",
  sm: "w-10 h-10 text-[9px]",
};

const MapSection = () => {
  return (
    <section id="hotmap" className="py-20 bg-card">
      <div className="container max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground mb-4">
            <Flame className="inline w-8 h-8 text-primary ml-2" />
            خريطة المشاكل <span className="text-primary">الساخنة</span>
          </h2>
          <p className="text-muted-foreground font-body text-lg">المناطق الأكثر بلاغات — كل ما الدايرة أكبر كل ما المشاكل أكتر</p>
        </div>

        <div className="relative bg-muted/50 rounded-2xl sm:rounded-3xl border border-border h-[350px] sm:h-[450px] md:h-[500px] overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }} />

          {hotspots.map((spot) => (
            <div
              key={spot.name}
              className="absolute group cursor-pointer"
              style={{ top: spot.top, right: spot.right }}
            >
              <div className={`${sizeMap[spot.size as keyof typeof sizeMap]} rounded-full bg-primary/20 border-2 border-primary flex flex-col items-center justify-center hover:bg-primary/30 hover:scale-110 transition-all`}>
                <span className="font-display font-black text-primary">{spot.count}</span>
              </div>
              <div className="absolute -bottom-7 right-1/2 translate-x-1/2 whitespace-nowrap bg-foreground text-background text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity font-display">
                {spot.name}
              </div>
            </div>
          ))}

          <div className="absolute bottom-4 left-4 glass rounded-xl p-4 text-sm">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="font-display font-bold text-foreground">دليل الخريطة</span>
            </div>
            <div className="space-y-1 text-muted-foreground font-body text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-primary/20 border border-primary" />
                <span>منطقة بها بلاغات</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/20 border-2 border-primary" />
                <span>منطقة ساخنة</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
