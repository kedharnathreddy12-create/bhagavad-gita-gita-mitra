"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { gitaStories } from "@/data/gita-stories";
import { notFound } from "next/navigation";

export default function GitaStoryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const story = gitaStories.find((s) => s.id === resolvedParams.id);

  if (!story) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/stories/gita" className="inline-flex items-center gap-2 text-accent-gold hover:text-accent-saffron mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> వెనుకకు
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="relative w-full h-[400px] rounded-3xl overflow-hidden mb-10 border border-white/10">
          <Image 
            src={story.imageUrl!} 
            alt={story.title} 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{story.title}</h1>
          </div>
        </div>

        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/5 space-y-8">
          <p className="text-xl text-text-secondary font-medium leading-relaxed italic border-l-4 border-accent-gold pl-6">
            {story.summary}
          </p>

          <div className="text-white/90 text-lg leading-loose whitespace-pre-line">
            {story.content}
          </div>

          <div className="mt-12 bg-accent-gold/10 border border-accent-gold/30 rounded-2xl p-6">
            <h3 className="text-accent-gold font-bold uppercase tracking-widest text-sm mb-2">నీతి (Moral)</h3>
            <p className="text-white text-xl font-medium">{story.moral}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
