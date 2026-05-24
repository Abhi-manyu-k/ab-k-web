export const siteConfig = {
  name: "AB Kinetics",
  url: "https://www.abkinetics.com",
  ogImage: "https://www.abkinetics.com/og.jpg",
  description: "Enterprise AI Architecture & Agentic Workflow Orchestration.",
  links: {
    linkedin: "https://www.linkedin.com/in/your-profile",
  },
  contact: {
    email: "strategy@abkinetics.com",
    formTitle: "Book a Strategy Sync",
  },
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/contact", label: "Contact" },
] as const;

export const trustStripItems = [
  {
    title: "Strategy to Implementation",
    description: "Executive roadmaps that translate into shipped systems.",
  },
  {
    title: "Software to Hardware",
    description: "Agentic workflows connected to live operational data.",
  },
  {
    title: "Prototype to Production",
    description: "Governed paths from pilot to enterprise-scale rollout.",
  },
  {
    title: "Governance to Adoption",
    description: "Security-aware design that teams actually use.",
  },
] as const;

export const projectStages = [
  "AI strategy",
  "Prototype",
  "Production rollout",
  "Industrial integration",
  "Other",
] as const;
