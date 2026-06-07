"use client";

import { motion } from "framer-motion";
import { Heart, Send } from "lucide-react";

export default function DonatePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-12 rounded-3xl border border-accent-gold/20"
      >
        <Heart className="w-16 h-16 text-accent-gold mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-white mb-6">మద్దతు ఇవ్వండి</h1>
        <p className="text-xl text-text-secondary mb-8 leading-relaxed max-w-2xl mx-auto">
          భగవద్గీత జ్ఞానాన్ని ప్రతి ఒక్కరికీ ఉచితంగా అందించడమే మా లక్ష్యం. 
          మీ చిన్న సహాయం కూడా ఈ ప్రాజెక్టును మరింత ముందుకు తీసుకెళ్లడానికి ఉపయోగపడుతుంది.
        </p>
        
        <div className="bg-white/5 p-8 rounded-2xl max-w-md mx-auto mb-8 border border-white/10">
          <h3 className="text-white font-bold mb-4">UPI ద్వారా విరాళం ఇవ్వండి</h3>
          <p className="text-2xl font-mono text-accent-gold mb-2">gita@upi</p>
          <p className="text-sm text-text-secondary">లేదా కింది బటన్ క్లిక్ చేయండి</p>
        </div>

        <button className="bg-gradient-to-r from-accent-gold to-accent-saffron text-primary-dark px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform inline-flex items-center gap-2">
          <Send className="w-5 h-5" /> Donate Now
        </button>
      </motion.div>
    </div>
  );
}
