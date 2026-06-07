"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { krishnaStories } from "@/data/krishna-stories";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function KrishnaStoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          శ్రీకృష్ణ <span className="text-gradient">లీలలు</span>
        </h1>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
          భగవానుడు శ్రీకృష్ణుని అద్భుతమైన కథలు, వాటిలో దాగిన జీవిత సత్యాలు.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {krishnaStories.map((story, index) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link href={`/stories/krishna/${story.id}`}>
              <div className="glass-panel rounded-2xl overflow-hidden h-full group hover:border-accent-gold/50 transition-colors border border-white/10">
                <div className="h-48 relative">
                  <Image 
                    src={story.imageUrl!} 
                    alt={story.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent-gold transition-colors">{story.title}</h3>
                  <p className="text-text-secondary line-clamp-3 mb-4">{story.summary}</p>
                  <span className="text-accent-gold flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
                    కథ చదవండి <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
