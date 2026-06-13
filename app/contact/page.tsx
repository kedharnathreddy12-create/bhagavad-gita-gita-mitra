"use client";

import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
    
    // Reset status after a few seconds
    setTimeout(() => {
      setStatus("idle");
    }, 5000);
  };

  return (
    <div className="max-w-4xl xl:max-w-6xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 py-12 sm:py-16 xl:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">మమ్మల్ని సంప్రదించండి</h1>
        <p className="text-base sm:text-lg text-text-secondary">మీకు ఏవైనా ప్రశ్నలు ఉంటే మాకు తెలియజేయండి.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-panel p-6 sm:p-8 xl:p-12 rounded-3xl border border-white/5 space-y-8"
        >
          <div className="flex items-start gap-4">
            <div className="bg-accent-gold/20 p-3 rounded-full">
              <Mail className="w-6 h-6 text-accent-gold" />
            </div>
            <div>
              <h3 className="text-white font-bold mb-1">Email</h3>
              <p className="text-text-secondary">dwarakatej22@gmail.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-accent-gold/20 p-3 rounded-full">
              <MapPin className="w-6 h-6 text-accent-gold" />
            </div>
            <div>
              <h3 className="text-white font-bold mb-1">Address</h3>
              <p className="text-text-secondary">Andhrapradesh, India</p>
            </div>
          </div>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-panel p-6 sm:p-8 xl:p-12 rounded-3xl border border-white/5 space-y-4 sm:space-y-6"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block text-text-secondary mb-2 text-sm">పేరు (Name)</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors" 
            />
          </div>
          <div>
            <label className="block text-text-secondary mb-2 text-sm">ఈమెయిల్ (Email)</label>
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors" 
            />
          </div>
          <div>
            <label className="block text-text-secondary mb-2 text-sm">సందేశం (Message)</label>
            <textarea 
              rows={4} 
              required
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors"
            ></textarea>
          </div>
          
          {status === "success" && (
            <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-200 text-sm text-center">
              సందేశం విజయవంతంగా పంపబడింది! (Message sent successfully!)
            </div>
          )}
          
          {status === "error" && (
            <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm text-center">
              ఏదో తప్పు జరిగింది. దయచేసి మళ్ళీ ప్రయత్నించండి. (Something went wrong. Please try again.)
            </div>
          )}

          <button 
            type="submit" 
            disabled={status === "submitting"}
            className="w-full bg-accent-gold text-primary-dark font-bold py-3 rounded-xl hover:bg-accent-saffron transition-colors disabled:opacity-70 flex justify-center items-center"
          >
            {status === "submitting" ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : "పంపండి (Send)"}
          </button>
        </motion.form>
      </div>
    </div>
  );
}
