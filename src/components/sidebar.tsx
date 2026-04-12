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
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  const navItems = [
    { href: "/", label: "Overview" },
    ...topics.map((t) => ({ href: `/${t.slug}`, label: t.title })),
    { href: "/quick-reference", label: "Quick Reference" },
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
      {/* Mobile toggle */}
      <button onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}
        className="lg:hidden fixed top-4 left-4 z-[200] w-10 h-10 rounded-xl bg-white/90 backdrop-blur-xl text-slate-900 flex items-center justify-center shadow-md border border-slate-200">
        {open ? <X size={16} /> : <Menu size={16} />}
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 w-[280px] h-screen bg-slate-50 border-r border-slate-200 z-50 flex-col" aria-label="Navigation">
        <Nav />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[150] lg:hidden" aria-hidden="true" />
            <motion.aside initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="fixed left-0 top-0 w-[280px] h-screen bg-slate-50 border-r border-slate-200 z-[160] flex flex-col lg:hidden shadow-2xl" aria-label="Mobile navigation">
              <Nav />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
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
