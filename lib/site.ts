export const siteConfig = {
  name: "AB Kinetics",
  tagline: "Virtual Employees for the Enterprise",
  url: "https://www.ab-k.com",
  ogImage: "/og.svg",
  description:
    "Governed Virtual Employees for German enterprises — organigram-level AI with GDPR-native controls and model routing.",
  links: {
    linkedin: "https://www.linkedin.com/in/abhimanyu-kanwar-792721180",
  },
  contact: {
    email: "strategy@ab-k.com",
    formTitle: "Request a Demo",
    secondaryCta: "Discuss Integration",
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
  "Organigram-level",
  "GDPR-native",
  "Model routing",
  "Production-proven",
] as const;

export const projectStages = [
  "Platform evaluation",
  "Pilot department",
  "Enterprise rollout",
  "Compliance review",
  "Other",
] as const;
