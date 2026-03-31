"use client";

import Link from "next/link";
import { QuizEngine, Question } from "../QuizEngine";

const questions: Question[] = [
  {
    id: 1,
    question: "What is LCP (Largest Contentful Paint) and what's the target?",
    options: [
      "Time to first byte — target ≤ 800ms",
      "Time until the largest image or text block is visible — target ≤ 2.5s",
      "Time until all content is interactive — target ≤ 3.0s",
      "Time to first paint of any pixel — target ≤ 1.0s",
    ],
    correct: 1,
    explanation: "LCP measures when the largest content element (hero image, heading) becomes visible. Google's target is ≤ 2.5s. On Vercel, use next/image with priority, preconnect, and next/font to optimize.",
  },
  {
    id: 2,
    question: "What replaced FID as a Core Web Vital in 2024?",
    options: ["TBT (Total Blocking Time)", "INP (Interaction to Next Paint)", "TTI (Time to Interactive)", "FCP (First Contentful Paint)"],
    correct: 1,
    explanation: "INP (Interaction to Next Paint) replaced FID in March 2024. It measures how fast the browser responds to user input — target ≤ 200ms. Fix by reducing client JS, code splitting, and deferring scripts.",
  },
  {
    id: 3,
    question: "How does next/image help with CLS (Cumulative Layout Shift)?",
    options: [
      "It removes all images from the page",
      "It automatically sets width/height to reserve space, preventing layout shifts",
      "It converts all images to SVG format",
      "It loads images before any HTML renders",
    ],
    correct: 1,
    explanation: "next/image automatically reserves space based on width/height props, preventing the layout from shifting when images load. It also converts to WebP, lazy-loads off-screen images, and serves responsive sizes.",
  },
  {
    id: 4,
    question: "What does Edge Middleware run on, and where does it execute?",
    options: [
      "Node.js containers in a single region",
      "V8 isolates at CDN Points of Presence, before routing",
      "Browser service workers on the client",
      "Docker containers in the closest AWS region",
    ],
    correct: 1,
    explanation: "Edge Middleware runs on V8 isolates at CDN PoPs (100+ locations globally), executing before routing. It's ideal for auth checks, geo-routing, A/B testing, and bot detection — with near-zero latency.",
  },
  {
    id: 5,
    question: "Which Middleware use case is most common in enterprise deployments?",
    options: [
      "Database queries for each request",
      "Authentication/authorization checks before routing to protected pages",
      "Image resizing on-the-fly",
      "Websocket connection management",
    ],
    correct: 1,
    explanation: "Auth checks in Middleware are the most common enterprise use case. Check session token → redirect to /login if invalid. Runs at the edge so it's incredibly fast and blocks unauthorized access before any page renders.",
  },
  {
    id: 6,
    question: "What is Vercel's Skew Protection?",
    options: [
      "Protection against data being skewed in databases",
      "Routing requests to the deployment version that served the original HTML, preventing version mismatch",
      "A feature that prevents CSS layout skew on mobile devices",
      "Rate limiting to prevent traffic spikes from skewing metrics",
    ],
    correct: 1,
    explanation: "During deployments, users may have old JS while the server runs new code — version skew. Skew Protection routes requests to the matching deployment version. Strong enterprise selling point (Pro + Enterprise).",
  },
  {
    id: 7,
    question: "A customer's INP is 450ms. What's the most likely cause?",
    options: [
      "Slow network connection",
      "Large JavaScript bundles blocking the main thread and too many Client Components",
      "Server-side rendering delay",
      "DNS resolution taking too long",
    ],
    correct: 1,
    explanation: "Poor INP (>200ms target) usually means main thread is blocked by heavy JS. Fix: move Client Components down the tree, code-split with dynamic(), defer third-party scripts, and reduce unnecessary hydration.",
  },
  {
    id: 8,
    question: "What does the 'priority' prop on next/image do?",
    options: [
      "Makes the image load with higher network priority",
      "Disables lazy loading for above-the-fold images, loading them immediately with preload hints",
      "Increases image resolution",
      "Moves the image to the top of the DOM",
    ],
    correct: 1,
    explanation: "priority disables lazy loading and adds a preload link hint, ensuring the image loads immediately. Use it for the LCP element (hero images, main product images) — never for below-fold images.",
  },
  {
    id: 9,
    question: "How does next/font improve Core Web Vitals?",
    options: [
      "It uses smaller font files",
      "It inlines font CSS at build time — zero layout shift, no flash of unstyled text",
      "It limits the number of fonts you can use",
      "It converts all fonts to system fonts",
    ],
    correct: 1,
    explanation: "next/font downloads and self-hosts Google Fonts at build time, inlining the CSS. This eliminates: the network request, the flash of unstyled text (FOUT), and CLS from font swapping.",
  },
  {
    id: 10,
    question: "What is Turbopack, and what performance improvement does it claim?",
    options: [
      "A CSS preprocessor — 10× faster than Sass",
      "A Rust-based bundler — up to 700× faster cold builds than webpack, 10× faster HMR",
      "A database optimizer — 100× faster queries",
      "A network protocol — 50× faster than HTTP/2",
    ],
    correct: 1,
    explanation: "Turbopack is Vercel's Rust-based bundler replacing webpack. Up to 700× faster cold builds, 10× faster HMR. It uses incremental computation — only rebuilds what changed. Stable in Next.js 15 for dev.",
  },
  {
    id: 11,
    question: "What is the CLS target threshold according to Core Web Vitals?",
    options: ["< 0.05", "< 0.1", "< 0.25", "< 0.5"],
    correct: 1,
    explanation: "CLS (Cumulative Layout Shift) measures visual stability — how much content shifts during load. The target is < 0.1. Common causes: images without width/height, fonts loading after text renders, dynamically injected content.",
  },
  {
    id: 12,
    question: "How does next/font eliminate CLS from font loading?",
    options: [
      "It uses system fonts as a fallback",
      "It downloads and self-hosts fonts at build time, inlining the CSS — zero network request, zero FOUT, zero CLS",
      "It preloads fonts at runtime",
      "It only uses local font files",
    ],
    correct: 1,
    explanation: "next/font downloads Google Fonts at build time, self-hosts them, and inlines the CSS. This eliminates: the external network request to fonts.googleapis.com, the Flash of Unstyled Text (FOUT), and CLS from font swapping.",
  },
  {
    id: 13,
    question: "What does Vercel's Edge Network cache hierarchy look like?",
    options: [
      "User → Cloudflare → AWS → Database",
      "User → Edge PoP Cache (ms) → Regional Function Cache (10-50ms) → Origin Function (100ms+)",
      "User → Browser → Server → CDN",
      "User → DNS → Load Balancer → Origin",
    ],
    correct: 1,
    explanation: "The hierarchy: User → Edge PoP Cache (sub-10ms, cache hit) → Regional Function Cache (10-50ms, L2 cache) → Origin Function (100ms+, cache miss requiring compute). Each layer reduces load on the next.",
  },
  {
    id: 14,
    question: "What is the TTFB target according to Core Web Vitals?",
    options: ["< 200ms", "< 500ms", "< 800ms", "< 1.5s"],
    correct: 2,
    explanation: "TTFB (Time to First Byte) should be < 800ms. It measures server response time. Poor TTFB usually indicates: slow SSR, waterfall database queries, or serving from a single distant region instead of global CDN.",
  },
  {
    id: 15,
    question: "A customer's FCP is 4.5s. What next/image feature should they enable for the hero image?",
    options: [
      "lazy loading (default)",
      "The 'priority' prop — disables lazy loading and adds a preload hint for above-the-fold images",
      "The 'quality' prop set to 100",
      "The 'placeholder' prop set to 'blur'",
    ],
    correct: 1,
    explanation: "The priority prop disables lazy loading and adds a <link rel='preload'> hint, ensuring the hero image loads immediately. This directly improves LCP/FCP. Never use priority on below-the-fold images — only the LCP element.",
  },
  {
    id: 16,
    question: "Why should third-party scripts use `next/script` with `strategy='lazyOnload'`?",
    options: [
      "It makes scripts run faster",
      "It defers script loading until after the page is interactive — preventing main thread blocking and improving INP",
      "It loads scripts from Vercel's CDN",
      "It's required for compliance",
    ],
    correct: 1,
    explanation: "Third-party scripts (analytics, ads, chat widgets) often block the main thread. next/script with lazyOnload defers them until after hydration, keeping the main thread free for user interactions — directly improving INP.",
  },
  {
    id: 17,
    question: "What does next/image's automatic WebP/AVIF conversion do for performance?",
    options: [
      "It increases image quality",
      "It reduces image file sizes by 30-50% compared to JPEG/PNG while maintaining visual quality, reducing data transfer",
      "It makes images load without JavaScript",
      "It enables SVG rendering for all images",
    ],
    correct: 1,
    explanation: "next/image automatically serves modern formats (WebP/AVIF) which are 30-50% smaller than JPEG/PNG. It also serves responsive sizes based on the device viewport. This reduces Fast Data Transfer costs and improves LCP.",
  },
  {
    id: 18,
    question: "What is the Edge Middleware size limit, and why?",
    options: [
      "100KB — to keep Lambda cold starts fast",
      "1MB — to keep V8 isolate cold starts near-zero at CDN PoPs",
      "5MB — same as serverless functions",
      "No limit — it depends on the plan",
    ],
    correct: 1,
    explanation: "Middleware has a 1MB size limit because it runs on V8 isolates at CDN PoPs and must start near-instantly on every request. Large bundles would defeat the purpose of edge execution. Keep middleware lean.",
  },
  {
    id: 19,
    question: "Amazon found that every 100ms of latency costs what in sales?",
    options: ["0.1%", "0.5%", "1%", "5%"],
    correct: 2,
    explanation: "Amazon's famous study found every 100ms of latency costs 1% in sales. Google also found 53% of mobile users abandon sites taking >3 seconds. These business metrics make Core Web Vitals critical in SE conversations.",
  },
  {
    id: 20,
    question: "How does code splitting with dynamic() imports improve INP?",
    options: [
      "It loads all code faster",
      "It splits large components into separate chunks loaded on-demand — reducing initial JS bundle and freeing the main thread for user interactions",
      "It enables server-side rendering for dynamic components",
      "It compresses JavaScript files",
    ],
    correct: 1,
    explanation: "dynamic() (Next.js wrapper for React.lazy) splits heavy components into separate chunks. They load only when needed — not on initial page load. Less JS on the main thread = faster response to user interactions = better INP.",
  },
];

export default function PerformanceQuiz() {
  return (
    <main className="py-5">
      <div className="container" style={{ maxWidth: "750px" }}>
        <Link href="/quiz" style={{ color: "#667eea", textDecoration: "none", fontSize: "0.9rem" }}>
          ← All Quizzes
        </Link>
        <h1 className="mt-3 mb-4" style={{ fontSize: "1.8rem", fontWeight: 800, color: "#fff" }}>
          🌐 Edge & Performance Quiz
        </h1>
        <QuizEngine title="Edge & Performance" questions={questions} backHref="/quiz" />
      </div>
    </main>
  );
}
