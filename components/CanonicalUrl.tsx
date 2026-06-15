"use client";

import { usePathname } from "next/navigation";

export default function CanonicalUrl() {
  const pathname = usePathname();
  const siteUrl = "https://krishna-bhagavad-gita.vercel.app";
  const canonicalUrl = `${siteUrl}${pathname === '/' ? '' : pathname}`;

  return <link rel="canonical" href={canonicalUrl} />;
}
