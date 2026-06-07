"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
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
              <p className="text-text-secondary">contact@gitatelugu.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-accent-gold/20 p-3 rounded-full">
              <Phone className="w-6 h-6 text-accent-gold" />
            </div>
            <div>
              <h3 className="text-white font-bold mb-1">Phone</h3>
              <p className="text-text-secondary">+91 98765 43210</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-accent-gold/20 p-3 rounded-full">
              <MapPin className="w-6 h-6 text-accent-gold" />
            </div>
            <div>
              <h3 className="text-white font-bold mb-1">Address</h3>
              <p className="text-text-secondary">Hyderabad, Telangana, India.</p>
            </div>
          </div>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-panel p-6 sm:p-8 xl:p-12 rounded-3xl border border-white/5 space-y-4 sm:space-y-6"
          onSubmit={e => e.preventDefault()}
        >
          <div>
            <label className="block text-text-secondary mb-2 text-sm">పేరు (Name)</label>
            <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors" />
          </div>
          <div>
            <label className="block text-text-secondary mb-2 text-sm">ఈమెయిల్ (Email)</label>
            <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors" />
          </div>
          <div>
            <label className="block text-text-secondary mb-2 text-sm">సందేశం (Message)</label>
            <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors"></textarea>
          </div>
          <button type="submit" className="w-full bg-accent-gold text-primary-dark font-bold py-3 rounded-xl hover:bg-accent-saffron transition-colors">
            పంపండి (Send)
          </button>
        </motion.form>
      </div>
    </div>
  );
}
