import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { PostList } from "@/components/posts/post-list";
import { CategoryBadge } from "@/components/posts/post-badges";
import { getAllCategories } from "@/lib/categories";
import { HOME_LATEST_POSTS } from "@/lib/constants";
import { getAllPosts } from "@/lib/posts";
import { buildHomePageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildHomePageMetadata();

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, HOME_LATEST_POSTS);
  const categories = getAllCategories();

  return (
    <Container className="space-y-12">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-indigo-950 sm:text-4xl">
          副業エンジニアの業務を、もっとシンプルに
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          請求書・会計・契約書など、副業のバックオフィスに関する比較記事と実践ノウハウを公開しています。
        </p>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-indigo-950">最新記事</h2>
          <Link
            href="/posts"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
          >
            すべて見る
          </Link>
        </div>
        <PostList posts={latestPosts} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-indigo-950">カテゴリから探す</h2>
        <ul className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <li key={cat.categorySlug}>
              <Link href={`/category/${cat.categorySlug}`}>
                <CategoryBadge className="px-3 py-1 text-sm hover:bg-muted/80">
                  {cat.category}（{cat.count}）
                </CategoryBadge>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
