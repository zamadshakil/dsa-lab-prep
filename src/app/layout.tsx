import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { TelemetryProvider } from "@/components/telemetry";
import { LayoutShell } from "@/components/layout-shell";

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
        <TelemetryProvider>
          <LayoutShell>{children}</LayoutShell>
          <Analytics />
        </TelemetryProvider>
      </body>
    </html>
  );
}
