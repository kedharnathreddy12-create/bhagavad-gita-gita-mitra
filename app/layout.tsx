import type { Metadata } from "next";
import { Outfit, Inter, Noto_Sans_Telugu } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import CanonicalUrl from "@/components/CanonicalUrl";
import { Analytics } from "@vercel/analytics/next";

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
    default: "GitaMitra | Bhagavad Gita in Telugu",
    template: "%s | GitaMitra",
  },
  description: "Read Bhagavad Gita in Telugu with chapter-wise reading, verses, meanings, and spiritual guidance.",
  keywords: ["Bhagavad Gita", "Telugu Gita", "Krishna", "Slokas", "Dharma", "Karma Yoga", "Bhagavad Gita Telugu", "భగవద్గీత"],
  authors: [{ name: "Gita Telugu Team" }],
  creator: "Gita Telugu Team",
  metadataBase: new URL("https://gitamitra.vercel.app"),
  openGraph: {
    type: "website",
    locale: "te_IN",
    url: "https://gitamitra.vercel.app",
    title: "GitaMitra",
    description: "Read Bhagavad Gita in Telugu with chapter-wise reading, verses, meanings, and spiritual guidance.",
    siteName: "GitaMitra",
    images: [
      {
        url: "/krishna-logo.jpg",
        width: 1200,
        height: 630,
        alt: "GitaMitra",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GitaMitra | Bhagavad Gita in Telugu",
    description: "Read Bhagavad Gita in Telugu with chapter-wise reading, verses, meanings, and spiritual guidance.",
    images: ["/krishna-logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "i2viGYya5KHbGGHGaHMIjkJLIlicIlceB9sYCuFAQBM",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="te">
      <head>
        <CanonicalUrl />
      </head>
      <body 
        className={`${outfit.variable} ${inter.variable} ${notoSansTelugu.variable} antialiased bg-primary-dark text-text-primary min-h-screen flex flex-col`}
        style={{ fontFamily: 'var(--font-telugu), var(--font-outfit), sans-serif' }}
      >
        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ADSENSE_ID"
        />
        <Navbar />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Chatbot />
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
