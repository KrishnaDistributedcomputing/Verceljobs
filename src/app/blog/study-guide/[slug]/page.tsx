import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownRenderer } from "../../../components/MarkdownRenderer";

const chapters = [
  { num: 1, slug: "what-the-role-is", part: "Part I: Role & Platform Foundation", partIcon: "🎯", color: "#667eea" },
  { num: 2, slug: "mental-model", part: "Part I: Role & Platform Foundation", partIcon: "🎯", color: "#667eea" },
  { num: 3, slug: "build-pipeline", part: "Part II: Build, Deploy & Serve", partIcon: "🚀", color: "#f472b6" },
  { num: 4, slug: "preview-deployments", part: "Part II: Build, Deploy & Serve", partIcon: "🚀", color: "#f472b6" },
  { num: 5, slug: "compute-runtimes", part: "Part II: Build, Deploy & Serve", partIcon: "🚀", color: "#f472b6" },
  { num: 6, slug: "fluid-compute", part: "Part II: Build, Deploy & Serve", partIcon: "🚀", color: "#f472b6" },
  { num: 7, slug: "edge-network", part: "Part II: Build, Deploy & Serve", partIcon: "🚀", color: "#f472b6" },
  { num: 8, slug: "rendering-strategies", part: "Part III: Next.js Framework Mastery", partIcon: "⚡", color: "#34d399" },
  { num: 9, slug: "caching", part: "Part III: Next.js Framework Mastery", partIcon: "⚡", color: "#34d399" },
  { num: 10, slug: "middleware-routing", part: "Part III: Next.js Framework Mastery", partIcon: "⚡", color: "#34d399" },
  { num: 11, slug: "core-web-vitals", part: "Part III: Next.js Framework Mastery", partIcon: "⚡", color: "#34d399" },
  { num: 12, slug: "edge-config-kv", part: "Part IV: Platform Services", partIcon: "🔧", color: "#fbbf24" },
  { num: 13, slug: "observability", part: "Part IV: Platform Services", partIcon: "🔧", color: "#fbbf24" },
  { num: 14, slug: "security", part: "Part IV: Platform Services", partIcon: "🔧", color: "#fbbf24" },
  { num: 15, slug: "ai-cloud", part: "Part V: AI Cloud", partIcon: "🤖", color: "#a78bfa" },
  { num: 16, slug: "composable-architecture", part: "Part VI: Architecture & Business", partIcon: "🏗️", color: "#fb923c" },
  { num: 17, slug: "customer-architectures", part: "Part VI: Architecture & Business", partIcon: "🏗️", color: "#fb923c" },
  { num: 18, slug: "migration-patterns", part: "Part VI: Architecture & Business", partIcon: "🏗️", color: "#fb923c" },
  { num: 19, slug: "pricing", part: "Part VI: Architecture & Business", partIcon: "🏗️", color: "#fb923c" },
  { num: 20, slug: "enterprise-features", part: "Part VI: Architecture & Business", partIcon: "🏗️", color: "#fb923c" },
  { num: 21, slug: "interview-topics", part: "Part VII: Interview Preparation", partIcon: "🎤", color: "#f87171" },
  { num: 22, slug: "glossary", part: "Part VII: Interview Preparation", partIcon: "🎤", color: "#f87171" },
];

function extractSection(content: string, chapterNum: number): string {
  const lines = content.split("\n");
  let start = -1;
  let end = lines.length;

  // Find section start: "## N.  Title"
  const startPattern = new RegExp(`^## ${chapterNum}\\.\\s`);
  for (let i = 0; i < lines.length; i++) {
    if (startPattern.test(lines[i])) {
      start = i;
      break;
    }
  }

  if (start === -1) return "";

  // Find section end: next "## N." or "# Part"
  for (let i = start + 1; i < lines.length; i++) {
    if (/^## \d+\.\s/.test(lines[i]) || /^# Part/.test(lines[i])) {
      end = i;
      break;
    }
  }

  // Trim trailing blank lines and ---
  const section = lines.slice(start, end);
  while (section.length && section[section.length - 1].trim() === "") section.pop();
  while (section.length && section[section.length - 1].trim() === "---") section.pop();
  while (section.length && section[section.length - 1].trim() === "") section.pop();

  return section.join("\n");
}

export function generateStaticParams() {
  return chapters.map((ch) => ({ slug: ch.slug }));
}

export default async function ChapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const chapter = chapters.find((c) => c.slug === slug);
  if (!chapter) notFound();

  const filePath = path.join(process.cwd(), "Vercel_SE_Technical_Study_Guide.md");
  const content = fs.readFileSync(filePath, "utf-8");
  const sectionMd = extractSection(content, chapter.num);

  if (!sectionMd) notFound();

  // Extract title from the first line "## N.  Title"
  const titleMatch = sectionMd.match(/^## \d+\.\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1] : `Chapter ${chapter.num}`;

  // Remove the ## heading from the body since we render it in the header
  const bodyMd = sectionMd.replace(/^## .+\n+/, "");

  const prevChapter = chapters.find((c) => c.num === chapter.num - 1);
  const nextChapter = chapters.find((c) => c.num === chapter.num + 1);

  return (
    <main className="py-5">
      <div className="container" style={{ maxWidth: "900px" }}>
        {/* Breadcrumb */}
        <div className="d-flex align-items-center gap-2 flex-wrap mb-3" style={{ fontSize: "0.9rem" }}>
          <Link href="/blog/study-guide" style={{ color: "#667eea", textDecoration: "none" }}>
            ← Study Guide
          </Link>
          <span style={{ color: "#475569" }}>·</span>
          <span style={{ color: chapter.color, fontWeight: 600 }}>
            {chapter.partIcon} {chapter.part}
          </span>
        </div>

        {/* Header */}
        <div className="mb-4">
          <div className="d-flex align-items-center gap-3 mb-2">
            <span
              style={{
                background: `${chapter.color}22`,
                color: chapter.color,
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.1rem",
                fontWeight: 800,
                flexShrink: 0,
              }}
            >
              {chapter.num}
            </span>
            <h1 style={{ fontSize: "2rem", fontWeight: 800, margin: 0 }}>{title}</h1>
          </div>
          <div
            style={{
              height: "3px",
              width: "80px",
              background: `linear-gradient(90deg, ${chapter.color}, transparent)`,
              borderRadius: "2px",
              marginTop: "0.75rem",
            }}
          />
        </div>

        {/* Content */}
        <div className="blog-content">
          <MarkdownRenderer content={bodyMd} />
        </div>

        {/* Prev / Next navigation */}
        <div
          className="d-flex justify-content-between align-items-stretch gap-3 mt-5 pt-4"
          style={{ borderTop: "1px solid rgba(148,163,184,0.15)" }}
        >
          {prevChapter ? (
            <Link
              href={`/blog/study-guide/${prevChapter.slug}`}
              className="feature-card"
              style={{ textDecoration: "none", padding: "1rem 1.25rem", flex: 1, maxWidth: "48%" }}
            >
              <div style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: "0.25rem" }}>← Previous</div>
              <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                {prevChapter.num}. {chapters[prevChapter.num - 1] && extractTitleQuick(prevChapter.num)}
              </div>
            </Link>
          ) : (
            <div style={{ flex: 1 }} />
          )}
          {nextChapter ? (
            <Link
              href={`/blog/study-guide/${nextChapter.slug}`}
              className="feature-card"
              style={{ textDecoration: "none", padding: "1rem 1.25rem", flex: 1, maxWidth: "48%", textAlign: "right" }}
            >
              <div style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: "0.25rem" }}>Next →</div>
              <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                {nextChapter.num}. {extractTitleQuick(nextChapter.num)}
              </div>
            </Link>
          ) : (
            <div style={{ flex: 1 }} />
          )}
        </div>
      </div>
    </main>
  );
}

function extractTitleQuick(num: number): string {
  const titles: Record<number, string> = {
    1: "What the Role Actually Is",
    2: "The Vercel Platform — Mental Model",
    3: "The Build Pipeline & Deployment Model",
    4: "Preview Deployments",
    5: "Compute — The Three Runtimes",
    6: "Fluid Compute — The 2025 Game Changer",
    7: "Edge Network & CDN",
    8: "Next.js Rendering Strategies",
    9: "Caching — The Most Important Topic",
    10: "Middleware & Routing",
    11: "Core Web Vitals — What You Must Know",
    12: "Edge Config & KV Storage",
    13: "Observability — Speed Insights, Web Vitals, Logs",
    14: "Security — WAF, DDoS, Access Control",
    15: "The AI Cloud Layer",
    16: "Composable Architecture & Headless Integrations",
    17: "Common Customer Architectures",
    18: "Migration Patterns",
    19: "Pricing Model — In Depth",
    20: "Enterprise Features",
    21: "SE Interview Topics & Common Questions",
    22: "Glossary",
  };
  return titles[num] || `Chapter ${num}`;
}
