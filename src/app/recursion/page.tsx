"use client";

import { codeExamples } from "@/data/code-examples";
import { CodeBlock } from "@/components/code-block";
import {
  SectionHeader, FadeIn, StaggerContainer, StaggerItem,
  Card, InfoCard, KeyPoint,
} from "@/components/ui-components";

export default function RecursionPage() {
  return (
    <div className="space-y-6">
      <SectionHeader icon="🔄" title="Recursion" tag="Topic 1" color="#ff6b6b" colorDim="rgba(255,107,107,0.12)" />

      <FadeIn delay={0.1}>
        <Card>
          <h2 className="text-[17px] font-semibold text-[#f5f5f7] mb-3 tracking-[-0.01em]">
            What is Recursion?
          </h2>
          <div className="text-[14px] text-[#a1a1a6] leading-[1.7] space-y-3">
            <p>
              A function that <strong className="text-[#f5f5f7]">calls itself</strong> to solve smaller sub-problems. Every recursive function needs:
            </p>
            <ol className="list-decimal list-inside space-y-1 pl-1">
              <li><strong className="text-[#f5f5f7]">Base Case</strong> — stops the recursion (prevents infinite loop)</li>
              <li><strong className="text-[#f5f5f7]">Recursive Case</strong> — function calls itself with simpler input</li>
            </ol>
            <p>
              Each call is pushed onto the <strong className="text-[#f5f5f7]">call stack</strong>. When base case is hit, calls return one by one (unwinding).
            </p>
          </div>
        </Card>
      </FadeIn>

      <FadeIn delay={0.15}>
        <StaggerContainer className="grid sm:grid-cols-2 gap-3">
          <StaggerItem>
            <KeyPoint icon="⚡">
              <strong>LIFO in call stack</strong> — Last called function returns first. Print AFTER recursive call = ascending.
            </KeyPoint>
          </StaggerItem>
          <StaggerItem>
            <KeyPoint icon="🎯">
              <strong>Base case is mandatory</strong> — Without it → infinite recursion → stack overflow crash.
            </KeyPoint>
          </StaggerItem>
          <StaggerItem>
            <KeyPoint icon="🔬">
              <strong>Print before call</strong> = descending. <strong>Print after call</strong> = ascending.
            </KeyPoint>
          </StaggerItem>
          <StaggerItem>
            <KeyPoint icon="📊">
              <strong>Time: O(n)</strong> for linear recursion. <strong>Space: O(n)</strong> due to call stack.
            </KeyPoint>
          </StaggerItem>
        </StaggerContainer>
      </FadeIn>

      <FadeIn delay={0.2}>
        <CodeBlock
          title="recursion"
          accentColor="#ff6b6b"
          tabs={[
            { label: "Print Pattern", code: codeExamples.recursion_print_pattern },
            { label: "Ascending", code: codeExamples.recursion_ascending },
            { label: "Power", code: codeExamples.recursion_power },
            { label: "Factorial", code: codeExamples.recursion_factorial },
            { label: "Reverse String", code: codeExamples.recursion_reverse_string },
            { label: "Product", code: codeExamples.recursion_product },
            { label: "Count Digits", code: codeExamples.recursion_count_digits },
            { label: "Sum Digits", code: codeExamples.recursion_sum_digits },
          ]}
        />
      </FadeIn>

      <FadeIn delay={0.25}>
        <InfoCard title="Exam Tip — Tracing Output" icon="💡">
          <p>
            For <code>f(5)</code> where print is before AND after call: <code>5 3 1 1 3 5</code>
          </p>
          <p>Going IN: prints 5, 3, 1 — Coming BACK: prints 1, 3, 5</p>
          <p><strong>Pattern:</strong> <code>n % 10</code> = last digit, <code>n / 10</code> = remove last digit</p>
        </InfoCard>
      </FadeIn>
    </div>
  );
}
