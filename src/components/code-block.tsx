"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  tabs?: { label: string; code: string }[];
  code?: string;
  title?: string;
  accentColor?: string;
}

export function CodeBlock({ tabs, code, title, accentColor = "#667eea" }: CodeBlockProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const currentCode = tabs ? tabs[activeTab]?.code : code;

  const handleCopy = async () => {
    if (!currentCode) return;
    await navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-white/[0.07] overflow-hidden bg-[#0a0a1a]">
      {/* Tab bar */}
      {tabs && tabs.length > 1 && (
        <div className="flex gap-1 px-2 pt-2 bg-[#08081a] border-b border-white/[0.05] overflow-x-auto code-scrollbar">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={cn(
                "px-4 py-2 text-[12px] font-semibold rounded-t-lg transition-all duration-200 whitespace-nowrap relative",
                i === activeTab
                  ? "text-white bg-[#0a0a1a]"
                  : "text-white/30 hover:text-white/50"
              )}
            >
              {tab.label}
              {i === activeTab && (
                <motion.div
                  layoutId={`codeTab-${title || "block"}`}
                  className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full"
                  style={{ background: accentColor }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Title bar (if no tabs) */}
      {!tabs && title && (
        <div className="px-5 py-3 bg-[#08081a] border-b border-white/[0.05] text-[12px] font-semibold text-white/40 uppercase tracking-wider">
          {title}
        </div>
      )}

      {/* Code */}
      <div className="relative">
        <button
          onClick={handleCopy}
          className={cn(
            "absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-200 border",
            copied
              ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
              : "text-white/30 border-white/[0.07] bg-white/[0.04] hover:text-white/60 hover:bg-white/[0.08]"
          )}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copied!" : "Copy"}
        </button>

        <div className="overflow-x-auto code-scrollbar p-5">
          <pre
            ref={preRef}
            className="font-mono text-[13px] leading-[1.75] text-[#c9d1d9] whitespace-pre"
          >
            {currentCode}
          </pre>
        </div>
      </div>
    </div>
  );
}
