import { forwardRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Send, CheckCircle, PartyPopper } from "lucide-react";
import { toast } from "sonner";
import LocationPicker from "@/components/LocationPicker";
import confetti from "canvas-confetti";

const categories = [
  "عمود نور مكسور",
  "قمامة متراكمة",
  "حفرة في الطريق",
  "صرف صحي",
  "أرصفة مكسورة",
  "إشارة مرور معطلة",
  "أشجار أو حدائق مهملة",
  "ضوضاء مفرطة",
  "أخرى",
];

const governorates = [
  "القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "البحر الأحمر", "البحيرة",
  "الفيوم", "الغربية", "الإسماعيلية", "المنوفية", "المنيا", "القليوبية",
  "الوادي الجديد", "السويس", "أسوان", "أسيوط", "بني سويف", "بورسعيد",
  "دمياط", "الشرقية", "جنوب سيناء", "كفر الشيخ", "مطروح", "الأقصر",
  "قنا", "شمال سيناء", "سوهاج",
];

const ReportForm = forwardRef<HTMLDivElement>((_, ref) => {
  const [submitted, setSubmitted] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [customCategory, setCustomCategory] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Fire confetti 🎉
    const duration = 2000;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 } });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();

    toast.success("تم إرسال بلاغك بنجاح! شكراً لمشاركتك 🎉");
    setTimeout(() => {
      setSubmitted(false);
      setImagePreview(null);
      setLocation(null);
    }, 4000);
  };

  return (
    <section ref={ref} className="py-20 bg-background" id="report">
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground mb-4">
            بلّغ عن مشكلة في <span className="text-primary">حيّك</span>
          </h2>
          <p className="text-muted-foreground font-body text-lg">
            وصّف المشكلة وحدد مكانها — صوتك هيوصل للمسؤولين
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-16 animate-fade-up">
            <div className="relative inline-block mb-6">
              <CheckCircle className="w-20 h-20 text-success mx-auto animate-bounce" />
              <PartyPopper className="w-8 h-8 text-primary absolute -top-2 -right-4 animate-pulse" />
            </div>
            <h3 className="text-3xl font-display font-black text-foreground mb-3">🎉 تم الإرسال بنجاح!</h3>
            <p className="text-muted-foreground text-lg">بلاغك هيتراجع وهيتم التعامل معاه. شكراً ليك!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 glass rounded-3xl p-8 md:p-10 shadow-xl">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-display font-bold text-foreground">نوع المشكلة</label>
                <Select required value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="rounded-xl h-12">
                    <SelectValue placeholder="اختر نوع المشكلة" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedCategory === "أخرى" && (
                  <Input
                    placeholder="اكتب نوع المشكلة..."
                    className="rounded-xl h-12 mt-2"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    required
                  />
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-display font-bold text-foreground">اختر المحافظة</label>
                <Select required>
                  <SelectTrigger className="rounded-xl h-12">
                    <SelectValue placeholder="اختر المحافظة" />
                  </SelectTrigger>
                  <SelectContent>
                    {governorates.map((g) => (
                      <SelectItem key={g} value={g}>{g}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-display font-bold text-foreground">العنوان بالتفصيل</label>
              <Input
                placeholder="مثال: قدام محل XXX في شارع YYY"
                className="rounded-xl h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-display font-bold text-foreground">وصف المشكلة</label>
              <Textarea
                placeholder="اوصف المشكلة بالتفصيل... مثلاً: عمود نور مكسور من أسبوعين ومحدش صلّحه"
                className="rounded-xl min-h-[120px] resize-none"
                required
              />
            </div>

            {/* Image upload */}
            <div className="space-y-2">
              <label className="text-sm font-display font-bold text-foreground">أضف صورة (اختياري)</label>
              <div className="relative">
                {imagePreview ? (
                  <div className="relative rounded-xl overflow-hidden">
                    <img src={imagePreview} alt="preview" className="w-full h-48 object-cover rounded-xl" />
                    <button
                      type="button"
                      onClick={() => setImagePreview(null)}
                      className="absolute top-2 left-2 bg-danger text-danger-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-36 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                    <Camera className="w-8 h-8 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">اضغط لرفع صورة</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                )}
              </div>
            </div>

            {/* Map */}
            <div className="space-y-2">
              <label className="text-sm font-display font-bold text-foreground">حدد الموقع على الخريطة</label>
              <LocationPicker location={location} onLocationChange={setLocation} />
              {location && (
                <p className="text-xs text-muted-foreground">
                  الإحداثيات: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
                </p>
              )}
            </div>

            <Button type="submit" size="lg" className="w-full text-lg py-6 rounded-xl font-display font-bold">
              <Send className="w-5 h-5 ml-2" />
              إرسال البلاغ
            </Button>
          </form>
        )}
      </div>
    </section>
  );
});

ReportForm.displayName = "ReportForm";
export default ReportForm;
