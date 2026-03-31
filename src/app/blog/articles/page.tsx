import Link from "next/link";

const articles = [
  {
    date: "Mar 31, 2026",
    tag: "Customers",
    title: "How FLORA Shipped a Creative Agent on Vercel's AI Stack",
    summary: "FLORA built FAUNA, a creative agent that orchestrates 50+ image models for fashion campaigns. 2x faster to production with Vercel's AI SDK, Workflow SDK, and Fluid Compute.",
    url: "https://vercel.com/blog/how-flora-shipped-a-creative-agent-on-vercels-ai-stack",
  },
  {
    date: "Mar 30, 2026",
    tag: "Engineering",
    title: "Agent Responsibly",
    summary: "An internal Vercel talk on shipping AI-generated code safely. Covers false confidence in agent output, self-driving deployments, continuous validation, and executable guardrails.",
    url: "https://vercel.com/blog/agent-responsibly",
  },
  {
    date: "Mar 25, 2026",
    tag: "Product",
    title: "Unified Reporting for All AI Gateway Usage",
    summary: "The Custom Reporting API gives programmatic access to cost, token usage, and request volume across AI Gateway traffic — including BYOK. One platform saved $80K.",
    url: "https://vercel.com/blog/unified-reporting-for-your-ai-spend",
  },
  {
    date: "Mar 23, 2026",
    tag: "Product",
    title: "new.website Joins Forces with v0",
    summary: "new.website's team joins v0 to bring built-in forms, SEO, and content management as native agent capabilities in Vercel's AI development assistant.",
    url: "https://vercel.com/blog/new-website-joins-forces-with-v0",
  },
  {
    date: "Mar 23, 2026",
    tag: "Customers",
    title: "SERHANT.'s Playbook for Rapid AI Iteration",
    summary: "From 200 pilot agents to 900+ users. SERHANT. uses AI SDK for model independence, orchestrates OpenAI/Claude/Gemini by task, and scaled without replatforming.",
    url: "https://vercel.com/blog/serhants-playbook-for-rapid-ai-iteration",
  },
  {
    date: "Mar 21, 2026",
    tag: "Engineering",
    title: "Making Turborepo 96% Faster with Agents, Sandboxes, and Humans",
    summary: "8 days of mixing AI agents, Vercel Sandboxes, and classic profiling. Time to First Task dropped from 8.1s to 716ms on a 1,000-package monorepo.",
    url: "https://vercel.com/blog/making-turborepo-ninety-six-percent-faster-with-agents-sandboxes-and-humans",
  },
  {
    date: "Mar 19, 2026",
    tag: "Engineering",
    title: "Build Knowledge Agents Without Embeddings",
    summary: "Replace vector pipelines with filesystem + bash. The Knowledge Agent Template uses Vercel Sandbox, AI SDK, and Chat SDK — cost dropped from $1.00 to $0.25 per query.",
    url: "https://vercel.com/blog/build-knowledge-agents-without-embeddings",
  },
  {
    date: "Mar 19, 2026",
    tag: "Product",
    title: "Chat SDK Brings Agents to Your Users",
    summary: "Write once, deploy everywhere. Chat SDK connects agents to Slack, Teams, Discord, WhatsApp, Telegram, GitHub, and Linear from a single TypeScript codebase.",
    url: "https://vercel.com/blog/chat-sdk-brings-agents-to-your-users",
  },
  {
    date: "Mar 19, 2026",
    tag: "Customers",
    title: "Two Startups at Global Scale Without DevOps",
    summary: "Leonardo.AI processes 4.5M images/day. Relevance AI runs 50K agents. Neither has a DevOps team. Both run entirely on Vercel's auto-scaling infrastructure.",
    url: "https://vercel.com/blog/two-startups-at-global-scale-without-devops",
  },
  {
    date: "Mar 18, 2026",
    tag: "Customers",
    title: "360 Billion Tokens, 3 Million Customers, 6 Engineers",
    summary: "Durable serves 3M+ businesses with 6 engineers. They migrated their entire stack to Vercel, ship new agents in a day, and serve ~1.1B tokens daily.",
    url: "https://vercel.com/blog/360-billion-tokens-3-million-customers-6-engineers",
  },
  {
    date: "Mar 17, 2026",
    tag: "Community",
    title: "Vercel Open Source Program: Winter 2026 Cohort",
    summary: "30+ open source projects join the winter cohort — from AI-native apps and design systems to developer tooling and scientific research.",
    url: "https://vercel.com/blog/vercel-open-source-program-winter-2026-cohort",
  },
  {
    date: "Mar 16, 2026",
    tag: "Community",
    title: "Meet the 2026 Vercel AI Accelerator Cohort",
    summary: "39 early-stage teams from across the globe. $8M+ in partner credits. Building everything from robot debugging to AI travel platforms on Vercel.",
    url: "https://vercel.com/blog/2026-vercel-ai-accelerator-cohort",
  },
];

const tagColors: Record<string, string> = {
  Customers: "#10b981",
  Engineering: "#f59e0b",
  Product: "#8b5cf6",
  Community: "#ec4899",
};

export default function ArticlesPage() {
  return (
    <main className="py-5">
      <div className="container" style={{ maxWidth: "1000px" }}>
        <Link href="/blog" style={{ color: "#667eea", textDecoration: "none", fontSize: "0.9rem" }}>
          ← Back to Blog
        </Link>
        <h1
          className="mt-3 mb-2"
          style={{ fontSize: "2.2rem", fontWeight: 800, color: "#fff" }}
        >
          📰 Latest from the Vercel Blog
        </h1>
        <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>
          Curated articles from <a href="https://vercel.com/blog" target="_blank" rel="noopener noreferrer" style={{ color: "#818cf8" }}>vercel.com/blog</a> — freshly crawled March 2026.
        </p>

        <div className="d-flex flex-column gap-3">
          {articles.map((a) => (
            <a
              key={a.title}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <div className="feature-card" style={{ padding: "1.5rem" }}>
                <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
                  <span style={{ color: "#64748b", fontSize: "0.8rem" }}>{a.date}</span>
                  <span
                    style={{
                      background: `${tagColors[a.tag] || "#667eea"}22`,
                      color: tagColors[a.tag] || "#667eea",
                      padding: "0.15rem 0.5rem",
                      borderRadius: "10px",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                    }}
                  >
                    {a.tag}
                  </span>
                </div>
                <h3 style={{ fontSize: "1.15rem", marginBottom: "0.5rem" }}>{a.title}</h3>
                <p style={{ marginBottom: 0, fontSize: "0.9rem" }}>{a.summary}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
