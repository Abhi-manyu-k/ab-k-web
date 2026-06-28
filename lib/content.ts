export const services = [
  {
    id: "strategy",
    title: "Enterprise AI Strategy & ROI Alignment",
    summary:
      "Define where agentic AI creates value and where it doesn't, before capital and credibility are spent.",
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
    label: "Global field engineers onboarded",
    description:
      "Scaled proprietary agentic service assistants from localized prototypes to daily global use.",
  },
  {
    value: "100%",
    label: "Enterprise MCP standardization",
    description:
      "Governed pipelines connecting live hardware telemetry to LLMs on Azure.",
  },
  {
    value: "Zero",
    label: "Vendor lock-in",
    description:
      "Custom LangGraph and n8n orchestration to protect IP and keep ROI accountable.",
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
      "Board-ready narratives, investment cases, and adoption roadmaps tied to outcomes your leadership team can track.",
    icon: "Briefcase",
  },
  {
    title: "Software Architecture",
    description:
      "Agentic system design, orchestration patterns, retrieval strategies, and integration blueprints for enterprise constraints.",
    icon: "Layers",
  },
  {
    title: "Physical & Operational Reality",
    description:
      "Live data streams, industrial workflows, and shop-floor contexts that most AI consultancies never touch.",
    icon: "Factory",
  },
] as const;

export const founderBio = {
  name: "Abhimanyu Kanwar",
  title: "Founder, AB Kinetics",
  quote:
    "I work where the boardroom, the IDE, and the shop floor meet. That's where agentic AI either ships or stalls.",
  paragraphs: [
    "I'm an enterprise AI architect with a mechanical engineering foundation from RWTH Aachen and research in GraphRAG multi-agent systems at the University of Cambridge Service Alliance.",
    "Most recently I led a proprietary AI Service Assistant for a leading semiconductor equipment manufacturer, scaling it to 100+ field engineers with MCP integrations on Azure and orchestration via LangGraph and n8n.",
    "AB Kinetics exists for teams stuck between strategy decks and demos that never reach production. We build governed systems your organization can run, extend, and measure.",
  ],
} as const;

export const coreConceptPoints = [
  {
    title: "On the org chart",
    description: "Assigned to roles and departments — not floating in a sidebar.",
    icon: "Users",
  },
  {
    title: "Lives in your workflows",
    description: "Slack, Teams, internal tools. Async collaboration with your teams.",
    icon: "MessageSquare",
  },
  {
    title: "Memory that stays scoped",
    description: "Long-term context without cross-department leakage.",
    icon: "Brain",
  },
] as const;

export const platformPillars = [
  {
    id: "harnesses",
    title: "Custom Harnesses",
    summary: "Deep hooks into your APIs, ERP, and internal systems.",
    icon: "Wrench",
  },
  {
    id: "gateway",
    title: "Model Gateway",
    summary: "Route to the right model. Sensitive data stays where it belongs.",
    icon: "GitBranch",
  },
  {
    id: "governance",
    title: "GDPR Governance",
    summary: "Access controls, audit logs, and department-scoped memory.",
    icon: "Shield",
  },
  {
    id: "memory",
    title: "Context & Memory",
    summary: "Persistent knowledge graphs without cross-team leakage.",
    icon: "Database",
  },
] as const;

export const enterpriseUseCases = [
  {
    id: "analyst",
    title: "Virtual Data Analyst",
    department: "Finance",
    description: "Queries ERP and BI systems, flags anomalies, cites source records.",
    capabilities: ["ERP integration", "Reporting", "Anomaly detection"],
    icon: "BarChart3",
  },
  {
    id: "engineer",
    title: "Virtual Support Engineer",
    department: "IT & Ops",
    description: "Triages tickets, runs approved playbooks, escalates with full context.",
    capabilities: ["Ticket triage", "Runbooks", "Escalation"],
    icon: "Headphones",
  },
  {
    id: "compliance",
    title: "Virtual Compliance Officer",
    department: "Legal & Risk",
    description: "Reviews policies against GDPR, monitors regulatory change, produces audit docs.",
    capabilities: ["Policy review", "Regulatory monitoring", "Audit docs"],
    icon: "Scale",
  },
] as const;

export const legacyExpertise = {
  eyebrow: "Deployment experience",
  title: "Built on production-grade knowledge systems",
  description:
    "Before Virtual Employees, we deployed complex agentic RAG and hierarchical knowledge graph systems for global field service operations — scaling to 100+ engineers with governed MCP pipelines on Azure. That same depth of structural integration now powers enterprise-wide agentic workforces.",
  metrics: [
    { value: "100+", label: "Engineers onboarded globally" },
    { value: "100%", label: "MCP standardization on Azure" },
    { value: "Zero", label: "Vendor lock-in" },
  ],
} as const;

export const complianceFeatures = [
  {
    title: "GDPR Compliance",
    description: "Data minimization, purpose limitation, and right-to-erasure built into agent memory architecture.",
    icon: "Lock",
  },
  {
    title: "Audit Logs",
    description: "Immutable records of every model call, tool invocation, and data access — exportable for compliance reviews.",
    icon: "FileText",
  },
  {
    title: "Data Sovereignty",
    description: "Deploy on EU infrastructure or on-premises. Your data never leaves jurisdictions you haven't explicitly approved.",
    icon: "Globe",
  },
  {
    title: "Secure Model Execution",
    description: "Sandboxed tool execution, encrypted context stores, and policy-enforced model routing at the gateway layer.",
    icon: "Server",
  },
] as const;

export const homeTeasers = [
  {
    title: "Services",
    description: "Strategy, agentic architecture, integration, and production enablement.",
    href: "/services",
    cta: "Explore services",
  },
  {
    title: "Vertical integration",
    description: "Why bridging strategy, software, and operations is our edge.",
    href: "/about",
    cta: "Our approach",
  },
  {
    title: "Proven impact",
    description: "Enterprise-scale outcomes across global rollouts and governed production systems.",
    href: "/case-studies",
    cta: "View track record",
  },
] as const;
