import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#f1f5f9",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: { default: "DSA Lab Prep", template: "%s — DSA Lab Prep" },
  description: "Interactive DSA Lab Exam preparation — Recursion, Linked Lists, Stack, Queue with code examples and diagrams.",
  metadataBase: new URL("https://dsa-lab-prep.vercel.app"),
  openGraph: { title: "DSA Lab Prep", description: "Interactive DSA Lab Exam preparation dashboard", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
      <body className="min-h-screen text-slate-900 font-[family-name:var(--font-inter)]">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[999] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-[12px] focus:text-sm focus:font-medium shadow-md">
          Skip to content
        </a>
        <Sidebar />
        <main id="main-content" role="main" className="lg:pl-[280px]">
          <div className="max-w-[1024px] mx-auto pt-[80px] lg:pt-[56px] px-6 sm:px-8 lg:px-10 pb-[100px] lg:pb-32">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
