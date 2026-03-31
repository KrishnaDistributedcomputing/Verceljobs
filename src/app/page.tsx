import fs from "fs";
import path from "path";
import { MarkdownRenderer } from "./markdown";

export default function Home() {
  const filePath = path.join(
    process.cwd(),
    "Vercel_SE_Technical_Study_Guide.md"
  );
  const content = fs.readFileSync(filePath, "utf-8");

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <MarkdownRenderer content={content} />
      </div>
    </main>
  );
}
