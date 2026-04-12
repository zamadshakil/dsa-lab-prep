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
          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white text-[#0071e3] text-[12px] font-semibold rounded-full mb-5 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_0_0_1px_rgba(0,0,0,0.03)]">
          📝 Mid-Term Lab Exam
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-[36px] sm:text-[48px] font-bold tracking-[-0.04em] leading-[1.08] text-[#1d1d1f] mb-4">
          DSA Lab Prep.
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="text-[16px] sm:text-[18px] text-[#424245] leading-[1.6] max-w-lg">
          Every data structure, every algorithm, every code example — using{" "}
          <strong className="text-[#1d1d1f]">class</strong>, not struct. Ready for tomorrow.
        </motion.p>
      </motion.section>

      {/* Topics */}
      <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
        className="grid sm:grid-cols-2 gap-3">
        {topics.map((topic) => (
          <motion.div key={topic.slug} variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } }}>
            <Link href={`/${topic.slug}`}>
              <div className="group p-5 rounded-2xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04),0_0_0_1px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)] transition-all duration-200 cursor-pointer h-full">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-[12px] flex items-center justify-center text-[18px]" style={{ background: `${topic.color}10` }}>
                    {topic.icon}
                  </div>
                  <ArrowRight size={14} className="text-[#d2d2d7] group-hover:text-[#86868b] group-hover:translate-x-0.5 transition-all mt-1.5" />
                </div>
                <h3 className="font-semibold text-[15px] text-[#1d1d1f] tracking-[-0.01em] mb-1">{topic.title}</h3>
                <p className="text-[13px] text-[#86868b] leading-[1.5]">{topic.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Ref */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-3">
        <Link href="/quick-reference">
          <div className="group p-5 rounded-2xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04),0_0_0_1px_rgba(52,199,89,0.1)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08),0_0_0_1px_rgba(52,199,89,0.15)] transition-all duration-200 cursor-pointer flex items-center gap-4">
            <div className="w-10 h-10 rounded-[12px] bg-[#34c759]/8 flex items-center justify-center text-[18px]">⚡</div>
            <div className="flex-1">
              <h3 className="font-semibold text-[15px] text-[#1d1d1f] tracking-[-0.01em]">Quick Reference</h3>
              <p className="text-[13px] text-[#86868b]">All formulas, patterns, and differences in one place</p>
            </div>
            <ArrowRight size={14} className="text-[#d2d2d7] group-hover:text-[#34c759] group-hover:translate-x-0.5 transition-all" />
          </div>
        </Link>
      </motion.div>

      {/* Reminder */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8">
        <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-white shadow-[inset_0_0_0_1px_rgba(255,59,48,0.12)]">
          <div className="w-[6px] h-[6px] rounded-full bg-[#ff3b30]" />
          <p className="text-[13px] text-[#ff3b30] font-medium">
            Remember: <code className="bg-[#f5f5f7] px-1.5 py-0.5 rounded-md font-[family-name:var(--font-jetbrains)] text-[12px]">class</code> not <code className="bg-[#f5f5f7] px-1.5 py-0.5 rounded-md font-[family-name:var(--font-jetbrains)] text-[12px]">struct</code>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
