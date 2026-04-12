"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ===== FADE IN =====
export function FadeIn({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: [0.25, 0.1, 0.25, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

// ===== STAGGER =====
export function StaggerContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div initial="hidden" animate="visible"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }} className={className}>
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={{
      hidden: { opacity: 0, y: 8 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } },
    }} className={className}>
      {children}
    </motion.div>
  );
}

// ===== SECTION HEADER =====
export function SectionHeader({ icon, title, tag, color, colorDim }: {
  icon: string; title: string; tag: string; color: string; colorDim: string;
}) {
  return (
    <FadeIn>
      <div className="mb-8">
        <p className="text-[13px] font-semibold uppercase tracking-[0.06em] mb-2" style={{ color }}>{tag}</p>
        <h1 className="text-[28px] sm:text-[36px] font-bold tracking-[-0.035em] leading-[1.15] text-[#1a1a2e]">{title}</h1>
      </div>
    </FadeIn>
  );
}

// ===== CARD =====
export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-xl border border-[#e9ecef] bg-white p-5 sm:p-6", className)}>
      {children}
    </div>
  );
}

// ===== INFO CARD =====
export function InfoCard({ title, children, icon = "💡" }: { title: string; children: React.ReactNode; icon?: string }) {
  return (
    <Card className="bg-[#edf2ff] border-[#dbe4ff]">
      <div className="flex items-center gap-2 mb-2.5">
        <span role="img" aria-hidden="true" className="text-sm">{icon}</span>
        <p className="text-[13px] font-bold text-[#4263eb] uppercase tracking-[0.04em]">{title}</p>
      </div>
      <div className="text-[14px] text-[#495057] leading-[1.7] [&_strong]:text-[#1a1a2e] [&_strong]:font-semibold [&_code]:font-[family-name:var(--font-jetbrains)] [&_code]:text-[12px] [&_code]:bg-[#f1f3f5] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:text-[#7048e8] [&_p]:mb-1">
        {children}
      </div>
    </Card>
  );
}

// ===== KEY POINT =====
export function KeyPoint({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-4 rounded-xl bg-[#f8f9fa] border border-[#e9ecef] hover:border-[#dee2e6] transition-colors">
      <span className="text-base flex-shrink-0 mt-0.5" role="img" aria-hidden="true">{icon}</span>
      <div className="text-[14px] text-[#495057] leading-[1.65] [&_strong]:text-[#1a1a2e] [&_strong]:font-semibold [&_code]:font-[family-name:var(--font-jetbrains)] [&_code]:text-[12px] [&_code]:bg-white [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:text-[#4263eb] [&_code]:border [&_code]:border-[#e9ecef]">
        {children}
      </div>
    </div>
  );
}

// ===== COMPARISON TABLE =====
interface CompRow { aspect: string; col1: string; col2: string }

export function ComparisonTable({ title, color, headers, rows }: {
  title: string; color: string; headers: [string, string, string]; rows: CompRow[];
}) {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="px-5 sm:px-6 py-4 border-b border-[#e9ecef] flex items-center gap-2.5">
        <div className="w-2 h-2 rounded-full" style={{ background: color }} />
        <p className="text-[14px] font-semibold text-[#1a1a2e]">{title}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full" role="table" aria-label={title}>
          <thead>
            <tr className="border-b border-[#e9ecef] bg-[#f8f9fa]">
              {headers.map((h, i) => (
                <th key={i} scope="col" className="px-5 sm:px-6 py-2.5 text-left text-[11px] font-semibold text-[#868e96] uppercase tracking-[0.06em]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-[#f1f3f5] last:border-b-0 hover:bg-[#f8f9fa]/60 transition-colors">
                <td className="px-5 sm:px-6 py-3 text-[13px] font-medium text-[#1a1a2e]">{row.aspect}</td>
                <td className="px-5 sm:px-6 py-3 text-[13px] font-[family-name:var(--font-jetbrains)] text-[#868e96]">{row.col1}</td>
                <td className="px-5 sm:px-6 py-3 text-[13px] font-[family-name:var(--font-jetbrains)] text-[#4263eb] font-medium">{row.col2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

// ===== NODE VISUALIZATION =====
export function NodeChain({ nodes, color, isCircular = false, headLabel = "head" }: {
  nodes: (number | string)[]; color: string; isCircular?: boolean; headLabel?: string;
}) {
  return (
    <Card className="flex flex-col items-center py-8 sm:py-10 overflow-x-auto" aria-label={isCircular ? "Circular Linked List diagram" : "Singly Linked List diagram"}>
      <p className="text-[11px] uppercase tracking-[0.1em] text-[#868e96] font-semibold mb-5">
        {isCircular ? "Circular Linked List" : "Singly Linked List"}
      </p>
      <div className="flex items-center gap-0 px-4">
        {nodes.map((val, i) => (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center">
              {i === 0 && <span className="text-[10px] font-bold px-2 py-0.5 rounded-md mb-2" style={{ background: `${color}18`, color }}>{headLabel}</span>}
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 400, damping: 20 }}
                className="w-14 h-12 rounded-xl border-2 flex items-center justify-center font-semibold text-[14px]"
                style={{ borderColor: color, color, background: `${color}08` }}>
                {val}
              </motion.div>
              {isCircular && i === nodes.length - 1 && <span className="text-[10px] mt-2 font-bold text-[#e03131]">↻ head</span>}
            </div>
            {i < nodes.length - 1 && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.08 + 0.04 }}
                className="text-[#ced4da] px-2 text-sm">→</motion.span>
            )}
          </div>
        ))}
        {!isCircular && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: nodes.length * 0.08 }} className="flex items-center">
            <span className="text-[#ced4da] px-2 text-sm">→</span>
            <span className="px-3 py-2 border-2 border-dashed border-[#dee2e6] rounded-lg text-[11px] font-bold text-[#adb5bd] tracking-wider">NULL</span>
          </motion.div>
        )}
      </div>
    </Card>
  );
}

// ===== STACK VISUAL =====
export function StackVisual({ items, label, color = "#f59f00" }: { items: number[]; label: string; color?: string }) {
  return (
    <div className="flex flex-col items-center">
      <p className="text-[11px] font-semibold text-[#868e96] mb-4 uppercase tracking-[0.06em]">{label}</p>
      <div className="flex flex-col items-center gap-[5px]">
        {items.map((val, i) => (
          <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 400 }}
            className="w-24 h-10 rounded-lg border-2 flex items-center justify-center font-semibold text-[14px] relative"
            style={{ borderColor: color, color, background: `${color}08` }}>
            {val}
            {i === 0 && <span className="absolute -right-14 text-[11px] font-bold text-[#e03131]">← top</span>}
          </motion.div>
        ))}
        <div className="w-28 h-[3px] rounded-full mt-1" style={{ background: color, opacity: 0.5 }} />
      </div>
    </div>
  );
}

// ===== QUEUE VISUAL =====
export function QueueVisual({ items, label, color = "#7048e8", highlightLast = false }: {
  items: number[]; label: string; color?: string; highlightLast?: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      <p className="text-[11px] font-semibold text-[#868e96] mb-4 uppercase tracking-[0.06em]">{label}</p>
      <div className="flex items-end gap-[5px]">
        {items.map((val, i) => {
          const hl = highlightLast && i === items.length - 1;
          const c = hl ? "#e03131" : color;
          return (
            <div key={i} className="flex flex-col items-center">
              {i === 0 && <span className="text-[10px] font-bold text-[#0ca678] mb-2">front↓</span>}
              {i === items.length - 1 && <span className="text-[10px] font-bold text-[#e03131] mb-2">rear↓</span>}
              {i !== 0 && i !== items.length - 1 && <span className="mb-2 h-[14px]" />}
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 400 }}
                className="w-14 h-12 rounded-lg border-2 flex items-center justify-center font-semibold text-[14px]"
                style={{ borderColor: c, color: c, background: `${c}08` }}>
                {val}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ===== BADGE =====
export function Badge({ children, variant = "warning" }: { children: React.ReactNode; variant?: "warning" | "critical" | "success" }) {
  const s = {
    warning: "bg-[#fff9db] border-[#ffe066] text-[#e67700]",
    critical: "bg-[#fff5f5] border-[#ffc9c9] text-[#e03131]",
    success: "bg-[#ebfbee] border-[#b2f2bb] text-[#2b8a3e]",
  };
  return <div role="alert" className={cn("inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-[13px] font-semibold", s[variant])}>{children}</div>;
}
