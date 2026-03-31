import Link from "next/link";

const platformLayers = [
  {
    name: "Developer Experience Layer",
    color: "#667eea",
    icon: "🧑‍💻",
    tagline: "Git push → auto-build → preview URL → production",
    overview: "The DX Layer is what makes Vercel feel magical. It abstracts away infrastructure entirely, letting developers focus on writing code. From the moment you push to Git, the entire CI/CD pipeline runs automatically — builds, deploys, previews, and production rollouts happen without touching a single config file.",
    features: [
      { name: "Git Integration", desc: "Automatic builds and deployments triggered by pushes, PRs, and merges to GitHub, GitLab, or Bitbucket. Every commit gets a unique URL." },
      { name: "Preview Deployments", desc: "Every pull request gets a full preview deployment with a shareable URL. Stakeholders review real running code, not screenshots. Comments thread directly on the preview." },
      { name: "Instant Rollbacks", desc: "Atomic deployments mean any previous deployment is instantly promotable. No downtime, no risk — just point production to the last known good build." },
      { name: "v0 — AI App Builder", desc: "Vercel's AI-powered app builder. Describe what you want in natural language, and v0 generates full React/Next.js code with Tailwind CSS, shadcn/ui components, and proper project structure." },
      { name: "Vercel Agent", desc: "AI coding assistant that understands your project context, can make code changes, run builds, and deploy — all from a chat interface." },
      { name: "CI/CD Pipeline", desc: "Zero-config build system that detects your framework (Next.js, Nuxt, Astro, SvelteKit, etc.), installs dependencies, runs builds, and deploys to the global edge — all automatically." },
    ],
    interviewTips: [
      "Explain how Preview Deployments eliminate the 'works on my machine' problem and speed up design/product review cycles.",
      "v0 is a key differentiator — it generates production-ready code, not prototypes. Position it as an enterprise productivity tool.",
      "Vercel supports 35+ frameworks, not just Next.js. Always mention framework flexibility when talking to non-Next.js prospects.",
      "Instant rollbacks are atomic — the old deployment still exists. It's not a 'revert and rebuild' — it's a pointer change.",
    ],
    customerStory: "A large e-commerce company reduced their deployment pipeline from 45 minutes to under 2 minutes by switching to Vercel's Git-based workflow. Preview deployments eliminated their staging environment entirely, saving $50K/month in infrastructure costs.",
  },
  {
    name: "Compute Layer",
    color: "#8b5cf6",
    icon: "⚙️",
    tagline: "Serverless Functions, Edge Runtime, Fluid Compute",
    overview: "The Compute Layer is where your application logic runs. Vercel provides two primary runtimes — Edge and Serverless (Node.js) — unified under the 'Vercel Functions' umbrella since mid-2025. Fluid Compute, launched April 2025, fundamentally changed the economics by enabling shared instances and active CPU billing.",
    features: [
      { name: "Vercel Functions", desc: "Unified umbrella for all serverless compute. Functions auto-scale from zero to millions of invocations. No provisioning, no capacity planning." },
      { name: "Edge Runtime", desc: "V8 isolates running at 100+ CDN PoPs globally. Near-zero cold starts, 35ms CPU limit. Perfect for auth checks, A/B tests, geo-routing, and middleware." },
      { name: "Serverless (Node.js)", desc: "Full Node.js runtime in regional data centres. Supports all npm packages, file system access, database connections. Up to 3GB memory, multi-minute execution." },
      { name: "Fluid Compute", desc: "Shared instances, active CPU pricing, bytecode caching. Multiple requests share one instance. Pay only for CPU time — not I/O wait." },
      { name: "Cron Jobs", desc: "Scheduled function execution via vercel.json. Supports cron syntax for periodic tasks like cache warming, data sync, and cleanup." },
      { name: "Streaming", desc: "Functions can stream responses progressively. Critical for AI/LLM use cases where tokens arrive incrementally over seconds." },
    ],
    interviewTips: [
      "Know the Edge vs Serverless tradeoffs cold. Edge = fast everywhere but limited. Serverless = full power but regional.",
      "Fluid Compute's cost savings pitch: 'A 10-second LLM stream with 200ms actual CPU = 200ms billing. That's 80-90% savings for AI routes.'",
      "When a customer says 'we need always-on servers,' explain that Fluid Compute shared instances achieve similar economics without the operational overhead.",
      "Streaming is not optional for AI apps — it's expected UX. Vercel Functions support it natively.",
    ],
    customerStory: "An AI startup processing 10M inference requests/month reduced their compute bill by 78% after migrating to Vercel with Fluid Compute. Active CPU billing meant they only paid for the ~300ms of actual compute per request, not the 5-8 seconds of streaming I/O wait.",
  },
  {
    name: "Edge Network Layer",
    color: "#06b6d4",
    icon: "🌐",
    tagline: "Global CDN, Edge Cache, Routing Middleware",
    overview: "The Edge Network is Vercel's global content delivery infrastructure. It operates at 100+ Points of Presence worldwide, serving static assets, cached pages, and Edge Config data with millisecond latency. The caching system is multi-layered and deeply integrated with Next.js data fetching.",
    features: [
      { name: "Global CDN", desc: "100+ edge locations worldwide. Static assets, ISR pages, and cached responses served from the nearest PoP. Automatic HTTPS, HTTP/3, Brotli compression." },
      { name: "Edge Middleware", desc: "Runs before cache lookup on every request. Ideal for auth, geo-routing, A/B testing, feature flags. Modifies headers, rewrites URLs, redirects — at the edge, globally." },
      { name: "Edge Config", desc: "Global key-value store readable in <1ms from edge. Perfect for feature flags, maintenance modes, redirect maps. Updated via API, propagated globally in seconds." },
      { name: "Image Optimization", desc: "Automatic image resizing, format conversion (WebP, AVIF), and caching. next/image component handles responsive images, lazy loading, and blur placeholders." },
      { name: "Multi-layer Cache", desc: "Client → Edge (PoP) → Regional → Origin. Each layer has configurable TTLs. stale-while-revalidate ensures users never wait for a cache miss." },
      { name: "Web Analytics & Speed Insights", desc: "Real-user metrics (Core Web Vitals: LCP, FID, CLS, TTFB, INP) collected from actual visitors. Speed Insights shows performance regressions per deployment." },
    ],
    interviewTips: [
      "Edge Middleware runs BEFORE the cache — this is crucial. It can rewrite a URL and serve a different cached page without hitting the origin.",
      "Edge Config vs Environment Variables: Edge Config is runtime-updateable without redeployment. Env vars require a new deployment.",
      "Image Optimization alone can improve LCP by 40-60% for image-heavy sites. It's a quick win for any performance conversation.",
      "Know the cache hierarchy: Browser → Edge PoP → Regional Cache → Serverless Function. Explain where stale-while-revalidate fits.",
    ],
    customerStory: "A global media company with readers in 40+ countries reduced their average page load time from 3.2s to 0.8s by leveraging Vercel's Edge Network. Edge Middleware handled geo-based content localisation without any origin requests, eliminating round-trips to their US-based servers.",
  },
  {
    name: "AI Cloud Layer",
    color: "#10b981",
    icon: "🤖",
    tagline: "AI SDK, AI Gateway, Vercel Sandbox, Workflows",
    overview: "The AI Cloud Layer is Vercel's newest and fastest-growing platform pillar. It provides a unified TypeScript SDK for working with any LLM provider, an AI Gateway for routing and observability, sandboxed code execution, and durable workflows for multi-step AI agents.",
    features: [
      { name: "AI SDK", desc: "Unified TypeScript library for LLM providers (OpenAI, Anthropic, Google, Mistral, etc.). Provider-agnostic: swap models without changing application code. Supports streaming, tool calling, structured output." },
      { name: "AI Gateway", desc: "Centralized routing layer for AI model calls. Rate limiting, cost tracking per model/user, fallback providers, caching of identical prompts, and built-in observability." },
      { name: "v0", desc: "AI-powered app builder that generates production React/Next.js code from natural language descriptions. Understands shadcn/ui, Tailwind CSS, and modern React patterns." },
      { name: "Vercel Sandbox", desc: "Secure, isolated JavaScript/TypeScript execution environment for AI-generated code. Agents can safely run generated code without accessing the host system." },
      { name: "Workflows (use-workflow)", desc: "Durable, observable, fault-tolerant workflow engine. Multi-step AI agent pipelines that survive function timeouts, with automatic retries and state persistence." },
      { name: "Firewall for AI", desc: "Protection layer for AI applications. Rate limiting, prompt injection detection, PII filtering, and abuse prevention for LLM-powered endpoints." },
    ],
    interviewTips: [
      "AI SDK's killer feature: provider abstraction. 'Switch from GPT-4 to Claude in one line. No rewrite, no testing, no deployment changes.'",
      "Workflows solve the AI agent reliability problem. Multi-step agent tasks that take minutes can survive function timeouts with automatic state checkpointing.",
      "AI Gateway gives enterprises the cost visibility they need. Per-model, per-user cost tracking is essential for AI budget management.",
      "Position Vercel as the best platform for AI apps: AI SDK + Fluid Compute (cheap streaming) + Edge Network (low latency) + Workflows (reliable agents).",
    ],
    customerStory: "A fintech company building an AI-powered financial advisor used Vercel's AI SDK to evaluate 5 LLM providers in a single afternoon. They shipped with Claude for analysis and GPT-4o for conversation, switching between them with a config change. AI Gateway reduced their LLM costs by 35% through prompt caching.",
  },
];

export default function MentalModelPage() {
  return (
    <main className="py-5">
      <div className="container" style={{ maxWidth: "1100px" }}>
        <Link href="/se/platform-fundamentals" style={{ color: "#667eea", textDecoration: "none", fontSize: "0.9rem" }}>
          ← Back to Platform Fundamentals
        </Link>

        <div className="mt-3 mb-5">
          <span style={{ background: "rgba(102,126,234,0.15)", color: "#818cf8", padding: "0.2rem 0.6rem", borderRadius: "12px", fontSize: "0.75rem", fontWeight: 600 }}>
            Platform Fundamentals
          </span>
          <h1 className="mt-2" style={{ fontSize: "2.2rem", fontWeight: 800, color: "#fff" }}>
            🏗️ Vercel Platform — Mental Model
          </h1>
          <p style={{ color: "#94a3b8", maxWidth: "700px", lineHeight: 1.7 }}>
            Vercel is a <strong style={{ color: "#e2e8f0" }}>Developer Experience (DX) Platform</strong> built on four layers.
            Each layer solves a distinct class of problems. Understanding this model lets you map any customer requirement
            to the right Vercel capability in seconds.
          </p>
        </div>

        {/* Architecture Overview */}
        <section className="mb-5">
          <h2 className="mb-3" style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem" }}>
            Four-Layer Architecture
          </h2>
          <div style={{
            background: "rgba(102,126,234,0.06)",
            border: "1px solid rgba(102,126,234,0.15)",
            borderRadius: "12px",
            padding: "1.5rem",
            marginBottom: "1.5rem",
          }}>
            <div className="d-flex flex-column gap-2">
              {platformLayers.map((layer, i) => (
                <div key={layer.name} className="d-flex align-items-center gap-3" style={{
                  background: `${layer.color}11`,
                  border: `1px solid ${layer.color}33`,
                  borderRadius: "8px",
                  padding: "0.8rem 1.2rem",
                }}>
                  <span style={{ fontSize: "1.5rem" }}>{layer.icon}</span>
                  <div>
                    <span style={{ color: layer.color, fontWeight: 700, fontSize: "0.95rem" }}>Layer {i + 1}: {layer.name}</span>
                    <p style={{ color: "#94a3b8", fontSize: "0.82rem", marginBottom: 0 }}>{layer.tagline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: "rgba(102,126,234,0.08)", border: "1px solid rgba(102,126,234,0.15)", borderRadius: "10px", padding: "1rem 1.25rem" }}>
            <p style={{ color: "#fbbf24", fontSize: "0.9rem", fontWeight: 600, marginBottom: "0.3rem" }}>Core Value Proposition:</p>
            <p style={{ color: "#cbd5e1", fontSize: "0.95rem", fontStyle: "italic", marginBottom: 0 }}>
              &quot;From code to globally distributed, framework-optimised infrastructure in one git push — with zero configuration.&quot;
            </p>
          </div>
        </section>

        {/* Deep Dive into Each Layer */}
        {platformLayers.map((layer) => (
          <section key={layer.name} className="mb-5">
            <h2 className="mb-3" style={{ color: layer.color, fontWeight: 700, fontSize: "1.5rem" }}>
              {layer.icon} {layer.name}
            </h2>
            <p style={{ color: "#cbd5e1", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              {layer.overview}
            </p>

            {/* Features Grid */}
            <h4 style={{ color: "#e2e8f0", fontWeight: 600, fontSize: "1.05rem", marginBottom: "0.75rem" }}>Key Capabilities</h4>
            <div className="row g-3 mb-4">
              {layer.features.map((f) => (
                <div key={f.name} className="col-md-6">
                  <div style={{
                    background: `${layer.color}08`,
                    border: `1px solid ${layer.color}22`,
                    borderRadius: "10px",
                    padding: "1.1rem",
                    height: "100%",
                  }}>
                    <h5 style={{ color: layer.color, fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.3rem" }}>{f.name}</h5>
                    <p style={{ color: "#94a3b8", fontSize: "0.83rem", lineHeight: 1.6, marginBottom: 0 }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Interview Tips */}
            <h4 style={{ color: "#e2e8f0", fontWeight: 600, fontSize: "1.05rem", marginBottom: "0.75rem" }}>🎯 SE Interview Tips</h4>
            <div style={{
              background: "rgba(251,191,36,0.06)",
              border: "1px solid rgba(251,191,36,0.15)",
              borderRadius: "10px",
              padding: "1rem 1.25rem",
              marginBottom: "1rem",
            }}>
              <ul style={{ marginBottom: 0, paddingLeft: "1.1rem" }}>
                {layer.interviewTips.map((tip, i) => (
                  <li key={i} style={{ color: "#cbd5e1", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: "0.4rem" }}>{tip}</li>
                ))}
              </ul>
            </div>

            {/* Customer Story */}
            <div style={{
              background: `${layer.color}0a`,
              border: `1px solid ${layer.color}22`,
              borderRadius: "10px",
              padding: "1rem 1.25rem",
            }}>
              <p style={{ color: layer.color, fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem" }}>💡 Customer Story</p>
              <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.6, fontStyle: "italic", marginBottom: 0 }}>
                {layer.customerStory}
              </p>
            </div>
          </section>
        ))}

        {/* How to Use This in Interviews */}
        <section className="mb-5">
          <h2 className="mb-3" style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem" }}>
            How to Use This Mental Model in Interviews
          </h2>
          <div className="row g-3">
            <div className="col-md-6">
              <div className="feature-card" style={{ padding: "1.25rem" }}>
                <h4 style={{ color: "#667eea", fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.5rem" }}>Architecture Questions</h4>
                <p style={{ color: "#94a3b8", fontSize: "0.83rem", lineHeight: 1.6, marginBottom: 0 }}>
                  When asked &quot;How would you architect X on Vercel?&quot; — walk through the four layers. Map each customer requirement
                  to the appropriate layer. This shows you understand the platform holistically, not just Next.js.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="feature-card" style={{ padding: "1.25rem" }}>
                <h4 style={{ color: "#8b5cf6", fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.5rem" }}>Competitive Positioning</h4>
                <p style={{ color: "#94a3b8", fontSize: "0.83rem", lineHeight: 1.6, marginBottom: 0 }}>
                  When asked &quot;How is Vercel different from AWS/Netlify/Cloudflare?&quot; — use the four layers.
                  No competitor has all four integrated. AWS has pieces but no DX layer. Netlify lacks AI Cloud. Cloudflare lacks the full Compute layer.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="feature-card" style={{ padding: "1.25rem" }}>
                <h4 style={{ color: "#06b6d4", fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.5rem" }}>Discovery Calls</h4>
                <p style={{ color: "#94a3b8", fontSize: "0.83rem", lineHeight: 1.6, marginBottom: 0 }}>
                  Use the layers to structure discovery. &quot;Tell me about your current deployment workflow&quot; (DX Layer),
                  &quot;Where does your compute run?&quot; (Compute), &quot;How do you handle global distribution?&quot; (Edge), &quot;Are you building AI features?&quot; (AI Cloud).
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="feature-card" style={{ padding: "1.25rem" }}>
                <h4 style={{ color: "#10b981", fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.5rem" }}>ROI Conversations</h4>
                <p style={{ color: "#94a3b8", fontSize: "0.83rem", lineHeight: 1.6, marginBottom: 0 }}>
                  Map cost savings to each layer: DX Layer saves developer time (CI/CD, previews, rollbacks).
                  Compute saves infrastructure cost (Fluid Compute). Edge saves latency and CDN fees. AI Cloud saves on LLM costs (gateway caching).
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center py-3">
          <Link href="/se/platform-fundamentals" className="btn-glow" style={{ marginRight: "1rem" }}>
            ← Platform Fundamentals
          </Link>
          <Link href="/se/platform-fundamentals/compute-runtimes" className="btn-glow">
            Compute Runtimes →
          </Link>
        </div>
      </div>
    </main>
  );
}
