"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { topics } from "@/data/code-examples";
import { ArrowUpRight } from "lucide-react";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="pt-4 sm:pt-10 pb-10 sm:pb-14">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-[#edf2ff] text-[#4263eb] text-[12px] font-semibold rounded-full mb-5">
          📝 Mid-Term Lab Exam
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-[36px] sm:text-[48px] font-bold tracking-[-0.04em] leading-[1.1] text-[#1a1a2e] mb-4">
          DSA Lab Prep
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="text-[16px] sm:text-[18px] text-[#495057] leading-[1.6] max-w-lg">
          Every data structure, every algorithm, every code example — using{" "}
          <strong className="text-[#1a1a2e]">class</strong>, not struct. Ready for tomorrow.
        </motion.p>
      </motion.section>

      {/* Topics */}
      <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
        className="grid sm:grid-cols-2 gap-3">
        {topics.map((topic) => (
          <motion.div key={topic.slug} variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } }}>
            <Link href={`/${topic.slug}`}>
              <div className="group p-5 rounded-xl border border-[#e9ecef] bg-white hover:border-[#dee2e6] hover:shadow-sm transition-all duration-200 cursor-pointer h-full">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[18px]" style={{ background: `${topic.color}12` }}>
                    {topic.icon}
                  </div>
                  <ArrowUpRight size={14} className="text-[#ced4da] group-hover:text-[#868e96] transition-colors mt-1" />
                </div>
                <h3 className="font-semibold text-[15px] text-[#1a1a2e] tracking-[-0.01em] mb-1">{topic.title}</h3>
                <p className="text-[13px] text-[#868e96] leading-[1.5]">{topic.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Ref */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-3">
        <Link href="/quick-reference">
          <div className="group p-5 rounded-xl border border-[#d3f9d8] bg-[#ebfbee] hover:border-[#b2f2bb] transition-all duration-200 cursor-pointer flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#b2f2bb]/40 flex items-center justify-center text-[18px]">⚡</div>
            <div className="flex-1">
              <h3 className="font-semibold text-[15px] text-[#1a1a2e] tracking-[-0.01em]">Quick Reference</h3>
              <p className="text-[13px] text-[#495057]">All formulas, patterns, differences in one place</p>
            </div>
            <ArrowUpRight size={14} className="text-[#b2f2bb] group-hover:text-[#2b8a3e] transition-colors" />
          </div>
        </Link>
      </motion.div>

      {/* Reminder */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#fff5f5] border border-[#ffc9c9]">
          <div className="w-2 h-2 rounded-full bg-[#e03131]" />
          <p className="text-[13px] text-[#e03131] font-medium">
            Remember: <code className="bg-white px-1.5 py-0.5 rounded-md font-[family-name:var(--font-jetbrains)] text-[12px] border border-[#ffc9c9]">class</code> not <code className="bg-white px-1.5 py-0.5 rounded-md font-[family-name:var(--font-jetbrains)] text-[12px] border border-[#ffc9c9]">struct</code>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
