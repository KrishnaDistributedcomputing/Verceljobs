import Link from "next/link";

export default function MarketingSiteCMSPage() {
  return (
    <main className="py-5">
      <div className="container" style={{ maxWidth: "1100px" }}>
        <Link href="/blog/architectures" style={{ color: "#667eea", textDecoration: "none", fontSize: "0.9rem" }}>
          ← Back to Architecture Patterns
        </Link>

        <div className="mt-3 mb-5">
          <span style={{ background: "rgba(16,185,129,0.15)", color: "#34d399", padding: "0.2rem 0.6rem", borderRadius: "12px", fontSize: "0.75rem", fontWeight: 600 }}>
            Architecture Pattern
          </span>
          <h1 className="mt-2" style={{ fontSize: "2.2rem", fontWeight: 800, color: "#fff" }}>
            📝 Marketing Site + CMS
          </h1>
          <p style={{ color: "#94a3b8", maxWidth: "700px", lineHeight: 1.7 }}>
            The most common Vercel architecture: a headless CMS (Sanity, Contentful, Storyblok) connected to Next.js with ISR.
            Editors publish content, webhooks trigger targeted revalidation, and the site stays fast globally — with zero full rebuilds.
          </p>
        </div>

        {/* How It Works */}
        <section className="mb-5">
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>How It Works</h2>
          <div className="d-flex flex-column gap-2">
            {[
              { step: "1", title: "Editor publishes in CMS", desc: "Content editor updates a blog post, landing page, or banner in Sanity/Contentful. Clicks 'Publish'.", color: "#667eea" },
              { step: "2", title: "CMS fires webhook", desc: "CMS sends a POST request to /api/revalidate with the content type and slug.", color: "#8b5cf6" },
              { step: "3", title: "revalidateTag() runs", desc: "API route calls revalidateTag('blog-post-123') — only the affected page regenerates, not the entire site.", color: "#06b6d4" },
              { step: "4", title: "Next request gets fresh page", desc: "The next user hitting that URL gets the regenerated page, served from CDN. All other pages unaffected.", color: "#10b981" },
            ].map((s) => (
              <div key={s.step} className="d-flex gap-3" style={{ background: `${s.color}08`, border: `1px solid ${s.color}22`, borderRadius: "10px", padding: "1rem 1.25rem" }}>
                <div style={{ background: `${s.color}22`, color: s.color, width: "36px", height: "36px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.9rem", flexShrink: 0 }}>{s.step}</div>
                <div>
                  <h4 style={{ color: s.color, fontSize: "0.92rem", fontWeight: 700, marginBottom: "0.2rem" }}>{s.title}</h4>
                  <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.5, marginBottom: 0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-5">
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>Key Vercel Features</h2>
          <div className="row g-3">
            {[
              { feature: "ISR + Webhooks", desc: "On-demand revalidation via revalidateTag(). Only the changed page regenerates. A 10K-page site revalidates one page in seconds.", icon: "⚡" },
              { feature: "Draft Mode", desc: "Editors bypass ISR cache to preview unpublished content. Essential for editorial workflows — see changes before they go live.", icon: "👁️" },
              { feature: "Preview Deployments", desc: "Every PR gets a live preview URL. Design and content teams review real running pages, not Figma mockups.", icon: "🔗" },
              { feature: "next/image", desc: "Auto WebP/AVIF conversion, responsive sizing, lazy loading. Hero images get priority prop for fast LCP.", icon: "🖼️" },
              { feature: "next/font", desc: "Self-hosted fonts with zero layout shift. Google Fonts or custom fonts loaded with font-display: swap.", icon: "✏️" },
              { feature: "Speed Insights", desc: "Real-user Core Web Vitals. Track actual visitor experience, not synthetic lab scores. Critical for SEO.", icon: "📊" },
            ].map((f) => (
              <div key={f.feature} className="col-md-6">
                <div className="feature-card" style={{ padding: "1.15rem", height: "100%" }}>
                  <h4 style={{ color: "#34d399", fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.3rem" }}>{f.icon} {f.feature}</h4>
                  <p style={{ color: "#94a3b8", fontSize: "0.83rem", lineHeight: 1.5, marginBottom: 0 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Code Example */}
        <section className="mb-5">
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>Webhook Revalidation — Code</h2>
          <pre style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "1rem 1.25rem", fontSize: "0.78rem", color: "#cbd5e1", overflow: "auto" }}>
            <code>{`// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-webhook-secret');
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { type, slug } = body;

  // Targeted revalidation — only affected pages
  revalidateTag(\`\${type}-\${slug}\`);   // e.g., 'blog-post-123'
  revalidateTag(type);                  // e.g., 'blog' (listing page)
  revalidateTag('homepage');            // homepage shows latest posts

  return NextResponse.json({ revalidated: true, tags: [type, slug] });
}

// In your page component:
async function getBlogPost(slug: string) {
  const post = await fetch(\`https://cdn.sanity.io/...\`, {
    next: { tags: ['blog', \`blog-\${slug}\`] }
  });
  return post.json();
}`}</code>
          </pre>
        </section>

        {/* CMS Comparison */}
        <section className="mb-5">
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>Popular CMS Options</h2>
          <div className="table-responsive">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "rgba(102,126,234,0.15)" }}>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.6rem 1rem", color: "#fff", fontWeight: 600 }}>CMS</th>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.6rem 1rem", color: "#818cf8", fontWeight: 600 }}>Best For</th>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.6rem 1rem", color: "#94a3b8", fontWeight: 600 }}>Vercel Integration</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { cms: "Sanity", best: "Developer-friendly, real-time collaboration, GROQ query language", integration: "First-class Vercel integration. Visual Editing, webhook revalidation, Draft Mode." },
                  { cms: "Contentful", best: "Enterprise content management, structured content, rich API", integration: "Webhook → revalidateTag(). Preview API for Draft Mode. GraphQL or REST." },
                  { cms: "Storyblok", best: "Visual editor for non-technical users, block-based content", integration: "Visual Editor integration. Webhooks for revalidation. Bridge for live preview." },
                  { cms: "Payload", best: "Self-hosted, full control, TypeScript-native, open-source", integration: "Can run on Vercel Postgres. API routes for content delivery. Full customization." },
                  { cms: "WordPress (headless)", best: "Existing WordPress content, familiar editing experience", integration: "WPGraphQL → Next.js ISR. Webhook plugin for revalidation on publish." },
                ].map((r, i) => (
                  <tr key={r.cms} style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)" }}>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.55rem 1rem", color: "#10b981", fontSize: "0.85rem", fontWeight: 700 }}>{r.cms}</td>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.55rem 1rem", color: "#cbd5e1", fontSize: "0.83rem" }}>{r.best}</td>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.55rem 1rem", color: "#94a3b8", fontSize: "0.83rem" }}>{r.integration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="text-center py-4">
          <a href="https://vercel.com/solutions/marketing-sites" target="_blank" rel="noopener noreferrer" className="btn-glow" style={{ marginRight: "1rem" }}>
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
