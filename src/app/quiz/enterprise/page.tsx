"use client";

import Link from "next/link";
import { QuizEngine, Question } from "../QuizEngine";

const questions: Question[] = [
  {
    id: 1,
    question: "What SLA does Vercel Enterprise guarantee?",
    options: ["99.9%", "99.95%", "99.99%", "99.999%"],
    correct: 2,
    explanation: "Vercel Enterprise provides a 99.99% SLA guarantee. Pro plan is 'best-effort' with no guaranteed SLA. This is a key selling point for regulated industries.",
  },
  {
    id: 2,
    question: "Which compliance certifications does Vercel Enterprise support?",
    options: [
      "Only SOC 2",
      "SOC 2 Type II, GDPR, HIPAA (with BAA), PCI DSS considerations, SAML SSO + SCIM",
      "Only GDPR and SOC 2",
      "FedRAMP and ITAR only",
    ],
    correct: 1,
    explanation: "Vercel Enterprise supports SOC 2 Type II (annual audit), GDPR/EU data residency, HIPAA (with Business Associate Agreement), PCI DSS considerations, and SAML SSO + SCIM for identity management.",
  },
  {
    id: 3,
    question: "What is the Vercel Pro plan cost, and what's included?",
    options: [
      "$10/month, unlimited everything",
      "$20/user/month with $20 monthly usage credit, 1TB bandwidth, 300s function timeout",
      "$50/user/month with dedicated support",
      "Free, but with commercial use restrictions",
    ],
    correct: 1,
    explanation: "Pro is $20/user/month. Includes a $20 monthly usage credit, 1TB Fast Data Transfer, 10M Edge Requests, up to 300s function timeout with Fluid Compute, and spend management controls.",
  },
  {
    id: 4,
    question: "When should you recommend Enterprise over Pro to a customer?",
    options: [
      "When they have more than 5 developers",
      "When they need SAML SSO, 99.99% SLA, managed WAF, audit logs, or HIPAA compliance",
      "When their site gets more than 1,000 visitors",
      "When they want to use Next.js",
    ],
    correct: 1,
    explanation: "Enterprise trigger points: SAML SSO requirement, 99.99% SLA needed, managed WAF, audit logs for compliance, multi-region compute, HIPAA/PCI compliance, dedicated support channel.",
  },
  {
    id: 5,
    question: "What's the maximum number of custom WAF rules on Enterprise?",
    options: ["100", "500", "1,000", "Unlimited"],
    correct: 2,
    explanation: "Enterprise plan supports up to 1,000 custom WAF rules and up to 1,000 IP blocking rules. Rules can block by country, rate limit by IP per path, block user agents, and require specific headers.",
  },
  {
    id: 6,
    question: "How do environment variables work in Vercel for security?",
    options: [
      "All variables are exposed to the browser",
      "NEXT_PUBLIC_ prefix = browser-exposed (build-time). No prefix = server-only (runtime, safe for secrets)",
      "All variables are encrypted and only available at build time",
      "Environment variables are not supported on Vercel",
    ],
    correct: 1,
    explanation: "NEXT_PUBLIC_ variables are exposed in the client bundle — never put secrets there. Variables without the prefix are server-only, accessible only in Server Components, API Routes, and Middleware.",
  },
  {
    id: 7,
    question: "What is Vercel's Deployment Protection for enterprise customers?",
    options: [
      "Automatic backups of all deployments",
      "Preview deployments protected by password, Vercel Auth (team only), or Trusted IP restrictions",
      "DDoS protection for production deployments only",
      "Encryption of deployment source code",
    ],
    correct: 1,
    explanation: "Enterprise Deployment Protection: password-protect specific previews, restrict to Vercel-authenticated team members, or limit by IP address/CIDR range. Prevents unauthorized access to preview environments.",
  },
  {
    id: 8,
    question: "Which logging/monitoring tools can Vercel stream logs to via Log Drains?",
    options: [
      "Only Vercel's built-in dashboard",
      "Datadog, New Relic, Axiom, Azure Monitor, Splunk, Elastic",
      "Only AWS CloudWatch",
      "Only Grafana",
    ],
    correct: 1,
    explanation: "Vercel Log Drains can stream all logs to: Datadog, New Relic, Axiom, Azure Monitor, Splunk, Elastic. Enterprise customers integrate with their existing SIEM and observability stack.",
  },
  {
    id: 9,
    question: "A customer's Vercel bill is growing fast. What are the top cost drivers to investigate?",
    options: [
      "Number of team members and domains",
      "Edge Requests (every CDN hit), Active CPU, Fast Data Transfer, ISR revalidation frequency, AI streaming",
      "Number of git commits per day",
      "Number of files in the repository",
    ],
    correct: 1,
    explanation: "Top cost drivers: Edge Requests (every CDN request counts), Active CPU (compute-intensive tasks), Fast Data Transfer (large assets), ISR revalidation frequency (each triggers a function), and AI streaming duration.",
  },
  {
    id: 10,
    question: "What is Vercel's Spend Management feature?",
    options: [
      "A budgeting tool for project managers",
      "Default $200 on-demand budget with alerts + configurable hard limit that auto-pauses all projects",
      "Automatic price negotiation with AI providers",
      "A feature to split bills between team members",
    ],
    correct: 1,
    explanation: "Vercel Spend Management: default $200 on-demand budget with email/SMS/web notifications. You can set a configurable hard limit — when reached, Vercel auto-pauses all projects to prevent surprise bills.",
  },
];

export default function EnterpriseQuiz() {
  return (
    <main className="py-5">
      <div className="container" style={{ maxWidth: "750px" }}>
        <Link href="/quiz" style={{ color: "#667eea", textDecoration: "none", fontSize: "0.9rem" }}>
          ← All Quizzes
        </Link>
        <h1 className="mt-3 mb-4" style={{ fontSize: "1.8rem", fontWeight: 800, color: "#fff" }}>
          🔒 Enterprise & Security Quiz
        </h1>
        <QuizEngine title="Enterprise & Security" questions={questions} backHref="/quiz" />
      </div>
    </main>
  );
}
