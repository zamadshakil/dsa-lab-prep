"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { topics } from "@/data/code-examples";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { setMobileOpen(false); }, [pathname]);
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileOpen(false); };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  const navItems = [
    { href: "/", label: "Overview", icon: "🏠", color: "#86868b" },
    ...topics.map((t) => ({ href: `/${t.slug}`, label: t.title, icon: t.icon, color: t.color })),
    { href: "/quick-reference", label: "Quick Reference", icon: "⚡", color: "#30d158" },
  ];

  const NavContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-5 pt-6 pb-5">
        <Link href="/" className="flex items-center gap-3" aria-label="DSA Lab Prep Home">
          <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-[#5e5ce6] to-[#bf5af2] flex items-center justify-center text-[15px] shadow-lg shadow-purple-500/15">
            🧠
          </div>
          <div>
            <p className="text-[15px] font-semibold tracking-[-0.02em] text-[#f5f5f7]">
              DSA Lab Prep
            </p>
            <p className="text-[11px] text-[#86868b] font-normal">
              Mid-Term Exam 2026
            </p>
          </div>
        </Link>
      </div>

      {/* Divider */}
      <div className="mx-4 h-px bg-[#2d2d2f]" />

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 pt-4 pb-2" aria-label="Main navigation">
        <ul className="space-y-[2px] list-none m-0 p-0">
          {navItems.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 px-3 py-[9px] rounded-[10px] text-[14px] transition-all duration-150 relative group",
                    isActive
                      ? "bg-[#1d1d1f] text-[#f5f5f7] font-medium"
                      : "text-[#86868b] hover:text-[#f5f5f7] hover:bg-[#1d1d1f]/50"
                  )}
                >
                  <span className="text-[15px] w-5 text-center" role="img" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className="flex-1 truncate">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute right-3 w-[5px] h-[5px] rounded-full"
                      style={{ background: item.color }}
                      transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-[#2d2d2f]">
        <ExamCountdown />
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileOpen}
        className="lg:hidden fixed top-4 left-4 z-[200] w-10 h-10 rounded-[10px] bg-[#1d1d1f]/90 backdrop-blur-xl text-[#f5f5f7] flex items-center justify-center border border-[#2d2d2f]"
      >
        {mobileOpen ? <X size={16} /> : <Menu size={16} />}
      </button>

      {/* Desktop */}
      <aside className="hidden lg:flex fixed left-0 top-0 w-[272px] h-screen bg-black/80 backdrop-blur-2xl border-r border-[#2d2d2f] z-50 flex-col" aria-label="Navigation">
        <NavContent />
      </aside>

      {/* Mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[150] lg:hidden" aria-hidden="true"
            />
            <motion.aside
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="fixed left-0 top-0 w-[272px] h-screen bg-[#0a0a0a]/98 backdrop-blur-2xl border-r border-[#2d2d2f] z-[160] flex flex-col lg:hidden"
              aria-label="Mobile navigation"
            >
              <NavContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function ExamCountdown() {
  const [timeStr, setTimeStr] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () => {
      const exam = new Date("2026-04-13T09:00:00+05:00");
      const now = new Date();
      const diff = exam.getTime() - now.getTime();
      if (diff <= 0) { setTimeStr("Exam day — you got this!"); return; }
      const hrs = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeStr(`${hrs}h ${mins}m until exam`);
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-2" aria-live="polite">
      <div className="w-2 h-2 rounded-full bg-[#ff453a] animate-pulse" />
      <p className="text-[12px] text-[#86868b] font-medium">{timeStr}</p>
    </div>
  );
}
