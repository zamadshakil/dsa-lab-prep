"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { topics } from "@/data/code-examples";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="pt-4 sm:pt-10 pb-10 sm:pb-14">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-600 text-[12px] font-semibold rounded-full mb-5 shadow-sm border border-slate-200">
          📝 Quiz 2
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-[36px] sm:text-[48px] font-bold tracking-[-0.04em] leading-[1.08] text-slate-900 mb-4">
          DSA Quiz 2 Prep.
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="text-[16px] sm:text-[18px] text-slate-600 leading-[1.6] max-w-lg">
          Every data structure, every algorithm, every code example — using{" "}
          <strong className="text-slate-900">class</strong>, not struct. Ready for the Quiz.
        </motion.p>
      </motion.section>

      {/* Topics Bento Grid */}
      <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
        className="grid sm:grid-cols-2 gap-4">
        {topics.map((topic) => (
          <motion.div key={topic.slug} variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } }}>
            <Link href={`/${topic.slug}`}>
              <div className="group p-6 rounded-[20px] bg-white shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:-translate-y-[2px] transition-all duration-300 cursor-pointer h-full border border-transparent hover:border-slate-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-[14px] flex items-center justify-center text-[20px] bg-slate-50 text-blue-600 border border-slate-100">
                    {topic.icon}
                  </div>
                  <ArrowRight size={16} className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all mt-1" />
                </div>
                <h3 className="font-semibold text-[16px] text-slate-900 tracking-tight mb-1.5">{topic.title}</h3>
                <p className="text-[13px] text-slate-500 leading-[1.6]">{topic.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Ref */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-4">
        <Link href="/quick-reference">
          <div className="group p-6 rounded-[20px] bg-white shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:-translate-y-[2px] transition-all duration-300 cursor-pointer flex items-center gap-4 border border-transparent hover:border-slate-100">
            <div className="w-12 h-12 rounded-[14px] bg-blue-50 border border-blue-100 flex items-center justify-center text-[20px] text-blue-600">⚡</div>
            <div className="flex-1">
              <h3 className="font-semibold text-[16px] text-slate-900 tracking-tight">Quick Reference</h3>
              <p className="text-[13px] text-slate-500">All formulas, patterns, and differences in one place</p>
            </div>
            <ArrowRight size={16} className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
          </div>
        </Link>
      </motion.div>

      {/* Reminder */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8">
        <div className="flex items-center gap-3 px-5 py-4 rounded-[16px] bg-white shadow-[var(--shadow-sm)] border border-red-100">
          <div className="w-[8px] h-[8px] rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
          <p className="text-[13.5px] text-slate-700 font-medium tracking-tight">
            Remember: <code className="bg-slate-50 px-1.5 py-0.5 rounded-md font-[family-name:var(--font-jetbrains)] text-[12px] border border-slate-200 text-red-600">class</code> not <code className="bg-slate-50 px-1.5 py-0.5 rounded-md font-[family-name:var(--font-jetbrains)] text-[12px] border border-slate-200">struct</code>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
