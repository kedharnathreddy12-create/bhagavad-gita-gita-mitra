"use client";

import { useState, useEffect } from "react";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("gita-bookmarks");
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const toggleBookmark = (id: string) => {
    setBookmarks(prev => {
      const newBookmarks = prev.includes(id) 
        ? prev.filter(b => b !== id) 
        : [...prev, id];
      
      localStorage.setItem("gita-bookmarks", JSON.stringify(newBookmarks));
      return newBookmarks;
    });
  };

  const isBookmarked = (id: string) => bookmarks.includes(id);

  return { bookmarks, toggleBookmark, isBookmarked };
}
