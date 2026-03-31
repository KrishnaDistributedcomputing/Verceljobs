"use client";

import Link from "next/link";
import { useState } from "react";
import MermaidDiagram from "../../components/MermaidDiagram";

interface InterviewQ {
  question: string;
  answer: string;
}

interface UseCase {
  id: number;
  title: string;
  icon: string;
  industry: string;
  color: string;
  overview: string;
  customerExamples: string[];
  problemStatement: string;
  mermaidChart: string;
  architecture: {
    layers: { name: string; detail: string; tech: string }[];
    diagram: string;
  };
  renderingStrategy: { route: string; strategy: string; why: string }[];
  vercelFeatures: { feature: string; usage: string }[];
  cachingPattern: string;
  costConsiderations: string[];
  interviewQuestions: InterviewQ[];
}

const useCases: UseCase[] = [
  {
    id: 1,
    title: "Headless E-Commerce Platform",
    icon: "🛒",
    industry: "Retail & Commerce",
    color: "#667eea",
    overview: "A global e-commerce storefront with 100K+ product pages, real-time inventory, personalized recommendations, and sub-2s page loads. The commerce backend (Shopify, Commercetools, or BigCommerce) handles inventory, cart, and checkout via APIs. Next.js on Vercel is the presentation layer — fast, globally distributed, SEO-optimized.",
    customerExamples: ["Supreme", "Under Armour", "eBay", "Ramp"],
    problemStatement: "Full-stack monolithic commerce platforms (Magento, Salesforce Commerce Cloud) have slow page loads (4-8s LCP), poor mobile performance, and require full rebuilds for content changes. They can't scale globally without expensive CDN overlays.",
    mermaidChart: `graph TB
    subgraph Edge["Edge Middleware"]
        MW["Auth / Geo-routing / A-B Testing"]
    end
    subgraph Nextjs["Next.js on Vercel"]
        HOME["/ Homepage\nISR"]
        PRODUCT["/product/slug\nISR + Webhook"]
        CART["/cart\nCSR"]
        CHECKOUT["/checkout\nSSR auth"]
    end
    subgraph APIs["Backend Services"]
        SHOP["Shopify"]
        ALG["Algolia"]
        SAN["Sanity CMS"]
        STR["Stripe"]
    end
    MW --> Nextjs
    HOME --> SAN
    PRODUCT --> SHOP
    PRODUCT --> ALG
    CHECKOUT --> STR`,
    architecture: {
      layers: [
        { name: "Presentation", detail: "Next.js on Vercel — ISR product pages, SSR checkout, CSR cart", tech: "Next.js App Router, React Server Components" },
        { name: "Commerce API", detail: "Shopify Storefront API or Commercetools GraphQL", tech: "Shopify, Commercetools, BigCommerce" },
        { name: "Search", detail: "Algolia or Elastic for faceted search and autocomplete", tech: "Algolia, Elasticsearch" },
        { name: "CMS", detail: "Sanity or Contentful for editorial content (banners, landing pages)", tech: "Sanity, Contentful, Storyblok" },
        { name: "Payments", detail: "Stripe or Braintree for checkout processing", tech: "Stripe, Adyen" },
        { name: "Edge", detail: "Middleware for geo-pricing, A/B tests, and locale routing", tech: "Vercel Edge Middleware" },
      ],
      diagram: `┌─────────────────────────────────────────────────────────────┐
│  Edge Middleware (auth, geo-routing, A/B testing)          │
├─────────────────────────────────────────────────────────────┤
│  Next.js on Vercel                                         │
│  ┌───────────┐ ┌──────────┐ ┌─────────┐ ┌──────────────┐  │
│  │ / (ISR)   │ │ /product │ │ /cart   │ │ /checkout    │  │
│  │ Homepage  │ │ ISR+hook │ │ CSR    │ │ SSR (auth)   │  │
│  └───────────┘ └──────────┘ └─────────┘ └──────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  APIs: Shopify │ Algolia │ Sanity │ Stripe │ Analytics     │
└─────────────────────────────────────────────────────────────┘`,
    },
    renderingStrategy: [
      { route: "/ (Homepage)", strategy: "ISR (5min or webhook)", why: "Marketing content updates periodically. Webhook on CMS publish for instant freshness." },
      { route: "/products/[slug]", strategy: "ISR (1hr + webhook)", why: "100K+ pages — build top 1K at build time via generateStaticParams, rest generate on-demand. Webhook on product update." },
      { route: "/collections/[slug]", strategy: "ISR (15min)", why: "Collection pages change less frequently. Short revalidation window keeps them fresh." },
      { route: "/cart", strategy: "CSR (Client-Side)", why: "Cart is user-specific, sensitive data. No server rendering needed — client state only." },
      { route: "/checkout", strategy: "SSR (force-dynamic)", why: "Must be auth-gated, fresh inventory check, payment session creation. Every request needs fresh data." },
      { route: "/account/*", strategy: "SSR (auth required)", why: "User-specific order history, saved addresses. Can't be cached or shared." },
    ],
    vercelFeatures: [
      { feature: "ISR + Webhooks", usage: "Product pages regenerate when Shopify publishes. No full rebuild for 100K pages." },
      { feature: "Edge Middleware", usage: "Geo-based pricing (show USD in US, EUR in EU), A/B test checkout flows, locale routing." },
      { feature: "next/image", usage: "Product images auto-converted to WebP/AVIF, responsive sizes per device, lazy loaded." },
      { feature: "Streaming + Suspense", usage: "Product details load instantly (ISR), live inventory streams in via Suspense boundary." },
      { feature: "Skew Protection", usage: "During deploys, users with old JS get routed to matching deployment — no broken checkouts." },
      { feature: "Edge Config", usage: "Feature flags for new checkout flow, sale banners, maintenance mode — near-zero latency reads." },
    ],
    cachingPattern: "Tag-based: fetch() with { next: { tags: ['product-shoe-123'] } }. Shopify webhook calls revalidateTag('product-shoe-123') on product update. Collection pages tagged with 'collection-summer'. Homepage tagged with 'homepage'. Cart/checkout use cache: 'no-store'.",
    costConsiderations: [
      "ISR revalidation frequency: 100K products × short revalidation windows = many function invocations. Use webhooks instead of time-based.",
      "Product images: use next/image to auto-optimize. Large raw images through CDN increase Fast Data Transfer costs.",
      "Checkout SSR: every checkout page view invokes a function. Monitor active CPU for payment processing logic.",
      "Edge Requests: high-traffic flash sales can spike edge request counts. The $2/million overage adds up.",
      "Consider Fluid Compute for AI-powered recommendation endpoints — only pay for CPU during recommendation model inference.",
    ],
    interviewQuestions: [
      { question: "How would you architect a headless e-commerce site serving 50 countries with Vercel?", answer: "ISR for product and collection pages with webhook revalidation from the commerce platform. SSR only for checkout and account (auth-gated). Edge Middleware for geo-routing (locale), geo-pricing (currency), and A/B testing. CMS webhooks for targeted revalidation via revalidateTag(). next/image for product images. Streaming SSR with Suspense for pages that mix static product data with live inventory." },
      { question: "The product team wants prices to update instantly when the merchandising team changes them. How?", answer: "On-demand revalidation via webhooks. When Shopify fires a product.update webhook, call your /api/revalidate route which runs revalidateTag('product-{id}'). Only the affected product page regenerates — not all 100K. For the collection pages, tag them with 'collection-{slug}' and revalidate those too. Price is fresh within seconds of change." },
      { question: "A flash sale drives 10x normal traffic. How does the architecture handle it?", answer: "ISR pages serve from CDN cache — 10x traffic means 10x cache hits, not 10x function invocations. Only cache misses hit origin. Vercel's request collapsing prevents cache stampedes when ISR pages expire. Edge Middleware runs at CDN PoPs, scales automatically. The only concern is SSR checkout — but Fluid Compute handles concurrency spikes via shared instances." },
    ],
  },
  {
    id: 2,
    title: "Media & Publishing Platform",
    icon: "📰",
    industry: "Media & Entertainment",
    color: "#8b5cf6",
    overview: "A news/media platform with 1M+ articles, real-time breaking news, editorial CMS workflows, and ad-supported monetization. Content editors publish via headless CMS (Sanity, Contentful). Readers get fast, SEO-optimized pages with the latest content — globally.",
    customerExamples: ["The Washington Post", "Condé Nast", "Bloomberg"],
    problemStatement: "Legacy CMS platforms (WordPress, Drupal) struggle with traffic spikes during breaking news. Full-page rebuilds take hours for large sites. Poor Core Web Vitals hurt SEO rankings and ad revenue. No preview capability for editors.",
    mermaidChart: `graph TB
    subgraph Edge["Edge Middleware"]
        MW["Auth / Geo-routing / A-B Testing"]
    end
    subgraph Nextjs["Next.js on Vercel"]
        HOME["/ Homepage\nISR"]
        PRODUCT["/product/slug\nISR + Webhook"]
        CART["/cart\nCSR"]
        CHECKOUT["/checkout\nSSR auth"]
    end
    subgraph APIs["Backend Services"]
        SHOP["Shopify"]
        ALG["Algolia"]
        SAN["Sanity CMS"]
        STR["Stripe"]
    end
    MW --> Nextjs
    HOME --> SAN
    PRODUCT --> SHOP
    PRODUCT --> ALG
    CHECKOUT --> STR`,
    architecture: {
      layers: [
        { name: "Presentation", detail: "Next.js on Vercel — ISR articles, SSR live feeds, SSG evergreen content", tech: "Next.js, React Server Components" },
        { name: "CMS", detail: "Sanity or Contentful for editorial workflow, draft preview, scheduled publishing", tech: "Sanity Studio, Contentful" },
        { name: "Ad Platform", detail: "Google Ad Manager, Prebid for programmatic advertising", tech: "GAM, Prebid.js" },
        { name: "Analytics", detail: "Real-time analytics for editorial decisions and ad performance", tech: "Segment, Mixpanel, GA4" },
        { name: "Search", detail: "Algolia for article search and content discovery", tech: "Algolia" },
        { name: "CDN/Media", detail: "Cloudinary or Mux for image/video optimization", tech: "Cloudinary, Mux, Vercel Image Optimization" },
      ],
      diagram: `┌─────────────────────────────────────────────────────────────┐
│  Edge Middleware (geo-routing, paywall check, A/B tests)   │
├─────────────────────────────────────────────────────────────┤
│  Next.js on Vercel                                         │
│  ┌───────────┐ ┌──────────────┐ ┌─────────┐ ┌──────────┐  │
│  │ / (ISR)   │ │ /article/    │ │ /live   │ │ /search  │  │
│  │ Homepage  │ │ [slug] ISR   │ │ SSR     │ │ SSR/CSR  │  │
│  └───────────┘ └──────────────┘ └─────────┘ └──────────┘  │
├─────────────────────────────────────────────────────────────┤
│  CMS Webhook → revalidateTag('article-{slug}')             │
├─────────────────────────────────────────────────────────────┤
│  APIs: Sanity │ Algolia │ Ad Manager │ Analytics            │
└─────────────────────────────────────────────────────────────┘`,
    },
    renderingStrategy: [
      { route: "/ (Homepage)", strategy: "ISR (5min or webhook)", why: "Breaking news needs to appear fast. Webhook on publish for instant update. 5min fallback." },
      { route: "/article/[slug]", strategy: "ISR (webhook)", why: "1M+ articles. Top 1K pre-built via generateStaticParams. Rest generate on-demand. CMS webhook revalidates on edit." },
      { route: "/category/[slug]", strategy: "ISR (15min)", why: "Category listings update as new articles publish. Moderate freshness needed." },
      { route: "/live", strategy: "SSR (no-cache)", why: "Real-time breaking news ticker and live updates. Must be fresh every request." },
      { route: "/search", strategy: "SSR or CSR", why: "User-specific search queries can't be cached. CSR for instant client-side filtering." },
    ],
    vercelFeatures: [
      { feature: "ISR + CMS Webhooks", usage: "Editor publishes article → Sanity webhook → revalidateTag('article-{slug}') → page refreshes globally in seconds." },
      { feature: "Draft Mode", usage: "Editors preview unpublished content by bypassing ISR cache. Essential for editorial workflows." },
      { feature: "Preview Deployments", usage: "Editorial team reviews new features/designs on Preview URLs before going to production." },
      { feature: "next/image + Cloudinary", usage: "Article images optimized automatically. Hero images get priority prop for fast LCP." },
      { feature: "Edge Middleware", usage: "Paywall enforcement, geo-based content restrictions, A/B testing article layouts." },
      { feature: "Speed Insights", usage: "Track real-user Core Web Vitals. Critical for SEO rankings and ad viewability." },
    ],
    cachingPattern: "Tag hierarchy: articles tagged with ['articles', 'article-{slug}', 'category-{cat}']. Publishing an article revalidates that article + its category page + homepage. Breaking news revalidates homepage immediately. Evergreen content uses long revalidation windows.",
    costConsiderations: [
      "1M+ articles: don't pre-build all at build time. Use generateStaticParams for top 1K, ISR on-demand for the rest.",
      "Breaking news traffic spikes: ISR + CDN cache absorbs the load. Only initial request invokes a function.",
      "Ad scripts: third-party ad scripts can kill INP. Use next/script with strategy='lazyOnload' to defer them.",
      "Image-heavy articles: offload to Cloudinary/Mux. Vercel next/image handles optimization but large video assets should use dedicated media CDN.",
      "Paywall middleware: runs on every request. Keep it lightweight — just check a cookie, don't query a database.",
    ],
    interviewQuestions: [
      { question: "How would you architect a media site with 1M articles on Vercel?", answer: "ISR with on-demand revalidation. generateStaticParams pre-builds top 1,000 most-trafficked articles at build time. Remaining articles generate on first request via ISR and are CDN-cached globally. CMS webhooks call revalidateTag() for targeted invalidation. Homepage uses ISR with webhook. Live feed is SSR. Use a tag hierarchy: ['articles', 'article-{slug}', 'category-{cat}'] so you can invalidate at any granularity." },
      { question: "Breaking news just dropped — how fast does the site update?", answer: "With CMS webhooks: editor publishes → CMS fires webhook → API route calls revalidateTag('homepage') + revalidateTag('article-{slug}') → pages regenerate in seconds. The next user hitting those pages gets fresh content from CDN. For truly real-time (/live page), use SSR with cache: 'no-store' or WebSocket-based client updates." },
      { question: "Third-party ad scripts are destroying the site's INP score. What do you recommend?", answer: "Load ad scripts with next/script strategy='lazyOnload' — defers until after hydration. Move ad containers below-the-fold when possible. Use Suspense boundaries to prevent ads from blocking the main content render. Consider using Partial Prerendering (PPR) — static article shell serves instantly, ad slots stream in after. Track INP via Speed Insights to verify improvement." },
    ],
  },
  {
    id: 3,
    title: "SaaS Application Dashboard",
    icon: "📊",
    industry: "Software & Technology",
    color: "#06b6d4",
    overview: "A B2B SaaS platform with a public marketing site, blog, documentation, and an authenticated multi-tenant dashboard. The marketing pages need SEO and speed; the app needs real-time data and user-specific views.",
    customerExamples: ["Zapier", "HashiCorp", "Vercel itself"],
    problemStatement: "SaaS companies often maintain separate codebases for marketing site and application. This doubles infrastructure costs, creates inconsistent UX, and makes shared components impossible. SPAs (Create React App) have poor SEO and slow initial loads.",
    mermaidChart: `graph TB
    subgraph Edge["Edge Middleware"]
        MW["Geo-routing / Paywall / A-B Tests"]
    end
    subgraph Nextjs["Next.js on Vercel"]
        HOME["/ Homepage\nISR 5min"]
        ARTICLE["/article/slug\nISR + Webhook"]
        LIVE["/live\nSSR realtime"]
        SEARCH["/search\nSSR/CSR"]
    end
    subgraph APIs["Backend Services"]
        CMS["Sanity CMS"]
        ADS["Ad Manager"]
        ALG["Algolia"]
        ANALYTICS["Segment"]
    end
    MW --> Nextjs
    CMS -->|webhook| ARTICLE
    HOME --> CMS
    SEARCH --> ALG
    LIVE --> ANALYTICS`,
    architecture: {
      layers: [
        { name: "Public Site", detail: "SSG marketing pages, ISR blog, SSG documentation", tech: "Next.js SSG, MDX" },
        { name: "Auth Layer", detail: "Clerk or Auth0 for authentication, RBAC for multi-tenant access", tech: "Clerk, Auth0, NextAuth" },
        { name: "App Dashboard", detail: "SSR/RSC for authenticated views, real-time data from Postgres", tech: "React Server Components, Vercel Postgres" },
        { name: "API Layer", detail: "Next.js Route Handlers for REST/GraphQL endpoints", tech: "Next.js API Routes, tRPC" },
        { name: "Database", detail: "Vercel Postgres (Neon) or PlanetScale for multi-tenant data", tech: "Vercel Postgres, PlanetScale, Supabase" },
        { name: "Background Jobs", detail: "Inngest or Trigger.dev for async tasks (email, reports)", tech: "Inngest, Trigger.dev" },
      ],
      diagram: `┌─────────────────────────────────────────────────────────────┐
│  Edge Middleware (auth check → /login or /app)              │
├──────────────────────┬──────────────────────────────────────┤
│  Public (no auth)    │  App (authenticated)                 │
│  ┌────────┐ ┌─────┐ │ ┌───────────┐ ┌───────────────────┐ │
│  │ / SSG  │ │/blog│ │ │ /app/dash │ │ /app/settings     │ │
│  │        │ │ ISR │ │ │ SSR/RSC   │ │ SSR/RSC           │ │
│  └────────┘ └─────┘ │ └───────────┘ └───────────────────┘ │
├──────────────────────┴──────────────────────────────────────┤
│  Clerk Auth │ Vercel Postgres │ Inngest │ Stripe            │
└─────────────────────────────────────────────────────────────┘`,
    },
    renderingStrategy: [
      { route: "/ (Marketing)", strategy: "SSG", why: "Static marketing page. Maximum CDN performance. Changes only on deploy." },
      { route: "/blog/*", strategy: "ISR (webhook)", why: "Blog content updates via CMS. Webhook revalidation for instant publish." },
      { route: "/docs/*", strategy: "SSG (MDX)", why: "Documentation built from MDX files at build time. Changes on merge to main." },
      { route: "/login", strategy: "SSG", why: "Just a form — no dynamic data needed." },
      { route: "/app/dashboard", strategy: "SSR/RSC", why: "User-specific metrics, team data, real-time stats. Must be fresh and authenticated." },
      { route: "/app/settings", strategy: "SSR/RSC", why: "User profile, billing, team management. Auth-gated, user-specific." },
      { route: "/api/*", strategy: "Route Handlers", why: "REST/GraphQL endpoints for the dashboard. Serverless functions with Fluid Compute." },
    ],
    vercelFeatures: [
      { feature: "Middleware Auth", usage: "Check session cookie on every /app/* request. Redirect to /login if not authenticated. Runs at edge — near-zero latency." },
      { feature: "React Server Components", usage: "Dashboard data fetched server-side — zero JS shipped for data-display components. Direct database access without API layer." },
      { feature: "Vercel Postgres", usage: "Managed Postgres (Neon serverless) for multi-tenant data. Connection pooling handles concurrent function invocations." },
      { feature: "Preview Deployments", usage: "Product team reviews new features on isolated Preview URLs with separate env vars (test database)." },
      { feature: "Analytics + Speed Insights", usage: "Track conversion funnel performance (marketing → signup → activation) with real-user metrics." },
      { feature: "Cron Jobs (Vercel)", usage: "Scheduled tasks: daily report generation, usage aggregation, billing calculations." },
    ],
    cachingPattern: "Public pages: full static/ISR caching. App routes: cache: 'no-store' for user-specific data. API endpoints: use unstable_cache with user-scoped cache keys for expensive queries (e.g., analytics aggregation). Never cache across tenants — include tenantId in every cache key.",
    costConsiderations: [
      "Dashboard SSR: every page view invokes a function. For data-heavy dashboards, consider client-side polling for updates after initial SSR load.",
      "Database connections: serverless functions open new connections per invocation. Use connection pooling (Neon/PgBouncer) to prevent connection exhaustion.",
      "Multi-tenant isolation: ensure cache keys include tenantId. Without it, Tenant A sees Tenant B's data — a security and compliance disaster.",
      "Background jobs: use Inngest/Trigger.dev instead of long-running Vercel Functions for email sending, PDF generation, etc.",
      "Free tier abuse: Hobby plan prohibits commercial use. SaaS products need at least Pro plan from day one.",
    ],
    interviewQuestions: [
      { question: "How do you handle multi-tenant data isolation on Vercel?", answer: "Three layers: 1) Middleware validates the auth token and extracts tenantId on every /app/* request. 2) All database queries include WHERE tenant_id = $1 — never rely on client-side filtering. 3) All cache keys include the tenantId — unstable_cache(['dashboard', tenantId], ...) — to prevent cross-tenant data leaks. For Enterprise customers, consider Row Level Security (RLS) in Postgres as an additional safeguard." },
      { question: "A SaaS customer's dashboard is slow. What do you investigate?", answer: "Check rendering strategy — is the dashboard SSR or CSR? If SSR: profile the Vercel Function execution time, look for waterfall database queries (N+1 problem), check if they can parallelize with Promise.all(). If CSR: check JS bundle size, look for unnecessary 'use client' components. For both: implement React Suspense to stream slow components separately, use unstable_cache for expensive analytics aggregations with a short TTL." },
      { question: "How would you structure a monorepo with marketing site + SaaS app on Vercel?", answer: "Single Next.js app with route groups: (marketing) for public pages and (app) for authenticated routes. Middleware handles auth boundary. Alternatively, use a Turborepo monorepo with separate apps/marketing and apps/dashboard sharing packages/ui. Vercel handles monorepo builds natively — it detects which app changed and only rebuilds that one. Shared components in a packages/ui workspace." },
    ],
  },
  {
    id: 4,
    title: "AI-Powered Application",
    icon: "🤖",
    industry: "Artificial Intelligence",
    color: "#f59e0b",
    overview: "An AI application with conversational chat, document analysis, code generation, or multi-agent workflows. Leverages Vercel's AI Cloud layer (AI SDK, Gateway, Sandbox) with Fluid Compute for cost-efficient streaming.",
    customerExamples: ["OpenAI (ChatGPT)", "Anthropic", "Perplexity"],
    problemStatement: "AI applications on traditional serverless are prohibitively expensive — a 30-second streaming response costs 30 seconds of compute billing. Cold starts disrupt real-time chat UX. Switching LLM providers requires code rewrites. Multi-step agents time out on serverless functions.",
    mermaidChart: `graph TB
    subgraph Edge["Edge Middleware"]
        MW["Geo-routing / Paywall / A-B Tests"]
    end
    subgraph Nextjs["Next.js on Vercel"]
        HOME["/ Homepage\nISR 5min"]
        ARTICLE["/article/slug\nISR + Webhook"]
        LIVE["/live\nSSR realtime"]
        SEARCH["/search\nSSR/CSR"]
    end
    subgraph APIs["Backend Services"]
        CMS["Sanity CMS"]
        ADS["Ad Manager"]
        ALG["Algolia"]
        ANALYTICS["Segment"]
    end
    MW --> Nextjs
    CMS -->|webhook| ARTICLE
    HOME --> CMS
    SEARCH --> ALG
    LIVE --> ANALYTICS`,
    architecture: {
      layers: [
        { name: "Chat UI", detail: "Next.js with useChat() hook for streaming UI, message history, input handling", tech: "AI SDK, useChat(), React" },
        { name: "Streaming API", detail: "Vercel Functions with streamText() — Fluid Compute for cost efficiency", tech: "AI SDK, streamText(), Fluid Compute" },
        { name: "AI Gateway", detail: "Route to 100+ models with failover, rate limiting, cost tracking", tech: "Vercel AI Gateway" },
        { name: "Agent Layer", detail: "Durable workflows for multi-step agents that survive timeouts", tech: "use-workflow, AI SDK 6 agents" },
        { name: "Vector DB", detail: "Semantic search over documents/knowledge base", tech: "Pinecone, Qdrant, Weaviate" },
        { name: "Sandbox", detail: "Isolated compute for code execution by AI agents", tech: "Vercel Sandbox" },
      ],
      diagram: `┌─────────────────────────────────────────────────────────────┐
│  Next.js Frontend (useChat, message rendering, streaming)  │
├─────────────────────────────────────────────────────────────┤
│  Vercel Functions (Fluid Compute — Active CPU billing)      │
│  ┌──────────────┐ ┌───────────┐ ┌──────────────────────┐   │
│  │ /api/chat    │ │ /api/     │ │ /api/agent           │   │
│  │ streamText   │ │ search    │ │ use-workflow (durable)│   │
│  └──────────────┘ └───────────┘ └──────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  AI Gateway │ Pinecone │ Sandbox │ Auth                     │
│  (OpenAI, Anthropic, Google — failover + BYOK)              │
└─────────────────────────────────────────────────────────────┘`,
    },
    renderingStrategy: [
      { route: "/chat", strategy: "RSC + useChat (Client)", why: "Server Component shell renders instantly. useChat() Client Component handles real-time streaming interaction." },
      { route: "/api/chat", strategy: "Serverless (Fluid)", why: "streamText() streams LLM tokens. Fluid Compute bills only for active CPU — 80-90% cost reduction." },
      { route: "/api/search", strategy: "Edge Function", why: "Vector similarity search needs low latency globally. Edge execution puts search close to users." },
      { route: "/api/agent", strategy: "Serverless (Fluid) + Workflow", why: "use-workflow provides durable steps — multi-step agents survive function timeouts." },
      { route: "/history", strategy: "SSR (auth)", why: "User's chat history — authenticated, user-specific data." },
    ],
    vercelFeatures: [
      { feature: "Fluid Compute", usage: "30s LLM streaming response with 200ms CPU = billed 200ms, not 30s. 150× cost reduction for AI workloads." },
      { feature: "AI SDK (streamText/useChat)", usage: "Server: streamText() with any provider. Client: useChat() for real-time message rendering. Zero boilerplate." },
      { feature: "AI Gateway", usage: "Route to OpenAI primary, Anthropic fallback. BYOK for enterprise customers. Cost tracking per model." },
      { feature: "use-workflow", usage: "Multi-step research agent: search → analyze → summarize → format. Each step is durable — resumes after timeout." },
      { feature: "Sandbox", usage: "AI agent generates Python code → executes in isolated container → returns result. No security risk to host." },
      { feature: "Edge Functions", usage: "Vector search at edge PoPs for low-latency semantic retrieval across global user base." },
    ],
    cachingPattern: "Chat responses are NOT cached (unique per user/conversation). However: vector embeddings can be cached with unstable_cache for repeated document lookups. System prompts and tool definitions cached at module level. AI Gateway handles model-level caching and rate limiting.",
    costConsiderations: [
      "Fluid Compute is essential: without it, a 30s streaming response costs 30s of compute. With it, you pay ~200ms.",
      "AI Gateway tracks costs per model — monitor which models are most expensive and optimize routing.",
      "Long-running agents: use-workflow prevents timeout-related failures but each step resumes from checkpoint, consuming additional function invocations.",
      "Vector search at edge: fast but Edge Functions have 35ms CPU limit. Pre-compute embeddings, don't generate them at the edge.",
      "Sandbox usage: ephemeral containers have compute costs. Limit execution time and resource allocation for user-generated code.",
    ],
    interviewQuestions: [
      { question: "How does Fluid Compute reduce costs for AI streaming applications?", answer: "Traditional serverless bills for entire request duration including I/O wait. A 30-second LLM streaming response with 200ms of actual CPU work costs 30 seconds of billing. Fluid Compute charges only for active CPU time — that same request costs ~200ms. That's approximately 150× cost reduction. Additionally, shared instances eliminate cold starts for subsequent requests, and bytecode caching removes parse/compile overhead." },
      { question: "A customer wants to switch from OpenAI to Anthropic without downtime. How?", answer: "AI SDK has a unified provider interface: change `openai('gpt-4o')` to `anthropic('claude-3-5-sonnet')` — one line change, zero business logic changes. For zero-downtime migration: use AI Gateway to route 10% of traffic to Anthropic while monitoring quality/latency, then gradually increase to 100%. Gateway handles failover if either provider has an outage." },
      { question: "How would you build a multi-step research agent that can't time out?", answer: "use-workflow with durable steps. Each ctx.run() step persists its result. Step 1: search the web. Step 2: analyze results with LLM. Step 3: generate report. If the function times out after step 2, execution resumes at step 3 — not step 1. For human-in-the-loop: AI SDK 6's tool execution approval pauses for user confirmation before sensitive actions (sending emails, modifying data)." },
    ],
  },
  {
    id: 5,
    title: "Multi-Tenant Marketing Platform",
    icon: "🏢",
    industry: "Marketing & Agencies",
    color: "#10b981",
    overview: "A platform that hosts hundreds or thousands of customer websites (landing pages, microsites, campaign pages) under custom domains. Each tenant gets their own branded site with shared infrastructure. Think Wix, Webflow, or agency white-label platforms.",
    customerExamples: ["Webflow-style platforms", "Agency white-label solutions", "Campaign hosting platforms"],
    problemStatement: "Agencies managing 100+ client sites need individual hosting for each, multiplying infrastructure costs. Custom domains require manual DNS management. Shared templates need per-tenant customization without code changes.",
    mermaidChart: `graph TB
    subgraph Edge["Edge Middleware"]
        MW["Auth Check"]
    end
    subgraph Public["Public - No Auth"]
        SSG["/ Marketing\nSSG"]
        BLOG["/blog\nISR"]
        DOCS["/docs\nSSG MDX"]
    end
    subgraph App["App - Authenticated"]
        DASH["/app/dashboard\nSSR/RSC"]
        SETTINGS["/app/settings\nSSR/RSC"]
        API["/api/*\nRoute Handlers"]
    end
    subgraph Services["Services"]
        AUTH["Clerk Auth"]
        DB["Vercel Postgres"]
        INN["Inngest"]
        STRIPE["Stripe"]
    end
    MW --> Public
    MW --> App
    DASH --> DB
    API --> DB
    App --> AUTH`,
    architecture: {
      layers: [
        { name: "Routing", detail: "Middleware matches custom domain → tenant config, rewrites to tenant-specific routes", tech: "Edge Middleware, wildcard domains" },
        { name: "Presentation", detail: "Dynamic page rendering based on tenant config/theme stored in database", tech: "Next.js, dynamic rendering" },
        { name: "Tenant Config", detail: "Edge Config or database for per-tenant settings (theme, content, features)", tech: "Vercel Edge Config, Vercel KV" },
        { name: "CMS", detail: "Shared headless CMS with tenant-scoped content", tech: "Sanity, Contentful, Strapi" },
        { name: "Analytics", detail: "Per-tenant analytics and performance tracking", tech: "Vercel Analytics, Segment" },
        { name: "Domain Management", detail: "Programmatic custom domain assignment via Vercel API", tech: "Vercel Domains API" },
      ],
      diagram: `┌─────────────────────────────────────────────────────────────┐
│  Custom Domain → Edge Middleware (tenant identification)    │
│  client-a.com → tenantId: 'a'                              │
│  client-b.com → tenantId: 'b'                              │
├─────────────────────────────────────────────────────────────┤
│  Next.js on Vercel (single deployment, multi-tenant)        │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Dynamic rendering based on tenant config:              │ │
│  │ theme, content, features, branding                     │ │
│  └────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  Edge Config (tenant themes) │ KV (sessions) │ CMS         │
└─────────────────────────────────────────────────────────────┘`,
    },
    renderingStrategy: [
      { route: "/ (tenant homepage)", strategy: "ISR (per-tenant)", why: "Each tenant's homepage is cached separately (cache key includes host/domain). Webhook revalidation on content change." },
      { route: "/[page]", strategy: "ISR (per-tenant)", why: "Dynamic pages built from CMS content. Tenant-scoped cache keys prevent cross-tenant content." },
      { route: "/admin", strategy: "SSR (auth)", why: "Tenant admin dashboard for managing content, settings, analytics." },
    ],
    vercelFeatures: [
      { feature: "Wildcard Domains", usage: "*.platform.com or custom domains (client-a.com) — all routed to one Vercel project." },
      { feature: "Edge Middleware", usage: "Extract tenant from hostname, load tenant config, set headers/cookies for downstream rendering." },
      { feature: "Edge Config", usage: "Store tenant themes (colors, fonts, logos) for near-zero latency reads at the edge." },
      { feature: "Vercel Domains API", usage: "Programmatically add/remove custom domains via API. Self-serve domain assignment for tenants." },
      { feature: "ISR per-tenant", usage: "Each tenant's pages cached independently. Cache key includes hostname for tenant isolation." },
      { feature: "Preview Deployments", usage: "Platform team tests new features across multiple tenant configurations before release." },
    ],
    cachingPattern: "Critical: ISR cache keys MUST include the hostname/tenantId. Without this, client-a.com serves client-b.com's content. Use Middleware to set x-tenant-id header, which Next.js includes in the cache key automatically. Tenant config (themes) cached in Edge Config with near-zero latency.",
    costConsiderations: [
      "One deployment serves all tenants — dramatically cheaper than separate hosting per tenant.",
      "Edge Middleware runs on every request for domain → tenant mapping. Keep it lightweight (< 35ms).",
      "Scale concern: 1,000 tenants × 10 pages each = 10,000 ISR pages. Monitor ISR revalidation costs.",
      "Custom domains: Vercel charges per domain on some plans. Check domain limits on Pro vs Enterprise.",
      "Edge Config has size limits. For many tenants (1000+), consider a database with aggressive caching instead.",
    ],
    interviewQuestions: [
      { question: "How would you build a multi-tenant platform where each customer gets a custom domain?", answer: "Single Next.js deployment on Vercel. Edge Middleware reads the request hostname, maps it to a tenantId (via Edge Config or KV lookup), and stores tenantId in a header or cookie. Downstream pages render based on the tenant's theme and content. Custom domains added programmatically via Vercel's Domains API. ISR cache keys include the hostname — critical to prevent cross-tenant content leaks." },
      { question: "How do you prevent tenant A from seeing tenant B's cached pages?", answer: "The cache key must include the tenant identifier. In Middleware, set a custom header (x-tenant-id) based on the hostname. Next.js automatically includes varying headers in cache keys. Additionally, all database queries must scope by tenantId — never rely on the frontend alone for data isolation. For Enterprise: consider Row Level Security in Postgres." },
      { question: "A customer wants to add their custom domain instantly. How does the flow work?", answer: "Customer enters their domain in the admin dashboard → API call to Vercel's Domains API to add it programmatically → Customer adds CNAME record pointing to cname.vercel-dns.com → Vercel automatically provisions SSL. Edge Middleware already handles the new domain because it reads from the tenant config database. Time to live: minutes, once DNS propagates." },
    ],
  },
  {
    id: 6,
    title: "Developer Documentation Site",
    icon: "📖",
    industry: "Developer Tools",
    color: "#ec4899",
    overview: "A comprehensive developer documentation platform with versioned docs, interactive code examples, API references, search, and community contributions. Built with MDX for developer-friendly authoring and Git-based workflows.",
    customerExamples: ["Vercel Docs", "Next.js Docs", "Stripe Docs"],
    problemStatement: "Traditional documentation tools (GitBook, ReadTheDocs, Docusaurus) have limited customization, poor search, no preview deployments for doc PRs, and slow builds for large doc sets. Versioning across releases is manual and error-prone.",
    mermaidChart: `graph TB
    subgraph Edge["Edge Middleware"]
        MW["Auth Check"]
    end
    subgraph Public["Public - No Auth"]
        SSG["/ Marketing\nSSG"]
        BLOG["/blog\nISR"]
        DOCS["/docs\nSSG MDX"]
    end
    subgraph App["App - Authenticated"]
        DASH["/app/dashboard\nSSR/RSC"]
        SETTINGS["/app/settings\nSSR/RSC"]
        API["/api/*\nRoute Handlers"]
    end
    subgraph Services["Services"]
        AUTH["Clerk Auth"]
        DB["Vercel Postgres"]
        INN["Inngest"]
        STRIPE["Stripe"]
    end
    MW --> Public
    MW --> App
    DASH --> DB
    API --> DB
    App --> AUTH`,
    architecture: {
      layers: [
        { name: "Content", detail: "MDX files in Git — version-controlled documentation with React components in Markdown", tech: "MDX, next-mdx-remote, contentlayer" },
        { name: "Presentation", detail: "Next.js with SSG for all doc pages — fastest possible delivery", tech: "Next.js, SSG, MDX" },
        { name: "Search", detail: "Algolia DocSearch for instant full-text search across all versions", tech: "Algolia DocSearch" },
        { name: "Interactive Examples", detail: "Live code playgrounds embedded in docs", tech: "Sandpack, CodeSandbox embed" },
        { name: "Versioning", detail: "Git branches per version — /v1/docs, /v2/docs", tech: "Git branches, path-based routing" },
        { name: "Feedback", detail: "User ratings and feedback collection per page", tech: "Vercel KV, API routes" },
      ],
      diagram: `┌─────────────────────────────────────────────────────────────┐
│  Vercel CDN (all pages SSG — served from edge globally)     │
├─────────────────────────────────────────────────────────────┤
│  Next.js on Vercel                                          │
│  ┌───────────────┐ ┌────────────┐ ┌──────────────────────┐ │
│  │ /docs/[...    │ │ /api/search│ │ /api/feedback        │ │
│  │ slug] SSG     │ │ Algolia    │ │ KV store + rate limit│ │
│  └───────────────┘ └────────────┘ └──────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  MDX Files (Git) │ Algolia │ Sandpack │ Vercel KV           │
└─────────────────────────────────────────────────────────────┘`,
    },
    renderingStrategy: [
      { route: "/docs/[...slug]", strategy: "SSG", why: "Documentation content changes only on deploy. Full SSG = maximum CDN cache hits, sub-10ms delivery." },
      { route: "/", strategy: "SSG", why: "Landing page is fully static." },
      { route: "/api/search", strategy: "Edge Function", why: "Search needs low latency globally. Proxies to Algolia from the nearest edge PoP." },
      { route: "/api/feedback", strategy: "Serverless Function", why: "Writes to Vercel KV — needs full Node.js runtime for rate limiting and validation." },
    ],
    vercelFeatures: [
      { feature: "SSG for Docs", usage: "All MDX pages pre-rendered at build time. Served from CDN globally in milliseconds." },
      { feature: "Preview Deployments", usage: "Every docs PR gets a live preview. Reviewers can read the actual rendered documentation, not raw Markdown." },
      { feature: "next/font + next/image", usage: "Mono fonts for code blocks (zero CLS). Optimized screenshots and diagrams." },
      { feature: "Edge Functions", usage: "Search proxied through edge for low-latency Algolia queries worldwide." },
      { feature: "Vercel KV", usage: "Store page feedback ratings with rate limiting per IP to prevent spam." },
      { feature: "ISR for API Reference", usage: "Auto-generated API docs from OpenAPI spec. Revalidate when the spec changes." },
    ],
    cachingPattern: "Pure SSG: every page is pre-rendered at build time and cached on CDN indefinitely until the next deployment. No runtime caching concerns. API reference pages (if auto-generated) can use ISR with webhook revalidation when the OpenAPI spec updates.",
    costConsiderations: [
      "SSG is the cheapest rendering strategy: zero function invocations for page views. All CDN edge requests.",
      "Build time scales with page count. 10,000 doc pages may take 5-10 minutes to build. Turbopack helps.",
      "Search proxying at edge: each search query counts as an Edge Request. Monitor volume.",
      "Interactive code examples (Sandpack) increase client-side JS bundle. Code-split with dynamic() imports.",
      "Version branches: each version deploys separately. Consider a monorepo with path-based versioning instead.",
    ],
    interviewQuestions: [
      { question: "Why SSG for documentation instead of ISR or SSR?", answer: "Documentation changes only when developers merge PRs — there's no real-time data requirement. SSG pre-renders everything at build time, giving the fastest possible delivery (served entirely from CDN, zero function invocations). This is the cheapest and most performant option. ISR adds unnecessary complexity for content that only changes on deploy. The only exception: auto-generated API reference pages from a live OpenAPI spec, which benefit from ISR." },
      { question: "How do you handle documentation versioning (v1, v2) on Vercel?", answer: "Two approaches: 1) Path-based versioning in a single deployment — /v1/docs/*, /v2/docs/* with content organized in folders. Each version's MDX files live in /content/v1/, /content/v2/. 2) Branch-based versioning — git branches v1, v2 each deploy independently. Path-based is simpler (one deployment, one build). Branch-based gives complete isolation but doubles build/hosting." },
      { question: "What makes Vercel better than Docusaurus or GitBook for docs?", answer: "Preview Deployments — every docs PR is a live, reviewable site (GitBook can't do this well). Custom React components in MDX (full framework flexibility). SSG performance with global CDN. next/image and next/font for perfect Core Web Vitals. Algolia integration for search. And it's a real Next.js app — you can add dynamic features (feedback, auth-gated enterprise docs) without switching platforms." },
    ],
  },
  {
    id: 7,
    title: "Financial Services Portal",
    icon: "🏦",
    industry: "Finance & Banking",
    color: "#ef4444",
    overview: "A customer-facing financial portal for banking, insurance, or fintech — account dashboards, transaction history, loan applications, and investment tracking. Requires strict security, compliance (PCI DSS, SOC 2), and real-time data.",
    customerExamples: ["PayPal", "Ramp", "Modern banking startups"],
    problemStatement: "Legacy banking portals are slow, monolithic, and difficult to modernize. They lack mobile-first design, have poor accessibility, and can't meet modern security requirements without massive infrastructure investment. Compliance requires audit trails and data residency.",
    mermaidChart: `graph TB
    subgraph Frontend["Next.js Frontend"]
        CHAT["/chat\nRSC + useChat"]
        HISTORY["/history\nSSR auth"]
    end
    subgraph Functions["Vercel Functions - Fluid Compute"]
        CHATAPI["/api/chat\nstreamText"]
        SEARCHAPI["/api/search\nEdge Function"]
        AGENT["/api/agent\nuse-workflow"]
    end
    subgraph AI["AI Services"]
        GW["AI Gateway"]
        OPENAI["OpenAI"]
        ANTHROPIC["Anthropic"]
        PINECONE["Pinecone"]
        SANDBOX["Sandbox"]
    end
    CHAT --> CHATAPI
    CHATAPI --> GW
    GW --> OPENAI
    GW --> ANTHROPIC
    SEARCHAPI --> PINECONE
    AGENT --> SANDBOX`,
    architecture: {
      layers: [
        { name: "Public Site", detail: "SSG marketing pages, rate/calculator tools", tech: "Next.js SSG" },
        { name: "Auth & Security", detail: "MFA, Middleware auth checks, SAML SSO for enterprise clients", tech: "Auth0, Clerk, Vercel Middleware" },
        { name: "Account Dashboard", detail: "SSR with real-time account balances, transaction history", tech: "React Server Components, SSR" },
        { name: "API Gateway", detail: "Backend-for-frontend proxying to core banking APIs", tech: "Next.js Route Handlers, API routes" },
        { name: "Core Banking", detail: "Existing banking systems, transaction processors", tech: "Existing backend (stays unchanged)" },
        { name: "Compliance", detail: "Audit logs, data residency, encryption", tech: "Vercel Enterprise, WAF, EU regions" },
      ],
      diagram: `┌─────────────────────────────────────────────────────────────┐
│  Vercel WAF (OWASP Top 10, DDoS, custom rules)             │
├─────────────────────────────────────────────────────────────┤
│  Edge Middleware (MFA check, session validation, fraud)      │
├─────────────────────────────────────────────────────────────┤
│  Next.js on Vercel (EU Region — data residency)             │
│  ┌──────────┐ ┌────────────┐ ┌────────────────────────┐    │
│  │ / SSG    │ │ /account   │ │ /transactions          │    │
│  │ Public   │ │ SSR (auth) │ │ SSR (auth, real-time)  │    │
│  └──────────┘ └────────────┘ └────────────────────────┘    │
├─────────────────────────────────────────────────────────────┤
│  Auth0/Clerk │ Core Banking API │ Audit Logs │ SIEM         │
└─────────────────────────────────────────────────────────────┘`,
    },
    renderingStrategy: [
      { route: "/ (Public)", strategy: "SSG", why: "Marketing, rates, calculators. No sensitive data — maximum CDN performance." },
      { route: "/login", strategy: "SSG", why: "Login form is static. Auth handled by identity provider." },
      { route: "/account", strategy: "SSR (force-dynamic)", why: "Real-time balance, user-specific. Must hit banking API on every request. No caching." },
      { route: "/transactions", strategy: "SSR (force-dynamic)", why: "Transaction history is sensitive and user-specific. No caching allowed." },
      { route: "/apply/loan", strategy: "SSR (auth)", why: "Multi-step form with server-side validation. Sensitive financial data." },
    ],
    vercelFeatures: [
      { feature: "Enterprise WAF", usage: "OWASP Top 10 protection, DDoS mitigation, custom rules for rate limiting login attempts, blocking suspicious IPs." },
      { feature: "Managed DDoS", usage: "Edge network absorbs volumetric attacks. Financial portals are common DDoS targets." },
      { feature: "EU Data Residency", usage: "Deploy functions to EU regions only. GDPR compliance for EU customers." },
      { feature: "SAML SSO + SCIM", usage: "Enterprise banking clients authenticate via their own identity provider (Okta, Azure AD)." },
      { feature: "Audit Logs", usage: "Every deployment, env var change, and team action logged. Required for SOC 2 and PCI compliance." },
      { feature: "Deployment Protection", usage: "Preview deployments behind Vercel Auth + Trusted IPs. No unauthorized access to pre-production banking features." },
    ],
    cachingPattern: "CRITICAL: Never cache user-specific financial data. All account/transaction routes use cache: 'no-store'. Public pages (rates, marketing) can use SSG/ISR. Environment variables for API keys are server-only (no NEXT_PUBLIC_ prefix). Rate calculators can use client-side computation only — no server-side caching of financial inputs.",
    costConsiderations: [
      "All account pages are SSR (no-store) — every view invokes a function. Financial data can't be cached. Budget for high function invocation costs.",
      "WAF rules are Enterprise-only. Factor in the ~$20-25K/year Enterprise minimum.",
      "Compliance requirements (HIPAA BAA, SOC 2, PCI DSS) mandate Enterprise plan.",
      "Log Drains to existing SIEM (Splunk, Elastic) for security monitoring — Enterprise feature.",
      "DDoS protection is critical — financial services are top targets. Vercel's edge network handles this automatically.",
    ],
    interviewQuestions: [
      { question: "How would you address a bank's security concerns about using Vercel?", answer: "Vercel's security story: SOC 2 Type II annual audit, managed WAF with OWASP Top 10 protection, automatic DDoS mitigation at edge, SAML SSO + SCIM for identity management, deployment protection with Trusted IPs, encrypted environment variables (server-only by default), audit logs for every action, EU data residency for GDPR, and PCI DSS considerations. All sensitive data stays server-side (no NEXT_PUBLIC_ for secrets). The edge network means sensitive function code only runs in configured regions." },
      { question: "Can you cache any data in a financial application?", answer: "Public data (interest rates, branch locations, marketing content) can use SSG or ISR. User-specific financial data (balances, transactions, statements) must NEVER be cached — use cache: 'no-store' on every fetch. If you accidentally cache financial data, one user's balance appears on another user's screen. The only optimization: use React Suspense to stream account components — the shell loads fast while financial data fetches in parallel." },
      { question: "A financial customer needs 99.99% uptime. How does Vercel Enterprise deliver this?", answer: "Enterprise SLA guarantees 99.99% uptime. Multi-region compute means functions deploy to multiple regions with automatic failover — if one region goes down, traffic routes to the next closest. Fluid Compute provides AZ-level failover first, then region-level. Static assets serve from CDN (inherently highly available). Skew Protection ensures deployment rollouts don't cause version mismatches. For truly critical paths, implement circuit breakers and graceful degradation in application code." },
    ],
  },
  {
    id: 8,
    title: "Healthcare Patient Portal",
    icon: "🏥",
    industry: "Healthcare",
    color: "#14b8a6",
    overview: "A patient-facing healthcare portal for appointment booking, medical records access, telehealth, prescription management, and health dashboards. Requires HIPAA compliance, strict data access controls, and accessibility (WCAG 2.1 AA).",
    customerExamples: ["Telehealth startups", "Hospital systems", "Health tech companies"],
    problemStatement: "Healthcare portals must be HIPAA-compliant, accessible, and secure while delivering a modern user experience. Legacy portals built on enterprise Java/C# platforms are slow, difficult to update, and provide poor mobile experiences — frustrating for patients who expect consumer-grade UX.",
    mermaidChart: `graph TB
    subgraph Frontend["Next.js Frontend"]
        CHAT["/chat\nRSC + useChat"]
        HISTORY["/history\nSSR auth"]
    end
    subgraph Functions["Vercel Functions - Fluid Compute"]
        CHATAPI["/api/chat\nstreamText"]
        SEARCHAPI["/api/search\nEdge Function"]
        AGENT["/api/agent\nuse-workflow"]
    end
    subgraph AI["AI Services"]
        GW["AI Gateway"]
        OPENAI["OpenAI"]
        ANTHROPIC["Anthropic"]
        PINECONE["Pinecone"]
        SANDBOX["Sandbox"]
    end
    CHAT --> CHATAPI
    CHATAPI --> GW
    GW --> OPENAI
    GW --> ANTHROPIC
    SEARCHAPI --> PINECONE
    AGENT --> SANDBOX`,
    architecture: {
      layers: [
        { name: "Patient UX", detail: "Accessible, mobile-first Next.js application with SSR for patient data", tech: "Next.js, React, ARIA, WCAG 2.1 AA" },
        { name: "Auth", detail: "HIPAA-compliant authentication with MFA, session management", tech: "Auth0 (HIPAA plan), Clerk" },
        { name: "FHIR API", detail: "Healthcare interoperability layer — FHIR R4 standard", tech: "FHIR R4, SMART on FHIR" },
        { name: "EHR Integration", detail: "Backend connection to Electronic Health Record systems", tech: "Epic, Cerner, custom EHR APIs" },
        { name: "Telehealth", detail: "Video consultation with embedded WebRTC or third-party", tech: "Twilio Video, Daily.co" },
        { name: "Compliance", detail: "HIPAA BAA, audit trails, data encryption, access controls", tech: "Vercel Enterprise, WAF, server-only env vars" },
      ],
      diagram: `┌─────────────────────────────────────────────────────────────┐
│  Vercel WAF + DDoS + Deployment Protection                  │
├─────────────────────────────────────────────────────────────┤
│  Edge Middleware (auth check, session validation, MFA)       │
├─────────────────────────────────────────────────────────────┤
│  Next.js on Vercel (US region — HIPAA data residency)       │
│  ┌──────────┐ ┌───────────┐ ┌───────────┐ ┌────────────┐  │
│  │ / SSG    │ │/portal    │ │/records   │ │/telehealth │  │
│  │ Public   │ │SSR (auth) │ │SSR (auth) │ │SSR + WebRTC│  │
│  └──────────┘ └───────────┘ └───────────┘ └────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  Auth0 │ FHIR API │ EHR (Epic/Cerner) │ Twilio │ Audit     │
└─────────────────────────────────────────────────────────────┘`,
    },
    renderingStrategy: [
      { route: "/ (Public)", strategy: "SSG", why: "Provider directory, health resources, about pages. No PHI — pure static." },
      { route: "/portal/dashboard", strategy: "SSR (auth + MFA)", why: "Patient-specific health metrics. HIPAA requires authentication and no shared caching." },
      { route: "/portal/records", strategy: "SSR (auth)", why: "Medical records via FHIR API. Sensitive PHI — no caching, strict access control." },
      { route: "/portal/appointments", strategy: "SSR (auth)", why: "Real-time appointment availability. User-specific scheduling." },
      { route: "/portal/telehealth", strategy: "SSR + Client (WebRTC)", why: "Server renders appointment context, client handles video call via WebRTC." },
    ],
    vercelFeatures: [
      { feature: "HIPAA BAA", usage: "Vercel Enterprise provides Business Associate Agreement — required for handling Protected Health Information (PHI)." },
      { feature: "Enterprise WAF", usage: "OWASP Top 10 protection, rate limiting on login/API endpoints, IP restrictions for admin access." },
      { feature: "Server-Only Env Vars", usage: "EHR API keys, FHIR credentials — no NEXT_PUBLIC_ prefix. Never exposed to browser." },
      { feature: "Region-Locked Functions", usage: "Deploy functions only to US regions — PHI cannot leave the country (HIPAA requirement)." },
      { feature: "Audit Logs + Log Drains", usage: "Every deployment and change logged. Drain to healthcare-grade SIEM for compliance auditing." },
      { feature: "Deployment Protection", usage: "Preview deployments accessible only to authorized team members — no PHI in public-facing preview URLs." },
    ],
    cachingPattern: "ZERO caching for any PHI. All patient-facing routes use cache: 'no-store'. Public health resources and provider directories can use SSG or ISR. Environment variables for EHR API keys are strictly server-only. Even error pages must be careful not to leak patient identifiers in error messages.",
    costConsiderations: [
      "HIPAA compliance requires Enterprise plan (BAA). Budget for ~$20-25K/year minimum.",
      "All patient routes are SSR (no cache) — function invocations scale linearly with patient portal usage.",
      "Telehealth: WebRTC video doesn't flow through Vercel. Use Twilio/Daily.co for media servers.",
      "Accessibility (WCAG 2.1 AA) is legally required. Test with screen readers, keyboard navigation, and contrast ratios. Not a hosting feature but critical for the solution.",
      "EHR API latency: Epic/Cerner APIs can be slow (500ms-2s). Use Streaming SSR with Suspense to show the shell immediately while health data loads.",
    ],
    interviewQuestions: [
      { question: "How does Vercel handle HIPAA compliance for healthcare applications?", answer: "Vercel Enterprise provides a Business Associate Agreement (BAA) — the legal requirement for handling PHI. Technical controls: server-only environment variables (no NEXT_PUBLIC_), region-locked functions (US only), WAF for access protection, deployment protection for preview environments, and audit logs for compliance tracking. Log Drains stream to healthcare SIEM for monitoring. All patient data routes use cache: 'no-store' — no PHI caching." },
      { question: "A hospital wants to modernize their patient portal. How would you architect it on Vercel?", answer: "Public site (provider directory, health resources) as SSG — fast and cheap. Patient portal as SSR behind auth Middleware with MFA. FHIR R4 API for interoperability with Epic/Cerner EHR. Streaming SSR with Suspense: portal shell loads immediately, health data streams in as FHIR APIs respond. Telehealth via Twilio/Daily.co embedded in a client component. HIPAA BAA on Enterprise. All functions locked to US region." },
      { question: "What accessibility considerations are critical for a healthcare portal?", answer: "WCAG 2.1 AA is legally required for healthcare (ADA compliance). Key areas: semantic HTML (proper headings, landmarks, ARIA labels), keyboard navigation for all interactive elements, color contrast ratios (4.5:1 for text), screen reader compatibility, focus management for SPAs, form field labels and error messages, and responsive design for elderly patients with accessibility settings. Test with NVDA/JAWS screen readers and axe-core automated testing." },
    ],
  },
  {
    id: 9,
    title: "EdTech Learning Platform",
    icon: "🎓",
    industry: "Education",
    color: "#a855f7",
    overview: "An online learning platform with course catalogs, video lessons, interactive quizzes, progress tracking, certificates, and real-time collaboration. Supports both self-paced and instructor-led learning with thousands of concurrent students.",
    customerExamples: ["Coursera-style platforms", "Corporate training portals", "Bootcamp platforms"],
    problemStatement: "Monolithic LMS platforms (Moodle, Blackboard) are slow, have poor UX, require server maintenance, and can't handle traffic spikes during enrollment periods or exam windows. Content updates require technical expertise.",
    mermaidChart: `graph TB
    subgraph Domains["Custom Domains"]
        A["client-a.com"]
        B["client-b.com"]
        C["*.platform.com"]
    end
    subgraph Edge["Edge Middleware"]
        MW["Tenant ID from hostname"]
    end
    subgraph Nextjs["Next.js Single Deployment"]
        RENDER["Dynamic rendering\ntenant config + theme"]
    end
    subgraph Services["Services"]
        EC["Edge Config\nThemes"]
        KV["Vercel KV\nSessions"]
        CMS["CMS\nContent"]
    end
    Domains --> MW
    MW --> Nextjs
    RENDER --> EC
    RENDER --> KV
    RENDER --> CMS`,
    architecture: {
      layers: [
        { name: "Course Catalog", detail: "ISR pages for discoverable course listings and landing pages (SEO)", tech: "Next.js ISR, SEO metadata" },
        { name: "Video Player", detail: "Adaptive bitrate video streaming with progress tracking", tech: "Mux, Cloudflare Stream, Vimeo OTT" },
        { name: "Interactive Content", detail: "Quizzes, code exercises, assignments — client-side interactive components", tech: "React client components, Monaco Editor" },
        { name: "Progress & Auth", detail: "User progress tracking, enrollment, certificates", tech: "Clerk/Auth0, Vercel Postgres" },
        { name: "Real-Time", detail: "Live classroom features: chat, Q&A, polls", tech: "Ably, Pusher, WebSockets" },
        { name: "AI Tutor", detail: "AI-powered tutoring assistant using course content as context", tech: "AI SDK, Vercel AI Gateway, RAG" },
      ],
      diagram: `┌─────────────────────────────────────────────────────────────┐
│  Edge Middleware (auth, enrollment check, geo-routing)       │
├─────────────────────────────────────────────────────────────┤
│  Next.js on Vercel                                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐  │
│  │/courses  │ │/learn/   │ │/quiz     │ │/api/ai-tutor │  │
│  │ISR       │ │[id] SSR  │ │CSR       │ │Fluid Compute │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  Mux Video │ Clerk │ Postgres │ Ably │ AI Gateway │ Redis   │
└─────────────────────────────────────────────────────────────┘`,
    },
    renderingStrategy: [
      { route: "/courses", strategy: "ISR (webhook)", why: "Course catalog for SEO. Updates when courses are published. Webhook revalidation." },
      { route: "/courses/[slug]", strategy: "ISR (webhook)", why: "Course landing pages with descriptions, reviews, pricing. SEO-critical for enrollment." },
      { route: "/learn/[courseId]/[lessonId]", strategy: "SSR (auth)", why: "Enrolled students only. Progress tracking per user. Video player with user's bookmark position." },
      { route: "/quiz/[quizId]", strategy: "CSR", why: "Interactive quiz with timers, drag-and-drop. Client-side state management for question flow." },
      { route: "/api/ai-tutor", strategy: "Serverless (Fluid)", why: "AI tutor streams explanations using course content as context. Fluid Compute for cost-efficient streaming." },
      { route: "/certificates/[id]", strategy: "SSR (auth)", why: "Generate and verify completion certificates. Auth-gated, user-specific." },
    ],
    vercelFeatures: [
      { feature: "ISR for Course Catalog", usage: "Course pages ranked by Google for organic enrollment. Webhook revalidation when courses update." },
      { feature: "Fluid Compute + AI SDK", usage: "AI tutor that explains concepts, answers questions, generates practice problems — streaming with 80-90% cost savings." },
      { feature: "Middleware Auth", usage: "Check enrollment status before allowing access to lesson content. Redirect unenrolled users to purchase page." },
      { feature: "Vercel Postgres", usage: "Progress tracking (lessons completed, quiz scores, time spent) per user per course." },
      { feature: "Edge Config", usage: "Course feature flags (enable/disable modules), maintenance mode, A/B test landing pages." },
      { feature: "Streaming SSR", usage: "Lesson page shell loads instantly, video player and progress data stream in via Suspense." },
    ],
    cachingPattern: "Course catalog: ISR with tags ['courses', 'course-{slug}']. CMS webhook revalidates on publish. Lesson pages: SSR with auth (no shared caching — progress is user-specific). Quiz data: server-fetched at start, client-side state during the quiz. AI tutor: no caching (each conversation is unique).",
    costConsiderations: [
      "Video streaming: don't serve video through Vercel CDN. Use Mux/Cloudflare Stream — specialized for adaptive bitrate video.",
      "AI tutor: Fluid Compute essential. Without it, every AI conversation costs full request duration. With it, only active CPU.",
      "Enrollment traffic spikes: ISR course catalog pages served from CDN. Even 100x traffic during enrollment = cache hits, not function invocations.",
      "Quiz submissions: each submission POSTs to an API route (function invocation). For exams with thousands of concurrent students, monitor Active CPU.",
      "Progress syncing: debounce progress updates on the client (don't POST on every second of video watched). Batch updates every 30s.",
    ],
    interviewQuestions: [
      { question: "How would you architect an AI-powered tutor within a learning platform on Vercel?", answer: "AI tutor API route using AI SDK's streamText() with Fluid Compute. Course content indexed in a vector database (Pinecone) for RAG — when a student asks a question, retrieve relevant course material as context. AI Gateway routes to OpenAI primary with Anthropic fallback. useChat() on the client for streaming UI. Each conversation scoped to the current course/lesson for contextual answers. Fluid Compute makes this affordable — only CPU time is billed, not the streaming duration." },
      { question: "Enrollment opens and 50,000 students hit the course catalog simultaneously. How does it scale?", answer: "Course catalog pages are ISR — served from CDN cache globally. 50,000 simultaneous requests = 50,000 cache hits, not 50,000 function invocations. Even if the cache is expired, Vercel's request collapsing ensures only one function runs per region. The only concern is the enrollment API endpoint (POST /api/enroll) — Fluid Compute handles concurrency via shared instances. Database connection pooling (Neon) prevents connection exhaustion." },
      { question: "How do you handle quiz anti-cheating measures on a frontend platform?", answer: "Key principle: never trust the client for grade-critical operations. Quiz questions fetched server-side (SSR), one at a time via API (don't send all answers to the client). Timer enforcement on the server (record start time, validate submission time). Shuffle question order per student (server-side seed). For high-stakes exams: proctoring integration, but that's a third-party service, not a Vercel feature. Vercel's role is secure, fast delivery — anti-cheating logic is application-level." },
    ],
  },
  {
    id: 10,
    title: "Real-Time Collaboration Platform",
    icon: "👥",
    industry: "Productivity & Collaboration",
    color: "#f97316",
    overview: "A collaborative workspace application like Notion, Figma, or Linear — real-time document editing, presence indicators, commenting, and shared project views. Requires real-time sync, offline support, and enterprise-grade access controls.",
    customerExamples: ["Notion", "Linear", "Loom"],
    problemStatement: "Real-time collaboration requires persistent connections (WebSockets), low latency conflict resolution, and offline-first architecture. Traditional serverless platforms can't handle persistent connections. Client-heavy apps have poor SEO and slow initial loads.",
    mermaidChart: `graph TB
    subgraph Domains["Custom Domains"]
        A["client-a.com"]
        B["client-b.com"]
        C["*.platform.com"]
    end
    subgraph Edge["Edge Middleware"]
        MW["Tenant ID from hostname"]
    end
    subgraph Nextjs["Next.js Single Deployment"]
        RENDER["Dynamic rendering\ntenant config + theme"]
    end
    subgraph Services["Services"]
        EC["Edge Config\nThemes"]
        KV["Vercel KV\nSessions"]
        CMS["CMS\nContent"]
    end
    Domains --> MW
    MW --> Nextjs
    RENDER --> EC
    RENDER --> KV
    RENDER --> CMS`,
    architecture: {
      layers: [
        { name: "App Shell", detail: "Next.js with RSC for fast initial load — SSR the workspace, CSR the editor", tech: "Next.js App Router, RSC" },
        { name: "Real-Time Sync", detail: "CRDT-based real-time sync for concurrent editing without conflicts", tech: "Yjs, Liveblocks, PartyKit" },
        { name: "API Layer", detail: "Vercel Functions for CRUD operations, permissions, and data persistence", tech: "Next.js Route Handlers, Fluid Compute" },
        { name: "Storage", detail: "Documents, files, and media storage", tech: "Vercel Blob, Vercel Postgres, S3" },
        { name: "Auth & Permissions", detail: "Workspace-level and document-level access controls", tech: "Clerk, custom RBAC" },
        { name: "Search", detail: "Full-text and semantic search across all workspace content", tech: "Typesense, Algolia, vector search" },
      ],
      diagram: `┌─────────────────────────────────────────────────────────────┐
│  Edge Middleware (auth, workspace routing, feature flags)    │
├─────────────────────────────────────────────────────────────┤
│  Next.js on Vercel                                          │
│  ┌──────────────┐ ┌────────────┐ ┌───────────────────────┐ │
│  │ / (Marketing)│ │ /workspace │ │ /doc/[id]             │ │
│  │ SSG          │ │ SSR (auth) │ │ SSR shell + CSR editor│ │
│  └──────────────┘ └────────────┘ └───────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  Liveblocks/Yjs (WebSocket) │ Postgres │ Blob │ Search      │
│  (Real-time sync — NOT on Vercel Functions)                  │
└─────────────────────────────────────────────────────────────┘`,
    },
    renderingStrategy: [
      { route: "/ (Marketing)", strategy: "SSG", why: "Public marketing pages — maximum performance and SEO." },
      { route: "/pricing", strategy: "SSG", why: "Static pricing page updated only on deploy." },
      { route: "/workspace/[id]", strategy: "SSR (auth)", why: "User-specific workspace view. Auth-gated with role-based access." },
      { route: "/doc/[id]", strategy: "SSR shell + CSR editor", why: "SSR renders the document metadata and initial content snapshot. CSR takes over for real-time collaborative editing." },
      { route: "/api/documents/*", strategy: "Serverless (Fluid)", why: "CRUD operations on documents. Fluid Compute for concurrent API requests." },
    ],
    vercelFeatures: [
      { feature: "RSC + Streaming", usage: "SSR the workspace shell and sidebar instantly. Stream in document previews and recent activity via Suspense." },
      { feature: "Vercel Blob", usage: "Store uploaded files, images, and attachments. Globally accessible via CDN URLs." },
      { feature: "Vercel Postgres", usage: "Document metadata, user permissions, workspace settings. Connection pooling for serverless." },
      { feature: "Middleware", usage: "Auth check + workspace routing. Redirect to login, check workspace membership, enforce plan limits." },
      { feature: "Fluid Compute", usage: "API routes handle concurrent document saves, search queries, and permission checks efficiently." },
      { feature: "Preview Deployments", usage: "Product team tests new editor features in isolated environments with real data (test workspace)." },
    ],
    cachingPattern: "Marketing pages: SSG (full CDN cache). Workspace/document views: cache: 'no-store' (user-specific, real-time). Document content synced via WebSocket (Liveblocks/Yjs) — not through Vercel's cache. API routes: no cache for writes, short unstable_cache for expensive read queries (e.g., workspace analytics) scoped by workspaceId.",
    costConsiderations: [
      "WebSocket connections: Vercel Functions DON'T support persistent WebSocket connections. Use Liveblocks, PartyKit, or Ably for real-time sync — these run on their own infrastructure.",
      "The Vercel portion handles: SSR page loads, API CRUD, file storage (Blob), database (Postgres). Real-time collaboration runs on a dedicated service.",
      "SSR for every document open: each document access invokes a function. For heavily-used workspaces, monitor function invocations.",
      "File uploads via Vercel Blob: check storage limits and bandwidth costs for teams uploading many large files.",
      "Enterprise customers need SAML SSO + SCIM for team management — this triggers Vercel Enterprise plan requirement.",
    ],
    interviewQuestions: [
      { question: "Can you build a real-time collaboration app entirely on Vercel?", answer: "Partially. Vercel handles the presentation layer beautifully: SSR for fast initial load, API routes for CRUD, Blob for file storage, Postgres for data. But Vercel Functions don't support persistent WebSocket connections — you need a dedicated real-time service (Liveblocks, PartyKit, Ably, Pusher) for collaborative editing. This is composable architecture in action: Vercel for the web platform, Liveblocks for real-time sync, Postgres for persistence." },
      { question: "How would you optimize the initial load time for a document editor?", answer: "SSR the document shell and metadata instantly (RSC). Stream in the document content via Suspense while the editor JavaScript bundle loads via dynamic() import (code-split the heavy editor). The CRDT collaborative layer (Yjs) initializes client-side after hydration. Users see the document content immediately (SSR), and editing becomes available as the editor loads. This gives fast LCP (SSR content) while the interactive editor hydrates in the background." },
      { question: "A CTO asks: 'Why not just build this as a pure SPA on S3 + CloudFront?'", answer: "SEO: your marketing pages, changelog, and docs need server rendering for Google indexing. Initial load: SSR gives faster FCP/LCP than a SPA — no loading spinners. Preview Deployments: every PR gets a live preview (impossible with S3). API routes: built-in serverless functions for your backend, no separate Lambda setup. Auth Middleware: edge-level authentication before any page renders. Plus next/image, next/font, Speed Insights, and zero-config CI/CD from git push. The SPA is only the editor — everything else benefits from the full platform." },
    ],
  },
];

export default function UseCasesPage() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState<Record<string, boolean>>({});

  const toggleAnswer = (key: string) => {
    setShowAnswer((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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
            10 Use Cases
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
            Hosting Solutions on Vercel
          </h1>
          <p style={{ color: "#94a3b8", maxWidth: "700px", margin: "0 auto", lineHeight: 1.7 }}>
            10 production-grade use cases with deep-dive architecture diagrams, rendering strategies,
            caching patterns, cost analysis, and SE interview questions for each.
          </p>
        </div>

        {/* Quick Navigator */}
        <div className="row g-2 mb-5">
          {useCases.map((uc) => (
            <div key={uc.id} className="col-6 col-md-4 col-lg">
              <button
                onClick={() => { setExpanded(expanded === uc.id ? null : uc.id); setTimeout(() => document.getElementById(`uc-${uc.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" }), 100); }}
                style={{
                  background: expanded === uc.id ? `${uc.color}22` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${expanded === uc.id ? uc.color : "rgba(255,255,255,0.08)"}`,
                  borderRadius: "10px",
                  padding: "0.6rem",
                  width: "100%",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all 0.2s",
                }}
              >
                <div style={{ fontSize: "1.3rem" }}>{uc.icon}</div>
                <div style={{ color: "#e2e8f0", fontSize: "0.72rem", fontWeight: 600, lineHeight: 1.3, marginTop: "0.2rem" }}>{uc.title.split(" ").slice(0, 2).join(" ")}</div>
              </button>
            </div>
          ))}
        </div>

        {/* Use Case Cards */}
        {useCases.map((uc) => (
          <div key={uc.id} id={`uc-${uc.id}`} className="mb-4">
            <div
              className="feature-card"
              style={{
                padding: "1.5rem",
                borderLeft: `4px solid ${uc.color}`,
                cursor: "pointer",
              }}
              onClick={() => setExpanded(expanded === uc.id ? null : uc.id)}
            >
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <span style={{ fontSize: "1.5rem" }}>{uc.icon}</span>
                    <span style={{
                      background: `${uc.color}22`,
                      color: uc.color,
                      padding: "0.15rem 0.5rem",
                      borderRadius: "10px",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                    }}>
                      {uc.industry}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#fff", marginBottom: "0.5rem" }}>
                    {uc.id}. {uc.title}
                  </h3>
                  <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "0.5rem" }}>{uc.overview}</p>
                  <div className="d-flex gap-2 flex-wrap">
                    {uc.customerExamples.map((c) => (
                      <span key={c} style={{ background: "rgba(255,255,255,0.06)", color: "#94a3b8", padding: "0.15rem 0.5rem", borderRadius: "8px", fontSize: "0.72rem" }}>{c}</span>
                    ))}
                  </div>
                </div>
                <span style={{ color: "#667eea", fontSize: "1.3rem", transform: expanded === uc.id ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>▼</span>
              </div>
            </div>

            {expanded === uc.id && (
              <div style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderTop: "none",
                borderRadius: "0 0 16px 16px",
                padding: "1.5rem",
              }}>
                {/* Problem Statement */}
                <div className="mb-4">
                  <h4 style={{ color: "#f87171", fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.5rem" }}>⚠️ Problem Statement</h4>
                  <p style={{ color: "#94a3b8", fontSize: "0.88rem", lineHeight: 1.6 }}>{uc.problemStatement}</p>
                </div>

                {/* Architecture Diagram */}
                <div className="mb-4">
                  <h4 style={{ color: uc.color, fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.75rem" }}>🏗️ Architecture</h4>
                  <MermaidDiagram chart={uc.mermaidChart} id={`uc-${uc.id}`} />
                  <div className="row g-2 mt-2">
                    {uc.architecture.layers.map((l, i) => (
                      <div key={i} className="col-md-6 col-lg-4">
                        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", padding: "0.6rem" }}>
                          <div style={{ color: uc.color, fontSize: "0.78rem", fontWeight: 700 }}>{l.name}</div>
                          <div style={{ color: "#94a3b8", fontSize: "0.75rem", lineHeight: 1.4, marginTop: "0.2rem" }}>{l.detail}</div>
                          <div style={{ color: "#64748b", fontSize: "0.68rem", marginTop: "0.2rem" }}>{l.tech}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rendering Strategy */}
                <div className="mb-4">
                  <h4 style={{ color: uc.color, fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.5rem" }}>⚡ Rendering Strategy</h4>
                  <div className="table-responsive">
                    <table className="table table-dark table-sm" style={{ fontSize: "0.82rem" }}>
                      <thead>
                        <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.1)" }}>
                          <th style={{ color: "#818cf8", fontWeight: 700 }}>Route</th>
                          <th style={{ color: "#818cf8", fontWeight: 700 }}>Strategy</th>
                          <th style={{ color: "#818cf8", fontWeight: 700 }}>Why</th>
                        </tr>
                      </thead>
                      <tbody>
                        {uc.renderingStrategy.map((r, i) => (
                          <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                            <td style={{ color: "#10b981", fontFamily: "monospace", whiteSpace: "nowrap" }}>{r.route}</td>
                            <td style={{ color: "#f59e0b", fontWeight: 600, whiteSpace: "nowrap" }}>{r.strategy}</td>
                            <td style={{ color: "#94a3b8" }}>{r.why}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Vercel Features Used */}
                <div className="mb-4">
                  <h4 style={{ color: uc.color, fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.5rem" }}>🔧 Vercel Features Used</h4>
                  <div className="row g-2">
                    {uc.vercelFeatures.map((f, i) => (
                      <div key={i} className="col-md-6">
                        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", padding: "0.6rem" }}>
                          <span style={{ color: uc.color, fontSize: "0.8rem", fontWeight: 700 }}>{f.feature}: </span>
                          <span style={{ color: "#94a3b8", fontSize: "0.8rem" }}>{f.usage}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Caching Pattern */}
                <div className="mb-4">
                  <h4 style={{ color: uc.color, fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.5rem" }}>💾 Caching Pattern</h4>
                  <div style={{ background: "rgba(102,126,234,0.08)", border: "1px solid rgba(102,126,234,0.15)", borderRadius: "10px", padding: "0.75rem 1rem" }}>
                    <p style={{ color: "#cbd5e1", fontSize: "0.85rem", lineHeight: 1.6, margin: 0 }}>{uc.cachingPattern}</p>
                  </div>
                </div>

                {/* Cost Considerations */}
                <div className="mb-4">
                  <h4 style={{ color: uc.color, fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.5rem" }}>💰 Cost Considerations</h4>
                  <ul style={{ paddingLeft: "1.25rem", margin: 0 }}>
                    {uc.costConsiderations.map((c, i) => (
                      <li key={i} style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: "0.3rem" }}>{c}</li>
                    ))}
                  </ul>
                </div>

                {/* Interview Questions */}
                <div>
                  <h4 style={{ color: uc.color, fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.75rem" }}>🗣️ SE Interview Questions</h4>
                  {uc.interviewQuestions.map((q, qi) => (
                    <div key={qi} className="mb-3">
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleAnswer(`${uc.id}-${qi}`); }}
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "10px",
                          padding: "0.75rem 1rem",
                          width: "100%",
                          textAlign: "left",
                          cursor: "pointer",
                          color: "#e2e8f0",
                          fontSize: "0.88rem",
                          fontWeight: 600,
                        }}
                      >
                        Q{qi + 1}: {q.question}
                        <span style={{ float: "right", color: "#667eea" }}>{showAnswer[`${uc.id}-${qi}`] ? "▲ Hide" : "▼ Show Answer"}</span>
                      </button>
                      {showAnswer[`${uc.id}-${qi}`] && (
                        <div style={{
                          background: "rgba(16,185,129,0.06)",
                          border: "1px solid rgba(16,185,129,0.15)",
                          borderRadius: "0 0 10px 10px",
                          padding: "0.75rem 1rem",
                          marginTop: "-1px",
                        }}>
                          <p style={{ color: "#cbd5e1", fontSize: "0.85rem", lineHeight: 1.7, margin: 0 }}>{q.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="text-center mt-5">
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link href="/quiz" className="btn-glow">Take the Quiz (140 Qs) →</Link>
            <Link href="/blog/zero-to-hero" className="btn-glow" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>Zero to Hero Guide →</Link>
            <Link href="/se" className="btn-glow" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>SE Resources →</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
