import Link from "next/link";

export default function CreativeAgentPage() {
  return (
    <main className="py-5">
      <div className="container" style={{ maxWidth: "1100px" }}>
        <Link href="/blog/architectures" style={{ color: "#667eea", textDecoration: "none", fontSize: "0.9rem" }}>
          ← Back to Architecture Patterns
        </Link>

        <div className="mt-3 mb-5">
          <span style={{ background: "rgba(236,72,153,0.15)", color: "#f472b6", padding: "0.2rem 0.6rem", borderRadius: "12px", fontSize: "0.75rem", fontWeight: 600 }}>
            Architecture Pattern
          </span>
          <h1 className="mt-2" style={{ fontSize: "2.2rem", fontWeight: 800, color: "#fff" }}>
            🎨 Creative Agent Platform
          </h1>
          <p style={{ color: "#94a3b8", maxWidth: "700px", lineHeight: 1.7 }}>
            How FLORA built FAUNA — a creative AI agent that fans out into parallel image generation jobs on Vercel&apos;s AI stack.
            DurableAgent from Workflow SDK persists state across long-running visual iterations. Fluid Compute handles concurrency efficiently.
          </p>
        </div>

        {/* How FLORA Works */}
        <section className="mb-5">
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>How FAUNA Works</h2>
          <div className="d-flex flex-column gap-3">
            {[
              { step: "1", title: "User Describes Vision", desc: "User provides a creative brief — mood, style, subject, constraints. The agent interprets intent.", color: "#667eea" },
              { step: "2", title: "Agent Plans Variations", desc: "FAUNA generates a plan: 4-8 parallel image variations with different styles, compositions, and color palettes.", color: "#8b5cf6" },
              { step: "3", title: "Parallel Fan-Out", desc: "Workflow SDK fans out into parallel image generation jobs. Each job runs on Fluid Compute with shared instances.", color: "#06b6d4" },
              { step: "4", title: "DurableAgent Persists State", desc: "Each step is checkpointed. If a job times out or fails, it resumes from the last checkpoint — not from scratch.", color: "#10b981" },
              { step: "5", title: "User Iterates", desc: "User selects preferred variations. Agent refines with new constraints. Each iteration is a new durable workflow.", color: "#f59e0b" },
              { step: "6", title: "Final Output", desc: "High-res final images generated. Stored in Vercel Blob. Shareable via CDN URLs.", color: "#ec4899" },
            ].map((s) => (
              <div key={s.step} className="d-flex gap-3" style={{ background: `${s.color}08`, border: `1px solid ${s.color}22`, borderRadius: "10px", padding: "1rem 1.25rem" }}>
                <div style={{ background: `${s.color}22`, color: s.color, width: "36px", height: "36px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.9rem", flexShrink: 0 }}>{s.step}</div>
                <div>
                  <h4 style={{ color: s.color, fontSize: "0.92rem", fontWeight: 700, marginBottom: "0.2rem" }}>{s.title}</h4>
                  <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.5, marginBottom: 0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-5">
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>Technology Stack</h2>
          <div className="row g-3">
            {[
              { name: "AI SDK", desc: "Unified model interface for GPT-4o (text understanding) and image models. Tool calling for structured agent actions.", color: "#667eea" },
              { name: "Workflow SDK + DurableAgent", desc: "Each creative iteration is a durable workflow with checkpointed steps. Fan-out/fan-in pattern for parallel generation.", color: "#8b5cf6" },
              { name: "Fluid Compute", desc: "Parallel image generation jobs share instances. Active CPU billing means I/O wait (model inference) is free.", color: "#06b6d4" },
              { name: "Vercel Sandbox", desc: "AI-generated image processing scripts run in isolated environments. No security risk to host.", color: "#10b981" },
              { name: "Vercel Blob", desc: "Generated images stored in globally-distributed blob storage. CDN URLs for instant sharing.", color: "#f59e0b" },
              { name: "Next.js Frontend", desc: "RSC shell loads instantly. Client components handle real-time progress updates and image gallery.", color: "#ec4899" },
            ].map((t) => (
              <div key={t.name} className="col-md-6">
                <div style={{ background: `${t.color}08`, border: `1px solid ${t.color}22`, borderRadius: "10px", padding: "1rem", height: "100%" }}>
                  <span style={{ color: t.color, fontSize: "0.88rem", fontWeight: 700 }}>{t.name}</span>
                  <p style={{ color: "#94a3b8", fontSize: "0.83rem", lineHeight: 1.5, marginBottom: 0, marginTop: "0.3rem" }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Durable is Key */}
        <section className="mb-5">
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>Why Durable Workflows Matter</h2>
          <div style={{ background: "rgba(102,126,234,0.06)", border: "1px solid rgba(102,126,234,0.15)", borderRadius: "12px", padding: "1.5rem" }}>
            <div className="row g-3">
              <div className="col-md-6">
                <h4 style={{ color: "#f59e0b", fontSize: "0.9rem", fontWeight: 700 }}>❌ Without Workflows</h4>
                <ul style={{ color: "#94a3b8", fontSize: "0.83rem", lineHeight: 1.8, paddingLeft: "1.1rem", marginBottom: 0 }}>
                  <li>Function timeout at 5 min → entire generation lost</li>
                  <li>Retry means starting all 8 image jobs from scratch</li>
                  <li>No persistence between iterations</li>
                  <li>User waits with no progress indication</li>
                </ul>
              </div>
              <div className="col-md-6">
                <h4 style={{ color: "#10b981", fontSize: "0.9rem", fontWeight: 700 }}>✅ With DurableAgent</h4>
                <ul style={{ color: "#94a3b8", fontSize: "0.83rem", lineHeight: 1.8, paddingLeft: "1.1rem", marginBottom: 0 }}>
                  <li>Each image job is a separate durable step</li>
                  <li>Timeout? Resume from last completed step</li>
                  <li>State persisted across user iterations</li>
                  <li>Real-time progress updates per step</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SE Takeaway */}
        <section className="mb-5">
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>🎯 SE Interview Takeaway</h2>
          <div className="feature-card" style={{ padding: "1.25rem" }}>
            <p style={{ color: "#cbd5e1", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: 0 }}>
              FLORA&apos;s FAUNA demonstrates the <strong style={{ color: "#818cf8" }}>fan-out/fan-in pattern</strong> — a critical Vercel architecture.
              The Workflow SDK orchestrates parallel jobs, DurableAgent persists state, and Fluid Compute handles concurrency cost-efficiently.
              This pattern applies to any multi-step AI pipeline: research agents, content generation, data processing, and automated testing.
            </p>
          </div>
        </section>

        <div className="text-center py-4">
          <a href="https://vercel.com/blog/how-flora-shipped-a-creative-agent-on-vercels-ai-stack" target="_blank" rel="noopener noreferrer" className="btn-glow" style={{ marginRight: "1rem" }}>
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
