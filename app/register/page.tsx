"use client";

import { motion } from "framer-motion";
import { UserPlus, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      setStatus("success");
      // Check if email confirmation is required by Supabase settings
      if (data.user && data.user.identities && data.user.identities.length === 0) {
         setErrorMsg("Email already in use. Please login.");
         setStatus("error");
         return;
      }

      // Wait a moment before redirect
      setTimeout(() => {
        window.location.href = "/my-learning";
      }, 1500);
      
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Registration failed");
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
          నమోదు (Register)
        </h1>
        <p className="text-text-secondary">
          కొత్త ఖాతాను సృష్టించండి.
        </p>
      </motion.div>

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 space-y-6"
        onSubmit={handleRegister}
      >
        <div className="flex justify-center mb-6">
           <div className="bg-accent-gold/20 p-4 rounded-full">
             <UserPlus className="w-8 h-8 text-accent-gold" />
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
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#131B2A] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors" 
              placeholder="కనీసం 6 అక్షరాలు (Min 6 chars)"
            />
          </div>
        </div>
        
        {status === "success" && (
          <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-200 text-sm text-center">
            ఖాతా సృష్టించబడింది! దయచేసి వేచి ఉండండి... (Account created!)
          </div>
        )}

        {status === "error" && (
          <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm text-center">
            {errorMsg}
          </div>
        )}

        <button 
          type="submit" 
          disabled={status === "submitting" || status === "success"}
          className="w-full bg-accent-gold text-primary-dark font-bold py-4 rounded-xl hover:bg-accent-saffron transition-colors disabled:opacity-70 flex justify-center items-center mt-4"
        >
          {status === "submitting" ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : "నమోదు చేసుకోండి"}
        </button>

        <p className="text-center text-text-secondary text-sm mt-6">
          ఇప్పటికే ఖాతా ఉందా?{" "}
          <Link href="/login" className="text-accent-gold hover:underline">
            లాగిన్ అవ్వండి (Login)
          </Link>
        </p>
      </motion.form>
    </div>
  );
}
