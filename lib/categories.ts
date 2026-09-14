import { getAllPosts } from "@/lib/posts";

export type CategoryEntry = {
  categorySlug: string;
  category: string;
  count: number;
};

export function getAllCategories(): CategoryEntry[] {
  const posts = getAllPosts();
  const map = new Map<string, CategoryEntry>();

  for (const post of posts) {
    const existing = map.get(post.categorySlug);
    if (existing) {
      existing.count += 1;
    } else {
      map.set(post.categorySlug, {
        categorySlug: post.categorySlug,
        category: post.category,
        count: 1,
      });
    }
  }

  return [...map.values()].sort((a, b) =>
    a.category.localeCompare(b.category, "ja"),
  );
}

export function getCategoryBySlug(
  categorySlug: string,
): CategoryEntry | undefined {
  return getAllCategories().find((c) => c.categorySlug === categorySlug);
}
