import Link from "next/link";

export default function KnowledgeAgentPage() {
  return (
    <main className="py-5">
      <div className="container" style={{ maxWidth: "1100px" }}>
        <Link href="/blog/architectures" style={{ color: "#667eea", textDecoration: "none", fontSize: "0.9rem" }}>
          ← Back to Architecture Patterns
        </Link>

        <div className="mt-3 mb-5">
          <span style={{ background: "rgba(6,182,212,0.15)", color: "#22d3ee", padding: "0.2rem 0.6rem", borderRadius: "12px", fontSize: "0.75rem", fontWeight: 600 }}>
            Architecture Pattern
          </span>
          <h1 className="mt-2" style={{ fontSize: "2.2rem", fontWeight: 800, color: "#fff" }}>
            🧠 Knowledge Agent (No Embeddings)
          </h1>
          <p style={{ color: "#94a3b8", maxWidth: "700px", lineHeight: 1.7 }}>
            Replace vector databases + embeddings with filesystem + bash in Vercel Sandbox.
            The agent uses <code style={{ color: "#22d3ee" }}>grep</code>, <code style={{ color: "#22d3ee" }}>find</code>, and <code style={{ color: "#22d3ee" }}>cat</code> for deterministic retrieval.
            Cost dropped from $1.00 → $0.25 per query.
          </p>
        </div>

        {/* The Problem with Embeddings */}
        <section className="mb-5">
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>The Problem with Traditional RAG</h2>
          <div className="row g-3">
            {[
              { title: "Expensive Embedding Pipeline", desc: "Generating + storing embeddings for every document chunk costs money and time. Re-embedding on content changes is a maintenance burden.", color: "#f59e0b" },
              { title: "Semantic Mismatch", desc: "Vector similarity can return semantically 'close' but factually irrelevant chunks. Precision is lower than exact text matching for many use cases.", color: "#ef4444" },
              { title: "Opaque Retrieval", desc: "Hard to debug why certain chunks were retrieved. No transparency in the embedding → similarity → ranking pipeline.", color: "#f97316" },
              { title: "Infrastructure Overhead", desc: "Pinecone/Qdrant/Weaviate adds another service to manage. Cost scales with document count and query volume.", color: "#ec4899" },
            ].map((p) => (
              <div key={p.title} className="col-md-6">
                <div style={{ background: "rgba(239,68,68,0.06)", border: `1px solid ${p.color}22`, borderRadius: "10px", padding: "1rem", height: "100%" }}>
                  <h4 style={{ color: p.color, fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.3rem" }}>⚠️ {p.title}</h4>
                  <p style={{ color: "#94a3b8", fontSize: "0.83rem", lineHeight: 1.5, marginBottom: 0 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* The Sandbox Solution */}
        <section className="mb-5">
          <h2 style={{ color: "#22d3ee", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>The Sandbox Solution</h2>
          <div style={{ background: "rgba(6,182,212,0.06)", border: "1px solid rgba(6,182,212,0.15)", borderRadius: "12px", padding: "1.5rem", marginBottom: "1.5rem" }}>
            <p style={{ color: "#cbd5e1", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1rem" }}>
              Instead of embeddings, give the AI agent access to a <strong style={{ color: "#22d3ee" }}>Vercel Sandbox with your knowledge base as files</strong>.
              The agent uses standard Unix tools to search and retrieve relevant content:
            </p>
            <div className="d-flex flex-column gap-2">
              {[
                { cmd: "find . -name '*.md' -type f", purpose: "Discover available documentation files" },
                { cmd: "grep -rn 'fluid compute' docs/", purpose: "Search for specific terms across all files" },
                { cmd: "cat docs/platform/compute.md", purpose: "Read full file content for context" },
                { cmd: "head -50 docs/api-reference.md", purpose: "Preview beginning of large files" },
                { cmd: "wc -l docs/**/*.md", purpose: "Understand document structure and size" },
              ].map((c) => (
                <div key={c.cmd} className="d-flex gap-3 align-items-center" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", padding: "0.6rem 1rem" }}>
                  <code style={{ color: "#22d3ee", fontSize: "0.78rem", fontFamily: "monospace", whiteSpace: "nowrap" }}>{c.cmd}</code>
                  <span style={{ color: "#64748b", fontSize: "0.78rem" }}>→ {c.purpose}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cost Comparison */}
        <section className="mb-5">
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>💰 Cost Comparison</h2>
          <div className="row g-3">
            <div className="col-md-6">
              <div style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: "10px", padding: "1.25rem", height: "100%" }}>
                <h4 style={{ color: "#f59e0b", fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.5rem" }}>❌ Embeddings RAG: ~$1.00/query</h4>
                <ul style={{ color: "#94a3b8", fontSize: "0.83rem", lineHeight: 1.8, paddingLeft: "1.1rem", marginBottom: 0 }}>
                  <li>Embedding generation: $0.02</li>
                  <li>Vector DB query: $0.10</li>
                  <li>LLM with retrieved chunks: $0.88</li>
                  <li>Plus: monthly vector DB hosting</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "10px", padding: "1.25rem", height: "100%" }}>
                <h4 style={{ color: "#10b981", fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.5rem" }}>✅ Sandbox Agent: ~$0.25/query</h4>
                <ul style={{ color: "#94a3b8", fontSize: "0.83rem", lineHeight: 1.8, paddingLeft: "1.1rem", marginBottom: 0 }}>
                  <li>Sandbox execution: $0.05</li>
                  <li>grep/cat retrieval: $0.00</li>
                  <li>LLM with exact text: $0.20</li>
                  <li>No external DB hosting needed</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* When to Use */}
        <section className="mb-5">
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>When to Use Each Approach</h2>
          <div className="table-responsive">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "rgba(102,126,234,0.15)" }}>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.6rem 1rem", color: "#fff", fontWeight: 600 }}>Scenario</th>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.6rem 1rem", color: "#22d3ee", fontWeight: 600 }}>Sandbox Agent</th>
                  <th style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "0.6rem 1rem", color: "#f59e0b", fontWeight: 600 }}>Embeddings RAG</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { scenario: "Structured docs (Markdown, code)", sandbox: "✅ grep is exact", rag: "⚠️ Embeddings lose structure" },
                  { scenario: "Small-medium corpus (< 10K files)", sandbox: "✅ File system scales fine", rag: "⚠️ Overkill for small sets" },
                  { scenario: "Exact keyword search needed", sandbox: "✅ Deterministic results", rag: "❌ Semantic only, miss exact matches" },
                  { scenario: "Millions of unstructured docs", sandbox: "❌ File system too slow", rag: "✅ Vector index scales" },
                  { scenario: "Semantic similarity required", sandbox: "⚠️ Keyword-based", rag: "✅ Meaning-based retrieval" },
                  { scenario: "Multi-modal (images, PDFs)", sandbox: "❌ Text files only", rag: "✅ Multi-modal embeddings" },
                ].map((r, i) => (
                  <tr key={r.scenario} style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)" }}>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.55rem 1rem", color: "#cbd5e1", fontSize: "0.85rem" }}>{r.scenario}</td>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.55rem 1rem", color: "#94a3b8", fontSize: "0.83rem" }}>{r.sandbox}</td>
                    <td style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "0.55rem 1rem", color: "#94a3b8", fontSize: "0.83rem" }}>{r.rag}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Architecture */}
        <section className="mb-5">
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", marginBottom: "1rem" }}>Architecture Flow</h2>
          <div className="d-flex flex-column gap-2">
            {[
              { name: "User asks a question", detail: "Natural language query sent to the AI agent.", color: "#667eea" },
              { name: "Agent decides search strategy", detail: "LLM determines which files/directories to search based on the query. Tool calling with grep, find, cat.", color: "#8b5cf6" },
              { name: "Sandbox executes commands", detail: "Vercel Sandbox runs the bash commands in an isolated environment against the knowledge base files.", color: "#06b6d4" },
              { name: "Agent reads results", detail: "Search results (file paths, matching lines, file contents) returned to the LLM context.", color: "#10b981" },
              { name: "Agent answers with citations", detail: "LLM generates answer with exact file paths and line numbers as citations. Fully traceable.", color: "#f59e0b" },
            ].map((s) => (
              <div key={s.name} style={{ background: `${s.color}0a`, border: `1px solid ${s.color}22`, borderRadius: "10px", padding: "1rem 1.25rem" }}>
                <h4 style={{ color: s.color, fontSize: "0.92rem", fontWeight: 700, marginBottom: "0.2rem" }}>{s.name}</h4>
                <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.5, marginBottom: 0 }}>{s.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center py-4">
          <a href="https://vercel.com/blog/build-knowledge-agents-without-embeddings" target="_blank" rel="noopener noreferrer" className="btn-glow" style={{ marginRight: "1rem" }}>
            Read on Vercel Blog →
          </a>
          <Link href="/blog/architectures" className="btn-glow" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
            ← All Architectures
          </Link>
        </div>
      </div>
    </main>
  );
}
