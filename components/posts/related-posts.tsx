import { PostCard } from "@/components/posts/post-card";
import type { PostMeta } from "@/types/post";

type RelatedPostsProps = {
  posts: PostMeta[];
};

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 border-t border-border pt-10">
      <h2 className="mb-6 text-xl font-semibold">関連記事</h2>
      <ul className="grid gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <li key={post.slug}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
}
