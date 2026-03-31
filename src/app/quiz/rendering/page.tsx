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
