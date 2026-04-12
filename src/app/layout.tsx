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
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "DSA Lab Prep",
    template: "%s — DSA Lab Prep",
  },
  description:
    "Interactive DSA Lab Exam preparation — Recursion, Linked Lists, Stack, Queue with code examples and visual diagrams.",
  metadataBase: new URL("https://dsa-lab-prep.vercel.app"),
  openGraph: {
    title: "DSA Lab Prep",
    description: "Interactive DSA Lab Exam preparation dashboard",
    type: "website",
    siteName: "DSA Lab Prep",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-black text-[#f5f5f7] font-[family-name:var(--font-inter)]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[999] focus:px-4 focus:py-2 focus:bg-[#0a84ff] focus:text-white focus:rounded-lg focus:text-sm focus:font-medium"
        >
          Skip to main content
        </a>
        <Sidebar />
        <main id="main-content" role="main" className="lg:pl-[272px]">
          <div className="max-w-[860px] mx-auto px-6 sm:px-8 lg:px-10 py-12 pb-32">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
