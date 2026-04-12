"use client";

import { codeExamples } from "@/data/code-examples";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader, FadeIn, Card, NodeChain, ComparisonTable } from "@/components/ui-components";

export default function CircularLinkedListPage() {
  return (
    <div className="space-y-6">
      <SectionHeader icon="🔵" title="Circular Linked List" tag="Topic 3" color="#45b7d1" colorDim="rgba(69,183,209,0.12)" />

      <FadeIn delay={0.1}>
        <Card>
          <h2 className="text-[17px] font-semibold text-[#f5f5f7] mb-3 tracking-[-0.01em]">Circular vs Singly — The Key Difference</h2>
          <div className="text-[14px] text-[#a1a1a6] leading-[1.7] space-y-3">
            <p>The <strong className="text-[#f5f5f7]">last node points back to head</strong> instead of NULL. No NULL termination.</p>
            <p>
              <strong className="text-[#f5f5f7]">Critical code differences:</strong><br />
              • Empty single node: <code>head-&gt;next == head</code> (not NULL)<br />
              • Traversal: <code>while(temp-&gt;next != head)</code><br />
              • Display: Uses <code className="!text-[#ff453a]">do-while</code> loop<br />
              • Insert at beginning: Must also update <strong className="text-[#f5f5f7]">last node{"'"}s next</strong>
            </p>
          </div>
        </Card>
      </FadeIn>

      <FadeIn delay={0.15}>
        <NodeChain nodes={[9, 2, 7, 1, 3]} color="#45b7d1" isCircular headLabel="head" />
      </FadeIn>

      <FadeIn delay={0.2}>
        <ComparisonTable
          title="Singly vs Circular — Critical Differences"
          color="#45b7d1"
          headers={["Aspect", "Singly LL", "Circular LL"]}
          rows={[
            { aspect: "Last node points to", col1: "NULL", col2: "head" },
            { aspect: "Traversal condition", col1: "temp != NULL", col2: "temp->next != head" },
            { aspect: "Display loop", col1: "while loop", col2: "do-while loop" },
            { aspect: "Single node check", col1: "head->next == NULL", col2: "head->next == head" },
            { aspect: "Empty list, first add", col1: "newNode->next = NULL", col2: "newNode->next = newNode" },
            { aspect: "Insert at beginning", col1: "Just update head", col2: "Update head + last->next" },
            { aspect: "Delete from beginning", col1: "Move head forward", col2: "Move head + update last->next" },
          ]}
        />
      </FadeIn>

      <FadeIn delay={0.25}>
        <CodeBlock title="Complete Circular Linked List" accentColor="#45b7d1" code={codeExamples.circular_full} />
      </FadeIn>
    </div>
  );
}
