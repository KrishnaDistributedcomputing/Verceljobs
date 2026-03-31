import fs from "fs";
import path from "path";
import { MarkdownRenderer } from "../components/MarkdownRenderer";

export default function BlogPage() {
  const filePath = path.join(
    process.cwd(),
    "Vercel_SE_Technical_Study_Guide.md"
  );
  const content = fs.readFileSync(filePath, "utf-8");

  return (
    <main className="py-5">
      <div className="container blog-container mx-auto">
        <div className="mb-4">
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
        </div>
        <MarkdownRenderer content={content} />
      </div>
    </main>
  );
}
