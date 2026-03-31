import Link from "next/link";

/* ── Platform Mental Model ── */
const platformLayers = [
  { name: "Developer Experience Layer", desc: "Git push → auto-build → preview URL → production. v0 (AI app builder), Vercel Agent, CI/CD pipeline.", color: "#667eea" },
  { name: "Compute Layer", desc: "Serverless Functions, Edge Runtime, Fluid Compute. Vercel Functions (unified umbrella since mid-2025).", color: "#8b5cf6" },
  { name: "Edge Network Layer", desc: "Global CDN, Edge Cache, Routing Middleware. Edge Config (global KV), Image Optimization.", color: "#06b6d4" },
  { name: "AI Cloud Layer", desc: "AI SDK, AI Gateway, Vercel Sandbox, Workflows. v0, use-workflow (durable workflows).", color: "#10b981" },
];

/* ── Three Runtimes ── */
const runtimeComparison = [
  { feature: "Engine", edge: "V8 isolates", serverless: "Node.js (full)" },
  { feature: "Location", edge: "CDN PoPs (100+ globally)", serverless: "Regional data centres" },
  { feature: "Cold start", edge: "Near-zero", serverless: "100–500ms (mitigated by Fluid)" },
  { feature: "Max CPU", edge: "35ms", serverless: "Minutes (plan-dependent)" },
  { feature: "Max memory", edge: "128MB", serverless: "Up to 3GB" },
  { feature: "npm packages", edge: "Web API compatible only", serverless: "All packages" },
  { feature: "File system", edge: "No", serverless: "Yes (ephemeral)" },
  { feature: "Database access", edge: "No (use Edge Config)", serverless: "Yes" },
];

/* ── Fluid Compute ── */
const fluidFeatures = [
  { title: "Shared Instances", desc: "Multiple invocations share the same physical instance concurrently. Think 'mini-servers' instead of single-use functions. Eliminates cold start overhead." },
  { title: "Active CPU Pricing", desc: "Pay only for milliseconds your code executes on CPU — not for I/O wait. A 10s LLM stream with 200ms CPU = 200ms billing instead of 10s." },
  { title: "Bytecode Caching", desc: "V8 bytecode is cached across invocations in production, eliminating parse/compile overhead on repeated executions." },
  { title: "Error Isolation", desc: "Unhandled errors in one concurrent request do not crash other requests sharing the same instance." },
  { title: "Multi-Region Failover", desc: "Enterprise: failover to another AZ in the same region first, then to the next closest region if entire region is down." },
];

/* ── Rendering Strategies ── */
const strategies = [
  {
    name: "SSG (Static Site Generation)",
    when: "Marketing pages, landing pages, blog posts, docs",
    how: "Pages rendered at build time. HTML generated once, served from CDN everywhere.",
    pros: ["Maximum CDN cache hit rate", "Best SEO performance", "Millisecond responses globally"],
    cons: ["Requires rebuild to update", "Not for personalised content"],
    code: `// Default in App Router for pages without dynamic data
export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    cache: 'force-cache'
  });
  return <div>{data.content}</div>;
}`,
  },
  {
    name: "ISR (Incremental Static Regeneration)",
    when: "E-commerce products, editorial content, large sites (100k+ pages)",
    how: "Static pages auto-regenerated in background when cache expires — no full rebuild needed.",
    pros: ["Static speed + dynamic freshness", "On-demand revalidation via webhooks", "Global CDN distribution on Vercel"],
    cons: ["Brief staleness window", "Each revalidation invokes a function"],
    code: `// Time-based revalidation
export default async function Page() {
  const data = await fetch('https://api.example.com/products', {
    next: { revalidate: 3600 } // regenerate after 1 hour
  });
  return <ProductList products={data} />;
}`,
  },
  {
    name: "SSR (Server-Side Rendering)",
    when: "Authenticated dashboards, real-time data, search results",
    how: "Pages rendered on every request using a Vercel Function. Data is always fresh.",
    pros: ["Always-fresh data", "Request-specific (cookies, headers, geo)", "User-specific content"],
    cons: ["Every request invokes a function (cost)", "Higher TTFB than static"],
    code: `export const dynamic = 'force-dynamic';

export default async function Page({ searchParams }) {
  const user = await auth();
  const data = await db.query(
    'SELECT * FROM orders WHERE user_id = $1',
    [user.id]
  );
  return <Dashboard orders={data} />;
}`,
  },
  {
    name: "RSC (React Server Components)",
    when: "Complex pages mixing static + dynamic, reducing client JS bundle",
    how: "Components render on the server with zero client-side JS. Compose server + client freely.",
    pros: ["Zero JS shipped for server components", "Direct DB access without API", "Streaming with Suspense"],
    cons: ["No interactivity in server components", "Requires 'use client' for event handlers"],
    code: `// Server Component (default) — zero client JS
async function ProductDetails({ id }) {
  const product = await db.getProduct(id);
  return <div>{product.name}</div>;
}

// Client Component — for interactivity
'use client';
function AddToCart({ productId }) {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c + 1)}>Add</button>;
}`,
  },
];

const decisionMatrix = [
  { requirement: "Marketing site, blog, docs", strategy: "SSG" },
  { requirement: "E-commerce products, editorial content", strategy: "ISR" },
  { requirement: "Authenticated dashboards, user-specific data", strategy: "SSR or RSC" },
  { requirement: "Real-time data (prices, scores, alerts)", strategy: "SSR (short cache or no-store)" },
  { requirement: "Complex page with mix of static + dynamic", strategy: "RSC with Suspense" },
  { requirement: "Global personalisation by segment", strategy: "Edge Middleware + ISR" },
  { requirement: "Per-user personalisation", strategy: "SSR + cookies" },
];

export default function PlatformFundamentalsPage() {
  return (
    <main className="py-5">
      <div className="container" style={{ maxWidth: "1100px" }}>
        <Link href="/se" style={{ color: "#667eea", textDecoration: "none", fontSize: "0.9rem" }}>
          ← Back to SE Resources
        </Link>

        <div className="mt-3 mb-5">
          <span style={{ background: "rgba(102,126,234,0.15)", color: "#818cf8", padding: "0.2rem 0.6rem", borderRadius: "12px", fontSize: "0.75rem", fontWeight: 600 }}>
            Platform Fundamentals
          </span>
          <h1 className="mt-2" style={{ fontSize: "2.2rem", fontWeight: 800, color: "#fff" }}>
            🏗️ Platform Fundamentals
          </h1>
          <p style={{ color: "#94a3b8", maxWidth: "700px", lineHeight: 1.7 }}>
            The Vercel mental model, three compute runtimes, Fluid Compute, and Next.js rendering strategies —
            the foundational knowledge every SE needs.
          </p>
        </div>

        {/* ─── Vercel Platform Mental Model ─── */}
        <section className="mb-5">
          <h2 className="mb-3" style={{ color: "#fff", fontWeight: 700, fontSize: "1.5rem" }}>
            The Vercel Platform — Mental Model
          </h2>
          <p style={{ color: "#94a3b8", marginBottom: "1rem" }}>
            Vercel is a <strong style={{ color: "#e2e8f0" }}>Developer Experience (DX) Platform</strong> — not just hosting. Four layers:
          </p>
          <div className="d-flex flex-column gap-2 mb-4">
            {platformLayers.map((layer) => (
              <div key={layer.name} style={{
                background: `${layer.color}11`,
                border: `1px solid ${layer.color}33`,
                borderRadius: "10px",
                padding: "1rem 1.25rem",
              }}>
                <h4 style={{ color: layer.color, fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.3rem" }}>{layer.name}</h4>
                <p style={{ color: "#94a3b8", fontSize: "0.88rem", marginBottom: 0 }}>{layer.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(102,126,234,0.08)", border: "1px solid rgba(102,126,234,0.15)", borderRadius: "10px", padding: "1rem 1.25rem" }}>
            <p style={{ color: "#fbbf24", fontSize: "0.9rem", fontWeight: 600, marginBottom: "0.3rem" }}>Core Value Proposition:</p>
            <p style={{ color: "#cbd5e1", fontSize: "0.95rem", fontStyle: "italic", marginBottom: 0 }}>
              &quot;From code to globally distributed, framework-optimised infrastructure in one git push — with zero configuration.&quot;
            </p>
          </div>
        </section>

        {/* ─── Compute: Three Runtimes ─── */}
        <section className="mb-5">
          <h2 className="mb-3" style={{ color: "#fff", fontWeight: 700, fontSize: "1.5rem" }}>
            Compute — The Three Runtimes
          </h2>
          <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>
            Vercel Functions come in two runtimes. Understanding the difference is essential for every architecture conversation.
          </p>
          <div className="table-responsive mb-4">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "rgba(102,126,234,0.15)" }}>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.65rem 1rem", color: "#fff", fontWeight: 600, width: "20%" }}>Feature</th>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.65rem 1rem", color: "#06b6d4", fontWeight: 600, width: "40%" }}>⚡ Edge Runtime</th>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.65rem 1rem", color: "#8b5cf6", fontWeight: 600, width: "40%" }}>🖥️ Serverless (Node.js)</th>
                </tr>
              </thead>
              <tbody>
                {runtimeComparison.map((row, i) => (
                  <tr key={row.feature} style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)" }}>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.6rem 1rem", color: "#fff", fontWeight: 600, fontSize: "0.88rem" }}>{row.feature}</td>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.6rem 1rem", color: "#94a3b8", fontSize: "0.85rem" }}>{row.edge}</td>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.6rem 1rem", color: "#cbd5e1", fontSize: "0.85rem" }}>{row.serverless}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="row g-3">
            <div className="col-md-6">
              <div className="feature-card" style={{ padding: "1.25rem" }}>
                <h4 style={{ color: "#06b6d4", fontSize: "1rem", fontWeight: 600 }}>⚡ Edge Runtime — Best For</h4>
                <ul style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.8, paddingLeft: "1.1rem", marginBottom: 0 }}>
                  <li>Auth checks, A/B testing, feature flags</li>
                  <li>Geo-based redirects and personalisation</li>
                  <li>Request/response header manipulation</li>
                  <li>Rate limiting (simple, IP-based)</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div className="feature-card" style={{ padding: "1.25rem" }}>
                <h4 style={{ color: "#8b5cf6", fontSize: "1rem", fontWeight: 600 }}>🖥️ Serverless — Best For</h4>
                <ul style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.8, paddingLeft: "1.1rem", marginBottom: 0 }}>
                  <li>Server-side rendering (SSR pages)</li>
                  <li>API routes with database queries</li>
                  <li>AI/LLM inference calls</li>
                  <li>File processing, image generation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Fluid Compute ─── */}
        <section className="mb-5">
          <h2 className="mb-3" style={{ color: "#fff", fontWeight: 700, fontSize: "1.5rem" }}>
            Fluid Compute — The 2025 Game Changer
          </h2>
          <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>
            Vercel&apos;s biggest architectural evolution. Enabled by default for new projects from April 23, 2025.
          </p>
          <div className="row g-3 mb-4">
            {fluidFeatures.map((f) => (
              <div key={f.title} className="col-md-6">
                <div style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  padding: "1.25rem",
                }}>
                  <h4 style={{ color: "#a5b4fc", fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.4rem" }}>{f.title}</h4>
                  <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: 0 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: "10px", padding: "1rem 1.25rem" }}>
            <p style={{ color: "#10b981", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem" }}>Cost Impact Example:</p>
            <p style={{ color: "#cbd5e1", fontSize: "0.88rem", marginBottom: "0.2rem" }}>
              Traditional: 10s LLM streaming = 10s billing
            </p>
            <p style={{ color: "#10b981", fontSize: "0.88rem", fontWeight: 600, marginBottom: 0 }}>
              Fluid: 10s streaming, 200ms CPU = 200ms billing → 80-90% cost reduction for AI routes
            </p>
          </div>
        </section>

        {/* ─── Rendering Strategies ─── */}
        <section className="mb-5">
          <h2 className="mb-3" style={{ color: "#fff", fontWeight: 700, fontSize: "1.5rem" }}>
            Next.js Rendering Strategies
          </h2>
          <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>
            The core technical topic for any Vercel SE. Know when to use each and diagnose when a customer is using the wrong one.
          </p>
          <div className="d-flex flex-column gap-4 mb-4">
            {strategies.map((s) => (
              <div key={s.name} className="feature-card" style={{ padding: "1.5rem" }}>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "0.3rem" }}>{s.name}</h3>
                <p style={{ color: "#94a3b8", fontSize: "0.88rem", marginBottom: "0.75rem" }}>{s.how}</p>
                <p style={{ color: "#818cf8", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.5rem" }}>When to use: {s.when}</p>
                <div className="row g-2 mb-3">
                  <div className="col-md-6">
                    <ul style={{ marginBottom: 0, paddingLeft: "1.1rem" }}>
                      {s.pros.map((p) => (
                        <li key={p} style={{ color: "#10b981", fontSize: "0.83rem", lineHeight: 1.7 }}>✅ {p}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <ul style={{ marginBottom: 0, paddingLeft: "1.1rem" }}>
                      {s.cons.map((c) => (
                        <li key={c} style={{ color: "#f59e0b", fontSize: "0.83rem", lineHeight: 1.7 }}>⚠️ {c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <pre style={{
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "8px",
                  padding: "0.75rem 1rem",
                  fontSize: "0.78rem",
                  color: "#cbd5e1",
                  overflow: "auto",
                  marginBottom: 0,
                }}>
                  <code>{s.code}</code>
                </pre>
              </div>
            ))}
          </div>

          {/* Decision Matrix */}
          <h3 className="mb-3" style={{ color: "#e2e8f0", fontWeight: 600, fontSize: "1.2rem" }}>Decision Matrix</h3>
          <div className="table-responsive">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "rgba(102,126,234,0.15)" }}>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.6rem 1rem", color: "#fff", fontWeight: 600 }}>Requirement</th>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.6rem 1rem", color: "#818cf8", fontWeight: 600 }}>Strategy</th>
                </tr>
              </thead>
              <tbody>
                {decisionMatrix.map((row, i) => (
                  <tr key={row.requirement} style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)" }}>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.55rem 1rem", color: "#cbd5e1", fontSize: "0.88rem" }}>{row.requirement}</td>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.55rem 1rem", color: "#818cf8", fontSize: "0.88rem", fontWeight: 600 }}>{row.strategy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="text-center py-3">
          <Link href="/blog/study-guide" className="btn-glow" style={{ marginRight: "1rem" }}>
            Full Study Guide →
          </Link>
          <Link href="/se" className="btn-glow">
            SE Resources →
          </Link>
        </div>
      </div>
    </main>
  );
}
