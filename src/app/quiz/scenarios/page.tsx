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
