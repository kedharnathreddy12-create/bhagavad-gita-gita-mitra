"use client";

import { useState, useEffect } from "react";

interface LearningState {
  completedChapters: number[];
  recentlyViewed: number[];
  readingStreak: number;
  bestStreak: number;
  lastActiveDate: string | null;
}

const DEFAULT_STATE: LearningState = {
  completedChapters: [],
  recentlyViewed: [],
  readingStreak: 0,
  bestStreak: 0,
  lastActiveDate: null,
};

export function useLearning() {
  const [state, setState] = useState<LearningState>(DEFAULT_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("gita-learning-state");
    if (saved) {
      try {
        const parsed: LearningState = JSON.parse(saved);
        
        // Streak Logic
        const todayStr = new Date().toDateString();
        let currentStreak = parsed.readingStreak;
        const bestStreak = parsed.bestStreak;
        
        if (parsed.lastActiveDate) {
          const lastActive = new Date(parsed.lastActiveDate);
          const today = new Date(todayStr);
          const diffTime = Math.abs(today.getTime() - lastActive.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

          if (diffDays === 1) {
            // Keep current streak, it will increment on markViewed if not already done today
          } else if (diffDays > 1) {
            // Missed a day, streak broken
            currentStreak = 0;
          }
        }
        
        const finalState = {
          ...DEFAULT_STATE,
          ...parsed,
          readingStreak: currentStreak,
          bestStreak: Math.max(bestStreak, currentStreak),
        };
        
        setState(finalState);
        localStorage.setItem("gita-learning-state", JSON.stringify(finalState));
      } catch (e) {
        console.error("Failed to parse learning state", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const markViewed = (chapterId: number) => {
    setState(prev => {
      // Handle recently viewed
      const newRecentlyViewed = [
        chapterId, 
        ...prev.recentlyViewed.filter(id => id !== chapterId)
      ].slice(0, 5); // Keep last 5

      // Handle streak
      const todayStr = new Date().toDateString();
      let newStreak = prev.readingStreak;
      let newBestStreak = prev.bestStreak;

      if (prev.lastActiveDate !== todayStr) {
        const lastActive = prev.lastActiveDate ? new Date(prev.lastActiveDate) : null;
        const today = new Date(todayStr);
        let diffDays = 1;
        
        if (lastActive) {
          const diffTime = Math.abs(today.getTime() - lastActive.getTime());
          diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        }

        if (diffDays === 1 || !lastActive) {
          newStreak += 1;
        } else if (diffDays > 1) {
          newStreak = 1;
        }
        newBestStreak = Math.max(prev.bestStreak, newStreak);
      }

      const updated = {
        ...prev,
        recentlyViewed: newRecentlyViewed,
        readingStreak: newStreak,
        bestStreak: newBestStreak,
        lastActiveDate: todayStr,
      };

      localStorage.setItem("gita-learning-state", JSON.stringify(updated));
      return updated;
    });
  };

  const markCompleted = (chapterId: number) => {
    setState(prev => {
      if (prev.completedChapters.includes(chapterId)) return prev;
      
      const updated = {
        ...prev,
        completedChapters: [...prev.completedChapters, chapterId]
      };
      
      localStorage.setItem("gita-learning-state", JSON.stringify(updated));
      return updated;
    });
  };

  const isCompleted = (chapterId: number) => state.completedChapters.includes(chapterId);

  return { 
    ...state, 
    isLoaded,
    markViewed, 
    markCompleted, 
    isCompleted 
  };
}
