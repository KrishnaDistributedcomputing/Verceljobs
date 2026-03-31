import Link from "next/link";

/* ── WAF & Security Features ── */
const securityFeatures = [
  { name: "Managed WAF", desc: "Protects against OWASP Top 10 (SQL injection, XSS, CSRF), bot attacks, DDoS. Up to 1,000 custom firewall rules (Enterprise).", icon: "🛡️" },
  { name: "DDoS Mitigation", desc: "Edge network absorbs volumetric DDoS automatically. Static assets and edge-cached responses serve without touching Functions — dramatically reduces attack surface.", icon: "🌊" },
  { name: "Bot Management", desc: "Identify and block automated threats. BotID provides granular bot classification and control.", icon: "🤖" },
  { name: "Deployment Protection", desc: "Password protection for previews, Vercel Authentication (team only), Trusted IP restriction (Enterprise).", icon: "🔐" },
  { name: "IP Blocking", desc: "Up to 1,000 IP blocking rules. Block by individual IP, CIDR ranges, or geographic regions.", icon: "🚫" },
  { name: "Rate Limiting", desc: "Configure rate limits per path, IP, or custom criteria. Prevent abuse without blocking legitimate users.", icon: "⏱️" },
];

/* ── Compliance ── */
const compliance = [
  { standard: "SOC 2 Type II", desc: "Annual audit of security, availability, and confidentiality controls." },
  { standard: "GDPR", desc: "EU data residency supported — deploy functions in EU regions." },
  { standard: "HIPAA", desc: "With Business Associate Agreement (BAA) on Enterprise plan." },
  { standard: "PCI DSS", desc: "Considerations for payment processing workloads." },
  { standard: "SAML SSO + SCIM", desc: "Identity provider integration (Okta, Azure AD, Google Workspace) with Directory Sync." },
];

/* ── Environment Variables ── */
const envVarRules = [
  { prefix: "NEXT_PUBLIC_*", scope: "Browser (build-time)", risk: "Exposed in client bundle — never put secrets here" },
  { prefix: "No prefix", scope: "Server-only (runtime)", risk: "Safe for secrets — only accessible in Server Components, API Routes, Middleware" },
  { prefix: "Per-environment", scope: "Production / Preview / Dev", risk: "Set different values per environment in Vercel dashboard" },
];

/* ── Enterprise Features ── */
const enterpriseFeatures = [
  { name: "99.99% SLA", desc: "Guaranteed uptime vs Pro (best-effort). Key for regulated industries and enterprise procurement.", icon: "📊" },
  { name: "SAML SSO + SCIM", desc: "SAML 2.0 for IdP integration (Okta, Azure AD, Google Workspace). SCIM for automated user provisioning/deprovisioning. Directory Sync for group management.", icon: "🔑" },
  { name: "Multi-Region Compute", desc: "Deploy functions to multiple regions simultaneously. Traffic routed to nearest healthy region. With Fluid Compute, AZ and region failover is automatic.", icon: "🌍" },
  { name: "Audit Logs", desc: "Every dashboard action logged: deployments, env var changes, team member additions, security events. Stream to SIEM tools.", icon: "📝" },
  { name: "Custom WAF Rules", desc: "Up to 1,000 custom rules: block by country, rate limit by IP per path, block user agents, require headers for API routes.", icon: "🛡️" },
  { name: "Log Drains", desc: "Stream all logs to: Datadog, New Relic, Axiom, Azure Monitor, Splunk, Elastic.", icon: "📤" },
  { name: "Secure Compute", desc: "Isolated compute with private backend connectivity. Functions run in dedicated infrastructure for sensitive workloads.", icon: "🏰" },
  { name: "Deployment Protection", desc: "Trusted IPs restricting access. Password-protected previews. Vercel Authentication for team-only access.", icon: "🔒" },
];

/* ── Pricing ── */
const plans = [
  { name: "Hobby", cost: "Free", who: "Personal, non-commercial only", highlights: ["60s function max", "100GB bandwidth/mo", "1M Edge Requests/mo", "Commercial use prohibited"] },
  { name: "Pro", cost: "$20/user/mo", who: "Professional developers, commercial projects", highlights: ["$20 monthly usage credit", "1TB bandwidth/mo", "300s functions (Fluid)", "Spend management"] },
  { name: "Enterprise", cost: "Custom (~$20-25k/yr min)", who: "Teams needing SSO, SLA, WAF, compliance", highlights: ["99.99% SLA", "SAML SSO + SCIM", "Managed WAF", "Multi-region compute"] },
];

const costGotchas = [
  { trigger: "Edge Requests", detail: "Every CDN request counts — even static assets. High-traffic sites with many assets accumulate quickly." },
  { trigger: "Active CPU", detail: "CPU-intensive tasks (image processing, computation) accumulate fast. I/O-bound workloads are cheap with Fluid." },
  { trigger: "Fast Data Transfer", detail: "Large assets (images, video) through Vercel CDN. Guide customers to CDN-optimised media services (Cloudinary, Mux)." },
  { trigger: "ISR Revalidation", detail: "Each ISR revalidation invokes a function. Short revalidation windows on high-traffic sites = significant invocations." },
  { trigger: "AI Streaming", detail: "Long LLM responses stream 10–60s. With Fluid, you pay only CPU. Without Fluid, cost per AI request is high." },
];

const enterpriseTriggers = [
  "SAML SSO requirement",
  "99.99% SLA guarantee needed",
  "Managed WAF required",
  "Audit logs for compliance",
  "Multi-region compute",
  "HIPAA/PCI compliance",
  "Dedicated support channel",
];

export default function EnterpriseSecurityPage() {
  return (
    <main className="py-5">
      <div className="container" style={{ maxWidth: "1100px" }}>
        <Link href="/se" style={{ color: "#667eea", textDecoration: "none", fontSize: "0.9rem" }}>
          ← Back to SE Resources
        </Link>

        <div className="mt-3 mb-5">
          <span style={{ background: "rgba(239,68,68,0.15)", color: "#f87171", padding: "0.2rem 0.6rem", borderRadius: "12px", fontSize: "0.75rem", fontWeight: 600 }}>
            Enterprise & Security
          </span>
          <h1 className="mt-2" style={{ fontSize: "2.2rem", fontWeight: 800, color: "#fff" }}>
            🔒 Enterprise & Security
          </h1>
          <p style={{ color: "#94a3b8", maxWidth: "700px", lineHeight: 1.7 }}>
            Security features, WAF, compliance, enterprise capabilities, and pricing model —
            the knowledge that closes enterprise deals.
          </p>
        </div>

        {/* ─── Security ─── */}
        <section className="mb-5">
          <h2 className="mb-3" style={{ color: "#fff", fontWeight: 700, fontSize: "1.5rem" }}>
            Security — WAF, DDoS, Access Control
          </h2>
          <div className="row g-3 mb-4">
            {securityFeatures.map((f) => (
              <div key={f.name} className="col-md-6">
                <div style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  padding: "1.25rem",
                }}>
                  <h4 style={{ color: "#e2e8f0", fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.4rem" }}>
                    {f.icon} {f.name}
                  </h4>
                  <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: 0 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Environment Variables */}
          <h3 className="mb-3" style={{ color: "#e2e8f0", fontWeight: 600, fontSize: "1.2rem" }}>Environment Variable Security</h3>
          <div className="table-responsive mb-4">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "rgba(102,126,234,0.15)" }}>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.6rem 1rem", color: "#fff", fontWeight: 600, width: "25%" }}>Variable Type</th>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.6rem 1rem", color: "#818cf8", fontWeight: 600, width: "25%" }}>Scope</th>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.6rem 1rem", color: "#f59e0b", fontWeight: 600 }}>Security Note</th>
                </tr>
              </thead>
              <tbody>
                {envVarRules.map((row, i) => (
                  <tr key={row.prefix} style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)" }}>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.6rem 1rem", color: "#e2e8f0", fontSize: "0.88rem", fontFamily: "monospace" }}>{row.prefix}</td>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.6rem 1rem", color: "#818cf8", fontSize: "0.88rem" }}>{row.scope}</td>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.6rem 1rem", color: "#f59e0b", fontSize: "0.85rem" }}>{row.risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Compliance */}
          <h3 className="mb-3" style={{ color: "#e2e8f0", fontWeight: 600, fontSize: "1.2rem" }}>Compliance</h3>
          <div className="row g-2">
            {compliance.map((c) => (
              <div key={c.standard} className="col-md-6 col-lg-4">
                <div style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "10px",
                  padding: "0.85rem 1rem",
                }}>
                  <span style={{ color: "#10b981", fontSize: "0.85rem", fontWeight: 700 }}>{c.standard}</span>
                  <p style={{ color: "#94a3b8", fontSize: "0.8rem", lineHeight: 1.5, marginBottom: 0, marginTop: "0.2rem" }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Enterprise Features ─── */}
        <section className="mb-5">
          <h2 className="mb-3" style={{ color: "#fff", fontWeight: 700, fontSize: "1.5rem" }}>
            Enterprise Features
          </h2>
          <div className="row g-3">
            {enterpriseFeatures.map((f) => (
              <div key={f.name} className="col-md-6">
                <div className="feature-card" style={{ padding: "1.25rem" }}>
                  <h4 style={{ fontSize: "0.95rem", marginBottom: "0.4rem" }}>
                    {f.icon} {f.name}
                  </h4>
                  <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: 0 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Pricing ─── */}
        <section className="mb-5">
          <h2 className="mb-3" style={{ color: "#fff", fontWeight: 700, fontSize: "1.5rem" }}>
            Pricing Model — In Depth
          </h2>
          <div className="row g-3 mb-4">
            {plans.map((p) => (
              <div key={p.name} className="col-md-4">
                <div className="feature-card" style={{ padding: "1.25rem", height: "100%" }}>
                  <h3 style={{ fontSize: "1.1rem", marginBottom: "0.2rem" }}>{p.name}</h3>
                  <p style={{ color: "#10b981", fontWeight: 700, fontSize: "1rem", marginBottom: "0.3rem" }}>{p.cost}</p>
                  <p style={{ color: "#818cf8", fontSize: "0.8rem", marginBottom: "0.75rem" }}>{p.who}</p>
                  <ul style={{ paddingLeft: "1.1rem", marginBottom: 0 }}>
                    {p.highlights.map((h) => (
                      <li key={h} style={{ color: "#94a3b8", fontSize: "0.83rem", lineHeight: 1.8 }}>{h}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Cost Gotchas */}
          <h3 className="mb-3" style={{ color: "#e2e8f0", fontWeight: 600, fontSize: "1.2rem" }}>
            ⚠️ What Triggers Cost Growth
          </h3>
          <div className="row g-2 mb-4">
            {costGotchas.map((g) => (
              <div key={g.trigger} className="col-md-6">
                <div style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "10px",
                  padding: "1rem 1.25rem",
                }}>
                  <span style={{ color: "#f59e0b", fontSize: "0.85rem", fontWeight: 700 }}>{g.trigger}</span>
                  <p style={{ color: "#94a3b8", fontSize: "0.83rem", lineHeight: 1.6, marginBottom: 0, marginTop: "0.2rem" }}>{g.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Enterprise Triggers */}
          <div style={{
            background: "linear-gradient(135deg, rgba(102,126,234,0.08), rgba(167,139,250,0.08))",
            border: "1px solid rgba(102,126,234,0.15)",
            borderRadius: "12px",
            padding: "1.5rem",
          }}>
            <h4 style={{ color: "#fff", fontWeight: 600, fontSize: "1rem", marginBottom: "0.75rem" }}>When to Recommend Enterprise</h4>
            <div className="row g-2">
              {enterpriseTriggers.map((t) => (
                <div key={t} className="col-md-6 col-lg-4">
                  <div className="d-flex align-items-center gap-2">
                    <span style={{ color: "#818cf8" }}>→</span>
                    <span style={{ color: "#cbd5e1", fontSize: "0.88rem" }}>{t}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="text-center py-3">
          <Link href="/blog/study-guide" className="btn-glow" style={{ marginRight: "1rem" }}>
            Full Study Guide →
          </Link>
          <Link href="/se" className="btn-glow">
            SE Resources →
          </Link>
        </div>
      </div>
    </main>
  );
}
