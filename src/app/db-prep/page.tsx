"use client";

import { ddlContent, dmlContent, queryContent, relationalAlgebraContent } from "@/data/db-content";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader, FadeIn, StaggerContainer, StaggerItem, Card, KeyPoint } from "@/components/ui-components";
import { useState } from "react";
import { PlaySquare } from "lucide-react";

export default function DBPrepPage() {
  const [activeTab, setActiveTab] = useState<'ddl' | 'dml' | 'queries' | 'relational'>('ddl');

  const renderContent = (data: any[], colorDef: string) => {
    return (
      <div className="space-y-6 mt-6">
        {data.map((block, idx) => (
          <FadeIn key={idx} delay={0.1 + (idx * 0.05)}>
            <Card>
              <h3 className="text-[17px] font-semibold text-[#1a1a2e] mb-3">{block.title}</h3>
              <p className="text-[14px] text-[#495057] mb-4">{block.description}</p>
              
              {block.keyPoints && (
                <StaggerContainer className="grid sm:grid-cols-2 gap-3 mb-5">
                  {block.keyPoints.map((kp: string, kIdx: number) => (
                    <StaggerItem key={kIdx}><KeyPoint icon="💡">{kp}</KeyPoint></StaggerItem>
                  ))}
                </StaggerContainer>
              )}

              <div className="space-y-4">
                {block.codeBlocks.map((cb: any, cbIdx: number) => (
                  <div key={cbIdx}>
                    <h4 className="text-[14px] font-medium text-slate-700 mb-2 flex items-center gap-2">
                        <PlaySquare size={14} color={colorDef} /> {cb.title}
                    </h4>
                    <CodeBlock title={cb.title} accentColor={colorDef} tabs={[{ label: "SQL", code: cb.code }]} />
                  </div>
                ))}
              </div>
            </Card>
          </FadeIn>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-5">
      <SectionHeader icon="🗄️" title="Database Systems (Week 5 & 6)" tag="DB Exam" color="#0ea5e9" colorDim="rgba(14, 165, 233, 0.12)" />

      <FadeIn delay={0.1}>
        <div className="flex flex-wrap gap-2 mb-2">
          <button onClick={() => setActiveTab('ddl')} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${activeTab === 'ddl' ? 'bg-[#0ea5e9] text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>DDL (Structure)</button>
          <button onClick={() => setActiveTab('dml')} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${activeTab === 'dml' ? 'bg-[#7c3aed] text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>DML (Manipulate)</button>
          <button onClick={() => setActiveTab('queries')} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${activeTab === 'queries' ? 'bg-[#f59f00] text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>SELECT Queries</button>
          <button onClick={() => setActiveTab('relational')} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${activeTab === 'relational' ? 'bg-[#e64980] text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>Relational Algebra</button>
        </div>
      </FadeIn>

      {activeTab === 'ddl' && renderContent(ddlContent, "#0ea5e9")}
      {activeTab === 'dml' && renderContent(dmlContent, "#7c3aed")}
      {activeTab === 'queries' && renderContent(queryContent, "#f59f00")}
      {activeTab === 'relational' && renderContent(relationalAlgebraContent, "#e64980")}
    </div>
  );
}
