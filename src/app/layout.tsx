import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DSA Lab Exam Prep — Mid-Term Dashboard",
  description:
    "Complete DSA Lab Exam preparation dashboard covering Recursion, Linked Lists, Stack, Queue with interactive code examples, visual diagrams, and comparison tables.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex bg-[#06060f] text-[#e4e4ec]">
        <Sidebar />
        <main className="flex-1 lg:ml-[260px] min-h-screen">
          <div className="max-w-[920px] mx-auto px-5 md:px-10 py-10 pb-24">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
