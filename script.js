/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
let content = fs.readFileSync('data/chapters.ts', 'utf8');

const mapping = {
  1: 'Beginner', 2: 'Beginner', 3: 'Beginner', 4: 'Beginner', 5: 'Beginner', 6: 'Beginner',
  7: 'Intermediate', 8: 'Intermediate', 9: 'Intermediate', 10: 'Intermediate', 11: 'Intermediate', 12: 'Intermediate',
  13: 'Advanced', 14: 'Advanced', 15: 'Advanced', 16: 'Advanced', 17: 'Advanced', 18: 'Advanced'
};

content = content.replace(/id:\s*(\d+)([\s\S]*?)verses_count:\s*(\d+)(?!,\s*difficulty_level)/g, (match, id, middle, verses) => {
  return "id: " + id + middle + "verses_count: " + verses + ", difficulty_level: \"" + mapping[id] + "\"";
});

fs.writeFileSync('data/chapters.ts', content);
