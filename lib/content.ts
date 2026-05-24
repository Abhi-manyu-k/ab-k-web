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

export const caseStudies = [
  {
    id: "scale",
    title: "Enterprise AI Adoption at Scale",
    context: "Global technology organization expanding AI capabilities across engineering teams.",
    challenge:
      "Fragmented pilots, inconsistent tooling, and no shared path from experimentation to governed production.",
    intervention:
      "Designed an adoption framework, reference architectures, and enablement patterns for agentic workflows across multiple product lines.",
    impact:
      "[Replace with real metric] — e.g., scaled AI adoption patterns across 100+ engineers with standardized governance.",
    isPlaceholder: true,
  },
  {
    id: "production-migration",
    title: "Prototype to Production Migration",
    context: "Enterprise team with a successful AI pilot facing corporate governance and cloud constraints.",
    challenge:
      "The prototype worked in isolation but could not pass security review or integrate with existing identity and data policies.",
    intervention:
      "Led architecture redesign, Azure deployment planning, observability setup, and stakeholder alignment for production rollout.",
    impact:
      "[Replace with real metric] — e.g., guided migration to a governed enterprise cloud environment within target timeline.",
    isPlaceholder: true,
  },
  {
    id: "agentic-workflows",
    title: "Agentic Workflow Integration",
    context: "Operations-led initiative connecting knowledge systems with tooling and decision loops.",
    challenge:
      "Passive chat interfaces could not act on live data or trigger downstream workflows reliably.",
    intervention:
      "Built multi-agent workflows with tool interfaces, retrieval layers, and human approval gates for high-stakes actions.",
    impact:
      "[Replace with real metric] — e.g., reduced manual triage time or accelerated decision cycles in target process.",
    isPlaceholder: true,
  },
  {
    id: "industrial",
    title: "Industrial Data to LLM Pipelines",
    context: "Manufacturing environment with heterogeneous shop-floor data sources.",
    challenge:
      "Operational data lived in silos; leadership needed actionable insights without compromising uptime or safety.",
    intervention:
      "Designed streaming data pipelines, MCP-style interfaces, and operator-facing dashboards with LLM-assisted analysis.",
    impact:
      "[Replace with real metric] — e.g., improved visibility into production anomalies or reduced response time.",
    isPlaceholder: true,
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
    description: "Representative engagements and outcomes—details available in conversation.",
    href: "/case-studies",
    cta: "View Track Record",
  },
] as const;
