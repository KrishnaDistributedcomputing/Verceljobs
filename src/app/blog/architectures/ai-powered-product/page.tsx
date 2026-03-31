import Link from "next/link";

const architectureLayers = [
  { name: "Chat UI (Next.js + useChat)", detail: "useChat() hook for streaming message rendering, input handling, and message history. React Server Components for fast shell load.", color: "#667eea" },
  { name: "Streaming API (Vercel Functions)", detail: "streamText() with AI SDK sends LLM tokens progressively. Fluid Compute bills only active CPU — 80-90% savings for streaming.", color: "#8b5cf6" },
  { name: "AI Gateway", detail: "Route to 100+ models with failover. OpenAI primary, Anthropic fallback. Rate limiting, cost tracking per model/user, prompt caching.", color: "#06b6d4" },
  { name: "Tool Calling & Agents", detail: "AI SDK 6 structured tool calling. Multi-step agents with use-workflow for durable orchestration that survives function timeouts.", color: "#10b981" },
  { name: "Vector Database (RAG)", detail: "Pinecone, Qdrant, or Weaviate for semantic search over documents. Retrieval-Augmented Generation for grounded responses.", color: "#f59e0b" },
  { name: "Sandbox (Code Execution)", detail: "Vercel Sandbox for isolated JavaScript/TypeScript execution. AI agents can safely run generated code.", color: "#ec4899" },
];

const costComparison = [
  { scenario: "30s LLM streaming", traditional: "30,000ms billed", fluid: "200ms billed", savings: "99.3%" },
  { scenario: "5s RAG query", traditional: "5,000ms billed", fluid: "400ms billed", savings: "92%" },
  { scenario: "Multi-step agent (3 LLM calls)", traditional: "45,000ms billed", fluid: "600ms billed", savings: "98.7%" },
];

export default function AIPoweredProductPage() {
  return (
    <main className="py-5">
      <div className="container" style={{ maxWidth: "1100px" }}>
        <Link href="/blog/architectures" style={{ color: "#667eea", textDecoration: "none", fontSize: "0.9rem" }}>
          ← Back to Architecture Patterns
        </Link>

        <div className="mt-3 mb-5">
          <span style={{ background: "rgba(245,158,11,0.15)", color: "#fbbf24", padding: "0.2rem 0.6rem", borderRadius: "12px", fontSize: "0.75rem", fontWeight: 600 }}>
            Architecture Pattern
          </span>
          <h1 className="mt-2" style={{ fontSize: "2.2rem", fontWeight: 800, color: "#fff" }}>
            🤖 AI-Powered Product (Chat/Agent)
          </h1>
          <p style={{ color: "#94a3b8", maxWidth: "700px", lineHeight: 1.7 }}>
            Build AI chatbots, document analyzers, code generators, and multi-agent workflows using Vercel&apos;s AI Cloud layer.
            AI SDK for model abstraction, AI Gateway for routing, Fluid Compute for cost-efficient streaming, and Workflows for durable agents.
          </p>
        </div>

        {/* Why Vercel for AI */}
        <section className="mb-5">
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>Why Vercel for AI Apps?</h2>
          <div className="row g-3">
            {[
              { title: "Provider Agnostic", desc: "AI SDK lets you swap OpenAI → Anthropic → Google in one line. No rewrite, no business logic changes.", icon: "🔄" },
              { title: "98% Cost Reduction", desc: "Fluid Compute bills only active CPU. A 30s stream with 200ms CPU = 200ms cost. Transformative for AI.", icon: "💰" },
              { title: "Durable Agents", desc: "use-workflow provides checkpointed steps. Multi-step agents survive function timeouts with automatic resume.", icon: "🛡️" },
              { title: "Global Low Latency", desc: "Edge Network + regional functions ensure fast first-token time for users worldwide.", icon: "🌍" },
            ].map((b) => (
              <div key={b.title} className="col-md-6">
                <div className="feature-card" style={{ padding: "1.25rem", height: "100%" }}>
                  <h4 style={{ color: "#fbbf24", fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.3rem" }}>{b.icon} {b.title}</h4>
                  <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: 0 }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Architecture */}
        <section className="mb-5">
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>Architecture Layers</h2>
          <div className="d-flex flex-column gap-2">
            {architectureLayers.map((l) => (
              <div key={l.name} style={{ background: `${l.color}0a`, border: `1px solid ${l.color}22`, borderRadius: "10px", padding: "1rem 1.25rem" }}>
                <h4 style={{ color: l.color, fontSize: "0.92rem", fontWeight: 700, marginBottom: "0.25rem" }}>{l.name}</h4>
                <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.5, marginBottom: 0 }}>{l.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Code Example */}
        <section className="mb-5">
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>Streaming Chat — Code Example</h2>
          <div className="row g-3">
            <div className="col-md-6">
              <h4 style={{ color: "#8b5cf6", fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.5rem" }}>Server: API Route</h4>
              <pre style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "0.75rem 1rem", fontSize: "0.75rem", color: "#cbd5e1", overflow: "auto" }}>
                <code>{`// app/api/chat/route.ts
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(request) {
  const { messages } = await request.json();

  const result = streamText({
    model: openai('gpt-4o'),
    messages,
    system: 'You are a helpful assistant.',
  });

  return result.toDataStreamResponse();
}
// With Fluid Compute:
// 10s stream, 200ms CPU = billed 200ms`}</code>
              </pre>
            </div>
            <div className="col-md-6">
              <h4 style={{ color: "#06b6d4", fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.5rem" }}>Client: Chat UI</h4>
              <pre style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "0.75rem 1rem", fontSize: "0.75rem", color: "#cbd5e1", overflow: "auto" }}>
                <code>{`'use client';
import { useChat } from '@ai-sdk/react';

export default function Chat() {
  const { messages, input, 
    handleInputChange, handleSubmit 
  } = useChat();

  return (
    <div>
      {messages.map(m => (
        <div key={m.id}>
          {m.role}: {m.content}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input value={input} 
          onChange={handleInputChange} />
      </form>
    </div>
  );
}`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Cost Comparison */}
        <section className="mb-5">
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>💰 Fluid Compute Cost Impact</h2>
          <div className="table-responsive">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "rgba(102,126,234,0.15)" }}>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.6rem 1rem", color: "#fff", fontWeight: 600 }}>Scenario</th>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.6rem 1rem", color: "#f59e0b", fontWeight: 600 }}>Traditional</th>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.6rem 1rem", color: "#10b981", fontWeight: 600 }}>Fluid Compute</th>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.6rem 1rem", color: "#10b981", fontWeight: 600 }}>Savings</th>
                </tr>
              </thead>
              <tbody>
                {costComparison.map((r, i) => (
                  <tr key={r.scenario} style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)" }}>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.55rem 1rem", color: "#cbd5e1", fontSize: "0.85rem" }}>{r.scenario}</td>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.55rem 1rem", color: "#f59e0b", fontSize: "0.85rem" }}>{r.traditional}</td>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.55rem 1rem", color: "#10b981", fontSize: "0.85rem", fontWeight: 600 }}>{r.fluid}</td>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.55rem 1rem", color: "#10b981", fontSize: "0.85rem", fontWeight: 700 }}>{r.savings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Customer Example */}
        <section className="mb-5">
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>Customer Spotlight: SERHANT.</h2>
          <div style={{ background: "rgba(102,126,234,0.06)", border: "1px solid rgba(102,126,234,0.15)", borderRadius: "12px", padding: "1.5rem" }}>
            <p style={{ color: "#cbd5e1", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "0.75rem" }}>
              Real estate tech company SERHANT. orchestrates <strong style={{ color: "#fbbf24" }}>OpenAI + Claude + Gemini per task type</strong> using AI Gateway.
              Property descriptions use GPT-4o. Market analysis uses Claude. Visual processing uses Gemini.
            </p>
            <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: 0 }}>
              AI Gateway routes each task to the optimal model automatically, with fallback if any provider has an outage.
              Cost tracking per model gives their finance team full visibility into AI spend.
            </p>
          </div>
        </section>

        <div className="text-center py-4">
          <a href="https://vercel.com/solutions/ai-apps" target="_blank" rel="noopener noreferrer" className="btn-glow" style={{ marginRight: "1rem" }}>
            Read on Vercel Blog →
          </a>
          <Link href="/blog/architectures" className="btn-glow" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
            ← All Architectures
          </Link>
        </div>
      </div>
    </main>
  );
}
