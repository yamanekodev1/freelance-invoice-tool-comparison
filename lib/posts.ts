import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  postFrontmatterSchema,
  type PostMeta,
  type PostWithContent,
} from "@/types/post";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

function getMdxFilenames(): string[] {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"));
}

function parsePostFile(filename: string): PostWithContent {
  const slug = filename.replace(/\.mdx$/, "");
  const fullPath = path.join(POSTS_DIR, filename);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  const parsed = postFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(
      `Invalid front matter in ${filename}: ${parsed.error.message}`,
    );
  }

  return {
    slug,
    ...parsed.data,
    content,
  };
}

function toPostMeta(post: PostWithContent): PostMeta {
  const {
    slug,
    title,
    description,
    publishedAt,
    updatedAt,
    category,
    categorySlug,
    tags,
    affiliateDisclosure,
    ogImage,
  } = post;
  return {
    slug,
    title,
    description,
    publishedAt,
    updatedAt,
    category,
    categorySlug,
    tags,
    affiliateDisclosure,
    ogImage,
  };
}

export function getAllPosts(): PostMeta[] {
  return getMdxFilenames()
    .map((filename) => toPostMeta(parsePostFile(filename)))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function getPostBySlug(slug: string): PostWithContent | undefined {
  const filename = `${slug}.mdx`;
  if (!getMdxFilenames().includes(filename)) {
    return undefined;
  }
  return parsePostFile(filename);
}

export function getPostsByCategorySlug(categorySlug: string): PostMeta[] {
  return getAllPosts().filter((p) => p.categorySlug === categorySlug);
}

export function getRelatedPosts(post: PostMeta, limit = 4): PostMeta[] {
  const all = getAllPosts().filter((p) => p.slug !== post.slug);

  const scored = all.map((candidate) => {
    let score = 0;
    if (candidate.categorySlug === post.categorySlug) {
      score += 10;
    }
    const tagOverlap = candidate.tags.filter((t) => post.tags.includes(t));
    score += tagOverlap.length;
    return { candidate, score };
  });

  return scored
    .filter(({ score }) => score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return (
        new Date(b.candidate.publishedAt).getTime() -
        new Date(a.candidate.publishedAt).getTime()
      );
    })
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

export function paginatePosts<T>(
  items: T[],
  page: number,
  perPage: number,
): { items: T[]; totalPages: number; currentPage: number } {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * perPage;
  return {
    items: items.slice(start, start + perPage),
    totalPages,
    currentPage,
  };
}

export function getAllPostSlugs(): string[] {
  return getMdxFilenames().map((f) => f.replace(/\.mdx$/, ""));
}
