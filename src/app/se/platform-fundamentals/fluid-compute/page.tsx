import Link from "next/link";

/* ── Fluid Compute Features (expanded) ── */
const fluidFeatures = [
  {
    title: "Shared Instances (Concurrency)",
    icon: "🔄",
    color: "#8b5cf6",
    summary: "Multiple invocations share the same physical instance concurrently.",
    details: [
      "Traditional serverless: 1 request = 1 container. Request finishes → container idles → cold starts again.",
      "Fluid Compute: Multiple concurrent requests share one warm instance — like a mini-server that auto-scales.",
      "Instance stays warm as long as there's traffic. New instances spin up when existing ones hit concurrency limits.",
      "Result: Dramatically fewer cold starts. For high-traffic routes, cold starts effectively disappear.",
    ],
    beforeAfter: { before: "100 concurrent requests = 100 cold containers", after: "100 concurrent requests ≈ 5-10 warm shared instances" },
  },
  {
    title: "Active CPU Pricing",
    icon: "💰",
    color: "#10b981",
    summary: "Pay only for milliseconds your code executes on CPU — not for I/O wait.",
    details: [
      "Traditional billing: Function runs for 10 seconds → billed for 10 seconds, even if 9.8s is waiting for a database or LLM response.",
      "Active CPU billing: Only the time your code is actively using the CPU counts. I/O wait (network, DB, LLM streaming) is free.",
      "This is transformative for AI applications where 90%+ of function time is waiting for model responses.",
      "Also benefits any function that makes external API calls, database queries, or file uploads — basically everything.",
    ],
    beforeAfter: { before: "10s LLM stream = 10,000ms billed", after: "10s LLM stream, 200ms CPU = 200ms billed (98% savings)" },
  },
  {
    title: "Bytecode Caching",
    icon: "⚡",
    color: "#06b6d4",
    summary: "V8 bytecode is cached across invocations, eliminating parse/compile overhead.",
    details: [
      "JavaScript is parsed and compiled to bytecode on first execution. For large applications, this can take 50-200ms.",
      "Bytecode caching stores the compiled bytecode for subsequent invocations. The V8 engine skips parsing entirely.",
      "This benefits all function invocations: both cold starts (bytecode is pre-cached) and warm starts (already compiled).",
      "Particularly impactful for large Node.js applications with many dependencies (React SSR, heavy frameworks).",
    ],
    beforeAfter: { before: "Every invocation: parse JS → compile → execute", after: "First invocation: parse + cache | Subsequent: execute directly" },
  },
  {
    title: "Error Isolation",
    icon: "🛡️",
    color: "#f59e0b",
    summary: "Unhandled errors in one concurrent request do not crash other requests.",
    details: [
      "Since multiple requests share an instance, a crash in one request could theoretically affect others.",
      "Fluid Compute isolates error boundaries per request. An unhandled exception terminates only the affected request.",
      "Other concurrent requests on the same instance continue processing normally.",
      "This is critical for production reliability — you get the economics of sharing without the blast radius.",
    ],
    beforeAfter: { before: "Shared process crash = all requests fail", after: "Isolated error = only the failing request returns 500" },
  },
  {
    title: "Multi-Region Failover",
    icon: "🌍",
    color: "#667eea",
    summary: "Enterprise: automatic failover to another AZ or region if infrastructure fails.",
    details: [
      "Enterprise plans get automatic regional failover. If an Availability Zone goes down, requests route to another AZ in the same region.",
      "If the entire region fails, traffic automatically routes to the next closest region.",
      "Combined with global Edge Network, this provides near-zero-downtime resilience for mission-critical applications.",
      "No configuration needed — failover is automatic and transparent to the application.",
    ],
    beforeAfter: { before: "Region outage = application downtime", after: "Region outage = automatic failover, minimal latency impact" },
  },
  {
    title: "Smart Scaling",
    icon: "📈",
    color: "#ec4899",
    summary: "Instances scale based on actual demand, not pre-configured thresholds.",
    details: [
      "Fluid Compute monitors CPU utilisation and request queue depth to decide when to scale.",
      "New instances are added when existing instances approach their concurrency limits — not when cold-start triggers fire.",
      "Scales down gracefully: instances with no pending requests are drained and terminated.",
      "No min/max instance configuration needed. The system optimises automatically.",
    ],
    beforeAfter: { before: "Configure min/max instances, guess at capacity", after: "Zero config — instances scale with actual demand" },
  },
];

/* ── Cost Comparison Scenarios ── */
const costScenarios = [
  {
    name: "AI Chatbot (Streaming LLM)",
    traditional: { duration: "8,000ms", cpuTime: "150ms", billedTime: "8,000ms", monthlyCost: "$2,400" },
    fluid: { duration: "8,000ms", cpuTime: "150ms", billedTime: "150ms", monthlyCost: "$45" },
    savings: "98%",
    explanation: "LLM streaming is almost entirely I/O wait. The function sends a prompt and streams tokens back. Actual CPU work (parsing, formatting) is minimal.",
  },
  {
    name: "SSR Dashboard (DB Query)",
    traditional: { duration: "500ms", cpuTime: "120ms", billedTime: "500ms", monthlyCost: "$150" },
    fluid: { duration: "500ms", cpuTime: "120ms", billedTime: "120ms", monthlyCost: "$36" },
    savings: "76%",
    explanation: "Database queries typically take 200-400ms of network/wait time. The CPU work (query building, response serialisation) is much smaller.",
  },
  {
    name: "API Route (External API Call)",
    traditional: { duration: "1,200ms", cpuTime: "80ms", billedTime: "1,200ms", monthlyCost: "$360" },
    fluid: { duration: "1,200ms", cpuTime: "80ms", billedTime: "80ms", monthlyCost: "$24" },
    savings: "93%",
    explanation: "Calling third-party APIs (payment processors, CRM systems) involves significant network latency. Active CPU billing ignores this wait time.",
  },
  {
    name: "Image Processing",
    traditional: { duration: "3,000ms", cpuTime: "2,800ms", billedTime: "3,000ms", monthlyCost: "$900" },
    fluid: { duration: "3,000ms", cpuTime: "2,800ms", billedTime: "2,800ms", monthlyCost: "$840" },
    savings: "7%",
    explanation: "CPU-intensive tasks like image resizing see minimal savings because most of the time IS active CPU usage. Fluid Compute still helps via shared instances (fewer cold starts).",
  },
];

/* ── Timeline ── */
const timeline = [
  { date: "April 23, 2025", event: "Fluid Compute enabled by default for all new projects" },
  { date: "Mid-2025", event: "Vercel Functions unified umbrella — Edge + Serverless under one API" },
  { date: "Ongoing", event: "Existing projects can opt-in via project settings" },
];

export default function FluidComputePage() {
  return (
    <main className="py-5">
      <div className="container" style={{ maxWidth: "1100px" }}>
        <Link href="/se/platform-fundamentals" style={{ color: "#667eea", textDecoration: "none", fontSize: "0.9rem" }}>
          ← Back to Platform Fundamentals
        </Link>

        <div className="mt-3 mb-5">
          <span style={{ background: "rgba(16,185,129,0.15)", color: "#34d399", padding: "0.2rem 0.6rem", borderRadius: "12px", fontSize: "0.75rem", fontWeight: 600 }}>
            Fluid Compute
          </span>
          <h1 className="mt-2" style={{ fontSize: "2.2rem", fontWeight: 800, color: "#fff" }}>
            🌊 Fluid Compute — The 2025 Game Changer
          </h1>
          <p style={{ color: "#94a3b8", maxWidth: "700px", lineHeight: 1.7 }}>
            Vercel&apos;s biggest architectural evolution. Fluid Compute turns serverless functions into shared, efficiently-billed compute
            instances — delivering server-like performance with serverless simplicity. Enabled by default since April 23, 2025.
          </p>
        </div>

        {/* ─── How It Works Conceptually ─── */}
        <section className="mb-5">
          <h2 className="mb-3" style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem" }}>
            How Fluid Compute Works
          </h2>
          <div style={{
            background: "rgba(102,126,234,0.06)",
            border: "1px solid rgba(102,126,234,0.15)",
            borderRadius: "12px",
            padding: "1.5rem",
            marginBottom: "1.5rem",
          }}>
            <div className="row g-3">
              <div className="col-md-6">
                <h4 style={{ color: "#f59e0b", fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.5rem" }}>❌ Traditional Serverless</h4>
                <div style={{ color: "#94a3b8", fontSize: "0.83rem", lineHeight: 1.8 }}>
                  <p style={{ marginBottom: "0.3rem" }}>1. Request arrives → cold start container</p>
                  <p style={{ marginBottom: "0.3rem" }}>2. Execute function (CPU + I/O wait)</p>
                  <p style={{ marginBottom: "0.3rem" }}>3. Respond → container idles</p>
                  <p style={{ marginBottom: "0.3rem" }}>4. Next request → likely another cold start</p>
                  <p style={{ marginBottom: "0.3rem", color: "#f59e0b", fontWeight: 600 }}>Billed: total duration including I/O wait</p>
                </div>
              </div>
              <div className="col-md-6">
                <h4 style={{ color: "#10b981", fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.5rem" }}>✅ Fluid Compute</h4>
                <div style={{ color: "#94a3b8", fontSize: "0.83rem", lineHeight: 1.8 }}>
                  <p style={{ marginBottom: "0.3rem" }}>1. Request arrives → routed to warm instance</p>
                  <p style={{ marginBottom: "0.3rem" }}>2. Execute concurrently with other requests</p>
                  <p style={{ marginBottom: "0.3rem" }}>3. Respond → instance stays warm for next request</p>
                  <p style={{ marginBottom: "0.3rem" }}>4. Next request → same warm instance (zero cold start)</p>
                  <p style={{ marginBottom: "0.3rem", color: "#10b981", fontWeight: 600 }}>Billed: only active CPU milliseconds</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Feature Deep Dives ─── */}
        <section className="mb-5">
          <h2 className="mb-3" style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem" }}>
            Six Core Capabilities
          </h2>
          <div className="d-flex flex-column gap-4">
            {fluidFeatures.map((f) => (
              <div key={f.title} style={{
                background: `${f.color}08`,
                border: `1px solid ${f.color}22`,
                borderRadius: "12px",
                padding: "1.5rem",
              }}>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span style={{ fontSize: "1.3rem" }}>{f.icon}</span>
                  <h3 style={{ color: f.color, fontSize: "1.1rem", fontWeight: 700, marginBottom: 0 }}>{f.title}</h3>
                </div>
                <p style={{ color: "#cbd5e1", fontSize: "0.9rem", fontWeight: 500, marginBottom: "0.75rem" }}>{f.summary}</p>
                <ul style={{ paddingLeft: "1.1rem", marginBottom: "1rem" }}>
                  {f.details.map((d, i) => (
                    <li key={i} style={{ color: "#94a3b8", fontSize: "0.83rem", lineHeight: 1.7, marginBottom: "0.3rem" }}>{d}</li>
                  ))}
                </ul>
                <div className="row g-2">
                  <div className="col-md-6">
                    <div style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.15)", borderRadius: "8px", padding: "0.7rem 1rem" }}>
                      <p style={{ color: "#f59e0b", fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.2rem" }}>Before (Traditional)</p>
                      <p style={{ color: "#94a3b8", fontSize: "0.8rem", marginBottom: 0 }}>{f.beforeAfter.before}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: "8px", padding: "0.7rem 1rem" }}>
                      <p style={{ color: "#10b981", fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.2rem" }}>After (Fluid Compute)</p>
                      <p style={{ color: "#94a3b8", fontSize: "0.8rem", marginBottom: 0 }}>{f.beforeAfter.after}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Cost Comparison ─── */}
        <section className="mb-5">
          <h2 className="mb-3" style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem" }}>
            💰 Cost Impact — Real Scenarios
          </h2>
          <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>
            Based on 1M invocations/month. Numbers are illustrative — actual savings depend on your workload profile.
          </p>
          <div className="d-flex flex-column gap-4">
            {costScenarios.map((s) => (
              <div key={s.name} className="feature-card" style={{ padding: "1.5rem" }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: 0 }}>{s.name}</h3>
                  <span style={{
                    background: "rgba(16,185,129,0.15)",
                    color: "#10b981",
                    padding: "0.2rem 0.8rem",
                    borderRadius: "20px",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                  }}>
                    {s.savings} savings
                  </span>
                </div>
                <div className="table-responsive mb-3">
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "rgba(102,126,234,0.1)" }}>
                        <th style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.5rem 0.8rem", color: "#94a3b8", fontWeight: 600, fontSize: "0.78rem" }}>Metric</th>
                        <th style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.5rem 0.8rem", color: "#f59e0b", fontWeight: 600, fontSize: "0.78rem" }}>Traditional</th>
                        <th style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.5rem 0.8rem", color: "#10b981", fontWeight: 600, fontSize: "0.78rem" }}>Fluid Compute</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ border: "1px solid rgba(255,255,255,0.06)", padding: "0.4rem 0.8rem", color: "#cbd5e1", fontSize: "0.8rem" }}>Duration</td>
                        <td style={{ border: "1px solid rgba(255,255,255,0.06)", padding: "0.4rem 0.8rem", color: "#94a3b8", fontSize: "0.8rem" }}>{s.traditional.duration}</td>
                        <td style={{ border: "1px solid rgba(255,255,255,0.06)", padding: "0.4rem 0.8rem", color: "#94a3b8", fontSize: "0.8rem" }}>{s.fluid.duration}</td>
                      </tr>
                      <tr>
                        <td style={{ border: "1px solid rgba(255,255,255,0.06)", padding: "0.4rem 0.8rem", color: "#cbd5e1", fontSize: "0.8rem" }}>Active CPU</td>
                        <td style={{ border: "1px solid rgba(255,255,255,0.06)", padding: "0.4rem 0.8rem", color: "#94a3b8", fontSize: "0.8rem" }}>{s.traditional.cpuTime}</td>
                        <td style={{ border: "1px solid rgba(255,255,255,0.06)", padding: "0.4rem 0.8rem", color: "#94a3b8", fontSize: "0.8rem" }}>{s.fluid.cpuTime}</td>
                      </tr>
                      <tr>
                        <td style={{ border: "1px solid rgba(255,255,255,0.06)", padding: "0.4rem 0.8rem", color: "#cbd5e1", fontSize: "0.8rem", fontWeight: 600 }}>Billed Time</td>
                        <td style={{ border: "1px solid rgba(255,255,255,0.06)", padding: "0.4rem 0.8rem", color: "#f59e0b", fontSize: "0.8rem", fontWeight: 600 }}>{s.traditional.billedTime}</td>
                        <td style={{ border: "1px solid rgba(255,255,255,0.06)", padding: "0.4rem 0.8rem", color: "#10b981", fontSize: "0.8rem", fontWeight: 600 }}>{s.fluid.billedTime}</td>
                      </tr>
                      <tr>
                        <td style={{ border: "1px solid rgba(255,255,255,0.06)", padding: "0.4rem 0.8rem", color: "#cbd5e1", fontSize: "0.8rem", fontWeight: 600 }}>Est. Monthly (1M inv)</td>
                        <td style={{ border: "1px solid rgba(255,255,255,0.06)", padding: "0.4rem 0.8rem", color: "#f59e0b", fontSize: "0.8rem", fontWeight: 600 }}>{s.traditional.monthlyCost}</td>
                        <td style={{ border: "1px solid rgba(255,255,255,0.06)", padding: "0.4rem 0.8rem", color: "#10b981", fontSize: "0.8rem", fontWeight: 600 }}>{s.fluid.monthlyCost}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p style={{ color: "#94a3b8", fontSize: "0.82rem", fontStyle: "italic", marginBottom: 0 }}>{s.explanation}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SE Interview Talking Points ─── */}
        <section className="mb-5">
          <h2 className="mb-3" style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem" }}>
            🎯 SE Interview Talking Points
          </h2>
          <div className="row g-3">
            {[
              { q: "What is Fluid Compute?", a: "Fluid Compute evolves serverless functions from single-use containers to shared, concurrent instances with active CPU billing. It delivers server-like performance and economics without the operational complexity of managing servers." },
              { q: "How does it reduce costs?", a: "Two ways: (1) Shared instances eliminate most cold starts, reducing wasted compute. (2) Active CPU billing means you only pay for CPU cycles — not I/O wait. For AI apps, this can mean 80-98% cost reduction." },
              { q: "What about CPU-intensive workloads?", a: "CPU-intensive workloads (image processing, video encoding) see minimal billing savings because most time IS CPU time. But they still benefit from shared instances (fewer cold starts) and bytecode caching." },
              { q: "How does error isolation work?", a: "Each concurrent request has its own error boundary. An unhandled exception in one request terminates only that request — other requests on the same instance continue normally. You get sharing economics without sharing blast radius." },
              { q: "Is it compatible with existing code?", a: "Yes — 100% backwards compatible. No code changes needed. Just enable it in project settings (or start a new project — it's default since April 2025). Your existing Vercel Functions work identically, just faster and cheaper." },
              { q: "How do I explain this to a CTO?", a: "\"Imagine your serverless functions running like a smart load balancer — sharing resources when efficient, isolating when needed, and billing only for the CPU cycles you actually use. It's the reliability of serverless with the economics of servers.\"" },
            ].map((item) => (
              <div key={item.q} className="col-md-6">
                <div className="feature-card" style={{ padding: "1.15rem", height: "100%" }}>
                  <p style={{ color: "#818cf8", fontSize: "0.88rem", fontWeight: 600, marginBottom: "0.3rem" }}>{item.q}</p>
                  <p style={{ color: "#94a3b8", fontSize: "0.82rem", lineHeight: 1.6, marginBottom: 0 }}>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Timeline ─── */}
        <section className="mb-5">
          <h2 className="mb-3" style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem" }}>
            📅 Timeline
          </h2>
          <div className="d-flex flex-column gap-2">
            {timeline.map((t) => (
              <div key={t.date} className="d-flex gap-3 align-items-center" style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "8px",
                padding: "0.8rem 1.2rem",
              }}>
                <span style={{ color: "#818cf8", fontWeight: 700, fontSize: "0.85rem", whiteSpace: "nowrap" }}>{t.date}</span>
                <span style={{ color: "#94a3b8", fontSize: "0.85rem" }}>{t.event}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center py-3">
          <Link href="/se/platform-fundamentals/compute-runtimes" className="btn-glow" style={{ marginRight: "1rem" }}>
            ← Compute Runtimes
          </Link>
          <Link href="/se/platform-fundamentals/rendering-strategies" className="btn-glow">
            Rendering Strategies →
          </Link>
        </div>
      </div>
    </main>
  );
}
