export const siteConfig = {
  name: "AB Kinetics",
  url: "https://www.ab-k.com",
  ogImage: "/og.svg",
  description:
    "Virtual Employees for German Enterprises — organigram-level agentic AI with GDPR governance, model routing, and enterprise harnesses.",
  links: {
    linkedin: "https://www.linkedin.com/in/abhimanyu-kanwar-792721180",
  },
  contact: {
    email: "strategy@abkinetics.com",
    formTitle: "Request a Platform Demo",
    secondaryCta: "Discuss Enterprise Integration",
  },
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Platform" },
  { href: "/about", label: "About" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/contact", label: "Contact" },
] as const;

export const trustStripItems = [
  {
    title: "Organigram-Level Placement",
    description: "Agents assigned to roles, departments, and reporting lines — not floating chat widgets.",
  },
  {
    title: "GDPR-Native Governance",
    description: "Data sovereignty, audit logs, and memory scoping built into the platform layer.",
  },
  {
    title: "Model-Agnostic Routing",
    description: "Route tasks to OpenAI, Anthropic, Mistral, or on-prem Llama — your data, your rules.",
  },
  {
    title: "Production-Proven",
    description: "Deployed at scale across 100+ engineers with governed MCP pipelines on Azure.",
  },
] as const;

export const projectStages = [
  "Platform evaluation",
  "Pilot department",
  "Enterprise rollout",
  "Compliance review",
  "Other",
] as const;
