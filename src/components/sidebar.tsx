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
    { href: "/", label: "Overview", color: "#0071e3" },
    ...topics.map((t) => ({ href: `/${t.slug}`, label: t.title, color: t.color })),
    { href: "/quick-reference", label: "Quick Reference", color: "#34c759" },
  ];

  const Nav = () => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-6 pt-7 pb-5">
        <Link href="/" className="block group" aria-label="Home">
          <p className="text-[17px] font-bold tracking-[-0.025em] text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">
            DSA Lab Prep
          </p>
          <p className="text-[12px] text-[#86868b] font-medium mt-0.5">Mid-Term Exam · 2026</p>
        </Link>
      </div>

      <div className="mx-5 h-px bg-[#d2d2d7]/60" />

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 pt-4 pb-3" aria-label="Main navigation">
        <ul className="space-y-[2px] list-none m-0 p-0">
          {navItems.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 px-3 py-[10px] rounded-xl text-[14px] transition-all duration-150",
                    isActive
                      ? "bg-[#f5f5f7] text-[#1d1d1f] font-semibold shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]"
                      : "text-[#424245] hover:bg-[#f5f5f7]/70 hover:text-[#1d1d1f]"
                  )}
                >
                  <div className={cn(
                    "w-[7px] h-[7px] rounded-full flex-shrink-0 transition-all",
                    isActive ? "opacity-100 scale-100" : "opacity-20 scale-75"
                  )} style={{ background: item.color }} />
                  <span className="truncate">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-[#d2d2d7]/40">
        <ExamCountdown />
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}
        className="lg:hidden fixed top-4 left-4 z-[200] w-10 h-10 rounded-xl bg-white/90 backdrop-blur-xl text-[#1d1d1f] flex items-center justify-center shadow-md border border-[#d2d2d7]/30">
        {open ? <X size={16} /> : <Menu size={16} />}
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 w-[280px] h-screen bg-white border-r border-[#d2d2d7]/40 z-50 flex-col" aria-label="Navigation">
        <Nav />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/15 backdrop-blur-sm z-[150] lg:hidden" aria-hidden="true" />
            <motion.aside initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="fixed left-0 top-0 w-[280px] h-screen bg-white border-r border-[#d2d2d7]/40 z-[160] flex flex-col lg:hidden shadow-2xl" aria-label="Mobile navigation">
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
    <div className="flex items-center gap-2.5" aria-live="polite">
      <div className="w-[6px] h-[6px] rounded-full bg-[#ff3b30] animate-pulse" />
      <p className="text-[12px] text-[#86868b] font-medium">{time}</p>
    </div>
  );
}
