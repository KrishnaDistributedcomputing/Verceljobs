"use client";

import Link from "next/link";
import { QuizEngine, Question } from "../QuizEngine";

const questions: Question[] = [
  {
    id: 1,
    question: "What does the Vercel AI SDK's streamText() function do?",
    options: [
      "Streams video content to the client",
      "Streams LLM text responses token-by-token to the browser for real-time chat UIs",
      "Converts text to speech and streams audio",
      "Streams log data to a monitoring service",
    ],
    correct: 1,
    explanation: "streamText() sends LLM responses incrementally to the browser as tokens are generated. Combined with useChat() on the client, it creates real-time chat experiences with proper streaming UI.",
  },
  {
    id: 2,
    question: "What is the Vercel AI Gateway?",
    options: [
      "A VPN for accessing AI models",
      "A unified endpoint to 100+ AI models with routing, fallback, rate limiting, and cost tracking",
      "A firewall specifically for AI traffic",
      "Vercel's own large language model",
    ],
    correct: 1,
    explanation: "AI Gateway provides a single endpoint to route to 100+ models (OpenAI, Anthropic, Google, etc.). It handles model failover, rate limiting per provider, BYOK support, and usage/cost tracking.",
  },
  {
    id: 3,
    question: "How does Fluid Compute reduce costs for AI streaming applications?",
    options: [
      "It compresses AI model weights for faster inference",
      "It bills only for active CPU time, not I/O wait during LLM streaming — 80-90% cost reduction",
      "It caches all AI responses for reuse",
      "It routes to cheaper AI providers automatically",
    ],
    correct: 1,
    explanation: "An LLM streaming response might take 10-60 seconds, but actual CPU work is ~200ms. Traditional serverless bills for all 60s. Fluid Compute bills only the 200ms of active CPU — 80-90% savings.",
  },
  {
    id: 4,
    question: "What problem does the Workflow SDK (use-workflow) solve?",
    options: [
      "UI component layout and design",
      "Function timeout limits for long-running AI agents — durable steps that resume after timeouts",
      "Routing between multiple Next.js pages",
      "Managing git branch workflows",
    ],
    correct: 1,
    explanation: "Workflow SDK provides durable orchestration for AI agents. Each step persists state — if the function times out, execution resumes from the last completed step. Essential for multi-step agent workflows.",
  },
  {
    id: 5,
    question: "What is the Vercel Sandbox used for?",
    options: [
      "Testing deployments before production",
      "Isolated Linux containers for secure code execution by AI agents — no security risk",
      "A sandbox environment for new Vercel account setup",
      "Preview deployments with limited features",
    ],
    correct: 1,
    explanation: "Vercel Sandbox provides ephemeral, isolated Linux containers. AI agents can execute untrusted code, run benchmarks, perform filesystem searches — all without security risk to the host platform.",
  },
  {
    id: 6,
    question: "What did AI SDK 6 (October 2025) add?",
    options: [
      "Support for image generation only",
      "Agent definition layer, tool execution approval, type safety across models, durable workflows",
      "A new CSS framework for AI interfaces",
      "Support for Python models only",
    ],
    correct: 1,
    explanation: "AI SDK 6 added: agent abstraction layer (define reusable agents), human-in-the-loop tool approval, compile-time type safety across model/UI data, and durable workflow tooling for long-running agents.",
  },
  {
    id: 7,
    question: "What is v0 and how many users does it have?",
    options: [
      "A version control system — 500K users",
      "An AI-powered dev assistant that generates Next.js apps from prompts — 4M+ users",
      "A CSS framework — 2M users",
      "A database management tool — 1M users",
    ],
    correct: 1,
    explanation: "v0 converts natural language prompts to production-ready React/Next.js code. 4M+ users by early 2026. It can deploy directly to Vercel with one click and is backed by Vercel's frontend-optimized AI model.",
  },
  {
    id: 8,
    question: "A customer asks: 'Can we use Azure OpenAI through Vercel?' What's the answer?",
    options: [
      "No, Vercel only supports OpenAI directly",
      "Yes — AI Gateway supports Azure OpenAI as a provider, and AI SDK has an Azure OpenAI adapter",
      "Only with Enterprise plan",
      "Only if they migrate away from Azure entirely",
    ],
    correct: 1,
    explanation: "AI Gateway routes to 100+ providers including Azure OpenAI. AI SDK has provider adapters for Azure OpenAI, OpenAI, Anthropic, Google, and more. Customers keep their existing models — Vercel improves the DX around them.",
  },
  {
    id: 9,
    question: "What is the Chat SDK used for?",
    options: [
      "Building customer support chatbots only",
      "Building AI agents that work across Slack, Teams, Discord, WhatsApp from a single codebase",
      "Adding live chat widgets to websites",
      "Creating chatrooms for developer communities",
    ],
    correct: 1,
    explanation: "Chat SDK enables building cross-platform AI agents from one codebase. Platform adapters handle rendering differences across Slack, Teams, Discord, WhatsApp, Telegram, GitHub, and Linear.",
  },
  {
    id: 10,
    question: "Why is Vercel positioned well for the AI era, according to the SE study guide?",
    options: [
      "Because Vercel trains its own foundation models",
      "Because Fluid Compute + AI SDK + AI Gateway make AI apps cheap to run and fast to build",
      "Because Vercel has exclusive partnerships with all AI providers",
      "Because Next.js was originally designed for AI applications",
    ],
    correct: 1,
    explanation: "The AI Cloud Layer is Vercel's biggest strategic bet. Fluid Compute makes AI affordable (80-90% cost reduction), AI SDK makes it easy to build, and AI Gateway makes it provider-agnostic. A compelling platform story.",
  },
];

export default function AIQuiz() {
  return (
    <main className="py-5">
      <div className="container" style={{ maxWidth: "750px" }}>
        <Link href="/quiz" style={{ color: "#667eea", textDecoration: "none", fontSize: "0.9rem" }}>
          ← All Quizzes
        </Link>
        <h1 className="mt-3 mb-4" style={{ fontSize: "1.8rem", fontWeight: 800, color: "#fff" }}>
          🤖 AI & Modern Stack Quiz
        </h1>
        <QuizEngine title="AI & Modern Stack" questions={questions} backHref="/quiz" />
      </div>
    </main>
  );
}
