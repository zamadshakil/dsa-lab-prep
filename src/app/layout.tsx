import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "DSA Lab Exam Prep — Mid-Term Dashboard",
  description:
    "Complete DSA Lab Exam preparation dashboard covering Recursion, Linked Lists, Stack, Queue with interactive code examples, visual diagrams, and comparison tables.",
  metadataBase: new URL("https://dsa-lab-prep.vercel.app"),
  openGraph: {
    title: "DSA Lab Exam Prep",
    description: "Interactive DSA Lab Exam preparation dashboard",
    type: "website",
  },
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
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex bg-[#06060f] text-[#e4e4ec] font-[family-name:var(--font-inter)]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[999] focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold"
        >
          Skip to main content
        </a>
        <Sidebar />
        <main
          id="main-content"
          role="main"
          className="flex-1 lg:ml-[260px] min-h-screen"
        >
          <div className="max-w-[880px] mx-auto px-5 md:px-10 py-10 pb-24">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
