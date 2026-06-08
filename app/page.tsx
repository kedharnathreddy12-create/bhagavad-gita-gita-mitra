"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, ArrowRight, Play, Heart } from "lucide-react";
import Image from "next/image";
import ChapterCard from "@/components/ChapterCard";
import { chapters } from "@/data/chapters";
import { useLearning } from "@/hooks/useLearning";

export default function Home() {
  const featuredChapters = chapters.slice(0, 6);
  const { recentlyViewed, isLoaded, completedChapters } = useLearning();

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 bg-primary-dark" />
        <div className="absolute inset-0 bg-[url('/krishna-logo.jpg')] bg-contain bg-no-repeat bg-center opacity-15 sm:opacity-20 mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-dark/30 to-primary-dark" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
              సులభమైన <span className="text-gradient">తెలుగులో</span> భగవద్గీత
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-text-secondary mb-10 max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
              మన జీవితాన్ని సరైన మార్గంలో నడిపించే గొప్ప జ్ఞానం. 
              ప్రతి శ్లోకం యొక్క అర్థం, ప్రస్తుత కాలానికి ఎలా ఉపయోగపడుతుందో సింపుల్ గా తెలుసుకోండి.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-4 sm:px-0">
              <Link href="/chapters" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-gradient-to-r from-accent-gold to-accent-saffron text-primary-dark px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2">
                  <BookOpen className="w-5 h-5" /> చదవడం ప్రారంభించండి
                </button>
              </Link>
              <Link href="/about-gita" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto glass-panel text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                  <Play className="w-5 h-5 text-accent-gold" /> గీత గురించి
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Continue Reading Banner */}
      {isLoaded && recentlyViewed.length > 0 && completedChapters.length < 18 && (
        <section className="max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto w-full px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-accent-gold/20 to-accent-saffron/20 p-6 sm:p-8 rounded-3xl border border-accent-gold/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">పఠనం కొనసాగించండి</h2>
              <p className="text-white/80 text-sm sm:text-base">మీరు చివరగా చదివిన అధ్యాయం నుండి కొనసాగించండి.</p>
            </div>
            <Link href={`/chapters/${recentlyViewed[0]}`} className="w-full md:w-auto bg-accent-gold text-primary-dark font-bold px-6 sm:px-8 py-3 rounded-full hover:scale-105 transition-transform whitespace-nowrap flex items-center justify-center gap-2 shadow-lg shadow-accent-gold/20">
              Continue Reading <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </section>
      )}

      {/* Featured Sloka Section */}
      <section className="max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto w-full px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-panel rounded-3xl p-6 sm:p-8 md:p-12 border border-accent-gold/20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-accent-gold/5 rounded-full blur-3xl -mr-16 sm:-mr-20 -mt-16 sm:-mt-20" />
          
          <div className="relative z-10 text-center">
            <h2 className="text-accent-gold text-xs sm:text-sm font-bold tracking-widest uppercase mb-4 sm:mb-6">Daily Wisdom</h2>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-medium leading-relaxed mb-4 sm:mb-6">
              &quot;కర్మణ్యేవాధికారస్తే మా ఫలేషు కదాచన&quot;
            </p>
            <p className="text-text-secondary text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mb-6 sm:mb-8">
              నీ పని నువ్వు నిజాయితీగా చెయ్యి. ఫలితం గురించి ఎప్పుడూ ఆలోచించకు.
            </p>
            <Link href="/daily-lesson" className="text-accent-gold hover:text-accent-saffron font-medium flex items-center justify-center gap-2 transition-colors">
              మరింత చదవండి <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 18 Chapters Preview */}
      <section className="max-w-7xl 2xl:max-w-[1440px] mx-auto w-full px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">18 అధ్యాయాలు</h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-sm sm:text-base lg:text-lg">
            జీవితంలోని ప్రతి సమస్యకు భగవద్గీతలో సమాధానం ఉంది.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {featuredChapters.map((chapter) => (
            <ChapterCard key={chapter.id} chapter={chapter} />
          ))}
        </div>

        <div className="text-center mt-10 sm:mt-12">
          <Link href="/chapters">
            <button className="glass-panel text-white border border-white/20 px-6 sm:px-8 py-3 rounded-full font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-2 mx-auto w-full sm:w-auto">
              అన్ని అధ్యాయాలు చూడండి <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>
      
      {/* Why Read Gita */}
      <section className="max-w-7xl 2xl:max-w-[1440px] mx-auto w-full px-4 sm:px-6 py-12 lg:py-20">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 lg:mb-10 text-center lg:text-left">గీత ఎందుకు చదవాలి?</h2>
              <div className="space-y-6 sm:space-y-8">
                <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start text-center sm:text-left">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full glass-panel flex items-center justify-center shrink-0">
                    <Heart className="w-6 h-6 text-accent-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">మనశ్శాంతి కోసం</h3>
                    <p className="text-text-secondary text-sm sm:text-base">ఒత్తిడి, భయాలను దూరం చేసి ప్రశాంతమైన జీవితాన్ని ఇస్తుంది.</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start text-center sm:text-left">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full glass-panel flex items-center justify-center shrink-0">
                    <BookOpen className="w-6 h-6 text-accent-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">నిర్ణయాలు తీసుకోవడానికి</h3>
                    <p className="text-text-secondary text-sm sm:text-base">కష్ట సమయంలో సరైన నిర్ణయం ఎలా తీసుకోవాలో నేర్పుతుంది.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-3xl overflow-hidden glass-panel order-1 lg:order-2 w-full max-w-md mx-auto lg:max-w-none">
               <div className="absolute inset-0 bg-gradient-to-tr from-accent-gold/20 to-accent-saffron/20 mix-blend-overlay z-10" />
               <Image 
                 src="/krishna-flute.jpg" 
                 alt="Krishna Flute" 
                 fill
                 className="object-cover opacity-80"
               />
            </div>
         </div>
      </section>
    </div>
  );
}
