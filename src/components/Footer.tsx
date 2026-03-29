import { Megaphone, Code } from "lucide-react";

const Footer = () => (
  <footer className="py-10 bg-foreground text-background">
    <div className="container max-w-6xl text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Megaphone className="w-6 h-6 text-primary" />
        <span className="font-display font-black text-xl">صوتك مسموع</span>
      </div>
      <p className="text-background/60 font-body text-sm mb-4 flex items-center justify-center gap-1">
        صنع بواسطة عبدالرحمن عبدالمنعم عبدالرحمن <Code className="w-4 h-4 text-primary" />
      </p>
      <p className="text-background/40 font-body text-xs">© 2026 صوتك مسموع — جميع الحقوق محفوظة</p>
    </div>
  </footer>
);

export default Footer;
