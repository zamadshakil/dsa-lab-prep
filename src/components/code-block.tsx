"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  tabs?: { label: string; code: string }[];
  code?: string;
  title?: string;
  accentColor?: string;
}

export function CodeBlock({ tabs, code, title, accentColor = "#0a84ff" }: CodeBlockProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const currentCode = tabs ? tabs[activeTab]?.code : code;

  const handleCopy = async () => {
    if (!currentCode) return;
    try {
      await navigator.clipboard.writeText(currentCode);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = currentCode;
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-[#2d2d2f] overflow-hidden bg-[#0c0c0e]" role="region" aria-label={title ? `Code: ${title}` : "Code block"}>
      {/* Tabs */}
      {tabs && tabs.length > 1 && (
        <div className="flex items-center gap-0 px-1 pt-1 bg-[#0a0a0c] border-b border-[#2d2d2f] overflow-x-auto code-scrollbar" role="tablist" aria-label="Code examples">
          {tabs.map((tab, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeTab}
              aria-controls={`panel-${title}-${i}`}
              id={`tab-${title}-${i}`}
              onClick={() => setActiveTab(i)}
              className={cn(
                "px-4 py-2.5 text-[13px] font-medium rounded-lg transition-all duration-150 whitespace-nowrap relative mx-0.5",
                i === activeTab
                  ? "text-[#f5f5f7] bg-[#1d1d1f]"
                  : "text-[#6e6e73] hover:text-[#a1a1a6]"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Single title */}
      {!tabs && title && (
        <div className="px-5 py-3 bg-[#0a0a0c] border-b border-[#2d2d2f] flex items-center justify-between">
          <span className="text-[12px] font-medium text-[#6e6e73] uppercase tracking-[0.05em]">{title}</span>
        </div>
      )}

      {/* Code content */}
      <div className="relative">
        <button
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy code"}
          className={cn(
            "absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-150",
            copied
              ? "text-[#30d158] bg-[#30d158]/10"
              : "text-[#6e6e73] bg-[#1d1d1f] hover:text-[#a1a1a6] hover:bg-[#2d2d2f]"
          )}
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? "Copied" : "Copy"}
        </button>

        {tabs ? (
          tabs.map((tab, i) => (
            <div key={i} id={`panel-${title}-${i}`} role="tabpanel" aria-labelledby={`tab-${title}-${i}`}
              hidden={i !== activeTab} className="overflow-x-auto code-scrollbar p-5 pt-6">
              <pre className="font-[family-name:var(--font-jetbrains)] text-[13px] leading-[1.85] text-[#e5e5ea] whitespace-pre selection:bg-[#0a84ff]/25">
                {tab.code}
              </pre>
            </div>
          ))
        ) : (
          <div className="overflow-x-auto code-scrollbar p-5 pt-6">
            <pre className="font-[family-name:var(--font-jetbrains)] text-[13px] leading-[1.85] text-[#e5e5ea] whitespace-pre selection:bg-[#0a84ff]/25">
              {currentCode}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
