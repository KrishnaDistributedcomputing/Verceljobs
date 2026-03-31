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
    </main>
  );
}
