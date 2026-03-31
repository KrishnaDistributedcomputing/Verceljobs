"use client";

import Link from "next/link";
import { QuizEngine, Question } from "../QuizEngine";

const questions: Question[] = [
  {
    id: 1,
    question: "A CTO says 'We're already on AWS — why add Vercel?' What's your best response?",
    options: [
      "Vercel replaces AWS entirely",
      "Vercel is the frontend platform layer — it complements AWS for the presentation tier with global edge delivery, preview deployments, and framework-optimized infrastructure",
      "Vercel is cheaper than AWS for all workloads",
      "You should migrate everything off AWS first",
    ],
    correct: 1,
    explanation: "Vercel doesn't replace AWS — it's the presentation layer. Backend stays on AWS. Vercel handles global edge delivery, preview deploys, framework-aware caching, and zero-config CI/CD. Composable architecture.",
  },
  {
    id: 2,
    question: "A customer's e-commerce site has an LCP of 4.2s. What's your diagnostic approach?",
    options: [
      "Tell them to buy faster servers",
      "Check hero image optimization, TTFB from SSR, render-blocking resources, then recommend next/image with priority, ISR for static speed, and preconnect hints",
      "Suggest they switch to a different framework",
      "Recommend removing all images from the homepage",
    ],
    correct: 1,
    explanation: "Systematic approach: 1) Check if hero image uses next/image with priority. 2) Check if the page is SSR when it could be ISR (slow TTFB). 3) Look for render-blocking resources. 4) Add preconnect for third-party origins. Target: ≤ 2.5s.",
  },
  {
    id: 3,
    question: "Design the architecture for a headless e-commerce site on Vercel serving 50 countries.",
    options: [
      "Single SSR page for everything, deployed to one region",
      "SSG homepage + ISR product pages + SSR checkout + Edge Middleware for geo-routing/A/B testing + CMS webhooks for revalidation",
      "Client-side rendered SPA with a CDN in front",
      "Separate deployments per country",
    ],
    correct: 1,
    explanation: "Best pattern: ISR for product/collection pages (static speed, webhook revalidation). SSR only for checkout/auth. Edge Middleware handles geo-routing (localization), A/B testing. CMS webhooks trigger targeted revalidation. Global CDN handles the rest.",
  },
  {
    id: 4,
    question: "How would you incrementally migrate a monolithic PHP site with 200 routes to Vercel?",
    options: [
      "Rewrite the entire site in Next.js before deploying",
      "Use Vercel rewrites to proxy unmigrated routes to the PHP backend while migrating routes one at a time to Next.js",
      "Run PHP on Vercel's serverless functions",
      "Tell the customer it's impossible and they should stay on PHP",
    ],
    correct: 1,
    explanation: "Incremental migration using Vercel rewrites: deploy Next.js to Vercel, configure rewrites in vercel.json to proxy unmigrated routes to the existing PHP backend. Migrate high-value routes first. Coexistence pattern.",
  },
  {
    id: 5,
    question: "A customer's security team is concerned about using Vercel. What features do you highlight?",
    options: [
      "Tell them security isn't Vercel's focus",
      "SOC 2 Type II, managed WAF, DDoS protection, SAML SSO, deployment protection, trusted IPs, audit logs, HIPAA/GDPR compliance, environment variable encryption",
      "Just show them the pricing page",
      "Tell them to keep security on their existing infrastructure",
    ],
    correct: 1,
    explanation: "Vercel's security story: SOC 2 Type II audit, managed WAF (OWASP Top 10), automatic DDoS mitigation, SAML SSO + SCIM, deployment protection (password/IP/auth), audit logs, HIPAA BAA, GDPR/EU data residency, encrypted env vars.",
  },
  {
    id: 6,
    question: "A customer's engineering team says ISR pages are showing stale data for too long. What do you recommend?",
    options: [
      "Switch everything to SSR",
      "Implement on-demand revalidation with CMS webhooks + revalidateTag() instead of purely time-based revalidation",
      "Reduce the revalidate interval to 1 second",
      "Disable all caching",
    ],
    correct: 1,
    explanation: "The fix: move from time-based ISR (revalidate: 3600) to on-demand revalidation. Set up CMS webhooks that call a Next.js API route to revalidateTag() or revalidatePath(). Content updates reflect within seconds of publish.",
  },
  {
    id: 7,
    question: "You're running a POC and the customer hits a platform limitation. What's your response?",
    options: [
      "Tell them Vercel can't help",
      "Document the limitation clearly, propose a workaround, engage Vercel Product/Engineering for feedback, and provide a timeline if the feature is on the roadmap",
      "Ignore it and focus on other features",
      "Ask them to file a support ticket and wait",
    ],
    correct: 1,
    explanation: "SE response: 1) Document clearly. 2) Propose workaround. 3) Engage Product/Eng (Voice of Customer). 4) If on roadmap, share timeline. 5) Be honest — customers respect transparency about limitations more than hand-waving.",
  },
  {
    id: 8,
    question: "What's the composable architecture pattern, and why does Vercel emphasize it?",
    options: [
      "Microservices running on Kubernetes",
      "Frontend on Vercel connects to best-in-class SaaS backends (headless CMS, commerce, auth, payments) — Vercel is the presentation layer",
      "A monolithic application broken into components",
      "Using multiple CSS frameworks together",
    ],
    correct: 1,
    explanation: "Composable architecture: Next.js on Vercel as the presentation layer, connecting to best-in-class SaaS backends — headless CMS (Sanity, Contentful), commerce (Shopify), auth (Clerk), payments (Stripe). Vercel positions as the glue.",
  },
  {
    id: 9,
    question: "A customer asks to migrate from self-hosted Next.js on AWS to Vercel. What do they gain?",
    options: [
      "Nothing — it's the same",
      "Globally distributed ISR, preview deployments, zero-config CI/CD, Skew Protection, automatic image optimization, and CDN edge caching",
      "Only faster build times",
      "Only cost savings",
    ],
    correct: 1,
    explanation: "Self-hosted Next.js misses: ISR is single-region (not global CDN), no preview deployments, manual CI/CD, no Skew Protection, manual image optimization. Migration is usually zero code changes — just point DNS.",
  },
  {
    id: 10,
    question: "How would you structure a 45-minute technical workshop for 20 engineers new to Vercel?",
    options: [
      "Read through documentation slides for 45 minutes",
      "10min: live deploy from git push + preview URL. 15min: build an ISR page with CMS webhook. 10min: add Edge Middleware (A/B test). 10min: Q&A with architecture discussion",
      "Show marketing videos for 45 minutes",
      "Assign homework and end the meeting early",
    ],
    correct: 1,
    explanation: "Best workshop structure: show, don't tell. Live code a deploy (wow moment), build something real with ISR (practical), add Middleware (edge value), close with architecture Q&A. Every minute should be hands-on or interactive.",
  },
  {
    id: 11,
    question: "A customer's engineering team puts 'use client' on every component. What code audit feedback do you give?",
    options: [
      "That's fine — it's the safest approach",
      "Only mark components with 'use client' that truly need interactivity (useState, useEffect, onClick). Default Server Components for data fetching — this reduces JS bundle, improves LCP, and lowers costs",
      "Remove all 'use client' directives",
      "Tell them to use Pages Router instead",
    ],
    correct: 1,
    explanation: "Red flag: blanket 'use client' defeats React Server Components. Audit approach: identify components that actually need interactivity. Move data fetching to Server Components (zero JS shipped). Push 'use client' down the component tree as far as possible.",
  },
  {
    id: 12,
    question: "A Gatsby site needs to migrate to Vercel. What's the migration path?",
    options: [
      "Deploy Gatsby directly on Vercel without changes",
      "Gatsby's GraphQL data layer → Server Components with direct data fetching. Gatsby static gen → Next.js SSG/ISR. Gatsby plugins → Next.js equivalents or direct integrations",
      "Rewrite the entire site in Vue.js",
      "There's no migration path — Gatsby is incompatible",
    ],
    correct: 1,
    explanation: "Gatsby → Next.js migration: replace GraphQL data layer with Server Component direct data fetching, static generation with Next.js SSG/ISR (more flexible), and Gatsby plugins with Next.js equivalents. Incremental route-by-route migration works best.",
  },
  {
    id: 13,
    question: "A customer says their Vercel bill jumped 300% this month. What do you investigate first?",
    options: [
      "Check if they added new team members",
      "Check Edge Requests, Active CPU, Fast Data Transfer, ISR revalidation frequency, and AI streaming duration — the top 5 cost drivers",
      "Recommend they switch to Hobby plan",
      "Check their DNS configuration",
    ],
    correct: 1,
    explanation: "Top cost drivers to check: 1) Edge Requests (every CDN hit, including static assets). 2) Active CPU (compute-heavy tasks). 3) Fast Data Transfer (large assets). 4) ISR revalidation frequency. 5) AI streaming duration. Usually one of these spiked.",
  },
  {
    id: 14,
    question: "A CRA (Create React App) site needs to migrate to Next.js on Vercel. What's the phase 1 approach?",
    options: [
      "Rewrite everything from scratch in one sprint",
      "Add Next.js alongside CRA, migrate routes one by one — starting with highest-traffic pages. Both can coexist during migration",
      "Convert CRA to a static site generator",
      "Keep CRA and just add Vercel hosting",
    ],
    correct: 1,
    explanation: "CRA is end-of-life. Incremental migration: add Next.js alongside CRA. Migrate routes one by one (start with login, dashboard, homepage). Identify SSG vs ISR vs SSR per route. Replace API calls with Server Components. Add Middleware for auth.",
  },
  {
    id: 15,
    question: "You discover a customer has API routes in `pages/api` and Server Components in `app/`. What do you recommend?",
    options: [
      "Keep both — they work fine together",
      "Migrate `pages/api` routes to App Router Route Handlers (`app/api/*/route.ts`) for consistency and to take advantage of new features like streaming",
      "Move Server Components back to Pages Router",
      "Delete all API routes",
    ],
    correct: 1,
    explanation: "While pages/api and app/ coexist, recommend migrating to App Router Route Handlers for: consistent routing patterns, streaming responses, better typing, and avoiding the split-brain of two routing systems. It's a common code audit finding.",
  },
  {
    id: 16,
    question: "A customer's preview deployments are accessible to the public. What Enterprise features fix this?",
    options: [
      "There's no way to protect previews",
      "Deployment Protection: password-protect previews, restrict to Vercel Auth (team only), or limit by Trusted IPs/CIDR ranges",
      "Only use private Git repositories",
      "Disable preview deployments entirely",
    ],
    correct: 1,
    explanation: "Enterprise Deployment Protection offers three layers: 1) Password protection for specific previews. 2) Vercel Authentication (only team members). 3) Trusted IPs/CIDR ranges. Prevents unauthorized access to pre-production features.",
  },
  {
    id: 17,
    question: "A customer has large images (5-10MB each) served through Vercel CDN. What's your cost optimization advice?",
    options: [
      "It's fine — Vercel CDN handles large files well",
      "Use next/image for automatic optimization (WebP/AVIF, responsive sizes) and consider a dedicated media CDN (Cloudinary, Mux) for video/large assets to reduce Fast Data Transfer costs",
      "Store images in the Git repository",
      "Compress all images to JPEG quality 10",
    ],
    correct: 1,
    explanation: "Large assets drive Fast Data Transfer costs ($0.15/GB overage). Fixes: 1) next/image auto-converts to WebP/AVIF (30-50% smaller). 2) Offload video/large media to Cloudinary or Mux. 3) Responsive images serve smaller sizes to mobile devices.",
  },
  {
    id: 18,
    question: "During a POC, the customer asks about OpenTelemetry support. What do you tell them?",
    options: [
      "Vercel doesn't support observability",
      "Since Vercel Ship 2025, Vercel supports OpenTelemetry for standardized traces and spans. Enterprise Log Drains stream to Datadog, New Relic, Axiom, Splunk",
      "They need to use a third-party proxy",
      "OpenTelemetry is only in beta",
    ],
    correct: 1,
    explanation: "Vercel supports OpenTelemetry natively since Ship 2025. Instrument Server Components and API routes with traces/spans. Enterprise Log Drains stream to existing observability stacks (Datadog, New Relic, Axiom, Splunk, Elastic).",
  },
  {
    id: 19,
    question: "A customer's third-party fonts load via <link> tags causing CLS. What's the Next.js fix?",
    options: [
      "Add more <link> tags with preload",
      "Replace external font links with next/font — it downloads and self-hosts fonts at build time, inlining CSS for zero CLS and zero FOUT",
      "Use system fonts only",
      "Increase the font-display timeout",
    ],
    correct: 1,
    explanation: "Code audit red flag: <link> tags for Google Fonts cause CLS from font swapping. Replace with next/font: downloads at build time, self-hosts, inlines CSS. Zero external request, zero FOUT (Flash of Unstyled Text), zero CLS.",
  },
  {
    id: 20,
    question: "A customer asks: 'How does Vercel compare to Netlify for an enterprise headless CMS architecture?' What key differentiators do you highlight?",
    options: [
      "They're essentially identical",
      "Vercel's framework-defined infrastructure, Fluid Compute for AI, globally distributed ISR, Skew Protection, built-in AI SDK/Gateway, and deeper Next.js optimization — since Vercel created Next.js",
      "Netlify is always better for enterprise",
      "Only mention pricing differences",
    ],
    correct: 1,
    explanation: "Key differentiators: 1) FDI — framework defines infrastructure automatically. 2) Fluid Compute — no competitor has this (AI cost savings). 3) ISR distributed globally (Netlify's ISR is newer). 4) Skew Protection. 5) AI Cloud layer. 6) Vercel created Next.js — deepest optimization.",
  },
];

export default function ScenariosQuiz() {
  return (
    <main className="py-5">
      <div className="container" style={{ maxWidth: "750px" }}>
        <Link href="/quiz" style={{ color: "#667eea", textDecoration: "none", fontSize: "0.9rem" }}>
          ← All Quizzes
        </Link>
        <h1 className="mt-3 mb-4" style={{ fontSize: "1.8rem", fontWeight: 800, color: "#fff" }}>
          🏢 Customer Scenarios Quiz
        </h1>
        <QuizEngine title="Customer Scenarios" questions={questions} backHref="/quiz" />
      </div>
    </main>
  );
}
