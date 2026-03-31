import Link from "next/link";

const resources = [
  {
    category: "Platform Fundamentals",
    items: [
      { title: "The Vercel Platform — Mental Model", anchor: "#2--the-vercel-platform--mental-model" },
      { title: "Compute — The Three Runtimes", anchor: "#3--compute--the-three-runtimes" },
      { title: "Fluid Compute — The 2025 Game Changer", anchor: "#4--fluid-compute--the-2025-game-changer" },
      { title: "Next.js Rendering Strategies", anchor: "#5--nextjs-rendering-strategies" },
    ],
  },
  {
    category: "Infrastructure & Performance",
    items: [
      { title: "The Build Pipeline & Deployment Model", anchor: "#6--the-build-pipeline--deployment-model" },
      { title: "Edge Network & CDN", anchor: "#7--edge-network--cdn" },
      { title: "Caching — The Most Important Topic", anchor: "#9--caching--the-most-important-topic" },
      { title: "Core Web Vitals", anchor: "#20--core-web-vitals--what-you-must-know" },
    ],
  },
  {
    category: "Enterprise & Security",
    items: [
      { title: "Security — WAF, DDoS, Access Control", anchor: "#13--security--waf-ddos-access-control" },
      { title: "Enterprise Features", anchor: "#17--enterprise-features" },
      { title: "Pricing Model — In Depth", anchor: "#16--pricing-model--in-depth" },
    ],
  },
  {
    category: "Advanced Topics",
    items: [
      { title: "The AI Cloud Layer", anchor: "#14--the-ai-cloud-layer" },
      { title: "Composable Architecture & Headless", anchor: "#15--composable-architecture--headless-integrations" },
      { title: "Migration Patterns", anchor: "#19--migration-patterns" },
      { title: "Common Customer Architectures", anchor: "#18--common-customer-architectures" },
    ],
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
              <div className="feature-card">
                <h3 style={{ fontSize: "1.2rem" }}>{group.category}</h3>
                <ul className="list-unstyled mt-3 mb-0">
                  {group.items.map((item) => (
                    <li key={item.title} className="mb-2">
                      <Link
                        href={`/blog${item.anchor}`}
                        style={{
                          color: "#818cf8",
                          textDecoration: "none",
                          fontSize: "0.95rem",
                        }}
                      >
                        → {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
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
