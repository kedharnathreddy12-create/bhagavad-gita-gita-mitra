"use client";

import { Share2, Check } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ShareSection() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: "GitaMitra",
      text: "భగవద్గీత జ్ఞానాన్ని సులభమైన తెలుగులో తెలుసుకోండి.",
      url: "https://gitamitra.vercel.app",
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(shareData.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  return (
    <div className="mt-12 mb-4 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 text-center max-w-4xl mx-auto flex flex-col items-center justify-center space-y-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-gold to-transparent opacity-50" />
      
      <h2 className="text-xl sm:text-2xl font-bold text-white">గీతామిత్ర మీకు నచ్చిందా? మీ స్నేహితులతో పంచుకోండి 🙏</h2>
      
      <button 
        onClick={handleShare}
        className="bg-accent-gold text-primary-dark font-bold px-8 py-3.5 rounded-xl hover:bg-accent-saffron transition-all flex items-center gap-2 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,184,0,0.3)]"
      >
        <Share2 className="w-5 h-5" />
        గీతామిత్రను పంచుకోండి
      </button>

      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-green-400 text-sm flex items-center gap-1.5 font-medium"
          >
            <Check className="w-4 h-4" />
            లింక్ విజయవంతంగా షేర్ చేయబడింది
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
