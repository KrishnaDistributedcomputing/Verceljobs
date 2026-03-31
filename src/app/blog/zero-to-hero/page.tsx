import Link from "next/link";

const phases = [
  {
    phase: "Phase 0",
    title: "Foundations — Week 1",
    subtitle: "Understand what Vercel actually is and why it exists",
    color: "#667eea",
    icon: "🌱",
    days: [
      {
        day: "Day 1-2: Mental Model",
        tasks: [
          "Read vercel.com/docs — understand the 4-layer platform: DX Layer, Compute Layer, Edge Network, AI Cloud",
          "Install Vercel CLI: npm i -g vercel — deploy a Hello World Next.js app",
          "Watch Guillermo Rauch's keynote from Vercel Ship 2025 — understand the vision",
          "Write down Vercel's core value proposition in your own words: 'From code to globally distributed, framework-optimised infrastructure in one git push'",
        ],
      },
      {
        day: "Day 3-4: Next.js Crash Course",
        tasks: [
          "Complete the official Next.js Learn course (nextjs.org/learn) — the App Router version",
          "Build a small blog with: SSG pages, ISR product page, SSR dashboard, API route",
          "Understand file-based routing, layouts, loading states, error boundaries",
          "Deploy to Vercel — observe the Preview URL on a branch push",
        ],
      },
      {
        day: "Day 5: Vercel vs Traditional Hosting",
        tasks: [
          "Compare: AWS (S3 + CloudFront + Lambda) vs Vercel — write down 5 things Vercel automates",
          "Understand Framework-Defined Infrastructure (FDI): your code defines the infrastructure",
          "Read 3 customer case studies on vercel.com/customers",
          "Set up your study journal — note every concept you learn and questions you have",
        ],
      },
    ],
    checkpoint: "You can explain what Vercel is to a non-technical person AND deploy an app from git push.",
  },
  {
    phase: "Phase 1",
    title: "The Three Runtimes — Week 2",
    subtitle: "Master the compute layer — where your code actually runs",
    color: "#8b5cf6",
    icon: "⚡",
    days: [
      {
        day: "Day 1-2: Edge Runtime vs Serverless",
        tasks: [
          "Build a Middleware that redirects /old-path → /new-path (runs on Edge Runtime)",
          "Build an API route that queries a database (runs on Serverless/Node.js Runtime)",
          "Create a comparison table: Edge (V8 isolates, 35ms CPU, 128MB, no DB) vs Serverless (Node.js, minutes, 3GB, full npm)",
          "Understand WHEN to use each: Edge = auth checks, geo-routing, A/B tests. Serverless = DB queries, API calls, heavy compute",
        ],
      },
      {
        day: "Day 3-4: Fluid Compute Deep-Dive",
        tasks: [
          "Read the Fluid Compute announcement blog post on vercel.com/blog",
          "Understand shared instances vs microVM-per-invocation — draw the before/after diagram",
          "Calculate cost: 10s LLM streaming with 200ms CPU → Traditional bills 10s, Fluid bills 200ms",
          "Learn the 4 features: shared instances, active CPU pricing, bytecode caching, error isolation",
          "Gotcha: memory is billed for instance lifetime, not CPU time — know the difference",
        ],
      },
      {
        day: "Day 5: Hands-On Runtime Exercise",
        tasks: [
          "Build a page that shows the user's country using Edge Middleware (request.geo)",
          "Build an API route that uses Fluid Compute to stream an LLM response",
          "Add console.log timing to measure cold starts — compare Edge vs Serverless",
          "Deploy and test both routes — verify they work in Preview and Production",
        ],
      },
    ],
    checkpoint: "You can explain Edge vs Serverless vs Fluid in a customer conversation and know which to recommend for any use case.",
  },
  {
    phase: "Phase 2",
    title: "Rendering Strategies — Week 3",
    subtitle: "The most important SE topic — when to use SSG, ISR, SSR, RSC, PPR",
    color: "#06b6d4",
    icon: "🎯",
    days: [
      {
        day: "Day 1: SSG + ISR",
        tasks: [
          "Build a blog with SSG pages — observe: HTML generated at build time, served from CDN",
          "Add ISR with revalidate: 60 — observe stale-while-revalidate behavior",
          "Implement on-demand revalidation: create an API route that calls revalidatePath()",
          "Test: update content → call revalidation API → verify fresh content appeared",
        ],
      },
      {
        day: "Day 2: SSR + React Server Components",
        tasks: [
          "Build an authenticated dashboard with dynamic = 'force-dynamic' (SSR)",
          "Convert a data-fetching Client Component to a Server Component — measure bundle reduction",
          "Understand: RSC = zero JS shipped, direct DB access, no API layer needed",
          "Learn the 'use client' boundary — only add it for useState, useEffect, onClick",
        ],
      },
      {
        day: "Day 3: Streaming + Suspense",
        tasks: [
          "Wrap a slow data component in <Suspense fallback={<Skeleton />}>",
          "Observe streaming SSR: shell loads immediately, slow component streams in",
          "Build a page with 3 Suspense boundaries loading at different speeds",
          "Understand: this is how PPR (Partial Prerendering) works — static shell + dynamic holes",
        ],
      },
      {
        day: "Day 4-5: The Decision Matrix",
        tasks: [
          "Create your own rendering strategy decision flowchart",
          "Practice: 'Customer has an e-commerce site with 100K products' → ISR + webhook revalidation",
          "Practice: 'Customer has an authenticated dashboard' → SSR or RSC with force-dynamic",
          "Practice: 'Media site with 1M articles' → ISR + generateStaticParams for top 1K + webhooks",
          "Practice: 'Homepage with both static marketing + live inventory' → RSC + Suspense streaming",
        ],
      },
    ],
    checkpoint: "Given any customer scenario, you can recommend the right rendering strategy and explain WHY with trade-offs.",
  },
  {
    phase: "Phase 3",
    title: "Caching Mastery — Week 4",
    subtitle: "Where most customer problems originate — the #1 SE topic",
    color: "#10b981",
    icon: "💾",
    days: [
      {
        day: "Day 1: The Four Cache Layers",
        tasks: [
          "Memorize: Browser Cache → Edge Cache (CDN) → Data Cache (fetch()) → Full Route Cache (HTML)",
          "Build a page and trace a request through all 4 layers using DevTools Network tab",
          "Set Cache-Control: s-maxage=3600, stale-while-revalidate=86400 on an API route",
          "Understand: s-maxage = CDN TTL, max-age = browser TTL, stale-while-revalidate = background refresh window",
        ],
      },
      {
        day: "Day 2: fetch() Cache + Tags",
        tasks: [
          "Use fetch() with { next: { tags: ['products'] } } — tag-based caching",
          "Use fetch() with { next: { revalidate: 3600 } } — time-based revalidation",
          "Use fetch() with { cache: 'no-store' } — no caching (SSR behavior)",
          "Wrap a database query in unstable_cache() with tags — cache non-fetch data",
        ],
      },
      {
        day: "Day 3: On-Demand Revalidation + Webhooks",
        tasks: [
          "Build a complete webhook flow: CMS publishes → webhook calls API route → revalidateTag('products')",
          "Test targeted invalidation: update one product → only that product page refreshes",
          "Understand request collapsing: many users + expired cache = one function invocation, not thousands",
          "Know the difference: revalidatePath('/products/shoe') (one page) vs revalidateTag('products') (all tagged)",
        ],
      },
      {
        day: "Day 4-5: Anti-Patterns & Debugging",
        tasks: [
          "Learn the 6 caching anti-patterns you'll catch in code audits (memorize these):",
          "  1. fetch() in Client Components — bypasses server cache, exposes API keys",
          "  2. cache: 'no-store' on every fetch — kills performance and increases cost",
          "  3. No cache tags — can't do targeted revalidation",
          "  4. ISR without webhooks — stale until time-based refresh",
          "  5. Caching user-specific data without user ID in key — User A sees User B's data",
          "  6. Heavy caching logic in Middleware — Middleware should be lightweight",
          "Build a broken demo with each anti-pattern, then fix it — practice the diagnosis",
        ],
      },
    ],
    checkpoint: "You can diagnose any caching problem, explain the 4 layers, and set up a complete ISR + webhook + tag-based revalidation flow.",
  },
  {
    phase: "Phase 4",
    title: "Edge Network & Performance — Week 5",
    subtitle: "Core Web Vitals, Middleware, and making things fast",
    color: "#f59e0b",
    icon: "🌐",
    days: [
      {
        day: "Day 1: Core Web Vitals Deep-Dive",
        tasks: [
          "Memorize the targets: LCP ≤ 2.5s, CLS < 0.1, INP ≤ 200ms, FCP < 1.8s, TTFB < 800ms",
          "Run Lighthouse on 3 real websites — identify what's causing poor scores",
          "Understand business impact: Amazon found 100ms latency = 1% sales drop",
          "Google uses Core Web Vitals as an SEO ranking signal — this matters to customers",
        ],
      },
      {
        day: "Day 2: next/image + next/font",
        tasks: [
          "Replace an <img> tag with next/image — observe: WebP conversion, lazy loading, responsive sizes",
          "Add priority prop to the LCP element (hero image) — measure FCP/LCP improvement",
          "Replace a <link> Google Font with next/font — observe: zero CLS, zero FOUT, inline CSS",
          "Understand: these two features fix 80% of CLS and LCP issues you'll encounter",
        ],
      },
      {
        day: "Day 3: Middleware Patterns",
        tasks: [
          "Build auth Middleware: check cookie → redirect to /login if missing",
          "Build A/B test Middleware: assign variant cookie, rewrite to /variant-a or /variant-b",
          "Build geo-routing Middleware: redirect DE users to /de/, FR users to /fr/",
          "Understand limits: 35ms CPU, 1MB size, no DB queries, no heavy npm packages",
        ],
      },
      {
        day: "Day 4: Turbopack + Build Pipeline",
        tasks: [
          "Enable Turbopack: next dev --turbopack — compare HMR speed vs webpack",
          "Understand the deployment flow: git push → framework detection → build → CDN + Functions",
          "Learn Skew Protection: during deployment, old JS + new server = version skew → Vercel routes to matching version",
          "Know Preview Deployments: every PR gets a unique URL with production-grade infrastructure",
        ],
      },
      {
        day: "Day 5: Performance Diagnosis Practice",
        tasks: [
          "Practice scenario: 'Customer's LCP is 4.2s on their e-commerce homepage'",
          "  → Check hero image (next/image with priority?), TTFB (SSR vs ISR?), render-blocking resources",
          "Practice scenario: 'Customer's INP is 450ms'",
          "  → Too much client JS, move 'use client' down the tree, code-split with dynamic(), defer 3P scripts",
          "Practice scenario: 'Customer's CLS is 0.35'",
          "  → Images without width/height, fonts via <link>, dynamically injected content above fold",
        ],
      },
    ],
    checkpoint: "You can diagnose any Core Web Vitals issue, recommend specific fixes, and explain the business impact of performance improvements.",
  },
  {
    phase: "Phase 5",
    title: "AI Cloud Layer — Week 6",
    subtitle: "Vercel's biggest strategic bet — the future of the platform",
    color: "#ec4899",
    icon: "🤖",
    days: [
      {
        day: "Day 1-2: AI SDK + Streaming",
        tasks: [
          "Build a chat app with streamText() on the server + useChat() on the client",
          "Swap providers: change openai('gpt-4o') to anthropic('claude-3-5-sonnet') — zero code changes",
          "Understand the unified provider interface: one API, 100+ models",
          "Deploy to Vercel with Fluid Compute — observe: 80-90% cost reduction vs traditional serverless",
        ],
      },
      {
        day: "Day 3: AI Gateway + Workflows",
        tasks: [
          "Understand AI Gateway: unified endpoint, model routing, failover, rate limiting, cost tracking, BYOK",
          "Learn use-workflow: durable steps that survive function timeouts for long-running AI agents",
          "Know the Sandbox: isolated Linux containers for safe code execution by AI agents",
          "Understand AI SDK 6 (Oct 2025): agent abstraction, tool approval (human-in-the-loop), type safety",
        ],
      },
      {
        day: "Day 4: v0 + Chat SDK",
        tasks: [
          "Use v0.dev to generate a React component from a natural language prompt",
          "Know the stats: 4M+ users, Vercel's own frontend-optimized model (May 2025)",
          "Understand Chat SDK: build cross-platform AI agents (Slack, Teams, Discord, WhatsApp) from one codebase",
          "Practice the pitch: 'Vercel isn't just hosting — it's the AI application platform'",
        ],
      },
      {
        day: "Day 5: AI Cost Story",
        tasks: [
          "Calculate: traditional serverless LLM call (30s) vs Fluid Compute (200ms CPU) = 150× cost reduction",
          "Understand why this matters: AI streaming makes traditional serverless unaffordable at scale",
          "Practice: 'A customer wants to build internal AI tools — why Vercel over raw AWS Lambda?'",
          "Build a complete demo: AI chat + streaming + Fluid Compute — this is your 'wow moment' for interviews",
        ],
      },
    ],
    checkpoint: "You can build and demo an AI streaming application, explain the cost story, and position Vercel's AI Cloud layer against competitors.",
  },
  {
    phase: "Phase 6",
    title: "Enterprise & Security — Week 7",
    subtitle: "What enterprise customers care about — the deal-closing knowledge",
    color: "#ef4444",
    icon: "🔒",
    days: [
      {
        day: "Day 1-2: Pricing & Plans",
        tasks: [
          "Memorize: Hobby (free, non-commercial, 60s functions) → Pro ($20/user/mo, 300s, $20 credit) → Enterprise (custom, ~$20-25K/yr min)",
          "Know the 5 cost drivers: Edge Requests, Active CPU, Fast Data Transfer, ISR revalidation, AI streaming",
          "Understand Spend Management: $200 default budget, configurable hard limit, auto-pause",
          "Know when to recommend Enterprise: SAML SSO, 99.99% SLA, managed WAF, audit logs, HIPAA/PCI, multi-region",
        ],
      },
      {
        day: "Day 3: Security Features",
        tasks: [
          "Understand environment variables: NEXT_PUBLIC_ = browser-exposed (never secrets), no prefix = server-only",
          "Learn WAF: OWASP Top 10, 1,000 custom rules, 1,000 IP blocks, bot protection, DDoS mitigation",
          "Know Deployment Protection: password, Vercel Auth (team only), Trusted IPs",
          "Understand compliance: SOC 2 Type II, GDPR/EU data residency, HIPAA (with BAA), PCI DSS, SAML SSO + SCIM",
        ],
      },
      {
        day: "Day 4: Enterprise Features",
        tasks: [
          "Understand multi-region compute: deploy to multiple regions, automatic failover (AZ → region)",
          "Know audit logs: every dashboard action tracked — deployments, env var changes, team changes",
          "Learn Log Drains: stream to Datadog, New Relic, Axiom, Splunk, Elastic, Azure Monitor",
          "Understand OpenTelemetry support (since Ship 2025): standardized traces and spans",
        ],
      },
      {
        day: "Day 5: Customer Bill Review Exercise",
        tasks: [
          "Practice: 'Customer's bill jumped 300% — what do you investigate?'",
          "  → Edge Requests (every CDN hit counts), Active CPU spikes, large asset bandwidth, ISR over-revalidation",
          "Practice: 'Customer wants to optimize costs' → ISR over SSR, next/image for assets, CDN for media, right-size memory",
          "Practice: 'CTO asks if Vercel is safe for HIPAA data' → SOC 2, BAA, server-only env vars, EU data residency, WAF",
        ],
      },
    ],
    checkpoint: "You can confidently discuss pricing, security, compliance, and handle any enterprise customer objection.",
  },
  {
    phase: "Phase 7",
    title: "SE Skills & Interview Prep — Week 8",
    subtitle: "Turn technical knowledge into SE interview performance",
    color: "#764ba2",
    icon: "🏆",
    days: [
      {
        day: "Day 1: Composable Architecture",
        tasks: [
          "Draw the composable architecture: Next.js on Vercel → headless CMS + commerce + auth + payments + search",
          "Know the 4 common patterns: E-commerce (Shopify+ISR), Media/Publishing (CMS+webhooks), SaaS Dashboard (SSR+auth), AI App (Fluid+SDK)",
          "Practice: 'How does Vercel fit in an existing AWS/Azure environment?' → Vercel = presentation layer, backends stay",
          "Understand MACH: Microservices, API-first, Cloud-native, Headless — the enterprise architecture framework",
        ],
      },
      {
        day: "Day 2: Migration Patterns",
        tasks: [
          "Know CRA → Next.js: add Next.js alongside, migrate routes one by one, identify rendering per route",
          "Know Gatsby → Next.js: GraphQL → Server Components, static gen → ISR, plugins → direct integrations",
          "Know Self-hosted → Vercel: usually zero code changes, point DNS, gain global ISR + previews + Skew Protection",
          "Know Pages Router → App Router: incremental, both coexist, getServerSideProps → async Server Components",
        ],
      },
      {
        day: "Day 3: Technical Discovery Practice",
        tasks: [
          "Memorize and practice asking these 7 discovery questions:",
          "  1. 'What framework are you using and what's your deployment workflow?'",
          "  2. 'What are your Core Web Vitals scores? Do you have RUM?'",
          "  3. 'What databases and CMS are you using?'",
          "  4. 'Do you have preview deployments today?'",
          "  5. 'What compliance requirements do you have — SOC 2, HIPAA, PCI, GDPR?'",
          "  6. 'What's your biggest pain point with current frontend infra?'",
          "  7. 'How many routes/pages and what's your build time?'",
        ],
      },
      {
        day: "Day 4: Live Demo Practice",
        tasks: [
          "Prepare a 10-minute demo that covers: git push → deploy → Preview URL → ISR revalidation → AI streaming",
          "Practice narrating while coding — explain WHAT you're doing and WHY it matters to the customer",
          "Have a 'broken demo' backup plan — if something fails, diagnose it live (shows real expertise)",
          "Time yourself — interviewers notice if you can stay within time limits",
        ],
      },
      {
        day: "Day 5: Mock Interview Day",
        tasks: [
          "Do a full mock: intro (2min) → technical discussion (15min) → live demo (10min) → architecture design (15min) → Q&A (5min)",
          "Practice answering: 'Explain ISR vs SSR' — give the 30-second answer AND the 5-minute deep-dive",
          "Practice answering: 'Walk me through diagnosing slow LCP' — be systematic, not scattered",
          "Practice answering: 'Design an architecture for a media company with 1M articles'",
          "Practice answering: 'A customer is already on AWS — why add Vercel?'",
        ],
      },
    ],
    checkpoint: "You can run a full mock interview cycle — discovery, demo, architecture design — and handle any curveball question.",
  },
];

const weeklyProjects = [
  { week: "Week 1", project: "Deploy a Next.js blog with SSG pages to Vercel", skills: "Git push deploy, Preview URLs, Vercel CLI" },
  { week: "Week 2", project: "Build an API with Edge Middleware + Serverless Functions", skills: "Edge vs Serverless, cold starts, Middleware patterns" },
  { week: "Week 3", project: "E-commerce product page with ISR + webhook revalidation", skills: "SSG, ISR, SSR, RSC, Streaming, Suspense" },
  { week: "Week 4", project: "Full caching demo: 4 layers, tag-based invalidation, anti-patterns", skills: "Cache layers, fetch() cache, revalidateTag, webhooks" },
  { week: "Week 5", project: "Performance audit tool: analyze any URL's Core Web Vitals", skills: "LCP, CLS, INP, next/image, next/font, Lighthouse" },
  { week: "Week 6", project: "AI chat app with streaming, provider switching, cost tracking", skills: "AI SDK, streamText, useChat, Fluid Compute" },
  { week: "Week 7", project: "Enterprise demo: auth Middleware, protected routes, WAF rules", skills: "Security, environment variables, SAML, compliance" },
  { week: "Week 8", project: "Full SE demo: discovery → architecture design → live deploy", skills: "All skills combined, presentation, storytelling" },
];

const interviewAnswers = [
  {
    question: "Explain the difference between SSR and ISR.",
    bad: "SSR renders on the server and ISR renders statically.",
    good: "SSR renders on every request — right for authenticated pages where data is user-specific. ISR generates statically but regenerates in the background after a configured interval — right for content that updates periodically. ISR gives near-SSG performance with near-SSR freshness. On Vercel, ISR pages are distributed globally on the CDN — self-hosted ISR is single-region. I'd recommend ISR for 90% of content pages and reserve SSR for auth-gated or real-time routes.",
  },
  {
    question: "What is Fluid Compute and why does it matter?",
    bad: "It's Vercel's new serverless product that's faster.",
    good: "Traditional serverless bills for the entire request duration, including I/O wait. Fluid Compute bills only for active CPU time. For an LLM streaming response that takes 30 seconds but uses 200ms of CPU, traditional billing charges 30 seconds; Fluid charges 200ms — roughly 150× reduction. It also shares instances across concurrent requests (eliminating cold starts), caches V8 bytecode, and provides error isolation. This makes AI streaming applications economically viable on serverless infrastructure.",
  },
  {
    question: "A customer's LCP is 4.2s. Walk me through diagnosis.",
    bad: "They should use a faster CDN.",
    good: "First, I'd identify the LCP element using Speed Insights or Lighthouse — is it a hero image or text? If image: check if they're using next/image with the priority prop, verify it's serving WebP/AVIF, check viewport-appropriate sizes. If TTFB is slow: check the rendering strategy — if SSR, profile the function execution time, look for waterfall database queries. If it could be ISR with webhook revalidation instead of SSR, that eliminates the compute per request. I'd also check for render-blocking resources and add preconnect hints for third-party origins. Target: ≤ 2.5s.",
  },
  {
    question: "We're already on AWS — why Vercel?",
    bad: "Vercel is better than AWS.",
    good: "Vercel doesn't replace AWS — it's the frontend presentation layer that complements your existing backend. Your APIs, databases, and microservices stay on AWS. Vercel adds: globally distributed ISR (self-hosted is single-region), preview deployments for every PR (impossible on AWS without significant tooling), zero-config CI/CD from git push, Skew Protection during deployments, framework-optimized caching, and the AI Cloud layer for building AI features. It's composable architecture — best-in-class tools for each layer.",
  },
  {
    question: "Design an architecture for a media company with 1M articles.",
    bad: "Use SSR for everything to keep it fresh.",
    good: "ISR with on-demand revalidation. At build time, use generateStaticParams to pre-render the top 1,000 most-trafficked articles — fastest CDN delivery for high-traffic pages. All other articles generate on first request via ISR and are cached globally. CMS publishes trigger webhooks calling revalidateTag() for targeted invalidation. Homepage uses ISR with a 5-minute window or webhook. Live ticker section is SSR. Search is either SSR or CSR depending on personalization needs. Edge Middleware handles A/B testing and geo-routing for localization.",
  },
];

const dailyHabits = [
  { habit: "Read one Vercel blog post", link: "vercel.com/blog", time: "15 min" },
  { habit: "Read one Next.js doc page", link: "nextjs.org/docs", time: "15 min" },
  { habit: "Build or code something", link: "Your practice projects", time: "60 min" },
  { habit: "Practice one interview question aloud", link: "Use a mirror or record yourself", time: "10 min" },
  { habit: "Review your study journal notes", link: "Your notes from the week", time: "10 min" },
];

export default function ZeroToHeroPage() {
  return (
    <main className="py-5">
      <div className="container" style={{ maxWidth: "1100px" }}>
        <Link href="/blog" style={{ color: "#667eea", textDecoration: "none", fontSize: "0.9rem" }}>
          ← Back to Blog
        </Link>

        <div className="text-center mt-3 mb-5">
          <span style={{
            background: "rgba(102,126,234,0.15)",
            color: "#818cf8",
            padding: "0.3rem 0.75rem",
            borderRadius: "20px",
            fontSize: "0.85rem",
            fontWeight: 600,
          }}>
            8-Week Program
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
            Zero to Hero: Vercel SE Interview
          </h1>
          <p style={{ color: "#94a3b8", maxWidth: "700px", margin: "0 auto", lineHeight: 1.7 }}>
            A structured 8-week program to go from no Vercel knowledge to interview-ready Solutions Engineer.
            Each phase builds on the last. Every day has specific tasks. Every week has a hands-on project.
          </p>
        </div>

        {/* Daily Habits */}
        <div className="mb-5" style={{
          background: "rgba(102,126,234,0.08)",
          border: "1px solid rgba(102,126,234,0.2)",
          borderRadius: "16px",
          padding: "1.5rem",
        }}>
          <h3 style={{ color: "#818cf8", fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>
            📅 Daily Habits (do these EVERY day throughout the 8 weeks)
          </h3>
          <div className="row g-3">
            {dailyHabits.map((h, i) => (
              <div key={i} className="col-md-4 col-lg">
                <div style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "10px",
                  padding: "0.75rem",
                  textAlign: "center",
                }}>
                  <div style={{ color: "#e2e8f0", fontSize: "0.85rem", fontWeight: 600 }}>{h.habit}</div>
                  <div style={{ color: "#64748b", fontSize: "0.75rem", marginTop: "0.25rem" }}>{h.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Phase-by-phase breakdown */}
        {phases.map((phase, pi) => (
          <div key={pi} className="mb-5">
            <div style={{
              borderLeft: `4px solid ${phase.color}`,
              paddingLeft: "1.25rem",
              marginBottom: "1.5rem",
            }}>
              <div className="d-flex align-items-center gap-2 mb-1">
                <span style={{ fontSize: "1.5rem" }}>{phase.icon}</span>
                <span style={{
                  background: `${phase.color}22`,
                  color: phase.color,
                  padding: "0.15rem 0.6rem",
                  borderRadius: "10px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                }}>
                  {phase.phase}
                </span>
              </div>
              <h2 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.25rem" }}>
                {phase.title}
              </h2>
              <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginBottom: 0 }}>{phase.subtitle}</p>
            </div>

            {phase.days.map((day, di) => (
              <div key={di} className="feature-card mb-3" style={{ padding: "1.25rem" }}>
                <h4 style={{ color: phase.color, fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.75rem" }}>
                  {day.day}
                </h4>
                <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
                  {day.tasks.map((task, ti) => (
                    <li key={ti} style={{
                      color: task.startsWith("  ") ? "#64748b" : "#cbd5e1",
                      fontSize: "0.88rem",
                      lineHeight: 1.7,
                      marginBottom: "0.35rem",
                      listStyleType: task.startsWith("  ") ? "circle" : "disc",
                      marginLeft: task.startsWith("  ") ? "1rem" : 0,
                    }}>
                      {task.trim()}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div style={{
              background: `${phase.color}11`,
              border: `1px solid ${phase.color}33`,
              borderRadius: "12px",
              padding: "1rem 1.25rem",
            }}>
              <strong style={{ color: phase.color, fontSize: "0.85rem" }}>✅ Checkpoint:</strong>
              <span style={{ color: "#94a3b8", fontSize: "0.85rem", marginLeft: "0.5rem" }}>{phase.checkpoint}</span>
            </div>
          </div>
        ))}

        {/* Weekly Projects */}
        <div className="mb-5">
          <h2 style={{ color: "#fff", fontSize: "1.6rem", fontWeight: 800, marginBottom: "1.25rem" }}>
            🛠️ Weekly Hands-On Projects
          </h2>
          <div className="table-responsive">
            <table className="table table-dark table-hover" style={{ borderRadius: "12px", overflow: "hidden" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.1)" }}>
                  <th style={{ background: "rgba(102,126,234,0.15)", color: "#818cf8", fontWeight: 700, padding: "0.75rem 1rem" }}>Week</th>
                  <th style={{ background: "rgba(102,126,234,0.15)", color: "#818cf8", fontWeight: 700, padding: "0.75rem 1rem" }}>Build This</th>
                  <th style={{ background: "rgba(102,126,234,0.15)", color: "#818cf8", fontWeight: 700, padding: "0.75rem 1rem" }}>Skills Practiced</th>
                </tr>
              </thead>
              <tbody>
                {weeklyProjects.map((p, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <td style={{ color: "#667eea", fontWeight: 600, padding: "0.75rem 1rem", whiteSpace: "nowrap" }}>{p.week}</td>
                    <td style={{ color: "#e2e8f0", padding: "0.75rem 1rem", fontSize: "0.9rem" }}>{p.project}</td>
                    <td style={{ color: "#94a3b8", padding: "0.75rem 1rem", fontSize: "0.85rem" }}>{p.skills}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Interview Answer Templates */}
        <div className="mb-5">
          <h2 style={{ color: "#fff", fontSize: "1.6rem", fontWeight: 800, marginBottom: "1.25rem" }}>
            🗣️ Interview Answer Templates: Bad vs Good
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
            The difference between a &quot;meh&quot; answer and an SE-quality answer. Practice the good versions aloud.
          </p>
          {interviewAnswers.map((qa, i) => (
            <div key={i} className="feature-card mb-4" style={{ padding: "1.5rem" }}>
              <h4 style={{ color: "#e2e8f0", fontSize: "1rem", fontWeight: 700, marginBottom: "1rem" }}>
                Q: &quot;{qa.question}&quot;
              </h4>
              <div className="mb-3" style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.2)",
                borderRadius: "10px",
                padding: "0.75rem 1rem",
              }}>
                <div style={{ color: "#f87171", fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.25rem" }}>❌ Bad Answer</div>
                <div style={{ color: "#94a3b8", fontSize: "0.88rem", lineHeight: 1.6 }}>{qa.bad}</div>
              </div>
              <div style={{
                background: "rgba(16,185,129,0.08)",
                border: "1px solid rgba(16,185,129,0.2)",
                borderRadius: "10px",
                padding: "0.75rem 1rem",
              }}>
                <div style={{ color: "#10b981", fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.25rem" }}>✅ SE-Quality Answer</div>
                <div style={{ color: "#cbd5e1", fontSize: "0.88rem", lineHeight: 1.7 }}>{qa.good}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Study Resources */}
        <div className="mb-5">
          <h2 style={{ color: "#fff", fontSize: "1.6rem", fontWeight: 800, marginBottom: "1.25rem" }}>
            📚 Essential Resources
          </h2>
          <div className="row g-3">
            {[
              { title: "Vercel Docs", url: "https://vercel.com/docs", desc: "Primary reference — read cover to cover" },
              { title: "Next.js Docs", url: "https://nextjs.org/docs", desc: "App Router, rendering, data fetching" },
              { title: "Next.js Learn", url: "https://nextjs.org/learn", desc: "Interactive course — complete in Week 1" },
              { title: "Vercel Blog", url: "https://vercel.com/blog", desc: "Engineering deep-dives and announcements" },
              { title: "AI SDK Docs", url: "https://sdk.vercel.ai", desc: "Build AI apps — essential for the AI layer" },
              { title: "Vercel Ship 2025", url: "https://vercel.com/ship", desc: "Product announcements and keynotes" },
              { title: "v0.dev", url: "https://v0.dev", desc: "Try the AI app builder — know the product" },
              { title: "Vercel Customers", url: "https://vercel.com/customers", desc: "Case studies to reference in conversations" },
            ].map((r, i) => (
              <div key={i} className="col-md-6 col-lg-3">
                <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                  <div className="feature-card h-100" style={{ padding: "1rem" }}>
                    <div style={{ color: "#e2e8f0", fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.25rem" }}>{r.title}</div>
                    <div style={{ color: "#64748b", fontSize: "0.78rem", lineHeight: 1.5 }}>{r.desc}</div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Final Checklist */}
        <div className="mb-5" style={{
          background: "rgba(16,185,129,0.08)",
          border: "1px solid rgba(16,185,129,0.2)",
          borderRadius: "16px",
          padding: "2rem",
        }}>
          <h2 style={{ color: "#10b981", fontSize: "1.4rem", fontWeight: 800, marginBottom: "1.25rem" }}>
            ✅ Interview-Day Readiness Checklist
          </h2>
          <div className="row">
            <div className="col-md-6">
              <ul style={{ paddingLeft: "1.25rem", margin: 0 }}>
                {[
                  "Can explain the 4-layer platform model",
                  "Can draw Edge vs Serverless vs Fluid comparison",
                  "Can recommend rendering strategy for any scenario",
                  "Can diagram the 4 cache layers from memory",
                  "Can set up ISR + webhook + revalidateTag flow",
                  "Can diagnose LCP, CLS, and INP problems",
                  "Can build and demo an AI streaming app",
                  "Can discuss pricing and enterprise features",
                ].map((item, i) => (
                  <li key={i} style={{ color: "#cbd5e1", fontSize: "0.9rem", lineHeight: 2 }}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="col-md-6">
              <ul style={{ paddingLeft: "1.25rem", margin: 0 }}>
                {[
                  "Can run a technical discovery conversation",
                  "Can handle 'Why not just stay on AWS?' objection",
                  "Can design architecture for e-commerce/media/SaaS/AI",
                  "Can explain 4 migration patterns",
                  "Can list and fix 8 codebase red flags",
                  "Can present a 10-min live demo smoothly",
                  "Built 8 hands-on projects on Vercel",
                  "Completed all 140 quiz questions with 80%+ scores",
                ].map((item, i) => (
                  <li key={i} style={{ color: "#cbd5e1", fontSize: "0.9rem", lineHeight: 2 }}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link href="/quiz" className="btn-glow">
              Take the Quiz (140 Questions) →
            </Link>
            <Link href="/blog/interview-guide" className="btn-glow" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
              Interview Guide →
            </Link>
            <Link href="/se" className="btn-glow" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
              SE Resources →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
