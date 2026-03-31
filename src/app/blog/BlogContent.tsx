"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, Suspense } from "react";
import { MarkdownRenderer } from "../components/MarkdownRenderer";

function BlogSearch({ content }: { content: string }) {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const sections = useMemo(() => {
    // Split markdown into sections by ## headings
    const parts = content.split(/(?=^## )/m);
    return parts;
  }, [content]);

  const filtered = useMemo(() => {
    if (!query) return sections;
    const lower = query.toLowerCase();
    return sections.filter((s) => s.toLowerCase().includes(lower));
  }, [sections, query]);

  const matchCount = query ? filtered.length : 0;

  return (
    <main className="py-5">
      <div className="container blog-container mx-auto">
        <div className="mb-4 d-flex align-items-center gap-3 flex-wrap">
          <span
            style={{
              background: "rgba(102,126,234,0.15)",
              color: "#818cf8",
              padding: "0.3rem 0.75rem",
              borderRadius: "20px",
              fontSize: "0.85rem",
              fontWeight: 600,
            }}
          >
            Study Guide
          </span>
          {query && (
            <span style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
              {matchCount} section{matchCount !== 1 ? "s" : ""} matching{" "}
              <strong style={{ color: "#a5b4fc" }}>&quot;{query}&quot;</strong>
              {" · "}
              <a href="/blog" style={{ color: "#667eea", textDecoration: "none" }}>
                Clear
              </a>
            </span>
          )}
        </div>
        {filtered.length > 0 ? (
          <MarkdownRenderer content={filtered.join("\n")} />
        ) : (
          <div
            className="text-center py-5"
            style={{ color: "#64748b" }}
          >
            <p style={{ fontSize: "1.2rem" }}>
              No sections found matching &quot;{query}&quot;
            </p>
            <a href="/blog" style={{ color: "#667eea" }}>
              View full study guide
            </a>
          </div>
        )}
      </div>
    </main>
  );
}

export function BlogContent({ content }: { content: string }) {
  return (
    <Suspense
      fallback={
        <main className="py-5">
          <div className="container blog-container mx-auto">
            <MarkdownRenderer content={content} />
          </div>
        </main>
      }
    >
      <BlogSearch content={content} />
    </Suspense>
  );
}
