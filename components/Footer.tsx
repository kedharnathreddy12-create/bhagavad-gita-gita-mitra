import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="glass-panel border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="text-accent-gold w-6 h-6" />
              <span className="font-bold text-xl text-gradient">Gita Telugu</span>
            </div>
            <p className="text-text-secondary max-w-sm">
              భగవద్గీతను సులభమైన తెలుగులో అర్థం చేసుకునేందుకు ఒక చిన్న ప్రయత్నం. 
              మన జీవితాన్ని మార్చే గొప్ప జ్ఞానం.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link href="/" className="hover:text-accent-gold transition">Home</Link></li>
              <li><Link href="/chapters" className="hover:text-accent-gold transition">All Chapters</Link></li>
              <li><Link href="/about-gita" className="hover:text-accent-gold transition">About Gita</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link href="/privacy" className="hover:text-accent-gold transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-accent-gold transition">Terms of Service</Link></li>
              <li><Link href="/contact" className="hover:text-accent-gold transition">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-text-secondary">
          <p>© {new Date().getFullYear()} Krishna Bhagavad Gita. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
