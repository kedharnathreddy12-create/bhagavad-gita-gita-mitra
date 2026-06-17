"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Search, Settings, LogOut, User as UserIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";
import SearchModal from "./SearchModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.href = "/";
  };

  const links = [
    { name: "Home", href: "/" },
    { name: "Chapters", href: "/chapters" },
    { name: "My Learning", href: "/my-learning" },
    { name: "Daily Lesson", href: "/daily-lesson" },
    { name: "About Gita", href: "/about-gita" },
    { name: "Stories", href: "/stories/krishna" },
    { name: "మీ అనుభవం", href: "/experience" },
  ];

  return (
    <>
      <nav className="fixed w-full z-40 glass-panel border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2">
                <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-accent-gold/30">
                  <Image 
                    src="/krishna-logo.jpg" 
                    alt="GitaMitra Logo" 
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="font-bold text-lg sm:text-xl tracking-wide text-gradient">
                  GitaMitra
                </span>
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-text-secondary hover:text-accent-gold transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="text-text-secondary hover:text-white transition-colors p-1"
                aria-label="Open Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {user ? (
                <button
                  onClick={handleLogout}
                  className="text-text-secondary hover:text-accent-gold transition-colors p-1"
                  aria-label="Logout"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              ) : (
                <Link
                  href="/login"
                  className="text-text-secondary hover:text-accent-gold transition-colors p-1"
                  aria-label="Login"
                  title="Login"
                >
                  <UserIcon className="w-5 h-5" />
                </Link>
              )}

              <Link
                href="/admin"
                className="text-text-secondary hover:text-accent-gold transition-colors p-1 hidden sm:block"
                aria-label="Admin Panel"
              >
                <Settings className="w-5 h-5" />
              </Link>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-text-secondary hover:text-white p-2"
                  aria-expanded={isOpen}
                  aria-label="Toggle navigation menu"
                >
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden glass-panel absolute w-full"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-text-secondary hover:text-accent-gold block px-3 py-2 rounded-md text-base font-medium"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
