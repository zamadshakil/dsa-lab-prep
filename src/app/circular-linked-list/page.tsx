"use client";

import { codeExamples } from "@/data/code-examples";
import { CodeBlock } from "@/components/code-block";
import {
  SectionHeader, FadeIn,
  Card, NodeChain, ComparisonTable,
} from "@/components/ui-components";

export default function CircularLinkedListPage() {
  const color = "#45b7d1";
  const colorDim = "rgba(69, 183, 209, 0.12)";

  return (
    <div className="space-y-6">
      <SectionHeader icon="🔵" title="Circular Linked List" tag="Topic 3" color={color} colorDim={colorDim} />

      {/* Theory */}
      <FadeIn delay={0.1}>
        <Card>
          <h3 className="text-[15px] font-bold mb-3 flex items-center gap-2">
            <span>📖</span> Circular vs Singly — The Key Difference
          </h3>
          <div className="text-sm text-white/45 leading-relaxed space-y-2">
            <p>
              In a circular linked list, the <strong className="text-white/80">last node points back to head</strong> instead of NULL.
              There is <strong className="text-white/80">no NULL termination</strong>. This creates a continuous loop.
            </p>
            <p>
              <strong className="text-white/80">Critical code differences:</strong><br />
              • Empty check for single node: <code className="bg-white/5 px-1 rounded font-mono text-xs">head-&gt;next == head</code> (not <code className="bg-white/5 px-1 rounded font-mono text-xs">== NULL</code>)<br />
              • Traversal: <code className="bg-white/5 px-1 rounded font-mono text-xs">while(temp-&gt;next != head)</code> (not <code className="bg-white/5 px-1 rounded font-mono text-xs">!= NULL</code>)<br />
              • Display: Uses <code className="text-red-400 bg-white/5 px-1 rounded font-mono text-xs">do-while</code> loop (not while)<br />
              • Insert at beginning: Must also update <strong className="text-white/80">last node{"'"}s next</strong> pointer
            </p>
          </div>
        </Card>
      </FadeIn>

      {/* Visual */}
      <FadeIn delay={0.15}>
        <NodeChain nodes={[9, 2, 7, 1, 3]} color={color} isCircular headLabel="head" />
      </FadeIn>

      {/* Critical Diff Table */}
      <FadeIn delay={0.2}>
        <ComparisonTable
          title="Singly vs Circular — Critical Differences"
          color={color}
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

      {/* Full Code */}
      <FadeIn delay={0.25}>
        <CodeBlock
          title="Complete Circular Linked List"
          accentColor={color}
          code={codeExamples.circular_full}
        />
      </FadeIn>
    </div>
  );
}
