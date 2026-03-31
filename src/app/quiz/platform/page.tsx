"use client";

import Link from "next/link";
import { QuizEngine, Question } from "../QuizEngine";

const questions: Question[] = [
  {
    id: 1,
    question: "What are the four layers of the Vercel platform mental model?",
    options: [
      "Frontend, Backend, Database, CDN",
      "Developer Experience, Compute, Edge Network, AI Cloud",
      "Build, Deploy, Serve, Monitor",
      "Static, Dynamic, Serverless, Edge",
    ],
    correct: 1,
    explanation: "Vercel's mental model has four layers: Developer Experience Layer (git push → deploy), Compute Layer (Serverless + Edge + Fluid), Edge Network Layer (CDN + Middleware), and AI Cloud Layer (AI SDK, Gateway, Sandbox).",
  },
  {
    id: 2,
    question: "What is the maximum CPU time for Edge Runtime functions?",
    options: ["10ms", "35ms", "100ms", "500ms"],
    correct: 1,
    explanation: "Edge Runtime has a hard limit of 35ms CPU time. This is measured in CPU time, not wall clock time — so I/O waits don't count against this limit.",
  },
  {
    id: 3,
    question: "Which runtime should you recommend for a database query?",
    options: [
      "Edge Runtime — it's closer to users",
      "Serverless (Node.js) Runtime — it supports persistent connections",
      "Edge Config — it's optimized for reads",
      "Either — they both support database connections",
    ],
    correct: 1,
    explanation: "Serverless (Node.js) Runtime supports full npm packages, persistent connections, and file system access. Edge Runtime runs V8 isolates with Web Standard APIs only — no database connections.",
  },
  {
    id: 4,
    question: "When was Fluid Compute enabled by default for new Vercel projects?",
    options: ["January 2024", "October 2024", "February 2025", "April 23, 2025"],
    correct: 3,
    explanation: "Fluid Compute was announced February 2025 and enabled by default for new projects from April 23, 2025. It's Vercel's biggest architectural evolution since launch.",
  },
  {
    id: 5,
    question: "What does 'Active CPU pricing' mean in Fluid Compute?",
    options: [
      "You pay for the total request duration including I/O waits",
      "You pay only for milliseconds your code executes on the CPU, not I/O wait time",
      "You pay a fixed monthly fee for CPU allocation",
      "CPU pricing is based on the region you deploy to",
    ],
    correct: 1,
    explanation: "Active CPU pricing means you only pay for the milliseconds your code actually executes. A 10-second LLM streaming response with 200ms of actual CPU work = 200ms billing, not 10 seconds.",
  },
  {
    id: 6,
    question: "What is the core value proposition of Vercel in one sentence?",
    options: [
      "The cheapest hosting platform for React applications",
      "From code to globally distributed, framework-optimised infrastructure in one git push — with zero configuration",
      "A serverless platform that competes with AWS Lambda",
      "The best CDN for serving static websites",
    ],
    correct: 1,
    explanation: "Vercel's core value proposition is framework-defined infrastructure (FDI). Your Next.js code defines the infrastructure — routing, compute, caching — with zero manual configuration.",
  },
  {
    id: 7,
    question: "What runs on V8 isolates at Vercel CDN Points of Presence?",
    options: ["Serverless Functions", "Edge Runtime", "Fluid Compute instances", "Static assets"],
    correct: 1,
    explanation: "Edge Runtime runs on V8 isolates (same engine as Chrome) at CDN PoPs — physically close to users. Cold starts are up to 9× faster than traditional serverless.",
  },
  {
    id: 8,
    question: "What problem does Fluid Compute's 'shared instances' solve?",
    options: [
      "Data consistency across regions",
      "Cold start overhead of spinning up a new microVM per invocation",
      "Cross-region data replication latency",
      "JavaScript bundle size optimization",
    ],
    correct: 1,
    explanation: "Traditional serverless uses one microVM per invocation. Fluid Compute shares instances across concurrent requests — think 'mini-servers' instead of single-use functions. This eliminates cold start overhead.",
  },
  {
    id: 9,
    question: "Which of these is NOT available in Edge Runtime?",
    options: ["fetch() API", "crypto API", "File system (fs) access", "URL API"],
    correct: 2,
    explanation: "Edge Runtime only supports Web Standard APIs (fetch, Request, Response, URL, crypto). No file system, no native modules, no arbitrary npm packages.",
  },
  {
    id: 10,
    question: "Who founded Vercel, and what else did they create?",
    options: [
      "Dan Abramov — creator of Redux and React Hooks",
      "Guillermo Rauch — creator of Next.js and Socket.io",
      "Evan You — creator of Vue.js and Vite",
      "Ryan Dahl — creator of Node.js and Deno",
    ],
    correct: 1,
    explanation: "Guillermo Rauch founded Vercel (originally Zeit). He's also the creator of Next.js and Socket.io. Vercel raised $300M at $9.3B valuation in October 2025.",
  },
];

export default function PlatformQuiz() {
  return (
    <main className="py-5">
      <div className="container" style={{ maxWidth: "750px" }}>
        <Link href="/quiz" style={{ color: "#667eea", textDecoration: "none", fontSize: "0.9rem" }}>
          ← All Quizzes
        </Link>
        <h1 className="mt-3 mb-4" style={{ fontSize: "1.8rem", fontWeight: 800, color: "#fff" }}>
          🏗️ Platform Fundamentals Quiz
        </h1>
        <QuizEngine title="Platform Fundamentals" questions={questions} backHref="/quiz" />
      </div>
    </main>
  );
}
