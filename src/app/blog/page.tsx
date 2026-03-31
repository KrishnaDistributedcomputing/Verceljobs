"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const categories = [
  {
    title: "📖 SE Technical Study Guide",
    desc: "The complete 22-chapter deep-dive covering everything a Vercel SE needs to know — platform fundamentals to enterprise architecture.",
    link: "/blog/study-guide",
    badge: "Study Guide",
  },
  {
    title: "📰 Latest from Vercel Blog",
    desc: "Curated articles on AI agents, infrastructure, performance engineering, and product announcements from the official Vercel blog.",
    link: "/blog/articles",
    badge: "Articles",
  },
  {
    title: "🏢 Customer Stories & Use Cases",
    desc: "How companies like Stripe, Notion, Leonardo.AI, SERHANT., and Durable build and scale on Vercel.",
    link: "/blog/customers",
    badge: "Customers",
  },
  {
    title: "🏗️ Architecture Patterns",
    desc: "Composable commerce, multi-tenant SaaS, headless CMS, AI-powered apps — real-world architecture patterns on Vercel.",
    link: "/blog/architectures",
    badge: "Architectures",
  },
  {
    title: "💼 Jobs & Careers at Vercel",
    desc: "Current open positions at Vercel — Solutions Architects, Software Engineers, and more across US, EMEA, and APAC.",
    link: "/blog/jobs",
    badge: "Jobs",
  },
  {
    title: "🤖 AI & Developer Tools",
    desc: "AI SDK, AI Gateway, Chat SDK, v0, Sandbox, Workflow SDK — the full Vercel AI ecosystem and how to use it.",
    link: "/blog/ai-tools",
    badge: "AI & Tools",
  },
  {
    title: "☁️ Azure Engineer → Vercel",
    desc: "Complete migration guide for Azure engineers — service mapping, migration patterns, 6-week learning path, common pitfalls, and concept translations.",
    link: "/blog/azure-migration",
    badge: "Migration",
  },
  {
    title: "🎯 How Vercel Interviews",
    desc: "The complete interview guide — 6 stages, technical topics, sample questions, demo ideas, what they look for, compensation, and timeline.",
    link: "/blog/interview-guide",
    badge: "Interview",
  },
  {
    title: "🚀 Zero to Hero: SE Interview Prep",
    desc: "Structured 8-week program — from no Vercel knowledge to interview-ready SE. Daily tasks, weekly projects, answer templates, and readiness checklist.",
    link: "/blog/zero-to-hero",
    badge: "Zero to Hero",
  },
  {
    title: "🏗️ 10 Hosting Use Cases",
    desc: "Deep-dive architecture for 10 industries — e-commerce, media, SaaS, AI, fintech, healthcare, EdTech, and more. Rendering strategies, caching patterns, cost analysis, and 30 interview questions.",
    link: "/blog/use-cases",
    badge: "Use Cases",
  },
];

/* ── Searchable content index ── */
const searchIndex = [
  // Blog hub categories
  ...categories.map((c) => ({ title: c.title.replace(/^\S+\s/, ""), desc: c.desc, link: c.link, badge: c.badge, keywords: `${c.title} ${c.desc} ${c.badge}` })),

  // SE Resources pages
  { title: "Platform Fundamentals", desc: "The Vercel mental model, three compute runtimes, Fluid Compute, and Next.js rendering strategies.", link: "/se/platform-fundamentals", badge: "SE Resources", keywords: "platform fundamentals mental model serverless edge runtime fluid compute rendering SSG ISR SSR RSC vercel functions" },
  { title: "Infrastructure & Performance", desc: "Build pipeline, Turbopack, Edge Network, cache hierarchy, caching layers, and performance optimization.", link: "/se/infrastructure-performance", badge: "SE Resources", keywords: "infrastructure performance turbopack build pipeline edge network caching cache CDN stale-while-revalidate core web vitals LCP CLS FID INP TTFB" },
  { title: "Enterprise & Security", desc: "Security features, environment variables, compliance, enterprise features, and pricing plans.", link: "/se/enterprise-security", badge: "SE Resources", keywords: "enterprise security compliance SOC2 HIPAA GDPR PCI WAF firewall DDoS SAML SSO SCIM audit logs pricing pro enterprise" },
  { title: "Advanced Topics", desc: "AI Cloud tools, composable architecture, customer patterns, and migration playbooks.", link: "/se/advanced-topics", badge: "SE Resources", keywords: "advanced topics AI cloud composable architecture migration playbook customer patterns v0 AI SDK AI gateway workflows sandbox" },

  // Platform Fundamentals sub-pages
  { title: "Mental Model — Four Layers", desc: "Vercel's four-layer platform architecture: Developer Experience, Compute, Edge Network, and AI Cloud.", link: "/se/platform-fundamentals/mental-model", badge: "Platform Deep Dive", keywords: "mental model four layers developer experience DX compute edge network AI cloud architecture git push preview deployment" },
  { title: "Compute Runtimes", desc: "Edge Runtime vs Serverless (Node.js) — side-by-side comparison, use cases, code examples, and decision guide.", link: "/se/platform-fundamentals/compute-runtimes", badge: "Platform Deep Dive", keywords: "compute runtimes edge runtime serverless node.js V8 isolates cold start middleware API routes database" },
  { title: "Fluid Compute", desc: "Shared instances, active CPU pricing, bytecode caching, error isolation — the 2025 game changer.", link: "/se/platform-fundamentals/fluid-compute", badge: "Platform Deep Dive", keywords: "fluid compute shared instances active CPU pricing bytecode caching error isolation cost savings billing AI streaming" },

  // Quiz topics
  { title: "Platform Quiz", desc: "20 questions on Vercel platform fundamentals, runtimes, and architecture.", link: "/quiz/platform", badge: "Quiz", keywords: "quiz platform questions test practice" },
  { title: "Rendering Quiz", desc: "20 questions on SSG, ISR, SSR, RSC, and Next.js rendering strategies.", link: "/quiz/rendering", badge: "Quiz", keywords: "quiz rendering SSG ISR SSR RSC questions test" },
  { title: "Caching Quiz", desc: "20 questions on caching layers, CDN, stale-while-revalidate, and cache invalidation.", link: "/quiz/caching", badge: "Quiz", keywords: "quiz caching cache CDN stale-while-revalidate revalidateTag questions test" },
  { title: "Performance Quiz", desc: "20 questions on Core Web Vitals, LCP, CLS, INP, TTFB, and optimization.", link: "/quiz/performance", badge: "Quiz", keywords: "quiz performance Core Web Vitals LCP CLS INP TTFB optimization questions test" },
  { title: "AI Quiz", desc: "20 questions on AI SDK, AI Gateway, v0, Workflows, and Vercel's AI ecosystem.", link: "/quiz/ai", badge: "Quiz", keywords: "quiz AI SDK gateway v0 workflows sandbox questions test" },
  { title: "Enterprise Quiz", desc: "20 questions on enterprise features, security, compliance, and pricing.", link: "/quiz/enterprise", badge: "Quiz", keywords: "quiz enterprise security compliance pricing WAF SOC2 questions test" },
  { title: "Scenarios Quiz", desc: "20 scenario-based questions for SE interview preparation.", link: "/quiz/scenarios", badge: "Quiz", keywords: "quiz scenarios interview architecture design questions test" },

  // Key topic pages
  { title: "E-Commerce Architecture", desc: "Headless e-commerce with ISR product pages, SSR checkout, Edge Middleware for geo-pricing.", link: "/blog/use-cases", badge: "Use Cases", keywords: "e-commerce headless shopify commercetools ISR product pages checkout cart geo-pricing" },
  { title: "Media & Publishing", desc: "News platform with 1M+ articles, real-time breaking news, CMS webhooks, ad monetization.", link: "/blog/use-cases", badge: "Use Cases", keywords: "media publishing news articles CMS sanity contentful webhooks ISR breaking news" },
  { title: "SaaS Dashboard", desc: "Multi-tenant SaaS with public marketing site, authenticated dashboard, and API layer.", link: "/blog/use-cases", badge: "Use Cases", keywords: "SaaS dashboard multi-tenant authentication RBAC postgres API monorepo" },
  { title: "AI Application", desc: "AI chatbot with streaming, AI SDK, Fluid Compute, AI Gateway, durable workflows.", link: "/blog/use-cases", badge: "Use Cases", keywords: "AI application chatbot streaming LLM openai anthropic claude GPT streamText useChat gateway" },
  { title: "Financial Services Portal", desc: "Banking portal with WAF, HIPAA, PCI DSS, SOC 2 compliance, real-time data.", link: "/blog/use-cases", badge: "Use Cases", keywords: "financial services banking portal WAF HIPAA PCI compliance security real-time" },
  { title: "Healthcare Patient Portal", desc: "HIPAA-compliant healthcare portal with EHR integration, telehealth, and accessibility.", link: "/blog/use-cases", badge: "Use Cases", keywords: "healthcare patient portal HIPAA EHR telehealth FHIR accessibility WCAG" },
];

function BlogContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.trim().toLowerCase() || "";

  const results = query
    ? searchIndex.filter((item) => {
        const haystack = `${item.title} ${item.desc} ${item.keywords}`.toLowerCase();
        return query.split(/\s+/).every((word) => haystack.includes(word));
      })
    : [];

  return (
    <main className="py-5">
      <div className="container" style={{ maxWidth: "1100px" }}>
        <div className="text-center mb-5">
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: 800,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "1rem",
            }}
          >
            Blog & Resources
          </h1>
          <p style={{ color: "#94a3b8", maxWidth: "650px", margin: "0 auto" }}>
            Everything you need to prepare for a Vercel SE role — study guides,
            architecture patterns, customer stories, career opportunities, and the latest from the Vercel ecosystem.
          </p>
        </div>

        {/* ─── Search Results ─── */}
        {query && (
          <div className="mb-5">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h2 style={{ color: "#e2e8f0", fontSize: "1.2rem", fontWeight: 700, margin: 0 }}>
                🔍 Results for &ldquo;{searchParams.get("q")}&rdquo;
                <span style={{ color: "#64748b", fontSize: "0.85rem", fontWeight: 400, marginLeft: "0.5rem" }}>
                  ({results.length} found)
                </span>
              </h2>
              <Link href="/blog" style={{ color: "#667eea", fontSize: "0.85rem", textDecoration: "none" }}>
                Clear search ✕
              </Link>
            </div>

            {results.length === 0 ? (
              <div style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px",
                padding: "2rem",
                textAlign: "center",
              }}>
                <p style={{ color: "#94a3b8", fontSize: "1rem", marginBottom: "0.5rem" }}>
                  No results found for &ldquo;{searchParams.get("q")}&rdquo;
                </p>
                <p style={{ color: "#64748b", fontSize: "0.85rem", marginBottom: 0 }}>
                  Try searching for: <em>ISR</em>, <em>edge runtime</em>, <em>fluid compute</em>, <em>AI SDK</em>, <em>caching</em>, <em>enterprise</em>, <em>quiz</em>
                </p>
              </div>
            ) : (
              <div className="d-flex flex-column gap-2">
                {results.map((r, i) => (
                  <Link key={`${r.link}-${i}`} href={r.link} style={{ textDecoration: "none" }}>
                    <div style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "10px",
                      padding: "1rem 1.25rem",
                      transition: "all 0.2s",
                    }}
                    className="search-result-card"
                    >
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <span style={{
                          background: "rgba(102,126,234,0.15)",
                          color: "#818cf8",
                          padding: "0.1rem 0.5rem",
                          borderRadius: "10px",
                          fontSize: "0.7rem",
                          fontWeight: 600,
                        }}>
                          {r.badge}
                        </span>
                        <span style={{ color: "#64748b", fontSize: "0.75rem" }}>{r.link}</span>
                      </div>
                      <h4 style={{ color: "#e2e8f0", fontSize: "1rem", fontWeight: 700, marginBottom: "0.2rem" }}>{r.title}</h4>
                      <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.5, marginBottom: 0 }}>{r.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <hr style={{ borderColor: "rgba(255,255,255,0.08)", margin: "2rem 0" }} />
          </div>
        )}

        {/* ─── Category Cards ─── */}
        <div className="row g-4">
          {categories.map((cat) => (
            <div key={cat.title} className="col-md-6">
              <Link href={cat.link} style={{ textDecoration: "none" }}>
                <div className="feature-card">
                  <span
                    style={{
                      background: "rgba(102,126,234,0.15)",
                      color: "#818cf8",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "12px",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                    }}
                  >
                    {cat.badge}
                  </span>
                  <h3 className="mt-3" style={{ fontSize: "1.2rem" }}>{cat.title}</h3>
                  <p style={{ marginBottom: 0 }}>{cat.desc}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={
      <main className="py-5">
        <div className="container text-center" style={{ maxWidth: "1100px" }}>
          <p style={{ color: "#94a3b8" }}>Loading...</p>
        </div>
      </main>
    }>
      <BlogContent />
    </Suspense>
  );
}
