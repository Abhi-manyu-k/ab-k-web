export const siteConfig = {
  name: "AB Kinetics",
  tagline: "Agentic AI & AI governance for European industry",
  url: "https://www.ab-k.com",
  ogImage: "/og.svg",
  description:
    "AI agents that diagnose and fix machines — and the governance that lets you trust them to. Engineered in Aachen for EU industry facing the AI Act, the Machinery Regulation and the Data Act.",
  location: "Aachen, Germany",
  links: {
    linkedin: "https://www.linkedin.com/in/abhimanyu-kanwar-792721180",
  },
  contact: {
    email: "strategy@ab-k.com",
    formTitle: "Book an intro call",
    secondaryCta: "Explore the practices",
  },
};

export const navLinks = [
  { href: "/services", label: "Practices" },
  { href: "/governance", label: "Governance" },
  { href: "/case-studies", label: "Field notes" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const projectStages = [
  "Service agent pilot",
  "AI governance / compliance readiness",
  "Virtual Employees",
  "AI literacy & training",
  "Something else",
] as const;
