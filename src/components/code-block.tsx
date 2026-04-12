"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTelemetry } from "@/components/telemetry";

interface CodeBlockProps {
  tabs?: { label: string; code: string }[];
  code?: string;
  title?: string;
  accentColor?: string;
}

export function CodeBlock({ tabs, code, title }: CodeBlockProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const { trackEvent } = useTelemetry();
  const currentCode = tabs ? tabs[activeTab]?.code : code;

  const handleCopy = async () => {
    if (!currentCode) return;
    try { await navigator.clipboard.writeText(currentCode); }
    catch { const t = document.createElement("textarea"); t.value = currentCode; t.style.cssText = "position:fixed;opacity:0"; document.body.appendChild(t); t.select(); document.execCommand("copy"); document.body.removeChild(t); }
    setCopied(true);
    
    // Telemetry
    trackEvent("copy_code", { 
      title: title || "anonymous snippet",
      language: tabs ? "tabs" : "single",
      tab_label: tabs ? tabs[activeTab].label : "n/a",
      code_length: currentCode.length 
    });

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
            <div className="relative inline-flex items-center min-w-0 mr-2">
              <select 
                value={activeTab}
                onChange={(e) => setActiveTab(Number(e.target.value))}
                className="appearance-none bg-slate-800/60 hover:bg-slate-700/60 transition-colors border border-slate-700/50 text-slate-200 text-[12px] mb-0.5 font-mono rounded-md py-[5px] pl-2.5 pr-7 focus:outline-none focus:ring-1 focus:ring-blue-500/50 truncate max-w-[180px] sm:max-w-xs cursor-pointer"
                aria-label="Select code example"
              >
                {tabs.map((tab, i) => (
                  <option key={i} value={i} className="bg-[#0f0f11] text-slate-200">{tab.label}</option>
                ))}
              </select>
              <div className="absolute right-2 pointer-events-none text-slate-400 flex items-center h-full pb-0.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
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
