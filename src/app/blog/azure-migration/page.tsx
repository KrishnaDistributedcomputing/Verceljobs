import Link from "next/link";

/* ── Service Mapping ── */
const serviceMap = [
  { azure: "Azure App Service", vercel: "Vercel Project", notes: "Each App Service maps to a Vercel Project. No App Service Plan needed — Vercel auto-scales." },
  { azure: "Azure Functions (Consumption)", vercel: "Serverless Functions", notes: "Drop your API logic into /app/api/ routes. Zero cold-start overhead with Fluid Compute." },
  { azure: "Azure Functions (Premium/Dedicated)", vercel: "Fluid Compute", notes: "Active CPU pricing replaces always-on VMs. Auto-concurrency handles burst traffic." },
  { azure: "Azure Static Web Apps", vercel: "Next.js SSG + ISR", notes: "ISR gives you static speed with on-demand revalidation — no redeploy needed to update content." },
  { azure: "Azure Front Door + CDN", vercel: "Edge Network (built-in)", notes: "Every deployment is globally distributed across 100+ PoPs. No separate CDN service to configure." },
  { azure: "Azure DevOps / GitHub Actions → App Service", vercel: "Git Push → Auto Deploy", notes: "Delete your pipeline YAML. Push to main → production. Push a PR branch → preview URL." },
  { azure: "Azure WAF (via Front Door)", vercel: "Vercel Configurable WAF", notes: "Rate limiting, geo-blocking, bot management, IP allowlists — all in the dashboard or vercel.json." },
  { azure: "Azure DNS + App Service Domains", vercel: "Vercel Domains", notes: "Add a domain → auto DNS + auto SSL. Wildcard domains and subdomain routing via Middleware." },
  { azure: "Azure Redis Cache", vercel: "Vercel KV (Redis-compatible)", notes: "Same Redis protocol. Global replication. No cluster to manage." },
  { azure: "Azure Cosmos DB / SQL", vercel: "Vercel Postgres / Neon", notes: "Serverless Postgres with connection pooling. Or use Vercel's storage partners (PlanetScale, Supabase)." },
  { azure: "Azure Blob Storage", vercel: "Vercel Blob", notes: "Upload files via SDK. Global CDN delivery. S3-compatible API." },
  { azure: "Azure Application Insights", vercel: "Vercel Observability", notes: "Speed Insights, Web Vitals, Runtime Logs. Purpose-built for web. No KQL queries needed." },
  { azure: "Azure OpenAI Service", vercel: "AI Gateway + AI SDK", notes: "AI Gateway routes to 100+ models. AI SDK gives you streaming, tool-calling, structured output in TypeScript." },
  { azure: "Azure Container Apps", vercel: "Vercel + Docker (via Nixpacks)", notes: "Vercel auto-detects frameworks. For custom containers, use buildCommand in vercel.json." },
  { azure: "Azure APIM", vercel: "Next.js API Routes + Middleware", notes: "Route handlers in /app/api/ replace APIM policies. Middleware handles auth, rewrites, rate limiting at the edge." },
  { azure: "Azure Key Vault", vercel: "Vercel Environment Variables", notes: "Scoped per environment (Production/Preview/Dev). Encrypted at rest. Integrations pull from external vaults." },
];

/* ── Migration Patterns ── */
const migrationPatterns = [
  {
    title: "Static Site (Azure SWA → Vercel)",
    difficulty: "Easy",
    steps: [
      "Export your static site or move the repo to Vercel",
      "Connect GitHub repo in Vercel dashboard",
      "Vercel auto-detects framework (Next.js, Nuxt, Astro, etc.)",
      "Map custom domain — SSL is automatic",
      "Delete Azure SWA resource",
    ],
    tip: "If you used Azure Functions for API routes, convert them to Next.js API Routes (/app/api/) — same serverless model, zero config.",
  },
  {
    title: "Full-Stack App (App Service → Vercel)",
    difficulty: "Medium",
    steps: [
      "Refactor to Next.js App Router (or Pages Router)",
      "Move backend routes to /app/api/ serverless functions",
      "Replace Express middleware with Next.js Middleware",
      "Move environment variables from App Service Config → Vercel dashboard",
      "Set up preview deployments for each PR branch",
      "Configure production domain and go live",
    ],
    tip: "You don't need to migrate everything at once. Use Vercel rewrites to proxy unmigrated routes to your existing App Service.",
  },
  {
    title: "Microservices (Container Apps → Vercel + Backends)",
    difficulty: "Advanced",
    steps: [
      "Identify frontend / BFF services → move to Vercel",
      "Keep backend microservices on Azure (Vercel supports any backend origin)",
      "Use Next.js API Routes as BFF layer calling Azure services",
      "Configure Vercel rewrites for backend proxy routes",
      "Set up Edge Middleware for auth, routing, A/B testing",
      "Gradually migrate services as needed",
    ],
    tip: "Vercel is ideal as the frontend platform in a composable architecture. Keep heavy backend workloads (queues, ML inference) on Azure.",
  },
  {
    title: "E-Commerce (Azure + Shopify → Vercel + Headless)",
    difficulty: "Medium",
    steps: [
      "Choose a headless CMS (Contentful, Sanity, Hygraph) and commerce backend (Shopify, commercetools)",
      "Build the storefront in Next.js with ISR for product pages",
      "Use On-Demand Revalidation webhooks for price/inventory updates",
      "Deploy to Vercel — edge caching gives sub-50ms TTFB globally",
      "Integrate checkout via client-side SDK or server actions",
    ],
    tip: "ISR is the killer feature for commerce. Static speed + real-time freshness. No equivalent exists in Azure Static Web Apps.",
  },
  {
    title: "AI Application (Azure OpenAI → Vercel AI Stack)",
    difficulty: "Medium",
    steps: [
      "Install AI SDK: npm install ai @ai-sdk/openai",
      "Replace Azure OpenAI REST/SDK calls with AI SDK's unified API",
      "Use streamText() for streaming chat responses",
      "Add AI Gateway for multi-provider failover and cost tracking",
      "Deploy to Vercel — Fluid Compute handles long-running AI inference",
    ],
    tip: "You can still use Azure OpenAI as a provider through AI Gateway. You're not replacing the model — you're improving the developer experience around it.",
  },
];

/* ── Learning Path ── */
const learningPath = [
  { week: "Week 1", focus: "Platform Fundamentals", tasks: "Deploy your first Next.js app. Understand Vercel Project → Deployment → Domain flow. Set up preview deployments." },
  { week: "Week 2", focus: "Rendering & Data", tasks: "Build pages with SSR, SSG, ISR, and PPR. Use Server Components and Server Actions. Connect Vercel Postgres or KV." },
  { week: "Week 3", focus: "Edge & Performance", tasks: "Write Edge Middleware for auth/geo-routing. Analyze Core Web Vitals with Speed Insights. Optimize LCP, CLS, INP." },
  { week: "Week 4", focus: "Caching & ISR Deep-Dive", tasks: "Implement ISR with revalidation. Use revalidateTag/revalidatePath. Understand the 4-tier Vercel cache (Data → Full Route → CDN → Client)." },
  { week: "Week 5", focus: "AI & Advanced Features", tasks: "Build a chat UI with AI SDK + AI Gateway. Use Vercel Flags for A/B testing. Implement Conformance and DPR." },
  { week: "Week 6", focus: "Enterprise & Migration", tasks: "Set up SAML SSO, RBAC, Audit Logs. Practice migration patterns. Present an architecture diagram for a customer scenario." },
];

/* ── Common Pitfalls ── */
const pitfalls = [
  {
    mistake: "Trying to replicate Azure's infrastructure model",
    fix: "Vercel is framework-defined infrastructure. Your code IS the config. Don't create infrastructure separately — let Next.js define it.",
  },
  {
    mistake: "Setting up a CI/CD pipeline manually",
    fix: "Delete the pipeline YAML. Vercel's Git integration handles build, test, deploy. Use vercel.json for build settings, not pipeline stages.",
  },
  {
    mistake: "Deploying to a single region",
    fix: "Vercel is global by default. Every deployment serves from 100+ edge locations. There's no 'region selector' — the edge IS your CDN.",
  },
  {
    mistake: "Using Azure Redis for session storage",
    fix: "Use Vercel KV or stateless sessions (JWT). Serverless functions are stateless — don't rely on in-memory state. Use cookies or external stores.",
  },
  {
    mistake: "Over-engineering API layers (APIM patterns)",
    fix: "Next.js Route Handlers + Middleware replace most APIM needs. Auth, rate limiting, request transformation — all in Middleware at the edge.",
  },
  {
    mistake: "Ignoring ISR and using CSR for everything",
    fix: "ISR is Vercel's superpower. Static speed with dynamic freshness. If your page can be cached even for 60 seconds, use ISR.",
  },
  {
    mistake: "Not using preview deployments",
    fix: "Every PR gets a unique URL automatically. Use it for QA, stakeholder review, and integration testing. This replaces Azure DevOps staging slots.",
  },
  {
    mistake: "Managing SSL certificates manually",
    fix: "Vercel handles SSL automatically for all domains. No cert management, no renewal reminders, no Key Vault integration needed.",
  },
];

/* ── Concept Translator ── */
const conceptTranslations = [
  { azure: "App Service Plan (B1, S1, P1v3)", vercel: "No equivalent needed", why: "Vercel auto-scales. You don't pick a 'plan size' for compute." },
  { azure: "Deployment Slots (staging/production)", vercel: "Preview Deployments + Promote to Production", why: "Every branch gets a preview URL. Promote any deployment to production instantly." },
  { azure: "Application Settings / Configuration", vercel: "Environment Variables (Production/Preview/Dev)", why: "Scoped per environment. No need to restart the app after changes." },
  { azure: "Virtual Network / Private Endpoints", vercel: "Secure Compute + Private Connectivity", why: "Enterprise plan feature. Vercel runs in isolated compute with private backend connectivity." },
  { azure: "Traffic Manager / Load Balancer", vercel: "Global Edge Network (automatic)", why: "Every request is routed to the nearest edge. No traffic manager to configure." },
  { azure: "Azure Monitor Alerts", vercel: "Vercel Checks + Speed Insights Alerts", why: "Automated checks on every deployment. Web Vitals monitoring with threshold alerts." },
  { azure: "Bicep / ARM Templates", vercel: "vercel.json + Framework Config", why: "Infrastructure as code is replaced by framework-defined infrastructure. vercel.json for overrides only." },
  { azure: "Azure DevOps Boards", vercel: "Vercel Comments + GitHub Issues", why: "Preview deployments have inline commenting. Integrate with your existing GitHub workflow." },
];

const difficultyColors: Record<string, string> = {
  Easy: "#10b981",
  Medium: "#f59e0b",
  Advanced: "#ef4444",
};

export default function AzureMigrationPage() {
  return (
    <main className="py-5">
      <div className="container" style={{ maxWidth: "1100px" }}>
        <Link href="/blog" style={{ color: "#667eea", textDecoration: "none", fontSize: "0.9rem" }}>
          ← Back to Blog
        </Link>

        {/* Header */}
        <div className="mt-3 mb-5">
          <div className="d-flex align-items-center gap-2 mb-2">
            <span style={{ background: "rgba(0,120,212,0.15)", color: "#60a5fa", padding: "0.2rem 0.6rem", borderRadius: "12px", fontSize: "0.75rem", fontWeight: 600 }}>
              Azure → Vercel
            </span>
            <span style={{ background: "rgba(16,185,129,0.15)", color: "#10b981", padding: "0.2rem 0.6rem", borderRadius: "12px", fontSize: "0.75rem", fontWeight: 600 }}>
              Migration Guide
            </span>
          </div>
          <h1 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#fff" }}>
            ☁️ Azure Engineer&apos;s Guide to Vercel
          </h1>
          <p style={{ color: "#94a3b8", maxWidth: "750px", lineHeight: 1.7 }}>
            A comprehensive migration and learning guide for Azure engineers moving to Vercel.
            Covers service mapping, migration patterns, learning paths, common pitfalls, and
            concept translations — everything you need to hit the ground running.
          </p>
        </div>

        {/* ─── Section 1: Service Mapping Table ─── */}
        <section className="mb-5">
          <h2 className="mb-3" style={{ color: "#fff", fontWeight: 700, fontSize: "1.6rem" }}>
            🔄 Complete Service Mapping
          </h2>
          <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>
            Every Azure service you use today has a Vercel equivalent (or isn&apos;t needed). Here&apos;s the full map.
          </p>
          <div className="table-responsive">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "rgba(102,126,234,0.15)" }}>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.7rem 1rem", color: "#60a5fa", fontWeight: 600, width: "22%" }}>☁️ Azure Service</th>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.7rem 1rem", color: "#a78bfa", fontWeight: 600, width: "22%" }}>▲ Vercel Equivalent</th>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.7rem 1rem", color: "#94a3b8", fontWeight: 600, width: "56%" }}>Migration Notes</th>
                </tr>
              </thead>
              <tbody>
                {serviceMap.map((row, i) => (
                  <tr key={row.azure} style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)" }}>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.65rem 1rem", color: "#60a5fa", fontSize: "0.88rem", fontWeight: 500 }}>{row.azure}</td>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.65rem 1rem", color: "#a78bfa", fontSize: "0.88rem", fontWeight: 600 }}>{row.vercel}</td>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.65rem 1rem", color: "#cbd5e1", fontSize: "0.85rem", lineHeight: 1.6 }}>{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── Section 2: Migration Patterns ─── */}
        <section className="mb-5">
          <h2 className="mb-3" style={{ color: "#fff", fontWeight: 700, fontSize: "1.6rem" }}>
            🚀 Migration Patterns
          </h2>
          <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>
            Step-by-step playbooks for the most common Azure → Vercel migration scenarios.
          </p>
          <div className="d-flex flex-column gap-4">
            {migrationPatterns.map((p) => (
              <div key={p.title} className="feature-card" style={{ padding: "1.5rem" }}>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h3 style={{ fontSize: "1.15rem", marginBottom: 0 }}>{p.title}</h3>
                  <span style={{
                    background: `${difficultyColors[p.difficulty]}22`,
                    color: difficultyColors[p.difficulty],
                    padding: "0.15rem 0.5rem",
                    borderRadius: "10px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                  }}>
                    {p.difficulty}
                  </span>
                </div>
                <ol style={{ color: "#cbd5e1", fontSize: "0.9rem", lineHeight: 1.8, paddingLeft: "1.25rem", marginBottom: "0.75rem" }}>
                  {p.steps.map((s, i) => <li key={i}>{s}</li>)}
                </ol>
                <div style={{ background: "rgba(102,126,234,0.08)", border: "1px solid rgba(102,126,234,0.15)", borderRadius: "8px", padding: "0.75rem 1rem" }}>
                  <span style={{ color: "#818cf8", fontWeight: 600, fontSize: "0.85rem" }}>💡 Pro Tip: </span>
                  <span style={{ color: "#94a3b8", fontSize: "0.85rem" }}>{p.tip}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Section 3: 6-Week Learning Path ─── */}
        <section className="mb-5">
          <h2 className="mb-3" style={{ color: "#fff", fontWeight: 700, fontSize: "1.6rem" }}>
            📚 6-Week Learning Path for Azure Engineers
          </h2>
          <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>
            A structured ramp-up plan to go from Azure expert to Vercel-proficient in 6 weeks.
          </p>
          <div className="row g-3">
            {learningPath.map((week) => (
              <div key={week.week} className="col-md-6">
                <div style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  padding: "1.25rem",
                }}>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <span style={{ background: "rgba(102,126,234,0.2)", color: "#818cf8", padding: "0.15rem 0.5rem", borderRadius: "8px", fontSize: "0.75rem", fontWeight: 700 }}>
                      {week.week}
                    </span>
                    <span style={{ color: "#fff", fontWeight: 600, fontSize: "0.95rem" }}>{week.focus}</span>
                  </div>
                  <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: 0 }}>{week.tasks}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Section 4: Common Pitfalls ─── */}
        <section className="mb-5">
          <h2 className="mb-3" style={{ color: "#fff", fontWeight: 700, fontSize: "1.6rem" }}>
            ⚠️ Common Pitfalls When Coming from Azure
          </h2>
          <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>
            Azure habits that will trip you up on Vercel — and how to fix them.
          </p>
          <div className="row g-3">
            {pitfalls.map((p) => (
              <div key={p.mistake} className="col-md-6">
                <div style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  padding: "1.25rem",
                }}>
                  <p style={{ color: "#f87171", fontSize: "0.9rem", fontWeight: 600, marginBottom: "0.4rem" }}>
                    ❌ {p.mistake}
                  </p>
                  <p style={{ color: "#10b981", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: 0 }}>
                    ✅ {p.fix}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Section 5: Concept Translator ─── */}
        <section className="mb-5">
          <h2 className="mb-3" style={{ color: "#fff", fontWeight: 700, fontSize: "1.6rem" }}>
            🗺️ Concept Translator
          </h2>
          <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>
            Azure concepts that don&apos;t have a 1:1 equivalent — and why.
          </p>
          <div className="table-responsive">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "rgba(102,126,234,0.15)" }}>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.7rem 1rem", color: "#60a5fa", fontWeight: 600, width: "25%" }}>☁️ Azure Concept</th>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.7rem 1rem", color: "#a78bfa", fontWeight: 600, width: "25%" }}>▲ Vercel Equivalent</th>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.7rem 1rem", color: "#fbbf24", fontWeight: 600, width: "50%" }}>Why It&apos;s Different</th>
                </tr>
              </thead>
              <tbody>
                {conceptTranslations.map((row, i) => (
                  <tr key={row.azure} style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)" }}>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.65rem 1rem", color: "#60a5fa", fontSize: "0.88rem" }}>{row.azure}</td>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.65rem 1rem", color: "#a78bfa", fontSize: "0.88rem", fontWeight: 600 }}>{row.vercel}</td>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.65rem 1rem", color: "#fbbf24", fontSize: "0.85rem", lineHeight: 1.6, fontStyle: "italic" }}>{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── Key Takeaway ─── */}
        <div style={{
          background: "linear-gradient(135deg, rgba(0,120,212,0.1), rgba(102,126,234,0.1))",
          border: "1px solid rgba(102,126,234,0.2)",
          borderRadius: "16px",
          padding: "2rem",
        }} className="mb-5">
          <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "1.3rem", marginBottom: "1rem" }}>
            🎯 The #1 Mindset Shift
          </h3>
          <p style={{ color: "#cbd5e1", fontSize: "1rem", lineHeight: 1.8, marginBottom: "0.75rem" }}>
            On Azure, you <strong style={{ color: "#60a5fa" }}>provision infrastructure</strong> and then deploy code onto it.
            On Vercel, your <strong style={{ color: "#a78bfa" }}>code defines the infrastructure</strong>.
          </p>
          <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: 0 }}>
            A React Server Component becomes a serverless function. An <code style={{ color: "#818cf8" }}>export const revalidate = 60</code> becomes an ISR cache rule.
            A <code style={{ color: "#818cf8" }}>middleware.ts</code> file becomes edge compute at 100+ locations.
            You don&apos;t configure infrastructure — you write code, and the platform infers the optimal infrastructure from your framework.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center py-3">
          <Link href="/se" className="btn-glow" style={{ marginRight: "1rem" }}>
            SE Resources & Full Comparison →
          </Link>
          <Link href="/blog/study-guide" className="btn-glow">
            Read the Study Guide →
          </Link>
        </div>
      </div>
    </main>
  );
}
