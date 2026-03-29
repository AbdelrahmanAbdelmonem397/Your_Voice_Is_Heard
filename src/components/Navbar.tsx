import { useState, useEffect } from "react";
import { Megaphone, Menu, X, ChevronLeft, Moon, Sun } from "lucide-react";

const navLinks = [
  { label: "الرئيسية", href: "#hero" },
  { label: "الإحصائيات", href: "#stats" },
  { label: "إزاي تبلّغ", href: "#how" },
  { label: "بلّغ عن مشكلة", href: "#report" },
  { label: "أحدث البلاغات", href: "#latest" },
  { label: "الخريطة", href: "#hotmap" },
  { label: "أسئلة شائعة", href: "#faq" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // Detect active section
      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(`#${sections[i]}`);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-2xl shadow-[0_1px_30px_-8px_hsl(var(--primary)/0.15)] border-b border-border/40"
            : "bg-transparent"
        }`}
      >
        <div className="container max-w-6xl flex items-center justify-between h-16 md:h-[72px] px-4">
          {/* Logo */}
          <button
            onClick={() => handleNav("#hero")}
            className="flex items-center gap-2.5 group"
          >
            <div className={`relative flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300 ${
              scrolled
                ? "bg-primary/10 group-hover:bg-primary/20"
                : "bg-primary-foreground/10 group-hover:bg-primary-foreground/20"
            }`}>
              <Megaphone className={`w-5 h-5 transition-colors duration-300 ${
                scrolled ? "text-primary" : "text-primary-foreground"
              }`} />
            </div>
            <div className="flex flex-col items-start">
              <span className={`font-display font-black text-base leading-tight transition-colors duration-300 ${
                scrolled ? "text-foreground" : "text-primary-foreground"
              }`}>
                صوتك مسموع
              </span>
              <span className={`text-[10px] font-body leading-none transition-colors duration-300 ${
                scrolled ? "text-muted-foreground" : "text-primary-foreground/50"
              }`}>
                منصة بلاغات الأحياء
              </span>
            </div>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5 bg-foreground/5 backdrop-blur-sm rounded-2xl p-1.5 border border-border/20">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className={`relative px-4 py-2 rounded-xl text-sm font-display font-bold transition-all duration-300 ${
                    isActive
                      ? scrolled
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                        : "bg-primary-foreground/20 text-primary-foreground shadow-md"
                      : scrolled
                        ? "text-foreground/70 hover:text-foreground hover:bg-muted/60"
                        : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDark(!dark)}
            className={`hidden md:flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${
              scrolled
                ? "text-foreground/70 hover:text-foreground hover:bg-muted/60"
                : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
            }`}
            aria-label="تبديل الوضع الليلي"
          >
            {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* CTA Button - Desktop */}
          <button
            onClick={() => handleNav("#report")}
            className={`hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-display font-bold transition-all duration-300 ${
              scrolled
                ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
                : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25"
            }`}
          >
            <Megaphone className="w-4 h-4" />
            بلّغ الآن
          </button>

          {/* Mobile toggle */}
          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <div className={`transition-all duration-300 ${mobileOpen ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"} absolute`}>
              <Menu className={`w-6 h-6 ${scrolled ? "text-foreground" : "text-primary-foreground"}`} />
            </div>
            <div className={`transition-all duration-300 ${mobileOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"} absolute`}>
              <X className={`w-6 h-6 ${scrolled ? "text-foreground" : "text-primary-foreground"}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu - Full screen overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 md:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background/95 backdrop-blur-2xl"
          onClick={() => setMobileOpen(false)}
        />

        {/* Menu content */}
        <div className="relative z-10 flex flex-col justify-center h-full px-8">
          <div className="space-y-2">
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.href;
              return (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl text-lg font-display font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "text-foreground/70 hover:bg-muted hover:text-foreground"
                  }`}
                  style={{
                    transitionDelay: mobileOpen ? `${i * 60}ms` : "0ms",
                    transform: mobileOpen ? "translateX(0)" : "translateX(30px)",
                    opacity: mobileOpen ? 1 : 0,
                  }}
                >
                  <span>{link.label}</span>
                  <ChevronLeft className="w-5 h-5 opacity-40" />
                </button>
              );
            })}
          </div>

          {/* Mobile CTA */}
          <div
            className="mt-8"
            style={{
              transitionDelay: mobileOpen ? `${navLinks.length * 60}ms` : "0ms",
              transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
              opacity: mobileOpen ? 1 : 0,
              transition: "all 0.3s ease",
            }}
          >
            <button
              onClick={() => handleNav("#report")}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-primary text-primary-foreground text-lg font-display font-bold shadow-xl shadow-primary/25"
            >
              <Megaphone className="w-5 h-5" />
              بلّغ عن مشكلة الآن
            </button>

            {/* Mobile dark mode toggle */}
            <button
              onClick={() => setDark(!dark)}
              className="mt-4 w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-muted text-foreground text-lg font-display font-bold"
            >
              {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              {dark ? "الوضع النهاري" : "الوضع الليلي"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
