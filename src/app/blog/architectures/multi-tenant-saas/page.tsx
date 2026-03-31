import Link from "next/link";

const architectureLayers = [
  { name: "Domain Routing (Edge Middleware)", detail: "Matches incoming hostname (client-a.com, client-b.com) to a tenantId. Reads from Edge Config or KV for tenant identification. Sets x-tenant-id header for downstream use.", color: "#667eea" },
  { name: "Tenant Config Store", detail: "Edge Config for themes, feature flags, and branding (near-zero latency). Database for full tenant profiles, billing, permissions.", color: "#8b5cf6" },
  { name: "Dynamic Rendering", detail: "Single Next.js codebase renders pages based on tenant config — theme colors, logos, fonts, content, features. ISR cache keys include hostname for tenant isolation.", color: "#06b6d4" },
  { name: "CMS (Tenant-Scoped)", detail: "Shared headless CMS with tenant-scoped content. Each tenant manages their own pages via CMS dashboard.", color: "#10b981" },
  { name: "Domain Management (Vercel API)", detail: "Programmatic custom domain assignment via Vercel's Domains API. Tenants add their domain → CNAME to Vercel → auto SSL.", color: "#f59e0b" },
  { name: "Tenant Admin Dashboard", detail: "SSR authenticated dashboard for managing content, settings, branding, and analytics per tenant.", color: "#ec4899" },
];

const keyBenefits = [
  { title: "One Codebase, All Tenants", desc: "A single Next.js deployment serves hundreds or thousands of branded sites. No per-tenant hosting, no infrastructure multiplication.", icon: "🏗️" },
  { title: "Custom Domains at Scale", desc: "Vercel's Domains API adds/removes domains programmatically. Each tenant gets client-a.com pointing to your single deployment.", icon: "🌐" },
  { title: "Instant Tenant Customization", desc: "Edge Config stores themes (colors, fonts, logos). Update a tenant's brand in seconds — no redeployment needed.", icon: "🎨" },
  { title: "Tenant-Isolated Caching", desc: "ISR cache keys include the hostname. client-a.com never sees client-b.com's cached content. Security by architecture.", icon: "🔒" },
];

const customerResults = [
  { company: "Durable", metric: "3M+ businesses", detail: "AI-powered website builder serving millions of small business sites on a single Vercel deployment. Custom domains via Domains API." },
  { company: "Mintlify", metric: "1000s of doc domains", detail: "Developer documentation platform hosting thousands of custom docs domains. Each customer gets docs.their-company.com." },
  { company: "Hashnode", metric: "Custom blog domains", detail: "Developer blogging platform where each writer gets their own custom domain — all routed through one Vercel project." },
];

export default function MultiTenantSaaSPage() {
  return (
    <main className="py-5">
      <div className="container" style={{ maxWidth: "1100px" }}>
        <Link href="/blog/architectures" style={{ color: "#667eea", textDecoration: "none", fontSize: "0.9rem" }}>
          ← Back to Architecture Patterns
        </Link>

        <div className="mt-3 mb-5">
          <span style={{ background: "rgba(139,92,246,0.15)", color: "#a78bfa", padding: "0.2rem 0.6rem", borderRadius: "12px", fontSize: "0.75rem", fontWeight: 600 }}>
            Architecture Pattern
          </span>
          <h1 className="mt-2" style={{ fontSize: "2.2rem", fontWeight: 800, color: "#fff" }}>
            🏢 Multi-Tenant SaaS Platform
          </h1>
          <p style={{ color: "#94a3b8", maxWidth: "700px", lineHeight: 1.7 }}>
            Host hundreds or thousands of customer websites under custom domains — all from a single Next.js deployment.
            Wildcard domains + Edge Middleware identify tenants, Edge Config stores branding, and ISR caching isolates content per tenant.
          </p>
        </div>

        {/* Benefits */}
        <section className="mb-5">
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>Why This Pattern?</h2>
          <div className="row g-3">
            {keyBenefits.map((b) => (
              <div key={b.title} className="col-md-6">
                <div className="feature-card" style={{ padding: "1.25rem", height: "100%" }}>
                  <h4 style={{ color: "#818cf8", fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.3rem" }}>{b.icon} {b.title}</h4>
                  <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: 0 }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Architecture */}
        <section className="mb-5">
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>Architecture Layers</h2>
          <div className="d-flex flex-column gap-2">
            {architectureLayers.map((l) => (
              <div key={l.name} style={{ background: `${l.color}0a`, border: `1px solid ${l.color}22`, borderRadius: "10px", padding: "1rem 1.25rem" }}>
                <h4 style={{ color: l.color, fontSize: "0.92rem", fontWeight: 700, marginBottom: "0.25rem" }}>{l.name}</h4>
                <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.5, marginBottom: 0 }}>{l.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-5">
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>How Tenant Routing Works</h2>
          <div style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "1.25rem" }}>
            <pre style={{ color: "#cbd5e1", fontSize: "0.78rem", overflow: "auto", marginBottom: 0 }}>
              <code>{`// middleware.ts — runs on every request at the edge
import { NextResponse } from 'next/server';
import { get } from '@vercel/edge-config';

export async function middleware(request) {
  const hostname = request.headers.get('host') || '';
  
  // Look up tenant from Edge Config (< 1ms read)
  const tenantConfig = await get(hostname);
  
  if (!tenantConfig) {
    return NextResponse.redirect(new URL('/not-found', request.url));
  }
  
  // Pass tenant info downstream via headers
  const response = NextResponse.next();
  response.headers.set('x-tenant-id', tenantConfig.id);
  response.headers.set('x-tenant-theme', tenantConfig.theme);
  return response;
}

// Adding a custom domain programmatically:
// POST https://api.vercel.com/v10/projects/{projectId}/domains
// { "name": "client-a.com" }
// → Customer adds CNAME: cname.vercel-dns.com
// → Vercel auto-provisions SSL`}</code>
            </pre>
          </div>
        </section>

        {/* Critical: Cache Isolation */}
        <section className="mb-5">
          <h2 style={{ color: "#f59e0b", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>⚠️ Critical: Cache Isolation</h2>
          <div style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: "12px", padding: "1.5rem" }}>
            <p style={{ color: "#cbd5e1", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1rem" }}>
              <strong style={{ color: "#f59e0b" }}>The #1 security concern:</strong> Without proper cache isolation, Tenant A can see Tenant B&apos;s content.
              ISR cache keys <strong>must</strong> include the hostname or tenantId.
            </p>
            <div className="row g-3">
              <div className="col-md-6">
                <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "8px", padding: "0.8rem" }}>
                  <p style={{ color: "#f87171", fontSize: "0.82rem", fontWeight: 700, marginBottom: "0.3rem" }}>❌ Wrong: No tenant in cache key</p>
                  <p style={{ color: "#94a3b8", fontSize: "0.8rem", marginBottom: 0 }}>ISR page cached as /homepage → shared across all tenants</p>
                </div>
              </div>
              <div className="col-md-6">
                <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "8px", padding: "0.8rem" }}>
                  <p style={{ color: "#10b981", fontSize: "0.82rem", fontWeight: 700, marginBottom: "0.3rem" }}>✅ Correct: Tenant in cache key</p>
                  <p style={{ color: "#94a3b8", fontSize: "0.8rem", marginBottom: 0 }}>Middleware sets x-tenant-id header → Next.js includes it in cache key automatically</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Results */}
        <section className="mb-5">
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>Customer Results</h2>
          <div className="row g-3">
            {customerResults.map((c) => (
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

        <div className="text-center py-4">
          <a href="https://vercel.com/solutions/multi-tenant-saas" target="_blank" rel="noopener noreferrer" className="btn-glow" style={{ marginRight: "1rem" }}>
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
