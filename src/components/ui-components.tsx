"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ===== FADE IN =====
export function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ===== STAGGER =====
export function StaggerContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden" animate="visible"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ===== SECTION HEADER =====
export function SectionHeader({
  icon,
  title,
  tag,
  color,
  colorDim,
}: {
  icon: string;
  title: string;
  tag: string;
  color: string;
  colorDim: string;
}) {
  return (
    <FadeIn>
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[13px] font-medium text-[#86868b] uppercase tracking-[0.05em]">{tag}</span>
        </div>
        <h1 className="text-[32px] sm:text-[40px] font-bold tracking-[-0.04em] leading-[1.1] text-[#f5f5f7]">
          {title}
        </h1>
        <div className="mt-4 h-px bg-gradient-to-r from-[#2d2d2f] to-transparent" />
      </div>
    </FadeIn>
  );
}

// ===== CARD =====
export function Card({
  children,
  className,
  glow,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[#2d2d2f] bg-[#111113] p-6 transition-colors duration-200 hover:border-[#3d3d3f]",
        className
      )}
    >
      {children}
    </div>
  );
}

// ===== INFO CARD =====
export function InfoCard({
  title,
  children,
  icon = "💡",
}: {
  title: string;
  children: React.ReactNode;
  icon?: string;
}) {
  return (
    <Card className="bg-[#0a84ff]/[0.04] border-[#0a84ff]/[0.15]">
      <div className="flex items-center gap-2 mb-3">
        <span role="img" aria-hidden="true">{icon}</span>
        <p className="text-[13px] font-semibold text-[#0a84ff] uppercase tracking-[0.03em]">{title}</p>
      </div>
      <div className="text-[14px] text-[#86868b] leading-[1.7] [&_strong]:text-[#f5f5f7] [&_code]:font-[family-name:var(--font-jetbrains)] [&_code]:text-[12px] [&_code]:bg-[#1d1d1f] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:text-[#bf5af2] [&_p]:mb-1">
        {children}
      </div>
    </Card>
  );
}

// ===== KEY POINT =====
export function KeyPoint({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-4 rounded-xl bg-[#111113] border border-[#2d2d2f] hover:border-[#3d3d3f] transition-colors duration-200">
      <span className="text-lg flex-shrink-0 mt-0.5" role="img" aria-hidden="true">{icon}</span>
      <div className="text-[14px] text-[#a1a1a6] leading-[1.65] [&_strong]:text-[#f5f5f7] [&_strong]:font-semibold [&_code]:font-[family-name:var(--font-jetbrains)] [&_code]:text-[12px] [&_code]:bg-[#1d1d1f] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:text-[#64d2ff]">
        {children}
      </div>
    </div>
  );
}

// ===== COMPARISON TABLE =====
interface CompRow { aspect: string; col1: string; col2: string; }

export function ComparisonTable({
  title, color, headers, rows,
}: {
  title: string; color: string; headers: [string, string, string]; rows: CompRow[];
}) {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="px-6 py-4 border-b border-[#2d2d2f] flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
        <p className="text-[14px] font-semibold text-[#f5f5f7]">{title}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full" role="table" aria-label={title}>
          <thead>
            <tr className="border-b border-[#2d2d2f]">
              {headers.map((h, i) => (
                <th key={i} scope="col" className="px-6 py-3 text-left text-[11px] font-semibold text-[#86868b] uppercase tracking-[0.06em]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-[#1d1d1f] last:border-b-0 hover:bg-[#1d1d1f]/40 transition-colors">
                <td className="px-6 py-3.5 text-[13px] font-medium text-[#f5f5f7]">{row.aspect}</td>
                <td className="px-6 py-3.5 text-[13px] font-[family-name:var(--font-jetbrains)] text-[#86868b]">{row.col1}</td>
                <td className="px-6 py-3.5 text-[13px] font-[family-name:var(--font-jetbrains)] text-[#64d2ff] font-medium">{row.col2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

// ===== NODE VISUALIZATION =====
export function NodeChain({
  nodes, color, isCircular = false, headLabel = "head",
}: {
  nodes: (number | string)[]; color: string; isCircular?: boolean; headLabel?: string;
}) {
  return (
    <Card className="flex flex-col items-center py-10 overflow-x-auto" aria-label={isCircular ? "Circular Linked List diagram" : "Singly Linked List diagram"}>
      <p className="text-[11px] uppercase tracking-[0.1em] text-[#86868b] font-medium mb-6">
        {isCircular ? "Circular Linked List" : "Singly Linked List"}
      </p>
      <div className="flex items-center gap-0 px-4">
        {nodes.map((val, i) => (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center">
              {i === 0 && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md mb-2"
                  style={{ background: `${color}18`, color }}>{headLabel}</span>
              )}
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 400, damping: 20 }}
                className="w-14 h-12 rounded-xl border flex items-center justify-center font-semibold text-[14px]"
                style={{ borderColor: `${color}40`, color, background: `${color}08` }}
              >
                {val}
              </motion.div>
              {isCircular && i === nodes.length - 1 && (
                <span className="text-[10px] mt-2 font-semibold text-[#ff453a]">↻ head</span>
              )}
            </div>
            {i < nodes.length - 1 && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.08 + 0.04 }}
                className="text-[#3d3d3f] px-2 text-sm font-mono">→</motion.span>
            )}
          </div>
        ))}
        {!isCircular && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: nodes.length * 0.08 }}
            className="flex items-center">
            <span className="text-[#3d3d3f] px-2 text-sm font-mono">→</span>
            <span className="px-3 py-2 border border-dashed border-[#3d3d3f] rounded-lg text-[11px] font-semibold text-[#48484a] tracking-wider">
              NULL
            </span>
          </motion.div>
        )}
      </div>
    </Card>
  );
}

// ===== STACK VISUAL =====
export function StackVisual({ items, label, color = "#ffd60a" }: { items: number[]; label: string; color?: string }) {
  return (
    <div className="flex flex-col items-center">
      <p className="text-[11px] font-medium text-[#86868b] mb-4 uppercase tracking-[0.06em]">{label}</p>
      <div className="flex flex-col items-center gap-[6px]">
        {items.map((val, i) => (
          <motion.div key={i}
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 400 }}
            className="w-24 h-10 rounded-lg border flex items-center justify-center font-semibold text-[14px] relative"
            style={{ borderColor: `${color}40`, color, background: `${color}08` }}
          >
            {val}
            {i === 0 && <span className="absolute -right-14 text-[11px] font-medium text-[#ff453a]">← top</span>}
          </motion.div>
        ))}
        <div className="w-28 h-[2px] rounded-full mt-1 opacity-60" style={{ background: color }} />
      </div>
    </div>
  );
}

// ===== QUEUE VISUAL =====
export function QueueVisual({
  items, label, color = "#bf5af2", highlightLast = false,
}: {
  items: number[]; label: string; color?: string; highlightLast?: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      <p className="text-[11px] font-medium text-[#86868b] mb-4 uppercase tracking-[0.06em]">{label}</p>
      <div className="flex items-end gap-[6px]">
        {items.map((val, i) => {
          const isHighlighted = highlightLast && i === items.length - 1;
          const c = isHighlighted ? "#ff453a" : color;
          return (
            <div key={i} className="flex flex-col items-center">
              {i === 0 && <span className="text-[10px] font-semibold text-[#30d158] mb-2">front↓</span>}
              {i === items.length - 1 && <span className="text-[10px] font-semibold text-[#ff453a] mb-2">rear↓</span>}
              {i !== 0 && i !== items.length - 1 && <span className="mb-2 h-[14px]" />}
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 400 }}
                className="w-14 h-12 rounded-lg border flex items-center justify-center font-semibold text-[14px]"
                style={{ borderColor: `${c}40`, color: c, background: `${c}08` }}
              >
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
  const styles = {
    warning: "bg-[#ffd60a]/[0.08] border-[#ffd60a]/20 text-[#ffd60a]",
    critical: "bg-[#ff453a]/[0.08] border-[#ff453a]/20 text-[#ff453a]",
    success: "bg-[#30d158]/[0.08] border-[#30d158]/20 text-[#30d158]",
  };
  return (
    <div role="alert" className={cn("inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-[13px] font-medium", styles[variant])}>
      {children}
    </div>
  );
}
