import Link from "next/link";

/* ── Runtime Comparison (expanded) ── */
const runtimeComparison = [
  { feature: "Engine", edge: "V8 isolates", serverless: "Node.js (full)" },
  { feature: "Location", edge: "CDN PoPs (100+ globally)", serverless: "Regional data centres" },
  { feature: "Cold start", edge: "Near-zero (<5ms)", serverless: "100–500ms (mitigated by Fluid)" },
  { feature: "Max CPU time", edge: "35ms", serverless: "Minutes (plan-dependent)" },
  { feature: "Max memory", edge: "128MB", serverless: "Up to 3GB" },
  { feature: "Max duration", edge: "30s", serverless: "Up to 5 min (Pro), 15 min (Enterprise)" },
  { feature: "npm packages", edge: "Web API compatible only", serverless: "All packages" },
  { feature: "File system", edge: "No", serverless: "Yes (ephemeral /tmp)" },
  { feature: "Database connections", edge: "No traditional DB (use Edge Config, HTTP-based DBs)", serverless: "Yes (pooled connections recommended)" },
  { feature: "Streaming", edge: "Yes (limited by CPU budget)", serverless: "Yes (full streaming support)" },
  { feature: "WebSocket", edge: "No", serverless: "No (use third-party like Pusher/Ably)" },
  { feature: "Dynamic imports", edge: "Yes", serverless: "Yes" },
  { feature: "Pricing model", edge: "Per-invocation", serverless: "Per-invocation + GB-hours (Fluid: active CPU only)" },
];

/* ── Edge Runtime Use Cases ── */
const edgeUseCases = [
  { title: "Authentication & Authorization", desc: "Verify JWTs, check session cookies, and redirect unauthenticated users — all within 5ms at the nearest edge location. No round-trip to your origin server.", code: `// middleware.ts
import { NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';

export function middleware(request) {
  const token = request.cookies.get('session');
  if (!token || !verifyToken(token.value)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/protected/:path*']
};` },
  { title: "A/B Testing & Feature Flags", desc: "Route users to different variants at the edge without client-side flickering. Combine with Edge Config for instant flag updates without redeployment.", code: `// middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request) {
  const bucket = request.cookies.get('ab-bucket')?.value
    || (Math.random() > 0.5 ? 'control' : 'variant');

  const response = NextResponse.rewrite(
    new URL(\`/\${bucket}\${request.nextUrl.pathname}\`, request.url)
  );

  if (!request.cookies.get('ab-bucket')) {
    response.cookies.set('ab-bucket', bucket, { maxAge: 60 * 60 * 24 * 30 });
  }
  return response;
}` },
  { title: "Geo-Based Routing", desc: "Detect visitor's country, region, or city from the edge and serve localized content, redirect to regional stores, or block restricted regions.", code: `// middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request) {
  const country = request.geo?.country || 'US';
  const city = request.geo?.city || 'Unknown';

  // Redirect to country-specific store
  if (country === 'DE') {
    return NextResponse.redirect('https://de.store.example.com');
  }

  // Add geo headers for downstream use
  const response = NextResponse.next();
  response.headers.set('x-user-country', country);
  response.headers.set('x-user-city', city);
  return response;
}` },
  { title: "Rate Limiting", desc: "Simple IP-based rate limiting at the edge. For complex rate limiting, combine with Vercel KV or an external store.", code: `// middleware.ts
import { NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

export async function middleware(request) {
  const ip = request.ip ?? '127.0.0.1';
  const { success, limit, remaining } = await ratelimit.limit(ip);

  if (!success) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: { 'X-RateLimit-Limit': limit, 'X-RateLimit-Remaining': remaining }
    });
  }
  return NextResponse.next();
}` },
];

/* ── Serverless Use Cases ── */
const serverlessUseCases = [
  { title: "Server-Side Rendering (SSR)", desc: "Full page rendering with access to cookies, headers, and databases. Every request gets fresh, personalized HTML.", code: `// app/dashboard/page.tsx
export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const session = await getServerSession();
  const orders = await db.query(
    'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC',
    [session.user.id]
  );

  return (
    <main>
      <h1>Welcome, {session.user.name}</h1>
      <OrderList orders={orders} />
    </main>
  );
}` },
  { title: "API Routes with Database Access", desc: "Full Node.js API endpoints with connection pooling, transactions, and complex queries. Access any npm package.", code: `// app/api/products/route.ts
import { db } from '@/lib/database';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  const products = await db.query(
    'SELECT * FROM products WHERE category = $1 AND active = true',
    [category]
  );

  return Response.json(products, {
    headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=300' }
  });
}

export async function POST(request) {
  const body = await request.json();
  const product = await db.query(
    'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *',
    [body.name, body.price, body.category]
  );
  return Response.json(product, { status: 201 });
}` },
  { title: "AI/LLM Inference", desc: "Long-running AI model calls with streaming responses. Fluid Compute makes this cost-effective by billing only active CPU time.", code: `// app/api/chat/route.ts
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(request) {
  const { messages } = await request.json();

  const result = streamText({
    model: openai('gpt-4o'),
    messages,
    system: 'You are a helpful assistant.',
  });

  return result.toDataStreamResponse();
}

// With Fluid Compute:
// 10s stream, 200ms CPU = billed for 200ms only!` },
  { title: "File Processing & Image Generation", desc: "Process uploads, generate PDFs, create dynamic OG images. Full file system access in /tmp.", code: `// app/api/og/route.tsx
import { ImageResponse } from 'next/og';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'My Site';

  return new ImageResponse(
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      width: '100%', height: '100%',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white', fontSize: 48, fontWeight: 700,
    }}>
      {title}
    </div>,
    { width: 1200, height: 630 }
  );
}` },
];

/* ── When to Choose Each ── */
const decisionGuide = [
  { scenario: "Auth check before page load", runtime: "Edge", reason: "Near-zero latency, runs globally before cache" },
  { scenario: "A/B test with no flicker", runtime: "Edge", reason: "Rewrite URLs at CDN level, no client JS needed" },
  { scenario: "Feature flag check", runtime: "Edge + Edge Config", reason: "Read flag in <1ms, no redeployment needed" },
  { scenario: "Geo-based redirect", runtime: "Edge", reason: "Access request.geo at nearest PoP" },
  { scenario: "SSR dashboard with DB queries", runtime: "Serverless", reason: "Needs full Node.js, DB connections, npm packages" },
  { scenario: "AI chatbot with streaming", runtime: "Serverless + Fluid", reason: "Long-running streams, pay only for CPU time" },
  { scenario: "PDF generation", runtime: "Serverless", reason: "Needs file system, heavy npm packages, memory" },
  { scenario: "Webhook handler", runtime: "Serverless", reason: "May need DB writes, complex logic, retries" },
  { scenario: "Simple API returning cached data", runtime: "Edge", reason: "Fast response, no DB needed, Web API compatible" },
  { scenario: "Image generation (OG images)", runtime: "Serverless", reason: "Uses ImageResponse, needs memory for rendering" },
];

export default function ComputeRuntimesPage() {
  return (
    <main className="py-5">
      <div className="container" style={{ maxWidth: "1100px" }}>
        <Link href="/se/platform-fundamentals" style={{ color: "#667eea", textDecoration: "none", fontSize: "0.9rem" }}>
          ← Back to Platform Fundamentals
        </Link>

        <div className="mt-3 mb-5">
          <span style={{ background: "rgba(139,92,246,0.15)", color: "#a78bfa", padding: "0.2rem 0.6rem", borderRadius: "12px", fontSize: "0.75rem", fontWeight: 600 }}>
            Compute Runtimes
          </span>
          <h1 className="mt-2" style={{ fontSize: "2.2rem", fontWeight: 800, color: "#fff" }}>
            ⚙️ Compute — The Two Runtimes
          </h1>
          <p style={{ color: "#94a3b8", maxWidth: "700px", lineHeight: 1.7 }}>
            Every Vercel SE must know Edge vs Serverless cold. This page covers the technical differences,
            real-world use cases with production code, and a decision framework for architecture conversations.
          </p>
        </div>

        {/* ─── Runtime Comparison Table ─── */}
        <section className="mb-5">
          <h2 className="mb-3" style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem" }}>
            Side-by-Side Comparison
          </h2>
          <div className="table-responsive">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "rgba(102,126,234,0.15)" }}>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.65rem 1rem", color: "#fff", fontWeight: 600, width: "22%" }}>Feature</th>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.65rem 1rem", color: "#06b6d4", fontWeight: 600, width: "39%" }}>⚡ Edge Runtime</th>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.65rem 1rem", color: "#8b5cf6", fontWeight: 600, width: "39%" }}>🖥️ Serverless (Node.js)</th>
                </tr>
              </thead>
              <tbody>
                {runtimeComparison.map((row, i) => (
                  <tr key={row.feature} style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)" }}>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.6rem 1rem", color: "#fff", fontWeight: 600, fontSize: "0.85rem" }}>{row.feature}</td>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.6rem 1rem", color: "#94a3b8", fontSize: "0.83rem" }}>{row.edge}</td>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.6rem 1rem", color: "#cbd5e1", fontSize: "0.83rem" }}>{row.serverless}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── Edge Runtime Deep Dive ─── */}
        <section className="mb-5">
          <h2 className="mb-3" style={{ color: "#06b6d4", fontWeight: 700, fontSize: "1.4rem" }}>
            ⚡ Edge Runtime — Deep Dive
          </h2>
          <p style={{ color: "#94a3b8", marginBottom: "1.5rem", lineHeight: 1.7 }}>
            Edge Runtime uses V8 isolates (not full containers) at 100+ CDN PoPs worldwide. Startup time is near-zero
            because isolates share the V8 engine — no OS boot, no container init. The tradeoff: limited to Web APIs,
            no Node.js-specific modules (fs, crypto, etc.), and a 35ms CPU budget.
          </p>

          <div className="d-flex flex-column gap-4">
            {edgeUseCases.map((uc) => (
              <div key={uc.title} className="feature-card" style={{ padding: "1.5rem" }}>
                <h3 style={{ color: "#06b6d4", fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.3rem" }}>{uc.title}</h3>
                <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "0.75rem" }}>{uc.desc}</p>
                <pre style={{
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "8px",
                  padding: "0.75rem 1rem",
                  fontSize: "0.75rem",
                  color: "#cbd5e1",
                  overflow: "auto",
                  marginBottom: 0,
                }}>
                  <code>{uc.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Serverless Deep Dive ─── */}
        <section className="mb-5">
          <h2 className="mb-3" style={{ color: "#8b5cf6", fontWeight: 700, fontSize: "1.4rem" }}>
            🖥️ Serverless (Node.js) — Deep Dive
          </h2>
          <p style={{ color: "#94a3b8", marginBottom: "1.5rem", lineHeight: 1.7 }}>
            Full Node.js runtime in regional data centres (default: Washington, DC — iad1). Supports every npm package,
            file system access (/tmp), database connections, and long-running operations. With Fluid Compute,
            multiple requests share one instance, and you only pay for active CPU time.
          </p>

          <div className="d-flex flex-column gap-4">
            {serverlessUseCases.map((uc) => (
              <div key={uc.title} className="feature-card" style={{ padding: "1.5rem" }}>
                <h3 style={{ color: "#8b5cf6", fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.3rem" }}>{uc.title}</h3>
                <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "0.75rem" }}>{uc.desc}</p>
                <pre style={{
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "8px",
                  padding: "0.75rem 1rem",
                  fontSize: "0.75rem",
                  color: "#cbd5e1",
                  overflow: "auto",
                  marginBottom: 0,
                }}>
                  <code>{uc.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Decision Guide ─── */}
        <section className="mb-5">
          <h2 className="mb-3" style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem" }}>
            🎯 Decision Guide — Which Runtime?
          </h2>
          <p style={{ color: "#94a3b8", marginBottom: "1rem" }}>
            Use this table in architecture conversations to quickly recommend the right runtime for each use case.
          </p>
          <div className="table-responsive">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "rgba(102,126,234,0.15)" }}>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.6rem 1rem", color: "#fff", fontWeight: 600, width: "35%" }}>Scenario</th>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.6rem 1rem", color: "#818cf8", fontWeight: 600, width: "20%" }}>Runtime</th>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.6rem 1rem", color: "#94a3b8", fontWeight: 600, width: "45%" }}>Why</th>
                </tr>
              </thead>
              <tbody>
                {decisionGuide.map((row, i) => (
                  <tr key={row.scenario} style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)" }}>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.55rem 1rem", color: "#cbd5e1", fontSize: "0.85rem" }}>{row.scenario}</td>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.55rem 1rem", color: "#818cf8", fontSize: "0.85rem", fontWeight: 600 }}>{row.runtime}</td>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.55rem 1rem", color: "#94a3b8", fontSize: "0.83rem" }}>{row.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── Anti-Patterns ─── */}
        <section className="mb-5">
          <h2 className="mb-3" style={{ color: "#f59e0b", fontWeight: 700, fontSize: "1.4rem" }}>
            ⚠️ Common Anti-Patterns
          </h2>
          <div className="row g-3">
            {[
              { mistake: "Using Edge Runtime for database queries", fix: "Edge can't hold traditional DB connections. Use Serverless, or use HTTP-based databases (Neon over HTTP, PlanetScale, Turso)." },
              { mistake: "Using Serverless when Edge would suffice", fix: "Simple header checks, redirects, and auth don't need full Node.js. Edge is faster and cheaper for these." },
              { mistake: "Not setting a function region near the database", fix: "Serverless defaults to iad1. If your DB is in eu-west-1, set the function region to match: export const preferredRegion = 'fra1';" },
              { mistake: "Opening a new DB connection per request", fix: "Use connection pooling (e.g., @vercel/postgres, PgBouncer, Prisma connection pool). Fluid Compute shares instances, so pooling matters even more." },
            ].map((ap) => (
              <div key={ap.mistake} className="col-md-6">
                <div style={{
                  background: "rgba(245,158,11,0.06)",
                  border: "1px solid rgba(245,158,11,0.15)",
                  borderRadius: "10px",
                  padding: "1.15rem",
                  height: "100%",
                }}>
                  <p style={{ color: "#f59e0b", fontSize: "0.88rem", fontWeight: 600, marginBottom: "0.3rem" }}>❌ {ap.mistake}</p>
                  <p style={{ color: "#94a3b8", fontSize: "0.83rem", lineHeight: 1.6, marginBottom: 0 }}>✅ {ap.fix}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center py-3">
          <Link href="/se/platform-fundamentals/mental-model" className="btn-glow" style={{ marginRight: "1rem" }}>
            ← Mental Model
          </Link>
          <Link href="/se/platform-fundamentals/fluid-compute" className="btn-glow">
            Fluid Compute →
          </Link>
        </div>
      </div>
    </main>
  );
}
