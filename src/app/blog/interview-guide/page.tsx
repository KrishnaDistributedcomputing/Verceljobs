import Link from "next/link";

/* ── Interview Stages ── */
const stages = [
  {
    step: 1,
    title: "Application & Resume Screen",
    duration: "1–2 weeks",
    icon: "📄",
    desc: "Submit your application through vercel.com/careers. Include your resume (PDF under 3.5MB), LinkedIn, GitHub, and portfolio links. Vercel's recruiting team reviews for relevant experience in customer-facing technical roles, JavaScript/TypeScript proficiency, and modern web framework knowledge.",
    tips: [
      "Tailor your resume to highlight customer-facing technical work — demos, POCs, architecture design",
      "Include links to deployed projects, especially anything on Vercel or using Next.js",
      "Mention specific frameworks (Next.js, React, Node.js) and cloud platforms (AWS, Azure, GCP) by name",
      "If you have a GitHub with open-source contributions, make sure it's linked",
      "Quantify impact: 'Reduced LCP from 4.2s to 1.8s' beats 'Improved performance'",
    ],
  },
  {
    step: 2,
    title: "Recruiter Screen",
    duration: "30 minutes",
    icon: "📞",
    desc: "A video call with a recruiter to discuss your background, motivation for joining Vercel, and alignment with the role. They'll assess culture fit, communication skills, and verify your understanding of what Vercel does.",
    tips: [
      "Be ready to explain why Vercel — not just 'I like Next.js' but how the mission resonates",
      "Understand Vercel's products: the platform, v0, AI SDK, AI Gateway, Edge Network, Fluid Compute",
      "Know the difference between Vercel (platform) and Next.js (framework)",
      "Ask thoughtful questions about team structure, how SEs work with Sales, and growth opportunities",
      "Research recent Vercel announcements — FLORA, Chat SDK, Knowledge Agents, AI Gateway Reporting",
    ],
  },
  {
    step: 3,
    title: "Hiring Manager Interview",
    duration: "45–60 minutes",
    icon: "👤",
    desc: "A deeper conversation with the Field Engineering team lead. They'll probe your experience with enterprise customers, technical discovery, and your approach to solution architecture. Expect scenario-based questions about customer engagements.",
    tips: [
      "Prepare 2–3 stories using STAR format (Situation, Task, Action, Result) about customer wins",
      "Be ready to discuss a complex technical deal you've worked on — the architecture, stakeholders, and outcome",
      "Show you can switch between executive-level business conversations and deep technical discussions",
      "Demonstrate empathy for developers — Vercel is a developer-experience company",
      "Discuss how you handle competing priorities and multi-stakeholder environments",
    ],
  },
  {
    step: 4,
    title: "Technical Deep-Dive",
    duration: "60 minutes",
    icon: "🔧",
    desc: "A hands-on technical interview with a Solutions Architect or senior engineer. Covers web fundamentals, rendering strategies, caching, performance optimization, and architecture design. You may be asked to whiteboard or diagram a solution.",
    tips: [
      "Know the request lifecycle: Browser → DNS → Edge Network → Middleware → Origin → CDN → Response",
      "Understand SSR vs SSG vs ISR vs PPR — when to use each and the trade-offs",
      "Be able to explain Vercel's caching layers: Data Cache, Full Route Cache, CDN Cache, Client Cache",
      "Know Core Web Vitals (LCP, CLS, INP) — how to diagnose and fix each",
      "Understand Fluid Compute: active CPU pricing, auto-concurrency, connection reuse, near-zero cold starts",
      "Be ready to design an architecture: 'How would you build a headless commerce site on Vercel?'",
      "Know Edge Middleware use cases: auth, geo-routing, A/B testing, bot detection",
    ],
  },
  {
    step: 5,
    title: "Technical Presentation / Demo",
    duration: "45–60 minutes",
    icon: "🎤",
    desc: "The signature Vercel SE interview stage. You'll prepare and deliver a technical presentation or live demo to a panel (typically 2–3 people). This simulates a real customer engagement — you might present to a fictional CTO or engineering team evaluating Vercel.",
    tips: [
      "Build a real demo app on Vercel — deploy it, show the preview deployment workflow, demonstrate ISR",
      "Structure your presentation: Problem → Current State → Vercel Solution → Architecture → Demo → ROI",
      "Show, don't tell — live demos are more impressive than slides",
      "Anticipate tough questions: 'Why not just use CloudFront + Lambda?' or 'How does this handle 10M monthly visitors?'",
      "Practice your timing — keep the presentation to 20–25 minutes to leave room for Q&A",
      "Demonstrate you can explain complex concepts simply — this IS the job",
      "Have a backup if the live demo fails (screenshots, recorded walkthrough)",
    ],
  },
  {
    step: 6,
    title: "Cross-Functional / Values Interview",
    duration: "30–45 minutes",
    icon: "🤝",
    desc: "A conversation with team members from adjacent functions (Sales, Product, Customer Success) to assess how you collaborate, communicate, and align with Vercel's values. They're looking for someone who can be the technical 'quarterback' across teams.",
    tips: [
      "Show you can work with Sales without being 'salesy' — you're the trusted technical advisor",
      "Discuss how you handle disagreements with Account Executives about technical fit",
      "Demonstrate customer empathy — how you've gone above and beyond for a customer",
      "Talk about how you feed product feedback from the field back to Product/Engineering teams",
      "Be genuine about collaboration — Vercel is a remote-first company that values clear async communication",
    ],
  },
];

/* ── Technical Topics to Study ── */
const technicalTopics = [
  {
    category: "Platform Fundamentals",
    topics: [
      "The Vercel deployment model: git push → build → deploy → CDN",
      "Preview Deployments: every PR gets a unique URL",
      "Serverless Functions vs Edge Functions — when to use each",
      "Fluid Compute: Active CPU pricing, auto-concurrency, connection reuse",
      "vercel.json configuration: rewrites, redirects, headers, functions",
    ],
  },
  {
    category: "Rendering & Next.js",
    topics: [
      "Server Components vs Client Components — the mental model",
      "SSR, SSG, ISR, PPR — trade-offs and when to recommend each",
      "Server Actions and data mutations",
      "Streaming SSR and React Suspense boundaries",
      "App Router vs Pages Router — migration considerations",
    ],
  },
  {
    category: "Performance & Caching",
    topics: [
      "Core Web Vitals: LCP, CLS, INP — how to measure and optimize",
      "Vercel's 4-tier caching: Data Cache → Full Route Cache → CDN → Client",
      "ISR revalidation: time-based (revalidate: 60) vs on-demand (revalidateTag/Path)",
      "Image Optimization with next/image",
      "Speed Insights and Vercel Observability",
    ],
  },
  {
    category: "Edge & Security",
    topics: [
      "Edge Middleware: auth, geo-routing, A/B testing, bot detection",
      "Vercel WAF: rate limiting, geo-blocking, custom rules",
      "DDoS protection and Bot Management",
      "Deployment Protection and password-protected previews",
      "SAML SSO, RBAC, Audit Logs for enterprise",
    ],
  },
  {
    category: "AI & Modern Stack",
    topics: [
      "AI SDK: streamText(), generateObject(), tool calling",
      "AI Gateway: multi-provider routing, failover, BYOK, cost tracking",
      "Chat SDK for cross-platform agents (Slack, Teams, Discord)",
      "Workflow SDK and DurableAgent for long-running AI tasks",
      "v0 for AI-powered development",
    ],
  },
  {
    category: "Enterprise & Architecture",
    topics: [
      "Composable architecture: headless CMS + commerce + Vercel",
      "Multi-tenant platforms with subdomain routing",
      "Migration patterns: monolith → incremental adoption → full Vercel",
      "Vercel Conformance and governance at scale",
      "Pricing model: Hobby, Pro, Enterprise — when to recommend each",
    ],
  },
];

/* ── Sample Interview Questions ── */
const sampleQuestions = [
  {
    category: "Technical",
    questions: [
      "Walk me through the lifecycle of a request from browser to Vercel and back.",
      "A customer's e-commerce site has an LCP of 4.2 seconds. How would you diagnose and fix it?",
      "Explain the difference between ISR and PPR. When would you choose one over the other?",
      "How does Vercel's Edge Middleware differ from traditional server middleware?",
      "Design an architecture for a headless commerce platform serving 50 countries with localized content.",
      "A customer is worried about cold starts in their API routes. How does Fluid Compute address this?",
      "Explain Vercel's caching strategy. How would you help a customer optimize cache hit rates?",
      "How would you migrate a monolithic Rails app with 200 routes to Vercel incrementally?",
    ],
  },
  {
    category: "Customer-Facing / Scenario",
    questions: [
      "A CTO says 'We're already on AWS, why should we add Vercel?' How do you respond?",
      "Your champion at an enterprise account just left. The new VP wants to re-evaluate. What do you do?",
      "A customer's engineering team loves Vercel but their security team has concerns. How do you handle it?",
      "You're running a POC and the customer hits a platform limitation. Walk me through your response.",
      "How would you structure a technical workshop for a team of 20 engineers new to Vercel?",
      "A customer asks for a feature that doesn't exist. How do you handle the conversation and follow up?",
    ],
  },
  {
    category: "Behavioral / Values",
    questions: [
      "Tell me about a time you turned a technical objection into a deal win.",
      "Describe a situation where you had to say 'no' to a customer. How did you handle it?",
      "How do you stay current with rapidly evolving web technologies?",
      "Tell me about a time you collaborated across teams to solve a customer problem.",
      "Describe your approach to building a demo for a customer you've never met.",
      "How do you balance depth vs breadth when learning a new platform?",
    ],
  },
];

/* ── What Vercel Looks For ── */
const whatTheyLookFor = [
  { trait: "Technical Depth + Breadth", desc: "Strong JavaScript/TypeScript. Comfortable with web performance, caching, networking, security, and AI/LLM applications. Can review code with engineering teams." },
  { trait: "Customer Empathy", desc: "You genuinely care about developers. You help them build mental models, not just recite features. Vercel is a DX company — this matters." },
  { trait: "Executive ↔ Developer Range", desc: "Can discuss business outcomes with a CTO in the morning and implementation details with a staff engineer in the afternoon." },
  { trait: "Ownership Mentality", desc: "You own complex technical projects end-to-end. POCs, pilots, architecture reviews — you drive them to completion." },
  { trait: "Clear Communication", desc: "Remote-first company. Your writing, presentations, and async updates need to be crisp and concise. Documentation is a first-class skill." },
  { trait: "Builder Mindset", desc: "You build demos, example repos, reference architectures. You contribute to the ecosystem, not just sell it." },
  { trait: "Curiosity About AI", desc: "Bonus but increasingly important: experience with AI-powered applications, agentic workflows, AI SDK, or LLM tooling." },
  { trait: "Cloud Platform Familiarity", desc: "Experience with AWS, Azure, or GCP. Understanding how Vercel fits into broader enterprise architectures." },
];

/* ── Demo Project Ideas ── */
const demoIdeas = [
  { title: "Headless E-Commerce Storefront", stack: "Next.js + Shopify Storefront API + ISR + Vercel", why: "Shows ISR, caching, composable architecture, and real-world business value." },
  { title: "AI Chat Application", stack: "Next.js + AI SDK + AI Gateway + Streaming UI", why: "Demonstrates AI Gateway multi-provider routing, streaming SSR, tool calling — hot topic." },
  { title: "Multi-Tenant SaaS Dashboard", stack: "Next.js + Edge Middleware + Subdomain Routing", why: "Shows Middleware, dynamic routing, per-tenant customization — common enterprise pattern." },
  { title: "Content Site with ISR + Preview Mode", stack: "Next.js + Sanity/Contentful + ISR + Draft Mode", why: "Perfect for demonstrating ISR revalidation, CMS integration, and editorial workflows." },
  { title: "Performance Optimization Case Study", stack: "Existing slow site → Vercel migration with metrics", why: "Before/after Core Web Vitals comparison. Quantifiable ROI. Very compelling in interviews." },
  { title: "Feature Flag A/B Testing Platform", stack: "Next.js + Flags SDK + Edge Middleware + Analytics", why: "Shows Flags SDK, Middleware-based splitting, measurable experimentation — enterprise favorite." },
];

/* ── Compensation ── */
const compRanges = [
  { role: "Solutions Architect", range: "$150K–$220K base + equity", notes: "Varies by region (US, EMEA, APAC). 4-year options vesting (25% cliff year 1, monthly after)." },
  { role: "Software Engineer", range: "$170K–$300K+ total comp", notes: "Senior SWE median ~$306K total comp (base + equity). Higher in SF/NYC." },
  { role: "Sales / AE", range: "$140K–$290K+ OTE", notes: "Base + commission. OTE (On-Target Earnings) varies by quota and segment." },
];

export default function InterviewGuidePage() {
  return (
    <main className="py-5">
      <div className="container" style={{ maxWidth: "1100px" }}>
        <Link href="/blog" style={{ color: "#667eea", textDecoration: "none", fontSize: "0.9rem" }}>
          ← Back to Blog
        </Link>

        {/* Header */}
        <div className="mt-3 mb-5">
          <div className="d-flex align-items-center gap-2 mb-2">
            <span style={{ background: "rgba(102,126,234,0.15)", color: "#818cf8", padding: "0.2rem 0.6rem", borderRadius: "12px", fontSize: "0.75rem", fontWeight: 600 }}>
              Interview Guide
            </span>
            <span style={{ background: "rgba(16,185,129,0.15)", color: "#10b981", padding: "0.2rem 0.6rem", borderRadius: "12px", fontSize: "0.75rem", fontWeight: 600 }}>
              Updated March 2026
            </span>
          </div>
          <h1 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#fff" }}>
            🎯 How Vercel Interviews: The Complete Guide
          </h1>
          <p style={{ color: "#94a3b8", maxWidth: "750px", lineHeight: 1.7 }}>
            Everything you need to know about Vercel&apos;s interview process — from application to offer.
            Covers all stages, technical topics, sample questions, what they look for,
            demo ideas, and compensation. Focused on Solutions Architect / SE roles but applicable across engineering.
          </p>
        </div>

        {/* ─── Section 1: Interview Stages ─── */}
        <section className="mb-5">
          <h2 className="mb-4" style={{ color: "#fff", fontWeight: 700, fontSize: "1.6rem" }}>
            📋 The Interview Process (6 Stages)
          </h2>
          <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>
            Vercel&apos;s interview loop typically takes 2–4 weeks from application to offer. Here&apos;s what to expect at each stage.
          </p>
          <div className="d-flex flex-column gap-4">
            {stages.map((s) => (
              <div key={s.step} className="feature-card" style={{ padding: "1.5rem" }}>
                <div className="d-flex align-items-start gap-3">
                  <div style={{
                    background: "rgba(102,126,234,0.15)",
                    borderRadius: "12px",
                    width: "48px",
                    height: "48px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    flexShrink: 0,
                  }}>
                    {s.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <h3 style={{ fontSize: "1.1rem", marginBottom: 0 }}>
                        Stage {s.step}: {s.title}
                      </h3>
                      <span style={{
                        background: "rgba(102,126,234,0.1)",
                        color: "#818cf8",
                        padding: "0.1rem 0.5rem",
                        borderRadius: "8px",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                      }}>
                        ⏱ {s.duration}
                      </span>
                    </div>
                    <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "0.75rem" }}>{s.desc}</p>
                    <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: "8px", padding: "0.75rem 1rem" }}>
                      <p style={{ color: "#a5b4fc", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.4rem" }}>Tips to nail this stage:</p>
                      <ul style={{ marginBottom: 0, paddingLeft: "1.1rem" }}>
                        {s.tips.map((tip, i) => (
                          <li key={i} style={{ color: "#cbd5e1", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: "0.2rem" }}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Section 2: What Vercel Looks For ─── */}
        <section className="mb-5">
          <h2 className="mb-3" style={{ color: "#fff", fontWeight: 700, fontSize: "1.6rem" }}>
            🔍 What Vercel Looks For
          </h2>
          <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>
            Based on the job description, interview patterns, and Vercel&apos;s culture — these are the key traits they evaluate.
          </p>
          <div className="row g-3">
            {whatTheyLookFor.map((item) => (
              <div key={item.trait} className="col-md-6">
                <div style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  padding: "1.25rem",
                }}>
                  <h4 style={{ color: "#a5b4fc", fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.4rem" }}>{item.trait}</h4>
                  <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Section 3: Technical Topics ─── */}
        <section className="mb-5">
          <h2 className="mb-3" style={{ color: "#fff", fontWeight: 700, fontSize: "1.6rem" }}>
            📚 Technical Topics to Study
          </h2>
          <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>
            The technical deep-dive and demo stages will test these areas. Master these and you&apos;ll be well-prepared.
          </p>
          <div className="row g-3">
            {technicalTopics.map((cat) => (
              <div key={cat.category} className="col-md-6">
                <div className="feature-card" style={{ padding: "1.25rem" }}>
                  <h3 style={{ fontSize: "1rem", marginBottom: "0.75rem" }}>{cat.category}</h3>
                  <ul style={{ marginBottom: 0, paddingLeft: "1.1rem" }}>
                    {cat.topics.map((t, i) => (
                      <li key={i} style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.8 }}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Section 4: Sample Questions ─── */}
        <section className="mb-5">
          <h2 className="mb-3" style={{ color: "#fff", fontWeight: 700, fontSize: "1.6rem" }}>
            💬 Sample Interview Questions
          </h2>
          <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>
            Practice answering these questions out loud. Time yourself — aim for 2–3 minute answers for technical questions, 3–4 minutes for behavioral.
          </p>
          {sampleQuestions.map((cat) => (
            <div key={cat.category} className="mb-4">
              <h3 className="mb-3" style={{ color: "#e2e8f0", fontSize: "1.2rem", fontWeight: 600 }}>
                {cat.category === "Technical" ? "🔧" : cat.category === "Customer-Facing / Scenario" ? "🤝" : "💡"}{" "}
                {cat.category}
              </h3>
              <div className="row g-2">
                {cat.questions.map((q, i) => (
                  <div key={i} className="col-md-6">
                    <div style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "10px",
                      padding: "0.85rem 1rem",
                    }}>
                      <span style={{ color: "#667eea", fontWeight: 700, marginRight: "0.4rem", fontSize: "0.85rem" }}>Q{i + 1}.</span>
                      <span style={{ color: "#cbd5e1", fontSize: "0.88rem" }}>{q}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* ─── Section 5: Demo Ideas ─── */}
        <section className="mb-5">
          <h2 className="mb-3" style={{ color: "#fff", fontWeight: 700, fontSize: "1.6rem" }}>
            🛠️ Demo Project Ideas for Your Presentation
          </h2>
          <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>
            If asked to prepare a demo or technical presentation, here are winning project ideas that showcase Vercel&apos;s strengths.
          </p>
          <div className="row g-3">
            {demoIdeas.map((d) => (
              <div key={d.title} className="col-md-6">
                <div className="feature-card" style={{ padding: "1.25rem" }}>
                  <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>{d.title}</h3>
                  <p style={{ color: "#818cf8", fontSize: "0.8rem", marginBottom: "0.4rem", fontFamily: "monospace" }}>{d.stack}</p>
                  <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: 0 }}>
                    <strong style={{ color: "#fbbf24" }}>Why it works:</strong> {d.why}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Section 6: Compensation ─── */}
        <section className="mb-5">
          <h2 className="mb-3" style={{ color: "#fff", fontWeight: 700, fontSize: "1.6rem" }}>
            💰 Compensation Overview
          </h2>
          <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>
            Vercel offers competitive compensation with equity (stock options, 4-year vest with 25% cliff).
            Ranges are approximate and vary by location, level, and negotiation.
          </p>
          <div className="table-responsive">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "rgba(102,126,234,0.15)" }}>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.7rem 1rem", color: "#fff", fontWeight: 600 }}>Role</th>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.7rem 1rem", color: "#10b981", fontWeight: 600 }}>Estimated Range</th>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.7rem 1rem", color: "#94a3b8", fontWeight: 600 }}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {compRanges.map((r, i) => (
                  <tr key={r.role} style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)" }}>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.65rem 1rem", color: "#fff", fontWeight: 600, fontSize: "0.9rem" }}>{r.role}</td>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.65rem 1rem", color: "#10b981", fontSize: "0.9rem", fontWeight: 600 }}>{r.range}</td>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.65rem 1rem", color: "#94a3b8", fontSize: "0.85rem" }}>{r.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ color: "#64748b", fontSize: "0.8rem", marginTop: "0.75rem" }}>
            Benefits include flexible PTO, inclusive healthcare, WFH stipend, learning & development budget, and equipment provided.
          </p>
        </section>

        {/* ─── Section 7: Timeline ─── */}
        <section className="mb-5">
          <h2 className="mb-3" style={{ color: "#fff", fontWeight: 700, fontSize: "1.6rem" }}>
            ⏰ Typical Timeline
          </h2>
          <div style={{
            background: "linear-gradient(135deg, rgba(102,126,234,0.08), rgba(167,139,250,0.08))",
            border: "1px solid rgba(102,126,234,0.15)",
            borderRadius: "16px",
            padding: "1.5rem 2rem",
          }}>
            <div className="row g-3">
              {[
                { phase: "Application → Recruiter Screen", time: "1–2 weeks" },
                { phase: "Recruiter Screen → Hiring Manager", time: "3–5 days" },
                { phase: "Hiring Manager → Technical Deep-Dive", time: "3–7 days" },
                { phase: "Technical → Presentation/Demo", time: "5–7 days (prep time)" },
                { phase: "Demo → Values Interview", time: "1–3 days" },
                { phase: "Values → Offer Decision", time: "3–7 days" },
              ].map((t) => (
                <div key={t.phase} className="col-md-6">
                  <div className="d-flex justify-content-between align-items-center" style={{ padding: "0.4rem 0" }}>
                    <span style={{ color: "#cbd5e1", fontSize: "0.9rem" }}>{t.phase}</span>
                    <span style={{ color: "#818cf8", fontSize: "0.85rem", fontWeight: 600, whiteSpace: "nowrap", marginLeft: "1rem" }}>{t.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <p style={{ color: "#fbbf24", fontSize: "0.9rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                Total: ~2–4 weeks from first call to offer
              </p>
              <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginBottom: 0 }}>
                Vercel moves fast. They respect candidates&apos; time and try to consolidate stages when possible.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Key Takeaway ─── */}
        <div style={{
          background: "linear-gradient(135deg, rgba(102,126,234,0.1), rgba(167,139,250,0.1))",
          border: "1px solid rgba(102,126,234,0.2)",
          borderRadius: "16px",
          padding: "2rem",
        }} className="mb-5">
          <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "1.3rem", marginBottom: "1rem" }}>
            🎯 The #1 Thing That Sets Candidates Apart
          </h3>
          <p style={{ color: "#cbd5e1", fontSize: "1rem", lineHeight: 1.8, marginBottom: "0.75rem" }}>
            <strong style={{ color: "#a78bfa" }}>Build something real on Vercel before you interview.</strong>
          </p>
          <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: 0 }}>
            Deploy a Next.js app. Set up ISR. Add Edge Middleware. Connect AI SDK. Use preview deployments.
            The candidates who get offers are the ones who&apos;ve actually experienced the &quot;aha moment&quot; of the platform —
            and can articulate it with conviction because they&apos;ve lived it, not just read about it.
            Vercel hires builders. Show up as one.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center py-3">
          <Link href="/blog/study-guide" className="btn-glow" style={{ marginRight: "1rem" }}>
            Study the Technical Guide →
          </Link>
          <Link href="/se" className="btn-glow">
            SE Resources →
          </Link>
        </div>
      </div>
    </main>
  );
}
