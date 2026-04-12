"use client";

import { codeExamples } from "@/data/code-examples";
import { CodeBlock } from "@/components/code-block";
import {
  SectionHeader, FadeIn, StaggerContainer, StaggerItem,
  Card, InfoCard, KeyPoint,
} from "@/components/ui-components";

export default function RecursionPage() {
  const color = "#ff6b6b";
  const colorDim = "rgba(255, 107, 107, 0.12)";

  return (
    <div className="space-y-6">
      <SectionHeader icon="🔄" title="Recursion" tag="Topic 1" color={color} colorDim={colorDim} />

      {/* Theory */}
      <FadeIn delay={0.1}>
        <Card>
          <h3 className="text-[15px] font-bold mb-3 flex items-center gap-2">
            <span>📖</span> What is Recursion?
          </h3>
          <div className="text-sm text-white/45 leading-relaxed space-y-2">
            <p>
              A function that <strong className="text-white/80">calls itself</strong> to solve smaller sub-problems. Every recursive function needs:
            </p>
            <p>
              1. <strong className="text-white/80">Base Case</strong> — stops the recursion (prevents infinite loop)<br />
              2. <strong className="text-white/80">Recursive Case</strong> — function calls itself with simpler input
            </p>
            <p>
              <strong className="text-white/80">How it works:</strong> Each call is pushed onto the <strong className="text-white/80">call stack</strong>. When base case is hit, calls return one by one (unwinding).
            </p>
          </div>
        </Card>
      </FadeIn>

      {/* Key Points */}
      <FadeIn delay={0.15}>
        <StaggerContainer className="grid md:grid-cols-2 gap-3">
          <StaggerItem>
            <KeyPoint icon="⚡">
              <strong>LIFO in call stack</strong> — Last called function returns first. That{"'"}s why printing AFTER recursive call gives ascending order.
            </KeyPoint>
          </StaggerItem>
          <StaggerItem>
            <KeyPoint icon="🎯">
              <strong>Base case is MANDATORY</strong> — Without it you get infinite recursion → stack overflow crash.
            </KeyPoint>
          </StaggerItem>
          <StaggerItem>
            <KeyPoint icon="🔬">
              <strong>Print before call</strong> = descending. <strong>Print after call</strong> = ascending. Key to output tracing.
            </KeyPoint>
          </StaggerItem>
          <StaggerItem>
            <KeyPoint icon="📊">
              <strong>Time: O(n)</strong> for linear recursion. <strong>Space: O(n)</strong> due to call stack frames.
            </KeyPoint>
          </StaggerItem>
        </StaggerContainer>
      </FadeIn>

      {/* Code Block */}
      <FadeIn delay={0.2}>
        <CodeBlock
          title="recursion"
          accentColor={color}
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

      {/* Exam Tip */}
      <FadeIn delay={0.25}>
        <InfoCard title="Exam Tip — Tracing Recursion Output" icon="💡">
          <p className="space-y-1">
            For <code className="text-red-400 bg-white/5 px-1 rounded font-mono text-xs">f(5)</code> where print is <strong className="text-white/70">before AND after</strong> call: <code className="bg-white/5 px-1 rounded font-mono text-xs">5 3 1 1 3 5</code><br />
            • Going IN (before call): prints 5, 3, 1 (descending by 2)<br />
            • Coming BACK (after call): prints 1, 3, 5 (stack unwinds)<br /><br />
            <strong className="text-white/70">Pattern formula:</strong> <code className="bg-white/5 px-1 rounded font-mono text-xs">n % 10</code> = last digit, <code className="bg-white/5 px-1 rounded font-mono text-xs">n / 10</code> = remove last digit
          </p>
        </InfoCard>
      </FadeIn>
    </div>
  );
}
