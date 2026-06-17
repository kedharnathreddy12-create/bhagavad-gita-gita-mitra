"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { useState } from "react";

export default function ExperiencePage() {
  const [formData, setFormData] = useState({ name: "", contactInfo: "", experience: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error" | "invalid_contact">("idle");

  const validateContactInfo = (info: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+]?[\d\s-]{10,}$/;
    return emailRegex.test(info) || phoneRegex.test(info);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateContactInfo(formData.contactInfo)) {
      setStatus("invalid_contact");
      setTimeout(() => setStatus("idle"), 5000);
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/experience", {
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
        setFormData({ name: "", contactInfo: "", experience: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    
    setTimeout(() => {
      setStatus("idle");
    }, 5000);
  };

  return (
    <div className="max-w-4xl xl:max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 xl:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          <span className="text-accent-gold">గీతామిత్ర</span> చదివిన తర్వాత మీ అభిప్రాయాన్ని తెలియజేయండి
        </h1>
        <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
          భగవద్గీత పఠనం మీ జీవితంలో ఎలాంటి మార్పులు తీసుకువచ్చిందో మాతో పంచుకోండి.
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto">
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-6 sm:p-8 xl:p-12 rounded-3xl border border-white/5 space-y-4 sm:space-y-6"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block text-white mb-2 text-sm">పేరు</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-[#131B2A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors" 
            />
          </div>
          <div>
            <label className="block text-white mb-2 text-sm">ఇమెయిల్ లేదా ఫోన్ నంబర్</label>
            <input 
              type="text" 
              required
              value={formData.contactInfo}
              onChange={(e) => setFormData({...formData, contactInfo: e.target.value})}
              className="w-full bg-[#131B2A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors" 
            />
          </div>
          <div>
            <label className="block text-white mb-2 text-sm">సందేశం</label>
            <textarea 
              rows={6} 
              required
              value={formData.experience}
              onChange={(e) => setFormData({...formData, experience: e.target.value})}
              className="w-full bg-[#131B2A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors resize-y"
            ></textarea>
          </div>
          
          {status === "success" && (
            <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-200 text-sm text-center">
              మీ అనుభవం విజయవంతంగా సమర్పించబడింది. ధన్యవాదాలు!
            </div>
          )}
          
          {status === "invalid_contact" && (
            <div className="p-4 bg-orange-500/20 border border-orange-500/50 rounded-xl text-orange-200 text-sm text-center">
              దయచేసి సరైన ఇమెయిల్ లేదా ఫోన్ నంబర్ నమోదు చేయండి.
            </div>
          )}
          
          {status === "error" && (
            <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm text-center">
              ఏదో తప్పు జరిగింది. దయచేసి మళ్ళీ ప్రయత్నించండి.
            </div>
          )}

          <button 
            type="submit" 
            disabled={status === "submitting"}
            className="w-full bg-accent-gold text-primary-dark font-bold py-4 rounded-xl hover:bg-accent-saffron transition-colors disabled:opacity-70 flex justify-center items-center mt-4"
          >
            {status === "submitting" ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : "పంపండి"}
          </button>
        </motion.form>
      </div>
    </div>
  );
}
