"use client";

import Link from "next/link";
import { Chapter } from "@/types";
import { BookOpen, CheckCircle } from "lucide-react";
import { useLearning } from "@/hooks/useLearning";

export default function ChapterCard({ chapter }: { chapter: Chapter }) {
  const { isCompleted } = useLearning();

  return (
    <Link href={`/chapters/${chapter.id}`}>
      <div className={`glass-panel rounded-xl p-6 h-full transition-all duration-300 group cursor-pointer border ${isCompleted(chapter.id) ? 'border-green-500/30 bg-green-500/5 hover:border-green-400/50' : 'border-white/5 hover:bg-white/5 hover:border-accent-gold/30'}`}>
        <div className="flex justify-between items-start mb-4">
          <span className="text-accent-gold font-bold text-sm bg-accent-gold/10 px-3 py-1 rounded-full flex items-center gap-2">
            Chapter {chapter.id}
            {isCompleted(chapter.id) && <CheckCircle className="w-4 h-4 text-green-400" />}
          </span>
          <span className="text-text-secondary text-sm flex items-center gap-1">
            <BookOpen className="w-4 h-4" /> {chapter.verses_count} Verses
          </span>
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-accent-gold transition-colors">
          {chapter.title_telugu}
        </h3>
        <p className="text-sm text-text-secondary mb-3 font-medium">
          {chapter.title_sanskrit} • {chapter.title_english}
        </p>
        
        <div className={`w-12 h-1 mb-4 rounded-full ${isCompleted(chapter.id) ? 'bg-green-400' : 'bg-gradient-to-r from-accent-gold to-accent-saffron'}`}></div>
        
        <p className="text-white/80 text-sm leading-relaxed line-clamp-3">
          {chapter.summary_telugu}
        </p>
      </div>
    </Link>
  );
}
