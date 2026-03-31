import Link from "next/link";

export default function CrossPlatformChatPage() {
  return (
    <main className="py-5">
      <div className="container" style={{ maxWidth: "1100px" }}>
        <Link href="/blog/architectures" style={{ color: "#667eea", textDecoration: "none", fontSize: "0.9rem" }}>
          ← Back to Architecture Patterns
        </Link>

        <div className="mt-3 mb-5">
          <span style={{ background: "rgba(168,85,247,0.15)", color: "#c084fc", padding: "0.2rem 0.6rem", borderRadius: "12px", fontSize: "0.75rem", fontWeight: 600 }}>
            Architecture Pattern
          </span>
          <h1 className="mt-2" style={{ fontSize: "2.2rem", fontWeight: 800, color: "#fff" }}>
            💬 Cross-Platform Chat Agent
          </h1>
          <p style={{ color: "#94a3b8", maxWidth: "700px", lineHeight: 1.7 }}>
            Chat SDK delivers one AI agent across Slack, Teams, Discord, WhatsApp, Telegram, GitHub, and Linear.
            Single codebase, single deployment, with platform-specific rendering handled by adapters.
          </p>
        </div>

        {/* The Problem */}
        <section className="mb-5">
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>The Problem</h2>
          <div style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: "12px", padding: "1.5rem" }}>
            <p style={{ color: "#cbd5e1", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "0.75rem" }}>
              Companies want AI assistants available everywhere — website, Slack, Teams, Discord, mobile.
              Without a unified approach, you build and maintain <strong style={{ color: "#f87171" }}>separate integrations for each platform</strong>:
            </p>
            <ul style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.8, paddingLeft: "1.1rem", marginBottom: 0 }}>
              <li>Separate codebases per platform (7 platforms = 7 repos)</li>
              <li>Different message formats, APIs, authentication flows</li>
              <li>Agent logic duplicated and eventually drifts out of sync</li>
              <li>Testing and deploying 7 separate services</li>
            </ul>
          </div>
        </section>

        {/* Chat SDK Solution */}
        <section className="mb-5">
          <h2 style={{ color: "#c084fc", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>The Chat SDK Solution</h2>
          <div className="d-flex flex-column gap-3">
            {[
              { title: "One Agent, All Platforms", desc: "Define your agent's capabilities once — tools, system prompt, model config. Chat SDK handles platform-specific message formatting, input parsing, and response rendering.", color: "#667eea", icon: "🔄" },
              { title: "Platform Adapters", desc: "Each platform (Slack, Teams, Discord, etc.) has an adapter that translates between the platform's API and Chat SDK's unified interface. Add a new platform by adding one adapter.", color: "#8b5cf6", icon: "🔌" },
              { title: "Unified Conversation State", desc: "Conversation history stored in Postgres/Redis. Platform-specific metadata (Slack thread_ts, Teams conversation id) handled transparently.", color: "#06b6d4", icon: "💾" },
              { title: "Rich Responses", desc: "Agent returns structured responses (text, buttons, forms, images). Each adapter renders these in the platform's native format — Slack blocks, Teams cards, Discord embeds.", color: "#10b981", icon: "✨" },
            ].map((f) => (
              <div key={f.title} style={{ background: `${f.color}08`, border: `1px solid ${f.color}22`, borderRadius: "10px", padding: "1rem 1.25rem" }}>
                <h4 style={{ color: f.color, fontSize: "0.92rem", fontWeight: 700, marginBottom: "0.2rem" }}>{f.icon} {f.title}</h4>
                <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.5, marginBottom: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Supported Platforms */}
        <section className="mb-5">
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>Supported Platforms</h2>
          <div className="row g-2">
            {[
              { name: "Slack", desc: "Blocks API, slash commands, thread replies", color: "#4A154B" },
              { name: "Microsoft Teams", desc: "Adaptive Cards, bot framework, tab apps", color: "#6264A7" },
              { name: "Discord", desc: "Embeds, slash commands, buttons, modals", color: "#5865F2" },
              { name: "WhatsApp", desc: "Business API, templates, media messages", color: "#25D366" },
              { name: "Telegram", desc: "Bot API, inline keyboards, rich messages", color: "#0088cc" },
              { name: "GitHub", desc: "Issues, PRs, discussions, slash commands", color: "#8b949e" },
              { name: "Linear", desc: "Issue management, automation, project context", color: "#5E6AD2" },
              { name: "Web (Next.js)", desc: "useChat() hook, streaming UI, rich components", color: "#667eea" },
            ].map((p) => (
              <div key={p.name} className="col-md-3 col-6">
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "0.8rem", textAlign: "center" }}>
                  <div style={{ color: p.color, fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.2rem" }}>{p.name}</div>
                  <div style={{ color: "#64748b", fontSize: "0.72rem", lineHeight: 1.3 }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Architecture */}
        <section className="mb-5">
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>Architecture</h2>
          <div className="d-flex flex-column gap-2">
            {[
              { name: "Webhook Receivers", detail: "Each platform sends messages to /api/webhook/{platform}. Route handlers parse platform-specific payloads into a unified Message format.", color: "#667eea" },
              { name: "Chat SDK Core", detail: "Unified agent logic: system prompt, tools, model selection (via AI SDK), conversation management. Platform-agnostic.", color: "#8b5cf6" },
              { name: "AI SDK + AI Gateway", detail: "Model calls via AI SDK with AI Gateway for routing, failover, and cost tracking. streamText() for real-time responses.", color: "#06b6d4" },
              { name: "Platform Adapters (Output)", detail: "Structured agent responses → platform-native format. Text becomes Slack blocks, Teams adaptive cards, Discord embeds.", color: "#10b981" },
              { name: "State Store", detail: "Postgres for conversation history, user preferences. Redis for rate limiting and session cache.", color: "#f59e0b" },
            ].map((l) => (
              <div key={l.name} style={{ background: `${l.color}0a`, border: `1px solid ${l.color}22`, borderRadius: "10px", padding: "1rem 1.25rem" }}>
                <h4 style={{ color: l.color, fontSize: "0.92rem", fontWeight: 700, marginBottom: "0.25rem" }}>{l.name}</h4>
                <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.5, marginBottom: 0 }}>{l.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SE Takeaway */}
        <section className="mb-5">
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>🎯 SE Interview Takeaway</h2>
          <div className="feature-card" style={{ padding: "1.25rem" }}>
            <p style={{ color: "#cbd5e1", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: 0 }}>
              Chat SDK embodies the <strong style={{ color: "#c084fc" }}>composable architecture principle</strong>: one core agent deployed on Vercel,
              with adapters for each platform. When a customer says &quot;we need our AI assistant in Slack AND on our website AND in Teams,&quot;
              the answer is one Next.js app with Chat SDK — not three separate projects. This is a powerful sales conversation:
              one deployment, one billing, one codebase, all platforms.
            </p>
          </div>
        </section>

        <div className="text-center py-4">
          <a href="https://vercel.com/blog/chat-sdk-brings-agents-to-your-users" target="_blank" rel="noopener noreferrer" className="btn-glow" style={{ marginRight: "1rem" }}>
            Read on Vercel Blog →
          </a>
          <Link href="/blog/architectures" className="btn-glow" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
            ← All Architectures
          </Link>
        </div>
      </div>
    </main>
  );
}
