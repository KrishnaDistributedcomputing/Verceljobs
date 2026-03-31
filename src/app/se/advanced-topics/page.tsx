import Link from "next/link";

/* ── AI SDK ── */
const aiTools = [
  { name: "AI SDK", desc: "Open-source TypeScript library. Unified interface across OpenAI, Anthropic, Google, and more. streamText(), generateObject(), tool calling, streaming UI.", url: "https://ai-sdk.dev/" },
  { name: "AI Gateway", desc: "Unified endpoint to 100+ models. Model routing, fallback, rate limiting per provider, cost tracking. No code changes to switch providers.", url: "https://vercel.com/ai-gateway" },
  { name: "AI SDK 6 — Agent Layer", desc: "Agent definition layer, tool execution approval (human-in-the-loop), type safety across models, durable workflow tooling.", url: "https://ai-sdk.dev/" },
  { name: "use-workflow (Durable Workflows)", desc: "Solves function timeout for long-running AI agents. Each step is durable — if the function times out, execution resumes.", url: "https://useworkflow.dev/" },
  { name: "Vercel Sandbox", desc: "Isolated Linux containers for code execution. Agents can run untrusted code, benchmarks, filesystem search — no security risk.", url: "https://vercel.com/sandbox" },
  { name: "v0 — AI App Builder", desc: "Converts natural language to production-ready React/Next.js code. 4M+ users. Deploy to Vercel with one click.", url: "https://v0.app/" },
];

/* ── Composable Architecture ── */
const composableStack = [
  { category: "Headless CMS", providers: "Contentful, Sanity, Storyblok, Hygraph", color: "#667eea" },
  { category: "E-commerce", providers: "Shopify, Commercetools, BigCommerce", color: "#10b981" },
  { category: "Search", providers: "Algolia, Elastic", color: "#f59e0b" },
  { category: "Auth", providers: "Auth0, Clerk, NextAuth", color: "#8b5cf6" },
  { category: "Payments", providers: "Stripe, Braintree", color: "#06b6d4" },
  { category: "Analytics", providers: "Segment, Mixpanel", color: "#ec4899" },
  { category: "Media", providers: "Cloudinary, Mux", color: "#f97316" },
];

/* ── Architecture Patterns ── */
const architectures = [
  {
    name: "E-commerce Pattern",
    layers: [
      { route: "/products/[slug]", strategy: "ISR (1hr + webhook on update)", desc: "Product pages with on-demand revalidation" },
      { route: "/collections/[slug]", strategy: "ISR (15min)", desc: "Collection listings, periodic refresh" },
      { route: "/cart", strategy: "CSR (client-side)", desc: "Sensitive, user-specific cart data" },
      { route: "/checkout", strategy: "SSR (always fresh)", desc: "Auth required, real-time inventory" },
      { route: "Edge Middleware", strategy: "A/B testing", desc: "50/50 homepage split, cookie-based" },
    ],
    backend: "Shopify / Commercetools",
  },
  {
    name: "Media / Publishing Pattern",
    layers: [
      { route: "/ (homepage)", strategy: "ISR (5min or webhook)", desc: "Breaking news, editorial updates" },
      { route: "/articles/[slug]", strategy: "ISR (webhook + tags)", desc: "Tag-based revalidation on publish" },
      { route: "/live", strategy: "SSR (no cache)", desc: "Real-time ticker, always fresh" },
      { route: "/search", strategy: "SSR or CSR", desc: "User-specific search results" },
      { route: "CMS Webhook", strategy: "→ revalidateTag('articles')", desc: "On-demand invalidation" },
    ],
    backend: "Contentful / Sanity",
  },
  {
    name: "SaaS Dashboard Pattern",
    layers: [
      { route: "/ (marketing)", strategy: "SSG", desc: "Static marketing pages" },
      { route: "/blog", strategy: "ISR", desc: "Blog with CMS integration" },
      { route: "/login", strategy: "SSG", desc: "Just a static form" },
      { route: "/app/*", strategy: "SSR / RSC", desc: "Authenticated, user-specific data" },
    ],
    backend: "Clerk/Auth0 + Vercel Postgres/Supabase",
  },
  {
    name: "AI Application Pattern",
    layers: [
      { route: "/chat", strategy: "RSC + useChat (AI SDK)", desc: "Streaming chat interface" },
      { route: "/api/chat", strategy: "Vercel Function (streaming)", desc: "LLM response via Fluid Compute" },
      { route: "/api/search", strategy: "Edge Function", desc: "Fast vector search at the edge" },
      { route: "/api/agent", strategy: "use-workflow (durable)", desc: "Long-running agent tasks" },
    ],
    backend: "AI Gateway → OpenAI/Anthropic + Pinecone/Qdrant",
  },
];

/* ── Migration Patterns ── */
const migrations = [
  {
    from: "Create React App → Next.js App Router",
    difficulty: "Common",
    steps: ["Add Next.js alongside CRA (incremental adoption)", "Move routes one by one", "Identify SSG vs ISR vs SSR per route", "Replace API calls with Server Components where possible", "Add Middleware for auth (replace route guards)", "Migrate to next/image, next/font, next/link"],
  },
  {
    from: "Gatsby → Next.js",
    difficulty: "Medium",
    steps: ["GraphQL data layer → Server Components with direct data fetching", "Gatsby static generation → Next.js SSG/ISR", "Gatsby plugins → Next.js equivalents or direct integrations"],
  },
  {
    from: "Self-hosted Next.js → Vercel",
    difficulty: "Easy",
    steps: ["Usually zero code changes — point DNS to Vercel", "Gain: ISR distributed globally (not single-region)", "Gain: Preview deployments for every PR", "Gain: Zero-config builds + Skew Protection", "Gain: Automatic image optimisation at CDN level"],
  },
  {
    from: "Pages Router → App Router",
    difficulty: "Incremental",
    steps: ["Migrate one route at a time (pages/ and app/ coexist)", "getServerSideProps → async Server Components", "getStaticProps → SSG Server Components", "Data fetching moves from page-level to component-level"],
  },
];

const difficultyColors: Record<string, string> = {
  Common: "#f59e0b",
  Medium: "#8b5cf6",
  Easy: "#10b981",
  Incremental: "#06b6d4",
};

export default function AdvancedTopicsPage() {
  return (
    <main className="py-5">
      <div className="container" style={{ maxWidth: "1100px" }}>
        <Link href="/se" style={{ color: "#667eea", textDecoration: "none", fontSize: "0.9rem" }}>
          ← Back to SE Resources
        </Link>

        <div className="mt-3 mb-5">
          <span style={{ background: "rgba(167,139,250,0.15)", color: "#a78bfa", padding: "0.2rem 0.6rem", borderRadius: "12px", fontSize: "0.75rem", fontWeight: 600 }}>
            Advanced Topics
          </span>
          <h1 className="mt-2" style={{ fontSize: "2.2rem", fontWeight: 800, color: "#fff" }}>
            🚀 Advanced Topics
          </h1>
          <p style={{ color: "#94a3b8", maxWidth: "700px", lineHeight: 1.7 }}>
            The AI Cloud Layer, composable architecture, customer architecture patterns, and migration
            playbooks — the advanced knowledge that differentiates top SEs.
          </p>
        </div>

        {/* ─── AI Cloud Layer ─── */}
        <section className="mb-5">
          <h2 className="mb-3" style={{ color: "#fff", fontWeight: 700, fontSize: "1.5rem" }}>
            The AI Cloud Layer
          </h2>
          <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>
            Vercel&apos;s biggest strategic bet. As an SE in 2026, you need to understand and demo these tools.
          </p>
          <div className="row g-3 mb-4">
            {aiTools.map((t) => (
              <div key={t.name} className="col-md-6">
                <a href={t.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                  <div className="feature-card" style={{ padding: "1.25rem" }}>
                    <h4 style={{ fontSize: "0.95rem", marginBottom: "0.4rem" }}>{t.name}</h4>
                    <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: 0 }}>{t.desc}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: "10px", padding: "1rem 1.25rem" }}>
            <p style={{ color: "#10b981", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem" }}>Fluid Compute + AI = Cost Efficiency</p>
            <p style={{ color: "#cbd5e1", fontSize: "0.88rem", marginBottom: 0 }}>
              LLM calls = mostly I/O wait. Traditional serverless bills for all wait time. Fluid Compute bills only ~10ms of actual CPU per call → <strong style={{ color: "#10b981" }}>80-90% cost reduction for AI streaming routes</strong>.
            </p>
          </div>
        </section>

        {/* ─── Composable Architecture ─── */}
        <section className="mb-5">
          <h2 className="mb-3" style={{ color: "#fff", fontWeight: 700, fontSize: "1.5rem" }}>
            Composable Architecture & Headless
          </h2>
          <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>
            Vercel positions itself as the <strong style={{ color: "#e2e8f0" }}>presentation layer</strong> of a composable stack. A huge part of enterprise sales.
          </p>
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
            padding: "1.5rem",
            marginBottom: "1.5rem",
          }}>
            <h4 style={{ color: "#e2e8f0", fontSize: "1rem", fontWeight: 600, marginBottom: "1rem", textAlign: "center" }}>
              Frontend (Next.js on Vercel) connects to:
            </h4>
            <div className="row g-2">
              {composableStack.map((c) => (
                <div key={c.category} className="col-md-6 col-lg-4">
                  <div className="d-flex align-items-center gap-2" style={{ padding: "0.4rem 0" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: c.color, flexShrink: 0 }}></span>
                    <span style={{ color: c.color, fontSize: "0.85rem", fontWeight: 600, minWidth: "100px" }}>{c.category}</span>
                    <span style={{ color: "#94a3b8", fontSize: "0.8rem" }}>{c.providers}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Customer Architectures ─── */}
        <section className="mb-5">
          <h2 className="mb-3" style={{ color: "#fff", fontWeight: 700, fontSize: "1.5rem" }}>
            Common Customer Architectures
          </h2>
          <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>
            The patterns you&apos;ll encounter most in enterprise sales. Know how to draw and explain each.
          </p>
          <div className="d-flex flex-column gap-4">
            {architectures.map((arch) => (
              <div key={arch.name} className="feature-card" style={{ padding: "1.5rem" }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h3 style={{ fontSize: "1.1rem", marginBottom: 0 }}>{arch.name}</h3>
                  <span style={{ color: "#64748b", fontSize: "0.8rem" }}>Backend: {arch.backend}</span>
                </div>
                <div className="table-responsive">
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "rgba(102,126,234,0.1)" }}>
                        <th style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.5rem 0.75rem", color: "#818cf8", fontWeight: 600, fontSize: "0.8rem", width: "25%" }}>Route</th>
                        <th style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.5rem 0.75rem", color: "#10b981", fontWeight: 600, fontSize: "0.8rem", width: "30%" }}>Strategy</th>
                        <th style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.5rem 0.75rem", color: "#94a3b8", fontWeight: 600, fontSize: "0.8rem" }}>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {arch.layers.map((l, i) => (
                        <tr key={l.route} style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)" }}>
                          <td style={{ border: "1px solid rgba(255,255,255,0.06)", padding: "0.45rem 0.75rem", color: "#e2e8f0", fontSize: "0.83rem", fontFamily: "monospace" }}>{l.route}</td>
                          <td style={{ border: "1px solid rgba(255,255,255,0.06)", padding: "0.45rem 0.75rem", color: "#10b981", fontSize: "0.83rem" }}>{l.strategy}</td>
                          <td style={{ border: "1px solid rgba(255,255,255,0.06)", padding: "0.45rem 0.75rem", color: "#94a3b8", fontSize: "0.83rem" }}>{l.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Migration Patterns ─── */}
        <section className="mb-5">
          <h2 className="mb-3" style={{ color: "#fff", fontWeight: 700, fontSize: "1.5rem" }}>
            Migration Patterns
          </h2>
          <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>
            You will be asked about migrations constantly. Know these playbooks.
          </p>
          <div className="d-flex flex-column gap-3">
            {migrations.map((m) => (
              <div key={m.from} className="feature-card" style={{ padding: "1.25rem" }}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h3 style={{ fontSize: "1rem", marginBottom: 0 }}>{m.from}</h3>
                  <span style={{
                    background: `${difficultyColors[m.difficulty]}22`,
                    color: difficultyColors[m.difficulty],
                    padding: "0.1rem 0.45rem",
                    borderRadius: "8px",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                  }}>
                    {m.difficulty}
                  </span>
                </div>
                <ol style={{ color: "#cbd5e1", fontSize: "0.85rem", lineHeight: 1.8, paddingLeft: "1.25rem", marginBottom: 0 }}>
                  {m.steps.map((s, i) => <li key={i}>{s}</li>)}
                </ol>
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
