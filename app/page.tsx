import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { PostList } from "@/components/posts/post-list";
import { Badge } from "@/components/ui/badge";
import { getAllCategories } from "@/lib/categories";
import { HOME_LATEST_POSTS } from "@/lib/constants";
import { getAllPosts } from "@/lib/posts";

// TODO(正式公開): プレ公開用 noindex。公開時は metadata.robots を削除する（README「正式公開チェックリスト」参照）。
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, HOME_LATEST_POSTS);
  const categories = getAllCategories();

  return (
    <Container className="space-y-12">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          副業エンジニアの業務を、もっとシンプルに
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          請求書・会計・契約書など、副業のバックオフィスに関する比較記事とハウツーを公開しています。
        </p>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">最新記事</h2>
          <Link href="/posts" className="text-sm text-primary hover:underline">
            すべて見る
          </Link>
        </div>
        <PostList posts={latestPosts} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">カテゴリから探す</h2>
        <ul className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <li key={cat.categorySlug}>
              <Link href={`/category/${cat.categorySlug}`}>
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  {cat.category}（{cat.count}）
                </Badge>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
