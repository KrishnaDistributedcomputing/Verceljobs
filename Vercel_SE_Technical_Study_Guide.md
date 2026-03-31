# Vercel SE Engineer — Deep Technical Study Guide

**Purpose:** Interview & role preparation — Solutions Engineer / Solutions Architect  
**Last updated:** March 2026  
**Level:** Foundational → Production-depth  

> This document covers everything a Vercel SE is expected to know and discuss with enterprise customers — from platform fundamentals to architecture decisions, pricing conversations, and the AI Cloud layer. Study it cover to cover, then build something with each concept.

---

## Contents

1. [What the Role Actually Is](#1--what-the-role-actually-is)
2. [The Vercel Platform — Mental Model](#2--the-vercel-platform--mental-model)
3. [Compute — The Three Runtimes](#3--compute--the-three-runtimes)
4. [Fluid Compute — The 2025 Game Changer](#4--fluid-compute--the-2025-game-changer)
5. [Next.js Rendering Strategies](#5--nextjs-rendering-strategies)
6. [The Build Pipeline & Deployment Model](#6--the-build-pipeline--deployment-model)
7. [Edge Network & CDN](#7--edge-network--cdn)
8. [Preview Deployments](#8--preview-deployments)
9. [Caching — The Most Important Topic](#9--caching--the-most-important-topic)
10. [Middleware & Routing](#10--middleware--routing)
11. [Edge Config & KV Storage](#11--edge-config--kv-storage)
12. [Observability — Speed Insights, Web Vitals, Logs](#12--observability--speed-insights-web-vitals-logs)
13. [Security — WAF, DDoS, Access Control](#13--security--waf-ddos-access-control)
14. [The AI Cloud Layer](#14--the-ai-cloud-layer)
15. [Composable Architecture & Headless Integrations](#15--composable-architecture--headless-integrations)
16. [Pricing Model — In Depth](#16--pricing-model--in-depth)
17. [Enterprise Features](#17--enterprise-features)
18. [Common Customer Architectures](#18--common-customer-architectures)
19. [Migration Patterns](#19--migration-patterns)
20. [Core Web Vitals — What You Must Know](#20--core-web-vitals--what-you-must-know)
21. [SE Interview Topics & Common Questions](#21--se-interview-topics--common-questions)
22. [Glossary](#22--glossary)

---

## 1.  What the Role Actually Is

A Vercel Solutions Engineer (SE) / Solutions Architect spans **pre-sales and post-sales**. From the actual job description:

> *"In pre-sales, you qualify technical fit, design future-state architectures, run evaluations, and demonstrate how Vercel unlocks measurable business outcomes. Post-sales, you act as a technical quarterback, helping customers successfully adopt and standardize on Vercel."*

### What you actually do day-to-day

| Activity | Description |
|----------|-------------|
| **Technical discovery** | Talk to a prospect's engineering team, understand their stack, find the pain (slow builds, bad Core Web Vitals, no preview deployments, scaling issues) |
| **Architecture design** | Design target architectures — which rendering strategy, which compute tier, how headless CMS integrates, where the edge sits |
| **Live demos** | Deploy something in real time. Show Preview Deployments, show ISR revalidation, show AI streaming with the AI SDK |
| **Code audits** | Review a customer's Next.js codebase. Find anti-patterns, wrong rendering strategy, cache misses, oversized bundles |
| **Migration planning** | Help a team move from Create React App → Next.js App Router, or from Gatsby → Next.js + ISR |
| **POC/eval support** | Run a 30-day evaluation, build a reference implementation, get the engineering team to say yes |
| **Post-sales architecture** | Guide onboarding, build reference implementations, run workshops, pair program with their engineers |
| **Voice of Customer** | Feed customer pain and feature requests back to Vercel's Product and Engineering teams |

### The key duality

You must be equally comfortable:
- Talking **business outcomes** with a VP of Engineering or CTO ("This improves your LCP by 40%, which Google's data shows increases conversion 2–3% per 100ms improvement")
- Talking **implementation details** with a senior developer ("You should use `unstable_cache` here instead of the `fetch` cache, and here's why the ISR stampede was happening")

---

## 2.  The Vercel Platform — Mental Model

Vercel is a **Developer Experience (DX) Platform** — not just a hosting provider. The mental model has four layers:

```
┌──────────────────────────────────────────────────────────┐
│  DEVELOPER EXPERIENCE LAYER                              │
│  Git push → auto-build → preview URL → production       │
│  v0 (AI app builder) · Vercel Agent · CI/CD pipeline    │
├──────────────────────────────────────────────────────────┤
│  COMPUTE LAYER                                           │
│  Serverless Functions · Edge Runtime · Fluid Compute     │
│  Vercel Functions (unified umbrella since mid-2025)     │
├──────────────────────────────────────────────────────────┤
│  EDGE NETWORK LAYER                                      │
│  Global CDN · Edge Cache · Routing Middleware            │
│  Edge Config (global KV) · Image Optimization           │
├──────────────────────────────────────────────────────────┤
│  AI CLOUD LAYER (new, 2025–2026)                        │
│  AI SDK · AI Gateway · Vercel Sandbox · Workflows        │
│  v0 · use-workflow (durable workflows)                  │
└──────────────────────────────────────────────────────────┘
```

### The core value proposition in one sentence

> **"From code to globally distributed, framework-optimised infrastructure in one git push — with zero configuration."**

Vercel deeply understands your framework (especially Next.js, which Vercel created) and provisions the right compute, caching, and CDN configuration automatically.

### Key company facts for customer conversations

- Founded by Guillermo Rauch (creator of Next.js and Socket.io)
- $300M Series F at $9.3B valuation (October 2025)
- Enterprise customers: The Washington Post, Zapier, HashiCorp, Adobe, Anthropic, OpenAI, PayPal, Under Armour, eBay, Ramp, Supreme
- Creator of: **Next.js**, **Turbopack**, **AI SDK**, **v0**, **SWC** (Speedy Web Compiler)
- v0 (AI app builder): used by 4M+ people by early 2026

---

## 3.  Compute — The Three Runtimes

Vercel Functions (the unified umbrella as of mid-2025) come in two runtimes. Understanding the difference is essential for every architecture conversation.

### 3.1 Edge Runtime

**What it is:** Lightweight execution environment built on **V8 isolates** — the same engine that runs Chrome. Not a full Node.js environment.

**How it works:** Code runs in V8 isolates at CDN Points of Presence (PoPs) — physically close to users. Cold starts are up to **9× faster** than traditional serverless.

**API surface:** Web Standard APIs only (`fetch`, `Request`, `Response`, `URL`, `crypto`). No file system. No native modules. No arbitrary npm packages.

**Execution limits:**
- CPU time: 35ms (hard limit — measured in CPU, not wall clock)
- Memory: 128MB
- Response size: 4MB

**Best for:**
- Authentication checks (`if (!token) redirect('/login')`)
- A/B testing and feature flag routing
- Geolocation-based redirects (`if (geo.country === 'DE') redirect('/de')`)
- Request/response header manipulation
- Rate limiting (simple, IP-based)
- Lightweight personalisation at the network edge

**Not for:**
- Database queries (no persistent connections)
- Long-running tasks
- Node.js-specific libraries
- Anything with PHI/PII that must stay in a specific region

### 3.2 Serverless Functions (Node.js Runtime)

**What it is:** Full Node.js environment running in ephemeral containers (microVMs). Full npm package compatibility. Full file system access.

**How it works:** Each function invocation spins up a container, executes, and returns. With Fluid Compute (see Section 4), multiple invocations can share a single container instance.

**Execution limits (plan-dependent):**
- Hobby: 60 seconds max
- Pro: 15 seconds default, configurable up to **300 seconds** (5 minutes) with Fluid Compute, up to **13 minutes** for some configurations
- Enterprise: custom

**Best for:**
- Server-side rendering (SSR pages)
- API routes with database queries
- Authentication with JWT validation
- AI/LLM inference calls
- File processing, image generation
- Anything needing full Node.js APIs

**Cold start reality:** Traditional serverless suffers from cold starts (100–500ms). Fluid Compute mitigates this significantly via bytecode caching and instance reuse.

### Runtime Comparison — Quick Reference

| | Edge Runtime | Serverless (Node.js) |
|---|---|---|
| Engine | V8 isolates | Node.js (full) |
| Location | CDN PoPs (100+ globally) | Regional data centres (configurable) |
| Cold start | Near-zero | 100–500ms (mitigated by Fluid) |
| Max CPU | 35ms | Minutes (plan-dependent) |
| Max memory | 128MB | Up to 3GB |
| npm packages | Web API compatible only | All packages |
| File system | No | Yes (ephemeral) |
| Persistent connections | No | Yes (during invocation) |
| Database access | No (use Edge Config for reads) | Yes |

---

## 4.  Fluid Compute — The 2025 Game Changer

Fluid Compute is Vercel's biggest architectural evolution since the platform launched. Announced February 2025, **enabled by default for new projects from April 23, 2025.**

### The problem with traditional serverless

Traditional serverless uses a **microVM per function invocation**. When a function is waiting for a database query or external API call (I/O), the microVM sits idle — but you're still paying for it.

For AI applications, this is especially painful: a streaming LLM response can take 10–60 seconds, but the actual CPU computation is only a fraction of that. Under traditional pricing, you pay for all 60 seconds.

### What Fluid Compute does differently

**1. Shared instances (not microVM-per-invocation)**  
Multiple invocations can share the same physical instance concurrently. Think of it as "mini-servers" rather than single-use functions. This eliminates the cold start overhead of spinning up a new microVM for each request.

**2. Active CPU pricing**  
You only pay for the milliseconds your code actually executes on the CPU — **not for I/O wait time**.

```
Traditional: Billed for entire request duration (10s of LLM streaming = 10s billing)
Fluid:       Billed only for active CPU (10s streaming, 200ms CPU = 200ms billing)
```

**3. Bytecode caching**  
V8 bytecode is cached across invocations in production, eliminating parse/compile overhead on repeated executions. Only available in production (not preview deployments).

**4. Error isolation**  
Unhandled errors in one concurrent request do not crash other requests sharing the same instance.

**5. Multi-region failover (Enterprise)**  
First failover to another availability zone in the same region. If the entire region is down, automatically routes to the next closest region.

### Cost impact example (from Vercel docs)

Function with 4GB memory in São Paulo:
- CPU rate: $0.221/hour
- Memory rate: $0.0183/GB-hour
- Request: 4 seconds active CPU, 10 seconds instance lifetime

```
Active CPU cost: (4s / 3600) × $0.221 = $0.000245
Memory cost:     (10s / 3600) × 4GB × $0.0183 = $0.000203
Total per request: ~$0.000448
```

### When to recommend Fluid Compute

- AI applications with long I/O (LLM calls, streaming)
- APIs with high concurrency and variable workload
- Any application where cold starts are causing user experience issues
- I/O-heavy backends (database queries, third-party API aggregation)

### Fluid Compute limitations

- Shared instance means **global state leaks between requests** if you write to module-level variables — warn customers about this
- Not available for preview deployments (bytecode caching is production-only)
- Memory is billed for the entire instance lifetime, not just CPU time — important for long-running instances

---

## 5.  Next.js Rendering Strategies

This is the core technical topic for any Vercel SE. You must be able to explain all four strategies, know when to use each, and diagnose when a customer is using the wrong one.

### The Four Strategies

#### 5.1 Static Site Generation (SSG)

**What it is:** Pages rendered at build time. HTML is generated once, served from CDN everywhere.

**How to implement:**
```javascript
// App Router (Next.js 13+)
// Default for pages without dynamic data
export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    cache: 'force-cache'  // default — cached indefinitely
  });
  return <div>{data.content}</div>;
}
```

**When to use:**
- Marketing pages, landing pages, blog posts
- Content that changes rarely (hours to days)
- Maximum CDN cache hit rate required
- Best SEO performance (HTML pre-rendered)

**Limitations:**
- Requires full rebuild to update content
- Poor fit for personalised content
- Not suitable for real-time data

**On Vercel advantage:** Static assets are distributed across all CDN PoPs globally, served in milliseconds.

#### 5.2 Incremental Static Regeneration (ISR)

**What it is:** Pages are statically generated, but automatically regenerated in the background when their cache expires — without a full site rebuild.

**How to implement:**
```javascript
// Time-based revalidation
export default async function Page() {
  const data = await fetch('https://api.example.com/products', {
    next: { revalidate: 3600 }  // regenerate after 1 hour
  });
  return <ProductList products={data} />;
}

// On-demand revalidation via webhook
import { revalidatePath } from 'next/cache';

export async function POST(request) {
  const { slug } = await request.json();
  revalidatePath(`/products/${slug}`);
  return Response.json({ revalidated: true });
}
```

**The stale-while-revalidate behaviour:**
1. User requests page → served from cache (fast)
2. Cache is older than `revalidate` seconds → Vercel triggers background regeneration
3. Next user gets the fresh version

**Cache stampede problem (and Vercel's solution):**
When many users request the same ISR route simultaneously and the cache is expired, each request can trigger its own function invocation — overloading your backend. Vercel's CDN now prevents this with **request collapsing**: only one request per region invokes a function; the rest wait and get the cached response.

**When to use:**
- E-commerce product pages (update frequently but not every request)
- News sites, blogs with editorial updates
- Any content that updates on a schedule or via CMS publish events
- Large sites where full rebuilds are impractical (100k+ pages)

**On Vercel advantage:** Self-hosted ISR is limited to a single region and doesn't persist generated pages to durable storage. On Vercel, ISR pages are distributed globally across the CDN.

#### 5.3 Server-Side Rendering (SSR)

**What it is:** Pages rendered on every request using a Vercel Function. Data is always fresh.

**How to implement:**
```javascript
// Force dynamic rendering (no caching)
export const dynamic = 'force-dynamic';

export default async function Page({ searchParams }) {
  const user = await auth();  // authentication — different per request
  const data = await db.query(
    `SELECT * FROM orders WHERE user_id = $1`, 
    [user.id]
  );
  return <Dashboard orders={data} />;
}
```

**When to use:**
- Authenticated pages (different content per user)
- Real-time data requirements (live stock prices, live scores)
- Pages that use request-specific data (cookies, headers, geo)
- Search results pages with user-specific filtering

**Cost consideration:** Every request invokes a Vercel Function. High-traffic SSR routes are expensive. Guide customers to use ISR where possible and SSR only where required.

#### 5.4 React Server Components (RSC) — The Modern Approach

**What it is:** Components that render on the server but aren't SSR in the traditional sense. RSC allows selective server/client rendering at the component level, not the page level.

**How it works:**
```javascript
// Server Component (default in App Router)
// Renders on server, zero client-side JS
async function ProductDetails({ id }) {
  const product = await db.getProduct(id);  // direct DB access, no API needed
  return <div>{product.name}</div>;
}

// Client Component (for interactivity)
'use client';
function AddToCart({ productId }) {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>Add ({count})</button>;
}
```

**Why RSC matters for customers:**
- Zero JavaScript shipped for server components (improves LCP, reduces bundle)
- Direct database access without API layer
- Compose server and client components freely
- Works with Suspense for streaming partial UI

**Streaming with Suspense:**
```javascript
import { Suspense } from 'react';

export default function Page() {
  return (
    <>
      <Header />                    {/* renders immediately */}
      <Suspense fallback={<Skeleton />}>
        <SlowDataComponent />       {/* streams in when ready */}
      </Suspense>
    </>
  );
}
```

### Rendering Strategy Decision Matrix

| Requirement | Strategy |
|------------|---------|
| Marketing site, blog, docs | SSG |
| E-commerce products, editorial content | ISR |
| Authenticated dashboards, user-specific data | SSR or RSC |
| Real-time data (prices, scores, alerts) | SSR (with short cache or no-store) |
| Complex page with mix of static + dynamic | RSC with Suspense |
| Global personalisation by segment | Edge Middleware + ISR |
| Per-user personalisation | SSR + cookies |

---

## 6.  The Build Pipeline & Deployment Model

### 6.1 How a deployment works

```
git push (or merge to main)
        │
        ▼
Vercel detects framework  →  applies framework-specific build config
        │
        ▼
Build (Turbopack / webpack / SWC compilation)
  ├── Static pages generated (SSG/ISR)
  ├── Route manifests generated
  ├── Function bundles compiled
  └── Assets optimised (images, fonts)
        │
        ▼
Build output deployed to:
  ├── CDN (static assets + ISR pages)
  └── Vercel Functions infrastructure (serverless / Fluid)
        │
        ▼
DNS updated → new deployment goes live (zero downtime)
Preview URL generated for every non-production deployment
```

### 6.2 Branch previews

Every push to any branch gets a unique **Preview URL**:
```
my-app-git-feature-auth-my-org.vercel.app
```

Preview deployments:
- Are isolated from production data (separate env vars)
- Have the same infrastructure as production
- Can be shared with stakeholders for review
- Automatically get comments from Vercel's GitHub/GitLab integration
- Support **Draft Mode** for CMS content preview

### 6.3 Deployment protection

Enterprise feature: Preview deployments can be protected behind:
- Vercel Authentication (team members only)
- Password protection
- Trusted IPs

### 6.4 Turbopack

Vercel's Rust-based bundler replacing webpack. Key facts for SE conversations:

- Up to **700× faster** cold builds than webpack
- **10× faster** HMR (Hot Module Replacement)
- Stable in Next.js 15 for development
- Incremental computation — only rebuilds what changed
- Enabled with `next dev --turbopack`

---

## 7.  Edge Network & CDN

### 7.1 How the edge network works

Vercel's CDN has **PoPs (Points of Presence)** around the world. When a user makes a request:

1. Request hits the nearest PoP
2. PoP checks its cache
   - **Cache hit:** Returns response in milliseconds (sub-10ms)
   - **Cache miss:** Routes to the nearest Vercel Function region, executes, returns and caches response

### 7.2 Cache hierarchy

```
User → Edge PoP Cache → Regional Function Cache → Origin Function
         (ms)              (10-50ms)                  (100ms+)
```

### 7.3 Cache-Control headers

Vercel respects standard `Cache-Control` headers and maps them to CDN cache behaviour:

```javascript
// Cache for 1 hour, allow stale for 1 day while revalidating
export async function GET() {
  return Response.json(data, {
    headers: {
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400'
    }
  });
}
```

### 7.4 Skew protection

When a new deployment rolls out, some users may still have old JavaScript from the previous deployment while the server is already running new code — causing **version skew** errors.

Vercel's **Skew Protection** (Enterprise + Pro) routes requests to the deployment version that served the original HTML to that user, ensuring consistency. This is a strong enterprise selling point.

---

## 8.  Preview Deployments

One of Vercel's most powerful differentiators. Every pull request gets a live, deployed version of the application.

### Why it matters for enterprise sales

1. **Design reviews:** Designers and PMs can click through the actual feature, not a prototype
2. **QA:** Testers can verify against the real deployment before merge
3. **Client approvals:** Agency customers can show clients a live preview
4. **Catch bugs before production:** Each PR is a full deployment with real infrastructure

### How to demo it

```bash
# Create a branch
git checkout -b feature/new-checkout

# Make a change
echo "Adding new checkout flow..."

# Push — Vercel automatically creates:
# https://my-app-git-feature-new-checkout-my-org.vercel.app
git push origin feature/new-checkout
```

### Integration with Git providers

Vercel comments on GitHub/GitLab/Bitbucket PRs with:
- Preview URL
- Build status
- Performance metrics (if Speed Insights enabled)
- Deployment duration

---

## 9.  Caching — The Most Important Topic

Caching is where most customer problems originate. Understanding every cache layer is essential.

### 9.1 The four cache layers

```
Layer 1: Browser Cache        (client-side, user's browser)
Layer 2: Edge Cache           (Vercel CDN, global PoPs)
Layer 3: Data Cache           (Next.js fetch() cache, per-function)
Layer 4: Full Route Cache     (rendered HTML cache, stored on CDN)
```

### 9.2 Next.js fetch() cache

```javascript
// DEFAULT: cached indefinitely (force-cache)
fetch('https://api.example.com/data')

// Cache for 60 seconds, then revalidate
fetch('https://api.example.com/data', { next: { revalidate: 60 } })

// Never cache (always fresh)
fetch('https://api.example.com/data', { cache: 'no-store' })

// Tag-based: revalidate all fetches with this tag
fetch('https://api.example.com/products', { next: { tags: ['products'] } })
```

### 9.3 On-demand revalidation

```javascript
import { revalidateTag, revalidatePath } from 'next/cache';

// When a product is updated in your CMS, call this API route:
export async function POST(request) {
  const { productId } = await request.json();
  
  revalidateTag('products');                    // revalidate all tagged fetches
  revalidatePath(`/products/${productId}`);     // revalidate specific page
  
  return Response.json({ revalidated: true });
}
```

**This is the webhook pattern** — your CMS (Contentful, Sanity, etc.) triggers a webhook on publish, which calls your Next.js API route, which revalidates the relevant cached pages. This is how ISR + headless CMS works in production.

### 9.4 unstable_cache (for non-fetch data)

For database queries and other data sources that don't use `fetch`:

```javascript
import { unstable_cache } from 'next/cache';
import { db } from '@/lib/database';

const getCachedProducts = unstable_cache(
  async () => {
    return db.query('SELECT * FROM products');
  },
  ['products'],           // cache key
  { 
    revalidate: 3600,     // 1 hour
    tags: ['products']    // revalidate with revalidateTag('products')
  }
);
```

### 9.5 Common caching anti-patterns (for code audits)

| Anti-pattern | Problem | Fix |
|-------------|---------|-----|
| `fetch()` in a Client Component | Bypasses server-side cache, exposes API keys | Move to Server Component |
| `cache: 'no-store'` on every fetch | Every request hits origin — kills performance, costs money | Add appropriate `revalidate` |
| No cache tags | Can't do targeted on-demand revalidation | Add `tags` to related fetches |
| ISR without webhooks | Content updates not visible until `revalidate` period expires | Add CMS webhook → `revalidatePath` |
| Caching user-specific data | User A sees User B's data | Add user ID to cache key or disable cache |
| Caching in Edge Middleware | Edge middleware runs on every request — should not cache | Move caching to Serverless layer |

---

## 10.  Middleware & Routing

### 10.1 What is Middleware?

Middleware runs before every request is processed — at the edge, before the cache is checked. It's the right place for:

```javascript
// middleware.ts (runs on Edge Runtime)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');
  
  // Authentication redirect
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // A/B testing
  const variant = Math.random() < 0.5 ? 'a' : 'b';
  const response = NextResponse.next();
  response.cookies.set('ab-variant', variant);
  return response;
  
  // Geolocation personalisation
  const country = request.geo?.country;
  if (country === 'DE') {
    return NextResponse.redirect(new URL('/de' + request.nextUrl.pathname, request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

### 10.2 What Middleware should NOT do

- Database queries (no persistent connections in Edge Runtime)
- Complex business logic (35ms CPU limit)
- Large npm packages (size limit: 1MB)
- Caching responses

### 10.3 Vercel's Routing Middleware (formerly Edge Middleware)

Since mid-2025, Vercel unified "Edge Middleware" and "Edge Functions" under "Vercel Functions using the Edge Runtime." Middleware is now the term for request interception before routing.

---

## 11.  Edge Config & KV Storage

### 11.1 Edge Config

A **globally replicated key-value store** designed for ultra-low latency reads at the edge. Data is replicated to every PoP.

```javascript
import { get } from '@vercel/edge-config';

// In Middleware (Edge Runtime) — near-zero latency
export async function middleware(request) {
  const maintenanceMode = await get('maintenance-mode');
  if (maintenanceMode) {
    return NextResponse.redirect('/maintenance');
  }
}
```

**Use cases:**
- Feature flags
- Maintenance mode toggle
- A/B test configuration
- Allowed/blocked IP lists
- Rate limiting configuration

**Critical limitation:** Write propagation is **eventually consistent** with seconds of latency. Edge Config is for **read-heavy** data that changes infrequently. Do not use it for user sessions or real-time data.

### 11.2 Vercel KV (Redis-compatible)

For general-purpose key-value storage in Serverless Functions:

```javascript
import { kv } from '@vercel/kv';

// Rate limiting
const requests = await kv.incr(`rate:${userId}`);
await kv.expire(`rate:${userId}`, 60);  // reset after 60 seconds
if (requests > 100) return new Response('Too Many Requests', { status: 429 });
```

### 11.3 Vercel Blob

Object storage for files — images, videos, documents:

```javascript
import { put } from '@vercel/blob';

export async function POST(request) {
  const form = await request.formData();
  const file = form.get('file');
  const blob = await put(file.name, file, { access: 'public' });
  return Response.json({ url: blob.url });
}
```

### 11.4 Vercel Postgres

Managed PostgreSQL (powered by Neon serverless Postgres):

```javascript
import { sql } from '@vercel/postgres';

const { rows } = await sql`SELECT * FROM users WHERE id = ${userId}`;
```

---

## 12.  Observability — Speed Insights, Web Vitals, Logs

### 12.1 Core Web Vitals — What Vercel measures

Vercel's Speed Insights collects real user measurement (RUM) data for:

| Metric | Measures | Good threshold |
|--------|----------|---------------|
| **LCP** (Largest Contentful Paint) | Loading performance — time to render largest visible element | < 2.5s |
| **CLS** (Cumulative Layout Shift) | Visual stability — how much content moves during load | < 0.1 |
| **INP** (Interaction to Next Paint) | Responsiveness — time from user input to visual response | < 200ms |
| **FCP** (First Contentful Paint) | First visible content | < 1.8s |
| **TTFB** (Time to First Byte) | Server response time | < 800ms |

**Why this matters for customer conversations:**
- Google uses Core Web Vitals as a direct SEO ranking signal
- Amazon found every 100ms of latency costs 1% in sales
- Google found 53% of mobile users abandon sites taking > 3 seconds to load

### 12.2 Speed Insights implementation

```javascript
// app/layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
```

### 12.3 Logs & OpenTelemetry

Since Vercel Ship 2025, Vercel supports **OpenTelemetry** for standardised observability:

```javascript
// Instrument a Server Component or API route
import { trace } from '@opentelemetry/api';

const tracer = trace.getTracer('my-app');

export async function GET() {
  return tracer.startActiveSpan('fetch-products', async (span) => {
    const products = await db.getProducts();
    span.setAttribute('product.count', products.length);
    span.end();
    return Response.json(products);
  });
}
```

Log drains (Enterprise): Stream logs to Datadog, New Relic, Axiom, Splunk.

---

## 13.  Security — WAF, DDoS, Access Control

### 13.1 Managed WAF (Web Application Firewall)

Enterprise feature. Protects against:
- OWASP Top 10 attacks (SQL injection, XSS, CSRF)
- Bot attacks
- DDoS at the network level
- Up to 1,000 custom firewall rules (Enterprise)
- Up to 1,000 IP blocking rules

### 13.2 DDoS mitigation

Vercel's edge network absorbs volumetric DDoS attacks automatically. Because static assets and edge-cached responses serve without touching Vercel Functions, the attack surface is dramatically reduced.

### 13.3 Deployment protection

- **Password protection:** Preview deployments behind a shared password
- **Vercel Authentication:** Preview deployments visible only to team members
- **Trusted IPs:** Restrict access to known IPs (Enterprise)

### 13.4 Environment variables

```bash
# .env.local (local development only — never committed)
DATABASE_URL=postgres://...
STRIPE_SECRET_KEY=sk_test_...

# Vercel dashboard: set per-environment (Production / Preview / Development)
# NEXT_PUBLIC_ prefix = exposed to browser (build-time)
# No prefix = server-only (runtime)
```

### 13.5 Compliance

Vercel Enterprise supports:
- SOC 2 Type II
- GDPR / EU data residency (deploy functions in EU regions)
- HIPAA (with Business Associate Agreement)
- PCI DSS considerations
- SAML SSO + SCIM/Directory Sync

---

## 14.  The AI Cloud Layer

This is Vercel's biggest strategic bet and growth area. As an SE in 2026, you need to understand and demo this layer.

### 14.1 Vercel AI SDK

Open-source SDK for building AI-powered applications. The industry standard for AI in Next.js.

```javascript
// Streaming chat with any LLM provider
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';

export async function POST(request) {
  const { messages } = await request.json();
  
  const result = streamText({
    model: openai('gpt-4o'),   // or anthropic('claude-3-5-sonnet')
    messages,
    system: 'You are a helpful assistant.',
  });
  
  return result.toDataStreamResponse();  // streams to browser
}
```

**Client-side:**
```javascript
'use client';
import { useChat } from 'ai/react';

export function Chat() {
  const { messages, input, handleSubmit, handleInputChange } = useChat();
  
  return (
    <div>
      {messages.map(m => <div key={m.id}>{m.content}</div>)}
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
```

### 14.2 AI SDK 6 — Agent abstraction layer (October 2025)

AI SDK 6 added:
- **Agent definition layer** — define reusable agents once, use across the app
- **Tool execution approval** — human-in-the-loop for sensitive operations
- **Type safety across models** — compile-time checks for model/UI data
- **Durable workflow tooling** — long-running agents that survive function timeouts

### 14.3 use-workflow (durable workflows)

Solves the function timeout problem for long-running AI agents:

```javascript
import { workflow } from 'use-workflow';

export const researchAgent = workflow(async (ctx, topic: string) => {
  // Each step is durable — if the function times out, execution resumes
  const sources = await ctx.run('search', () => searchWeb(topic));
  const summary = await ctx.run('summarize', () => llm.summarize(sources));
  const report = await ctx.run('format', () => formatReport(summary));
  return report;
});
```

### 14.4 Vercel AI Gateway

Unified interface to 100+ AI models from a single endpoint. Handles:
- Model routing and fallback
- Rate limiting per model/provider
- Cost tracking and observability
- No code changes to switch providers

### 14.5 Vercel Sandbox

Isolated compute environments for agents that need to execute code:

```javascript
// Agent executes code in an isolated sandbox — no security risk
const sandbox = await createSandbox();
const result = await sandbox.execute(`
  import pandas as pd
  df = pd.read_csv('data.csv')
  print(df.describe())
`);
```

### 14.6 v0 — AI App Builder

- Converts natural language prompts to production-ready React/Next.js code
- 4M+ users by early 2026
- Deployed directly to Vercel with one click
- Backed by Vercel's own frontend-optimised AI model (released May 2025)

### 14.7 Fluid Compute + AI = cost efficiency

For AI workloads specifically:
- LLM call = mostly I/O wait (waiting for the model)
- Traditional serverless: you pay for all the wait time
- Fluid Compute: you pay only for the ~10ms of actual code execution around the LLM call
- **Result: 80-90% cost reduction for AI streaming routes**

---

## 15.  Composable Architecture & Headless Integrations

A huge part of enterprise sales. Vercel positions itself as the **presentation layer** of a composable stack.

### 15.1 The composable architecture model

```
Frontend (Next.js on Vercel)
    │
    ├── Headless CMS (Contentful, Sanity, Storyblok, Hygraph)
    ├── E-commerce (Shopify, Commercetools, BigCommerce)
    ├── Search (Algolia, Elastic)
    ├── Auth (Auth0, Clerk, NextAuth)
    ├── Payments (Stripe, Braintree)
    ├── Analytics (Segment, Mixpanel)
    └── Media (Cloudinary, Mux)
```

### 15.2 Headless CMS + ISR pattern (the most common enterprise pattern)

```javascript
// 1. Fetch content from headless CMS with tag-based caching
export default async function BlogPost({ params }) {
  const post = await fetch(
    `https://cdn.contentful.com/spaces/${SPACE_ID}/entries/${params.slug}`,
    { next: { tags: ['blog', `blog-${params.slug}`] } }
  );
  return <Article post={post} />;
}

// 2. CMS webhook calls this when content is published
export async function POST(request) {
  const { slug } = await request.json();
  revalidateTag(`blog-${slug}`);  // only regenerate the changed post
  return Response.json({ ok: true });
}
```

### 15.3 Commerce patterns

```javascript
// Product page: ISR for product data, SSR for cart/inventory
export default async function ProductPage({ params }) {
  // Static product data — revalidate every hour
  const product = await getProduct(params.id, { revalidate: 3600 });
  
  return (
    <>
      <ProductDetails product={product} />
      <Suspense fallback={<InventoryLoading />}>
        {/* Streamed in — always fresh */}
        <LiveInventory productId={params.id} />
      </Suspense>
    </>
  );
}
```

---

## 16.  Pricing Model — In Depth

Understanding Vercel's pricing is essential for SE conversations. Customers frequently ask about it and compare to alternatives.

### 16.1 Plan overview

| Plan | Cost | Who it's for |
|------|------|-------------|
| **Hobby** | Free | Personal, non-commercial only |
| **Pro** | $20/user/month | Professional developers, commercial projects |
| **Enterprise** | Custom (~$20–25k/year minimum) | Teams needing SSO, SLA, WAF, compliance |

### 16.2 Hobby plan (free)

Strict limits that matter:
- Function execution: 60 seconds max
- 100GB Fast Data Transfer/month
- 1M Edge Requests/month
- 1M Function invocations/month
- 4 hours Active CPU/month
- 360 GB-hours Provisioned Memory/month
- **Commercial use prohibited** (violates ToS)

Common trap: Teams build a product on Hobby, launch, go viral, hit limits instantly.

### 16.3 Pro plan ($20/user/month)

What's included:
- $20 monthly usage credit (offsets usage charges)
- 1TB Fast Data Transfer/month
- 10M Edge Requests/month
- Function execution: up to 300 seconds (Fluid Compute)
- Spend management with configurable hard limits
- Unlimited free viewer seats

Overage rates (examples):
- Edge Requests: $2/million above included
- Fast Data Transfer: $0.15/GB above included
- Active CPU: varies by region (e.g., $0.221/hour in São Paulo)

### 16.4 What triggers cost growth (the "gotchas")

**For customers to watch:**

1. **Edge Requests:** Every request to the CDN — even for static assets — counts. High-traffic sites with many assets can accumulate quickly.

2. **Active CPU:** I/O-bound workloads are cheap with Fluid (pay only for CPU), but CPU-intensive tasks (image processing, heavy computation) accumulate fast.

3. **Fast Data Transfer:** Serving large assets (images, video) through Vercel CDN. Guide customers to use CDN-optimised media services (Cloudinary, Mux) for large files.

4. **ISR revalidation:** Each ISR revalidation invokes a function. High-traffic sites with short revalidation windows can generate significant function invocations.

5. **AI streaming:** Long LLM responses stream for 10–60 seconds. With Fluid Compute, you pay only for CPU — but without it, the cost per AI request can be high.

### 16.5 Spend management

Vercel provides built-in cost controls:
- Default $200 on-demand budget with email/SMS/web notifications
- Configurable hard limit: Vercel auto-pauses all projects when reached
- Per-project spend tracking in the dashboard

### 16.6 Pro → Enterprise trigger points

Recommend Enterprise when the customer needs:
- SAML SSO
- 99.99% SLA guarantee
- Managed WAF
- Audit logs
- Multi-region compute
- HIPAA/PCI compliance
- Dedicated support

---

## 17.  Enterprise Features

### 17.1 99.99% SLA

Enterprise SLA vs Pro (best-effort). Key for regulated industries.

### 17.2 SAML SSO + SCIM

- SAML 2.0 for identity provider integration (Okta, Azure AD, Google Workspace)
- SCIM for automated user provisioning/deprovisioning
- Directory Sync for automatic group management

### 17.3 Multi-region compute

Deploy Vercel Functions to multiple regions simultaneously. Traffic routed to nearest healthy region. With Fluid Compute, AZ and region failover is automatic.

### 17.4 Audit logs

Every action in the Vercel dashboard logged: deployments, environment variable changes, team member additions, security events.

### 17.5 Custom firewall rules

Up to 1,000 custom WAF rules:
```
// Examples of custom rules:
- Block requests from specific countries
- Rate limit by IP for specific paths
- Block requests with specific user agents
- Require specific headers for API routes
```

### 17.6 Log drains

Stream all logs to: Datadog, New Relic, Axiom, Azure Monitor, Splunk, Elastic.

---

## 18.  Common Customer Architectures

These are the patterns you'll encounter most often in enterprise sales. Know how to draw and explain each.

### 18.1 The E-commerce Pattern

```
Shopify / Commercetools (product catalogue, inventory, cart, checkout)
          │
Next.js on Vercel
  ├── /products/[slug]  — ISR (1hr revalidation + webhook on product update)
  ├── /collections/[slug] — ISR (15min revalidation)
  ├── /cart — CSR (client-side only, sensitive)
  ├── /checkout — SSR (must be fresh, auth required)
  └── /account — SSR (auth required)
          │
Edge Middleware
  └── A/B testing on homepage — 50/50 split, cookie-based
```

### 18.2 The Media / Publishing Pattern

```
Contentful / Sanity (content)
          │
Next.js on Vercel
  ├── / (homepage) — ISR (5min or webhook on publish)
  ├── /articles/[slug] — ISR (webhook on publish, tags: ['articles', 'article-{slug}'])
  ├── /live — SSR (real-time ticker, no cache)
  └── /search — SSR or CSR (user-specific)
          │
CMS Webhook → /api/revalidate → revalidateTag('articles')
```

### 18.3 The SaaS Dashboard Pattern

```
Next.js on Vercel
  ├── / (marketing) — SSG
  ├── /blog — ISR
  ├── /login — SSG (just a form)
  └── /app/* — SSR / RSC (authenticated, user-specific)
          │
Auth provider (Clerk / Auth0)
Database (Vercel Postgres / PlanetScale / Supabase)
```

### 18.4 The AI Application Pattern

```
Next.js on Vercel (Fluid Compute)
  ├── /chat — RSC + useChat (AI SDK)
  ├── /api/chat — Vercel Function (streams LLM response)
  ├── /api/search — Edge Function (vector search, fast)
  └── /api/agent — Vercel Function with use-workflow (durable)
          │
AI providers (OpenAI / Anthropic / Gemini via AI Gateway)
Vector DB (Pinecone / Qdrant)
```

---

## 19.  Migration Patterns

You will be asked about migrations constantly. Know these patterns.

### 19.1 Create React App → Next.js App Router

The most common migration request. CRA is end-of-life.

**Phases:**
1. Add Next.js alongside CRA (incremental adoption)
2. Move routes one by one (`/login`, `/dashboard`)
3. Identify SSG vs ISR vs SSR per route
4. Replace API calls with Server Components where possible
5. Add Middleware for auth (replace manual route guards)
6. Migrate to Next.js Image, Font, and Link

### 19.2 Gatsby → Next.js

- Gatsby's GraphQL data layer → Server Components with direct data fetching
- Gatsby static generation → Next.js SSG/ISR
- Gatsby plugins → Next.js equivalents or direct integrations

### 19.3 Self-hosted Next.js → Vercel

Common with teams running Next.js on AWS, GCP, or their own servers.

**What they gain:**
- ISR that actually distributes globally (self-hosted ISR is single-region)
- Preview deployments (impossible on self-hosted without significant tooling)
- Zero-config builds
- Skew protection
- Automatic image optimisation at the CDN level

**Migration:** Usually zero code changes. Point DNS to Vercel.

### 19.4 Pages Router → App Router

The most common Next.js-specific migration:
- Incremental — migrate one route at a time
- `pages/` and `app/` directories coexist
- Data fetching changes: `getServerSideProps` → async Server Components, `getStaticProps` → SSG Server Components

---

## 20.  Core Web Vitals — What You Must Know

This is a direct SE conversation topic. Customers want to improve their scores.

### 20.1 LCP — Largest Contentful Paint

**What it is:** Time until the largest image or text block is visible.

**Common causes of poor LCP:**
- Large hero images not optimised
- Server-side rendering delay (slow TTFB)
- Render-blocking resources

**Vercel/Next.js fixes:**
```javascript
// 1. Use next/image (auto-optimises, lazy loads, WebP conversion)
import Image from 'next/image';
<Image src="/hero.jpg" alt="Hero" priority width={1200} height={600} />
// Note: `priority` on above-the-fold images disables lazy loading

// 2. Preconnect to third-party origins
<link rel="preconnect" href="https://fonts.googleapis.com" />

// 3. Use next/font (zero layout shift, inline CSS)
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
```

### 20.2 CLS — Cumulative Layout Shift

**What it is:** How much the layout shifts as content loads (buttons jumping, text reflowing).

**Common causes:**
- Images without width/height dimensions (browser doesn't reserve space)
- Fonts loading after text renders
- Dynamically injected content above existing content

**Fixes:**
```javascript
// next/image automatically sets aspect ratio — prevents CLS
<Image src="/photo.jpg" alt="" width={800} height={600} />

// next/font loads inline — zero CLS
const geist = Geist({ subsets: ['latin'] });
```

### 20.3 INP — Interaction to Next Paint

**What it is:** How fast the browser responds to user input (replaced FID in 2024).

**Common causes:**
- Large JavaScript bundles blocking the main thread
- Too many Client Components (unnecessary hydration)
- Expensive third-party scripts

**Fixes:**
- Move Client Components down the tree (only `'use client'` where truly needed)
- Code split with `dynamic()` imports
- Defer third-party scripts with `next/script` and `strategy="lazyOnload"`

---

## 21.  SE Interview Topics & Common Questions

Based on the actual Vercel job description and field engineering focus areas.

### Technical discovery questions (you ask these to customers)

1. "What framework are you currently using, and what does your deployment workflow look like today?"
2. "What are your current Core Web Vitals scores? Have you instrumented RUM?"
3. "Where does your data live — what databases and CMS are you using?"
4. "Do you have preview deployments today? How do your teams review changes before merge?"
5. "What are your compliance requirements — SOC 2, HIPAA, PCI, GDPR?"
6. "What's your biggest pain point with your current frontend infrastructure?"
7. "How many pages/routes does your application have? What's your build time?"

### Technical questions you'll be asked in interviews

**"Explain the difference between SSR and ISR and when you'd use each."**
> SSR renders on every request — right for auth-gated pages where data is user-specific or must be real-time. ISR generates statically at build but regenerates in the background after a configured interval — right for content that updates periodically but doesn't need to be request-fresh. ISR delivers near-SSG performance with near-SSR data freshness.

**"What is Fluid Compute and why does it matter for AI applications?"**
> Traditional serverless charges for entire request duration, including I/O wait. Fluid Compute bills only for active CPU time. For an LLM streaming response that takes 30 seconds but uses 200ms of CPU, traditional billing charges 30 seconds, Fluid charges 200ms — roughly a 150× cost reduction. This makes streaming AI applications economically viable on serverless.

**"A customer has a slow LCP on their e-commerce homepage. Walk me through your diagnosis."**
> Start with Speed Insights or Lighthouse to identify the LCP element. If it's an image: check if they're using `next/image` with `priority` set, check image format (WebP/AVIF), check if the image is being optimised or served at full resolution. If LCP is slow due to TTFB: check the rendering strategy — if SSR, profile the function execution time, look for slow database queries or waterfall fetches. Consider moving to ISR with webhook revalidation.

**"How would you architect a Next.js app for a media company with 1M articles?"**
> Use ISR with on-demand revalidation. At build time, generate the 1,000 most popular articles (fastest to load for peak traffic). All other articles generate on first request and are cached. CMS publish webhooks call `revalidatePath` or `revalidateTag` to refresh specific articles. Use `generateStaticParams` with a limited set for the build phase.

**"What's the difference between Edge Runtime and Serverless Runtime, and when would you use each?"**
> Edge Runtime runs V8 isolates at CDN PoPs — millisecond cold starts, global execution, but limited API surface (no Node.js, no file system, no arbitrary npm packages). Serverless is full Node.js — any npm package, file system access, but regional and with cold start overhead. Use Edge for auth checks, A/B routing, geolocation redirects, lightweight header manipulation. Use Serverless for database queries, heavy computation, anything needing full Node.js.

### Red flags in customer codebases (code audit scenarios)

These are real things you'll catch during a code audit engagement:

1. `cache: 'no-store'` on every `fetch()` — entire site is effectively SSR
2. `'use client'` on root layout — entire app hydrates client-side, defeats RSC
3. Fetching data in Client Components that should be in Server Components
4. Large images served without `next/image` (no optimisation, no lazy loading)
5. No cache tags — can't do targeted invalidation, forced to use `revalidatePath('/')` on everything
6. API routes in `pages/api` not migrated to App Router Route Handlers
7. Third-party fonts loaded via `<link>` rather than `next/font` — causes CLS
8. Environment variables prefixed `NEXT_PUBLIC_` for secrets — exposed to browser

---

## 22.  Glossary

| Term | Definition |
|------|------------|
| **DX Platform** | Developer Experience Platform — Vercel's self-description; infrastructure + tooling optimised for developer productivity |
| **Edge Runtime** | V8 isolate-based runtime for ultra-fast, globally distributed code execution at CDN PoPs |
| **Fluid Compute** | Vercel's compute model that allows function instances to serve multiple requests concurrently, with Active CPU pricing |
| **Active CPU pricing** | Billing model that charges only for actual CPU execution time, not I/O wait time |
| **ISR** | Incremental Static Regeneration — static pages that regenerate in the background after a time interval or webhook trigger |
| **RSC** | React Server Components — server-rendered components that ship zero JavaScript to the client |
| **PoP** | Point of Presence — a CDN server location close to end users |
| **Stale-while-revalidate** | Cache strategy that serves stale content immediately while refreshing in the background |
| **Cache stampede** | When many concurrent requests all trigger cache regeneration simultaneously — Vercel prevents with request collapsing |
| **Skew protection** | Enterprise feature ensuring users always receive responses from the same deployment version that served their initial HTML |
| **Edge Config** | Globally replicated key-value store for ultra-low latency reads at the edge |
| **v0** | Vercel's AI-powered frontend app builder that generates Next.js code from natural language |
| **AI SDK** | Vercel's open-source SDK for building AI-powered applications with unified provider interface |
| **Turbopack** | Vercel's Rust-based bundler, successor to webpack, built into Next.js |
| **TTFB** | Time to First Byte — the time from request to first byte of the response |
| **LCP** | Largest Contentful Paint — Core Web Vital measuring when the largest visible element renders |
| **CLS** | Cumulative Layout Shift — Core Web Vital measuring visual stability |
| **INP** | Interaction to Next Paint — Core Web Vital measuring responsiveness to user input |
| **Draft Mode** | Next.js feature that bypasses ISR cache to preview unpublished CMS content |
| **Request collapsing** | Vercel CDN feature that coalesces multiple concurrent requests for the same uncached resource into one origin call |
| **Composable architecture** | Architectural pattern assembling best-of-breed services (CMS, commerce, auth, search) connected through APIs |
| **Headless CMS** | Content management system that provides content via API rather than rendering its own frontend |
| **MACH** | Architecture principle: Microservices, API-first, Cloud-native, Headless — the framework many Vercel enterprise customers use |
| **use-workflow** | Vercel's open-source library for converting functions into durable, retry-able workflows |
| **Bytecode caching** | V8 feature that caches compiled bytecode across Fluid Compute invocations, eliminating parse/compile overhead |

---

*Study tip: After reading each section, go to vercel.com/docs and find the documentation for that concept. Then deploy something that uses it. You will be expected to demo and discuss this in a real customer context.*

*Key resources:*
- *Vercel Docs: vercel.com/docs*
- *Next.js Docs: nextjs.org/docs*
- *Vercel Blog (Engineering): vercel.com/blog/category/engineering*
- *Vercel Ship AI 2025 talks: vercel.com/ship-ai*
- *AI SDK Docs: sdk.vercel.ai*
