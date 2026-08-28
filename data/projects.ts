export type ProjectCategory = "All" | "Web App" | "Platform" | "Automation";

export const projects = [
  {
    title: "Construction Worker Care",
    image: "/companyImages/construction.png",
    demo: "https://www.constructionworkercare.co.uk/",
    tags: ["Web App", "Next.js"],
    category: "Web App" as ProjectCategory,
  },
  {
    title: "RD Vidyapeeth",
    image: "/companyImages/rdvidypeeth.png",
    demo: "https://www.rdvidyapeeth.com/",
    tags: ["Education", "Web Platform"],
    category: "Web App" as ProjectCategory,
  },
  {
    title: "Leet Coded",
    image: "/companyImages/leetcoded.png",
    demo: "https://leet-coded.vercel.app/",
    tags: ["Platform", "React"],
    category: "Platform" as ProjectCategory,
  },
  {
    title: "Job Scrape",
    image: "/companyImages/jobscrape.png",
    demo: "https://job-scrap3.vercel.app/",
    tags: ["Automation", "AI"],
    category: "Automation" as ProjectCategory,
  },
];
