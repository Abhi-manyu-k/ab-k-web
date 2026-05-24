export const services = [
  {
    id: "strategy",
    title: "Enterprise AI Strategy & ROI Alignment",
    summary:
      "Define where agentic AI creates durable value—and where it does not—before capital and credibility are spent.",
    icon: "Target",
    capabilities: [
      "AI opportunity mapping across business units",
      "Executive roadmap design with measurable milestones",
      "Governance-aware adoption frameworks",
      "Value realization and ROI measurement models",
    ],
  },
  {
    id: "agentic",
    title: "Agentic Architecture & Implementation",
    summary:
      "Design and deploy tool-calling agents, orchestration layers, and knowledge systems built for real workflows.",
    icon: "Network",
    capabilities: [
      "Tool-calling agents with human-in-the-loop controls",
      "LangGraph-style orchestration and state management",
      "n8n and workflow automation integration patterns",
      "Multi-agent systems and graph-based RAG workflows",
    ],
  },
  {
    id: "integration",
    title: "Hardware / Software Integration",
    summary:
      "Bridge enterprise software with shop-floor reality through live data streams and operational interfaces.",
    icon: "Cpu",
    capabilities: [
      "Live data streams from IoT and industrial systems",
      "IoT-to-LLM decision support workflows",
      "MCP-style tool interfaces for enterprise systems",
      "Operational dashboards and shop-floor data realities",
    ],
  },
  {
    id: "production",
    title: "Production Enablement",
    summary:
      "Move from compelling demos to governed, observable systems your organization can maintain and scale.",
    icon: "Rocket",
    capabilities: [
      "Prototype-to-production migration planning",
      "Cloud deployment patterns, including Azure environments",
      "Observability, security review readiness, and maintainability",
      "Team enablement and operating model design",
    ],
  },
] as const;

export const caseStudyMetrics = [
  {
    value: "100+",
    label: "Global Field Engineers Onboarded",
    description:
      "Successfully scaled proprietary agentic service assistants from localized prototypes to global daily use.",
  },
  {
    value: "100%",
    label: "Enterprise MCP Standardization",
    description:
      "Architected secure, governed pipelines connecting live hardware telemetry directly to LLMs on Azure.",
  },
  {
    value: "Zero",
    label: "Vendor Lock-In",
    description:
      "Built custom LangGraph and n8n orchestration backends to protect enterprise IP and guarantee strict ROI.",
  },
] as const;

export const caseStudies = [
  {
    id: "scale",
    title: "Global Agentic Service Assistant Rollout",
    context:
      "Leading semiconductor equipment manufacturer seeking to move from localized AI pilots to enterprise-wide field support.",
    challenge:
      "Fragmented prototypes could not scale across regions, teams, or governance requirements without losing reliability.",
    intervention:
      "Led end-to-end development of a proprietary AI Service Assistant, designing adoption patterns, reference workflows, and enablement for global engineering teams.",
    impact:
      "Scaled proprietary agentic service assistants from localized prototypes to global daily use across 100+ field engineers.",
  },
  {
    id: "mcp-azure",
    title: "Enterprise MCP Integration on Azure",
    context:
      "Enterprise environment requiring secure connections between live hardware telemetry and LLM-powered support systems.",
    challenge:
      "Legacy integrations lacked governance, standardization, and a path to production-grade observability on Azure.",
    intervention:
      "Architected secure, governed MCP pipelines connecting live hardware telemetry directly to LLMs with enterprise identity and data policies.",
    impact:
      "Achieved 100% enterprise MCP standardization with production-ready Azure deployment and governed tool interfaces.",
  },
  {
    id: "orchestration",
    title: "Custom Agentic Orchestration",
    context:
      "Organization needing autonomous workflows without surrendering IP or accepting proprietary vendor lock-in.",
    challenge:
      "Off-the-shelf platforms could not support multi-step workflows, live database queries, and strict ROI accountability.",
    intervention:
      "Built custom LangGraph and n8n orchestration backends with tool-calling agents, retrieval layers, and human approval gates.",
    impact:
      "Delivered zero vendor lock-in architecture with autonomous tools that query live databases and execute multi-step workflows.",
  },
  {
    id: "industrial",
    title: "Industrial Data to LLM Pipelines",
    context:
      "Manufacturing and field-service environment with heterogeneous operational and telemetry data sources.",
    challenge:
      "Passive chat interfaces could not act on live data or support shop-floor decision loops without compromising uptime.",
    intervention:
      "Designed streaming data pipelines, MCP-style interfaces, and operator-facing dashboards with LLM-assisted analysis.",
    impact:
      "Connected industrial telemetry and operational data to agentic workflows that drive measurable field-service ROI.",
  },
] as const;

export const aboutPillars = [
  {
    title: "C-Suite Strategy & ROI",
    description:
      "Board-ready narratives, investment cases, and adoption roadmaps that connect AI ambition to measurable business outcomes.",
    icon: "Briefcase",
  },
  {
    title: "Software Architecture",
    description:
      "Agentic system design, orchestration patterns, retrieval strategies, and integration blueprints built for enterprise constraints.",
    icon: "Layers",
  },
  {
    title: "Physical & Operational Reality",
    description:
      "Live data streams, industrial workflows, hardware interfaces, and shop-floor contexts that most AI consultancies never touch.",
    icon: "Factory",
  },
] as const;

export const founderBio = {
  name: "Abhimanyu Kanwar",
  title: "Founder, AB Kinetics",
  paragraphs: [
    "As the founder of AB Kinetics, Abhimanyu Kanwar represents a rare breed of Enterprise AI Architect: a vertical integrator who speaks the language of the boardroom, the IDE, and the shop floor.",
    "With a foundation in Mechanical and Production Engineering from RWTH Aachen and advanced research in GraphRAG multi-agent systems at the University of Cambridge Service Alliance, Abhimanyu Kanwar bridges the critical gap between executive AI strategy and physical engineering realities. Rather than deploying passive chatbots, they specialize in architecting industrial-grade agentic workflows.",
    "Most recently, Abhimanyu Kanwar led the end-to-end development of a proprietary AI Service Assistant for a leading semiconductor equipment manufacturer, scaling the system to over 100 global engineers. By standardizing Model Context Protocol (MCP) integrations on Azure and leveraging orchestration frameworks like LangGraph and n8n, Abhimanyu Kanwar helps enterprises escape prototype purgatory—deploying autonomous tools that query live databases, execute multi-step workflows, and drive measurable ROI.",
  ],
} as const;

export const homeTeasers = [
  {
    title: "Services",
    description: "Strategy, agentic architecture, integration, and production enablement.",
    href: "/services",
    cta: "Explore Services",
  },
  {
    title: "Vertical Integration",
    description: "Why bridging strategy, software, and operations is our edge.",
    href: "/about",
    cta: "Our Approach",
  },
  {
    title: "Proven Impact",
    description: "Enterprise-scale outcomes across global rollouts and governed production systems.",
    href: "/case-studies",
    cta: "View Track Record",
  },
] as const;
