"use client";

import { codeExamples } from "@/data/code-examples";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader, FadeIn, StaggerContainer, StaggerItem, Card, KeyPoint, QueueVisual } from "@/components/ui-components";

export default function CircularQueuePage() {
  return (
    <div className="space-y-5">
      <SectionHeader icon="🎡" title="Circular Queue (Array)" tag="Topic 3" color="#45b7d1" colorDim="rgba(69, 183, 209, 0.12)" />

      <FadeIn delay={0.1}>
        <Card>
          <h2 className="text-[17px] font-semibold text-[#1a1a2e] mb-3">Efficient Array Storage</h2>
          <div className="text-[14px] text-[#495057] leading-[1.7] space-y-3">
            <p><strong>The Problem with Simple Array Queue:</strong> When we dequeue elements, the spaces at the front of the array become empty, but the <code>rear</code> pointer keeps moving forward until it hits the end. We get a "Queue is Full" error even if there is space at the front!</p>
            <p><strong>The Solution:</strong> Circular Queue uses the modulo operator (<code>% size</code>) to wrap the <code>rear</code> (and <code>front</code>) pointers back to the beginning of the array, reusing empty spaces.</p>
          </div>
        </Card>
      </FadeIn>

      <FadeIn delay={0.2}>
        <Card className="flex flex-wrap justify-center gap-12 py-10">
          <QueueVisual items={[30, 40, 50, 60]} label="Circular Array (Wrapped)" color="#45b7d1" highlightLast />
        </Card>
      </FadeIn>

      <FadeIn delay={0.25}>
        <StaggerContainer className="grid sm:grid-cols-2 gap-3">
          <StaggerItem><KeyPoint icon="🧠"><strong>Modulo is the magic:</strong> <code>(rear + 1) % size</code> wraps 4 back to 0 when size is 5.</KeyPoint></StaggerItem>
          <StaggerItem><KeyPoint icon="⚠️"><strong>isFull Condition:</strong> <code>(rear + 1) % size == front</code> means the rear is right behind the front.</KeyPoint></StaggerItem>
          <StaggerItem><KeyPoint icon="📝"><strong>Enqueue:</strong> <code>rear = (rear + 1) % size; arr[rear] = value;</code></KeyPoint></StaggerItem>
          <StaggerItem><KeyPoint icon="📝"><strong>Dequeue:</strong> If <code>front == rear</code> (only 1 element left), reset both to -1. Else, <code>front = (front + 1) % size;</code></KeyPoint></StaggerItem>
        </StaggerContainer>
      </FadeIn>

      <FadeIn delay={0.3}>
        <CodeBlock title="circular-queue" accentColor="#45b7d1"
          tabs={[
            { label: "Circular Queue (Array)", code: codeExamples.circular_queue_array },
          ]}
        />
      </FadeIn>
    </div>
  );
}
