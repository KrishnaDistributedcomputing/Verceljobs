import Link from "next/link";

const resources = [
  {
    category: "Platform Fundamentals",
    link: "/se/platform-fundamentals",
    items: [
      { title: "The Vercel Platform — Mental Model", anchor: "#2--the-vercel-platform--mental-model" },
      { title: "Compute — The Three Runtimes", anchor: "#3--compute--the-three-runtimes" },
      { title: "Fluid Compute — The 2025 Game Changer", anchor: "#4--fluid-compute--the-2025-game-changer" },
      { title: "Next.js Rendering Strategies", anchor: "#5--nextjs-rendering-strategies" },
    ],
  },
  {
    category: "Infrastructure & Performance",
    link: "/se/infrastructure-performance",
    items: [
      { title: "The Build Pipeline & Deployment Model", anchor: "#6--the-build-pipeline--deployment-model" },
      { title: "Edge Network & CDN", anchor: "#7--edge-network--cdn" },
      { title: "Caching — The Most Important Topic", anchor: "#9--caching--the-most-important-topic" },
      { title: "Core Web Vitals", anchor: "#20--core-web-vitals--what-you-must-know" },
    ],
  },
  {
    category: "Enterprise & Security",
    link: "/se/enterprise-security",
    items: [
      { title: "Security — WAF, DDoS, Access Control", anchor: "#13--security--waf-ddos-access-control" },
      { title: "Enterprise Features", anchor: "#17--enterprise-features" },
      { title: "Pricing Model — In Depth", anchor: "#16--pricing-model--in-depth" },
    ],
  },
  {
    category: "Advanced Topics",
    link: "/se/advanced-topics",
    items: [
      { title: "The AI Cloud Layer", anchor: "#14--the-ai-cloud-layer" },
      { title: "Composable Architecture & Headless", anchor: "#15--composable-architecture--headless-integrations" },
      { title: "Migration Patterns", anchor: "#19--migration-patterns" },
      { title: "Common Customer Architectures", anchor: "#18--common-customer-architectures" },
    ],
  },
];

const azureVsVercel = [
  {
    area: "Compute",
    azure: "Azure App Service, Azure Functions, Azure Container Apps — you pick the compute, configure scaling rules, set up App Service Plans",
    vercel: "Serverless Functions, Edge Functions, Fluid Compute — zero config, auto-scales per request, pay for active CPU time only",
    insight: "Vercel abstracts away all infrastructure. No App Service Plans, no scale sets. Your framework defines the infra.",
  },
  {
    area: "CDN & Edge",
    azure: "Azure Front Door + Azure CDN — separate services to configure, custom rules engine, origin groups, WAF policies",
    vercel: "Built-in Edge Network (100+ PoPs) — every deployment is globally distributed automatically. Edge Middleware runs code at the edge.",
    insight: "On Azure you wire up Front Door separately. On Vercel the edge is the default — no extra setup.",
  },
  {
    area: "CI/CD & Deployments",
    azure: "Azure DevOps Pipelines or GitHub Actions → Azure App Service/Static Web Apps — you build the pipeline YAML",
    vercel: "Git push → automatic build & deploy. Preview deployments for every PR. Zero pipeline config needed.",
    insight: "Azure gives full pipeline control. Vercel trades that for instant DX — every push is a deployment with a unique URL.",
  },
  {
    area: "Static Sites",
    azure: "Azure Static Web Apps — good for JAMstack, integrates with Azure Functions for API routes",
    vercel: "First-class SSG/ISR/PPR support — static pages with on-demand revalidation, no separate API layer needed",
    insight: "Azure SWA is the closest equivalent but lacks ISR and PPR. Vercel's rendering model is more granular.",
  },
  {
    area: "Serverless Functions",
    azure: "Azure Functions — Consumption or Premium plan, cold starts on Consumption, you manage runtime versions",
    vercel: "Serverless Functions with Fluid Compute — ~0 cold starts due to connection reuse, Active CPU pricing, auto-concurrency",
    insight: "Azure Functions are general-purpose. Vercel Functions are web-optimized with framework-aware routing and zero config.",
  },
  {
    area: "AI / ML",
    azure: "Azure OpenAI Service, Azure AI Studio, Cognitive Services — deep model customization, fine-tuning, enterprise compliance",
    vercel: "AI SDK (TypeScript-first), AI Gateway (multi-provider routing), streaming UI — optimized for front-end AI experiences",
    insight: "Azure excels at model training & enterprise AI. Vercel excels at shipping AI-powered user experiences fast.",
  },
  {
    area: "Security & WAF",
    azure: "Azure WAF (via Front Door or App Gateway), NSGs, Private Endpoints, Azure DDoS Protection Standard",
    vercel: "Built-in Configurable WAF, DDoS mitigation, Bot Management, BotID, Deployment Protection — all integrated",
    insight: "Azure gives granular network control. Vercel bundles security into the platform — simpler but less customizable at the network layer.",
  },
  {
    area: "Caching",
    azure: "Azure CDN caching rules, Azure Redis Cache — manual configuration of cache headers, TTLs, purge policies",
    vercel: "Multi-layer auto-caching: ISR Data Cache, Full Route Cache, CDN Cache — framework-aware cache invalidation with revalidateTag/Path",
    insight: "Vercel caching is framework-integrated. You revalidate from your code. Azure caching is infrastructure-level — more manual.",
  },
  {
    area: "Domains & DNS",
    azure: "Azure DNS zones, custom domain mapping in App Service/Front Door, separate SSL cert management",
    vercel: "Add domain in dashboard → automatic DNS + SSL. Wildcard domains, subdomain routing via middleware.",
    insight: "Azure requires manual DNS zone + cert binding. Vercel handles DNS and SSL automatically.",
  },
  {
    area: "Monitoring",
    azure: "Azure Monitor, Application Insights, Log Analytics — powerful but requires setup and KQL queries",
    vercel: "Speed Insights, Web Vitals, Runtime Logs, Observability suite — purpose-built for web performance",
    insight: "Azure Monitor is enterprise-grade and general. Vercel Observability is web-focused and zero-config.",
  },
  {
    area: "Pricing Model",
    azure: "Pay for provisioned resources (VMs, App Service Plans, reserved capacity) — complex cost forecasting",
    vercel: "Pay per request/execution. Hobby (free), Pro ($20/mo), Enterprise (custom). Active CPU billing for functions.",
    insight: "Azure bills for reserved infra. Vercel bills for usage. Vercel is cheaper for spiky web traffic; Azure may win for steady-state compute.",
  },
  {
    area: "Developer Experience",
    azure: "Azure Portal, CLI, SDKs, Bicep/ARM templates — powerful but steep learning curve",
    vercel: "vercel.com dashboard, `vercel` CLI, Git-based workflow — designed for frontend/fullstack developers",
    insight: "If you're used to Azure's depth, Vercel will feel magically simple. The trade-off is less infrastructure control.",
  },
];

const transitionTips = [
  {
    title: "Map Your Mental Models",
    desc: "Azure App Service → Vercel Project. Azure Functions → Vercel Serverless Functions. Azure Front Door → Vercel Edge Network. Azure DevOps → Git push.",
  },
  {
    title: "Embrace Framework-Defined Infrastructure",
    desc: "In Azure, you define infra then deploy code. In Vercel, your Next.js code defines the infra. A Server Component becomes a serverless function automatically.",
  },
  {
    title: "Rethink Caching",
    desc: "Move from CDN-rule-based caching to code-level revalidation. ISR's revalidate: 60 replaces Azure CDN TTL rules. revalidateTag() replaces cache purge APIs.",
  },
  {
    title: "Leverage Your Enterprise Knowledge",
    desc: "Your Azure experience with SSO/SAML, RBAC, compliance, and enterprise sales cycles directly transfers. Vercel Enterprise has similar concepts — just platform-native.",
  },
  {
    title: "Think Edge-First",
    desc: "Azure runs functions in regions you pick. Vercel Middleware runs at 100+ edge locations by default. Think: what can I push closer to the user?",
  },
  {
    title: "Use Your Architecture Skills",
    desc: "Composable architecture, microservices, API gateways — all apply. On Vercel the building blocks are Next.js routes, API routes, Edge Middleware, and ISR instead of App Gateway + APIM + Functions.",
  },
];

const interviewTopics = [
  "Walk through how a request flows from browser → Vercel Edge → origin → response",
  "Explain SSR vs SSG vs ISR vs PPR — when would you recommend each?",
  "How would you migrate a monolithic PHP site to Vercel?",
  "A customer's LCP is 4.2s — how do you diagnose and fix it?",
  "Explain Fluid Compute and why it matters for cost optimization",
  "How does Vercel's caching architecture work across all layers?",
  "Design an architecture for a headless e-commerce store on Vercel",
  "What security features does Vercel offer for enterprise customers?",
];

export default function SEPage() {
  return (
    <main className="py-5">
      <div className="container" style={{ maxWidth: "1100px" }}>
        {/* Header */}
        <div className="text-center mb-5">
          <span
            style={{
              background: "rgba(102,126,234,0.15)",
              color: "#818cf8",
              padding: "0.3rem 0.75rem",
              borderRadius: "20px",
              fontSize: "0.85rem",
              fontWeight: 600,
            }}
          >
            Solutions Engineer
          </span>
          <h1
            className="mt-3"
            style={{
              fontSize: "2.5rem",
              fontWeight: 800,
              color: "#fff",
            }}
          >
            SE Preparation Resources
          </h1>
          <p style={{ color: "#94a3b8", maxWidth: "600px", margin: "0 auto" }}>
            Quick-access resource hub organized by topic area. Jump directly
            into any section of the study guide.
          </p>
        </div>

        {/* Resource Grid */}
        <div className="row g-4 mb-5">
          {resources.map((group) => (
            <div key={group.category} className="col-md-6">
              <Link href={group.link} style={{ textDecoration: "none" }}>
                <div className="feature-card">
                  <h3 style={{ fontSize: "1.2rem" }}>{group.category}</h3>
                  <ul className="list-unstyled mt-3 mb-0">
                    {group.items.map((item) => (
                      <li key={item.title} className="mb-2">
                        <span
                          style={{
                            color: "#818cf8",
                            fontSize: "0.95rem",
                          }}
                        >
                          → {item.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Interview Prep */}
        <div className="mb-5">
          <h2
            className="mb-4"
            style={{ color: "#fff", fontWeight: 700, fontSize: "1.8rem" }}
          >
            🎯 Top Interview Questions to Prepare
          </h2>
          <div className="row g-3">
            {interviewTopics.map((topic, i) => (
              <div key={i} className="col-md-6">
                <div
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "10px",
                    padding: "1rem 1.25rem",
                  }}
                >
                  <span
                    style={{
                      color: "#667eea",
                      fontWeight: 700,
                      marginRight: "0.5rem",
                    }}
                  >
                    Q{i + 1}.
                  </span>
                  <span style={{ color: "#cbd5e1", fontSize: "0.95rem" }}>
                    {topic}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Azure SE → Vercel Comparison */}
        <div className="mb-5">
          <div className="text-center mb-4">
            <span
              style={{
                background: "rgba(0,120,212,0.15)",
                color: "#60a5fa",
                padding: "0.3rem 0.75rem",
                borderRadius: "20px",
                fontSize: "0.85rem",
                fontWeight: 600,
              }}
            >
              Azure SE → Vercel
            </span>
          </div>
          <h2
            className="mb-2 text-center"
            style={{ color: "#fff", fontWeight: 700, fontSize: "1.8rem" }}
          >
            ☁️ Azure vs Vercel — Compare &amp; Contrast
          </h2>
          <p className="text-center mb-4" style={{ color: "#94a3b8", maxWidth: "700px", margin: "0 auto 2rem" }}>
            Coming from Azure? This section maps every Azure concept to its Vercel equivalent
            so you can leverage your existing knowledge.
          </p>

          {/* Comparison Table */}
          <div className="table-responsive mb-5">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "rgba(102,126,234,0.15)" }}>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.75rem 1rem", color: "#fff", fontWeight: 600, width: "12%" }}>Area</th>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.75rem 1rem", color: "#60a5fa", fontWeight: 600, width: "30%" }}>☁️ Azure</th>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.75rem 1rem", color: "#a78bfa", fontWeight: 600, width: "30%" }}>▲ Vercel</th>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.75rem 1rem", color: "#fbbf24", fontWeight: 600, width: "28%" }}>💡 Key Insight</th>
                </tr>
              </thead>
              <tbody>
                {azureVsVercel.map((row, i) => (
                  <tr key={row.area} style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)" }}>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.75rem 1rem", color: "#fff", fontWeight: 600, fontSize: "0.9rem" }}>
                      {row.area}
                    </td>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.75rem 1rem", color: "#94a3b8", fontSize: "0.88rem", lineHeight: 1.6 }}>
                      {row.azure}
                    </td>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.75rem 1rem", color: "#cbd5e1", fontSize: "0.88rem", lineHeight: 1.6 }}>
                      {row.vercel}
                    </td>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.75rem 1rem", color: "#fbbf24", fontSize: "0.88rem", lineHeight: 1.6, fontStyle: "italic" }}>
                      {row.insight}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Transition Tips */}
          <h3
            className="mb-4"
            style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem" }}
          >
            🚀 Tips for Azure SEs Transitioning to Vercel
          </h3>
          <div className="row g-3 mb-5">
            {transitionTips.map((tip) => (
              <div key={tip.title} className="col-md-6">
                <div
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                    padding: "1.25rem",
                  }}
                >
                  <h4 style={{ color: "#a5b4fc", fontSize: "1rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                    {tip.title}
                  </h4>
                  <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: 0 }}>
                    {tip.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Reference Card */}
          <div
            style={{
              background: "linear-gradient(135deg, rgba(0,120,212,0.1), rgba(102,126,234,0.1))",
              border: "1px solid rgba(102,126,234,0.2)",
              borderRadius: "16px",
              padding: "2rem",
            }}
            className="mb-5"
          >
            <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "1.3rem", marginBottom: "1rem" }}>
              ⚡ Quick Mental Model Mapping
            </h3>
            <div className="row g-2">
              {[
                ["Azure App Service", "→", "Vercel Project"],
                ["Azure Functions", "→", "Vercel Serverless Functions"],
                ["Azure Front Door", "→", "Vercel Edge Network"],
                ["Azure CDN", "→", "Vercel CDN Cache (built-in)"],
                ["Azure Static Web Apps", "→", "Vercel (SSG/ISR/PPR)"],
                ["Azure DevOps Pipelines", "→", "Git push (auto CI/CD)"],
                ["Azure WAF", "→", "Vercel Configurable WAF"],
                ["Azure DNS", "→", "Vercel Domains (auto SSL)"],
                ["App Insights", "→", "Vercel Observability"],
                ["Azure OpenAI Service", "→", "Vercel AI Gateway + AI SDK"],
                ["Azure RBAC", "→", "Vercel RBAC + Team Roles"],
                ["Azure Monitor Alerts", "→", "Vercel Speed Insights + Web Vitals"],
              ].map(([from, arrow, to]) => (
                <div key={from} className="col-md-6 col-lg-4">
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 0" }}>
                    <span style={{ color: "#60a5fa", fontSize: "0.85rem", minWidth: "160px" }}>{from}</span>
                    <span style={{ color: "#64748b" }}>{arrow}</span>
                    <span style={{ color: "#a78bfa", fontSize: "0.85rem", fontWeight: 600 }}>{to}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-4">
          <Link href="/blog" className="btn-glow">
            Read the Full Study Guide →
          </Link>
        </div>
      </div>
    </main>
  );
}
