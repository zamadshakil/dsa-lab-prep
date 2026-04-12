"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { topics } from "@/data/code-examples";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-center pt-16 pb-14 relative"
      >
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/[0.04] rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[12px] font-bold text-indigo-400 uppercase tracking-wider mb-5"
        >
          📚 Mid-Term Lab Exam
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-4">
          <span className="bg-gradient-to-b from-white via-white/90 to-white/40 bg-clip-text text-transparent">
            DSA Lab Exam
          </span>
          <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
            Command Center
          </span>
        </h1>

        <p className="text-sm md:text-base text-white/35 max-w-md mx-auto leading-relaxed">
          Every code, every concept, every difference — organized and ready.
          <br />
          All code uses <strong className="text-white/60">class</strong> (no struct).
        </p>
      </motion.section>

      {/* Topic Grid */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
        className="grid gap-4 md:grid-cols-2"
      >
        {topics.map((topic) => (
          <motion.div
            key={topic.slug}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
            }}
          >
            <Link href={`/${topic.slug}`}>
              <div
                className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 hover:bg-white/[0.04] hover:border-white/[0.14] transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Subtle glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${topic.color}08, transparent 70%)`,
                  }}
                />

                <div className="relative flex items-start gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: topic.colorDim, color: topic.color }}
                  >
                    {topic.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-[15px] text-white/90 tracking-tight">
                        {topic.title}
                      </h3>
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                        style={{ background: topic.colorDim, color: topic.color }}
                      >
                        {topic.tag}
                      </span>
                    </div>
                    <p className="text-[13px] text-white/30">{topic.description}</p>
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-white/10 group-hover:text-white/30 group-hover:translate-x-1 transition-all duration-200 mt-1 flex-shrink-0"
                  />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}

        {/* Quick Reference Card */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
          }}
          className="md:col-span-2"
        >
          <Link href="/quick-reference">
            <div className="group relative rounded-2xl border border-white/[0.07] bg-gradient-to-r from-emerald-500/[0.04] to-cyan-500/[0.04] p-6 hover:border-emerald-500/20 transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center text-xl">
                  ⚡
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[15px] text-white/90 tracking-tight">
                    Quick Reference — Cheat Sheet
                  </h3>
                  <p className="text-[13px] text-white/30">
                    All formulas, patterns, and key differences on one page
                  </p>
                </div>
                <ArrowRight
                  size={16}
                  className="text-white/10 group-hover:text-white/30 group-hover:translate-x-1 transition-all duration-200"
                />
              </div>
            </div>
          </Link>
        </motion.div>
      </motion.div>

      {/* Bottom reminder */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-10 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/[0.06] border border-red-500/[0.15] text-red-400 text-[13px] font-semibold">
          ⚠️ Remember: Use <code className="bg-white/10 px-1.5 py-0.5 rounded text-[12px] font-mono mx-1">class</code> NOT <code className="bg-white/10 px-1.5 py-0.5 rounded text-[12px] font-mono mx-1">struct</code> in your exam!
        </div>
      </motion.div>
    </div>
  );
}
