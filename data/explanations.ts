"use server";

import { ChapterExplanation } from "@/types";

export const getChapterExplanation = async (chapterId: number): Promise<ChapterExplanation | null> => {
  try {
    const chapterModule = await import(`@/data/explanations/chapter-${chapterId}.ts`);
    return chapterModule.chapterExplanation || null;
  } catch (error) {
    console.warn(`Could not load explanation for chapter ${chapterId}:`, error);
    return null;
  }
};

export const getAllChapterExplanations = async (): Promise<ChapterExplanation[]> => {
  const allExplanations: ChapterExplanation[] = [];
  for (let i = 1; i <= 18; i++) {
    const explanation = await getChapterExplanation(i);
    if (explanation) {
      allExplanations.push(explanation);
    }
  }
  return allExplanations;
};
