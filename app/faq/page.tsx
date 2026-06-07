"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "భగవద్గీత అంటే ఏమిటి?", a: "భగవద్గీత అంటే భగవంతుడు పాడిన పాట. ఇది మహాభారత యుద్ధ సమయంలో శ్రీకృష్ణుడు అర్జునుడికి చేసిన ఉపదేశం." },
  { q: "ఇందులో ఎన్ని శ్లోకాలు ఉన్నాయి?", a: "భగవద్గీతలో మొత్తం 18 అధ్యాయాలు, సుమారు 700 శ్లోకాలు ఉన్నాయి." },
  { q: "గీత చదవడం వల్ల ప్రయోజనం ఏమిటి?", a: "గీత చదవడం వల్ల మనశ్శాంతి లభిస్తుంది, ఒత్తిడి తగ్గుతుంది మరియు జీవితంలో సరైన నిర్ణయాలు తీసుకునే ధైర్యం వస్తుంది." },
  { q: "ఈ వెబ్సైట్ ఉచితమేనా?", a: "అవును, ఈ వెబ్సైట్ పూర్తిగా ఉచితం. జ్ఞానాన్ని అందరికీ అందించడమే మా లక్ష్యం." },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-white text-center mb-12">తరచుగా అడిగే ప్రశ్నలు (FAQ)</h1>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="glass-panel border border-white/5 rounded-2xl overflow-hidden">
            <button 
              className="w-full text-left p-6 flex justify-between items-center text-white font-medium hover:bg-white/5 transition-colors"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              {faq.q}
              <ChevronDown className={`w-5 h-5 text-accent-gold transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 text-text-secondary leading-relaxed border-t border-white/5 mt-2">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
