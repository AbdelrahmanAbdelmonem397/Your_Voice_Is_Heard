import { useState, useEffect } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
      const isBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 100;
      setAtBottom(isBottom);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 flex flex-col gap-2 sm:gap-3">
      {!atBottom && (
        <button
          onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary text-secondary-foreground shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center"
          aria-label="النزول للأسفل"
        >
          <ArrowDown className="w-5 h-5" />
        </button>
      )}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center"
        aria-label="العودة للأعلى"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ScrollToTop;
