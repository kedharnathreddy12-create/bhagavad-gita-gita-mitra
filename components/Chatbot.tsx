"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatMessage } from "@/types";

const suggestedPrompts = [
  "కర్మయోగం అంటే ఏమిటి?",
  "What is Karma Yoga?",
  "భక్తి అంటే ఏమిటి?",
  "What is Bhakti Yoga?",
  "గీతలో విజయం గురించి ఏమి చెప్పారు?",
  "How does Gita explain success?",
  "ఒత్తిడిని ఎలా తగ్గించుకోవాలి?",
  "How can I reduce stress?",
  "శ్రీకృష్ణుడు అర్జునుడికి ఏమి బోధించాడు?",
  "What did Krishna teach Arjuna?"
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content: "హరే కృష్ణ! నేను గీతా మిత్రను. భగవద్గీత గురించి మీకు ఎలాంటి సందేహాలు ఉన్నా అడగవచ్చు.",
      timestamp: Date.now(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleRefresh = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: "assistant",
        content: "హరే కృష్ణ! నేను గీతా మిత్రను. భగవద్గీత గురించి మీకు ఎలాంటి సందేహాలు ఉన్నా అడగవచ్చు.",
        timestamp: Date.now(),
      }
    ]);
    setInput("");
  };

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      // Create history array, excluding the very first greeting if needed, or sending all
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history })
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: Date.now(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat Error:", error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "క్షమించండి, సర్వర్ లోపం కారణంగా సమాధానం ఇవ్వలేకపోతున్నాను.",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-gradient-to-r from-accent-gold to-accent-saffron text-primary-dark shadow-lg shadow-accent-gold/20 z-50 hover:scale-105 transition-transform ${isOpen ? 'hidden' : 'block'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Open Chatbot"
        aria-expanded={isOpen}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-80 sm:w-96 h-[550px] max-h-[85vh] glass-panel rounded-2xl shadow-2xl z-50 flex flex-col border border-accent-gold/20 overflow-hidden"
            role="dialog"
            aria-label="Chatbot Window"
          >
            {/* Header */}
            <div className="bg-primary-dark/80 p-4 border-b border-accent-gold/20 flex justify-between items-center backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent-gold to-accent-saffron flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-dark" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Gita Mitra AI</h3>
                  <p className="text-xs text-accent-gold">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={handleRefresh} className="text-text-secondary hover:text-accent-gold transition-colors" aria-label="Refresh Chat" title="Restart Conversation">
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button onClick={() => setIsOpen(false)} className="text-text-secondary hover:text-white transition-colors" aria-label="Close Chatbot">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-primary/40" role="log" aria-live="polite">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-accent-gold text-primary-dark rounded-tr-sm font-medium' 
                      : 'glass-panel text-white/90 rounded-tl-sm border border-white/5 whitespace-pre-line'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {suggestedPrompts.map((prompt, idx) => (
                    <button 
                      key={idx}
                      onClick={() => handleSend(prompt)}
                      className="text-xs border border-accent-gold/30 text-accent-gold hover:bg-accent-gold/10 px-3 py-1.5 rounded-full transition-colors text-left"
                      aria-label={`Ask: ${prompt}`}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              {messages.length > 1 && !isTyping && messages[messages.length - 1].role === 'assistant' && (
                <div className="flex flex-col gap-2 mt-2 items-start">
                  <span className="text-xs text-white/50 ml-1">Suggested for you:</span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      suggestedPrompts[(messages.length * 3) % suggestedPrompts.length],
                      suggestedPrompts[(messages.length * 3 + 1) % suggestedPrompts.length]
                    ].map((prompt, idx) => (
                      <button 
                        key={idx}
                        onClick={() => handleSend(prompt)}
                        className="text-xs border border-accent-gold/30 text-accent-gold hover:bg-accent-gold/10 px-3 py-1.5 rounded-full transition-colors text-left"
                        aria-label={`Ask: ${prompt}`}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {isTyping && (
                <div className="flex justify-start" aria-label="Bot is typing...">
                  <div className="glass-panel text-white p-3 rounded-2xl rounded-tl-sm text-sm flex gap-1 border border-white/5">
                    <span className="w-2 h-2 bg-accent-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-accent-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-accent-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-primary-dark/80 border-t border-accent-gold/20">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                  placeholder="Ask a question..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-accent-gold/50 transition-colors"
                  aria-label="Message input"
                />
                <button
                  onClick={() => handleSend(input)}
                  disabled={!input.trim() || isTyping}
                  className="p-2 rounded-full bg-accent-gold text-primary-dark disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent-saffron transition-colors"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
