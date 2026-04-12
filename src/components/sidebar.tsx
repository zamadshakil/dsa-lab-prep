"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { topics } from "@/data/code-examples";
import { cn } from "@/lib/utils";
import { Menu, X, Zap, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navItems = [
    { href: "/", label: "Dashboard", icon: "🏠" },
    ...topics.map((t) => ({ href: `/${t.slug}`, label: t.shortTitle, icon: t.icon, color: t.color })),
    { href: "/quick-reference", label: "Quick Ref", icon: "⚡", color: "#00cec9" },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-5 border-b border-white/[0.07]">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-lg shadow-lg shadow-indigo-500/20">
            🧠
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              DSA Lab Prep
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-white/25 font-semibold">
              Mid-Term Exam
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        <p className="text-[10px] uppercase tracking-[0.12em] text-white/20 font-semibold px-3 mb-2">
          Topics
        </p>
        {navItems.map((item, i) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 relative",
                isActive
                  ? "text-white bg-white/[0.06]"
                  : "text-white/40 hover:text-white/70 hover:bg-white/[0.03]"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
                  style={{ background: (item as { color?: string }).color || "#667eea" }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/[0.07] text-center">
        <ExamCountdown />
        <p className="text-[11px] text-white/20 mt-1">Good Luck! 💪</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-[200] w-11 h-11 rounded-xl border border-white/10 bg-[#0c0c1e]/95 backdrop-blur-xl text-white flex items-center justify-center shadow-lg"
      >
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 w-[260px] h-screen bg-[#0a0a1e]/95 backdrop-blur-2xl border-r border-white/[0.07] z-50 flex-col">
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
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 w-[260px] h-screen bg-[#0a0a1e]/98 backdrop-blur-2xl border-r border-white/[0.07] z-[160] flex flex-col lg:hidden"
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

  return <p className="text-xs font-semibold text-red-400">{timeStr}</p>;
}
