"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, BookOpen, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SearchModal from "./SearchModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Chapters", href: "/chapters" },
    { name: "My Learning", href: "/my-learning" },
    { name: "Daily Lesson", href: "/daily-lesson" },
    { name: "About Gita", href: "/about-gita" },
    { name: "Stories", href: "/stories/krishna" },
  ];

  return (
    <>
      <nav className="fixed w-full z-40 glass-panel border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <BookOpen className="text-accent-gold w-6 h-6" />
              <Link href="/" className="font-bold text-xl tracking-wide text-gradient">
                Gita Telugu
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
