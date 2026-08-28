export const siteConfig = {
  name: "Yashraj Singh",
  shortName: "Yash_Raj",
  role: "Full-Stack Software Engineer",
  tagline:
    "Building web applications with React, Next.js, Node.js, FastAPI, and PostgreSQL — focused on scalable systems and real-world impact.",
  email: "yashraj88813@gmail.com",
  phone: "+91 88813 84160",
  location: "Hyderabad, India",
  linkedin: "https://www.linkedin.com/in/yashraj-singh-55804b253/",
  github: "https://github.com/Yashraj0888",
  cv: "/Yashraj_singh_.pdf",
  cvFileName: "Yashraj_Singh_Resume.pdf",
  available: true,
};

export const navLinks = [
  { href: "/design", label: "Work", count: "04" },
  { href: "/ui-styling", label: "Service", count: "02" },
  { href: "/contact", label: "Contact" },
];

export const frontendSkills = [
  "React.js",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "Responsive Design",
  "Component Architecture",
  "State Management",
  "API Integration",
  "Authentication",
  "Performance Optimization",
];

export const backendSkills = [
  "Node.js",
  "Express.js",
  "Java",
  "Spring Boot",
  "Python",
  "FastAPI",
  "REST",
  "gRPC",
  "PostgreSQL",
  "MongoDB",
  "MySQL",
  "SQLite",
  "Redis",
  "Docker",
  "Supabase",
  "API Design",
  "Authentication",
  "Caching",
  "Rate Limiting",
  "Load Testing",
  "AI/LLM Integrations",
];

export const services = [
  {
    id: "frontend",
    title: "Frontend Development",
    description:
      "Crafting responsive interfaces with React, Next.js, and modern CSS — focused on clarity, performance, and polish.",
    skills: frontendSkills,
    image: "/companyImages/leetcoded.png",
  },
  {
    id: "backend",
    title: "Backend Development",
    description:
      "Designing robust APIs, databases, and server-side systems built for scale, security, and reliability.",
    skills: backendSkills,
    image: "/companyImages/jobscrape.png",
  },
];

export { projects, type ProjectCategory } from "./projects";

export const socialLinks = [
  { label: "LinkedIn", href: siteConfig.linkedin },
  { label: "GitHub", href: siteConfig.github },
];
