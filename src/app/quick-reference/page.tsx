"use client";

import { motion } from "framer-motion";
import {
  SectionHeader, FadeIn, StaggerContainer, StaggerItem,
  Card, InfoCard,
} from "@/components/ui-components";

const cheatSheetData = [
  {
    title: "🔄 Recursion Patterns",
    color: "#ff6b6b",
    items: [
      "n / 10 — removes last digit",
      "n % 10 — gets last digit",
      "a * b = a + a*(b-1)",
      "b^p = b * b^(p-1)",
      "n! = n * (n-1)!",
      "Base case: n == 0 or n == 1",
      "Print before call → descending",
      "Print after call → ascending",
    ],
  },
  {
    title: "🔗 Singly LL Key Code",
    color: "#4ecdc4",
    items: [
      "class Node { data; next; }",
      "Head = NULL initially",
      "Insert beginning: O(1)",
      "Insert end: traverse to temp->next == NULL",
      "Delete end: traverse to temp->next->next == NULL",
      "Position traversal: i < pos - 1",
      "Display: while(temp != NULL)",
    ],
  },
  {
    title: "🔵 Circular LL Key Diffs",
    color: "#45b7d1",
    items: [
      "Last node → head (not NULL)",
      "Empty first node: next = itself",
      "One node check: head->next == head",
      "Traverse: temp->next != head",
      "Display: do-while loop",
      "Insert/delete beginning: update last node too!",
      "Self-loop: newNode->next = newNode",
    ],
  },
  {
    title: "📚 Stack Essentials",
    color: "#feca57",
    items: [
      "LIFO — Last In, First Out",
      "Array: top = -1, arr[++top]",
      "LL: top = NULL, insert at head",
      "isEmpty: top == -1 (arr) or NULL",
      "isFull: top == maxSize - 1 (array only!)",
      "Pop returns arr[top--]",
      "Display: top to bottom",
    ],
  },
  {
    title: "🚶 Queue Formulas",
    color: "#a29bfe",
    items: [
      "FIFO — First In, First Out",
      "Both: front = rear = -1",
      "Simple full: rear == size - 1",
      "Circular full: (rear+1) % size == front",
      "Circular enqueue: rear = (rear+1) % size",
      "Circular dequeue: front = (front+1) % size",
      "Last element: reset front = rear = -1",
    ],
  },
  {
    title: "🔀 Node Swap Steps",
    color: "#fd79a8",
    items: [
      "Find currX, prevX, currY, prevY",
      "Check if either value not found",
      "Handle head cases separately",
      "prevX->next = currY",
      "prevY->next = currX",
      "Swap their next pointers",
      "Uses temp variable for swap",
    ],
  },
];

export default function QuickReferencePage() {
  return (
    <div className="space-y-6">
      <SectionHeader icon="⚡" title="Quick Reference" tag="Cheat Sheet" color="#00cec9" colorDim="rgba(0, 206, 201, 0.12)" />

      <StaggerContainer className="grid md:grid-cols-2 gap-4">
        {cheatSheetData.map((section, i) => (
          <StaggerItem key={i}>
            <Card className="h-full hover:scale-[1.01] transition-transform duration-200">
              <h4 className="text-[14px] font-bold mb-4 flex items-center gap-2" style={{ color: section.color }}>
                {section.title}
              </h4>
              <ul className="space-y-1.5">
                {section.items.map((item, j) => (
                  <li key={j} className="text-[13px] text-white/40 pl-4 relative leading-relaxed">
                    <span className="absolute left-0 text-white/15 font-bold">›</span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: item
                          .replace(
                            /`([^`]+)`/g,
                            '<code class="font-mono text-[12px] bg-white/[0.06] px-1 py-0.5 rounded text-white/70">$1</code>'
                          )
                          .replace(
                            /([a-zA-Z_]+->[a-zA-Z_]+|[a-zA-Z_]+\[\+\+[a-zA-Z_]+\]|[a-zA-Z_]+\([^\)]*\)|[a-zA-Z_]+ == [^\s,]+|[a-zA-Z_]+ != [^\s,]+|\(rear\+1\) % size|front = rear = -1)/g,
                            '<code class="font-mono text-[11px] bg-white/[0.06] px-1 py-0.5 rounded text-white/60">$&</code>'
                          ),
                      }}
                    />
                  </li>
                ))}
              </ul>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Final exam reminders */}
      <FadeIn delay={0.4}>
        <InfoCard title="🎯 Final Exam Reminders" icon="✅">
          <div className="space-y-1.5">
            <p>✅ Always use <code className="text-red-400 bg-white/5 px-1 rounded font-mono text-xs">class</code> — NEVER <code className="text-red-400 bg-white/5 px-1 rounded font-mono text-xs">struct</code></p>
            <p>✅ <code className="bg-white/5 px-1 rounded font-mono text-xs">Node</code> class needs <code className="bg-white/5 px-1 rounded font-mono text-xs">public:</code> for data and next</p>
            <p>✅ <code className="bg-white/5 px-1 rounded font-mono text-xs">LinkedList</code> class has <code className="bg-white/5 px-1 rounded font-mono text-xs">private: head</code> and <code className="bg-white/5 px-1 rounded font-mono text-xs">public:</code> methods</p>
            <p>✅ Always check for <strong className="text-white/70">empty list</strong> and <strong className="text-white/70">single node</strong> edge cases</p>
            <p>✅ Always <code className="bg-white/5 px-1 rounded font-mono text-xs">delete</code> nodes when removing (memory management)</p>
            <p>✅ Circular LL display uses <strong className="text-white/70">do-while</strong> — common exam trick!</p>
            <p>✅ Circular Queue uses <strong className="text-white/70">% operator</strong> for wrap-around — memorize the formulas</p>
            <p>✅ Stack LL has NO isFull() — it can grow infinitely</p>
          </div>
        </InfoCard>
      </FadeIn>
    </div>
  );
}
