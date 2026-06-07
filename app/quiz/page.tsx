"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { quizQuestions } from "@/data/quiz";
import { Award, ArrowRight, RefreshCw, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const q = quizQuestions[currentQuestion];

  const handleSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedOption(index);
    setShowExplanation(true);
    
    if (index === q.correctAnswerIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(c => c + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-12 rounded-3xl border border-accent-gold/20"
        >
          <Award className="w-24 h-24 text-accent-gold mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-white mb-4">క్విజ్ పూర్తయింది!</h1>
          <p className="text-2xl text-text-secondary mb-8">
            మీ స్కోరు: <span className="text-accent-gold font-bold">{score} / {quizQuestions.length}</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={restartQuiz} className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 transition-colors">
              <RefreshCw className="w-5 h-5" /> మళ్లీ ప్రయత్నించండి
            </button>
            <Link href="/chapters" className="bg-gradient-to-r from-accent-gold to-accent-saffron text-primary-dark px-6 py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:scale-105 transition-transform">
              భగవద్గీత చదవండి <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">గీతా క్విజ్</h1>
        <div className="flex items-center justify-center gap-4 text-text-secondary">
          <span>ప్రశ్న: {currentQuestion + 1} / {quizQuestions.length}</span>
          <span>•</span>
          <span>స్కోరు: <strong className="text-accent-gold">{score}</strong></span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="glass-panel p-8 md:p-10 rounded-3xl border border-white/10"
        >
          <h2 className="text-2xl font-bold text-white mb-8 leading-relaxed">
            {q.question}
          </h2>

          <div className="space-y-4 mb-8">
            {q.options.map((option, index) => {
              let btnClass = "bg-white/5 border-white/10 hover:bg-white/10";
              if (showExplanation) {
                if (index === q.correctAnswerIndex) {
                  btnClass = "bg-green-500/20 border-green-500/50 text-green-300";
                } else if (index === selectedOption) {
                  btnClass = "bg-red-500/20 border-red-500/50 text-red-300";
                } else {
                  btnClass = "bg-white/5 border-white/10 opacity-50";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  disabled={showExplanation}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between ${btnClass}`}
                >
                  <span className="text-lg">{option}</span>
                  {showExplanation && index === q.correctAnswerIndex && <CheckCircle className="w-5 h-5 text-green-400" />}
                  {showExplanation && index === selectedOption && index !== q.correctAnswerIndex && <XCircle className="w-5 h-5 text-red-400" />}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="overflow-hidden"
              >
                <div className="bg-primary/50 p-6 rounded-2xl border-l-4 border-accent-gold mb-8">
                  <h3 className="text-accent-gold font-bold mb-2">వివరణ:</h3>
                  <p className="text-white/90 text-lg leading-relaxed">{q.explanation}</p>
                </div>
                
                <button
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-accent-gold to-accent-saffron text-primary-dark font-bold py-4 rounded-xl text-lg hover:opacity-90 transition-opacity"
                >
                  {currentQuestion === quizQuestions.length - 1 ? "ఫలితాలు చూడండి" : "తర్వాతి ప్రశ్న"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
