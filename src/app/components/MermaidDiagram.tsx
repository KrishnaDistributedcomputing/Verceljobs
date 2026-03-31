"use client";

import { useEffect, useRef, useState } from "react";

interface MermaidDiagramProps {
  chart: string;
  id?: string;
}

export default function MermaidDiagram({ chart, id }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const mermaid = (await import("mermaid")).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        themeVariables: {
          darkMode: true,
          background: "#0f1117",
          primaryColor: "#667eea",
          primaryTextColor: "#e2e8f0",
          primaryBorderColor: "#667eea",
          lineColor: "#667eea",
          secondaryColor: "#1e293b",
          tertiaryColor: "#0f172a",
          textColor: "#e2e8f0",
          mainBkg: "#1e293b",
          nodeBorder: "#667eea",
          clusterBkg: "#0f172a",
          clusterBorder: "#334155",
          titleColor: "#e2e8f0",
          edgeLabelBackground: "#1e293b",
          nodeTextColor: "#e2e8f0",
        },
        flowchart: {
          htmlLabels: true,
          curve: "basis",
          padding: 15,
        },
        fontFamily: "inherit",
      });

      const uniqueId = id || `mermaid-${Math.random().toString(36).slice(2, 9)}`;
      try {
        const { svg: rendered } = await mermaid.render(uniqueId, chart);
        if (!cancelled) setSvg(rendered);
      } catch {
        if (!cancelled) setSvg("");
      }
    })();
    return () => { cancelled = true; };
  }, [chart, id]);

  if (!svg) {
    return (
      <div style={{
        background: "rgba(0,0,0,0.3)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "10px",
        padding: "2rem",
        textAlign: "center",
        color: "#64748b",
        fontSize: "0.85rem",
      }}>
        Loading diagram…
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: svg }}
      style={{
        background: "rgba(0,0,0,0.3)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "10px",
        padding: "1.25rem",
        overflowX: "auto",
        textAlign: "center",
      }}
    />
  );
}
