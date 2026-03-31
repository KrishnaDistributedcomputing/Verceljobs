import Link from "next/link";

const customers = [
  {
    name: "Notion",
    quote: "What once took an hour to deploy a hotfix now takes just 15 minutes, and rolling back changes happens in seconds.",
    url: "https://vercel.com/blog/how-notion-powers-rapid-and-performant-experimentation",
    metrics: "Hotfix deploys: 1hr → 15min",
  },
  {
    name: "Stripe",
    quote: "Stripe builds viral Black Friday site in 19 days with Vercel.",
    url: "https://vercel.com/customers/architecting-reliability-stripes-black-friday-site",
    metrics: "19-day build for Black Friday",
  },
  {
    name: "PAIGE",
    quote: "With Vercel, PAIGE boosted their Black Friday revenue by 22% and increased conversion rates by 76%.",
    url: "https://vercel.com/blog/how-paige-grew-revenue-by-22-with-shopify-next-js-and-vercel",
    metrics: "+22% revenue, +76% conversions",
  },
  {
    name: "Leonardo.AI",
    quote: "Switching to Vercel transformed our workflow, cutting build times from 10 minutes to just 2 minutes.",
    url: "https://vercel.com/customers/leonardo-ai-performantly-generates-4-5-million-images-daily-with-next-js-and-vercel",
    metrics: "4.5M images/day, 80% faster builds",
  },
  {
    name: "Sonos",
    quote: "Our developers are happier, we get to market faster. Vercel let us move with confidence.",
    url: "https://vercel.com/customers/how-sonos-amplified-their-devex",
    metrics: "Faster time-to-market",
  },
  {
    name: "SERHANT.",
    quote: "We moved from being an internal pilot program to more than 900 users without a lot of worry on infrastructure or scale.",
    url: "https://vercel.com/blog/serhants-playbook-for-rapid-ai-iteration",
    metrics: "200 → 900+ agents, AI SDK multi-model",
  },
  {
    name: "Durable",
    quote: "It's incredible what we've shipped with such a lean team. This is how every tech company in the future will operate.",
    url: "https://vercel.com/blog/360-billion-tokens-3-million-customers-6-engineers",
    metrics: "3M customers, 6 engineers, 360B tokens/yr",
  },
  {
    name: "Helly Hansen",
    quote: "Helly Hansen migrated to Vercel and drove 80% Black Friday growth.",
    url: "https://vercel.com/blog/how-helly-hansen-migrated-to-vercel-and-drove-80-black-friday-growth",
    metrics: "+80% Black Friday growth",
  },
  {
    name: "Ruggable",
    quote: "We saw 300% more organic clicks by optimizing our frontend architecture.",
    url: "https://vercel.com/blog/how-ruggable-saw-more-organic-clicks-by-optimizing-their-frontend",
    metrics: "+300% organic clicks",
  },
  {
    name: "Scale AI",
    quote: "With Vercel, we have optimizations, support, and speed we didn't have before.",
    url: "https://vercel.com/customers/scale-unifies-design-and-performance-with-next-js-and-vercel",
    metrics: "Unified design & performance",
  },
  {
    name: "Morning Brew",
    quote: "Morning Brew increases revenue by 2.5x after frontend cloud adoption.",
    url: "https://vercel.com/blog/from-newsletter-to-global-media-brand-with-a-headless-frontend",
    metrics: "2.5x revenue increase",
  },
  {
    name: "Desenio",
    quote: "Desenio increases conversions by 37% with Vercel.",
    url: "https://vercel.com/customers/desenio",
    metrics: "+37% conversions",
  },
  {
    name: "HashiCorp",
    quote: "How HashiCorp developers iterate faster with Incremental Static Regeneration.",
    url: "https://vercel.com/blog/how-hashicorp-developers-iterate-faster-with-isr",
    metrics: "ISR-powered iteration speed",
  },
  {
    name: "MotorTrend",
    quote: "With Vercel, MotorTrend reduces build times by up to 7x, allowing them to rapidly release new features.",
    url: "https://vercel.com/blog/motortrend-shifting-into-overdrive-with-vercel",
    metrics: "7x faster builds",
  },
  {
    name: "Fern",
    quote: "Fern delivers 6M+ monthly views and 80% faster docs with Vercel.",
    url: "https://vercel.com/blog/how-fern-delivers-6m-monthly-views-and-80-faster-docs-with-vercel",
    metrics: "6M+ views/mo, 80% faster docs",
  },
];

const trustedLogos = [
  "Notion", "Stripe", "DoorDash", "Figma", "Pinterest", "Zapier", "Twilio",
  "Loom", "HashiCorp", "Snyk", "DuckDuckGo", "Sonos", "Box", "Calendly",
  "Gong", "Jasper", "Sanity", "Sitecore", "Ricoh", "Scale AI",
];

export default function CustomersPage() {
  return (
    <main className="py-5">
      <div className="container" style={{ maxWidth: "1100px" }}>
        <Link href="/blog" style={{ color: "#667eea", textDecoration: "none", fontSize: "0.9rem" }}>
          ← Back to Blog
        </Link>
        <h1
          className="mt-3 mb-2"
          style={{ fontSize: "2.2rem", fontWeight: 800, color: "#fff" }}
        >
          🏢 Customer Stories & Use Cases
        </h1>
        <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>
          How the world&apos;s best teams build on Vercel. Data from{" "}
          <a href="https://vercel.com/customers" target="_blank" rel="noopener noreferrer" style={{ color: "#818cf8" }}>vercel.com/customers</a>.
        </p>

        {/* Trusted by */}
        <div
          className="mb-5"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
            padding: "1.5rem",
          }}
        >
          <h3 style={{ color: "#94a3b8", fontSize: "0.9rem", fontWeight: 600, marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Trusted by
          </h3>
          <div className="d-flex flex-wrap gap-3">
            {trustedLogos.map((name) => (
              <span
                key={name}
                style={{
                  background: "rgba(102,126,234,0.1)",
                  color: "#a5b4fc",
                  padding: "0.3rem 0.75rem",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Customer cards */}
        <div className="row g-3">
          {customers.map((c) => (
            <div key={c.name} className="col-md-6">
              <a href={c.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <div className="feature-card" style={{ padding: "1.5rem" }}>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h3 style={{ fontSize: "1.1rem", marginBottom: 0 }}>{c.name}</h3>
                    <span
                      style={{
                        background: "rgba(16,185,129,0.15)",
                        color: "#10b981",
                        padding: "0.15rem 0.5rem",
                        borderRadius: "8px",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {c.metrics}
                    </span>
                  </div>
                  <p style={{ fontStyle: "italic", fontSize: "0.9rem", marginBottom: 0 }}>
                    &ldquo;{c.quote}&rdquo;
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
