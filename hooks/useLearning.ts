"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchProgress = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setIsAuthenticated(true);
        const metadata = session.user.user_metadata;
        const progress: LearningState = metadata?.learning_progress || DEFAULT_STATE;
        
        // Streak Logic Verification
        const todayStr = new Date().toDateString();
        let currentStreak = progress.readingStreak || 0;
        const bestStreak = progress.bestStreak || 0;
        
        if (progress.lastActiveDate && progress.lastActiveDate !== todayStr) {
          const lastActive = new Date(progress.lastActiveDate);
          const today = new Date(todayStr);
          const diffTime = Math.abs(today.getTime() - lastActive.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

          if (diffDays > 1) {
            // Missed a day, streak broken
            currentStreak = 0;
          }
        }
        
        const finalState = {
          ...DEFAULT_STATE,
          ...progress,
          readingStreak: currentStreak,
          bestStreak: Math.max(bestStreak, currentStreak),
        };
        
        setState(finalState);
        
        // If streak was corrected, silently update
        if (currentStreak !== progress.readingStreak) {
           supabase.auth.updateUser({ data: { learning_progress: finalState } });
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsLoaded(true);
    };

    fetchProgress();
  }, []);

  const syncToSupabase = async (updatedState: LearningState) => {
    if (isAuthenticated) {
      await supabase.auth.updateUser({
        data: { learning_progress: updatedState }
      });
    }
  };

  const markViewed = (chapterId: number) => {
    if (!isAuthenticated) return;

    setState(prev => {
      const newRecentlyViewed = [
        chapterId, 
        ...prev.recentlyViewed.filter(id => id !== chapterId)
      ].slice(0, 5); 

      const todayStr = new Date().toDateString();
      let newStreak = prev.readingStreak || 0;
      let newBestStreak = prev.bestStreak || 0;

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

      syncToSupabase(updated);
      return updated;
    });
  };

  const markCompleted = (chapterId: number) => {
    if (!isAuthenticated) return;

    setState(prev => {
      if (prev.completedChapters.includes(chapterId)) return prev;
      
      const updated = {
        ...prev,
        completedChapters: [...prev.completedChapters, chapterId]
      };
      
      syncToSupabase(updated);
      return updated;
    });
  };

  const isCompleted = (chapterId: number) => state.completedChapters.includes(chapterId);

  return { 
    ...state, 
    isLoaded,
    isAuthenticated,
    markViewed, 
    markCompleted, 
    isCompleted 
  };
}
