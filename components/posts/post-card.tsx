import Link from "next/link";
import { CategoryBadge, PrBadge } from "@/components/posts/post-badges";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPostDate } from "@/lib/format-date";
import type { PostMeta } from "@/types/post";

type PostCardProps = {
  post: PostMeta;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="flex h-full flex-col transition-colors hover:border-indigo-200 hover:bg-indigo-50/30">
      <CardHeader className="gap-2">
        <div className="flex flex-wrap gap-2">
          <CategoryBadge>{post.category}</CategoryBadge>
          {post.affiliateDisclosure && <PrBadge />}
        </div>
        <CardTitle className="text-base leading-snug">
          <Link
            href={`/posts/${post.slug}`}
            className="text-foreground hover:text-indigo-600 hover:underline"
          >
            {post.title}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {post.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto text-xs text-muted-foreground">
        {formatPostDate(post.publishedAt)}
      </CardFooter>
    </Card>
  );
}
