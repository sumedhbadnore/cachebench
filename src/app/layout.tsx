// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "CacheBench",
  description: "LRU, FIFO, LFU cache simulator on Vercel"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-950 text-neutral-100">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
