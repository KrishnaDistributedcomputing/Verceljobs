export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} VercelJobs &mdash; Built with Next.js
          &amp; deployed on Vercel
        </p>
      </div>
    </footer>
  );
}
