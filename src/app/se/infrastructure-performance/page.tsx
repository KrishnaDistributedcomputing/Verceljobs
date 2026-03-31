import Link from "next/link";

/* ── Build Pipeline Steps ── */
const buildSteps = [
  { step: "1. Git Push", desc: "Push to main (production) or any branch (preview). Vercel detects the framework automatically." },
  { step: "2. Build", desc: "Turbopack / webpack / SWC compilation. Static pages generated (SSG/ISR), route manifests, function bundles compiled, assets optimised." },
  { step: "3. Deploy", desc: "Build output deployed to CDN (static assets + ISR pages) and Vercel Functions infrastructure (serverless / Fluid)." },
  { step: "4. Live", desc: "DNS updated, zero-downtime deployment. Preview URL generated for every non-production deployment." },
];

/* ── Edge Network ── */
const cacheHierarchy = [
  { layer: "User", name: "Browser Cache", latency: "0ms", desc: "Client-side, user's browser. Controlled by Cache-Control headers." },
  { layer: "Edge", name: "Edge PoP Cache", latency: "~1-10ms", desc: "Vercel CDN, global Points of Presence. Sub-10ms for cache hits." },
  { layer: "Regional", name: "Regional Function Cache", latency: "~10-50ms", desc: "Next.js Data Cache and Full Route Cache. Per-function caching layer." },
  { layer: "Origin", name: "Origin Function", latency: "~100ms+", desc: "Serverless function or Fluid Compute instance executes and returns fresh data." },
];

/* ── Caching Layers ── */
const cacheLayers = [
  { name: "Browser Cache (Layer 1)", desc: "Client-side, user's browser. Controlled via Cache-Control response headers." },
  { name: "Edge Cache (Layer 2)", desc: "Vercel CDN at global PoPs. ISR and static pages cached here. Stale-while-revalidate supported." },
  { name: "Data Cache (Layer 3)", desc: "Next.js fetch() cache. Per-function, tag-based. Controlled with revalidate and tags options." },
  { name: "Full Route Cache (Layer 4)", desc: "Rendered HTML cached on CDN. Entire page output stored at the edge for instant delivery." },
];

/* ── Caching Patterns ── */
const cachingPatterns = [
  {
    pattern: "Force Cache (Default)",
    code: `fetch('https://api.example.com/data')
// Cached indefinitely`,
    when: "Static data that never changes",
  },
  {
    pattern: "Time-Based Revalidation",
    code: `fetch('https://api.example.com/data', {
  next: { revalidate: 60 }
})
// Cache for 60 seconds, then revalidate`,
    when: "Content that updates periodically",
  },
  {
    pattern: "No Cache",
    code: `fetch('https://api.example.com/data', {
  cache: 'no-store'
})
// Always fresh`,
    when: "User-specific or real-time data",
  },
  {
    pattern: "Tag-Based Revalidation",
    code: `fetch('https://api.example.com/products', {
  next: { tags: ['products'] }
})
// revalidateTag('products') to invalidate`,
    when: "CMS content, on-demand updates via webhooks",
  },
];

/* ── Caching Anti-Patterns ── */
const antiPatterns = [
  { mistake: "fetch() in a Client Component", problem: "Bypasses server-side cache, exposes API keys", fix: "Move to Server Component" },
  { mistake: "cache: 'no-store' on every fetch", problem: "Every request hits origin — kills performance, costs money", fix: "Add appropriate revalidate" },
  { mistake: "No cache tags", problem: "Can't do targeted on-demand revalidation", fix: "Add tags to related fetches" },
  { mistake: "ISR without webhooks", problem: "Content updates not visible until revalidate expires", fix: "Add CMS webhook → revalidatePath" },
  { mistake: "Caching user-specific data", problem: "User A sees User B's data", fix: "Add user ID to cache key or disable cache" },
  { mistake: "Caching in Edge Middleware", problem: "Middleware runs every request — should not cache", fix: "Move caching to Serverless layer" },
];

/* ── Core Web Vitals ── */
const vitals = [
  {
    name: "LCP (Largest Contentful Paint)",
    target: "≤ 2.5s",
    what: "Time until the largest image or text block is visible.",
    causes: ["Large hero images not optimised", "Slow TTFB from SSR delay", "Render-blocking resources"],
    fixes: ["Use next/image with priority on above-fold images", "Preconnect to third-party origins", "Use next/font for zero layout shift"],
    color: "#10b981",
  },
  {
    name: "CLS (Cumulative Layout Shift)",
    target: "≤ 0.1",
    what: "How much the layout shifts as content loads.",
    causes: ["Images without width/height", "Fonts loading after text renders", "Dynamically injected content"],
    fixes: ["next/image auto-sets aspect ratio", "next/font loads inline — zero CLS", "Reserve space for dynamic content"],
    color: "#f59e0b",
  },
  {
    name: "INP (Interaction to Next Paint)",
    target: "≤ 200ms",
    what: "How fast the browser responds to user input (replaced FID in 2024).",
    causes: ["Large JS bundles blocking main thread", "Too many Client Components", "Expensive third-party scripts"],
    fixes: ["Move Client Components down the tree", "Code split with dynamic() imports", "Defer scripts with next/script strategy='lazyOnload'"],
    color: "#8b5cf6",
  },
];

/* ── Turbopack ── */
const turbopackFacts = [
  "Up to 700× faster cold builds than webpack",
  "10× faster HMR (Hot Module Replacement)",
  "Stable in Next.js 15 for development",
  "Incremental computation — only rebuilds what changed",
  "Enabled with next dev --turbopack",
  "Rust-based bundler built by Vercel",
];

/* ── Skew Protection ── */
const skewInfo = "When a new deployment rolls out, some users may have old JavaScript from the previous deployment while the server runs new code. Vercel's Skew Protection routes requests to the deployment version that served the original HTML, ensuring consistency.";

export default function InfraPerformancePage() {
  return (
    <main className="py-5">
      <div className="container" style={{ maxWidth: "1100px" }}>
        <Link href="/se" style={{ color: "#667eea", textDecoration: "none", fontSize: "0.9rem" }}>
          ← Back to SE Resources
        </Link>

        <div className="mt-3 mb-5">
          <span style={{ background: "rgba(6,182,212,0.15)", color: "#06b6d4", padding: "0.2rem 0.6rem", borderRadius: "12px", fontSize: "0.75rem", fontWeight: 600 }}>
            Infrastructure & Performance
          </span>
          <h1 className="mt-2" style={{ fontSize: "2.2rem", fontWeight: 800, color: "#fff" }}>
            ⚡ Infrastructure & Performance
          </h1>
          <p style={{ color: "#94a3b8", maxWidth: "700px", lineHeight: 1.7 }}>
            Build pipeline, Edge Network, caching architecture, Core Web Vitals, and performance
            optimization — the infrastructure knowledge that wins enterprise deals.
          </p>
        </div>

        {/* ─── Build Pipeline ─── */}
        <section className="mb-5">
          <h2 className="mb-3" style={{ color: "#fff", fontWeight: 700, fontSize: "1.5rem" }}>
            The Build Pipeline & Deployment Model
          </h2>
          <div className="d-flex flex-column gap-2 mb-4">
            {buildSteps.map((s, i) => (
              <div key={s.step} className="d-flex align-items-start gap-3" style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "10px",
                padding: "1rem 1.25rem",
              }}>
                <span style={{
                  background: "rgba(102,126,234,0.2)",
                  color: "#818cf8",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  flexShrink: 0,
                }}>
                  {i + 1}
                </span>
                <div>
                  <h4 style={{ color: "#e2e8f0", fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.2rem" }}>{s.step}</h4>
                  <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginBottom: 0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="row g-3">
            <div className="col-md-6">
              <div className="feature-card" style={{ padding: "1.25rem" }}>
                <h4 style={{ fontSize: "1rem", color: "#a5b4fc" }}>🚀 Turbopack</h4>
                <ul style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.8, paddingLeft: "1.1rem", marginBottom: 0 }}>
                  {turbopackFacts.map((f) => <li key={f}>{f}</li>)}
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div className="feature-card" style={{ padding: "1.25rem" }}>
                <h4 style={{ fontSize: "1rem", color: "#a5b4fc" }}>🔒 Skew Protection</h4>
                <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: "0.5rem" }}>{skewInfo}</p>
                <span style={{ color: "#fbbf24", fontSize: "0.8rem", fontWeight: 600 }}>Strong enterprise selling point (Pro + Enterprise)</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Edge Network ─── */}
        <section className="mb-5">
          <h2 className="mb-3" style={{ color: "#fff", fontWeight: 700, fontSize: "1.5rem" }}>
            Edge Network & CDN
          </h2>
          <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>
            Vercel&apos;s CDN has Points of Presence (PoPs) around the world. Every request is routed to the nearest PoP.
          </p>
          <div className="table-responsive mb-4">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "rgba(6,182,212,0.15)" }}>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.65rem 1rem", color: "#06b6d4", fontWeight: 600, width: "10%" }}>Layer</th>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.65rem 1rem", color: "#fff", fontWeight: 600, width: "20%" }}>Name</th>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.65rem 1rem", color: "#10b981", fontWeight: 600, width: "12%" }}>Latency</th>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.65rem 1rem", color: "#94a3b8", fontWeight: 600 }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {cacheHierarchy.map((row, i) => (
                  <tr key={row.layer} style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)" }}>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.6rem 1rem", color: "#06b6d4", fontSize: "0.88rem", fontWeight: 600 }}>{row.layer}</td>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.6rem 1rem", color: "#fff", fontSize: "0.88rem", fontWeight: 500 }}>{row.name}</td>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.6rem 1rem", color: "#10b981", fontSize: "0.88rem", fontWeight: 600 }}>{row.latency}</td>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.6rem 1rem", color: "#94a3b8", fontSize: "0.85rem" }}>{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── Caching ─── */}
        <section className="mb-5">
          <h2 className="mb-3" style={{ color: "#fff", fontWeight: 700, fontSize: "1.5rem" }}>
            Caching — The Most Important Topic
          </h2>
          <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>
            Caching is where most customer problems originate. Understanding every cache layer is essential.
          </p>

          {/* Four Layers */}
          <div className="row g-2 mb-4">
            {cacheLayers.map((l, i) => (
              <div key={l.name} className="col-md-6 col-lg-3">
                <div style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "10px",
                  padding: "1rem",
                  height: "100%",
                }}>
                  <span style={{ color: "#818cf8", fontSize: "0.7rem", fontWeight: 700 }}>LAYER {i + 1}</span>
                  <h4 style={{ color: "#e2e8f0", fontSize: "0.85rem", fontWeight: 600, margin: "0.3rem 0" }}>{l.name.split(" (")[0]}</h4>
                  <p style={{ color: "#94a3b8", fontSize: "0.78rem", lineHeight: 1.6, marginBottom: 0 }}>{l.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Patterns */}
          <h3 className="mb-3" style={{ color: "#e2e8f0", fontWeight: 600, fontSize: "1.2rem" }}>Caching Patterns</h3>
          <div className="row g-3 mb-4">
            {cachingPatterns.map((p) => (
              <div key={p.pattern} className="col-md-6">
                <div className="feature-card" style={{ padding: "1.25rem" }}>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h4 style={{ fontSize: "0.95rem", marginBottom: 0 }}>{p.pattern}</h4>
                  </div>
                  <pre style={{
                    background: "rgba(0,0,0,0.3)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "8px",
                    padding: "0.6rem 0.8rem",
                    fontSize: "0.75rem",
                    color: "#cbd5e1",
                    overflow: "auto",
                    marginBottom: "0.5rem",
                  }}>
                    <code>{p.code}</code>
                  </pre>
                  <p style={{ color: "#818cf8", fontSize: "0.8rem", marginBottom: 0 }}>When: {p.when}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Anti-patterns */}
          <h3 className="mb-3" style={{ color: "#e2e8f0", fontWeight: 600, fontSize: "1.2rem" }}>⚠️ Common Anti-Patterns</h3>
          <div className="table-responsive">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "rgba(239,68,68,0.1)" }}>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.6rem 1rem", color: "#f87171", fontWeight: 600, width: "25%" }}>Anti-Pattern</th>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.6rem 1rem", color: "#f59e0b", fontWeight: 600, width: "35%" }}>Problem</th>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.6rem 1rem", color: "#10b981", fontWeight: 600, width: "40%" }}>Fix</th>
                </tr>
              </thead>
              <tbody>
                {antiPatterns.map((row, i) => (
                  <tr key={row.mistake} style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)" }}>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.6rem 1rem", color: "#f87171", fontSize: "0.85rem" }}>{row.mistake}</td>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.6rem 1rem", color: "#f59e0b", fontSize: "0.85rem" }}>{row.problem}</td>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.6rem 1rem", color: "#10b981", fontSize: "0.85rem" }}>{row.fix}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── Core Web Vitals ─── */}
        <section className="mb-5">
          <h2 className="mb-3" style={{ color: "#fff", fontWeight: 700, fontSize: "1.5rem" }}>
            Core Web Vitals
          </h2>
          <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>
            Direct SE conversation topic. Customers want to improve their scores and Vercel can help.
          </p>
          <div className="d-flex flex-column gap-4">
            {vitals.map((v) => (
              <div key={v.name} className="feature-card" style={{ padding: "1.5rem", borderLeft: `3px solid ${v.color}` }}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h3 style={{ fontSize: "1.1rem", marginBottom: 0 }}>{v.name}</h3>
                  <span style={{ background: `${v.color}22`, color: v.color, padding: "0.15rem 0.5rem", borderRadius: "8px", fontSize: "0.75rem", fontWeight: 700 }}>
                    Target: {v.target}
                  </span>
                </div>
                <p style={{ color: "#94a3b8", fontSize: "0.88rem", marginBottom: "0.75rem" }}>{v.what}</p>
                <div className="row g-3">
                  <div className="col-md-6">
                    <p style={{ color: "#f87171", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>Common Causes:</p>
                    <ul style={{ paddingLeft: "1.1rem", marginBottom: 0 }}>
                      {v.causes.map((c) => <li key={c} style={{ color: "#94a3b8", fontSize: "0.83rem", lineHeight: 1.7 }}>{c}</li>)}
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <p style={{ color: "#10b981", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>Vercel/Next.js Fixes:</p>
                    <ul style={{ paddingLeft: "1.1rem", marginBottom: 0 }}>
                      {v.fixes.map((f) => <li key={f} style={{ color: "#cbd5e1", fontSize: "0.83rem", lineHeight: 1.7 }}>{f}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
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
