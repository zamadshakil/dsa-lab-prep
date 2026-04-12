"use client";

import { codeExamples } from "@/data/code-examples";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader, FadeIn, StaggerContainer, StaggerItem, Card, KeyPoint, NodeChain, Badge } from "@/components/ui-components";

export default function SinglyLinkedListPage() {
  return (
    <div className="space-y-5">
      <SectionHeader icon="🔗" title="Singly Linked List" tag="Topic 2" color="#0ca678" colorDim="rgba(12,166,120,0.1)" />

      <FadeIn delay={0.05}><Badge variant="critical">Use class Node — no struct allowed in exam</Badge></FadeIn>

      <FadeIn delay={0.1}>
        <Card>
          <h2 className="text-[17px] font-semibold text-[#1a1a2e] mb-3">How It Works</h2>
          <div className="text-[14px] text-[#495057] leading-[1.7] space-y-3">
            <p>A linear data structure where each <strong>Node</strong> contains <strong>data</strong> and a <strong>pointer to next node</strong>. Traversal is one-direction only (head → NULL).</p>
            <p><strong>Two classes needed:</strong><br />• <code>class Node</code> — holds data and next pointer<br />• <code>class LinkedList</code> — holds head pointer and all operations</p>
          </div>
        </Card>
      </FadeIn>

      <FadeIn delay={0.15}><NodeChain nodes={[2, 7, 5, 1, 3]} color="#0ca678" headLabel="head" /></FadeIn>

      <FadeIn delay={0.2}>
        <StaggerContainer className="grid sm:grid-cols-2 gap-3">
          <StaggerItem><KeyPoint icon="🔑"><strong>Traversal:</strong> <code>while(temp != NULL)</code> — singly specific.</KeyPoint></StaggerItem>
          <StaggerItem><KeyPoint icon="🔑"><strong>Insert beginning:</strong> O(1). <strong>Insert end:</strong> O(n) — must traverse.</KeyPoint></StaggerItem>
          <StaggerItem><KeyPoint icon="🔑"><strong>Delete end:</strong> Need second-to-last → <code>temp-&gt;next-&gt;next != NULL</code></KeyPoint></StaggerItem>
          <StaggerItem><KeyPoint icon="🔑"><strong>Delete by position:</strong> Traverse to pos-1, then <code>temp-&gt;next = temp-&gt;next-&gt;next</code></KeyPoint></StaggerItem>
        </StaggerContainer>
      </FadeIn>

      <FadeIn delay={0.25}><CodeBlock title="Complete Singly Linked List" accentColor="#0ca678" code={codeExamples.singly_full} /></FadeIn>
    </div>
  );
}
