"use client";

import { codeExamples } from "@/data/code-examples";
import { CodeBlock } from "@/components/code-block";
import {
  SectionHeader, FadeIn, StaggerContainer, StaggerItem,
  Card, KeyPoint, NodeChain, Badge,
} from "@/components/ui-components";

export default function SinglyLinkedListPage() {
  return (
    <div className="space-y-6">
      <SectionHeader icon="🔗" title="Singly Linked List" tag="Topic 2" color="#4ecdc4" colorDim="rgba(78,205,196,0.12)" />

      <FadeIn delay={0.05}>
        <Badge variant="critical">Use class Node — no struct allowed in exam</Badge>
      </FadeIn>

      <FadeIn delay={0.1}>
        <Card>
          <h2 className="text-[17px] font-semibold text-[#f5f5f7] mb-3 tracking-[-0.01em]">How It Works</h2>
          <div className="text-[14px] text-[#a1a1a6] leading-[1.7] space-y-3">
            <p>A linear data structure where each <strong className="text-[#f5f5f7]">Node</strong> contains <strong className="text-[#f5f5f7]">data</strong> and a <strong className="text-[#f5f5f7]">pointer to next node</strong>. Traversal is one-direction only (head → NULL).</p>
            <p>
              <strong className="text-[#f5f5f7]">Two classes needed:</strong><br />
              • <code>class Node</code> — holds data and next pointer<br />
              • <code>class LinkedList</code> — holds head pointer and all operations
            </p>
          </div>
        </Card>
      </FadeIn>

      <FadeIn delay={0.15}>
        <NodeChain nodes={[2, 7, 5, 1, 3]} color="#4ecdc4" headLabel="head" />
      </FadeIn>

      <FadeIn delay={0.2}>
        <StaggerContainer className="grid sm:grid-cols-2 gap-3">
          <StaggerItem><KeyPoint icon="🔑"><strong>Traversal:</strong> <code>while(temp != NULL)</code> — singly specific. Circular uses <code>temp-&gt;next != head</code></KeyPoint></StaggerItem>
          <StaggerItem><KeyPoint icon="🔑"><strong>Insert beginning:</strong> O(1). <strong>Insert end:</strong> O(n) — must traverse to last.</KeyPoint></StaggerItem>
          <StaggerItem><KeyPoint icon="🔑"><strong>Delete end:</strong> Need second-to-last → <code>temp-&gt;next-&gt;next != NULL</code></KeyPoint></StaggerItem>
          <StaggerItem><KeyPoint icon="🔑"><strong>Delete by position:</strong> Traverse to pos-1, unlink → <code>temp-&gt;next = temp-&gt;next-&gt;next</code></KeyPoint></StaggerItem>
        </StaggerContainer>
      </FadeIn>

      <FadeIn delay={0.25}>
        <CodeBlock title="Complete Singly Linked List" accentColor="#4ecdc4" code={codeExamples.singly_full} />
      </FadeIn>
    </div>
  );
}
