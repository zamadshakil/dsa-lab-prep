"use client";

import { codeExamples } from "@/data/code-examples";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader, FadeIn, StaggerContainer, StaggerItem, Card, KeyPoint, NodeChain, Badge, CommonMistakes, ComplexityTable, Snippet } from "@/components/ui-components";

export default function SinglyLinkedListPage() {
  const complexities = [
    { operation: "Insert at Head", best: "O(1)", worst: "O(1)", space: "O(1)" },
    { operation: "Insert at Tail", best: "O(n)", worst: "O(n)", space: "O(1)" },
    { operation: "Delete Head", best: "O(1)", worst: "O(1)", space: "O(1)" },
    { operation: "Delete Tail", best: "O(n)", worst: "O(n)", space: "O(1)" },
    { operation: "Search", best: "O(1)", worst: "O(n)", space: "O(1)" },
  ];

  const mistakes = [
    { 
      mistake: "while (temp != NULL) {\n  // forgot to update temp\n}", 
      fix: "while (temp != NULL) {\n  temp = temp->next; // Always move forward\n}" 
    },
    { 
      mistake: "void deleteEnd() {\n  temp = head;\n  while(temp->next != NULL) {\n    temp = temp->next;\n  }\n  delete temp;\n  // Previous node still points to deleted memory!\n}", 
      fix: "void deleteEnd() {\n  // Stop at second-to-last node\n  while(temp->next->next != NULL) {\n    temp = temp->next;\n  }\n  delete temp->next;\n  temp->next = NULL;\n}" 
    }
  ];

  const insertTailSnippet = `void insertAtEnd(int val) {
    Node* newNode = new Node(val);
    if (head == NULL) {
        head = newNode;
        return;
    }
    Node* temp = head;
    while (temp->next != NULL) {
        temp = temp->next;
    }
    temp->next = newNode;
}`;

  return (
    <div className="space-y-6">
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
        <ComplexityTable data={complexities} />
      </FadeIn>

      <FadeIn delay={0.25}>
        <StaggerContainer className="grid sm:grid-cols-2 gap-3">
          <StaggerItem><KeyPoint icon="🔑"><strong>Traversal:</strong> <code>while(temp != NULL)</code> — touches every node.</KeyPoint></StaggerItem>
          <StaggerItem><KeyPoint icon="🔑"><strong>Find Last Node:</strong> <code>while(temp-&gt;next != NULL)</code> — stops at the last valid node.</KeyPoint></StaggerItem>
          <StaggerItem><KeyPoint icon="🔑"><strong>Delete end:</strong> Need second-to-last → <code>temp-&gt;next-&gt;next != NULL</code></KeyPoint></StaggerItem>
          <StaggerItem><KeyPoint icon="🔑"><strong>Edge Cases:</strong> Always check if <code>head == NULL</code> before traversing.</KeyPoint></StaggerItem>
        </StaggerContainer>
      </FadeIn>

      <FadeIn delay={0.3}>
        <CommonMistakes mistakes={mistakes} />
      </FadeIn>

      <FadeIn delay={0.35}>
        <h3 className="font-semibold text-slate-800 text-[15px] mb-3">Logic Breakdown: Insert At End</h3>
        <Snippet 
          code={insertTailSnippet} 
          title="Insert At Tail"
          notes={[
            "<strong>Handle Empty List:</strong> If the list is empty (`head == NULL`), the new node becomes the head. This is a common exam edge case.",
            "<strong>Traverse to End:</strong> We use `temp->next != NULL` to stop exactly on the last node, NOT after it. If we used `temp != NULL`, temp would fall off the list.",
            "<strong>Link:</strong> Once at the last node, simply point its `next` to the newly created node."
          ]}
        />
      </FadeIn>

      <FadeIn delay={0.4}>
        <h3 className="font-semibold text-slate-800 text-[15px] mt-8 mb-3">Complete Implementation</h3>
        <CodeBlock title="Complete Singly Linked List" accentColor="#0ca678" code={codeExamples.singly_full} />
      </FadeIn>
    </div>
  );
}
