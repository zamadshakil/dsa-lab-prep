"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { topics } from "@/data/code-examples";
import { ArrowRight, Database, Code2 } from "lucide-react";
import { useState } from "react";

export default function HomePage() {
  const [showDsa, setShowDsa] = useState(false);

  return (
    <div className="min-h-[80vh] flex flex-col justify-center">
      {/* Hero */}
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="pt-4 sm:pt-10 pb-10">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 text-white text-[12px] font-semibold rounded-full mb-5 shadow-sm">
          🔥 Week 5 & 6 Final Phase
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-[36px] sm:text-[48px] font-bold tracking-[-0.04em] leading-[1.08] text-slate-900 mb-4">
          Select Your Battle.
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="text-[16px] sm:text-[18px] text-slate-600 leading-[1.6] max-w-lg mb-8">
          Choose the subject you want to prepare for. Both modules contain 100% accurate, high-yield material.
        </motion.p>
        
        <div className="grid sm:grid-cols-2 gap-5 mb-10 pb-4">
          {/* DSA Card */}
          <motion.button 
            onClick={() => setShowDsa(!showDsa)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`text-left p-6 rounded-[24px] border-2 transition-all duration-300 shadow-md ${showDsa ? 'border-blue-500 bg-blue-50/50' : 'border-slate-100 bg-white hover:border-slate-200'}`}
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-5">
              <Code2 size={28} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Data Structures</h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">Stack, Queue, Circular Queue, and Infix to Postfix implementations using <code>class</code>.</p>
            <div className="flex items-center text-blue-600 font-semibold text-sm gap-2">
              {showDsa ? "Close Topics" : "View Topics"} <ArrowRight size={16} />
            </div>
          </motion.button>

          {/* DB Card */}
          <Link href="/db-prep" className="block">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-6 rounded-[24px] bg-white border-2 border-slate-100 hover:border-slate-200 transition-all duration-300 shadow-md h-full"
            >
              <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-5">
                <Database size={28} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Database Systems</h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">DDL, DML, Relational Algebra, and complex SELECT queries with interactive checkpoints.</p>
              <div className="flex items-center text-purple-600 font-semibold text-sm gap-2 mt-auto">
                Enter Database Module <ArrowRight size={16} />
              </div>
            </motion.div>
          </Link>
        </div>
      </motion.section>

      {/* Topics Bento Grid (Shown if DSA is selected) */}
      <AnimatePresence>
        {showDsa && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="grid sm:grid-cols-2 gap-4 pb-14 border-t border-slate-200 pt-8">
              {topics.map((topic) => (
                <motion.div key={topic.slug} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <Link href={`/${topic.slug}`}>
                    <div className="group p-6 rounded-[20px] bg-white shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:-translate-y-[2px] transition-all duration-300 cursor-pointer h-full border border-transparent hover:border-slate-100 relative overflow-hidden">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-[14px] flex items-center justify-center text-[20px] bg-slate-50 text-blue-600 border border-slate-100">
                          {topic.icon}
                        </div>
                        <ArrowRight size={16} className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all mt-1" />
                      </div>
                      <h3 className="font-semibold text-[16px] text-slate-900 tracking-tight mb-1.5">{topic.title}</h3>
                      <p className="text-[13px] text-slate-500 leading-[1.6]">{topic.description}</p>
                      
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-bl-[100px] -z-10" />
                    </div>
                  </Link>
                </motion.div>
              ))}

              {/* Quick Ref */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="sm:col-span-2 mt-2">
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
