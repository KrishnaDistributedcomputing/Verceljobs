import Link from "next/link";

const jobCategories = [
  {
    category: "Solutions & Customer-Facing",
    jobs: [
      { title: "Solutions Architect", location: "Austin, NYC, San Francisco", url: "https://vercel.com/careers/solutions-architect-5804110004" },
      { title: "Solutions Architect (APAC)", location: "Australia", url: "https://vercel.com/careers/solutions-architect-5804110004" },
      { title: "Solutions Architect (EMEA)", location: "Germany, United Kingdom", url: "https://vercel.com/careers/solutions-architect-uk-5796302004" },
      { title: "Developer Success Engineer", location: "Germany, United Kingdom", url: "https://vercel.com/careers/developer-success-engineer-uk-5530586004" },
    ],
  },
  {
    category: "Sales & Business Development",
    jobs: [
      { title: "Account Executive, Commercial Install Base", location: "Austin, NYC, San Francisco", url: "https://vercel.com/careers/account-executive-commercial-install-base-5708732004" },
      { title: "Account Executive - Startups (APAC)", location: "Australia", url: "https://vercel.com/careers/account-executive-startups-apac-5807654004" },
      { title: "Account Executive - Startups, Greenfield", location: "Austin, NYC, San Francisco", url: "https://vercel.com/careers/account-executive-startups-greenfield-5624231004" },
      { title: "Account Executive - Startups (EMEA)", location: "Berlin, London", url: "https://vercel.com/careers/account-executive-startups-greenfield-emea-5752956004" },
      { title: "Vercel Development Rep, Commercial", location: "Austin, NYC, San Francisco", url: "https://vercel.com/careers/vercel-development-representative-commercial-5065840004" },
      { title: "Vercel Development Rep, Startups", location: "Austin, NYC, San Francisco", url: "https://vercel.com/careers/vercel-development-representative-startups-5815357004" },
      { title: "Vercel Development Rep, Startups (EMEA)", location: "London", url: "https://vercel.com/careers/vercel-development-representative-startups-5822513004" },
    ],
  },
  {
    category: "Engineering",
    jobs: [
      { title: "Software Engineer, Deployment Infrastructure", location: "United States", url: "https://vercel.com/careers/software-engineer-deployment-infrastructure-5633880004" },
      { title: "Software Engineer, Domains", location: "United States", url: "https://vercel.com/careers/software-engineer-domains-us-5813134004" },
      { title: "Software Engineer, Growth", location: "NYC, San Francisco", url: "https://vercel.com/careers/software-engineer-growth-5613601004" },
      { title: "Software Engineer, Lua", location: "United States", url: "https://vercel.com/careers/software-engineer-lua-us-5661583004" },
      { title: "Software Engineer, Workflows", location: "NYC, San Francisco", url: "https://vercel.com/careers/software-engineer-workflows-5798416004" },
      { title: "Design Engineer", location: "United States", url: "https://vercel.com/careers/design-engineer-us-5709080004" },
      { title: "Content Engineer", location: "Austin, NYC, San Francisco", url: "https://vercel.com/careers/content-engineer-5820658004" },
    ],
  },
  {
    category: "Legal & Finance",
    jobs: [
      { title: "Director of Legal, Product Foundations", location: "San Francisco", url: "https://vercel.com/careers/director-of-legal-product-foundations-5781036004" },
      { title: "Director of Trust & Safety Engineering", location: "San Francisco", url: "https://vercel.com/careers/director-of-trust-and-safety-engineering-5719801004" },
      { title: "Director, Product Counseling", location: "San Francisco", url: "https://vercel.com/careers/director-product-counseling-5691965004" },
      { title: "Director, Technical Accounting & Financial Reporting", location: "San Francisco", url: "https://vercel.com/careers/director-technical-accounting-financial-reporting" },
    ],
  },
];

export default function JobsPage() {
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
          💼 Jobs & Careers at Vercel
        </h1>
        <p style={{ color: "#94a3b8", marginBottom: "0.5rem" }}>
          Open positions crawled from{" "}
          <a href="https://vercel.com/careers" target="_blank" rel="noopener noreferrer" style={{ color: "#818cf8" }}>vercel.com/careers</a>{" "}
          — March 2026.
        </p>
        <p style={{ color: "#64748b", fontSize: "0.85rem", marginBottom: "2rem" }}>
          Vercel is hiring across Solutions, Engineering, Sales, and Legal. Locations span US, EMEA, and APAC.
        </p>

        <div className="d-flex flex-column gap-4">
          {jobCategories.map((cat) => (
            <div key={cat.category}>
              <h2
                className="mb-3"
                style={{ color: "#e2e8f0", fontSize: "1.4rem", fontWeight: 700 }}
              >
                {cat.category}
                <span
                  style={{
                    background: "rgba(102,126,234,0.15)",
                    color: "#818cf8",
                    padding: "0.15rem 0.5rem",
                    borderRadius: "10px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    marginLeft: "0.75rem",
                    verticalAlign: "middle",
                  }}
                >
                  {cat.jobs.length} roles
                </span>
              </h2>
              <div className="row g-3">
                {cat.jobs.map((job) => (
                  <div key={job.title + job.location} className="col-md-6">
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className="feature-card"
                        style={{ padding: "1.25rem" }}
                      >
                        <h3 style={{ fontSize: "1rem", marginBottom: "0.4rem" }}>
                          {job.title}
                        </h3>
                        <p style={{ fontSize: "0.85rem", marginBottom: 0, color: "#64748b" }}>
                          📍 {job.location}
                        </p>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <a
            href="https://vercel.com/careers"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow"
          >
            View All Positions on Vercel →
          </a>
        </div>
      </div>
    </main>
  );
}
