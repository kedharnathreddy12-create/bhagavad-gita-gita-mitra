"use client";

import { motion } from "framer-motion";
import ChapterCard from "@/components/ChapterCard";
import { chapters } from "@/data/chapters";
import { useLearning } from "@/hooks/useLearning";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ChaptersPage() {
  const { recentlyViewed, isLoaded, completedChapters } = useLearning();

  return (
    <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            భగవద్గీత <span className="text-gradient">అధ్యాయాలు</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            భగవద్గీతలో మొత్తం 18 అధ్యాయాలు, 700 శ్లోకాలు ఉన్నాయి. 
            ప్రతి అధ్యాయం ఒక ప్రత్యేకమైన యోగం లేదా మార్గాన్ని వివరిస్తుంది.
          </p>
        </motion.div>
      </div>

      {isLoaded && recentlyViewed.length > 0 && completedChapters.length < 18 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 bg-gradient-to-r from-accent-gold/20 to-accent-saffron/20 p-6 sm:p-8 rounded-3xl border border-accent-gold/30 flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="text-center md:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">పఠనం కొనసాగించండి</h2>
            <p className="text-white/80 text-sm sm:text-base">మీరు చివరగా చదివిన అధ్యాయం నుండి కొనసాగించండి.</p>
          </div>
          <Link href={`/chapters/${recentlyViewed[0]}`} className="w-full md:w-auto bg-accent-gold text-primary-dark font-bold px-6 sm:px-8 py-3 rounded-full hover:scale-105 transition-transform whitespace-nowrap flex items-center justify-center gap-2 shadow-lg shadow-accent-gold/20">
            Continue Reading <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        {chapters.map((chapter, index) => (
          <motion.div
            key={chapter.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <ChapterCard chapter={chapter} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
