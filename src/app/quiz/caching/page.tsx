"use client";

import Link from "next/link";
import { QuizEngine, Question } from "../QuizEngine";

const questions: Question[] = [
  {
    id: 1,
    question: "What are the four cache layers in Vercel's caching architecture?",
    options: [
      "DNS, CDN, Server, Database",
      "Browser Cache, Edge Cache, Data Cache, Full Route Cache",
      "L1 CPU, L2 Memory, L3 Disk, L4 Network",
      "Client, Proxy, Origin, Storage",
    ],
    correct: 1,
    explanation: "Vercel has four layers: Browser Cache (client-side), Edge Cache (CDN PoPs), Data Cache (Next.js fetch() cache per-function), and Full Route Cache (rendered HTML on CDN).",
  },
  {
    id: 2,
    question: "What does revalidateTag('products') do?",
    options: [
      "Deletes all products from the database",
      "Invalidates all cached fetch() calls tagged with 'products', triggering regeneration",
      "Rebuilds the entire site with updated product data",
      "Clears the browser cache for product pages",
    ],
    correct: 1,
    explanation: "revalidateTag() invalidates all fetch() calls that were tagged with the specified tag. When combined with CMS webhooks, this enables targeted on-demand revalidation without rebuilding the whole site.",
  },
  {
    id: 3,
    question: "Why is 'fetch() in a Client Component' an anti-pattern?",
    options: [
      "Client Components can't use fetch()",
      "It bypasses server-side caching and can expose API keys in the browser",
      "fetch() is slower in Client Components",
      "Client Components can't handle async operations",
    ],
    correct: 1,
    explanation: "When you fetch() in a Client Component, you bypass Vercel's server-side Data Cache and potentially expose API keys. Move data fetching to Server Components and pass data down as props.",
  },
  {
    id: 4,
    question: "What is the 'cache stampede' problem, and how does Vercel solve it?",
    options: [
      "Too many users visiting the login page — solved by rate limiting",
      "Many simultaneous requests for an expired ISR page, each triggering a function — solved by request collapsing",
      "CDN cache filling up too quickly — solved by automatic purging",
      "Database connections exhausting — solved by connection pooling",
    ],
    correct: 1,
    explanation: "When an ISR cache expires and many users request of the same page simultaneously, each could trigger its own backend call. Vercel prevents this with request collapsing: only one request per region invokes a function, the rest wait and get the cached response.",
  },
  {
    id: 5,
    question: "What is unstable_cache used for?",
    options: [
      "Caching experimental/beta features",
      "Caching non-fetch data sources (database queries, external APIs) with tags and revalidation",
      "Testing cache invalidation in development",
      "Caching middleware responses at the edge",
    ],
    correct: 1,
    explanation: "unstable_cache wraps non-fetch data sources (like database queries) in the same caching system as fetch(). It supports cache keys, revalidation intervals, and tag-based invalidation.",
  },
  {
    id: 6,
    question: "A customer has 'cache: no-store' on every fetch(). What's the impact?",
    options: [
      "Perfect security — no data leaks",
      "Every request hits the origin server — poor performance and high cost",
      "Pages load faster because there's no cache overhead",
      "No impact — this is the recommended default",
    ],
    correct: 1,
    explanation: "no-store on every fetch means zero caching — every request goes to origin. This kills performance (no CDN cache hits), increases costs (every request invokes a function), and overloads backend services.",
  },
  {
    id: 7,
    question: "How does the ISR + headless CMS webhook pattern work?",
    options: [
      "CMS sends new content directly to the CDN",
      "CMS publishes → webhook calls Next.js API route → revalidateTag/revalidatePath → cache is refreshed",
      "CMS rebuilds the entire Next.js site on every publish",
      "Next.js polls the CMS every 30 seconds for changes",
    ],
    correct: 1,
    explanation: "The webhook pattern: CMS publishes content → triggers a webhook to your Next.js API route → that route calls revalidateTag() or revalidatePath() → Vercel regenerates only the affected pages. No full rebuild needed.",
  },
  {
    id: 8,
    question: "What Cache-Control header enables stale-while-revalidate behavior?",
    options: [
      "Cache-Control: no-cache",
      "Cache-Control: s-maxage=3600, stale-while-revalidate=86400",
      "Cache-Control: max-age=0",
      "Cache-Control: private, must-revalidate",
    ],
    correct: 1,
    explanation: "s-maxage=3600 caches for 1 hour on CDN. stale-while-revalidate=86400 allows serving stale content for up to 1 day while fresh content is generated in the background.",
  },
  {
    id: 9,
    question: "Why is 'caching user-specific data' dangerous?",
    options: [
      "User data is too large for the cache",
      "User A can see User B's private data if the cache key doesn't include user identity",
      "Vercel doesn't allow caching user data",
      "It causes GDPR violations automatically",
    ],
    correct: 1,
    explanation: "If you cache personalized content without including the user ID in the cache key, one user's data gets served to another. Either add user ID to the cache key, use 'no-store', or move personalization to the client.",
  },
  {
    id: 10,
    question: "What's wrong with caching in Edge Middleware?",
    options: [
      "Edge Middleware doesn't support the Cache API",
      "Middleware runs on every request — it should be lightweight, not a caching layer",
      "Middleware can only return redirects, not cached content",
      "Edge caching requires Enterprise plan",
    ],
    correct: 1,
    explanation: "Edge Middleware runs on every request before routing. It should be fast and lightweight — auth checks, redirects, header manipulation. Heavy caching logic belongs in the Serverless/Fluid Compute layer.",
  },
  {
    id: 11,
    question: "What does the Full Route Cache store and where?",
    options: [
      "API response bodies in the browser",
      "The fully rendered HTML output of a page, stored on the CDN for near-instant delivery",
      "Only the data fetched by Server Components",
      "Client-side React component trees",
    ],
    correct: 1,
    explanation: "The Full Route Cache stores the complete rendered HTML on the CDN. For SSG and ISR pages, this means users get pre-rendered HTML in milliseconds. It's Layer 4 of Vercel's cache hierarchy.",
  },
  {
    id: 12,
    question: "How does Vercel's request collapsing work for ISR cache stampedes?",
    options: [
      "It blocks all requests until the cache is refreshed",
      "Only one request per region invokes the regeneration function; the rest wait and receive the new cached response",
      "It serves a 503 error to excess requests",
      "It round-robins requests to different regions",
    ],
    correct: 1,
    explanation: "When an ISR cache expires and many simultaneous requests hit the same route, Vercel collapses them: one request per region triggers the function. All other requests wait and receive the newly cached page. This prevents backend overload.",
  },
  {
    id: 13,
    question: "A customer uses `revalidatePath('/')` for every CMS update. What's the problem?",
    options: [
      "No problem — this is the recommended approach",
      "It only works for the homepage",
      "It invalidates ALL pages on the site — no targeting. They should use revalidateTag() for granular invalidation",
      "revalidatePath doesn't work with ISR",
    ],
    correct: 2,
    explanation: "revalidatePath('/') invalidates the entire site cache — extremely wasteful for a single content update. The fix: add tags to fetch() calls (e.g., `{next:{tags:['blog-post-123']}}`) and use revalidateTag('blog-post-123') for targeted invalidation.",
  },
  {
    id: 14,
    question: "What's the difference between `s-maxage` and `max-age` in Cache-Control headers?",
    options: [
      "They're identical — interchangeable",
      "s-maxage controls CDN/shared cache duration; max-age controls browser cache duration",
      "s-maxage is for static assets; max-age is for dynamic content",
      "max-age is for CDN; s-maxage is for browser",
    ],
    correct: 1,
    explanation: "s-maxage sets the TTL for shared caches (CDN/edge). max-age sets the TTL for the browser cache. For Vercel, you typically want s-maxage for CDN caching and a shorter max-age (or no max-age) for the browser.",
  },
  {
    id: 15,
    question: "What cache key components should you consider for personalized content?",
    options: [
      "Only the URL path",
      "URL path + user ID or session token to prevent one user seeing another's cached data",
      "URL path + timestamp",
      "The same cache key for everyone — personalization happens client-side",
    ],
    correct: 1,
    explanation: "For personalized content, the cache key MUST include user identity. Without it, User A's data gets served to User B. Alternatively: use no-store for user-specific data, or move personalization to Client Components.",
  },
  {
    id: 16,
    question: "How does the headless CMS + ISR + webhook pattern work end-to-end?",
    options: [
      "CMS directly updates the CDN cache",
      "CMS publishes → triggers webhook to Next.js API route → route calls revalidateTag() → Vercel regenerates affected pages → CDN updates globally",
      "CMS sends a full site rebuild trigger to Vercel",
      "CMS pushes content directly to Vercel's Data Cache",
    ],
    correct: 1,
    explanation: "The full pipeline: 1) Editor publishes in CMS. 2) CMS fires a webhook to your `/api/revalidate` route. 3) Route validates the webhook and calls `revalidateTag('blog-post-slug')`. 4) Vercel regenerates only affected pages. 5) Fresh content propagates globally.",
  },
  {
    id: 17,
    question: "A customer's site has cache: 'force-cache' on all fetches but data is still stale after a day. Why?",
    options: [
      "force-cache is broken in Next.js",
      "force-cache means cached indefinitely — it never automatically revalidates. They need either time-based revalidation or on-demand revalidation",
      "The CDN is ignoring the cache directive",
      "force-cache only works for 24 hours",
    ],
    correct: 1,
    explanation: "force-cache (the default) caches indefinitely — there's no automatic freshness check. The fix: add `{next:{revalidate:3600}}` for time-based freshness, or implement CMS webhooks calling revalidateTag() for on-demand updates.",
  },
  {
    id: 18,
    question: "What is the Browser Cache layer's role in Vercel's 4-layer cache architecture?",
    options: [
      "It's the primary cache for all Vercel content",
      "It stores assets locally on the user's device, controlled by Cache-Control headers — the fastest cache layer",
      "It only caches JavaScript bundles",
      "It's managed entirely by Vercel's CDN",
    ],
    correct: 1,
    explanation: "The Browser Cache (Layer 1) is the fastest — zero network requests. Controlled by Cache-Control max-age headers. For static assets (JS/CSS), Next.js sets long cache times with content hashes. Dynamic pages typically have shorter browser cache durations.",
  },
  {
    id: 19,
    question: "When should you use `unstable_cache` vs fetch() with cache options?",
    options: [
      "Always use fetch() — unstable_cache is deprecated",
      "Use unstable_cache for non-fetch data sources (database queries, SDK calls); use fetch() cache for HTTP requests",
      "They're interchangeable",
      "unstable_cache is only for Edge Runtime",
    ],
    correct: 1,
    explanation: "fetch() caching works for HTTP requests. For non-HTTP data sources (direct database queries via Prisma/Drizzle, third-party SDK calls), use unstable_cache to wrap them in the same caching system with tags and revalidation.",
  },
  {
    id: 20,
    question: "A customer's ISR pages revalidate every 10 seconds on a high-traffic site. What's the cost concern?",
    options: [
      "No cost concern — ISR is always cheap",
      "Each revalidation invokes a Vercel Function; with short intervals on high-traffic routes, function invocations multiply rapidly, increasing costs significantly",
      "ISR revalidation is free on all plans",
      "The only cost is CDN bandwidth",
    ],
    correct: 1,
    explanation: "Each ISR revalidation triggers a function invocation. A 10-second revalidation window on a popular route means ~8,640 function invocations/day for that route alone. Guide customers to use longer intervals with on-demand webhooks for freshness.",
  },
];

export default function CachingQuiz() {
  return (
    <main className="py-5">
      <div className="container" style={{ maxWidth: "750px" }}>
        <Link href="/quiz" style={{ color: "#667eea", textDecoration: "none", fontSize: "0.9rem" }}>
          ← All Quizzes
        </Link>
        <h1 className="mt-3 mb-4" style={{ fontSize: "1.8rem", fontWeight: 800, color: "#fff" }}>
          💾 Caching Deep-Dive Quiz
        </h1>
        <QuizEngine title="Caching Deep-Dive" questions={questions} backHref="/quiz" />
      </div>
    </main>
  );
}
