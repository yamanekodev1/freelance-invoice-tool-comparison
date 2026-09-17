import { PostCard } from "@/components/posts/post-card";
import type { PostMeta } from "@/types/post";

type PostListProps = {
  posts: PostMeta[];
};

export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <p className="text-muted-foreground">記事がまだありません。</p>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <li key={post.slug}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
}
