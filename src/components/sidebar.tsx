"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { topics } from "@/data/code-examples";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export function Sidebar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const navItems = [
    { href: "/", label: "Overview", icon: "🏠" },
    ...topics.map((t) => ({ href: `/${t.slug}`, label: t.shortTitle, icon: t.icon })),
    { href: "/quick-reference", label: "Quick Ref", icon: "⚡" },
  ];

  const Nav = () => (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Brand */}
      <div className="px-6 pt-7 pb-5">
        <Link href="/" className="block group" aria-label="Home">
          <p className="text-[17px] font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
            DSA Lab Prep
          </p>
          <p className="text-[12px] text-slate-500 font-medium mt-0.5">Mid-Term Exam · 2026</p>
        </Link>
      </div>

      <div className="mx-5 h-px bg-slate-200" />

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 pt-5 pb-3" aria-label="Main navigation">
        <ul className="space-y-1 list-none m-0 p-0">
          {navItems.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-200",
                    isActive
                      ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-200/60"
                      : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 border border-transparent"
                  )}
                >
                  <div className={cn(
                    "w-[6px] h-[6px] rounded-full flex-shrink-0 transition-all duration-300",
                    isActive ? "bg-blue-600 opacity-100 scale-100" : "bg-slate-300 opacity-0 scale-75 hidden"
                  )} />
                  <span className="truncate">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="px-6 py-5 border-t border-slate-200/60 flex flex-col gap-4">
        <ExamCountdown />
        <a href="https://zamdevai.com" target="_blank" rel="noopener noreferrer" 
           className="group flex flex-col p-3 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 group-hover:text-blue-500 transition-colors">Developed by</span>
          <span className="text-[14px] font-semibold text-slate-900">ZamDev AI</span>
          <span className="text-[12px] text-slate-500 font-medium">Founder: Zamad Shakeel</span>
        </a>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Header (Branding only) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-[60px] bg-white/80 backdrop-blur-xl border-b border-slate-200/60 z-[140] flex items-center px-4 sm:px-6 shadow-sm">
        <Link href="/" className="flex flex-col">
          <p className="text-[17px] font-bold tracking-tight text-slate-900">
            DSA Lab Prep
          </p>
        </Link>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 w-[280px] h-screen bg-slate-50 border-r border-slate-200 z-50 flex-col" aria-label="Navigation">
        <Nav />
      </aside>

      {/* Mobile Bottom Tab Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-[64px] sm:h-[70px] bg-white border-t border-slate-200 z-[140] flex items-center justify-between pb-safe shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
        <div className="flex w-full overflow-x-auto items-end justify-start sm:justify-center hide-scrollbar h-full px-2">
          {navItems.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center w-[72px] sm:w-[84px] h-full flex-shrink-0 transition-colors relative gap-1",
                  isActive ? "text-blue-600" : "text-slate-500 hover:text-slate-900"
                )}
              >
                {isActive && (
                  <motion.div layoutId="bottomNavIndicator" className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-600 rounded-b-full shadow-[0_2px_8px_rgba(37,99,235,0.4)]" />
                )}
                <span className={cn("text-[20px] sm:text-[22px] transition-transform duration-200 mt-1", isActive && "scale-110")}>
                  {item.icon}
                </span>
                <span className={cn(
                  "text-[10px] sm:text-[11px] font-semibold tracking-tight truncate w-full text-center px-1",
                  isActive ? "text-blue-700" : "font-medium"
                )}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

function ExamCountdown() {
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const tick = () => {
      const diff = new Date("2026-04-13T09:00:00+05:00").getTime() - Date.now();
      if (diff <= 0) { setTime("Exam day — you got this!"); return; }
      setTime(`${Math.floor(diff / 3600000)}h ${Math.floor((diff % 3600000) / 60000)}m until exam`);
    };
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) return null;
  return (
    <div className="flex items-center gap-3 bg-red-50/50 border border-red-100 rounded-[12px] p-3" aria-live="polite">
      <div className="w-[8px] h-[8px] rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse" />
      <p className="text-[13px] text-red-600 font-medium tracking-tight">{time}</p>
    </div>
  );
}
