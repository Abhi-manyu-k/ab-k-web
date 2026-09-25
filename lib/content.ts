/* ───────────────────────── Practices ───────────────────────── */

export const practices = [
  {
    id: "service-agents",
    code: "P-01",
    title: "Agentic Service",
    headline: "Service agents that diagnose — and fix — machines.",
    summary:
      "Troubleshooting agents built on your manuals, tickets and live telemetry that move from answering questions to executing approved fixes on the machine.",
    deliverables: [
      "Troubleshooting agents on manuals, service tickets and sensor data (RAG + knowledge graphs)",
      "Action-taking via MCP tool interfaces — every action behind an approval gate",
      "Multilingual field-engineer copilots for the global service fleet",
      "Service data flows ready for the EU Data Act's access-by-design rules",
    ],
    format: "8-week pilot · one machine family · one failure class",
    audience: "Machine builders, OEM service organisations",
  },
  {
    id: "governance",
    code: "P-02",
    title: "AI Governance",
    headline: "Governance that lets agents act.",
    summary:
      "Turn the AI Act, the Machinery Regulation and your own risk appetite into concrete controls — so agents can be trusted with more than a chat window.",
    deliverables: [
      "AI inventory and risk classification across AI Act and Machinery Regulation",
      "Agent governance framework: autonomy levels, permissions, audit trails, kill switch",
      "AI management system aligned with ISO/IEC 42001",
      "Transparency (Art. 50) and AI-literacy (Art. 4) measures that hold up to an audit",
    ],
    format: "2-week readiness check → 90-day implementation",
    audience: "Compliance, quality, product safety, CIO/CTO office",
  },
  {
    id: "virtual-employees",
    code: "P-03",
    title: "Virtual Employees",
    headline: "Governed AI teammates on the organigram.",
    summary:
      "Department agents with a role, a manager and scoped access — for finance, IT operations and legal teams that want more than a copilot.",
    deliverables: [
      "Role design: responsibilities, clearances, escalation paths",
      "Custom harnesses into ERP, ticketing, Teams and internal APIs",
      "Model gateway with EU-hosted routing for sensitive data",
      "Department-scoped memory without cross-team leakage",
    ],
    format: "One department · one role · production in a quarter",
    audience: "Operations, finance, IT, legal & risk",
  },
  {
    id: "academy",
    code: "P-04",
    title: "Strategy & Academy",
    headline: "People who can run what we build.",
    summary:
      "Roadmaps tied to measurable outcomes, and hands-on training for the engineers, managers and service teams who will live with the agents.",
    deliverables: [
      "AI opportunity mapping and executive roadmap with ROI milestones",
      "AI-literacy programmes for technical teams (AI Act Art. 4)",
      "Hands-on agent-building workshops for service and operations engineers",
      "Train-the-trainer formats for global service organisations",
    ],
    format: "Workshops · 1–3 days · on-site or remote, in German or English",
    audience: "Leadership teams, service academies, engineering",
  },
] as const;

/* ───────────────────────── Regulation ───────────────────────── */

export const regulations = [
  {
    date: "2025-02-02",
    instrument: "AI Act",
    change: "Prohibited practices banned; AI-literacy measures for staff (Art. 4)",
    affects: "Everyone using AI",
  },
  {
    date: "2025-08-02",
    instrument: "AI Act",
    change: "Obligations for general-purpose AI models",
    affects: "Model providers",
  },
  {
    date: "2026-08-02",
    instrument: "AI Act",
    change: "Transparency duties (Art. 50): disclose AI interaction, label generated content",
    affects: "Anyone deploying chatbots & agents",
  },
  {
    date: "2026-09-11",
    instrument: "Cyber Resilience Act",
    change: "Reporting of actively exploited vulnerabilities and severe incidents",
    affects: "Makers of products with digital elements",
  },
  {
    date: "2026-09-12",
    instrument: "Data Act",
    change: "New connected products must give users direct access to their machine data",
    affects: "Machine builders, OEM service",
  },
  {
    date: "2027-01-20",
    instrument: "Machinery Regulation",
    change: "Applies in full; ML-based safety components need notified-body assessment",
    affects: "Machine builders, integrators",
  },
  {
    date: "2027-12-02",
    instrument: "AI Act",
    change: "High-risk obligations for Annex III systems (deferred by the Digital Omnibus)",
    affects: "HR, critical infrastructure, access",
  },
  {
    date: "2027-12-11",
    instrument: "Cyber Resilience Act",
    change: "All essential cybersecurity requirements apply",
    affects: "Makers of products with digital elements",
  },
  {
    date: "2028-08-02",
    instrument: "AI Act",
    change: "High-risk obligations for AI in regulated products — incl. machinery (Annex I)",
    affects: "Machine builders",
  },
] as const;

export const marketFacts = [
  {
    value: "57%",
    label: "of German companies now use AI — up from 20% two years ago.",
    source: "Bitkom, Sept 2026",
  },
  {
    value: "56%",
    label: "of those users name legal ambiguity as a major challenge.",
    source: "Bitkom, Sept 2026",
  },
  {
    value: "4",
    label: "EU regulations touching AI on machines take effect between 2026 and 2028.",
    source: "AI Act · MR · Data Act · CRA",
  },
] as const;

export const sources = [
  {
    label: "Bitkom — Erstmals nutzt die Mehrheit der Unternehmen KI (14 Sept 2026)",
    href: "https://www.bitkom.org/Presse/Presseinformation/Erstmals-nutzt-Mehrheit-Unternehmen-KI",
  },
  {
    label: "Gibson Dunn — EU AI Act Omnibus agreement: postponed high-risk deadlines",
    href: "https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/",
  },
  {
    label: "TÜV SÜD — EU Machinery Regulation: tips for manufacturers and operators",
    href: "https://www.tuvsud.com/en/newsroom/press-releases/2025/october/7-tips-for-manufacturers-and-operators",
  },
  {
    label: "Wilson Sonsini — EU Data Act September 2026 deadline",
    href: "https://www.wsgr.com/en/insights/eu-data-act-september-2026-deadline-what-businesses-need-to-know.html",
  },
] as const;

/* ───────────────────────── Autonomy ladder ───────────────────────── */

export const autonomyLevels = [
  {
    level: "L0",
    name: "Informs",
    example: "Answers questions from manuals, tickets and past fixes — with sources.",
    controls: ["Source citations on every answer", "Access scoped to role and site"],
  },
  {
    level: "L1",
    name: "Recommends",
    example: "Diagnoses a fault and proposes a fix with evidence and confidence.",
    controls: ["Evidence & confidence shown", "Engineer feedback loop into evaluation"],
  },
  {
    level: "L2",
    name: "Acts with approval",
    example: "Executes the fix on the machine after a named engineer signs off.",
    controls: ["Human approval gate per action", "Action audit log", "Rollback plan per action class"],
  },
  {
    level: "L3",
    name: "Acts within policy",
    example: "Runs pre-approved action classes on its own; escalates the rest.",
    controls: ["Policy-as-code action limits", "Live monitoring & alerting", "Kill switch"],
  },
  {
    level: "L4",
    name: "Acts & reports",
    example: "Owns whole service workflows; humans review by exception.",
    controls: ["Continuous evaluation", "Incident & reporting process", "Periodic re-certification"],
  },
] as const;

/* ───────────────────────── Governance offers ───────────────────────── */

export const governanceOffers = [
  {
    title: "AI Readiness Check",
    duration: "2 weeks",
    description:
      "Inventory every AI use — shadow AI included — classify it under the AI Act and Machinery Regulation, and leave with a prioritised gap list.",
  },
  {
    title: "Agent Governance Framework",
    duration: "4–6 weeks",
    description:
      "Autonomy levels, action permissions, approval gates, audit trails and a kill switch — designed for agents that touch real systems.",
  },
  {
    title: "ISO/IEC 42001 AI Management System",
    duration: "90 days",
    description:
      "Policies, roles, risk and impact assessments and a lifecycle process that can grow into certification.",
  },
  {
    title: "AI Literacy Programme",
    duration: "Ongoing",
    description:
      "Role-specific training for engineers, service teams and managers — documented to show the measures Art. 4 asks for.",
  },
] as const;

export const regulationBriefs = [
  {
    instrument: "AI Act",
    question: "Is our service agent high-risk?",
    answer:
      "Usually not by itself — but transparency duties apply from August 2026, and AI inside safety functions of machinery moves into high-risk scope by August 2028.",
  },
  {
    instrument: "Machinery Regulation",
    question: "What changes for AI on the machine?",
    answer:
      "From 20 January 2027, safety components with self-evolving ML behaviour require notified-body assessment. Agents that act on machines need clear boundaries to stay outside safety functions.",
  },
  {
    instrument: "Data Act",
    question: "Who else can service our machines?",
    answer:
      "Users can now access — and share — the data your machines generate. Third-party service gets easier. The best defence is a service experience competitors can't match.",
  },
] as const;

/* ───────────────────────── Field notes ───────────────────────── */

export const fieldMetrics = [
  { value: "100+", label: "field engineers using a production AI service assistant" },
  { value: "30+", label: "service engineers in a field test of a troubleshooting agent" },
  { value: "3", label: "continents of engineers, sales teams and clients trained on wafer-handling systems" },
] as const;

export const caseStudies = [
  {
    id: "assistant",
    tag: "Production",
    title: "A global AI service assistant",
    context:
      "A leading semiconductor equipment manufacturer needed its field service knowledge available to every engineer, in every region.",
    intervention:
      "Led end-to-end delivery of a proprietary AI assistant: prototype to production on Azure, external development teams, LangGraph orchestration and Model Context Protocol for scalable retrieval.",
    impact: "In daily use by 100+ field engineers worldwide.",
  },
  {
    id: "action",
    tag: "Now building",
    title: "From answers to actions",
    context:
      "Knowing the fix is not the same as applying it. The next step is agents that take corrective action on semiconductor equipment.",
    intervention:
      "Service agents that execute approved fixes on the machine through tool interfaces — with approval gates, audit logs and rollback built in from day one.",
    impact: "Autonomy level L2: the agent acts, a named engineer signs off.",
  },
  {
    id: "cambridge",
    tag: "Research",
    title: "Troubleshooting agent for semiconductor robotics",
    context:
      "Master thesis at the University of Cambridge Institute for Manufacturing on wafer-handling robot failures.",
    intervention:
      "A troubleshooting agent combining retrieval-augmented generation with knowledge graphs, tested in industry with service engineers.",
    impact: "Field-tested with 30+ engineers; published at AIRSI 2025.",
  },
  {
    id: "carma",
    tag: "Research",
    title: "AI governance through agent simulation",
    context:
      "Research collaboration with the Center for AI Risk Management & Alignment (CARMA).",
    intervention:
      "LLM-driven agents and Monte-Carlo simulation to stress-test AI governance and policy options before they meet reality.",
    impact: "Governance advice grounded in simulation, not slogans.",
  },
  {
    id: "platform",
    tag: "Architecture",
    title: "An enterprise agent platform",
    context: "Many departments, many ideas, no shared foundation for multi-agent workflows.",
    intervention:
      "Architecting a company-wide agentic platform on LangGraph and n8n, and advising project teams as a vertical integrator — from document generation to workflow automation.",
    impact: "One governed stack instead of a zoo of pilots.",
  },
] as const;

/* ───────────────────────── About ───────────────────────── */

export const founderBio = {
  name: "Abhimanyu Kanwar",
  title: "Founder · Senior AI Solutions Manager in semiconductor equipment service",
  quote:
    "I've trained engineers on the machines, fixed them on the shop floor, and now build agents that fix them. Governance isn't paperwork to me — it's what lets an agent touch a real machine.",
  paragraphs: [
    "Mechanical and production engineer from RWTH Aachen. Research on troubleshooting agents at the University of Cambridge Institute for Manufacturing, and on AI governance through agent simulation at CARMA.",
    "Today I lead AI solutions in the service organisation of a leading semiconductor equipment manufacturer: a production AI assistant used by 100+ field engineers, an enterprise agent platform on LangGraph and n8n, and service agents that take action on machines.",
    "AB Kinetics brings that work to European industry — for teams that want agents in production, and the governance to keep them there.",
  ],
} as const;

export const careerRoute = [
  { year: "2017", place: "RWTH Aachen", role: "Mechanical engineering" },
  { year: "2020", place: "Mercedes-Benz EQ", role: "Li-ion battery development" },
  { year: "2021", place: "Amazon", role: "Delivery operations & KPIs" },
  { year: "2023", place: "Semiconductor equipment", role: "Technical trainer, field service" },
  { year: "2024", place: "Cambridge · CARMA", role: "Agent & AI-governance research" },
  { year: "2025", place: "Semiconductor equipment", role: "AI solutions — agents in production" },
  { year: "Now", place: "AB Kinetics", role: "Agentic AI & governance for industry" },
] as const;

export const credentials = [
  "RWTH Aachen — M.Sc. Production Engineering",
  "University of Cambridge — Institute for Manufacturing",
  "Cambridge Service Alliance",
  "CARMA — AI Risk Management & Alignment",
  "AIRSI 2025 — published",
  "Turing College — AI Ethics",
] as const;

export const aboutPillars = [
  {
    zone: "Boardroom",
    title: "Strategy & ROI",
    description: "Investment cases and roadmaps your leadership can track — not strategy decks that stall.",
  },
  {
    zone: "IDE",
    title: "Agent architecture",
    description: "LangGraph, MCP, n8n, Azure — orchestration and retrieval designed for enterprise constraints.",
  },
  {
    zone: "Shop floor",
    title: "Machines & service",
    description: "Wafer handlers, sensors, pneumatics, field service. We know what the agent is actually touching.",
  },
  {
    zone: "Rulebook",
    title: "Governance",
    description: "AI Act, Machinery Regulation, Data Act — translated into controls engineers can build.",
  },
] as const;

/* ───────────────────────── Virtual Employees demo data ───────────────────────── */

export const enterpriseUseCases = [
  {
    id: "analyst",
    title: "Data Analyst",
    department: "Finance",
    description: "Queries ERP and BI systems, flags anomalies, cites source records.",
  },
  {
    id: "support",
    title: "Support Engineer",
    department: "IT & Ops",
    description: "Triages tickets, runs approved playbooks, escalates with full context.",
  },
  {
    id: "compliance",
    title: "Compliance Officer",
    department: "Legal & Risk",
    description: "Reviews policies against GDPR, monitors regulatory change, produces audit docs.",
  },
] as const;
