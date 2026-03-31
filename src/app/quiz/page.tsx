import Link from "next/link";

const quizTopics = [
  {
    title: "🏗️ Platform Fundamentals",
    desc: "Vercel mental model, compute runtimes, Edge vs Serverless, Fluid Compute, FDI, and company facts.",
    link: "/quiz/platform",
    questions: 20,
    difficulty: "Foundational",
    color: "#667eea",
  },
  {
    title: "⚡ Rendering & Next.js",
    desc: "SSG, ISR, SSR, RSC, PPR, Streaming, Draft Mode — when to use each, trade-offs, architecture patterns, and migration.",
    link: "/quiz/rendering",
    questions: 20,
    difficulty: "Core",
    color: "#8b5cf6",
  },
  {
    title: "💾 Caching Deep-Dive",
    desc: "The four cache layers, revalidation strategies, webhooks, Cache-Control headers, anti-patterns, and cost implications.",
    link: "/quiz/caching",
    questions: 20,
    difficulty: "Critical",
    color: "#06b6d4",
  },
  {
    title: "🌐 Edge & Performance",
    desc: "Edge Network, Middleware, Turbopack, Core Web Vitals (LCP, CLS, INP), next/image, next/font, and optimization patterns.",
    link: "/quiz/performance",
    questions: 20,
    difficulty: "Core",
    color: "#10b981",
  },
  {
    title: "🤖 AI & Modern Stack",
    desc: "AI SDK 6, AI Gateway, useChat, Workflows, Sandbox, v0, BYOK, provider failover, and cost optimization.",
    link: "/quiz/ai",
    questions: 20,
    difficulty: "Advanced",
    color: "#f59e0b",
  },
  {
    title: "🔒 Enterprise & Security",
    desc: "WAF, compliance, SAML SSO, Hobby/Pro/Enterprise pricing, DDoS, audit logs, deployment protection, and cost management.",
    link: "/quiz/enterprise",
    questions: 20,
    difficulty: "Enterprise",
    color: "#ef4444",
  },
  {
    title: "🏢 Customer Scenarios",
    desc: "Real-world architecture patterns, code audits, migrations (CRA, Gatsby, Pages Router), customer objections, POC strategies, and workshops.",
    link: "/quiz/scenarios",
    questions: 20,
    difficulty: "SE Interview",
    color: "#ec4899",
  },
];

const difficultyColors: Record<string, string> = {
  Foundational: "#667eea",
  Core: "#8b5cf6",
  Critical: "#06b6d4",
  Advanced: "#f59e0b",
  Enterprise: "#ef4444",
  "SE Interview": "#ec4899",
};

export default function QuizPage() {
  return (
    <main className="py-5">
      <div className="container" style={{ maxWidth: "1100px" }}>
        <div className="text-center mb-5">
          <span style={{
            background: "rgba(102,126,234,0.15)",
            color: "#818cf8",
            padding: "0.3rem 0.75rem",
            borderRadius: "20px",
            fontSize: "0.85rem",
            fontWeight: 600,
          }}>
            Interactive Quiz
          </span>
          <h1
            className="mt-3"
            style={{
              fontSize: "2.5rem",
              fontWeight: 800,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            SE Knowledge Quiz
          </h1>
          <p style={{ color: "#94a3b8", maxWidth: "600px", margin: "0 auto" }}>
            Test your Vercel SE knowledge across 7 topics. 140 questions total covering
            everything from platform fundamentals to customer scenarios.
          </p>
        </div>

        <div className="row g-4">
          {quizTopics.map((topic) => (
            <div key={topic.title} className="col-md-6">
              <Link href={topic.link} style={{ textDecoration: "none" }}>
                <div className="feature-card" style={{ padding: "1.5rem" }}>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h3 style={{ fontSize: "1.15rem", marginBottom: 0 }}>{topic.title}</h3>
                    <span style={{
                      background: `${difficultyColors[topic.difficulty]}22`,
                      color: difficultyColors[topic.difficulty],
                      padding: "0.15rem 0.5rem",
                      borderRadius: "10px",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}>
                      {topic.difficulty}
                    </span>
                  </div>
                  <p style={{ color: "#94a3b8", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "0.75rem" }}>
                    {topic.desc}
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span style={{ color: "#64748b", fontSize: "0.8rem" }}>
                      {topic.questions} questions
                    </span>
                    <span style={{ color: topic.color, fontSize: "0.85rem", fontWeight: 600 }}>
                      Start Quiz →
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <Link href="/se" className="btn-glow">
            ← Back to SE Resources
          </Link>
        </div>
      </div>
    </main>
  );
}
