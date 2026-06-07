import type { Metadata } from "next";
import { Outfit, Inter, Noto_Sans_Telugu } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSansTelugu = Noto_Sans_Telugu({
  variable: "--font-telugu",
  subsets: ["telugu"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Krishna Bhagavad Gita | సరళమైన తెలుగులో భగవద్గీత",
    template: "%s | Krishna Bhagavad Gita",
  },
  description: "భగవద్గీతను అత్యంత సరళమైన తెలుగులో చదవండి. అద్భుతమైన కథలు, శ్లోకాలు, వాటి అర్థాలు మరియు మన నిత్య జీవితానికి సంబంధించిన ఉదాహరణలతో కూడిన పూర్తి జ్ఞాన భాండాగారం.",
  keywords: ["Bhagavad Gita", "Telugu Gita", "Krishna", "Slokas", "Dharma", "Karma Yoga", "Bhagavad Gita Telugu", "భగవద్గీత"],
  authors: [{ name: "Gita Telugu Team" }],
  creator: "Gita Telugu Team",
  openGraph: {
    type: "website",
    locale: "te_IN",
    url: "https://krishna-bhagavad-gita.vercel.app",
    title: "Krishna Bhagavad Gita | సరళమైన తెలుగులో భగవద్గీత",
    description: "భగవద్గీతను అత్యంత సరళమైన తెలుగులో చదవండి. అద్భుతమైన కథలు, శ్లోకాలు, వాటి అర్థాలు మరియు మన నిత్య జీవితానికి సంబంధించిన ఉదాహరణలతో కూడిన పూర్తి జ్ఞాన భాండాగారం.",
    siteName: "Krishna Bhagavad Gita",
  },
  twitter: {
    card: "summary_large_image",
    title: "Krishna Bhagavad Gita | సరళమైన తెలుగులో భగవద్గీత",
    description: "భగవద్గీతను అత్యంత సరళమైన తెలుగులో చదవండి.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="te">
      <body 
        className={`${outfit.variable} ${inter.variable} ${notoSansTelugu.variable} antialiased bg-primary-dark text-text-primary min-h-screen flex flex-col`}
        style={{ fontFamily: 'var(--font-telugu), var(--font-outfit), sans-serif' }}
      >
        <Navbar />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Chatbot />
        <Footer />
      </body>
    </html>
  );
}
