"use client";

import { motion } from "framer-motion";
import { User, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      setStatus("success");
      // Force reload to update navbar state properly
      window.location.href = "/my-learning";
    } catch (err: unknown) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "లాగిన్ విఫలమైంది (Login failed)";
      if (errorMessage === "Email not confirmed") {
        setErrorMsg("దయచేసి మీ ఇమెయిల్ ని నిర్ధారించండి (Please confirm your email address by checking your inbox).");
      } else {
        setErrorMsg(errorMessage);
      }
      setStatus("error");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          లాగిన్ (Login)
        </h1>
        <p className="text-text-secondary">
          మీ అధ్యయనాన్ని కొనసాగించడానికి లాగిన్ అవ్వండి.
        </p>
      </motion.div>

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 space-y-6"
        onSubmit={handleLogin}
      >
        <div className="flex justify-center mb-6">
           <div className="bg-accent-gold/20 p-4 rounded-full">
             <User className="w-8 h-8 text-accent-gold" />
           </div>
        </div>

        <div>
          <label className="block text-white mb-2 text-sm">ఈమెయిల్ (Email)</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#131B2A] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors" 
              placeholder="మీ ఇమెయిల్"
            />
          </div>
        </div>

        <div>
          <label className="block text-white mb-2 text-sm">పాస్వర్డ్ (Password)</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#131B2A] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors" 
              placeholder="••••••••"
            />
          </div>
        </div>
        
        {status === "error" && (
          <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm text-center">
            {errorMsg}
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
          ) : "లాగిన్ అవ్వండి"}
        </button>

        <p className="text-center text-text-secondary text-sm mt-6">
          ఖాతా లేదా?{" "}
          <Link href="/register" className="text-accent-gold hover:underline">
            ఇక్కడ నమోదు చేసుకోండి (Register)
          </Link>
        </p>
      </motion.form>
    </div>
  );
}
