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
    { href: "/", label: "Overview", color: "#4263eb" },
    ...topics.map((t) => ({ href: `/${t.slug}`, label: t.title, color: t.color })),
    { href: "/quick-reference", label: "Quick Reference", color: "#0ca678" },
  ];

  const Nav = () => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-6 pt-7 pb-6">
        <Link href="/" className="block" aria-label="Home">
          <p className="text-[18px] font-bold tracking-[-0.03em] text-[#1a1a2e]">DSA Lab Prep</p>
          <p className="text-[12px] text-[#868e96] font-medium mt-0.5">Mid-Term Exam · 2026</p>
        </Link>
      </div>

      <div className="mx-5 h-px bg-[#e9ecef]" />

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 pt-5 pb-3" aria-label="Main navigation">
        <ul className="space-y-[1px] list-none m-0 p-0">
          {navItems.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-[14px] transition-all duration-150",
                    isActive
                      ? "bg-[#f1f3f5] text-[#1a1a2e] font-semibold"
                      : "text-[#495057] hover:bg-[#f8f9fa] hover:text-[#1a1a2e]"
                  )}
                >
                  <div className={cn("w-2 h-2 rounded-full flex-shrink-0 transition-opacity", isActive ? "opacity-100" : "opacity-30")} style={{ background: item.color }} />
                  <span className="truncate">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-[#e9ecef]">
        <ExamCountdown />
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}
        className="lg:hidden fixed top-4 left-4 z-[200] w-10 h-10 rounded-lg bg-white/90 backdrop-blur-xl text-[#1a1a2e] flex items-center justify-center border border-[#e9ecef] shadow-sm">
        {open ? <X size={16} /> : <Menu size={16} />}
      </button>

      {/* Desktop */}
      <aside className="hidden lg:flex fixed left-0 top-0 w-[280px] h-screen bg-white border-r border-[#e9ecef] z-50 flex-col" aria-label="Navigation">
        <Nav />
      </aside>

      {/* Mobile */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[150] lg:hidden" aria-hidden="true" />
            <motion.aside initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="fixed left-0 top-0 w-[280px] h-screen bg-white border-r border-[#e9ecef] z-[160] flex flex-col lg:hidden shadow-2xl" aria-label="Mobile navigation">
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
    <div className="flex items-center gap-2" aria-live="polite">
      <div className="w-1.5 h-1.5 rounded-full bg-[#e03131] animate-pulse" />
      <p className="text-[12px] text-[#868e96] font-medium">{time}</p>
    </div>
  );
}
