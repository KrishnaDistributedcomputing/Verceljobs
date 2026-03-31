import Link from "next/link";

const categories = [
  {
    title: "📖 SE Technical Study Guide",
    desc: "The complete 22-chapter deep-dive covering everything a Vercel SE needs to know — platform fundamentals to enterprise architecture.",
    link: "/blog/study-guide",
    badge: "Study Guide",
  },
  {
    title: "📰 Latest from Vercel Blog",
    desc: "Curated articles on AI agents, infrastructure, performance engineering, and product announcements from the official Vercel blog.",
    link: "/blog/articles",
    badge: "Articles",
  },
  {
    title: "🏢 Customer Stories & Use Cases",
    desc: "How companies like Stripe, Notion, Leonardo.AI, SERHANT., and Durable build and scale on Vercel.",
    link: "/blog/customers",
    badge: "Customers",
  },
  {
    title: "🏗️ Architecture Patterns",
    desc: "Composable commerce, multi-tenant SaaS, headless CMS, AI-powered apps — real-world architecture patterns on Vercel.",
    link: "/blog/architectures",
    badge: "Architectures",
  },
  {
    title: "💼 Jobs & Careers at Vercel",
    desc: "Current open positions at Vercel — Solutions Architects, Software Engineers, and more across US, EMEA, and APAC.",
    link: "/blog/jobs",
    badge: "Jobs",
  },
  {
    title: "🤖 AI & Developer Tools",
    desc: "AI SDK, AI Gateway, Chat SDK, v0, Sandbox, Workflow SDK — the full Vercel AI ecosystem and how to use it.",
    link: "/blog/ai-tools",
    badge: "AI & Tools",
  },
  {
    title: "☁️ Azure Engineer → Vercel",
    desc: "Complete migration guide for Azure engineers — service mapping, migration patterns, 6-week learning path, common pitfalls, and concept translations.",
    link: "/blog/azure-migration",
    badge: "Migration",
  },
  {
    title: "🎯 How Vercel Interviews",
    desc: "The complete interview guide — 6 stages, technical topics, sample questions, demo ideas, what they look for, compensation, and timeline.",
    link: "/blog/interview-guide",
    badge: "Interview",
  },
];

export default function BlogPage() {
  return (
    <main className="py-5">
      <div className="container" style={{ maxWidth: "1100px" }}>
        <div className="text-center mb-5">
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: 800,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "1rem",
            }}
          >
            Blog & Resources
          </h1>
          <p style={{ color: "#94a3b8", maxWidth: "650px", margin: "0 auto" }}>
            Everything you need to prepare for a Vercel SE role — study guides,
            architecture patterns, customer stories, career opportunities, and the latest from the Vercel ecosystem.
          </p>
        </div>

        <div className="row g-4">
          {categories.map((cat) => (
            <div key={cat.title} className="col-md-6">
              <Link href={cat.link} style={{ textDecoration: "none" }}>
                <div className="feature-card">
                  <span
                    style={{
                      background: "rgba(102,126,234,0.15)",
                      color: "#818cf8",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "12px",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                    }}
                  >
                    {cat.badge}
                  </span>
                  <h3 className="mt-3" style={{ fontSize: "1.2rem" }}>{cat.title}</h3>
                  <p style={{ marginBottom: 0 }}>{cat.desc}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
