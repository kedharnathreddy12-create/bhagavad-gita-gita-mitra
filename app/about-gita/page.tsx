"use client";

import { motion } from "framer-motion";
import { BookOpen, Star, Sun } from "lucide-react";

export default function AboutGita() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          <span className="text-gradient">భగవద్గీత</span> అంటే ఏమిటి?
        </h1>
        <p className="text-xl text-text-secondary">
          జీవితాన్ని ఎలా గడపాలో నేర్పించే అద్భుతమైన మార్గదర్శి
        </p>
      </motion.div>

      <div className="space-y-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-8 rounded-3xl border border-white/5"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-accent-gold/20 flex items-center justify-center">
              <BookOpen className="text-accent-gold w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">గీత పుట్టుక</h2>
          </div>
          <p className="text-text-secondary text-lg leading-relaxed">
            కురుక్షేత్ర యుద్ధ సమయంలో, బంధువులను చంపాల్సి వస్తుందని అర్జునుడు ఎంతో బాధపడతాడు. 
            అప్పుడు రథసారథిగా ఉన్న శ్రీకృష్ణుడు అర్జునుడికి చేసిన ఉపదేశమే భగవద్గీత. ఇది మహాభారతంలోని భీష్మ పర్వంలో ఉంది. 
            మొత్తం 18 అధ్యాయాలు, 700 శ్లోకాలు ఉంటాయి.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-8 rounded-3xl border border-white/5"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-accent-saffron/20 flex items-center justify-center">
              <Star className="text-accent-saffron w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">మనకెందుకు ఉపయోగపడుతుంది?</h2>
          </div>
          <p className="text-text-secondary text-lg leading-relaxed mb-4">
            భగవద్గీత కేవలం పూజ చేసుకోవడానికి కాదు, మన రోజువారీ జీవితంలో వచ్చే సమస్యలను ఎలా ఎదుర్కోవాలో నేర్పుతుంది.
          </p>
          <ul className="list-disc list-inside text-text-secondary text-lg space-y-2">
            <li>కోపం, భయం, బాధ నుండి ఎలా బయటపడాలో చెప్తుంది.</li>
            <li>పనిని ఎలా ప్రేమించాలో, విజయాన్ని ఎలా సాధించాలో నేర్పుతుంది.</li>
            <li>నిర్ణయాలు తీసుకునే ధైర్యాన్ని ఇస్తుంది.</li>
            <li>మనస్సును ప్రశాంతంగా ఉంచుకునే పద్ధతులను వివరిస్తుంది.</li>
          </ul>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-accent-gold/10 to-accent-saffron/10 p-8 rounded-3xl border border-accent-gold/20 text-center"
        >
          <Sun className="w-12 h-12 text-accent-gold mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">గీతా సారం</h2>
          <p className="text-white/90 text-xl font-medium leading-relaxed italic">
            &quot;ఏది జరిగినా మంచికే జరుగుతుంది. <br/>నీ పని నువ్వు నిజాయితీగా చెయ్యి. <br/>ఫలితం భగవంతుడికి వదిలేయ్.&quot;
          </p>
        </motion.div>
      </div>
    </div>
  );
}
