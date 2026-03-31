import Link from "next/link";

const layers = [
  { name: "Storefront (Next.js on Vercel)", detail: "ISR product pages, SSR checkout, CSR cart. Edge Middleware handles geo-pricing, A/B tests, locale routing.", color: "#667eea" },
  { name: "Commerce API", detail: "Shopify Storefront API, Commercetools, BigCommerce, or Medusa. Handles inventory, pricing, cart, and checkout logic.", color: "#8b5cf6" },
  { name: "Search & Discovery", detail: "Algolia or Elasticsearch for faceted search, autocomplete, and product recommendations.", color: "#06b6d4" },
  { name: "Content Layer (CMS)", detail: "Sanity, Contentful, or Storyblok for banners, landing pages, and editorial content. Webhook → revalidateTag().", color: "#10b981" },
  { name: "Payments & Checkout", detail: "Stripe, Adyen, or Braintree for payment processing. SSR checkout for auth-gated, fresh inventory checks.", color: "#f59e0b" },
  { name: "Edge Network", detail: "Global CDN for static assets, ISR pages. Image optimization via next/image. Sub-50ms TTFB globally.", color: "#ec4899" },
];

const renderingRoutes = [
  { route: "/", strategy: "ISR (5min or webhook)", why: "Marketing homepage updates periodically. Webhook on CMS publish." },
  { route: "/products/[slug]", strategy: "ISR (1hr + webhook)", why: "100K+ pages — top 1K pre-built, rest on-demand. Webhook on product update." },
  { route: "/collections/[slug]", strategy: "ISR (15min)", why: "Collection pages update as products change. Short revalidation window." },
  { route: "/cart", strategy: "CSR (Client-Side)", why: "User-specific, sensitive. Client state only — no server rendering." },
  { route: "/checkout", strategy: "SSR (force-dynamic)", why: "Auth-gated, fresh inventory check, payment session creation." },
  { route: "/account/*", strategy: "SSR (auth)", why: "User-specific order history. Cannot be cached or shared." },
];

const customerResults = [
  { company: "Desenio", metric: "37% conversion lift", detail: "Migrated from monolithic Magento to headless Next.js on Vercel. ISR product pages with sub-2s LCP." },
  { company: "PAIGE", metric: "22% revenue boost", detail: "Composable commerce with Shopify + Next.js. Personalized experiences via Edge Middleware." },
  { company: "Supreme", metric: "Global flash sales", detail: "Handles extreme traffic spikes during product drops. ISR + CDN absorbs millions of concurrent users." },
  { company: "Under Armour", metric: "3x faster pages", detail: "Headless architecture replaced monolithic platform. Global CDN reduced latency for international customers." },
];

export default function ComposableCommercePage() {
  return (
    <main className="py-5">
      <div className="container" style={{ maxWidth: "1100px" }}>
        <Link href="/blog/architectures" style={{ color: "#667eea", textDecoration: "none", fontSize: "0.9rem" }}>
          ← Back to Architecture Patterns
        </Link>

        <div className="mt-3 mb-5">
          <span style={{ background: "rgba(102,126,234,0.15)", color: "#818cf8", padding: "0.2rem 0.6rem", borderRadius: "12px", fontSize: "0.75rem", fontWeight: 600 }}>
            Architecture Pattern
          </span>
          <h1 className="mt-2" style={{ fontSize: "2.2rem", fontWeight: 800, color: "#fff" }}>
            🛒 Composable Commerce
          </h1>
          <p style={{ color: "#94a3b8", maxWidth: "700px", lineHeight: 1.7 }}>
            Decouple the storefront from the commerce backend. Next.js on Vercel becomes the presentation layer — fast, globally distributed,
            SEO-optimized — while Shopify, Commercetools, or BigCommerce handle inventory, cart, and checkout via APIs.
          </p>
        </div>

        {/* Why Composable */}
        <section className="mb-5">
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>Why Composable Commerce?</h2>
          <div className="row g-3">
            {[
              { title: "Performance", desc: "Monolithic platforms (Magento, SFCC) serve 4-8s LCP. Composable with ISR + CDN delivers sub-1s globally.", icon: "⚡" },
              { title: "Flexibility", desc: "Swap any backend service (search, CMS, payments) without touching the storefront. Best-of-breed for every capability.", icon: "🔧" },
              { title: "SEO & Core Web Vitals", desc: "ISR pages pre-rendered with perfect meta tags. next/image for optimized product photos. Google rewards fast sites.", icon: "📈" },
              { title: "Global Scale", desc: "Flash sales with 10x traffic? ISR pages serve from CDN cache — 10x hits, not 10x function invocations.", icon: "🌍" },
            ].map((item) => (
              <div key={item.title} className="col-md-6">
                <div className="feature-card" style={{ padding: "1.25rem", height: "100%" }}>
                  <h4 style={{ color: "#818cf8", fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.3rem" }}>{item.icon} {item.title}</h4>
                  <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Architecture Layers */}
        <section className="mb-5">
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>Architecture Layers</h2>
          <div className="d-flex flex-column gap-2">
            {layers.map((l) => (
              <div key={l.name} style={{ background: `${l.color}0a`, border: `1px solid ${l.color}22`, borderRadius: "10px", padding: "1rem 1.25rem" }}>
                <h4 style={{ color: l.color, fontSize: "0.92rem", fontWeight: 700, marginBottom: "0.25rem" }}>{l.name}</h4>
                <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.5, marginBottom: 0 }}>{l.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Rendering Strategy */}
        <section className="mb-5">
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>Rendering Strategy per Route</h2>
          <div className="table-responsive">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "rgba(102,126,234,0.15)" }}>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.6rem 1rem", color: "#fff", fontWeight: 600 }}>Route</th>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.6rem 1rem", color: "#818cf8", fontWeight: 600 }}>Strategy</th>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.6rem 1rem", color: "#94a3b8", fontWeight: 600 }}>Why</th>
                </tr>
              </thead>
              <tbody>
                {renderingRoutes.map((r, i) => (
                  <tr key={r.route} style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)" }}>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.55rem 1rem", color: "#10b981", fontFamily: "monospace", fontSize: "0.85rem" }}>{r.route}</td>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.55rem 1rem", color: "#f59e0b", fontSize: "0.85rem", fontWeight: 600 }}>{r.strategy}</td>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.55rem 1rem", color: "#94a3b8", fontSize: "0.85rem" }}>{r.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Key Vercel Features */}
        <section className="mb-5">
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>Key Vercel Features</h2>
          <div className="row g-3">
            {[
              { feature: "ISR + Webhooks", desc: "Product pages regenerate when Shopify publishes. No full rebuild for 100K pages. On-demand invalidation via revalidateTag()." },
              { feature: "Edge Middleware", desc: "Geo-based pricing (USD in US, EUR in EU), A/B test checkout flows, locale routing — all at the edge, globally." },
              { feature: "next/image", desc: "Product images auto-converted to WebP/AVIF, responsive sizes per device, lazy loaded. LCP improvement of 40-60%." },
              { feature: "Streaming + Suspense", desc: "Product details load instantly (ISR), live inventory status streams in via Suspense boundary." },
              { feature: "Skew Protection", desc: "During deploys, users with old JS get routed to matching deployment — no broken checkouts." },
              { feature: "Edge Config", desc: "Feature flags for new checkout flow, sale banners, maintenance mode — near-zero latency reads." },
            ].map((f) => (
              <div key={f.feature} className="col-md-6">
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "1rem", height: "100%" }}>
                  <span style={{ color: "#667eea", fontSize: "0.88rem", fontWeight: 700 }}>{f.feature}</span>
                  <p style={{ color: "#94a3b8", fontSize: "0.83rem", lineHeight: 1.5, marginBottom: 0, marginTop: "0.3rem" }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Customer Results */}
        <section className="mb-5">
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>Customer Results</h2>
          <div className="row g-3">
            {customerResults.map((c) => (
              <div key={c.company} className="col-md-6">
                <div className="feature-card" style={{ padding: "1.15rem", height: "100%" }}>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span style={{ color: "#e2e8f0", fontWeight: 700, fontSize: "0.95rem" }}>{c.company}</span>
                    <span style={{ background: "rgba(16,185,129,0.15)", color: "#10b981", padding: "0.15rem 0.6rem", borderRadius: "12px", fontSize: "0.75rem", fontWeight: 700 }}>{c.metric}</span>
                  </div>
                  <p style={{ color: "#94a3b8", fontSize: "0.83rem", lineHeight: 1.5, marginBottom: 0 }}>{c.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center py-4">
          <a href="https://vercel.com/solutions/composable-commerce" target="_blank" rel="noopener noreferrer" className="btn-glow" style={{ marginRight: "1rem" }}>
            Read on Vercel Blog →
          </a>
          <Link href="/blog/architectures" className="btn-glow" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
            ← All Architectures
          </Link>
        </div>
      </div>
    </main>
  );
}
