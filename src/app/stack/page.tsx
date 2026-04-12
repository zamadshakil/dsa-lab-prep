"use client";

import { codeExamples } from "@/data/code-examples";
import { CodeBlock } from "@/components/code-block";
import {
  SectionHeader, FadeIn, StaggerContainer, StaggerItem,
  Card, KeyPoint, StackVisual, ComparisonTable,
} from "@/components/ui-components";

export default function StackPage() {
  const color = "#feca57";
  const colorDim = "rgba(254, 202, 87, 0.12)";

  return (
    <div className="space-y-6">
      <SectionHeader icon="📚" title="Stack (Array + Linked List)" tag="Topic 4" color={color} colorDim={colorDim} />

      {/* Theory */}
      <FadeIn delay={0.1}>
        <Card>
          <h3 className="text-[15px] font-bold mb-3 flex items-center gap-2">
            <span>📖</span> LIFO — Last In, First Out
          </h3>
          <div className="text-sm text-white/45 leading-relaxed space-y-2">
            <p>
              A stack is like a <strong className="text-white/80">pile of plates</strong>. You can only add/remove from the <strong className="text-white/80">top</strong>.
            </p>
            <p>
              <strong className="text-white/80">4 Operations:</strong><br />
              • <code className="text-yellow-400 bg-white/5 px-1 rounded font-mono text-xs">push(value)</code> — add element to top<br />
              • <code className="text-yellow-400 bg-white/5 px-1 rounded font-mono text-xs">pop()</code> — remove and return top element<br />
              • <code className="text-yellow-400 bg-white/5 px-1 rounded font-mono text-xs">peek()</code> — view top element without removing<br />
              • <code className="text-yellow-400 bg-white/5 px-1 rounded font-mono text-xs">display()</code> — print all elements (top to bottom)
            </p>
            <p className="text-white/30">
              <strong className="text-white/50">Real-world:</strong> Undo/Redo, Browser history, Function call stack, Expression evaluation
            </p>
          </div>
        </Card>
      </FadeIn>

      {/* Visual */}
      <FadeIn delay={0.15}>
        <Card className="flex flex-wrap justify-center gap-16 py-10">
          <StackVisual items={[30, 20, 10]} label="Push order: 10, 20, 30" color={color} />
          <StackVisual items={[20, 10]} label="After pop() → returns 30" color={color} />
        </Card>
      </FadeIn>

      {/* Key Points */}
      <FadeIn delay={0.2}>
        <StaggerContainer className="grid md:grid-cols-2 gap-3">
          <StaggerItem>
            <KeyPoint icon="📝">
              <strong>Array stack:</strong> <code>top = -1</code> initially. Push: <code>arr[++top] = value</code>. Pop: <code>return arr[top--]</code>
            </KeyPoint>
          </StaggerItem>
          <StaggerItem>
            <KeyPoint icon="📝">
              <strong>LL stack:</strong> Push = insert at head. Pop = delete from head. <strong>No overflow!</strong>
            </KeyPoint>
          </StaggerItem>
          <StaggerItem>
            <KeyPoint icon="📝">
              <strong>Array: isFull()</strong> → <code>top == maxSize - 1</code>. LL stack has <strong>no isFull</strong> (dynamic memory).
            </KeyPoint>
          </StaggerItem>
          <StaggerItem>
            <KeyPoint icon="📝">
              <strong>Display order:</strong> Array prints <code>i = top → 0</code>. LL traverses <code>current → NULL</code>.
            </KeyPoint>
          </StaggerItem>
        </StaggerContainer>
      </FadeIn>

      {/* Comparison Table */}
      <FadeIn delay={0.25}>
        <ComparisonTable
          title="Array Stack vs Linked List Stack"
          color={color}
          headers={["Aspect", "Array", "Linked List"]}
          rows={[
            { aspect: "Size", col1: "Fixed (needs maxSize)", col2: "Dynamic (grows as needed)" },
            { aspect: "Overflow", col1: "Yes — top == maxSize-1", col2: "No overflow possible" },
            { aspect: "Top variable", col1: "int top = -1 (index)", col2: "Node* top = NULL (pointer)" },
            { aspect: "Push", col1: "arr[++top] = value", col2: "newNode->next = top; top = newNode" },
            { aspect: "Pop", col1: "return arr[top--]", col2: "Save data, move top, delete old" },
            { aspect: "Memory", col1: "Contiguous block", col2: "Scattered nodes" },
            { aspect: "Destructor", col1: "delete[] arr", col2: "Loop pop() until empty" },
          ]}
        />
      </FadeIn>

      {/* Code */}
      <FadeIn delay={0.3}>
        <CodeBlock
          title="stack"
          accentColor={color}
          tabs={[
            { label: "Stack — Array", code: codeExamples.stack_array },
            { label: "Stack — Linked List", code: codeExamples.stack_linked_list },
            { label: "Infix to Postfix (Bonus)", code: codeExamples.infix_postfix },
          ]}
        />
      </FadeIn>
    </div>
  );
}
