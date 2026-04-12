"use client";

import { codeExamples } from "@/data/code-examples";
import { CodeBlock } from "@/components/code-block";
import {
  SectionHeader, FadeIn, StaggerContainer, StaggerItem,
  Card, KeyPoint, QueueVisual, ComparisonTable,
} from "@/components/ui-components";

export default function QueuePage() {
  const color = "#a29bfe";
  const colorDim = "rgba(162, 155, 254, 0.12)";

  return (
    <div className="space-y-6">
      <SectionHeader icon="🚶" title="Queue (Simple + Circular)" tag="Topic 5" color={color} colorDim={colorDim} />

      {/* Theory */}
      <FadeIn delay={0.1}>
        <Card>
          <h3 className="text-[15px] font-bold mb-3 flex items-center gap-2">
            <span>📖</span> FIFO — First In, First Out
          </h3>
          <div className="text-sm text-white/45 leading-relaxed space-y-2">
            <p>
              A queue is like a <strong className="text-white/80">line at a counter</strong>. First person in line gets served first.
            </p>
            <p>
              <strong className="text-white/80">Operations:</strong><br />
              • <code className="text-purple-400 bg-white/5 px-1 rounded font-mono text-xs">enqueue(value)</code> — add at rear<br />
              • <code className="text-purple-400 bg-white/5 px-1 rounded font-mono text-xs">dequeue()</code> — remove from front<br />
              • <code className="text-purple-400 bg-white/5 px-1 rounded font-mono text-xs">display()</code> — show all elements front to rear
            </p>
            <p>
              <strong className="text-red-400">Simple Queue problem:</strong> After dequeue, spaces before front are wasted!<br />
              <strong className="text-emerald-400">Solution:</strong> <strong className="text-white/80">Circular Queue</strong> — uses <code className="bg-white/5 px-1 rounded font-mono text-xs">% size</code> to wrap around and reuse spaces.
            </p>
          </div>
        </Card>
      </FadeIn>

      {/* Visual */}
      <FadeIn delay={0.15}>
        <Card className="flex flex-wrap justify-center gap-12 py-10">
          <QueueVisual items={[10, 20, 30]} label="Simple Queue" color={color} />
          <QueueVisual items={[30, 40, 50, 60]} label="Circular — 60 wrapped around!" color={color} highlightLast />
        </Card>
      </FadeIn>

      {/* Comparison Table */}
      <FadeIn delay={0.2}>
        <ComparisonTable
          title="Simple Queue vs Circular Queue — Critical Differences"
          color={color}
          headers={["Aspect", "Simple Queue", "Circular Queue"]}
          rows={[
            { aspect: "isFull()", col1: "rear == size - 1", col2: "(rear+1) % size == front" },
            { aspect: "isEmpty()", col1: "front == -1 || front > rear", col2: "front == -1" },
            { aspect: "Enqueue position", col1: "arr[++rear]", col2: "rear = (rear+1) % size" },
            { aspect: "Dequeue", col1: "front++", col2: "front = (front+1) % size" },
            { aspect: "Space reuse", col1: "❌ Wasted after dequeue", col2: "✅ Wraps around, reuses" },
            { aspect: "Last element removed", col1: "front > rear = empty", col2: "front = rear = -1 (reset)" },
            { aspect: "Display loop", col1: "for(i=front; i<=rear; i++)", col2: "Loop with i=(i+1)%size" },
          ]}
        />
      </FadeIn>

      {/* Key Points */}
      <FadeIn delay={0.25}>
        <StaggerContainer className="grid md:grid-cols-2 gap-3">
          <StaggerItem>
            <KeyPoint icon="🧠">
              <strong>The % operator is the magic!</strong> <code>(rear+1) % size</code> wraps index 4 back to 0 when size is 5.
            </KeyPoint>
          </StaggerItem>
          <StaggerItem>
            <KeyPoint icon="🧠">
              <strong>Both start at:</strong> <code>front = rear = -1</code>. First enqueue sets <code>front = 0</code>.
            </KeyPoint>
          </StaggerItem>
          <StaggerItem>
            <KeyPoint icon="🧠">
              <strong>Circular: last element</strong> — when <code>front == rear</code> and we dequeue, reset both to -1.
            </KeyPoint>
          </StaggerItem>
          <StaggerItem>
            <KeyPoint icon="🧠">
              <strong>Circular Queue can hold</strong> <code>size - 1</code> elements (one slot differentiates full vs empty).
            </KeyPoint>
          </StaggerItem>
        </StaggerContainer>
      </FadeIn>

      {/* Code */}
      <FadeIn delay={0.3}>
        <CodeBlock
          title="queue"
          accentColor={color}
          tabs={[
            { label: "Simple Queue", code: codeExamples.queue_simple },
            { label: "Circular Queue", code: codeExamples.queue_circular },
          ]}
        />
      </FadeIn>
    </div>
  );
}
