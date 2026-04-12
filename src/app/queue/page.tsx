"use client";

import { codeExamples } from "@/data/code-examples";
import { CodeBlock } from "@/components/code-block";
import {
  SectionHeader, FadeIn, StaggerContainer, StaggerItem,
  Card, KeyPoint, QueueVisual, ComparisonTable,
} from "@/components/ui-components";

export default function QueuePage() {
  return (
    <div className="space-y-6">
      <SectionHeader icon="🚶" title="Queue" tag="Topic 5" color="#bf5af2" colorDim="rgba(191,90,242,0.12)" />

      <FadeIn delay={0.1}>
        <Card>
          <h2 className="text-[17px] font-semibold text-[#f5f5f7] mb-3 tracking-[-0.01em]">FIFO — First In, First Out</h2>
          <div className="text-[14px] text-[#a1a1a6] leading-[1.7] space-y-3">
            <p>A queue is like a line at a counter. First person in line gets served first.</p>
            <p>
              <strong className="text-[#f5f5f7]">Operations:</strong> <code>enqueue()</code> — add at rear, <code>dequeue()</code> — remove from front
            </p>
            <p>
              <strong className="text-[#ff453a]">Simple Queue problem:</strong> Spaces before front are wasted after dequeue.<br />
              <strong className="text-[#30d158]">Solution:</strong> <strong className="text-[#f5f5f7]">Circular Queue</strong> — uses <code>% size</code> to wrap around.
            </p>
          </div>
        </Card>
      </FadeIn>

      <FadeIn delay={0.15}>
        <Card className="flex flex-wrap justify-center gap-12 py-10">
          <QueueVisual items={[10, 20, 30]} label="Simple Queue" color="#bf5af2" />
          <QueueVisual items={[30, 40, 50, 60]} label="Circular — wrapped" color="#bf5af2" highlightLast />
        </Card>
      </FadeIn>

      <FadeIn delay={0.2}>
        <ComparisonTable title="Simple vs Circular Queue" color="#bf5af2"
          headers={["Aspect", "Simple Queue", "Circular Queue"]}
          rows={[
            { aspect: "isFull()", col1: "rear == size - 1", col2: "(rear+1) % size == front" },
            { aspect: "isEmpty()", col1: "front == -1 || front > rear", col2: "front == -1" },
            { aspect: "Enqueue", col1: "arr[++rear]", col2: "rear = (rear+1) % size" },
            { aspect: "Dequeue", col1: "front++", col2: "front = (front+1) % size" },
            { aspect: "Space reuse", col1: "❌ Wasted", col2: "✅ Wraps around" },
            { aspect: "Last element", col1: "front > rear = empty", col2: "front = rear = -1" },
          ]}
        />
      </FadeIn>

      <FadeIn delay={0.25}>
        <StaggerContainer className="grid sm:grid-cols-2 gap-3">
          <StaggerItem><KeyPoint icon="🧠"><strong>% is the magic!</strong> <code>(rear+1) % size</code> wraps 4 back to 0 when size is 5.</KeyPoint></StaggerItem>
          <StaggerItem><KeyPoint icon="🧠"><strong>Both start at</strong> <code>front = rear = -1</code>. First enqueue sets <code>front = 0</code>.</KeyPoint></StaggerItem>
        </StaggerContainer>
      </FadeIn>

      <FadeIn delay={0.3}>
        <CodeBlock title="queue" accentColor="#bf5af2"
          tabs={[
            { label: "Simple Queue", code: codeExamples.queue_simple },
            { label: "Circular Queue", code: codeExamples.queue_circular },
          ]}
        />
      </FadeIn>
    </div>
  );
}
