import type { MetadataRoute } from "next";

const baseUrl = "https://dlride.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/apply`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...[
      "gig-driver-car-rental-atlanta",
      "uber-car-rental-atlanta",
      "lyft-car-rental-atlanta",
      "doordash-car-rental-atlanta",
      "rideshare-car-rental-atlanta",
      "travel-nurse-car-rental-atlanta",
    ].map((path) => ({
      url: `${baseUrl}/${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
