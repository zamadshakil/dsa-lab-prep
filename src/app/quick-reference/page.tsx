"use client";

import {
  SectionHeader, FadeIn, StaggerContainer, StaggerItem,
  Card, InfoCard,
} from "@/components/ui-components";

const sections = [
  {
    title: "Recursion",
    color: "#ff6b6b",
    items: [
      "n / 10 — removes last digit",
      "n % 10 — gets last digit",
      "a × b = a + a×(b-1)",
      "b^p = b × b^(p-1)",
      "n! = n × (n-1)!",
      "Base case: n == 0 or n == 1",
      "Print before call → descending",
      "Print after call → ascending",
    ],
  },
  {
    title: "Singly Linked List",
    color: "#4ecdc4",
    items: [
      "class Node { data; next; }",
      "head = NULL initially",
      "Insert beginning: O(1)",
      "Insert end: traverse to temp->next == NULL",
      "Delete end: temp->next->next == NULL",
      "Position traversal: i < pos - 1",
      "Display: while(temp != NULL)",
    ],
  },
  {
    title: "Circular LL Differences",
    color: "#45b7d1",
    items: [
      "Last node → head (not NULL)",
      "Empty first node: next = itself",
      "One node check: head->next == head",
      "Traverse: temp->next != head",
      "Display: do-while loop ⚠️",
      "Insert/delete beginning: update last too",
      "Self-loop: newNode->next = newNode",
    ],
  },
  {
    title: "Stack",
    color: "#ffd60a",
    items: [
      "LIFO — Last In, First Out",
      "Array: top = -1, arr[++top]",
      "LL: top = NULL, insert at head",
      "isEmpty: top == -1 (arr) or NULL",
      "isFull: top == maxSize-1 (array only!)",
      "Pop: return arr[top--]",
      "Display: top to bottom",
    ],
  },
  {
    title: "Queue Formulas",
    color: "#bf5af2",
    items: [
      "FIFO — First In, First Out",
      "Both: front = rear = -1",
      "Simple full: rear == size-1",
      "Circular full: (rear+1) % size == front",
      "Circular enqueue: rear = (rear+1) % size",
      "Circular dequeue: front = (front+1) % size",
      "Last element removed: reset to -1",
    ],
  },
  {
    title: "Node Swap Steps",
    color: "#fd79a8",
    items: [
      "Find currX, prevX, currY, prevY",
      "Check if either value not found",
      "Handle head node cases",
      "prevX->next = currY",
      "prevY->next = currX",
      "Swap their next pointers",
      "Use temp variable for swap",
    ],
  },
];

export default function QuickReferencePage() {
  return (
    <div className="space-y-6">
      <SectionHeader icon="⚡" title="Quick Reference" tag="Cheat Sheet" color="#30d158" colorDim="rgba(48,209,88,0.12)" />

      <StaggerContainer className="grid sm:grid-cols-2 gap-4">
        {sections.map((section, i) => (
          <StaggerItem key={i}>
            <Card className="h-full">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full" style={{ background: section.color }} />
                <h3 className="text-[14px] font-semibold text-[#f5f5f7]">{section.title}</h3>
              </div>
              <ul className="space-y-2">
                {section.items.map((item, j) => (
                  <li key={j} className="text-[13px] text-[#86868b] leading-[1.5] flex gap-2">
                    <span className="text-[#3d3d3f] mt-0.5 flex-shrink-0">›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <FadeIn delay={0.4}>
        <InfoCard title="Final Exam Checklist" icon="✅">
          <div className="space-y-1.5">
            <p>✅ Always use <code>class</code> — NEVER <code>struct</code></p>
            <p>✅ Node class needs <code>public:</code> for data and next</p>
            <p>✅ LinkedList class has <code>private: head</code></p>
            <p>✅ Check for <strong>empty list</strong> and <strong>single node</strong> edge cases</p>
            <p>✅ Always <code>delete</code> nodes when removing</p>
            <p>✅ Circular LL display uses <strong>do-while</strong></p>
            <p>✅ Circular Queue uses <strong>% operator</strong></p>
            <p>✅ Stack LL has NO isFull()</p>
          </div>
        </InfoCard>
      </FadeIn>
    </div>
  );
}
