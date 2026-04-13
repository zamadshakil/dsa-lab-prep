"use client";

import { codeExamples } from "@/data/code-examples";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader, FadeIn, StaggerContainer, StaggerItem, Card, KeyPoint, ComparisonTable } from "@/components/ui-components";

export default function QueuePage() {
  return (
    <div className="space-y-5">
      <SectionHeader icon="🚶" title="Queue (Array & LL)" tag="Topic 2" color="#a29bfe" colorDim="rgba(162, 155, 254, 0.12)" />

      <FadeIn delay={0.1}>
        <Card>
          <h2 className="text-[17px] font-semibold text-[#1a1a2e] mb-3">FIFO — First In, First Out</h2>
          <div className="text-[14px] text-[#495057] leading-[1.7] space-y-3">
            <p>A queue works like a real-life waiting line. First person to join the line gets served first.</p>
            <p><strong>Operations:</strong> <code>enqueue()</code> — add at the rear, <code>dequeue()</code> — remove from the front</p>
          </div>
        </Card>
      </FadeIn>

      <FadeIn delay={0.2}>
        <StaggerContainer className="grid sm:grid-cols-2 gap-3">
          <StaggerItem><KeyPoint icon="🧩"><strong>Array Queue:</strong> Uses <code>front</code> and <code>rear</code> pointers (indexes). Starts at -1.</KeyPoint></StaggerItem>
          <StaggerItem><KeyPoint icon="🧩"><strong>LL Queue:</strong> Uses <code>front</code> and <code>rear</code> node pointers. Starts at NULL.</KeyPoint></StaggerItem>
          <StaggerItem><KeyPoint icon="🧩"><strong>Enqueue:</strong> Array <code>arr[++rear]</code> | LL inserts Node at <code>rear</code>.</KeyPoint></StaggerItem>
          <StaggerItem><KeyPoint icon="🧩"><strong>Dequeue:</strong> Array <code>front++</code> | LL removes Node at <code>front</code>.</KeyPoint></StaggerItem>
        </StaggerContainer>
      </FadeIn>

      <FadeIn delay={0.25}>
        <ComparisonTable title="Array Queue vs Linked List Queue" color="#a29bfe"
          headers={["Aspect", "Array Queue", "Linked List Queue"]}
          rows={[
            { aspect: "Size", col1: "Fixed", col2: "Dynamic" },
            { aspect: "Pointers", col1: "int front = -1, rear = -1", col2: "Node *front = NULL, *rear = NULL" },
            { aspect: "Enqueue", col1: "arr[++rear] = value", col2: "rear->next = newNode; rear = newNode;" },
            { aspect: "Dequeue", col1: "front++", col2: "Node* temp = front; front = front->next; delete temp;" },
            { aspect: "Queue Full", col1: "rear == size - 1", col2: "Never full (memory permitting)" },
          ]}
        />
      </FadeIn>

      <FadeIn delay={0.3}>
        <CodeBlock title="queue" accentColor="#a29bfe"
          tabs={[
            { label: "Array Implementation", code: codeExamples.queue_array },
            { label: "Linked List Implementation", code: codeExamples.queue_linked_list },
          ]}
        />
      </FadeIn>
    </div>
  );
}
