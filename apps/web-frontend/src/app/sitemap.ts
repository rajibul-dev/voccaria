import { getAllBlogPosts } from "@/lib/sanityFetchers";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allBlogPosts = await getAllBlogPosts();

  const baseUrl = "https://voccaria.com";

  const staticRoutes = ["/", "/blog"];

  const blogPostRoutes: MetadataRoute.Sitemap = allBlogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post._updatedAt || post._createdAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 1.0,
  }));

  return [...staticPages, ...blogPostRoutes];
}
