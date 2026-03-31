import Link from "next/link";

export default function EnterpriseMigrationPage() {
  return (
    <main className="py-5">
      <div className="container" style={{ maxWidth: "1100px" }}>
        <Link href="/blog/architectures" style={{ color: "#667eea", textDecoration: "none", fontSize: "0.9rem" }}>
          ← Back to Architecture Patterns
        </Link>

        <div className="mt-3 mb-5">
          <span style={{ background: "rgba(239,68,68,0.15)", color: "#f87171", padding: "0.2rem 0.6rem", borderRadius: "12px", fontSize: "0.75rem", fontWeight: 600 }}>
            Architecture Pattern
          </span>
          <h1 className="mt-2" style={{ fontSize: "2.2rem", fontWeight: 800, color: "#fff" }}>
            🔄 Enterprise Migration Pattern
          </h1>
          <p style={{ color: "#94a3b8", maxWidth: "700px", lineHeight: 1.7 }}>
            Incremental migration: proxy legacy routes via Middleware, migrate page-by-page to Next.js on Vercel.
            No big-bang rewrite. No downtime. Ship value from day one. reMarkable saw 87% decrease in build times.
          </p>
        </div>

        {/* The Problem */}
        <section className="mb-5">
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>The Problem with Big-Bang Rewrites</h2>
          <div className="row g-3">
            {[
              { title: "Months of Zero Value", desc: "Complete rewrite takes 6-12 months. No improvements shipped until the entire site is rebuilt.", icon: "⏳", color: "#ef4444" },
              { title: "Risk of Failure", desc: "70% of big-bang rewrites fail or are cancelled. The moving target problem — requirements change while you rebuild.", icon: "💥", color: "#f59e0b" },
              { title: "Team Demoralization", desc: "Engineers spend months rebuilding existing functionality. No new features, no user impact. Burnout and attrition.", icon: "😩", color: "#ec4899" },
              { title: "All-or-Nothing Launch", desc: "One deployment swaps the entire site. If anything breaks, everything breaks. Rollback means losing all progress.", icon: "🎰", color: "#8b5cf6" },
            ].map((p) => (
              <div key={p.title} className="col-md-6">
                <div style={{ background: "rgba(239,68,68,0.06)", border: `1px solid ${p.color}22`, borderRadius: "10px", padding: "1rem", height: "100%" }}>
                  <h4 style={{ color: p.color, fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.3rem" }}>{p.icon} {p.title}</h4>
                  <p style={{ color: "#94a3b8", fontSize: "0.83rem", lineHeight: 1.5, marginBottom: 0 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Incremental Approach */}
        <section className="mb-5">
          <h2 style={{ color: "#10b981", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>The Incremental Approach</h2>
          <div className="d-flex flex-column gap-3">
            {[
              { phase: "Phase 1", title: "Proxy Everything", desc: "Deploy Next.js on Vercel. Middleware rewrites ALL routes to your legacy site. Users see the exact same site — but now served through Vercel's CDN.", duration: "Day 1", color: "#667eea" },
              { phase: "Phase 2", title: "Migrate High-Impact Pages", desc: "Migrate the homepage, key landing pages, or highest-traffic routes to Next.js. Middleware routes these to Next.js; everything else still proxied to legacy.", duration: "Weeks 1-4", color: "#8b5cf6" },
              { phase: "Phase 3", title: "Expand Page-by-Page", desc: "Migrate more pages each sprint. Each migrated page immediately benefits from Vercel's CDN, ISR, and image optimization. Ship value every sprint.", duration: "Months 2-6", color: "#06b6d4" },
              { phase: "Phase 4", title: "Migrate Dynamic Features", desc: "Move authenticated pages, dashboards, and API routes. Replace legacy session management with Middleware auth. Fluid Compute for serverless APIs.", duration: "Months 4-8", color: "#10b981" },
              { phase: "Phase 5", title: "Decommission Legacy", desc: "Once all routes are migrated, remove the proxy rewrites and shut down the legacy infrastructure. Incremental, safe, reversible.", duration: "Final", color: "#f59e0b" },
            ].map((p) => (
              <div key={p.phase} className="d-flex gap-3" style={{ background: `${p.color}08`, border: `1px solid ${p.color}22`, borderRadius: "10px", padding: "1rem 1.25rem" }}>
                <div style={{ background: `${p.color}22`, color: p.color, padding: "0.3rem 0.8rem", borderRadius: "8px", fontWeight: 800, fontSize: "0.75rem", whiteSpace: "nowrap", alignSelf: "flex-start" }}>{p.phase}</div>
                <div style={{ flex: 1 }}>
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 style={{ color: p.color, fontSize: "0.92rem", fontWeight: 700, marginBottom: "0.2rem" }}>{p.title}</h4>
                    <span style={{ color: "#64748b", fontSize: "0.75rem" }}>{p.duration}</span>
                  </div>
                  <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.5, marginBottom: 0 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Middleware Proxy Code */}
        <section className="mb-5">
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>Middleware Proxy — Code</h2>
          <pre style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "1.25rem", fontSize: "0.78rem", color: "#cbd5e1", overflow: "auto" }}>
            <code>{`// middleware.ts
import { NextResponse } from 'next/server';

// Routes that have been migrated to Next.js
const migratedRoutes = [
  '/',
  '/about',
  '/pricing',
  '/blog',
  '/blog/:slug*',
];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // If route is migrated, let Next.js handle it
  const isMigrated = migratedRoutes.some(route => {
    const pattern = route.replace(':slug*', '.*');
    return new RegExp(\`^\${pattern}$\`).test(pathname);
  });
  
  if (isMigrated) {
    return NextResponse.next(); // Next.js handles this route
  }
  
  // Proxy to legacy site for non-migrated routes
  return NextResponse.rewrite(
    new URL(pathname, 'https://legacy.example.com')
  );
}

// next.config.ts (alternative: rewrites in config)
// rewrites: async () => ({
//   fallback: [{
//     source: '/:path*',
//     destination: 'https://legacy.example.com/:path*'
//   }]
// })`}</code>
          </pre>
        </section>

        {/* Customer Results */}
        <section className="mb-5">
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>Customer Results</h2>
          <div className="row g-3">
            {[
              { company: "reMarkable", metric: "87% faster builds", detail: "Incremental migration from legacy platform to Next.js on Vercel. Build times dropped dramatically with each phase." },
              { company: "Sonos", metric: "Seamless cutover", detail: "Migrated from custom React setup to Next.js incrementally. No downtime during transition. Each page shipped independently." },
              { company: "Target", metric: "Page-by-page", detail: "Enterprise-scale migration using Middleware proxying. High-traffic pages migrated first for maximum impact." },
            ].map((c) => (
              <div key={c.company} className="col-md-4">
                <div className="feature-card" style={{ padding: "1.15rem", height: "100%" }}>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span style={{ color: "#e2e8f0", fontWeight: 700, fontSize: "0.95rem" }}>{c.company}</span>
                    <span style={{ background: "rgba(16,185,129,0.15)", color: "#10b981", padding: "0.15rem 0.5rem", borderRadius: "12px", fontSize: "0.7rem", fontWeight: 700 }}>{c.metric}</span>
                  </div>
                  <p style={{ color: "#94a3b8", fontSize: "0.83rem", lineHeight: 1.5, marginBottom: 0 }}>{c.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SE Selling Points */}
        <section className="mb-5">
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>🎯 SE Selling Points</h2>
          <div className="row g-3">
            {[
              { point: "Ship Value Day 1", desc: "The proxy alone gives CDN benefits. First migrated page shows immediate performance improvement." },
              { point: "Zero Risk", desc: "Each page is independently migratable and rollback-able. If a migrated page has issues, revert to the proxy." },
              { point: "Prove ROI Incrementally", desc: "Track Core Web Vitals improvement per migrated page. Build the business case with data, not promises." },
              { point: "Team Stays Productive", desc: "No 6-month code freeze. Teams ship new features on Next.js while migrating legacy pages in parallel." },
            ].map((p) => (
              <div key={p.point} className="col-md-6">
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "1rem", height: "100%" }}>
                  <span style={{ color: "#818cf8", fontSize: "0.88rem", fontWeight: 700 }}>{p.point}</span>
                  <p style={{ color: "#94a3b8", fontSize: "0.83rem", lineHeight: 1.5, marginBottom: 0, marginTop: "0.3rem" }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center py-4">
          <a href="https://vercel.com/docs/incremental-migration" target="_blank" rel="noopener noreferrer" className="btn-glow" style={{ marginRight: "1rem" }}>
            Read Vercel Docs →
          </a>
          <Link href="/blog/architectures" className="btn-glow" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
            ← All Architectures
          </Link>
        </div>
      </div>
    </main>
  );
}
