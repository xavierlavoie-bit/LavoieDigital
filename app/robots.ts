import type { MetadataRoute } from "next";

const BASE = "https://lavoiedigital.ca";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow everything for general crawlers
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // Explicit allow for AI crawlers (good practice — these bots often check
      // for explicit permission and skip sites that don't mention them).
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "ClaudeBot",
          "Claude-Web",
          "anthropic-ai",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "Bytespider",
          "Applebot",
          "Applebot-Extended",
          "Amazonbot",
          "FacebookBot",
          "Meta-ExternalAgent",
          "CCBot",
          "DuckAssistBot",
        ],
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
