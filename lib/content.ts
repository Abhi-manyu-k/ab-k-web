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
    title: "On the org chart, not in a sidebar",
    description:
      "Virtual Employees are assigned to departments, roles, and workflows — with scoped permissions, defined responsibilities, and accountable outputs.",
    icon: "Users",
  },
  {
    title: "Multiplayer by design",
    description:
      "Agents live where your teams work: Slack, Microsoft Teams, internal tools, and ticketing systems. They remember context, collaborate asynchronously, and hand off to humans when judgment is required.",
    icon: "MessageSquare",
  },
  {
    title: "Persistent teammates, not one-off chats",
    description:
      "Long-term memory builds institutional knowledge over months — without leaking context across departmental boundaries or violating data classification policies.",
    icon: "Brain",
  },
] as const;

export const platformPillars = [
  {
    id: "harnesses",
    title: "Custom Harnesses & Tools",
    summary:
      "Deep integration into your internal APIs, codebases, ERP systems, and operational databases — not generic plugins.",
    capabilities: [
      "MCP-style tool interfaces for enterprise systems",
      "Custom agent harnesses tailored to departmental workflows",
      "Human-in-the-loop approval gates and escalation paths",
      "Integration with Slack, Teams, Jira, ServiceNow, and internal portals",
    ],
    icon: "Wrench",
    terminal: [
      { type: "prompt" as const, text: "> harness.register(dept='finance', tools=[erp, bi])" },
      { type: "output" as const, text: "tools_bound: 14" },
      { type: "output" as const, text: "approval_gates: enabled" },
      { type: "status" as const, text: "status: production" },
    ],
  },
  {
    id: "gateway",
    title: "Model Gateway & Routing",
    summary:
      "Agnostic routing to the right model for the right task — ensuring sensitive data never reaches an unauthorized endpoint.",
    capabilities: [
      "Policy-driven routing across OpenAI, Anthropic, Mistral, and Llama",
      "Task-level model selection based on sensitivity and latency requirements",
      "EU-hosted and on-premises deployment options",
      "Token spend management and per-department budgets",
    ],
    icon: "GitBranch",
    terminal: [
      { type: "prompt" as const, text: "> gateway.route(task='pii_analysis', policy='eu_only')" },
      { type: "output" as const, text: "model: mistral-large-eu" },
      { type: "output" as const, text: "data_residency: confirmed" },
      { type: "status" as const, text: "status: routed" },
    ],
  },
  {
    id: "governance",
    title: "Enterprise Governance & GDPR",
    summary:
      "Strict access controls, compartmentalized memory, and full audit trails — designed for German Mittelstand and enterprise compliance teams.",
    capabilities: [
      "Role-based access and department-scoped memory boundaries",
      "Immutable audit logs for every agent action and model call",
      "GDPR-compliant data handling with right-to-erasure support",
      "Data Processing Agreement (DPA) and subprocessors transparency",
    ],
    icon: "Shield",
    terminal: [
      { type: "prompt" as const, text: "> governance.audit(scope='finance', period='30d')" },
      { type: "output" as const, text: "actions_logged: 12,847" },
      { type: "output" as const, text: "policy_violations: 0" },
      { type: "status" as const, text: "status: compliant" },
    ],
  },
  {
    id: "memory",
    title: "Context Compaction & Memory",
    summary:
      "Persistent, long-term memory that accumulates tacit organizational knowledge — without cross-departmental data leakage.",
    capabilities: [
      "Hierarchical knowledge graphs for structured enterprise memory",
      "Context compaction to maintain relevance over extended interactions",
      "Department-isolated memory stores with explicit sharing policies",
      "Evaluator agents that detect hallucinations before responses ship",
    ],
    icon: "Database",
    terminal: [
      { type: "prompt" as const, text: "> memory.compact(agent='virtual_analyst', window='90d')" },
      { type: "output" as const, text: "knowledge_nodes: 3,204" },
      { type: "output" as const, text: "cross_dept_leaks: 0" },
      { type: "status" as const, text: "status: grounded" },
    ],
  },
] as const;

export const enterpriseUseCases = [
  {
    id: "analyst",
    title: "Virtual Data Analyst",
    department: "Finance & Controlling",
    description:
      "Queries live ERP and BI systems, generates variance reports, and flags anomalies — with citations back to source records and approval gates before any data leaves the department boundary.",
    capabilities: ["ERP integration", "Automated reporting", "Anomaly detection"],
    icon: "BarChart3",
  },
  {
    id: "engineer",
    title: "Virtual Support Engineer",
    department: "IT & Operations",
    description:
      "Triages tickets, searches internal runbooks and knowledge bases, executes approved remediation scripts, and escalates to human engineers with full context and audit trail.",
    capabilities: ["Ticket triage", "Runbook execution", "Escalation workflows"],
    icon: "Headphones",
  },
  {
    id: "compliance",
    title: "Virtual Compliance Officer",
    department: "Legal & Risk",
    description:
      "Monitors regulatory changes, reviews internal policies against GDPR requirements, and produces audit-ready documentation — routed exclusively to EU-hosted models with zero external data exposure.",
    capabilities: ["Policy review", "Regulatory monitoring", "Audit documentation"],
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
