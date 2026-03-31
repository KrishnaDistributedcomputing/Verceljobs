export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row g-4 mb-4 text-start">
          <div className="col-md-4">
            <h6 style={{ color: "#e2e8f0", fontWeight: 600 }}>Vercel</h6>
            <ul className="list-unstyled" style={{ fontSize: "0.85rem" }}>
              <li><a href="https://vercel.com/docs" target="_blank" rel="noopener noreferrer" style={{ color: "#64748b", textDecoration: "none" }}>Documentation</a></li>
              <li><a href="https://vercel.com/blog" target="_blank" rel="noopener noreferrer" style={{ color: "#64748b", textDecoration: "none" }}>Blog</a></li>
              <li><a href="https://vercel.com/changelog" target="_blank" rel="noopener noreferrer" style={{ color: "#64748b", textDecoration: "none" }}>Changelog</a></li>
              <li><a href="https://vercel.com/pricing" target="_blank" rel="noopener noreferrer" style={{ color: "#64748b", textDecoration: "none" }}>Pricing</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h6 style={{ color: "#e2e8f0", fontWeight: 600 }}>Resources</h6>
            <ul className="list-unstyled" style={{ fontSize: "0.85rem" }}>
              <li><a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer" style={{ color: "#64748b", textDecoration: "none" }}>Next.js Docs</a></li>
              <li><a href="https://vercel.com/kb" target="_blank" rel="noopener noreferrer" style={{ color: "#64748b", textDecoration: "none" }}>Knowledge Base</a></li>
              <li><a href="https://vercel.com/academy" target="_blank" rel="noopener noreferrer" style={{ color: "#64748b", textDecoration: "none" }}>Academy</a></li>
              <li><a href="https://vercel.com/templates" target="_blank" rel="noopener noreferrer" style={{ color: "#64748b", textDecoration: "none" }}>Templates</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h6 style={{ color: "#e2e8f0", fontWeight: 600 }}>Community</h6>
            <ul className="list-unstyled" style={{ fontSize: "0.85rem" }}>
              <li><a href="https://github.com/vercel" target="_blank" rel="noopener noreferrer" style={{ color: "#64748b", textDecoration: "none" }}>GitHub</a></li>
              <li><a href="https://community.vercel.com/" target="_blank" rel="noopener noreferrer" style={{ color: "#64748b", textDecoration: "none" }}>Community Forum</a></li>
              <li><a href="https://x.com/vercel" target="_blank" rel="noopener noreferrer" style={{ color: "#64748b", textDecoration: "none" }}>X (Twitter)</a></li>
              <li><a href="https://youtube.com/@VercelHQ" target="_blank" rel="noopener noreferrer" style={{ color: "#64748b", textDecoration: "none" }}>YouTube</a></li>
            </ul>
          </div>
        </div>
        <hr style={{ borderColor: "rgba(255,255,255,0.08)" }} />
        <p className="mb-0 text-center">
          &copy; {new Date().getFullYear()} VercelJobs &mdash; Built with{" "}
          <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" style={{ color: "#667eea", textDecoration: "none" }}>Next.js</a>
          {" "}&amp; deployed on{" "}
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={{ color: "#667eea", textDecoration: "none" }}>Vercel</a>
        </p>
      </div>
    </footer>
  );
}
