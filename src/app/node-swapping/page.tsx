"use client";

import { codeExamples } from "@/data/code-examples";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader, FadeIn, Card, Badge } from "@/components/ui-components";

export default function NodeSwappingPage() {
  return (
    <div className="space-y-6">
      <SectionHeader icon="🔀" title="Node Swapping" tag="Advanced" color="#fd79a8" colorDim="rgba(253,121,168,0.12)" />

      <FadeIn delay={0.05}>
        <Badge variant="critical">Swap by changing LINKS, not data values — this is what exams test</Badge>
      </FadeIn>

      <FadeIn delay={0.1}>
        <Card>
          <h2 className="text-[17px] font-semibold text-[#f5f5f7] mb-3 tracking-[-0.01em]">How Node Swapping Works</h2>
          <div className="text-[14px] text-[#a1a1a6] leading-[1.7] space-y-3">
            <p>To swap two nodes <strong className="text-[#f5f5f7]">by changing links</strong>:</p>
            <ol className="list-decimal list-inside space-y-1 pl-1">
              <li>Find <code>currX</code> and <code>prevX</code></li>
              <li>Find <code>currY</code> and <code>prevY</code></li>
              <li>If either not found → return</li>
              <li>Link <code>prevX → currY</code> (or update head)</li>
              <li>Link <code>prevY → currX</code> (or update head)</li>
              <li>Swap their <code>next</code> pointers</li>
            </ol>
          </div>
        </Card>
      </FadeIn>

      {/* Before / After */}
      <FadeIn delay={0.15}>
        <Card className="space-y-8 py-8">
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-[0.1em] text-[#86868b] font-medium mb-5">Before Swap</p>
            <div className="flex items-center justify-center gap-0 flex-wrap">
              {[10, 20, 30, 40, 50].map((val, i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-14 h-12 rounded-xl border flex items-center justify-center font-semibold text-[14px] ${
                    val === 20 || val === 40
                      ? "border-[#ff453a]/50 text-[#ff453a] bg-[#ff453a]/5"
                      : "border-[#2d2d2f] text-[#6e6e73] bg-[#111113]"
                  }`}>{val}</div>
                  {i < 4 && <span className="text-[#3d3d3f] px-2 text-sm font-mono">→</span>}
                </div>
              ))}
              <span className="text-[#3d3d3f] px-2 text-sm font-mono">→</span>
              <span className="px-3 py-2 border border-dashed border-[#3d3d3f] rounded-lg text-[11px] font-semibold text-[#48484a]">NULL</span>
            </div>
            <p className="text-[12px] text-[#ff453a] mt-3 font-medium">20 and 40 highlighted for swap</p>
          </div>

          <div className="mx-6 h-px bg-[#2d2d2f]" />

          <div className="text-center">
            <p className="text-[11px] uppercase tracking-[0.1em] text-[#30d158] font-medium mb-5">After Swap</p>
            <div className="flex items-center justify-center gap-0 flex-wrap">
              {[10, 40, 30, 20, 50].map((val, i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-14 h-12 rounded-xl border flex items-center justify-center font-semibold text-[14px] ${
                    val === 20 || val === 40
                      ? "border-[#30d158]/50 text-[#30d158] bg-[#30d158]/5"
                      : "border-[#2d2d2f] text-[#6e6e73] bg-[#111113]"
                  }`}>{val}</div>
                  {i < 4 && <span className="text-[#3d3d3f] px-2 text-sm font-mono">→</span>}
                </div>
              ))}
              <span className="text-[#3d3d3f] px-2 text-sm font-mono">→</span>
              <span className="px-3 py-2 border border-dashed border-[#3d3d3f] rounded-lg text-[11px] font-semibold text-[#48484a]">NULL</span>
            </div>
            <p className="text-[12px] text-[#30d158] mt-3 font-medium">✓ Nodes swapped by links</p>
          </div>
        </Card>
      </FadeIn>

      <FadeIn delay={0.2}>
        <CodeBlock title="Node Swapping" accentColor="#fd79a8" code={codeExamples.swap_nodes} />
      </FadeIn>
    </div>
  );
}
