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
        <p className="text-[12px] font-semibold uppercase tracking-[0.08em] mb-2.5 text-slate-500">{tag}</p>
        <h1 className="text-[28px] sm:text-[36px] font-bold tracking-[-0.035em] leading-[1.12] text-slate-900">{title}</h1>
      </div>
    </FadeIn>
  );
}

// ===== CARD =====
export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn(
      "rounded-2xl bg-white p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300",
      className
    )}>
      {children}
    </div>
  );
}

// ===== INFO CARD =====
export function InfoCard({ title, children, icon = "💡" }: { title: string; children: React.ReactNode; icon?: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5 sm:p-6 border border-slate-200">
      <div className="flex items-center gap-2 mb-2.5">
        <span role="img" aria-hidden="true" className="text-sm">{icon}</span>
        <p className="text-[13px] font-bold text-blue-600 uppercase tracking-[0.04em]">{title}</p>
      </div>
      <div className="text-[14px] text-slate-600 leading-[1.7] [&_strong]:text-slate-900 [&_strong]:font-semibold [&_code]:font-[family-name:var(--font-jetbrains)] [&_code]:text-[12px] [&_code]:bg-white [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:text-blue-600 [&_code]:shadow-sm [&_p]:mb-1">
        {children}
      </div>
    </div>
  );
}

// ===== KEY POINT =====
export function KeyPoint({ icon, children }: { icon: React.ReactNode | string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center -mt-1 shadow-sm border border-blue-100">
        <span className="text-[14px] font-bold fill-current">{icon}</span>
      </div>
      <div className="text-[14px] leading-[1.6] text-slate-700 font-medium [&_strong]:text-slate-900 [&_strong]:font-semibold [&_code]:font-[family-name:var(--font-jetbrains)] [&_code]:text-[12px] [&_code]:bg-slate-50 [&_code]:border [&_code]:border-slate-200 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:text-blue-600">
        {children}
      </div>
    </div>
  );
}

// ===== COMPARISON TABLE =====
interface CompRow { aspect: string; col1: string; col2: string }

export function ComparisonTable({ title, color, headers, rows }: {
  title: string; color?: string; headers: [string, string, string]; rows: CompRow[];
}) {
  return (
    <div className="rounded-2xl bg-white overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex items-center gap-2.5">
        <div className="w-[8px] h-[8px] rounded-full bg-blue-500" />
        <p className="text-[14px] font-semibold text-slate-900">{title}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left" role="table" aria-label={title}>
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              {headers.map((h, i) => (
                <th key={i} scope="col" className="px-5 sm:px-6 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-[0.06em]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-slate-50 last:border-b-0 hover:bg-slate-50 transition-colors">
                <td className="px-5 sm:px-6 py-3.5 text-[13px] font-medium text-slate-900">{row.aspect}</td>
                <td className="px-5 sm:px-6 py-3.5 text-[13px] font-[family-name:var(--font-jetbrains)] text-slate-600">{row.col1}</td>
                <td className="px-5 sm:px-6 py-3.5 text-[13px] font-[family-name:var(--font-jetbrains)] text-blue-600 font-medium">{row.col2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ===== NODE VISUALIZATION =====
export function NodeChain({ nodes, color, isCircular = false, headLabel = "head" }: {
  nodes: (number | string)[]; color: string; isCircular?: boolean; headLabel?: string;
}) {
  return (
    <Card className="flex flex-col py-8 sm:py-10" aria-label={isCircular ? "Circular Linked List diagram" : "Singly Linked List diagram"}>
      <p className="text-[11px] uppercase tracking-[0.1em] text-slate-400 font-semibold mb-5 text-center">
        {isCircular ? "Circular Linked List" : "Singly Linked List"}
      </p>
      <div className="w-full overflow-x-auto code-scrollbar pb-4 hide-scrollbar text-center">
        <div className="inline-flex items-center gap-0 px-4 sm:px-6">
        {nodes.map((val, i) => (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center">
              {i === 0 && <span className="text-[10px] font-bold px-2 py-0.5 rounded-md mb-2 bg-blue-50 text-blue-600">{headLabel}</span>}
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 400, damping: 20 }}
                className="w-14 h-12 rounded-xl border-2 flex items-center justify-center font-semibold text-[14px] border-slate-200 text-slate-700 bg-white shadow-sm">
                {val}
              </motion.div>
              {isCircular && i === nodes.length - 1 && <span className="text-[10px] mt-2 font-bold text-red-500">↻ head</span>}
            </div>
            {i < nodes.length - 1 && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.08 + 0.04 }}
                className="text-slate-300 px-2 text-sm">→</motion.span>
            )}
          </div>
        ))}
        {!isCircular && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: nodes.length * 0.08 }} className="flex items-center">
            <span className="text-slate-300 px-2 text-sm">→</span>
            <span className="px-3 py-2 border-2 border-dashed border-slate-200 rounded-lg text-[11px] font-bold text-slate-400 tracking-wider">NULL</span>
          </motion.div>
        )}
        </div>
      </div>
    </Card>
  );
}

// ===== STACK VISUAL =====
export function StackVisual({ items, label, color = "#ff9500" }: { items: number[]; label: string; color?: string }) {
  // To bottom-align when items are side by side, we can just render the items but pad out the height, or flex-1.
  // The simplest fix to make side-by-side stacks align is ensuring the container flexes from the bottom or we use justify-end inside a fixed-height container.
  return (
    <div className="flex flex-col items-center">
      <p className="text-[11px] font-semibold text-slate-400 mb-4 uppercase tracking-[0.06em]">{label}</p>
      <div className="flex flex-col items-center justify-end h-[160px] gap-[5px]">
        {items.map((val, i) => (
          <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 400 }}
            className="w-24 h-10 rounded-lg border-2 flex items-center justify-center font-semibold text-[14px] relative border-slate-200 text-slate-700 bg-white shadow-sm flex-shrink-0">
            {val}
            {i === 0 && <span className="absolute -right-14 text-[11px] font-bold text-blue-500">← top</span>}
          </motion.div>
        ))}
        <div className="w-28 h-[3px] rounded-full mt-1 bg-slate-300 flex-shrink-0" />
      </div>
    </div>
  );
}

// ===== QUEUE VISUAL =====
export function QueueVisual({ items, label, color = "#5856d6", highlightLast = false }: {
  items: number[]; label: string; color?: string; highlightLast?: boolean;
}) {
  return (
    <div className="flex flex-col w-full">
      <p className="text-[11px] font-semibold text-slate-400 mb-4 uppercase tracking-[0.06em] text-center">{label}</p>
      <div className="w-full overflow-x-auto code-scrollbar pb-4 hide-scrollbar text-center">
        <div className="inline-flex items-end gap-[5px] px-4 sm:px-6">
        {items.map((val, i) => {
          const hl = highlightLast && i === items.length - 1;
          const borderC = hl ? "border-red-400" : "border-slate-200";
          const textC = hl ? "text-red-500" : "text-slate-700";
          return (
            <div key={i} className="flex flex-col items-center">
              {i === 0 && <span className="text-[10px] font-bold text-blue-500 mb-2">front↓</span>}
              {i === items.length - 1 && <span className="text-[10px] font-bold text-slate-400 mb-2">rear↓</span>}
              {i !== 0 && i !== items.length - 1 && <span className="mb-2 h-[14px]" />}
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 400 }}
                className={cn("w-14 h-12 rounded-lg border-2 flex items-center justify-center font-semibold text-[14px] bg-white shadow-sm", borderC, textC)}>
                {val}
              </motion.div>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}

// ===== BADGE =====
export function Badge({ children, variant = "warning" }: { children: React.ReactNode; variant?: "warning" | "critical" | "success" }) {
  const s = {
    warning: "bg-orange-50 border border-orange-200 text-orange-700",
    critical: "bg-red-50 border border-red-200 text-red-600",
    success: "bg-green-50 border border-green-200 text-green-700",
  };
  return <div role="alert" className={cn("inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-medium shadow-sm", s[variant])}>{children}</div>;
}
