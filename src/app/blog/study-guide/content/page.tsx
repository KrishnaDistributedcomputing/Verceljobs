import fs from "fs";
import path from "path";
import { BlogContent } from "../../BlogContent";

export default function StudyGuideContentPage() {
  const filePath = path.join(
    process.cwd(),
    "Vercel_SE_Technical_Study_Guide.md"
  );
  const content = fs.readFileSync(filePath, "utf-8");

  return <BlogContent content={content} />;
}
