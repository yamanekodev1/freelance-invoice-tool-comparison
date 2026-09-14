import type { MetadataRoute } from "next";
import { getAllCategories } from "@/lib/categories";
import { getSiteUrl } from "@/lib/constants";
import { getAllPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/posts",
    "/about",
    "/privacy",
    "/disclaimer",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
  }));

  const posts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${siteUrl}/posts/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
  }));

  const categories: MetadataRoute.Sitemap = getAllCategories().map((cat) => ({
    url: `${siteUrl}/category/${cat.categorySlug}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...posts, ...categories];
}
