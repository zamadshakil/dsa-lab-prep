"use client";

import { codeExamples } from "@/data/code-examples";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader, FadeIn, StaggerContainer, StaggerItem, Card, KeyPoint, ComparisonTable } from "@/components/ui-components";

export default function StackPage() {
  return (
    <div className="space-y-5">
      <SectionHeader icon="📚" title="Stack (Array & LL)" tag="Topic 1" color="#feca57" colorDim="rgba(254, 202, 87, 0.12)" />

      <FadeIn delay={0.1}>
        <Card>
          <h2 className="text-[17px] font-semibold text-[#1a1a2e] mb-3">LIFO — Last In, First Out</h2>
          <div className="text-[14px] text-[#495057] leading-[1.7] space-y-3">
            <p>A stack is like a pile of plates. You can only add/remove from the <strong>top</strong>.</p>
            <p><strong>4 Operations:</strong><br />• <code>push(value)</code> — add to top<br />• <code>pop()</code> — remove top<br />• <code>peek()</code> — view top without removing<br />• <code>display()</code> — print all</p>
          </div>
        </Card>
      </FadeIn>

      <FadeIn delay={0.2}>
        <StaggerContainer className="grid sm:grid-cols-2 gap-3">
          <StaggerItem><KeyPoint icon="📝"><strong>Array:</strong> <code>top = -1</code>. Push: <code>arr[++top]</code>. Pop: <code>arr[top--]</code></KeyPoint></StaggerItem>
          <StaggerItem><KeyPoint icon="📝"><strong>LL:</strong> Push = insert at head. Pop = delete head. <strong>No overflow!</strong></KeyPoint></StaggerItem>
          <StaggerItem><KeyPoint icon="📝"><strong>isFull():</strong> <code>top == maxSize - 1</code> (array only!). LL has no isFull.</KeyPoint></StaggerItem>
          <StaggerItem><KeyPoint icon="📝"><strong>Display:</strong> Array prints <code>top → 0</code>. LL traverses <code>current → NULL</code>.</KeyPoint></StaggerItem>
        </StaggerContainer>
      </FadeIn>

      <FadeIn delay={0.25}>
        <ComparisonTable title="Array Stack vs Linked List Stack" color="#feca57"
          headers={["Aspect", "Array", "Linked List"]}
          rows={[
            { aspect: "Size", col1: "Fixed (needs maxSize)", col2: "Dynamic (grows as needed)" },
            { aspect: "Overflow", col1: "top == maxSize-1", col2: "No overflow possible" },
            { aspect: "Top variable", col1: "int top = -1", col2: "Node* top = NULL" },
            { aspect: "Push", col1: "arr[++top] = value", col2: "newNode->next = top" },
            { aspect: "Pop", col1: "return arr[top--]", col2: "Save data, move top, delete" },
            { aspect: "Memory", col1: "Contiguous block", col2: "Scattered nodes" },
          ]}
        />
      </FadeIn>

      <FadeIn delay={0.3}>
        <CodeBlock title="stack" accentColor="#feca57"
          tabs={[
            { label: "Array Implementation", code: codeExamples.stack_array },
            { label: "Linked List Implementation", code: codeExamples.stack_linked_list },
          ]}
        />
      </FadeIn>
    </div>
  );
}
