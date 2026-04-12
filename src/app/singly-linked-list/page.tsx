"use client";

import { codeExamples } from "@/data/code-examples";
import { CodeBlock } from "@/components/code-block";
import {
  SectionHeader, FadeIn, StaggerContainer, StaggerItem,
  Card, KeyPoint, NodeChain, Badge,
} from "@/components/ui-components";

export default function SinglyLinkedListPage() {
  const color = "#4ecdc4";
  const colorDim = "rgba(78, 205, 196, 0.12)";

  return (
    <div className="space-y-6">
      <SectionHeader icon="🔗" title="Singly Linked List" tag="Topic 2" color={color} colorDim={colorDim} />

      <FadeIn delay={0.05}>
        <Badge variant="critical">⚠️ IMPORTANT: Use class Node, NOT struct — no struct allowed in exam!</Badge>
      </FadeIn>

      {/* Theory */}
      <FadeIn delay={0.1}>
        <Card>
          <h3 className="text-[15px] font-bold mb-3 flex items-center gap-2">
            <span>📖</span> How It Works
          </h3>
          <div className="text-sm text-white/45 leading-relaxed space-y-2">
            <p>
              A linear data structure where each <strong className="text-white/80">Node</strong> contains <strong className="text-white/80">data</strong> and a <strong className="text-white/80">pointer to next node</strong>.
              Nodes are NOT in contiguous memory (unlike arrays). Traversal is <strong className="text-white/80">one-direction only</strong> (head → NULL).
            </p>
            <p>
              <strong className="text-white/80">Two classes needed:</strong><br />
              • <code className="text-sky-400 bg-white/5 px-1 rounded font-mono text-xs">class Node</code> — holds <code className="bg-white/5 px-1 rounded font-mono text-xs">data</code> and <code className="bg-white/5 px-1 rounded font-mono text-xs">next</code> pointer<br />
              • <code className="text-sky-400 bg-white/5 px-1 rounded font-mono text-xs">class LinkedList</code> — holds <code className="bg-white/5 px-1 rounded font-mono text-xs">head</code> pointer and all operations
            </p>
          </div>
        </Card>
      </FadeIn>

      {/* Visual */}
      <FadeIn delay={0.15}>
        <NodeChain nodes={[2, 7, 5, 1, 3]} color={color} headLabel="head" />
      </FadeIn>

      {/* Key Points */}
      <FadeIn delay={0.2}>
        <StaggerContainer className="grid md:grid-cols-2 gap-3">
          <StaggerItem>
            <KeyPoint icon="🔑">
              <strong>Traversal check:</strong> <code>while(temp != NULL)</code> — this is SINGLY specific. Circular uses <code>temp-&gt;next != head</code>
            </KeyPoint>
          </StaggerItem>
          <StaggerItem>
            <KeyPoint icon="🔑">
              <strong>Insert at beginning:</strong> O(1) — just update head. <strong>Insert at end:</strong> O(n) — must traverse to last node.
            </KeyPoint>
          </StaggerItem>
          <StaggerItem>
            <KeyPoint icon="🔑">
              <strong>Delete end:</strong> Need to reach second-to-last node → use <code>temp-&gt;next-&gt;next != NULL</code>
            </KeyPoint>
          </StaggerItem>
          <StaggerItem>
            <KeyPoint icon="🔑">
              <strong>Delete by position:</strong> Traverse to pos-1, then unlink → <code>temp-&gt;next = temp-&gt;next-&gt;next</code>
            </KeyPoint>
          </StaggerItem>
        </StaggerContainer>
      </FadeIn>

      {/* Full Code */}
      <FadeIn delay={0.25}>
        <CodeBlock
          title="Complete Singly Linked List"
          accentColor={color}
          code={codeExamples.singly_full}
        />
      </FadeIn>
    </div>
  );
}
