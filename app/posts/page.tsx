import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { PostList } from "@/components/posts/post-list";
import { PostsPagination } from "@/components/posts/posts-pagination";
import { POSTS_PER_PAGE, SITE_NAME } from "@/lib/constants";
import { getAllPosts, paginatePosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "記事一覧",
  description: `${SITE_NAME}の記事一覧です。`,
};

type PostsPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const { page: pageParam } = await searchParams;
  const page = Number.parseInt(pageParam ?? "1", 10);
  const safePage = Number.isFinite(page) ? page : 1;

  const allPosts = getAllPosts();
  const { items, totalPages, currentPage } = paginatePosts(
    allPosts,
    safePage,
    POSTS_PER_PAGE,
  );

  return (
    <Container>
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-indigo-950">
        記事一覧
      </h1>
      <PostList posts={items} />
      <PostsPagination
        basePath="/posts"
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </Container>
  );
}
