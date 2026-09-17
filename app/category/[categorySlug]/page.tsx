import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { PostList } from "@/components/posts/post-list";
import { getAllCategories, getCategoryBySlug } from "@/lib/categories";
import { getPostsByCategorySlug } from "@/lib/posts";

type CategoryPageProps = {
  params: Promise<{ categorySlug: string }>;
};

export async function generateStaticParams() {
  return getAllCategories().map(({ categorySlug }) => ({ categorySlug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) return {};
  return {
    title: `${category.category}の記事`,
    description: `${category.category}カテゴリの記事一覧です。`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const posts = getPostsByCategorySlug(categorySlug);

  return (
    <Container>
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-indigo-950">
        {category.category}
      </h1>
      <p className="mb-8 text-muted-foreground">{posts.length}件の記事</p>
      <PostList posts={posts} />
    </Container>
  );
}
