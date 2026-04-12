"use client";

import { codeExamples } from "@/data/code-examples";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader, FadeIn, Card, Badge } from "@/components/ui-components";

export default function NodeSwappingPage() {
  return (
    <div className="space-y-5">
      <SectionHeader icon="🔀" title="Node Swapping" tag="Advanced" color="#d6336c" colorDim="rgba(214,51,108,0.1)" />

      <FadeIn delay={0.05}><Badge variant="critical">Swap by changing LINKS, not data values — this is what exams test</Badge></FadeIn>

      <FadeIn delay={0.1}>
        <Card>
          <h2 className="text-[17px] font-semibold text-[#1a1a2e] mb-3">How Node Swapping Works</h2>
          <div className="text-[14px] text-[#495057] leading-[1.7] space-y-3">
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
            <p className="text-[11px] uppercase tracking-[0.1em] text-[#868e96] font-semibold mb-4">Before Swap</p>
            <div className="flex items-center justify-center gap-0 flex-wrap">
              {[10, 20, 30, 40, 50].map((val, i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-14 h-12 rounded-xl border-2 flex items-center justify-center font-semibold text-[14px] ${
                    val === 20 || val === 40 ? "border-[#e03131] text-[#e03131] bg-[#fff5f5]" : "border-[#dee2e6] text-[#868e96] bg-white"
                  }`}>{val}</div>
                  {i < 4 && <span className="text-[#ced4da] px-2 text-sm">→</span>}
                </div>
              ))}
              <span className="text-[#ced4da] px-2 text-sm">→</span>
              <span className="px-3 py-2 border-2 border-dashed border-[#dee2e6] rounded-lg text-[11px] font-bold text-[#adb5bd]">NULL</span>
            </div>
            <p className="text-[12px] text-[#e03131] mt-3 font-medium">20 and 40 highlighted for swap</p>
          </div>
          <div className="mx-6 h-px bg-[#e9ecef]" />
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-[0.1em] text-[#0ca678] font-semibold mb-4">After Swap</p>
            <div className="flex items-center justify-center gap-0 flex-wrap">
              {[10, 40, 30, 20, 50].map((val, i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-14 h-12 rounded-xl border-2 flex items-center justify-center font-semibold text-[14px] ${
                    val === 20 || val === 40 ? "border-[#0ca678] text-[#0ca678] bg-[#ebfbee]" : "border-[#dee2e6] text-[#868e96] bg-white"
                  }`}>{val}</div>
                  {i < 4 && <span className="text-[#ced4da] px-2 text-sm">→</span>}
                </div>
              ))}
              <span className="text-[#ced4da] px-2 text-sm">→</span>
              <span className="px-3 py-2 border-2 border-dashed border-[#dee2e6] rounded-lg text-[11px] font-bold text-[#adb5bd]">NULL</span>
            </div>
            <p className="text-[12px] text-[#0ca678] mt-3 font-medium">✓ Nodes swapped by links</p>
          </div>
        </Card>
      </FadeIn>

      <FadeIn delay={0.2}><CodeBlock title="Node Swapping" accentColor="#d6336c" code={codeExamples.swap_nodes} /></FadeIn>
    </div>
  );
}
