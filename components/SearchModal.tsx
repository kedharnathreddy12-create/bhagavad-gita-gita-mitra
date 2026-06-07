"use client";

import React, { useState, useEffect } from "react";
import { Search, X, BookOpen, Star, Lightbulb, Target } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { chapters } from "@/data/chapters";
import { getAllChapterExplanations } from "@/data/explanations";
import { krishnaStories } from "@/data/krishna-stories";
import { gitaStories } from "@/data/gita-stories";
import { ChapterExplanation } from "@/types";

interface SearchResult {
  type: string;
  title: string;
  link: string;
  icon: React.ReactNode;
  subtitle?: string;
}

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [explanations, setExplanations] = useState<ChapterExplanation[]>([]);

  useEffect(() => {
    if (isOpen && explanations.length === 0) {
      getAllChapterExplanations().then(setExplanations);
    }
  }, [isOpen, explanations.length]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const newResults: SearchResult[] = [];
    
    // 1. Search Chapters (Basic)
    chapters.forEach(c => {
      if (c.title_telugu.toLowerCase().includes(q) || c.title_english.toLowerCase().includes(q)) {
        newResults.push({ type: 'Chapter', title: c.title_telugu, link: `/chapters/${c.id}`, icon: <BookOpen className="w-4 h-4 text-accent-gold" /> });
      }
    });

    // 2. Search Concepts & Lessons inside Explanations
    explanations.forEach(exp => {
      // Search Key Concepts
      exp.key_concepts.forEach(concept => {
        if (concept.concept.toLowerCase().includes(q) || concept.explanation.toLowerCase().includes(q)) {
          newResults.push({
            type: 'Concept',
            title: `${concept.concept} (అధ్యాయం ${exp.id})`,
            subtitle: concept.explanation.substring(0, 60) + '...',
            link: `/chapters/${exp.id}`,
            icon: <Lightbulb className="w-4 h-4 text-accent-saffron" />
          });
        }
      });
      
      // Search Krishna's Core Message
      if (exp.krishnas_core_message.toLowerCase().includes(q)) {
        newResults.push({
          type: 'Message',
          title: `కృష్ణుడి సందేశం (అధ్యాయం ${exp.id})`,
          subtitle: exp.krishnas_core_message.substring(0, 60) + '...',
          link: `/chapters/${exp.id}`,
          icon: <Target className="w-4 h-4 text-accent-gold" />
        });
      }
    });

    // 3. Search Stories
    krishnaStories.filter(s => s.title.toLowerCase().includes(q)).forEach(s => {
      newResults.push({ type: 'Krishna Story', title: s.title, link: `/stories/krishna/${s.id}`, icon: <Star className="w-4 h-4 text-accent-gold" /> });
    });
    
    gitaStories.filter(s => s.title.toLowerCase().includes(q)).forEach(s => {
      newResults.push({ type: 'Gita Story', title: s.title, link: `/stories/gita/${s.id}`, icon: <Star className="w-4 h-4 text-accent-saffron" /> });
    });

    setResults(newResults);
  }, [query, explanations]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 bg-primary-dark/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="w-full max-w-2xl bg-[#0f172a] border border-accent-gold/20 rounded-2xl shadow-2xl overflow-hidden"
          onClick={e => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          <div className="flex items-center p-4 border-b border-white/10">
            <Search className="w-5 h-5 text-text-secondary mr-3" />
            <input 
              autoFocus
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="అధ్యాయాలు, పాఠాలు లేదా కథలను వెతకండి..."
              className="flex-1 bg-transparent border-none text-white focus:outline-none text-lg"
              aria-label="Search query"
            />
            <button onClick={onClose} className="text-text-secondary hover:text-white p-1" aria-label="Close search">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="max-h-[60vh] overflow-y-auto">
            {query.trim() && results.length === 0 ? (
              <div className="p-8 text-center text-text-secondary">
                మీరు వెతికిన సమాచారం దొరకలేదు.
              </div>
            ) : (
              <ul className="divide-y divide-white/5">
                {results.map((r, i) => (
                  <li key={i}>
                    <Link href={r.link} onClick={onClose} className="block p-4 hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="bg-white/5 p-2 rounded-lg">
                          {r.icon}
                        </div>
                        <div>
                          <div className="text-white font-medium flex items-center gap-2">
                            {r.title} <span className="text-[10px] uppercase tracking-wider text-accent-gold/70 border border-accent-gold/20 px-2 py-0.5 rounded-full">{r.type}</span>
                          </div>
                          {r.subtitle && <div className="text-sm text-text-secondary mt-1">{r.subtitle}</div>}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
