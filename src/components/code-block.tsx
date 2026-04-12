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

export function CodeBlock({ tabs, code, title, accentColor = "#2563eb" }: CodeBlockProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const currentCode = tabs ? tabs[activeTab]?.code : code;

  const handleCopy = async () => {
    if (!currentCode) return;
    try { await navigator.clipboard.writeText(currentCode); }
    catch { const t=document.createElement("textarea"); t.value=currentCode; t.style.cssText="position:fixed;opacity:0"; document.body.appendChild(t); t.select(); document.execCommand("copy"); document.body.removeChild(t); }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-[20px] overflow-hidden bg-[#1d1d1f] shadow-[0_2px_12px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.08)]" role="region" aria-label={title ? `Code: ${title}` : "Code block"}>
      {/* Tabs */}
      {tabs && tabs.length > 1 && (
        <div className="flex items-center gap-0 px-2 pt-2 bg-[#161618] border-b border-[#2c2c2e] overflow-x-auto code-scrollbar" role="tablist" aria-label="Code examples">
          {tabs.map((tab, i) => (
            <button key={i} role="tab" aria-selected={i === activeTab} onClick={() => setActiveTab(i)}
              className={cn(
                "px-3.5 py-2 text-[13px] font-medium rounded-lg transition-all duration-150 whitespace-nowrap mx-0.5",
                i === activeTab ? "text-[#f5f5f7] bg-[#2c2c2e]" : "text-[#6e6e73] hover:text-[#aeaeb2]"
              )}>
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {!tabs && title && (
        <div className="px-5 py-3 bg-[#161618] border-b border-[#2c2c2e]">
          <span className="text-[12px] font-medium text-[#6e6e73] uppercase tracking-[0.05em]">{title}</span>
        </div>
      )}

      <div className="relative">
        <button onClick={handleCopy} aria-label={copied ? "Copied" : "Copy code"}
          className={cn(
            "absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-150",
            copied ? "text-[#34c759] bg-[#34c759]/10" : "text-[#6e6e73] bg-[#2c2c2e] hover:text-[#aeaeb2]"
          )}>
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? "Copied" : "Copy"}
        </button>

        {tabs ? tabs.map((tab, i) => (
          <div key={i} hidden={i !== activeTab} className="overflow-x-auto code-scrollbar p-5 pt-6">
            <pre className="font-[family-name:var(--font-jetbrains)] text-[13px] leading-[1.85] text-[#e5e5ea] whitespace-pre selection:bg-[#2563eb]/30">{tab.code}</pre>
          </div>
        )) : (
          <div className="overflow-x-auto code-scrollbar p-5 pt-6">
            <pre className="font-[family-name:var(--font-jetbrains)] text-[13px] leading-[1.85] text-[#e5e5ea] whitespace-pre selection:bg-[#2563eb]/30">{currentCode}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
