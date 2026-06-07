# Admin Content Structure Documentation

Welcome to the Krishna Bhagavad Gita platform content management guide. 
This document explains exactly how to add the remaining 700+ slokas, new chapters, or stories to the application.

## System Architecture

The application uses a **scalable static data architecture**. We deliberately avoid a complex database (like PostgreSQL/MongoDB) to ensure the site can be hosted statically on Vercel Edge networks for maximum performance, offline capability, and zero database costs.

All data is stored in TypeScript files inside the `data/` directory.

### 1. Adding Slokas

We have now refactored the architecture into a **modular, lazy-loaded system**. Slokas are no longer stored in a single file. Each chapter has its own dedicated file in `data/slokas/`.

To add a real sloka:
1. Open the file for the specific chapter, e.g., `data/slokas/chapter-1.ts`.
2. Add a new object to the `slokas` array. 
3. **Format:**
```typescript
{
  id: "1.2", // Chapter.Verse
  chapter_id: 1, // Must be a number
  verse_number: 2, // Must be a number
  sanskrit: "సంస్కృత శ్లోకం ఇక్కడ...",
  transliteration_telugu: "తెలుగు లిపిలో శ్లోకం...",
  word_meanings_telugu: "పదాలకు అర్థాలు...",
  meaning_telugu: "తాత్పర్యం...",
  modern_example_telugu: "నేటి జీవితానికి ఉదాహరణ (Optional)",
  key_lesson: "ముఖ్యమైన పాఠం (Optional)",
  tags: ["Tag1", "Tag2"], // (Optional)
  difficulty_level: "easy", // 'easy' | 'medium' | 'hard' (Optional)
  audio_url: "url" // (Optional)
}
```
**Important:** As soon as you add this object to the array, the system will automatically overwrite the "Coming Soon" placeholder, and the sloka will be fully interactive (TTS, Bookmarks, Searchable). No other code changes are needed! The Dashboard will automatically track your completion percentage.

### 2. Updating Chapters

All 18 chapters are already defined in `data/chapters.ts` with their exact `verses_count`. 
If you want to edit a chapter's summary or meaning, simply modify the text in that file.

### 3. Adding Stories

To add a new story:
1. Open `data/krishna-stories.ts` or `data/gita-stories.ts`.
2. Add a new object to the array following the `Story` interface.
3. The platform will automatically generate a new dynamic route (`/stories/krishna/[id]`) and add the story to the Global Search index.

## Best Practices
- **Never change the IDs:** The IDs (like `"2.47"`) are used for bookmarks and search routing. Changing an ID will break existing user bookmarks.
- **Run the Dashboard:** You can always check your content progress by navigating to `/dashboard` in the running app.
