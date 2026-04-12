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
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const navItems = [
    { href: "/", label: "Dashboard", icon: "🏠", color: "#667eea" },
    ...topics.map((t) => ({
      href: `/${t.slug}`,
      label: t.shortTitle,
      icon: t.icon,
      color: t.color,
    })),
    { href: "/quick-reference", label: "Quick Reference", icon: "⚡", color: "#00cec9" },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-5 pb-4 border-b border-white/[0.08]">
        <Link
          href="/"
          className="flex items-center gap-3 group"
          aria-label="DSA Lab Prep - Go to Dashboard"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-lg shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/30 transition-shadow">
            🧠
          </div>
          <div>
            <h1 className="text-[15px] font-semibold tracking-[-0.02em] text-white/90">
              DSA Lab Prep
            </h1>
            <p className="text-[10px] uppercase tracking-[0.1em] text-white/30 font-medium mt-0.5">
              Mid-Term Exam
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Main navigation">
        <p className="text-[10px] uppercase tracking-[0.14em] text-white/25 font-semibold px-3 mb-2">
          Topics
        </p>
        <ul className="space-y-0.5 list-none">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all duration-200 relative",
                    isActive
                      ? "text-white/95 bg-white/[0.07]"
                      : "text-white/45 hover:text-white/75 hover:bg-white/[0.04]"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
                      style={{ background: item.color }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="text-base" role="img" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className="tracking-[-0.01em]">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/[0.08] text-center">
        <ExamCountdown />
        <p className="text-[11px] text-white/25 mt-1.5 font-medium">
          Good Luck! 💪
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={mobileOpen}
        className="lg:hidden fixed top-4 left-4 z-[200] w-11 h-11 rounded-xl border border-white/10 bg-[#0c0c1e]/95 backdrop-blur-xl text-white flex items-center justify-center shadow-lg"
      >
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex fixed left-0 top-0 w-[260px] h-screen bg-[#080818]/95 backdrop-blur-2xl border-r border-white/[0.08] z-50 flex-col"
        aria-label="Sidebar navigation"
      >
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 z-[150] lg:hidden"
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 w-[260px] h-screen bg-[#080818]/98 backdrop-blur-2xl border-r border-white/[0.08] z-[160] flex flex-col lg:hidden"
              aria-label="Mobile navigation"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function ExamCountdown() {
  const [timeStr, setTimeStr] = useState("⏰ Calculating...");

  useEffect(() => {
    const update = () => {
      const exam = new Date("2026-04-13T09:00:00+05:00");
      const now = new Date();
      const diff = exam.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeStr("🔥 Exam Day! Good Luck!");
        return;
      }

      const hrs = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeStr(`⏰ ${hrs}h ${mins}m until exam`);
    };

    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <p className="text-[12px] font-semibold text-red-400/90" aria-live="polite">
      {timeStr}
    </p>
  );
}
