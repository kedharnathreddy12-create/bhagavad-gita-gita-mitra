"use client";

import { motion } from "framer-motion";
import { chapters } from "@/data/chapters";
import { getAllChapterExplanations } from "@/data/explanations";
import { BookOpen, CheckCircle, FileText, LayoutTemplate } from "lucide-react";
import { useEffect, useState } from "react";
import { ChapterExplanation } from "@/types";

export default function ContentDashboard() {
  const [explanations, setExplanations] = useState<ChapterExplanation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllChapterExplanations().then(data => {
      setExplanations(data);
      setIsLoading(false);
    });
  }, []);

  const totalChaptersExpected = 18;
  const totalChaptersAdded = explanations.length;
  const remainingChapters = totalChaptersExpected - totalChaptersAdded;
  const completionPercentage = Math.round((totalChaptersAdded / totalChaptersExpected) * 100) || 0;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="w-12 h-12 border-4 border-accent-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Content Progress Dashboard</h1>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          Tracking the generation of 18 detailed chapter explanations in modern Telugu.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }} className="glass-panel p-6 rounded-2xl border border-white/5">
          <BookOpen className="w-8 h-8 text-accent-gold mb-4" />
          <h3 className="text-text-secondary font-medium mb-1">Total Chapters</h3>
          <p className="text-3xl font-bold text-white">{totalChaptersExpected}</p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-6 rounded-2xl border border-white/5">
          <FileText className="w-8 h-8 text-green-400 mb-4" />
          <h3 className="text-text-secondary font-medium mb-1">Chapters Written</h3>
          <p className="text-3xl font-bold text-white">{totalChaptersAdded}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-6 rounded-2xl border border-white/5">
          <LayoutTemplate className="w-8 h-8 text-accent-saffron mb-4" />
          <h3 className="text-text-secondary font-medium mb-1">Missing Chapters</h3>
          <p className="text-3xl font-bold text-white">{remainingChapters}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel p-6 rounded-2xl border border-white/5">
          <CheckCircle className="w-8 h-8 text-blue-400 mb-4" />
          <h3 className="text-text-secondary font-medium mb-1">Completion</h3>
          <p className="text-3xl font-bold text-white">{completionPercentage}%</p>
        </motion.div>
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-white/10 mb-16">
        <h2 className="text-2xl font-bold text-white mb-6">Overall Progress</h2>
        <div className="w-full bg-white/5 rounded-full h-4 mb-4 overflow-hidden border border-white/10">
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: `${completionPercentage}%` }} 
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-gradient-to-r from-accent-gold to-accent-saffron h-full"
          />
        </div>
        <div className="flex justify-between text-text-secondary font-medium">
          <span>{completionPercentage}% Complete</span>
          <span>{remainingChapters} Chapters Left</span>
        </div>
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6">Chapter Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-text-secondary">
                <th className="py-4 px-4 font-medium">Chapter</th>
                <th className="py-4 px-4 font-medium">Name</th>
                <th className="py-4 px-4 font-medium">Sections</th>
                <th className="py-4 px-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {chapters.map((chapter) => {
                const exp = explanations.find(e => e.id === chapter.id);
                const isComplete = !!exp;
                const sectionsCount = isComplete ? Object.keys(exp).length : 0;
                
                return (
                  <tr key={chapter.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 font-bold text-accent-gold">{chapter.id}</td>
                    <td className="py-4 px-4 text-white">{chapter.title_english}</td>
                    <td className="py-4 px-4 text-text-secondary font-mono">{sectionsCount} / 15</td>
                    <td className="py-4 px-4">
                      {isComplete ? (
                        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold uppercase">Complete</span>
                      ) : (
                        <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-bold uppercase">Missing</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
