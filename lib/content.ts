/*
 * Content for ab-k.com.
 *
 * Every placeholder the author still has to fill in is marked `TODO(launch)`.
 * Run `grep -rn "TODO(launch)" app components lib content public` for the full list.
 */

/* ───────────────────────── Areas I work on ───────────────────────── */

export const workAreas = [
  {
    id: "service-agents",
    code: "A-01",
    title: "Service agents",
    headline: "Agents that diagnose machines.",
    summary:
      "Troubleshooting agents on manuals, service tickets, log files and sensor data: retrieval, knowledge graphs and tool interfaces (MCP) that a field engineer can check.",
    readMore: { essay: "mcp-log-file-analysis", fallback: "/writing" },
  },
  {
    id: "autonomy",
    code: "A-02",
    title: "Autonomy & controls",
    headline: "How much may an agent do on its own?",
    summary:
      "A five-level autonomy framework for industrial service agents, and the approval gates, audit trails and kill switches each level requires.",
    readMore: { href: "/framework", label: "The framework" },
  },
  {
    id: "regulation",
    code: "A-03",
    title: "Regulation & machine data",
    headline: "AI Act, Machinery Regulation, Data Act.",
    summary:
      "What the EU rules on AI and machine data mean for service organisations, translated into controls engineers can build.",
    readMore: { essay: "data-act-service-battleground", fallback: "/governance" },
  },
  {
    id: "operations",
    code: "A-04",
    title: "AI in operations",
    headline: "Measured like any other process.",
    summary:
      "ROI gates for AI tools, and what statistical process control reveals about evaluating LLM agents on the fab floor.",
    readMore: { essay: "roi-gate-vendor-ai-tools", fallback: "/writing" },
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
    // Row A in the home-page revision table.
    // TODO(launch): verify whether Art. 50(2) marking duties were deferred to 2 Dec 2026.
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
    // Row G in the home-page revision table.
    // TODO(launch): verify Machinery Regulation moved to Annex I Section B under Reg. (EU) 2026/1744 and reword.
    date: "2028-08-02",
    instrument: "AI Act",
    change: "High-risk obligations for AI in regulated products — incl. machinery (Annex I)",
    affects: "Machine builders",
  },
] as const;

/** Date the regulation table was last checked against the sources. */
// TODO(launch): set to the date you last reviewed the table (YYYY-MM-DD).
export const regulationLastReviewed: string | null = null;

const BITKOM_KI_2026 =
  // TODO(launch): confirm this is the Bitkom release both statistics come from.
  "https://www.bitkom.org/Presse/Presseinformation/Erstmals-nutzt-Mehrheit-Unternehmen-KI";

export const marketFacts = [
  {
    value: "57%",
    label: "of German companies now use AI — up from 20% two years ago.",
    source: "Bitkom, Sept 2026",
    href: BITKOM_KI_2026,
  },
  {
    value: "56%",
    label: "of those users name legal ambiguity as a major challenge.",
    source: "Bitkom, Sept 2026",
    href: BITKOM_KI_2026,
  },
  {
    value: "4",
    label: "EU regulations touching AI on machines take effect between 2026 and 2028.",
    source: "AI Act · MR · Data Act · CRA",
    href: null,
  },
] as const;

export const sources = [
  {
    label: "Bitkom — Erstmals nutzt die Mehrheit der Unternehmen KI (14 Sept 2026)",
    href: BITKOM_KI_2026,
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

export const regulationBriefs = [
  {
    instrument: "AI Act",
    question: "Is a service agent high-risk?",
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
    question: "Who else can service the machines?",
    answer:
      "Users can now access — and share — the data their machines generate. Third-party service gets easier. The best defence is a service experience competitors can't match.",
  },
] as const;

/* ───────────────────────── Autonomy framework (ABK-AL) ───────────────────────── */

export const framework = {
  code: "ABK-AL",
  title: "Autonomy Levels for Industrial Service Agents",
  version: "1.0",
  // TODO(launch): confirm the publication date of v1.0.
  date: "2026-11-06",
  pdf: "/framework/abk-al-v1.pdf",
  // TODO(launch): set to true once the typeset PDF replaces the placeholder file. Until then the download button is hidden.
  pdfReady: false as boolean,
  path: "/framework",
} as const;

export const frameworkChangelog = [
  {
    rev: "1.0",
    date: framework.date,
    change:
      "First public version: five levels (L0–L4), the agent's and the human's role at each level, and cumulative controls.",
    by: "A. Kanwar",
  },
] as const;

/*
 * `scenario` follows one fault (the thermocouple drift from the hero drawing) up the staircase.
 * TODO(launch): these five scenarios are drafts — check the numbers and wording against real practice.
 */
export const autonomyLevels = [
  {
    level: "L0",
    name: "Informs",
    example: "Answers questions from manuals, tickets and past fixes — with sources.",
    scenario:
      "An engineer sees PM3 heater zone 2 reading 4 K above recipe and asks what could cause it. The agent answers from SOP 114 and three similar tickets, and cites them. The engineer does everything else.",
    agent: "Answers questions from manuals, service tickets and past fixes, and cites its sources.",
    human: "Diagnoses, decides and acts. Judges whether the answer applies to the machine in front of them.",
    controls: ["Source citations on every answer", "Access scoped to role and site"],
  },
  {
    level: "L1",
    name: "Recommends",
    example: "Diagnoses a fault and proposes a fix with evidence and confidence.",
    scenario:
      "The agent notices the same deviation itself, diagnoses thermocouple drift and recommends a −4.0 K offset followed by one dummy wafer. The engineer checks the evidence and enters the offset by hand.",
    agent: "Diagnoses a fault and proposes a fix, with the evidence and its confidence.",
    human: "Reviews the evidence, decides on the fix and carries it out.",
    controls: ["Evidence & confidence shown", "Engineer feedback loop into evaluation"],
  },
  {
    level: "L2",
    name: "Acts with approval",
    example: "Executes the fix on the machine after a named engineer signs off.",
    scenario:
      "The agent prepares the −4.0 K offset and the dummy-wafer run, then waits. The service lead approves, the agent executes, verifies Δ 0.3 K and files the audit record. This is the sequence drawn on the home page.",
    agent: "Prepares the action and executes it only after a named engineer signs off.",
    human: "Approves or rejects every single action and owns the outcome.",
    controls: ["Human approval gate per action", "Action audit log", "Rollback plan per action class"],
  },
  {
    level: "L3",
    name: "Acts within policy",
    example: "Runs pre-approved action classes on its own; escalates the rest.",
    scenario:
      "Thermocouple offsets up to ±5 K on a module with no lot in process are a pre-approved class of action. The agent applies the offset, verifies and logs it on its own. A larger drift, or a module that is running product, goes to the engineer.",
    agent: "Runs pre-approved classes of action on its own and escalates everything else.",
    human: "Defines and maintains the policy, monitors the agent and handles escalations.",
    controls: ["Policy-as-code action limits", "Live monitoring & alerting", "Kill switch"],
  },
  {
    level: "L4",
    name: "Acts & reports",
    example: "Owns whole service workflows; humans review by exception.",
    scenario:
      "The agent owns thermocouple drift as a workflow across the installed base: it corrects within policy, books a replacement when offsets add up, and reports weekly. Engineers review the exceptions and re-certify the workflow each quarter.",
    agent: "Owns whole service workflows end to end and reports what it did.",
    human: "Reviews by exception, audits the record and re-certifies the agent periodically.",
    controls: ["Continuous evaluation", "Incident & reporting process", "Periodic re-certification"],
  },
] as const;

/* ───────────────────────── Track record ───────────────────────── */

export const fieldMetrics = [
  { value: "100+", label: "field engineers using a production AI service assistant I led" },
  { value: "30+", label: "service engineers in a field test of my troubleshooting agent" },
  { value: "3", label: "continents where I have trained engineering and service teams" },
] as const;

export const trackRecord = [
  {
    id: "assistant",
    tag: "Production",
    title: "A global AI service assistant",
    context:
      "In my role at a leading semiconductor equipment manufacturer, I led end-to-end delivery of a proprietary AI service assistant.",
    detail:
      "Prototype to production on Azure, with external development teams, LangGraph orchestration and Model Context Protocol for scalable retrieval.",
    impact: "In daily use by 100+ field engineers.",
  },
  {
    id: "cambridge",
    tag: "Research",
    title: "Troubleshooting agent for semiconductor robotics",
    context:
      "Master thesis at the University of Cambridge Institute for Manufacturing on wafer-handling robot failures.",
    detail:
      "A troubleshooting agent combining retrieval-augmented generation with knowledge graphs, tested in industry with service engineers.",
    impact: "Field-tested with 30+ engineers; published at AIRSI 2025.",
  },
] as const;

/* ───────────────────────── Talks & publications ───────────────────────── */

export type TalkType = "Paper" | "Talk" | "Webinar";

export interface Talk {
  id: string;
  /** ISO date, or null while unknown. */
  date: string | null;
  year: string;
  venue: string;
  title: string;
  type: TalkType;
  /** Slides, paper or recording. null = not yet available. */
  link: { label: string; href: string } | null;
  placeholders: string[];
}

export const talks: Talk[] = [
  {
    id: "airsi-2025",
    // TODO(launch): exact publication/conference date and DOI or PDF link. The title is the one listed under
    // Publications on LinkedIn — confirm it is the AIRSI paper.
    date: null,
    year: "2025",
    venue: "AIRSI 2025",
    title:
      "The end of traditional tech support? Reducing downtimes and increasing service efficiency with the help of personalised AI service agents",
    type: "Paper",
    link: null,
    placeholders: ["date", "paper link / DOI"],
  },
  {
    id: "karlstad-industry-day",
    // TODO(launch): date, exact talk title and slides link.
    date: null,
    year: "",
    venue: "Karlstad University · Industry Day",
    title: "Multimodal RAG for field service",
    type: "Talk",
    link: null,
    placeholders: ["date", "exact title", "slides link"],
  },
  {
    id: "csa-webinars",
    // TODO(launch): dates, series title and recording links.
    date: null,
    year: "",
    venue: "Cambridge Service Alliance",
    title: "Webinars on agentic AI in customer service",
    type: "Webinar",
    link: null,
    placeholders: ["dates", "exact title", "recording link"],
  },
];

/* ───────────────────────── About ───────────────────────── */

export const authorBio = {
  name: "Abhimanyu Kanwar",
  title: "Senior AI Solutions Manager, service AI for semiconductor equipment",
  quote:
    "I've trained engineers on the machines, fixed them on the shop floor, and now build agents that diagnose them. Governance isn't paperwork to me — it's what decides how far an agent may act on a real machine.",
  paragraphs: [
    "I'm a mechanical and production engineer from RWTH Aachen. I researched troubleshooting agents at the University of Cambridge Institute for Manufacturing, and AI governance through agent simulation at CARMA.",
    "In my role at a leading semiconductor equipment manufacturer, I work on service AI: I led a production AI assistant used by 100+ field engineers, and I architect agent workflows on LangGraph and n8n.",
    "AB Kinetics is where I write and speak about that work: service agents, the autonomy levels that govern them, and the EU rules they have to meet.",
  ],
  learning: "Semiconductor process control (SPC) and epitaxy fundamentals.",
} as const;

export const careerRoute = [
  { year: "2017", place: "RWTH Aachen", role: "Mechanical engineering" },
  { year: "2020", place: "Mercedes-Benz EQ", role: "Li-ion battery development" },
  { year: "2021", place: "Amazon", role: "Delivery operations & KPIs" },
  { year: "2023", place: "Semiconductor equipment", role: "Technical trainer, field service" },
  { year: "2024", place: "Cambridge · CARMA", role: "Agent & AI-governance research" },
  { year: "2025", place: "Semiconductor equipment", role: "AI solutions in field service" },
  { year: "Now", place: "Service AI & governance", role: "Writing as AB Kinetics" },
] as const;

export const credentials = [
  "RWTH Aachen — M.Sc. Production Engineering",
  "University of Cambridge IfM — master thesis",
  "Cambridge Service Alliance",
  "CARMA — AI Risk Management & Alignment",
  "AIRSI 2025 — published",
  "Turing College — AI Ethics",
] as const;

export const aboutPillars = [
  {
    zone: "Boardroom",
    title: "Strategy & ROI",
    description: "Investment cases and ROI gates leadership can track — not strategy decks that stall.",
  },
  {
    zone: "IDE",
    title: "Agent architecture",
    description: "LangGraph, MCP, n8n, Azure — orchestration and retrieval designed for enterprise constraints.",
  },
  {
    zone: "Shop floor",
    title: "Machines & service",
    description: "Wafer handlers, sensors, pneumatics, field service. I know what the agent is actually touching.",
  },
  {
    zone: "Rulebook",
    title: "Governance",
    description: "AI Act, Machinery Regulation, Data Act — translated into controls engineers can build.",
  },
] as const;
