"use client";

import { ddlContent, dmlContent, queryContent, relationalAlgebraContent, interactiveQuizData } from "@/data/db-content";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader, FadeIn, StaggerContainer, StaggerItem, Card, KeyPoint } from "@/components/ui-components";
import { useState } from "react";
import { PlaySquare, CheckCircle2, XCircle, ChevronRight, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DBPrepPage() {
  const [activeTab, setActiveTab] = useState<'ddl' | 'dml' | 'queries' | 'relational' | 'interactive'>('ddl');

  // Quiz State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections
    setSelectedAnswer(index);
    if (index === interactiveQuizData[currentQIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQIndex < interactiveQuizData.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
      setSelectedAnswer(null);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizFinished(false);
  };

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

              {block.tableVisual && (
                <div className="mt-6 border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-slate-50 px-4 py-2 flex items-center gap-2 border-b border-slate-200">
                    <span className="text-lg">📊</span>
                    <h4 className="text-sm font-semibold text-slate-800">Database State Example</h4>
                  </div>
                  <div className="overflow-x-auto bg-white">
                    <table className="w-full text-sm text-left">
                      <thead className="text-[11px] text-slate-500 uppercase bg-slate-50/50 border-b border-slate-100">
                        <tr>
                          {block.tableVisual.headers.map((hdr: string, i: number) => (
                            <th key={i} className="px-4 py-3 tracking-wide">{hdr}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {block.tableVisual.rows.map((row: string[], i: number) => (
                          <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/80 transition-colors">
                            {row.map((cell: string, j: number) => (
                              <td key={j} className={`px-4 py-3 font-medium ${cell === 'NULL' ? 'text-slate-400 italic' : 'text-slate-700'}`}>
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </Card>
          </FadeIn>
        ))}
      </div>
    );
  };

  const renderInteractiveQuiz = () => {
    const qData = interactiveQuizData[currentQIndex];

    return (
      <FadeIn delay={0.1} className="mt-8 relative max-w-2xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-3xl blur-xl opacity-20" />
        <div className="relative bg-white border border-slate-200 shadow-xl rounded-3xl p-8 overflow-hidden">
          
          {/* Progress Bar */}
          {!quizFinished && (
            <div className="w-full bg-slate-100 h-1.5 rounded-full mb-8 overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${((currentQIndex + 1) / interactiveQuizData.length) * 100}%` }}
                 className="h-full bg-emerald-500 rounded-full"
               />
            </div>
          )}

          <AnimatePresence mode="wait">
            {!quizFinished ? (
              <motion.div 
                key={currentQIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-emerald-600 font-semibold text-sm tracking-wide">
                  <span>Question {currentQIndex + 1} of {interactiveQuizData.length}</span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-800 leading-snug">
                  {qData.question}
                </h3>

                <div className="space-y-3 pt-4">
                  {qData.options.map((option, idx) => {
                    const isSelected = selectedAnswer === idx;
                    const isCorrect = selectedAnswer !== null && idx === qData.correctAnswer;
                    const isWrong = isSelected && !isCorrect;
                    
                    let bgClass = "bg-white border-slate-200 hover:border-emerald-300 hover:bg-emerald-50";
                    let icon = null;

                    if (selectedAnswer !== null) {
                      if (isCorrect) {
                        bgClass = "bg-emerald-50 border-emerald-500 text-emerald-700";
                        icon = <CheckCircle2 size={18} className="text-emerald-500" />;
                      } else if (isWrong) {
                        bgClass = "bg-red-50 border-red-500 text-red-700";
                        icon = <XCircle size={18} className="text-red-500" />;
                      } else {
                        bgClass = "bg-slate-50 border-slate-200 text-slate-400 opacity-50";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={selectedAnswer !== null}
                        onClick={() => handleAnswerSelect(idx)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-between font-medium ${bgClass}`}
                      >
                        {option}
                        {icon}
                      </button>
                    )
                  })}
                </div>

                {/* Explanation Area */}
                <AnimatePresence>
                  {selectedAnswer !== null && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                    >
                      <div className={`p-4 rounded-xl ${selectedAnswer === qData.correctAnswer ? 'bg-emerald-50 border border-emerald-100 text-emerald-800' : 'bg-orange-50 border border-orange-100 text-orange-800'}`}>
                        <p className="text-sm font-semibold mb-1">Explanation:</p>
                        <p className="text-sm opacity-90">{qData.explanation}</p>
                      </div>

                      <div className="mt-6 flex justify-end">
                        <button 
                          onClick={nextQuestion}
                          className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition-colors"
                        >
                          {currentQIndex === interactiveQuizData.length - 1 ? 'See Results' : 'Next Question'}
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div 
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-24 h-24 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-6">
                  <CheckCircle2 size={48} className="text-emerald-500" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-2">Quiz Complete!</h2>
                <p className="text-slate-600 mb-8">
                  You scored <strong className="text-slate-900 border-b-2 border-emerald-400">{score}</strong> out of <strong className="text-slate-900">{interactiveQuizData.length}</strong>.
                </p>
                <button 
                  onClick={restartQuiz}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors font-medium"
                >
                  <RotateCcw size={16} /> Retry Quiz
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </FadeIn>
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
          <button onClick={() => setActiveTab('interactive')} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5 ml-2 ${activeTab === 'interactive' ? 'bg-emerald-500 text-white shadow-lg' : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'}`}>
            <CheckCircle2 size={16} /> Interactive Practice
          </button>
        </div>
      </FadeIn>

      {activeTab === 'ddl' && renderContent(ddlContent, "#0ea5e9")}
      {activeTab === 'dml' && renderContent(dmlContent, "#7c3aed")}
      {activeTab === 'queries' && renderContent(queryContent, "#f59f00")}
      {activeTab === 'relational' && renderContent(relationalAlgebraContent, "#e64980")}
      {activeTab === 'interactive' && renderInteractiveQuiz()}
    </div>
  );
}
