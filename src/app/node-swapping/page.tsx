"use client";

import { codeExamples } from "@/data/code-examples";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader, FadeIn, Card, Badge } from "@/components/ui-components";

export default function NodeSwappingPage() {
  return (
    <div className="space-y-5">
      <SectionHeader icon="🔀" title="Node Swapping" tag="Advanced" color="#af52de" colorDim="rgba(175,82,222,0.1)" />

      <FadeIn delay={0.05}><Badge variant="critical">Swap by changing LINKS, not data values — this is what exams test</Badge></FadeIn>

      <FadeIn delay={0.1}>
        <Card>
          <h2 className="text-[17px] font-semibold text-[#1d1d1f] mb-3">How Node Swapping Works</h2>
          <div className="text-[14px] text-[#424245] leading-[1.7] space-y-3">
            <p>To swap two nodes <strong>by changing links</strong>:</p>
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

      <FadeIn delay={0.15}>
        <Card className="space-y-6 py-6">
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-[0.1em] text-[#86868b] font-semibold mb-4">Before Swap</p>
            <div className="flex items-center justify-center gap-0 flex-wrap">
              {[10, 20, 30, 40, 50].map((val, i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-14 h-12 rounded-xl border-2 flex items-center justify-center font-semibold text-[14px] ${
                    val === 20 || val === 40 ? "border-[#ff3b30] text-[#ff3b30] bg-[#ff3b30]/4" : "border-[#d2d2d7] text-[#86868b] bg-[#f5f5f7]"
                  }`}>{val}</div>
                  {i < 4 && <span className="text-[#c5c5ca] px-2 text-sm">→</span>}
                </div>
              ))}
              <span className="text-[#c5c5ca] px-2 text-sm">→</span>
              <span className="px-3 py-2 border-2 border-dashed border-[#d2d2d7] rounded-lg text-[11px] font-bold text-[#aeaeb2]">NULL</span>
            </div>
            <p className="text-[12px] text-[#ff3b30] mt-3 font-medium">20 and 40 highlighted for swap</p>
          </div>
          <div className="mx-6 h-px bg-[#e8e8ed]" />
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-[0.1em] text-[#34c759] font-semibold mb-4">After Swap</p>
            <div className="flex items-center justify-center gap-0 flex-wrap">
              {[10, 40, 30, 20, 50].map((val, i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-14 h-12 rounded-xl border-2 flex items-center justify-center font-semibold text-[14px] ${
                    val === 20 || val === 40 ? "border-[#34c759] text-[#34c759] bg-[#34c759]/4" : "border-[#d2d2d7] text-[#86868b] bg-[#f5f5f7]"
                  }`}>{val}</div>
                  {i < 4 && <span className="text-[#c5c5ca] px-2 text-sm">→</span>}
                </div>
              ))}
              <span className="text-[#c5c5ca] px-2 text-sm">→</span>
              <span className="px-3 py-2 border-2 border-dashed border-[#d2d2d7] rounded-lg text-[11px] font-bold text-[#aeaeb2]">NULL</span>
            </div>
            <p className="text-[12px] text-[#34c759] mt-3 font-medium">✓ Nodes swapped by links</p>
          </div>
        </Card>
      </FadeIn>

      <FadeIn delay={0.2}><CodeBlock title="Node Swapping" accentColor="#af52de" code={codeExamples.swap_nodes} /></FadeIn>
    </div>
  );
}
