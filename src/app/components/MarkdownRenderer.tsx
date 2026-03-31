"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import React from "react";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function headingWithId(Tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") {
  const Component = ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = React.Children.toArray(children).join("");
    // Extract leading number for direct #N anchors (e.g. "3.  Title" -> id="3")
    const numMatch = text.match(/^(\d+)\.\s/);
    const id = numMatch ? numMatch[1] : slugify(text);
    return React.createElement(Tag, { id, ...props }, children);
  };
  Component.displayName = `Heading_${Tag}`;
  return Component;
}

const components: Components = {
  h1: headingWithId("h1"),
  h2: headingWithId("h2"),
  h3: headingWithId("h3"),
  h4: headingWithId("h4"),
};

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="blog-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
