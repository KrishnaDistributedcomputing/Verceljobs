import Link from "next/link";

const parts = [
  {
    title: "Part I: Role & Platform Foundation",
    icon: "🎯",
    color: "#667eea",
    chapters: [
      { num: 1, title: "What the Role Actually Is", desc: "Day-to-day SE activities, technical discovery, architecture design, code audits, and the business-technical duality" },
      { num: 2, title: "The Vercel Platform — Mental Model", desc: "The four-layer model: DX, Compute, Edge Network, AI Cloud. Core value proposition and key company facts" },
    ],
  },
  {
    title: "Part II: Build, Deploy & Serve",
    icon: "🚀",
    color: "#f472b6",
    chapters: [
      { num: 3, title: "The Build Pipeline & Deployment Model", desc: "Git push → build → deploy flow, branch previews, deployment protection, Turbopack (700× faster)" },
      { num: 4, title: "Preview Deployments", desc: "Live PR previews for design reviews, QA, client approvals. GitHub/GitLab integration with PR comments" },
      { num: 5, title: "Compute — The Three Runtimes", desc: "Edge Runtime vs Serverless vs Static. Limits, use cases, and the comparison matrix" },
      { num: 6, title: "Fluid Compute — The 2025 Game Changer", desc: "Concurrent request handling, Active CPU pricing, streaming cost reduction, bytecode caching" },
      { num: 7, title: "Edge Network & CDN", desc: "Global PoPs, cache hierarchy, Cache-Control headers, Skew Protection for zero-downtime deploys" },
    ],
  },
  {
    title: "Part III: Next.js Framework Mastery",
    icon: "⚡",
    color: "#34d399",
    chapters: [
      { num: 8, title: "Next.js Rendering Strategies", desc: "SSG, ISR, SSR, RSC — full code examples, decision matrix, and when to use each strategy" },
      { num: 9, title: "Caching — The Most Important Topic", desc: "Four cache layers, fetch() cache, on-demand revalidation, unstable_cache, anti-patterns" },
      { num: 10, title: "Middleware & Routing", desc: "Edge middleware for auth, A/B testing, geo-routing. What middleware should and should NOT do" },
      { num: 11, title: "Core Web Vitals", desc: "LCP, CLS, INP deep dives with Next.js fixes. SEO impact and performance optimization" },
    ],
  },
  {
    title: "Part IV: Platform Services",
    icon: "🔧",
    color: "#fbbf24",
    chapters: [
      { num: 12, title: "Edge Config & KV Storage", desc: "Feature flags, Vercel KV (Redis), Blob storage, Postgres. Ultra-low latency reads at the edge" },
      { num: 13, title: "Observability", desc: "Speed Insights, RUM data, OpenTelemetry, log drains. Core Web Vitals measurement and alerting" },
      { num: 14, title: "Security — WAF, DDoS, Access Control", desc: "Managed WAF, DDoS mitigation, deployment protection, env vars, SOC 2/HIPAA/PCI compliance" },
    ],
  },
  {
    title: "Part V: AI Cloud",
    icon: "🤖",
    color: "#a78bfa",
    chapters: [
      { num: 15, title: "The AI Cloud Layer", desc: "AI SDK, Agent abstraction, use-workflow, AI Gateway, Sandbox, v0, and Fluid Compute cost benefits" },
    ],
  },
  {
    title: "Part VI: Architecture & Business",
    icon: "🏗️",
    color: "#fb923c",
    chapters: [
      { num: 16, title: "Composable Architecture", desc: "Headless CMS + ISR pattern, commerce patterns, the composable stack with best-of-breed services" },
      { num: 17, title: "Common Customer Architectures", desc: "E-commerce, media/publishing, SaaS dashboard, and AI application architecture diagrams" },
      { num: 18, title: "Migration Patterns", desc: "CRA → Next.js, Gatsby → Next.js, self-hosted → Vercel, Pages Router → App Router" },
      { num: 19, title: "Pricing Model — In Depth", desc: "Hobby/Pro/Enterprise plans, cost growth triggers, spend management, upgrade trigger points" },
      { num: 20, title: "Enterprise Features", desc: "99.99% SLA, SAML SSO + SCIM, multi-region compute, audit logs, custom WAF rules, log drains" },
    ],
  },
  {
    title: "Part VII: Interview Preparation",
    icon: "🎤",
    color: "#f87171",
    chapters: [
      { num: 21, title: "SE Interview Topics & Common Questions", desc: "7 discovery questions, 5 technical interview Q&As with full answers, 8 codebase red flags" },
      { num: 22, title: "Glossary", desc: "25 key terms defined — DX Platform, Fluid Compute, ISR, RSC, Skew Protection, MACH, and more" },
    ],
  },
];

export default function StudyGuidePage() {
  return (
    <main className="py-5">
      <div className="container" style={{ maxWidth: "1100px" }}>
        <Link href="/blog" style={{ color: "#667eea", textDecoration: "none", fontSize: "0.9rem" }}>
          ← Back to Blog
        </Link>
        <h1 className="mt-3 mb-2" style={{ fontSize: "2.2rem", fontWeight: 800 }}>
          📖 Vercel SE Technical Study Guide
        </h1>
        <p style={{ color: "#94a3b8", marginBottom: "0.5rem" }}>
          22 chapters across 7 parts — from platform fundamentals to interview preparation.
          Click any chapter to read the full content.
        </p>
        <Link
          href="/blog/study-guide/content"
          style={{ color: "#667eea", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500 }}
        >
          📄 Read full guide →
        </Link>

        <div className="d-flex flex-column gap-5 mt-4">
          {parts.map((part) => (
            <section key={part.title}>
              <div className="d-flex align-items-center gap-2 mb-3">
                <span style={{ fontSize: "1.4rem" }}>{part.icon}</span>
                <h2 style={{ fontSize: "1.3rem", fontWeight: 700, margin: 0, color: part.color }}>
                  {part.title}
                </h2>
              </div>

              <div className="row g-3">
                {part.chapters.map((ch) => (
                  <div key={ch.num} className="col-md-6">
                    <Link
                      href={`/blog/study-guide/content#${ch.num}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="feature-card h-100" style={{ padding: "1.25rem" }}>
                        <div className="d-flex align-items-start gap-3">
                          <span
                            style={{
                              background: `${part.color}22`,
                              color: part.color,
                              width: "36px",
                              height: "36px",
                              borderRadius: "10px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "0.85rem",
                              fontWeight: 700,
                              flexShrink: 0,
                            }}
                          >
                            {ch.num}
                          </span>
                          <div>
                            <h3 style={{ fontSize: "1.05rem", marginBottom: "0.35rem" }}>{ch.title}</h3>
                            <p style={{ fontSize: "0.85rem", marginBottom: 0, lineHeight: 1.6 }}>{ch.desc}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
