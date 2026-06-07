"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookMarked, Share2, Lightbulb, Users, Briefcase, GraduationCap, AlertTriangle, Target, Info } from "lucide-react";
import { motion } from "framer-motion";
import { getChapterExplanation } from "@/data/explanations";
import { notFound } from "next/navigation";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useLearning } from "@/hooks/useLearning";
import { ChapterExplanation } from "@/types";
import { chapters } from "@/data/chapters";

export default function ChapterPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const chapterId = parseInt(resolvedParams.id);
  const chapter = chapters.find(c => c.id === chapterId);
  
  const [explanation, setExplanation] = useState<ChapterExplanation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'students' | 'employees' | 'families'>('students');

  useEffect(() => {
    getChapterExplanation(chapterId).then(data => {
      setExplanation(data);
      setIsLoading(false);
    });
  }, [chapterId]);
  
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const { markViewed, markCompleted, isCompleted } = useLearning();

  useEffect(() => {
    if (explanation) {
      markViewed(explanation.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [explanation]);

  const handleShare = () => {
    if (navigator.share && explanation && chapter) {
      navigator.share({
        title: `Bhagavad Gita - ${chapter.title_english}`,
        text: `భగవద్గీత అధ్యాయం ${explanation.id}: ${chapter.title_telugu}\n\n${explanation.krishnas_core_message}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (!isLoading && !explanation) {
    notFound();
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="w-12 h-12 border-4 border-accent-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!explanation) return null;

  return (
    <div className="max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <Link href="/chapters" className="inline-flex items-center gap-2 text-accent-gold hover:text-accent-saffron transition-colors font-medium text-sm sm:text-base">
          <ArrowLeft className="w-4 h-4" /> వెనుకకు
        </Link>
        <div className="flex gap-4">
          <button 
            onClick={() => toggleBookmark(`chapter-${explanation.id}`)}
            className={`${isBookmarked(`chapter-${explanation.id}`) ? 'text-accent-gold' : 'text-text-secondary'} hover:text-accent-gold transition-colors p-2 bg-white/5 rounded-full`}
            aria-label="Bookmark Chapter"
          >
            <BookMarked className="w-5 h-5" fill={isBookmarked(`chapter-${explanation.id}`) ? "currentColor" : "none"} />
          </button>
          <button 
            onClick={handleShare}
            className="text-text-secondary hover:text-accent-gold transition-colors p-2 bg-white/5 rounded-full"
            aria-label="Share Chapter"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 sm:mb-16"
      >
        <span className="text-accent-gold font-bold tracking-widest uppercase mb-2 block text-xs sm:text-sm md:text-base">
          అధ్యాయం {explanation.id}
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-gradient leading-tight">
          {chapter?.title_telugu || explanation.title_telugu}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-text-secondary font-medium mb-6 sm:mb-8">
          {chapter?.title_sanskrit || explanation.title_sanskrit} • {chapter?.title_english || explanation.title_english}
        </p>

        <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
          <div className="bg-white/10 text-white px-4 py-2 rounded-full border border-white/10">
            ⏳ {explanation.estimated_reading_time}
          </div>
          <div className={`px-4 py-2 rounded-full border ${explanation.difficulty_level === 'Beginner' ? 'bg-green-500/10 text-green-400 border-green-500/20' : explanation.difficulty_level === 'Intermediate' ? 'bg-accent-gold/10 text-accent-gold border-accent-gold/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
            🎯 {explanation.difficulty_level}
          </div>
          {isCompleted(explanation.id) && (
            <div className="bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full border border-blue-500/20 flex items-center gap-2">
              <span className="text-blue-400">✓</span> Completed
            </div>
          )}
        </div>
      </motion.div>

      <div className="space-y-10 sm:space-y-12">
        {/* Story & Overview */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="glass-panel rounded-3xl p-6 sm:p-8 md:p-10 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-accent-gold"></div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Info className="text-accent-gold w-5 h-5 sm:w-6 sm:h-6" /> అధ్యాయం సారాంశం (Overview)
            </h2>
            <p className="text-white/90 text-base sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8">
              {explanation.chapter_overview}
            </p>
            
            <h3 className="text-xl font-bold text-accent-saffron mb-3">ఇందులో ఏం జరుగుతుంది?</h3>
            <p className="text-white/80 text-lg leading-relaxed">
              {explanation.what_happens_in_this_chapter}
            </p>
          </div>
        </motion.section>

        {/* Krishna's Message */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="bg-gradient-to-br from-accent-gold/20 to-transparent p-6 sm:p-8 md:p-10 rounded-3xl border border-accent-gold/20 relative">
            <h2 className="text-xl sm:text-2xl font-bold text-accent-gold mb-4 sm:mb-6 flex items-center gap-3">
              <Target className="w-5 h-5 sm:w-6 sm:h-6" /> కృష్ణుడి ప్రధాన సందేశం
            </h2>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-relaxed font-serif">
              &quot;{explanation.krishnas_core_message}&quot;
            </p>
          </div>
        </motion.section>

        {/* Key Concepts */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Lightbulb className="text-accent-gold w-6 h-6" /> ముఖ్యమైన విషయాలు
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {explanation.key_concepts.map((concept, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-colors">
                <h3 className="text-xl font-bold text-accent-saffron mb-3">{concept.concept}</h3>
                <p className="text-white/80 leading-relaxed">{concept.explanation}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Practical & Modern Life */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
           <div className="glass-panel rounded-3xl p-8 border border-white/10">
             <h2 className="text-2xl font-bold text-white mb-6">జీవిత పాఠాలు & నేటి ఉదాహరణలు</h2>
             
             <div className="space-y-8">
               <div>
                 <h3 className="text-lg font-bold text-accent-gold mb-4 uppercase tracking-wider">పాఠాలు (Lessons)</h3>
                 <ul className="space-y-3">
                   {explanation.practical_life_lessons.map((lesson, idx) => (
                     <li key={idx} className="flex gap-3 text-white/90 text-lg">
                       <span className="text-accent-gold">•</span> {lesson}
                     </li>
                   ))}
                 </ul>
               </div>
               
               <div className="bg-white/5 p-6 rounded-2xl">
                 <h3 className="text-lg font-bold text-accent-saffron mb-4 uppercase tracking-wider">ఉదాహరణలు (Examples)</h3>
                 <ul className="space-y-3">
                   {explanation.modern_day_examples.map((example, idx) => (
                     <li key={idx} className="flex gap-3 text-white/80 text-lg">
                       <span className="text-accent-saffron">→</span> {example}
                     </li>
                   ))}
                 </ul>
               </div>
             </div>
           </div>
        </motion.section>

        {/* Targeted Advice Tabs */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-2xl font-bold text-white mb-6">ఇది ఎవరికి ఎలా ఉపయోగపడుతుంది?</h2>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <button 
              onClick={() => setActiveTab('students')}
              className={`px-6 py-3 rounded-full flex items-center gap-2 font-medium transition-all ${activeTab === 'students' ? 'bg-accent-gold text-primary-dark' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              <GraduationCap className="w-5 h-5" /> విద్యార్థులకు
            </button>
            <button 
              onClick={() => setActiveTab('employees')}
              className={`px-6 py-3 rounded-full flex items-center gap-2 font-medium transition-all ${activeTab === 'employees' ? 'bg-accent-saffron text-primary-dark' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              <Briefcase className="w-5 h-5" /> ఉద్యోగులకు
            </button>
            <button 
              onClick={() => setActiveTab('families')}
              className={`px-6 py-3 rounded-full flex items-center gap-2 font-medium transition-all ${activeTab === 'families' ? 'bg-white text-primary-dark' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              <Users className="w-5 h-5" /> కుటుంబాలకు
            </button>
          </div>
          
          <div className="glass-panel p-8 rounded-3xl border border-white/10 min-h-[150px] flex items-center">
            <p className="text-xl text-white/90 leading-relaxed">
              {activeTab === 'students' && explanation.how_it_helps_students}
              {activeTab === 'employees' && explanation.how_it_helps_employees}
              {activeTab === 'families' && explanation.how_it_helps_families}
            </p>
          </div>
        </motion.section>

        {/* Mistakes & Takeaways */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="bg-red-500/10 p-8 rounded-3xl border border-red-500/20 h-full">
              <h2 className="text-xl font-bold text-red-400 mb-6 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" /> మనం చేసే తప్పులు
              </h2>
              <ul className="space-y-4">
                {explanation.common_mistakes_people_make.map((mistake, idx) => (
                  <li key={idx} className="flex gap-3 text-white/80">
                    <span className="text-red-400">✗</span> {mistake}
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="glass-panel p-8 rounded-3xl border border-accent-gold/20 h-full">
              <h2 className="text-xl font-bold text-accent-gold mb-6">ముఖ్యమైన సూచనలు</h2>
              <ul className="space-y-4">
                {explanation.key_takeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex gap-3 text-white/90 font-medium">
                    <span className="text-accent-gold">✓</span> {takeaway}
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>
        </div>

        {/* Mark as Completed */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center py-6 sm:py-8 px-4">
          <button 
            onClick={() => markCompleted(explanation.id)}
            disabled={isCompleted(explanation.id)}
            className={`w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-lg transition-all flex items-center justify-center gap-2 sm:gap-3 mx-auto ${isCompleted(explanation.id) ? 'bg-blue-500/20 text-blue-400 cursor-not-allowed border border-blue-500/30' : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-105 shadow-lg shadow-green-500/20'}`}
          >
            {isCompleted(explanation.id) ? (
              <><span>✓</span> అధ్యాయం పూర్తయింది</>
            ) : (
              <><span>✓</span> ఈ అధ్యాయాన్ని పూర్తి చేయండి</>
            )}
          </button>
        </motion.div>

        {/* Related Chapters */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="pt-8 border-t border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6">సంబంధిత అధ్యాయాలు (Related Chapters)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {explanation.related_chapters.map(relId => {
              const relChapter = chapters.find(c => c.id === relId);
              if (!relChapter) return null;
              return (
                <Link key={relId} href={`/chapters/${relId}`} className="glass-panel p-6 rounded-2xl hover:bg-white/5 transition-colors border border-white/5 hover:border-accent-gold/30 flex justify-between items-center group">
                  <div>
                    <div className="text-accent-gold text-sm font-bold mb-1">అధ్యాయం {relId}</div>
                    <div className="text-white font-medium group-hover:text-accent-saffron transition-colors">{relChapter.title_telugu}</div>
                  </div>
                  <ArrowLeft className="w-5 h-5 text-text-secondary group-hover:text-accent-saffron rotate-180 transition-colors" />
                </Link>
              );
            })}
          </div>
        </motion.section>

        {/* Next Chapter Navigation */}
        {explanation.id < 18 && (
          <div className="pt-6 sm:pt-8 pb-8 flex justify-center mt-6 sm:mt-8 px-4">
            <Link href={`/chapters/${explanation.id + 1}`} className="w-full sm:w-auto justify-center bg-gradient-to-r from-accent-gold to-accent-saffron text-primary-dark px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-lg hover:scale-105 transition-transform flex items-center gap-2 shadow-lg shadow-accent-gold/20">
              తర్వాతి అధ్యాయం 
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 rotate-180" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
