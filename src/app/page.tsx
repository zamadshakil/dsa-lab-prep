"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { topics } from "@/data/code-examples";
import { ChevronRight } from "lucide-react";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="pt-8 sm:pt-16 pb-12 sm:pb-16"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[13px] font-medium text-[#86868b] uppercase tracking-[0.05em] mb-4"
        >
          Mid-Term Lab Exam
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-[40px] sm:text-[56px] font-bold tracking-[-0.04em] leading-[1.05] text-[#f5f5f7] mb-5"
        >
          DSA Lab Prep.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[17px] sm:text-[19px] text-[#86868b] leading-[1.5] max-w-lg tracking-[-0.01em]"
        >
          Every data structure. Every algorithm. Every code example — using{" "}
          <span className="text-[#f5f5f7] font-medium">class</span>, not struct.
          <br />
          Ready for tomorrow.
        </motion.p>
      </motion.section>

      {/* Topic Grid */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
        className="space-y-3"
      >
        {topics.map((topic) => (
          <motion.div
            key={topic.slug}
            variants={{
              hidden: { opacity: 0, y: 8 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
            }}
          >
            <Link href={`/${topic.slug}`}>
              <div className="group flex items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl bg-[#111113] border border-[#2d2d2f] hover:border-[#3d3d3f] hover:bg-[#161618] transition-all duration-200 cursor-pointer">
                <div
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-[14px] flex items-center justify-center text-[20px] flex-shrink-0"
                  style={{ background: `${topic.color}12`, color: topic.color }}
                >
                  {topic.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-0.5">
                    <h3 className="font-semibold text-[15px] text-[#f5f5f7] tracking-[-0.01em]">
                      {topic.title}
                    </h3>
                    <span
                      className="text-[10px] font-semibold uppercase tracking-[0.04em] px-2 py-0.5 rounded-md hidden sm:inline-block"
                      style={{ background: `${topic.color}15`, color: topic.color }}
                    >
                      {topic.tag}
                    </span>
                  </div>
                  <p className="text-[13px] text-[#6e6e73] truncate">{topic.description}</p>
                </div>
                <ChevronRight
                  size={16}
                  className="text-[#3d3d3f] group-hover:text-[#6e6e73] group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0"
                />
              </div>
            </Link>
          </motion.div>
        ))}

        {/* Quick Reference */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 8 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
          }}
        >
          <Link href="/quick-reference">
            <div className="group flex items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl bg-[#111113] border border-[#2d2d2f] hover:border-[#30d158]/30 transition-all duration-200 cursor-pointer">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-[14px] bg-[#30d158]/10 flex items-center justify-center text-[20px] flex-shrink-0">
                ⚡
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[15px] text-[#f5f5f7] tracking-[-0.01em] mb-0.5">
                  Quick Reference
                </h3>
                <p className="text-[13px] text-[#6e6e73]">
                  All formulas, patterns, and key differences in one place
                </p>
              </div>
              <ChevronRight
                size={16}
                className="text-[#3d3d3f] group-hover:text-[#6e6e73] group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0"
              />
            </div>
          </Link>
        </motion.div>
      </motion.div>

      {/* Reminder */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-10"
      >
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#ff453a]/[0.06] border border-[#ff453a]/[0.12]">
          <div className="w-2 h-2 rounded-full bg-[#ff453a]" />
          <p className="text-[13px] text-[#ff453a] font-medium">
            Remember: Use <code className="bg-[#1d1d1f] px-1.5 py-0.5 rounded-md font-[family-name:var(--font-jetbrains)] text-[12px]">class</code> NOT <code className="bg-[#1d1d1f] px-1.5 py-0.5 rounded-md font-[family-name:var(--font-jetbrains)] text-[12px]">struct</code>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
