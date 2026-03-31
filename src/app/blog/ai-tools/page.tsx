import Link from "next/link";

const tools = [
  {
    name: "AI SDK",
    desc: "TypeScript library for building AI applications. Unified interface across OpenAI, Anthropic, Google, and more. Streaming, tool calling, and structured outputs built in.",
    url: "https://ai-sdk.dev/",
    badge: "Core",
  },
  {
    name: "AI Gateway",
    desc: "Route to 100+ AI models from a single endpoint. Automatic failover, usage tracking, BYOK support, and the new Custom Reporting API for cost visibility per customer/feature.",
    url: "https://vercel.com/ai-gateway",
    badge: "Core",
  },
  {
    name: "Chat SDK",
    desc: "Build agents that work across Slack, Teams, Discord, WhatsApp, Telegram, GitHub, and Linear from a single codebase. Platform adapters handle rendering differences.",
    url: "https://chat-sdk.dev/",
    badge: "New",
  },
  {
    name: "Workflow SDK",
    desc: "Durable orchestration for AI agents. DurableAgent persists state, retries on failure, and handles long-running tasks. Powers FLORA's parallel image generation pipeline.",
    url: "https://useworkflow.dev/",
    badge: "New",
  },
  {
    name: "v0",
    desc: "AI-powered development assistant. Generate full-stack Next.js applications from prompts. Now integrating new.website's built-in forms, SEO, and content management.",
    url: "https://v0.app/",
    badge: "Product",
  },
  {
    name: "Vercel Sandbox",
    desc: "Ephemeral Linux containers for secure code execution. Used for benchmarking (Turborepo 96% speedup), knowledge agents (filesystem search), and untrusted code.",
    url: "https://vercel.com/sandbox",
    badge: "New",
  },
  {
    name: "Flags SDK",
    desc: "Feature flags SDK for progressive rollouts and A/B testing. Integrates with Vercel's toolbar for live flag management in preview deployments.",
    url: "https://flags-sdk.dev/",
    badge: "SDK",
  },
  {
    name: "Streamdown AI",
    desc: "Real-time markdown streaming for AI responses. Handles formatting conversion across platforms automatically.",
    url: "https://streamdown.ai/",
    badge: "New",
  },
  {
    name: "Vercel Agent",
    desc: "Vercel's own AI agent for platform operations. Interact with deployments, domains, and infrastructure programmatically.",
    url: "https://vercel.com/agent",
    badge: "New",
  },
  {
    name: "Vercel MCP",
    desc: "Model Context Protocol server for Vercel — lets AI agents interact with your Vercel projects, deployments, and infrastructure.",
    url: "https://vercel.com/docs/agent-resources/vercel-mcp",
    badge: "Agent",
  },
  {
    name: "Knowledge Agent Template",
    desc: "Open source, file-system-based agent. No vector DB or embeddings needed. Uses grep/find/cat in Sandbox for deterministic, explainable retrieval at $0.25/query.",
    url: "https://vercel.com/blog/build-knowledge-agents-without-embeddings",
    badge: "Template",
  },
  {
    name: "Fluid Compute",
    desc: "Vercel's compute model with Active CPU pricing. Auto-concurrency, connection reuse, near-zero cold starts. Ideal for AI workloads with parallel fan-out.",
    url: "https://vercel.com/fluid",
    badge: "Infra",
  },
];

const badgeColors: Record<string, string> = {
  Core: "#667eea",
  New: "#10b981",
  Product: "#f59e0b",
  SDK: "#8b5cf6",
  Template: "#ec4899",
  Agent: "#06b6d4",
  Infra: "#f97316",
};

export default function AIToolsPage() {
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
          🤖 AI & Developer Tools
        </h1>
        <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>
          The complete Vercel AI and developer tools ecosystem — SDKs, agents, infrastructure, and templates.
        </p>

        <div className="row g-3">
          {tools.map((t) => (
            <div key={t.name} className="col-md-6 col-lg-4">
              <a
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <div className="feature-card" style={{ padding: "1.25rem" }}>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h3 style={{ fontSize: "1.05rem", marginBottom: 0 }}>{t.name}</h3>
                    <span
                      style={{
                        background: `${badgeColors[t.badge] || "#667eea"}22`,
                        color: badgeColors[t.badge] || "#667eea",
                        padding: "0.1rem 0.45rem",
                        borderRadius: "8px",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                      }}
                    >
                      {t.badge}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.85rem", marginBottom: 0, lineHeight: 1.6 }}>
                    {t.desc}
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
