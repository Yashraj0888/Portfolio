import type { MetadataRoute } from "next";

const siteUrl = "https://portfolioyashraj.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: siteUrl, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/design`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/ui-styling`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/contact`, lastModified, changeFrequency: "monthly", priority: 0.7 },
  ];
}
