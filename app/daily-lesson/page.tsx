"use client";

import { motion } from "framer-motion";
import { Sunrise, Share2, ArrowRight, RefreshCw } from "lucide-react";
import { getAllChapterExplanations } from "@/data/explanations";
import { useEffect, useState } from "react";
import { ChapterExplanation } from "@/types";
import Link from "next/link";

export default function DailyLessonPage() {
  const [dailyChapter, setDailyChapter] = useState<ChapterExplanation | null>(null);
  const [dailyLesson, setDailyLesson] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    getAllChapterExplanations().then(explanations => {
      if (explanations.length === 0) {
        setIsLoading(false);
        return;
      }
      
      const today = new Date();
      // Include offset in the hash string to generate a different lesson
      const dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}-${offset}`;
      
      let hash = 0;
      for (let i = 0; i < dateString.length; i++) {
        hash = (hash << 5) - hash + dateString.charCodeAt(i);
        hash = hash & hash;
      }
      
      const index = Math.abs(hash) % explanations.length;
      const chapter = explanations[index];
      
      // Pick a random practical lesson based on the day and offset
      const lessonIndex = Math.abs(hash) % chapter.practical_life_lessons.length;
      
      setDailyChapter(chapter);
      setDailyLesson(chapter.practical_life_lessons[lessonIndex] || chapter.krishnas_core_message);
      setIsLoading(false);
    });
  }, [offset]);

  if (isLoading && !dailyChapter) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="flex justify-center py-12">
          <div className="w-12 h-12 border-4 border-accent-gold border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!dailyChapter) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center text-text-secondary">
        పాఠాలు ఇంకా జోడించబడలేదు.
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Bhagavad Gita - Daily Lesson`,
        text: `ఈ రోజు పాఠం: ${dailyLesson}\n\n- ${dailyChapter.title_telugu}`,
        url: window.location.href,
      }).catch(console.error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <motion.div
        key={offset} // Re-animate when offset changes
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-10 rounded-3xl border border-accent-gold/20 relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-accent-gold/10 rounded-full blur-3xl -mt-32" />
        
        <Sunrise className="w-16 h-16 text-accent-gold mx-auto mb-8 relative z-10" />
        
        <h1 className="text-2xl font-bold text-accent-gold mb-2 uppercase tracking-widest relative z-10">
          ఈ రోజు పాఠం (Daily Lesson)
        </h1>
        <p className="text-sm font-medium text-text-secondary mb-10 relative z-10">
          {dailyChapter.title_sanskrit} • {dailyChapter.title_telugu}
        </p>
        
        <p className="text-3xl md:text-4xl text-white font-medium leading-relaxed mb-12 relative z-10 font-serif whitespace-pre-line">
          &quot;{dailyLesson}&quot;
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          <button onClick={() => setOffset(o => o + 1)} className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-4 rounded-full flex items-center gap-2 transition-colors w-full sm:w-auto justify-center">
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} /> మరొకటి (Next)
          </button>
          <button onClick={handleShare} className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-4 rounded-full flex items-center gap-2 transition-colors w-full sm:w-auto justify-center">
            <Share2 className="w-5 h-5" /> పంచుకోండి
          </button>
          <Link href={`/chapters/${dailyChapter.id}`} className="bg-gradient-to-r from-accent-gold to-accent-saffron text-primary-dark font-bold px-6 py-4 rounded-full flex items-center gap-2 hover:scale-105 transition-transform w-full sm:w-auto justify-center">
            అధ్యాయం <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
