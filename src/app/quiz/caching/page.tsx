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
