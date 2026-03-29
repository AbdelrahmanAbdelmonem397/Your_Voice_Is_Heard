import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "هل المنصة دي حكومية؟",
    answer: "لا، المنصة دي مبادرة مجتمعية هدفها تجميع بلاغات المواطنين وتوصيل صوتهم للجهات المسؤولة بشكل منظم.",
  },
  {
    question: "إيه أنواع المشاكل اللي أقدر أبلّغ عنها؟",
    answer: "تقدر تبلّغ عن أي مشكلة في حيّك زي: أعمدة نور مكسورة، قمامة متراكمة، حفر في الطريق، صرف صحي، إشارات مرور معطلة، وغيرها.",
  },
  {
    question: "بلاغي هيوصل لمين؟",
    answer: "البلاغات بتتجمع وبيتم تصنيفها حسب المنطقة والنوع، وبعدين بتتحول للجهة المسؤولة المعينه سواء الحي أو المحافظة.",
  },
  {
    question: "أقدر أتابع حالة البلاغ بتاعي؟",
    answer: "أيوا، كل بلاغ ليه حالة (قيد المراجعة - جاري الحل - تم الحل) وتقدر تتابعه من قسم أحدث البلاغات.",
  },
  {
    question: "هل بياناتي الشخصية آمنة؟",
    answer: "طبعاً، إحنا بنحمي خصوصيتك وبياناتك مش بتتشارك مع أي طرف تالت. البلاغ بيتعامل معاه بسرية تامة.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 bg-muted/50">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground mb-4">
            <HelpCircle className="inline w-8 h-8 text-primary ml-2" />
            أسئلة <span className="text-primary">شائعة</span>
          </h2>
          <p className="text-muted-foreground font-body text-lg">إجابات على أكتر الأسئلة اللي بتتسأل</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-card border border-border rounded-2xl px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-right font-display font-bold text-foreground hover:text-primary transition-colors py-5 text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-body leading-relaxed pb-5 text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
