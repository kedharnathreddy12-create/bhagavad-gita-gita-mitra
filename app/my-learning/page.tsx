"use client";

import { motion } from "framer-motion";
import { BookOpen, Award, Flame, History, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLearning } from "@/hooks/useLearning";
import { chapters } from "@/data/chapters";

export default function MyLearningPage() {
  const { completedChapters, readingStreak, bestStreak, recentlyViewed, isLoaded } = useLearning();

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="w-12 h-12 border-4 border-accent-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const totalChapters = 18;
  const completedCount = completedChapters.length;
  const progressPercentage = Math.round((completedCount / totalChapters) * 100);

  // Determine badges
  const badges = [
    { id: "first-chapter", name: "ఆరంభం (The Beginning)", desc: "1st Chapter Completed", earned: completedCount >= 1, icon: "🌱" },
    { id: "five-chapters", name: "జ్ఞాన సాధకుడు (Seeker)", desc: "5 Chapters Completed", earned: completedCount >= 5, icon: "🔥" },
    { id: "ten-chapters", name: "తత్వవేత్త (Philosopher)", desc: "10 Chapters Completed", earned: completedCount >= 10, icon: "🌟" },
    { id: "all-chapters", name: "గీతా జ్ఞాని (Gita Master)", desc: "All 18 Chapters Completed", earned: completedCount >= 18, icon: "👑" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">నా అధ్యయనం (My Learning)</h1>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          మీ భగవద్గీత పఠన ప్రగతిని ఇక్కడ చూడండి. (Track your Bhagavad Gita reading progress here.)
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-6 rounded-2xl border border-white/5">
          <BookOpen className="w-8 h-8 text-accent-gold mb-4" />
          <h3 className="text-text-secondary font-medium mb-1">చదివిన అధ్యాయాలు</h3>
          <p className="text-3xl font-bold text-white">{completedCount} <span className="text-sm text-text-secondary font-normal">/ {totalChapters}</span></p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-6 rounded-2xl border border-white/5">
          <Award className="w-8 h-8 text-green-400 mb-4" />
          <h3 className="text-text-secondary font-medium mb-1">ప్రగతి (Progress)</h3>
          <p className="text-3xl font-bold text-white">{progressPercentage}%</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-6 rounded-2xl border border-white/5">
          <Flame className="w-8 h-8 text-accent-saffron mb-4" />
          <h3 className="text-text-secondary font-medium mb-1">ప్రస్తుత స్ట్రీక్ (Current Streak)</h3>
          <p className="text-3xl font-bold text-white">{readingStreak} <span className="text-sm text-text-secondary font-normal">రోజులు</span></p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel p-6 rounded-2xl border border-white/5">
          <Flame className="w-8 h-8 text-orange-500 mb-4" />
          <h3 className="text-text-secondary font-medium mb-1">ఉత్తమ స్ట్రీక్ (Best Streak)</h3>
          <p className="text-3xl font-bold text-white">{bestStreak} <span className="text-sm text-text-secondary font-normal">రోజులు</span></p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Progress & Badges */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Continue Reading Banner */}
          {recentlyViewed.length > 0 && completedCount < totalChapters && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gradient-to-r from-accent-gold/20 to-accent-saffron/20 p-8 rounded-3xl border border-accent-gold/30 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">పఠనం కొనసాగించండి</h2>
                <p className="text-white/80">మీరు చివరగా చదివిన అధ్యాయం నుండి కొనసాగించండి.</p>
              </div>
              <Link href={`/chapters/${recentlyViewed[0]}`} className="bg-accent-gold text-primary-dark font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform whitespace-nowrap flex items-center gap-2">
                Continue Reading <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          )}

          {/* Badges */}
          <div className="glass-panel p-8 rounded-3xl border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">సాధన పతకాలు (Achievements)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {badges.map(badge => (
                <div key={badge.id} className={`p-4 rounded-2xl border ${badge.earned ? 'bg-accent-gold/10 border-accent-gold/30' : 'bg-white/5 border-white/5 opacity-60 grayscale'} flex items-center gap-4 transition-all`}>
                  <div className={`text-4xl ${badge.earned ? '' : 'opacity-50'}`}>{badge.icon}</div>
                  <div>
                    <h3 className={`font-bold ${badge.earned ? 'text-accent-gold' : 'text-text-secondary'}`}>{badge.name}</h3>
                    <p className="text-xs text-text-secondary mt-1">{badge.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: History */}
        <div className="space-y-8">
          <div className="glass-panel p-8 rounded-3xl border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <History className="w-5 h-5 text-accent-saffron" /> ఇటీవల చదివినవి
            </h2>
            {recentlyViewed.length === 0 ? (
              <p className="text-text-secondary text-center py-8">ఇంకా ఏ అధ్యాయం చదవలేదు.</p>
            ) : (
              <div className="space-y-4">
                {recentlyViewed.map(id => {
                  const ch = chapters.find(c => c.id === id);
                  if (!ch) return null;
                  return (
                    <Link key={id} href={`/chapters/${id}`} className="block bg-white/5 hover:bg-white/10 p-4 rounded-xl border border-white/5 transition-colors">
                      <div className="text-accent-gold text-xs font-bold mb-1">అధ్యాయం {id}</div>
                      <div className="text-white font-medium">{ch.title_telugu}</div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
