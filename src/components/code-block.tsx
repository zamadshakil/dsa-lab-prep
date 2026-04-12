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

export function CodeBlock({
  tabs,
  code,
  title,
  accentColor = "#667eea",
}: CodeBlockProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const currentCode = tabs ? tabs[activeTab]?.code : code;

  const handleCopy = async () => {
    if (!currentCode) return;
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = currentCode;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="rounded-2xl border border-white/[0.08] overflow-hidden bg-[#0a0a1a]"
      role="region"
      aria-label={title ? `Code: ${title}` : "Code block"}
    >
      {/* Tab bar */}
      {tabs && tabs.length > 1 && (
        <div
          className="flex gap-1 px-2 pt-2 bg-[#07071a] border-b border-white/[0.06] overflow-x-auto code-scrollbar"
          role="tablist"
          aria-label="Code examples"
        >
          {tabs.map((tab, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeTab}
              aria-controls={`code-panel-${title}-${i}`}
              id={`code-tab-${title}-${i}`}
              onClick={() => setActiveTab(i)}
              className={cn(
                "px-4 py-2.5 text-[12.5px] font-semibold rounded-t-lg transition-all duration-200 whitespace-nowrap relative tracking-[-0.01em]",
                i === activeTab
                  ? "text-white/90 bg-[#0a0a1a]"
                  : "text-white/35 hover:text-white/55"
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
        <div className="px-5 py-3 bg-[#07071a] border-b border-white/[0.06] text-[12px] font-semibold text-white/35 uppercase tracking-[0.08em]">
          {title}
        </div>
      )}

      {/* Code */}
      <div className="relative">
        <button
          onClick={handleCopy}
          aria-label={copied ? "Copied to clipboard" : "Copy code to clipboard"}
          className={cn(
            "absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-200 border",
            copied
              ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
              : "text-white/35 border-white/[0.08] bg-white/[0.04] hover:text-white/60 hover:bg-white/[0.08]"
          )}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copied!" : "Copy"}
        </button>

        {tabs ? (
          tabs.map((tab, i) => (
            <div
              key={i}
              id={`code-panel-${title}-${i}`}
              role="tabpanel"
              aria-labelledby={`code-tab-${title}-${i}`}
              hidden={i !== activeTab}
              className="overflow-x-auto code-scrollbar p-5"
            >
              <pre className="font-[family-name:var(--font-jetbrains)] text-[13px] leading-[1.8] text-[#d4d4e8] whitespace-pre selection:bg-indigo-500/30">
                {tab.code}
              </pre>
            </div>
          ))
        ) : (
          <div className="overflow-x-auto code-scrollbar p-5">
            <pre className="font-[family-name:var(--font-jetbrains)] text-[13px] leading-[1.8] text-[#d4d4e8] whitespace-pre selection:bg-indigo-500/30">
              {currentCode}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
