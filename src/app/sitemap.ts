import type { MetadataRoute } from "next";
import fs from "fs/promises";
import path from "path";
import { absoluteUrl } from "@/lib/seo";
import propertiesData from "@/data/properties.json";
import servicesData from "@/data/services.json";
import type { Blog, Property, Service } from "@/types";

async function getBlogs(): Promise<Blog[]> {
  try {
    const data = await fs.readFile(path.join(process.cwd(), "src/data/blogs.json"), "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const blogs = await getBlogs();
  const properties = propertiesData as Property[];
  const services = servicesData as Service[];

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/properties"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/services"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/blogs"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  const propertyRoutes: MetadataRoute.Sitemap = properties.map((p) => ({
    url: absoluteUrl(`/properties/${p.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
    images: [absoluteUrl(p.detailImage)],
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: absoluteUrl(`/services/${s.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
    images: [absoluteUrl(s.detailImage)],
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((b) => ({
    url: absoluteUrl(`/blogs/${b.slug}`),
    lastModified: b.publishedAt ? new Date(b.publishedAt) : now,
    changeFrequency: "monthly",
    priority: 0.6,
    images: b.image ? [absoluteUrl(b.image)] : undefined,
  }));

  return [...staticRoutes, ...propertyRoutes, ...serviceRoutes, ...blogRoutes];
}
