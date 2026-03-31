import Link from "next/link";

const architectures = [
  {
    title: "Composable Commerce",
    desc: "Headless Shopify/commercetools frontend on Next.js, ISR for product pages, Edge Middleware for geo-pricing, Vercel CDN for global delivery. 37% conversion lift (Desenio), 22% revenue boost (PAIGE).",
    stack: ["Next.js", "ISR", "Edge Middleware", "Shopify", "Vercel CDN"],
    url: "https://vercel.com/solutions/composable-commerce",
    landingPage: "/blog/architectures/composable-commerce",
  },
  {
    title: "Multi-Tenant SaaS Platform",
    desc: "Wildcard domains + Middleware for tenant routing. Durable serves 3M+ businesses on a single codebase. Mintlify manages thousands of custom docs domains via the Vercel Domains API.",
    stack: ["Middleware", "Domains API", "Serverless Functions", "Edge Network"],
    url: "https://vercel.com/solutions/multi-tenant-saas",
    landingPage: "/blog/architectures/multi-tenant-saas",
  },
  {
    title: "AI-Powered Product (Chat/Agent)",
    desc: "AI SDK for model abstraction, AI Gateway for multi-provider routing, Workflow SDK for durable orchestration. SERHANT. orchestrates OpenAI + Claude + Gemini per task type.",
    stack: ["AI SDK", "AI Gateway", "Workflow SDK", "Fluid Compute"],
    url: "https://vercel.com/solutions/ai-apps",
    landingPage: "/blog/architectures/ai-powered-product",
  },
  {
    title: "Creative Agent Platform",
    desc: "FLORA's FAUNA agent fans out into parallel image generation jobs. DurableAgent from Workflow SDK persists state across long-running visual iterations. Fluid Compute handles concurrency efficiently.",
    stack: ["AI SDK", "Workflow SDK", "DurableAgent", "Fluid Compute", "Sandbox"],
    url: "https://vercel.com/blog/how-flora-shipped-a-creative-agent-on-vercels-ai-stack",
    landingPage: "/blog/architectures/creative-agent",
  },
  {
    title: "Knowledge Agent (No Embeddings)",
    desc: "Replace vector DB + embeddings with filesystem + bash in Vercel Sandbox. Agent uses grep/find/cat for deterministic retrieval. Cost dropped from $1.00 → $0.25/query.",
    stack: ["Sandbox", "AI SDK", "Chat SDK", "Postgres"],
    url: "https://vercel.com/blog/build-knowledge-agents-without-embeddings",
    landingPage: "/blog/architectures/knowledge-agent",
  },
  {
    title: "Marketing Site + CMS",
    desc: "Headless CMS (Sanity/Contentful) → Next.js with ISR. Preview Deployments for content review, Draft Mode for editors. Automatic CDN cache invalidation on publish.",
    stack: ["Next.js", "ISR", "Draft Mode", "Preview Deployments", "Headless CMS"],
    url: "https://vercel.com/solutions/marketing-sites",
    landingPage: "/blog/architectures/marketing-site-cms",
  },
  {
    title: "Cross-Platform Chat Agent",
    desc: "Chat SDK delivers one agent across Slack, Teams, Discord, WhatsApp, Telegram, GitHub, and Linear. Single codebase, platform-specific rendering handled by adapters.",
    stack: ["Chat SDK", "AI SDK", "AI Gateway", "Redis/Postgres"],
    url: "https://vercel.com/blog/chat-sdk-brings-agents-to-your-users",
    landingPage: "/blog/architectures/cross-platform-chat",
  },
  {
    title: "Monorepo at Scale",
    desc: "Turborepo for task orchestration — 96% faster task graph computation. Remote caching eliminates redundant builds. 1,000-package repos go from 8.1s to 716ms Time to First Task.",
    stack: ["Turborepo", "Remote Caching", "Vercel Build"],
    url: "https://vercel.com/solutions/turborepo",
    landingPage: "/blog/architectures/monorepo",
  },
  {
    title: "Enterprise Migration Pattern",
    desc: "Incremental migration: proxy legacy routes via Middleware, migrate page-by-page to Next.js. reMarkable saw 87% decrease in build times migrating incrementally.",
    stack: ["Middleware", "Next.js", "Incremental Adoption", "Rewrites"],
    url: "https://vercel.com/docs/incremental-migration",
    landingPage: "/blog/architectures/enterprise-migration",
  },
];

export default function ArchitecturesPage() {
  return (
    <main className="py-5">
      <div className="container" style={{ maxWidth: "1100px" }}>
        <Link href="/blog" style={{ color: "#667eea", textDecoration: "none", fontSize: "0.9rem" }}>
          ← Back to Blog
        </Link>
        <h1
          className="mt-3 mb-2"
          style={{ fontSize: "2.2rem", fontWeight: 800, color: "#fff" }}
        >
          🏗️ Architecture Patterns
        </h1>
        <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>
          Real-world architecture patterns used by Vercel customers — from e-commerce to AI agents. Click any pattern for a deep-dive explanation.
        </p>

        <div className="d-flex flex-column gap-4">
          {architectures.map((a) => (
            <Link
              key={a.title}
              href={a.landingPage}
              style={{ textDecoration: "none" }}
            >
              <div className="feature-card" style={{ padding: "1.5rem" }}>
                <div className="d-flex justify-content-between align-items-start">
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>{a.title}</h3>
                    <p style={{ fontSize: "0.92rem", marginBottom: "1rem", lineHeight: 1.7 }}>{a.desc}</p>
                    <div className="d-flex flex-wrap gap-2">
                      {a.stack.map((s) => (
                        <span
                          key={s}
                          style={{
                            background: "rgba(102,126,234,0.12)",
                            color: "#a5b4fc",
                            padding: "0.2rem 0.6rem",
                            borderRadius: "6px",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span style={{ color: "#667eea", fontSize: "1.2rem", marginLeft: "1rem", flexShrink: 0 }}>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
