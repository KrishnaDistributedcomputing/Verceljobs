import Link from "next/link";

const features = [
  {
    icon: "📖",
    title: "Deep Technical Study Guide",
    desc: "Cover-to-cover preparation material spanning platform fundamentals, architecture decisions, pricing, and the AI Cloud layer.",
    link: "/blog",
  },
  {
    icon: "🏗️",
    title: "Architecture Patterns",
    desc: "Learn common customer architectures — from headless e-commerce to multi-tenant SaaS on Vercel's edge network.",
    link: "/blog#18--common-customer-architectures",
  },
  {
    icon: "⚡",
    title: "Compute & Rendering",
    desc: "Master Serverless, Edge, and Fluid Compute runtimes. Understand SSR, SSG, ISR, and PPR inside out.",
    link: "/blog#3--compute--the-three-runtimes",
  },
  {
    icon: "🔒",
    title: "Security & Enterprise",
    desc: "WAF, DDoS protection, RBAC, SSO/SAML, audit logs, and compliance — everything enterprise customers ask about.",
    link: "/blog#13--security--waf-ddos-access-control",
  },
  {
    icon: "🤖",
    title: "AI Cloud Layer",
    desc: "AI SDK, AI Gateway, streaming, tool calling, and integrating LLMs into Vercel-hosted applications.",
    link: "/blog#14--the-ai-cloud-layer",
  },
  {
    icon: "💰",
    title: "Pricing & Migration",
    desc: "Navigate Hobby, Pro, and Enterprise tiers. Learn migration patterns from legacy platforms to Vercel.",
    link: "/blog#16--pricing-model--in-depth",
  },
];

const vercelLinks = [
  { category: "Platform", links: [
    { label: "Vercel Documentation", url: "https://vercel.com/docs" },
    { label: "Fluid Compute", url: "https://vercel.com/fluid" },
    { label: "CDN & Edge Network", url: "https://vercel.com/cdn" },
    { label: "Managed Infrastructure", url: "https://vercel.com/products/managed-infrastructure" },
    { label: "Observability", url: "https://vercel.com/products/observability" },
    { label: "CI/CD & Previews", url: "https://vercel.com/products/previews" },
  ]},
  { category: "AI & Dev Tools", links: [
    { label: "AI Gateway", url: "https://vercel.com/ai-gateway" },
    { label: "AI SDK", url: "https://ai-sdk.dev/" },
    { label: "v0 — AI Assistant", url: "https://v0.app/" },
    { label: "Vercel Agent", url: "https://vercel.com/agent" },
    { label: "Sandbox", url: "https://vercel.com/sandbox" },
    { label: "Templates", url: "https://vercel.com/templates" },
  ]},
  { category: "Security", links: [
    { label: "Platform Security", url: "https://vercel.com/security" },
    { label: "Web Application Firewall", url: "https://vercel.com/security/web-application-firewall" },
    { label: "Bot Management", url: "https://vercel.com/security/bot-management" },
    { label: "BotID", url: "https://vercel.com/botid" },
    { label: "DDoS Mitigation", url: "https://vercel.com/docs/security/ddos-mitigation" },
  ]},
  { category: "Solutions", links: [
    { label: "Composable Commerce", url: "https://vercel.com/solutions/composable-commerce" },
    { label: "Multi-Tenant Platforms", url: "https://vercel.com/solutions/multi-tenant-saas" },
    { label: "Web Apps", url: "https://vercel.com/solutions/web-apps" },
    { label: "Marketing Sites", url: "https://vercel.com/solutions/marketing-sites" },
    { label: "Platform Engineering", url: "https://vercel.com/solutions/platform-engineering" },
  ]},
  { category: "Learn & Community", links: [
    { label: "Knowledge Base", url: "https://vercel.com/kb" },
    { label: "Vercel Blog", url: "https://vercel.com/blog" },
    { label: "Academy", url: "https://vercel.com/academy" },
    { label: "Changelog", url: "https://vercel.com/changelog" },
    { label: "Community", url: "https://community.vercel.com/" },
    { label: "Next.js Docs", url: "https://nextjs.org/docs" },
  ]},
  { category: "Business", links: [
    { label: "Pricing", url: "https://vercel.com/pricing" },
    { label: "Enterprise", url: "https://vercel.com/enterprise" },
    { label: "Customers", url: "https://vercel.com/customers" },
    { label: "Careers", url: "https://vercel.com/careers" },
    { label: "Contact Sales", url: "https://vercel.com/contact/sales" },
    { label: "Startups Program", url: "https://vercel.com/startups" },
  ]},
];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="hero-section">
        <div className="container">
          <h1>VercelJobs</h1>
          <p className="lead">
            Your complete preparation hub for the Vercel Solutions Engineer role.
            Deep technical guides, architecture patterns, and interview preparation
            — all in one place.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link href="/blog" className="btn-glow">
              Read the Study Guide
            </Link>
            <Link href="/se" className="btn-outline-light-custom">
              SE Resources
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-5">
        <div className="container">
          <div className="row text-center g-4">
            {[
              { num: "22", label: "In-Depth Chapters" },
              { num: "100+", label: "Topics Covered" },
              { num: "50+", label: "Interview Questions" },
            ].map((s) => (
              <div key={s.label} className="col-md-4">
                <div className="stat-number">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5" style={{ color: "#fff", fontWeight: 700 }}>
            What&apos;s Inside
          </h2>
          <div className="row g-4">
            {features.map((f) => (
              <div key={f.title} className="col-md-6 col-lg-4">
                <Link href={f.link} style={{ textDecoration: "none" }}>
                  <div className="feature-card">
                    <div className="icon">{f.icon}</div>
                    <h3>{f.title}</h3>
                    <p>{f.desc}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vercel Links */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-2" style={{ color: "#fff", fontWeight: 700 }}>
            Vercel Ecosystem Links
          </h2>
          <p className="text-center mb-5" style={{ color: "#94a3b8" }}>
            Official documentation, tools, and resources from Vercel
          </p>
          <div className="row g-4">
            {vercelLinks.map((group) => (
              <div key={group.category} className="col-md-6 col-lg-4">
                <div className="feature-card">
                  <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>{group.category}</h3>
                  <ul className="list-unstyled mb-0">
                    {group.links.map((link) => (
                      <li key={link.url} className="mb-2">
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "#818cf8",
                            textDecoration: "none",
                            fontSize: "0.92rem",
                            transition: "color 0.2s",
                          }}
                        >
                          ↗ {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
