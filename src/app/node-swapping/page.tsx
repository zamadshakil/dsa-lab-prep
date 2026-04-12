"use client";

import { codeExamples } from "@/data/code-examples";
import { CodeBlock } from "@/components/code-block";
import {
  SectionHeader, FadeIn,
  Card, NodeChain, Badge,
} from "@/components/ui-components";

export default function NodeSwappingPage() {
  const color = "#fd79a8";
  const colorDim = "rgba(253, 121, 168, 0.12)";

  return (
    <div className="space-y-6">
      <SectionHeader icon="🔀" title="Node Swapping" tag="Advanced" color={color} colorDim={colorDim} />

      <FadeIn delay={0.05}>
        <Badge variant="critical">⚠️ Swap by changing LINKS, not data values — this is what exams test!</Badge>
      </FadeIn>

      {/* Theory */}
      <FadeIn delay={0.1}>
        <Card>
          <h3 className="text-[15px] font-bold mb-3 flex items-center gap-2">
            <span>📖</span> How Node Swapping Works
          </h3>
          <div className="text-sm text-white/45 leading-relaxed space-y-2">
            <p>To swap two nodes <strong className="text-white/80">by changing links</strong> (not by just swapping data values):</p>
            <p>
              <strong className="text-white/80">Steps:</strong><br />
              1. Find <code className="bg-white/5 px-1 rounded font-mono text-xs">currX</code> and <code className="bg-white/5 px-1 rounded font-mono text-xs">prevX</code> (node with value x and its predecessor)<br />
              2. Find <code className="bg-white/5 px-1 rounded font-mono text-xs">currY</code> and <code className="bg-white/5 px-1 rounded font-mono text-xs">prevY</code> (node with value y and its predecessor)<br />
              3. If either not found → return<br />
              4. Link <code className="bg-white/5 px-1 rounded font-mono text-xs">prevX → currY</code> (or update head if x is head)<br />
              5. Link <code className="bg-white/5 px-1 rounded font-mono text-xs">prevY → currX</code> (or update head if y is head)<br />
              6. Swap their <code className="bg-white/5 px-1 rounded font-mono text-xs">next</code> pointers
            </p>
          </div>
        </Card>
      </FadeIn>

      {/* Visual — Before */}
      <FadeIn delay={0.15}>
        <Card className="space-y-6 py-8">
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-[0.12em] text-white/20 font-semibold mb-4">Before Swap</p>
            <div className="flex items-center justify-center gap-0 flex-wrap">
              {[10, 20, 30, 40, 50].map((val, i) => (
                <div key={i} className="flex items-center">
                  <div
                    className={`w-14 h-11 rounded-xl border-2 flex items-center justify-center font-bold text-sm ${
                      val === 20 || val === 40
                        ? "border-red-400 text-red-400 bg-red-400/10"
                        : "border-pink-400/50 text-pink-400/50 bg-pink-400/5"
                    }`}
                  >
                    {val}
                  </div>
                  {i < 4 && <span className="text-white/20 px-1.5 text-lg">→</span>}
                </div>
              ))}
              <span className="text-white/20 px-1.5 text-lg">→</span>
              <span className="px-3 py-1.5 border-2 border-dashed border-white/15 rounded-lg text-[11px] font-bold text-white/20">NULL</span>
            </div>
            {/* Labels */}
            <p className="text-[11px] text-red-400 mt-2 font-semibold">20 and 40 will be swapped</p>
          </div>

          <div className="border-t border-white/[0.05] mx-6" />

          <div className="text-center">
            <p className="text-[11px] uppercase tracking-[0.12em] text-emerald-400/50 font-semibold mb-4">After Swap</p>
            <div className="flex items-center justify-center gap-0 flex-wrap">
              {[10, 40, 30, 20, 50].map((val, i) => (
                <div key={i} className="flex items-center">
                  <div
                    className={`w-14 h-11 rounded-xl border-2 flex items-center justify-center font-bold text-sm ${
                      val === 20 || val === 40
                        ? "border-emerald-400 text-emerald-400 bg-emerald-400/10"
                        : "border-pink-400/50 text-pink-400/50 bg-pink-400/5"
                    }`}
                  >
                    {val}
                  </div>
                  {i < 4 && <span className="text-white/20 px-1.5 text-lg">→</span>}
                </div>
              ))}
              <span className="text-white/20 px-1.5 text-lg">→</span>
              <span className="px-3 py-1.5 border-2 border-dashed border-white/15 rounded-lg text-[11px] font-bold text-white/20">NULL</span>
            </div>
            <p className="text-[11px] text-emerald-400 mt-2 font-semibold">✓ Nodes swapped by links!</p>
          </div>
        </Card>
      </FadeIn>

      {/* Code */}
      <FadeIn delay={0.2}>
        <CodeBlock
          title="Complete Node Swapping"
          accentColor={color}
          code={codeExamples.swap_nodes}
        />
      </FadeIn>
    </div>
  );
}
