"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Navbar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/blog?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
      <div className="container">
        <Link className="navbar-brand" href="/">
          VercelJobs
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <form onSubmit={handleSearch} className="d-flex mx-auto" style={{ maxWidth: "360px", width: "100%" }}>
            <input
              type="search"
              className="form-control"
              placeholder="Search study guide..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#e2e8f0",
                borderRadius: "8px 0 0 8px",
                fontSize: "0.9rem",
              }}
            />
            <button
              type="submit"
              style={{
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                border: "none",
                color: "#fff",
                padding: "0 1rem",
                borderRadius: "0 8px 8px 0",
                fontWeight: 600,
                fontSize: "0.9rem",
              }}
            >
              Search
            </button>
          </form>
          <ul className="navbar-nav ms-auto gap-2">
            <li className="nav-item">
              <Link className="nav-link" href="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/blog">
                Study Guide
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/se">
                SE Resources
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
