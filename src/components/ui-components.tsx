"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ===== ANIMATED WRAPPER =====
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ===== STAGGER CONTAINER =====
export function StaggerContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
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
      <div className="flex items-center gap-4 mb-8 pb-5 border-b border-white/[0.08]">
        <div
          className="w-12 h-12 rounded-[14px] flex items-center justify-center text-2xl"
          style={{ background: colorDim, color }}
          role="img"
          aria-hidden="true"
        >
          {icon}
        </div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] text-white/95">{title}</h1>
        <span
          className="ml-auto text-[11px] font-bold uppercase tracking-[0.06em] px-3 py-1 rounded-full hidden sm:inline-block"
          style={{ background: colorDim, color }}
        >
          {tag}
        </span>
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
    <motion.div
      whileHover={{ scale: 1.005 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-sm transition-colors hover:bg-white/[0.04] hover:border-white/[0.14]",
        className
      )}
      style={glow ? { boxShadow: `0 0 60px ${glow}` } : undefined}
    >
      {children}
    </motion.div>
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
    <Card className="bg-indigo-500/[0.04] border-indigo-500/[0.12]">
      <div className="flex items-center gap-2 mb-3 text-[13px] font-bold uppercase tracking-[0.06em] text-indigo-400">
        <span role="img" aria-hidden="true">{icon}</span> {title}
      </div>
      <div className="text-[14px] text-white/60 leading-[1.75]">{children}</div>
    </Card>
  );
}

// ===== KEY POINT =====
export function KeyPoint({
  icon,
  children,
}: {
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3 p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
      <span className="text-xl flex-shrink-0 mt-0.5" role="img" aria-hidden="true">{icon}</span>
      <div className="text-[13.5px] text-white/55 leading-[1.7] [&_strong]:text-white/90 [&_strong]:font-semibold [&_code]:font-[family-name:var(--font-jetbrains)] [&_code]:text-[12px] [&_code]:bg-white/[0.08] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-white/65">
        {children}
      </div>
    </div>
  );
}

// ===== COMPARISON TABLE =====
interface CompRow {
  aspect: string;
  col1: string;
  col2: string;
}

export function ComparisonTable({
  title,
  color,
  headers,
  rows,
}: {
  title: string;
  color: string;
  headers: [string, string, string];
  rows: CompRow[];
}) {
  return (
    <Card className="p-0 overflow-hidden">
      <div
        className="px-6 py-4 text-[14px] font-bold flex items-center gap-2 border-b border-white/[0.08]"
        style={{ color }}
      >
        <span role="img" aria-hidden="true">⚡</span> {title}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full" role="table" aria-label={title}>
          <thead>
            <tr className="bg-white/[0.02]">
              {headers.map((h, i) => (
                <th
                  key={i}
                  scope="col"
                  className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-[0.08em] text-white/35 border-b border-white/[0.06]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-white/[0.05] last:border-b-0 hover:bg-white/[0.03] transition-colors">
                <td className="px-5 py-3.5 text-[13px] font-semibold text-white/80">{row.aspect}</td>
                <td className="px-5 py-3.5 text-[12.5px] text-white/45 font-[family-name:var(--font-jetbrains)]">{row.col1}</td>
                <td className="px-5 py-3.5 text-[12.5px] font-semibold text-white/70 font-[family-name:var(--font-jetbrains)]">{row.col2}</td>
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
  nodes,
  color,
  isCircular = false,
  headLabel = "head",
}: {
  nodes: (number | string)[];
  color: string;
  isCircular?: boolean;
  headLabel?: string;
}) {
  return (
    <Card className="flex flex-col items-center py-8 overflow-x-auto" aria-label={isCircular ? "Circular Linked List diagram" : "Singly Linked List diagram"}>
      <p className="text-[11px] uppercase tracking-[0.14em] text-white/25 font-semibold mb-5">
        {isCircular ? "Circular Linked List Structure" : "Singly Linked List Structure"}
      </p>
      <div className="flex items-center gap-0 px-4">
        {nodes.map((val, i) => (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center">
              {i === 0 && (
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded mb-2"
                  style={{ background: `${color}20`, color }}
                >
                  {headLabel}
                </span>
              )}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
                className="w-14 h-11 rounded-xl border-2 flex items-center justify-center font-bold text-sm"
                style={{ borderColor: color, color, background: `${color}08` }}
              >
                {val}
              </motion.div>
              {isCircular && i === nodes.length - 1 && (
                <span className="text-[10px] mt-1.5 font-bold" style={{ color: "#ff6b6b" }}>
                  ↻ → head
                </span>
              )}
            </div>
            {i < nodes.length - 1 && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 + 0.05 }}
                className="text-white/20 px-1.5 text-lg"
              >
                →
              </motion.span>
            )}
          </div>
        ))}
        {!isCircular && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: nodes.length * 0.1 }}
            className="flex items-center"
          >
            <span className="text-white/20 px-1.5 text-lg">→</span>
            <span className="px-3 py-1.5 border-2 border-dashed border-white/15 rounded-lg text-[11px] font-bold text-white/20 tracking-wider">
              NULL
            </span>
          </motion.div>
        )}
      </div>
    </Card>
  );
}

// ===== STACK VISUALIZATION =====
export function StackVisual({
  items,
  label,
  color = "#feca57",
}: {
  items: number[];
  label: string;
  color?: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <p className="text-[11px] font-bold text-white/25 mb-3 uppercase tracking-[0.08em]">{label}</p>
      <div className="flex flex-col items-center gap-1.5">
        {items.map((val, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.12, type: "spring" }}
            className="w-28 h-10 rounded-lg border-2 flex items-center justify-center font-bold text-sm relative"
            style={{ borderColor: color, color, background: `${color}08` }}
          >
            {val}
            {i === 0 && (
              <span className="absolute -right-12 text-[11px] font-bold text-red-400">
                ← top
              </span>
            )}
          </motion.div>
        ))}
        <div className="w-32 h-1 rounded-full mt-1" style={{ background: color }} />
      </div>
    </div>
  );
}

// ===== QUEUE VISUALIZATION =====
export function QueueVisual({
  items,
  label,
  color = "#a29bfe",
  highlightLast = false,
}: {
  items: number[];
  label: string;
  color?: string;
  highlightLast?: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      <p className="text-[11px] font-bold text-white/25 mb-3 uppercase tracking-[0.08em]">{label}</p>
      <div className="flex items-end gap-1.5">
        {items.map((val, i) => (
          <div key={i} className="flex flex-col items-center">
            {i === 0 && <span className="text-[10px] font-bold text-emerald-400 mb-1.5">front↓</span>}
            {i === items.length - 1 && <span className="text-[10px] font-bold text-red-400 mb-1.5">rear↓</span>}
            {i !== 0 && i !== items.length - 1 && <span className="mb-1.5 h-3.5" />}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1, type: "spring" }}
              className="w-14 h-12 rounded-lg border-2 flex items-center justify-center font-bold text-sm"
              style={{
                borderColor: highlightLast && i === items.length - 1 ? "#ff6b6b" : color,
                color: highlightLast && i === items.length - 1 ? "#ff6b6b" : color,
                background: `${highlightLast && i === items.length - 1 ? "#ff6b6b" : color}08`,
              }}
            >
              {val}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== BADGE =====
export function Badge({
  children,
  variant = "warning",
}: {
  children: React.ReactNode;
  variant?: "warning" | "critical" | "success";
}) {
  const styles = {
    warning: "bg-yellow-500/[0.08] border-yellow-500/20 text-yellow-400",
    critical: "bg-red-500/[0.08] border-red-500/20 text-red-400",
    success: "bg-emerald-500/[0.08] border-emerald-500/20 text-emerald-400",
  };

  return (
    <div role="alert" className={cn("inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-[13px] font-semibold", styles[variant])}>
      {children}
    </div>
  );
}
