"use client";

import { useState } from "react";
import Link from "next/link";

export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number; // index of correct option
  explanation: string;
}

export function QuizEngine({ title, questions, backHref }: { title: string; questions: Question[]; backHref: string }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[currentQ];

  function handleSelect(idx: number) {
    if (showExplanation) return;
    setSelected(idx);
    setShowExplanation(true);
    setAnswered((a) => a + 1);
    if (idx === q.correct) {
      setScore((s) => s + 1);
    }
  }

  function handleNext() {
    if (currentQ + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrentQ((c) => c + 1);
      setSelected(null);
      setShowExplanation(false);
    }
  }

  function handleRestart() {
    setCurrentQ(0);
    setSelected(null);
    setShowExplanation(false);
    setScore(0);
    setAnswered(0);
    setFinished(false);
  }

  const pct = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  if (finished) {
    return (
      <div className="text-center py-5">
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px",
          padding: "2.5rem",
          maxWidth: "500px",
          margin: "0 auto",
        }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
            {pct >= 80 ? "🏆" : pct >= 60 ? "👏" : pct >= 40 ? "📚" : "💪"}
          </div>
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.6rem", marginBottom: "0.5rem" }}>
            Quiz Complete!
          </h2>
          <p style={{ color: "#94a3b8", marginBottom: "1rem" }}>{title}</p>
          <div style={{
            fontSize: "2.5rem",
            fontWeight: 800,
            color: pct >= 80 ? "#10b981" : pct >= 60 ? "#f59e0b" : "#f87171",
            marginBottom: "0.5rem",
          }}>
            {score}/{questions.length}
          </div>
          <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>
            {pct}% correct — {pct >= 80 ? "Excellent! You're SE-ready." : pct >= 60 ? "Good foundation. Review missed topics." : pct >= 40 ? "Keep studying — revisit the weak areas." : "Time to hit the study guide hard!"}
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <button onClick={handleRestart} className="btn-glow">
              Retake Quiz
            </button>
            <Link href={backHref} className="btn-glow" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
              All Quizzes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Progress Bar */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
          Question {currentQ + 1} of {questions.length}
        </span>
        <span style={{ color: "#818cf8", fontSize: "0.85rem", fontWeight: 600 }}>
          Score: {score}/{answered}
        </span>
      </div>
      <div style={{
        background: "rgba(255,255,255,0.06)",
        borderRadius: "8px",
        height: "6px",
        marginBottom: "2rem",
        overflow: "hidden",
      }}>
        <div style={{
          background: "linear-gradient(90deg, #667eea, #764ba2)",
          height: "100%",
          width: `${((currentQ + (showExplanation ? 1 : 0)) / questions.length) * 100}%`,
          transition: "width 0.3s ease",
          borderRadius: "8px",
        }} />
      </div>

      {/* Question */}
      <div style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "14px",
        padding: "1.75rem",
        marginBottom: "1.5rem",
      }}>
        <h3 style={{ color: "#fff", fontSize: "1.1rem", fontWeight: 600, lineHeight: 1.7, marginBottom: 0 }}>
          {q.question}
        </h3>
      </div>

      {/* Options */}
      <div className="d-flex flex-column gap-2 mb-4">
        {q.options.map((opt, idx) => {
          let bg = "rgba(255,255,255,0.03)";
          let border = "1px solid rgba(255,255,255,0.08)";
          let color = "#cbd5e1";

          if (showExplanation) {
            if (idx === q.correct) {
              bg = "rgba(16,185,129,0.12)";
              border = "1px solid rgba(16,185,129,0.4)";
              color = "#10b981";
            } else if (idx === selected && idx !== q.correct) {
              bg = "rgba(239,68,68,0.12)";
              border = "1px solid rgba(239,68,68,0.4)";
              color = "#f87171";
            }
          } else if (idx === selected) {
            bg = "rgba(102,126,234,0.12)";
            border = "1px solid rgba(102,126,234,0.4)";
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={showExplanation}
              style={{
                background: bg,
                border,
                borderRadius: "10px",
                padding: "0.85rem 1.25rem",
                textAlign: "left",
                color,
                fontSize: "0.95rem",
                cursor: showExplanation ? "default" : "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                border: `2px solid ${showExplanation && idx === q.correct ? "#10b981" : showExplanation && idx === selected ? "#f87171" : "rgba(255,255,255,0.15)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.75rem",
                fontWeight: 700,
                flexShrink: 0,
                color: showExplanation && idx === q.correct ? "#10b981" : showExplanation && idx === selected ? "#f87171" : "#64748b",
              }}>
                {String.fromCharCode(65 + idx)}
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div style={{
          background: selected === q.correct ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.08)",
          border: `1px solid ${selected === q.correct ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)"}`,
          borderRadius: "12px",
          padding: "1.25rem",
          marginBottom: "1.5rem",
        }}>
          <p style={{
            color: selected === q.correct ? "#10b981" : "#f87171",
            fontWeight: 700,
            fontSize: "0.85rem",
            marginBottom: "0.4rem",
          }}>
            {selected === q.correct ? "✅ Correct!" : "❌ Incorrect"}
          </p>
          <p style={{ color: "#cbd5e1", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: 0 }}>
            {q.explanation}
          </p>
        </div>
      )}

      {/* Next */}
      {showExplanation && (
        <div className="text-end">
          <button onClick={handleNext} className="btn-glow">
            {currentQ + 1 >= questions.length ? "See Results" : "Next Question →"}
          </button>
        </div>
      )}
    </div>
  );
}
