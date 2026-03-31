"use client";

import Link from "next/link";
import { QuizEngine, Question } from "../QuizEngine";

const questions: Question[] = [
  {
    id: 1,
    question: "What is the default caching behavior of fetch() in Next.js App Router?",
    options: [
      "cache: 'no-store' — never cached",
      "cache: 'force-cache' — cached indefinitely",
      "Cached for 60 seconds by default",
      "Cached only in development mode",
    ],
    correct: 1,
    explanation: "By default, fetch() in Next.js App Router uses force-cache, caching indefinitely until manually revalidated. This is a common source of confusion for developers.",
  },
  {
    id: 2,
    question: "When should you use ISR (Incremental Static Regeneration) instead of SSG?",
    options: [
      "When content never changes",
      "When content updates periodically and full rebuilds are impractical",
      "When every request needs completely fresh data",
      "When you need client-side interactivity",
    ],
    correct: 1,
    explanation: "ISR is ideal for content that updates on a schedule or via CMS publish events — e-commerce products, news articles, blog posts. It gives static speed with dynamic freshness, without requiring a full site rebuild.",
  },
  {
    id: 3,
    question: "What does 'export const dynamic = \"force-dynamic\"' do in a Next.js route?",
    options: [
      "Enables client-side rendering only",
      "Forces the page to render on every request (SSR), never cached",
      "Enables dynamic imports for code splitting",
      "Forces the page to use Edge Runtime",
    ],
    correct: 1,
    explanation: "force-dynamic opts the route into SSR — the page renders on every request with no caching. Use it for authenticated pages, search results, or real-time data.",
  },
  {
    id: 4,
    question: "What is the key advantage of React Server Components (RSC)?",
    options: [
      "They enable two-way data binding",
      "They ship zero JavaScript to the client and can access databases directly",
      "They replace the need for CSS-in-JS",
      "They enable real-time WebSocket connections",
    ],
    correct: 1,
    explanation: "RSC render on the server with zero client-side JS shipped. They can access databases, file systems, and APIs directly without an API layer — reducing bundle size and improving LCP.",
  },
  {
    id: 5,
    question: "How does the 'stale-while-revalidate' pattern work in ISR?",
    options: [
      "Users always wait for fresh content to generate",
      "Stale content is served immediately, while fresh content generates in background for the next user",
      "Content is regenerated on a fixed cron schedule",
      "Users see a loading spinner until content is ready",
    ],
    correct: 1,
    explanation: "ISR uses stale-while-revalidate: a user gets the cached (potentially stale) page instantly. If the cache is expired, Vercel regenerates in the background. The next user gets the fresh version.",
  },
  {
    id: 6,
    question: "What is Partial Prerendering (PPR) in Next.js?",
    options: [
      "Rendering only the visible viewport of a page",
      "A static shell is served instantly, with dynamic holes streamed in via Suspense boundaries",
      "Rendering pages partially on the client and partially on the server",
      "Pre-rendering only the first 3 pages of a site",
    ],
    correct: 1,
    explanation: "PPR serves a static outer shell instantly from CDN, then streams in dynamic content through Suspense boundaries. One page can be both static AND dynamic — the best of both worlds.",
  },
  {
    id: 7,
    question: "When should you mark a component with 'use client'?",
    options: [
      "For all components that render HTML",
      "Only when the component needs interactivity (event handlers, state, effects)",
      "For all components that fetch data",
      "Whenever you import from a third-party library",
    ],
    correct: 1,
    explanation: "Only use 'use client' for components that need browser interactivity — useState, useEffect, onClick, etc. Server Components (default) should handle data fetching, reducing the client JS bundle.",
  },
  {
    id: 8,
    question: "What does Streaming SSR with Suspense enable?",
    options: [
      "Video streaming from the server",
      "Fast initial shell followed by streaming in slow data components as they resolve",
      "Real-time updates without page refresh",
      "Streaming CSS to the client",
    ],
    correct: 1,
    explanation: "Streaming SSR renders the page shell immediately and streams in async components as they complete. Wrap slow components in <Suspense fallback={<Skeleton/>}>. Users see content progressively.",
  },
  {
    id: 9,
    question: "A high-traffic e-commerce site with 100,000+ product pages — which rendering strategy?",
    options: [
      "SSG — build all 100k pages at build time",
      "SSR — render every product page on each request",
      "ISR — static generation with on-demand revalidation via webhooks",
      "CSR — render everything on the client",
    ],
    correct: 2,
    explanation: "ISR is perfect for large catalogues. Pages are generated on first request, cached, and revalidated via CMS webhooks when products change. No need to rebuild 100k pages.",
  },
  {
    id: 10,
    question: "What is the cost concern with SSR routes on Vercel?",
    options: [
      "SSR doesn't work on Vercel",
      "SSR pages can't use caching",
      "Every request invokes a Vercel Function — high-traffic SSR pages are expensive",
      "SSR requires Enterprise plan",
    ],
    correct: 2,
    explanation: "Every SSR request invokes a Vercel Function. For high-traffic routes, guide customers to use ISR where possible (static speed, lower cost) and SSR only where real-time freshness is truly required.",
  },
  {
    id: 11,
    question: "What does 'generateStaticParams' do in the App Router?",
    options: [
      "Generates random parameters for testing",
      "Pre-renders specific dynamic routes at build time, similar to getStaticPaths in Pages Router",
      "Creates URL query parameters dynamically",
      "Validates form input parameters",
    ],
    correct: 1,
    explanation: "generateStaticParams defines which dynamic route params to pre-render at build time. For a site with 1M articles, generate the top 1,000 at build time; the rest generate on-demand via ISR and are cached.",
  },
  {
    id: 12,
    question: "What is Draft Mode in Next.js and why does it matter for CMS workflows?",
    options: [
      "A mode that disables TypeScript checking",
      "A feature that bypasses ISR cache to preview unpublished CMS content before publishing",
      "A development-only feature for testing components",
      "A mode that prevents accidental production deploys",
    ],
    correct: 1,
    explanation: "Draft Mode lets content editors preview unpublished CMS content by bypassing the ISR cache. The CMS triggers a URL that sets a draft cookie, and Next.js serves fresh content instead of cached. Essential for headless CMS workflows.",
  },
  {
    id: 13,
    question: "A customer has 'use client' on their root layout. What's the impact?",
    options: [
      "No impact — this is recommended",
      "The entire app hydrates client-side, defeating React Server Components — massive bundle size, poor LCP",
      "Only the layout becomes interactive",
      "It enables faster page transitions",
    ],
    correct: 1,
    explanation: "Putting 'use client' on root layout is a red flag: the entire component tree becomes a Client Component. All RSC benefits are lost — no zero-JS server rendering, full hydration required, huge bundle size, poor Core Web Vitals.",
  },
  {
    id: 14,
    question: "How do Pages Router data fetching methods map to App Router?",
    options: [
      "getServerSideProps → 'use client', getStaticProps → generateStaticParams",
      "getServerSideProps → async Server Components with force-dynamic, getStaticProps → async Server Components with force-cache",
      "They don't — Pages Router methods still work in App Router",
      "getServerSideProps → useEffect, getStaticProps → useState",
    ],
    correct: 1,
    explanation: "In App Router: getServerSideProps → async Server Component + `dynamic = 'force-dynamic'`. getStaticProps → async Server Component + `fetch({cache:'force-cache'})`. getStaticPaths → generateStaticParams. Pages Router and App Router can coexist during migration.",
  },
  {
    id: 15,
    question: "What is the advantage of ISR on Vercel vs self-hosted Next.js ISR?",
    options: [
      "There's no difference — ISR works the same everywhere",
      "On Vercel, ISR pages are distributed globally across CDN PoPs; self-hosted ISR is limited to a single region",
      "Self-hosted ISR is faster because it's closer to the database",
      "Vercel ISR doesn't support on-demand revalidation",
    ],
    correct: 1,
    explanation: "Self-hosted ISR is single-region and doesn't persist generated pages to durable storage. On Vercel, ISR pages are distributed globally across the CDN, giving users worldwide sub-10ms cache hits. This is a key migration argument.",
  },
  {
    id: 16,
    question: "What rendering combination does a SaaS dashboard pattern typically use?",
    options: [
      "Everything SSR for consistency",
      "SSG for marketing pages, ISR for blog, SSR/RSC for authenticated app routes",
      "CSR for everything with a loading spinner",
      "SSG for everything including dashboards",
    ],
    correct: 1,
    explanation: "The SaaS pattern: SSG for marketing pages (fastest CDN delivery), ISR for blog content (updates with CMS webhooks), SSR/RSC for /app/* routes (authenticated, user-specific data). Each route uses the optimal strategy.",
  },
  {
    id: 17,
    question: "How does Streaming SSR with Suspense affect Time to First Byte (TTFB)?",
    options: [
      "TTFB is slower because the server waits for all data",
      "TTFB is drastically improved — the shell streams immediately while slow data resolves asynchronously",
      "TTFB is unaffected by Suspense",
      "Streaming SSR doesn't work with Suspense",
    ],
    correct: 1,
    explanation: "Without streaming, the server waits for ALL data before sending HTML — slow TTFB. With Suspense + streaming, the shell renders immediately (fast TTFB), and slow components stream in as they resolve. Users see content progressively.",
  },
  {
    id: 18,
    question: "A media company has 1M articles. How should they architect ISR with generateStaticParams?",
    options: [
      "Generate all 1M articles at build time",
      "Don't use generateStaticParams — render everything on-demand",
      "Generate the top 1,000 most popular articles at build time; all others generate on first request and are cached via ISR",
      "Use SSR for all articles instead of ISR",
    ],
    correct: 2,
    explanation: "Best practice for massive sites: use generateStaticParams to pre-render the top 1,000 most popular articles (fastest for peak traffic). All other articles generate on first request via ISR and are cached globally. CMS webhooks handle targeted revalidation.",
  },
  {
    id: 19,
    question: "What are the two main benefits of React Server Components for bundle size?",
    options: [
      "Smaller CSS files and fewer images",
      "Zero JavaScript shipped to client for server components + no API layer needed for data fetching",
      "Automatic code splitting and tree shaking only",
      "Smaller HTML files and compression",
    ],
    correct: 1,
    explanation: "RSC gives two bundle wins: 1) Server Components ship zero JS to the client (they render HTML on the server). 2) Direct database/API access without an API layer means no client-side fetch code or state management for data loading.",
  },
  {
    id: 20,
    question: "What is the e-commerce rendering pattern for a product page with live inventory?",
    options: [
      "SSR for the entire page to keep inventory fresh",
      "ISR for static product details + Suspense-streamed live inventory component — combining static speed with real-time data",
      "CSR with client-side polling every second",
      "SSG with a manual rebuild when inventory changes",
    ],
    correct: 1,
    explanation: "Best pattern: ISR for product details (revalidate hourly + webhook). Wrap a <LiveInventory> component in <Suspense> — it streams in with real-time stock data. The page loads instantly (ISR shell) while inventory streams separately.",
  },
];

export default function RenderingQuiz() {
  return (
    <main className="py-5">
      <div className="container" style={{ maxWidth: "750px" }}>
        <Link href="/quiz" style={{ color: "#667eea", textDecoration: "none", fontSize: "0.9rem" }}>
          ← All Quizzes
        </Link>
        <h1 className="mt-3 mb-4" style={{ fontSize: "1.8rem", fontWeight: 800, color: "#fff" }}>
          ⚡ Rendering & Next.js Quiz
        </h1>
        <QuizEngine title="Rendering & Next.js" questions={questions} backHref="/quiz" />
      </div>
    </main>
  );
}
