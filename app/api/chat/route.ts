import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

// Basic in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT = 15; // requests
const WINDOW_MS = 60 * 1000; // 1 minute

export async function POST(req: Request) {
  // Rate Limiting Logic
  const ip = req.headers.get('x-forwarded-for') || 'anonymous';
  const now = Date.now();
  const userRateData = rateLimitMap.get(ip);

  if (userRateData) {
    if (now - userRateData.timestamp < WINDOW_MS) {
      if (userRateData.count >= RATE_LIMIT) {
        return NextResponse.json({ error: "Too many requests. Please wait a minute." }, { status: 429 });
      }
      userRateData.count++;
    } else {
      rateLimitMap.set(ip, { count: 1, timestamp: now });
    }
  } else {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
  }

  // Clear old entries occasionally to prevent memory leaks
  if (rateLimitMap.size > 1000) {
    rateLimitMap.clear();
  }

  try {
    const { message, history } = await req.json();

    // Input Sanitization
    if (!message || typeof message !== 'string' || message.length > 500) {
      return NextResponse.json({ error: "Invalid input length. Max 500 characters." }, { status: 400 });
    }

    if (!apiKey) {
      const { generateResponse } = await import('@/data/chatbot-responses');
      return NextResponse.json({ response: generateResponse(message) });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `You are Gita Mitra AI, a dedicated assistant for a Bhagavad Gita learning platform.

Your Rules:
1. You must ONLY answer questions related to:
   - Bhagavad Gita
   - Krishna teachings
   - Dharma
   - Karma
   - Bhakti
   - Spiritual guidance
   - Life lessons
   - Chapter explanations

2. If a user asks about unrelated topics (like Coding, Politics, Hacking, Movies, Sports, etc.), you MUST politely redirect them EXACTLY like this:
   - If they asked in English: "I am Gita Mitra AI. I specialize in Bhagavad Gita and Krishna teachings."
   - If they asked in Telugu: "నేను గీత మిత్ర AI. నేను భగవద్గీత మరియు శ్రీకృష్ణుని బోధనలకు సంబంధించిన ప్రశ్నలకు మాత్రమే సమాధానం ఇస్తాను."

3. Language Detection:
   - If the user asks in Telugu → reply in Telugu.
   - If the user asks in English → reply in English.
   - If the user explicitly says "Answer in Telugu" or "Answer in English", follow that preference strictly.

4. Provide explanations that are simple, modern, and beginner-friendly.`,
    });

    const chat = model.startChat({
      history: history.map((msg: { role: string; content: string }) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      })),
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate response." },
      { status: 500 }
    );
  }
}
