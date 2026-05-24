import type { MetadataRoute } from "next";

const BASE = "https://lavoiedigital.ca";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/approche`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/difference`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/travaux`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/booking`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
  ];
}
