export const siteConfig = {
  name: "AB Kinetics",
  author: "Abhimanyu Kanwar",
  authorShort: "A. Kanwar",
  role: "Senior AI Solutions Manager, service AI for semiconductor equipment",
  tagline: "Service AI & agent governance for European industry",
  url: "https://ab-k.com",
  ogImage: "/og.png",
  description:
    "I build AI agents that diagnose machines, and the governance that lets you trust them to act. Abhimanyu Kanwar, engineer from Aachen, working on service AI for semiconductor equipment.",
  location: "Aachen, Germany",
  links: {
    linkedin: "https://www.linkedin.com/in/abhimanyu-kanwar-792721180",
  },
  contact: {
    email: "strategy@ab-k.com",
    formTitle: "Send message",
  },
};

export const navLinks = [
  { href: "/framework", label: "Framework" },
  { href: "/governance", label: "Governance" },
  { href: "/writing", label: "Writing" },
  { href: "/talks", label: "Talks" },
  { href: "/about", label: "About" },
] as const;

export const legalLinks = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
] as const;

export const contactTopics = [
  "Speaking invitation",
  "Research collaboration",
  "Question about the framework or writing",
  "Something else",
] as const;

export const mailto = (subject?: string) =>
  `mailto:${siteConfig.contact.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
