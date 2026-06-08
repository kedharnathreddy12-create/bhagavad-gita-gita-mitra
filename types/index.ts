export interface Chapter {
  id: number;
  title_sanskrit: string;
  title_telugu: string;
  title_english: string;
  meaning_telugu: string;
  summary_telugu: string;
  verses_count: number;
  difficulty_level?: "Beginner" | "Intermediate" | "Advanced";
}

export interface KeyConcept {
  concept: string;
  explanation: string;
}

export interface ChapterExplanation {
  id: number;
  title_sanskrit: string;
  title_telugu: string;
  title_english: string;
  chapter_overview: string;
  what_happens_in_this_chapter: string;
  main_message: string;
  important_teachings: string[];
  key_concepts: KeyConcept[];
  practical_life_lessons: string[];
  modern_day_examples: string[];
  how_it_helps_students: string;
  how_it_helps_employees: string;
  how_it_helps_families: string;
  common_mistakes_people_make: string[];
  krishnas_core_message: string;
  chapter_summary: string;
  key_takeaways: string[];
  estimated_reading_time: string;
  difficulty_level: "Beginner" | "Intermediate" | "Advanced";
  related_chapters: number[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface Story {
  id: string;
  title: string;
  summary: string;
  content: string;
  moral: string;
  imageUrl?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}
