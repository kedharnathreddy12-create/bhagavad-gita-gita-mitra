"use client";

import { useState, useEffect, useCallback } from "react";

export function useTTS() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speak = useCallback((text: string, id: string) => {
    if (!window.speechSynthesis) return;

    // If clicking same id while playing, pause/stop
    if (isPlaying && currentId === id) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentId(null);
      return;
    }

    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "te-IN";
    utterance.rate = 0.9;
    
    utterance.onend = () => {
      setIsPlaying(false);
      setCurrentId(null);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setCurrentId(null);
    };

    setIsPlaying(true);
    setCurrentId(id);
    window.speechSynthesis.speak(utterance);
  }, [isPlaying, currentId]);

  return { speak, isPlaying, currentId };
}
