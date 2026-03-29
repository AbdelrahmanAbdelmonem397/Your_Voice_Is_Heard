import { MapPin, ThumbsUp, Clock, AlertTriangle, Lightbulb, Construction } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const mockReports = [
  {
    id: 1,
    title: "عمود نور مكسور في شارع فيصل",
    area: "الدقي",
    category: "عمود نور مكسور",
    description: "عمود النور قدام محل الحلاق مكسور من 3 أسابيع والشارع ضلمة بالليل",
    votes: 47,
    time: "منذ ساعتين",
    status: "pending" as const,
    icon: Lightbulb,
  },
  {
    id: 2,
    title: "قمامة متراكمة في شارع الجلاء",
    area: "شبرا",
    category: "قمامة متراكمة",
    description: "القمامة مش بتتجمع من أسبوعين والريحة بقت صعبة جداً",
    votes: 83,
    time: "منذ 5 ساعات",
    status: "in_progress" as const,
    icon: AlertTriangle,
  },
  {
    id: 3,
    title: "حفرة كبيرة في الطريق الرئيسي",
    area: "مدينة نصر",
    category: "حفرة في الطريق",
    description: "حفرة كبيرة قدام مدرسة النصر وخطر على العربيات والأطفال",
    votes: 124,
    time: "منذ يوم",
    status: "resolved" as const,
    icon: Construction,
  },
  {
    id: 4,
    title: "صرف صحي مكسور",
    area: "المعادي",
    category: "صرف صحي",
    description: "ماسورة مكسورة والميه بتنزل في الشارع من 4 أيام",
    votes: 56,
    time: "منذ 3 ساعات",
    status: "pending" as const,
    icon: AlertTriangle,
  },
  {
    id: 5,
    title: "إشارة مرور معطلة",
    area: "مصر الجديدة",
    category: "إشارة مرور",
    description: "إشارة المرور عند تقاطع الميرغني مش شغالة من أسبوع",
    votes: 91,
    time: "منذ 8 ساعات",
    status: "in_progress" as const,
    icon: AlertTriangle,
  },
];

const statusConfig = {
  pending: { label: "قيد المراجعة", className: "bg-warm/15 text-warm border-warm/30" },
  in_progress: { label: "جاري الحل", className: "bg-info/15 text-info border-info/30" },
  resolved: { label: "تم الحل", className: "bg-success/15 text-success border-success/30" },
};

const areas = ["الكل", "الدقي", "شبرا", "مدينة نصر", "المعادي", "مصر الجديدة"];

const ReportsSection = () => {
  const [filter, setFilter] = useState("الكل");
  const [votes, setVotes] = useState<Record<number, number>>(
    Object.fromEntries(mockReports.map((r) => [r.id, r.votes]))
  );
  const [voted, setVoted] = useState<Set<number>>(new Set());
  const filtered = filter === "الكل" ? mockReports : mockReports.filter((r) => r.area === filter);

  const handleVote = (id: number) => {
    if (voted.has(id)) {
      setVoted((prev) => { const n = new Set(prev); n.delete(id); return n; });
      setVotes((prev) => ({ ...prev, [id]: prev[id] - 1 }));
    } else {
      setVoted((prev) => new Set(prev).add(id));
      setVotes((prev) => ({ ...prev, [id]: prev[id] + 1 }));
    }
  };

  return (
    <section id="latest" className="py-20 bg-muted/50">
      <div className="container max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground mb-4">
            أحدث <span className="text-primary">البلاغات</span>
          </h2>
          <p className="text-muted-foreground font-body text-lg">البلاغات الأكثر تفاعلاً من مختلف المناطق</p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {areas.map((area) => (
            <button
              key={area}
              onClick={() => setFilter(area)}
              className={`px-4 py-2 rounded-full text-sm font-display font-bold transition-all ${
                filter === area
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-card text-muted-foreground hover:bg-secondary border border-border"
              }`}
            >
              {area}
            </button>
          ))}
        </div>

        {/* Reports grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filtered.map((report, i) => (
            <div
              key={report.id}
              className="bg-card rounded-2xl p-6 border border-border hover:shadow-xl hover:-translate-y-1 transition-all animate-fade-up group"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <report.icon className="w-6 h-6 text-primary" />
                </div>
                <Badge variant="outline" className={statusConfig[report.status].className}>
                  {statusConfig[report.status].label}
                </Badge>
              </div>

              <h3 className="font-display font-bold text-foreground mb-2 leading-snug">{report.title}</h3>
              <p className="text-sm text-muted-foreground font-body mb-4 line-clamp-2">{report.description}</p>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{report.area}</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{report.time}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <button
                  onClick={() => handleVote(report.id)}
                  className={`flex items-center gap-2 font-display font-bold text-sm transition-colors ${
                    voted.has(report.id) ? "text-success" : "text-primary hover:text-primary/80"
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${voted.has(report.id) ? "fill-success" : ""}`} />
                  تأييد ({votes[report.id]})
                </button>
                <span className="text-xs text-muted-foreground">{report.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReportsSection;
