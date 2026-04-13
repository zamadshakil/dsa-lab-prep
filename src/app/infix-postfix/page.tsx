"use client";

import { codeExamples } from "@/data/code-examples";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader, FadeIn, StaggerContainer, StaggerItem, Card, KeyPoint } from "@/components/ui-components";

export default function InfixPostfixPage() {
  return (
    <div className="space-y-5">
      <SectionHeader icon="🧮" title="Infix to Postfix Conversion" tag="Topic 4" color="#fd79a8" colorDim="rgba(253, 121, 168, 0.12)" />

      <FadeIn delay={0.1}>
        <Card>
          <h2 className="text-[17px] font-semibold text-[#1a1a2e] mb-3">Expression Conversion using Stack</h2>
          <div className="text-[14px] text-[#495057] leading-[1.7] space-y-3">
            <p><strong>Infix:</strong> Operators are between operands. e.g., <code>A + B * C</code></p>
            <p><strong>Postfix:</strong> Operators are after operands. e.g., <code>A B C * +</code> (Computers love this because it removes the need for parentheses and precedence rules).</p>
            <p>We use a <strong>Stack</strong> to temporarily hold operators and left parentheses while we process the expression from left to right.</p>
          </div>
        </Card>
      </FadeIn>

      <FadeIn delay={0.2}>
        <Card>
            <h3 className="text-[15px] font-semibold text-[#1a1a2e] mb-2">Algorithm Rules</h3>
            <ol className="list-decimal pl-5 text-[14px] text-[#495057] leading-[1.8] space-y-1">
                <li>If character is an <strong>Operand (A-Z, 0-9)</strong>: Add it directly to the Postfix string.</li>
                <li>If character is a <strong>Left Parenthesis '('</strong>: Push it onto the stack.</li>
                <li>If character is a <strong>Right Parenthesis ')'</strong>: Pop operators from the stack and add to Postfix until a '(' is found. Discard the '(' and ')'.</li>
                <li>If character is an <strong>Operator (+, -, *, /, ^)</strong>: 
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>While stack is not empty and precedence of top operator &gt;= precedence of current operator, Pop and add to Postfix.</li>
                        <li>Then Push the current operator onto the stack.</li>
                    </ul>
                </li>
                <li>At end of expression, Pop any remaining operators from the stack into Postfix.</li>
            </ol>
        </Card>
      </FadeIn>

      <FadeIn delay={0.25}>
        <StaggerContainer className="grid sm:grid-cols-2 gap-3">
          <StaggerItem><KeyPoint icon="⚖️"><strong>Precedence:</strong> <code>^</code> (Highest) &gt; <code>* , /</code> &gt; <code>+ , -</code> (Lowest)</KeyPoint></StaggerItem>
          <StaggerItem><KeyPoint icon="📦"><strong>Stack only holds:</strong> Operators and Parentheses. Operands NEVER go into the stack for this conversion.</KeyPoint></StaggerItem>
        </StaggerContainer>
      </FadeIn>

      <FadeIn delay={0.3}>
        <CodeBlock title="infix-postfix" accentColor="#fd79a8"
          tabs={[
            { label: "C++ Conversion Logic", code: codeExamples.infix_postfix },
          ]}
        />
      </FadeIn>
    </div>
  );
}
