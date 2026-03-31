import Link from "next/link";

export default function MonorepoPage() {
  return (
    <main className="py-5">
      <div className="container" style={{ maxWidth: "1100px" }}>
        <Link href="/blog/architectures" style={{ color: "#667eea", textDecoration: "none", fontSize: "0.9rem" }}>
          ← Back to Architecture Patterns
        </Link>

        <div className="mt-3 mb-5">
          <span style={{ background: "rgba(249,115,22,0.15)", color: "#fb923c", padding: "0.2rem 0.6rem", borderRadius: "12px", fontSize: "0.75rem", fontWeight: 600 }}>
            Architecture Pattern
          </span>
          <h1 className="mt-2" style={{ fontSize: "2.2rem", fontWeight: 800, color: "#fff" }}>
            📦 Monorepo at Scale
          </h1>
          <p style={{ color: "#94a3b8", maxWidth: "700px", lineHeight: 1.7 }}>
            Turborepo for task orchestration with 96% faster task graph computation. Remote caching eliminates redundant builds.
            1,000-package repos go from 8.1s to 716ms Time to First Task.
          </p>
        </div>

        {/* Why Monorepo */}
        <section className="mb-5">
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>Why Monorepo?</h2>
          <div className="row g-3">
            {[
              { title: "Shared Components", desc: "UI components, utilities, types, and configs shared across multiple apps. Change once, update everywhere.", icon: "🔗" },
              { title: "Atomic Changes", desc: "Update a shared package and all consuming apps in one PR. No version pinning, no publish cycles.", icon: "⚛️" },
              { title: "Unified CI/CD", desc: "One repository, one build pipeline. Vercel detects which app changed and only rebuilds that one.", icon: "🔄" },
              { title: "Team Scalability", desc: "Multiple teams work in the same repo with clear boundaries. Packages define ownership and APIs.", icon: "👥" },
            ].map((b) => (
              <div key={b.title} className="col-md-6">
                <div className="feature-card" style={{ padding: "1.25rem", height: "100%" }}>
                  <h4 style={{ color: "#fb923c", fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.3rem" }}>{b.icon} {b.title}</h4>
                  <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: 0 }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Turborepo Features */}
        <section className="mb-5">
          <h2 style={{ color: "#fb923c", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>Turborepo Key Features</h2>
          <div className="d-flex flex-column gap-3">
            {[
              { title: "Remote Caching", desc: "Build outputs cached in the cloud. If any team member (or CI) already built a package with the same inputs, the output is reused. Zero redundant work.", metric: "0ms for cached tasks", color: "#667eea" },
              { title: "Task Graph Optimization", desc: "Turborepo analyzes package dependencies and runs tasks in the optimal parallel order. 96% faster task graph computation in latest version.", metric: "8.1s → 716ms", color: "#8b5cf6" },
              { title: "Incremental Builds", desc: "Only rebuild packages that changed. A change to packages/ui only rebuilds apps/web and apps/docs (which depend on it), not apps/api.", metric: "80% fewer rebuilds", color: "#06b6d4" },
              { title: "Vercel Integration", desc: "Vercel detects Turborepo automatically. Root-level turbo.json defines build pipeline. Deploy only the app that changed.", metric: "Zero config", color: "#10b981" },
            ].map((f) => (
              <div key={f.title} style={{ background: `${f.color}08`, border: `1px solid ${f.color}22`, borderRadius: "12px", padding: "1.25rem" }}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h4 style={{ color: f.color, fontSize: "0.95rem", fontWeight: 700, marginBottom: 0 }}>{f.title}</h4>
                  <span style={{ background: `${f.color}22`, color: f.color, padding: "0.15rem 0.6rem", borderRadius: "12px", fontSize: "0.75rem", fontWeight: 700 }}>{f.metric}</span>
                </div>
                <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.5, marginBottom: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Typical Structure */}
        <section className="mb-5">
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>Typical Monorepo Structure</h2>
          <pre style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "1.25rem", fontSize: "0.78rem", color: "#cbd5e1", overflow: "auto" }}>
            <code>{`my-monorepo/
├── apps/
│   ├── web/          # Next.js marketing site (deploys to vercel)
│   ├── dashboard/    # Next.js SaaS dashboard (deploys to vercel)
│   └── docs/         # Next.js documentation (deploys to vercel)
├── packages/
│   ├── ui/           # Shared React component library
│   ├── utils/        # Shared utility functions
│   ├── config/       # Shared ESLint, TypeScript configs
│   └── database/     # Shared Prisma schema and client
├── turbo.json        # Task pipeline configuration
├── package.json      # Root workspace config
└── pnpm-workspace.yaml`}</code>
          </pre>
        </section>

        {/* turbo.json */}
        <section className="mb-5">
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>turbo.json Configuration</h2>
          <pre style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "1.25rem", fontSize: "0.78rem", color: "#cbd5e1", overflow: "auto" }}>
            <code>{`{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],     // Build dependencies first
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "lint": {},
    "test": {
      "dependsOn": ["build"]       // Test after build
    },
    "dev": {
      "cache": false,               // Never cache dev server
      "persistent": true
    }
  }
}`}</code>
          </pre>
        </section>

        {/* Performance Stats */}
        <section className="mb-5">
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>Performance Stats</h2>
          <div className="row g-3">
            {[
              { metric: "96%", label: "Faster task graph computation", detail: "Latest Turborepo version" },
              { metric: "716ms", label: "Time to first task (1K packages)", detail: "Down from 8.1s" },
              { metric: "0ms", label: "Cached task execution", detail: "Remote cache hit → instant" },
              { metric: "80%+", label: "Fewer CI minutes", detail: "Only changed packages rebuild" },
            ].map((s) => (
              <div key={s.label} className="col-md-3 col-6">
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "1rem", textAlign: "center" }}>
                  <div style={{ color: "#fb923c", fontWeight: 800, fontSize: "1.6rem", marginBottom: "0.2rem" }}>{s.metric}</div>
                  <div style={{ color: "#e2e8f0", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.1rem" }}>{s.label}</div>
                  <div style={{ color: "#64748b", fontSize: "0.72rem" }}>{s.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center py-4">
          <a href="https://vercel.com/solutions/turborepo" target="_blank" rel="noopener noreferrer" className="btn-glow" style={{ marginRight: "1rem" }}>
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
