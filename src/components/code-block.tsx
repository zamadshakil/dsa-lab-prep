"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  tabs?: { label: string; code: string }[];
  code?: string;
  title?: string;
  accentColor?: string;
}

export function CodeBlock({ tabs, code, title }: CodeBlockProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const currentCode = tabs ? tabs[activeTab]?.code : code;

  const handleCopy = async () => {
    if (!currentCode) return;
    try { await navigator.clipboard.writeText(currentCode); }
    catch { const t = document.createElement("textarea"); t.value = currentCode; t.style.cssText = "position:fixed;opacity:0"; document.body.appendChild(t); t.select(); document.execCommand("copy"); document.body.removeChild(t); }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden bg-[#0a0a0a] border border-slate-800/60 shadow-xl group" role="region" aria-label={title ? `Code: ${title}` : "Code block"}>
      {/* Header / macOS style window controls */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0f0f11] border-b border-slate-800/80">
        <div className="flex items-center gap-2 min-w-0 flex-1 mr-4">
          {/* Traffic lights */}
          <div className="flex gap-1.5 mr-2 flex-shrink-0">
            <div className="w-[11px] h-[11px] rounded-full bg-[#ff5f56]" />
            <div className="w-[11px] h-[11px] rounded-full bg-[#ffbd2e]" />
            <div className="w-[11px] h-[11px] rounded-full bg-[#27c93f]" />
          </div>
          
          {/* Tabs or Title */}
          {tabs && tabs.length > 1 ? (
            <div className="flex items-center gap-1.5 overflow-x-auto code-scrollbar flex-1 min-w-0 pb-1.5 pt-0.5" role="tablist">
              {tabs.map((tab, i) => (
                <button key={i} role="tab" aria-selected={i === activeTab} onClick={() => setActiveTab(i)}
                  className={cn(
                    "px-2.5 py-1 text-[12px] font-mono rounded-md transition-colors whitespace-nowrap flex-shrink-0",
                    i === activeTab ? "text-slate-200 bg-slate-800/60" : "text-slate-500 hover:text-slate-300"
                  )}>
                  {tab.label}
                </button>
              ))}
            </div>
          ) : title ? (
            <span className="text-[12px] font-mono text-slate-400 truncate w-full">{title.toLowerCase().replace(/\s+/g, '-')}</span>
          ) : null}
        </div>

        {/* Copy Button */}
        <button onClick={handleCopy} aria-label={copied ? "Copied" : "Copy code"}
          className={cn(
            "p-1.5 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100",
            copied && "text-green-400 opacity-100 hover:text-green-400 hover:bg-green-400/10"
          )}>
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>

      <div className="relative">
        {tabs ? tabs.map((tab, i) => (
          <div key={i} hidden={i !== activeTab} className="overflow-x-auto code-scrollbar p-5">
            <pre className="font-[family-name:var(--font-jetbrains)] text-[13px] leading-[1.7] text-[#e5e5e5] whitespace-pre selection:bg-blue-500/30">{tab.code}</pre>
          </div>
        )) : (
          <div className="overflow-x-auto code-scrollbar p-5">
            <pre className="font-[family-name:var(--font-jetbrains)] text-[13px] leading-[1.7] text-[#e5e5e5] whitespace-pre selection:bg-blue-500/30">{currentCode}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
