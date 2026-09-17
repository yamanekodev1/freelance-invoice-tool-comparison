import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { AffiliateDisclosure } from "@/components/posts/affiliate-disclosure";
import { RelatedPosts } from "@/components/posts/related-posts";
import { TableOfContents } from "@/components/posts/table-of-contents";
import { PostJsonLd } from "@/components/seo/json-ld";
import { CategoryBadge, PrBadge } from "@/components/posts/post-badges";
import { Badge } from "@/components/ui/badge";
import { formatPostDate } from "@/lib/format-date";
import { renderMdx } from "@/lib/mdx";
import {
  getAllPostSlugs,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/posts";
import { buildPostMetadata } from "@/lib/seo";
import { extractTocFromMarkdown } from "@/lib/toc";
type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return buildPostMetadata(post);
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const content = await renderMdx(post.content);
  const toc = extractTocFromMarkdown(post.content);
  const related = getRelatedPosts(post);

  return (
    <Container>
      <PostJsonLd post={post} />
      <article className="w-full">
        <header className="mb-8 space-y-4 border-b border-border pb-8">
          <div className="flex flex-wrap gap-2">
            <Link href={`/category/${post.categorySlug}`}>
              <CategoryBadge>{post.category}</CategoryBadge>
            </Link>
            {post.affiliateDisclosure && <PrBadge />}
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-indigo-100 bg-indigo-50/50 text-indigo-900"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-indigo-950 sm:text-4xl">
            {post.title}
          </h1>
          <p className="text-muted-foreground">{post.description}</p>
          <time
            dateTime={post.publishedAt}
            className="block text-sm text-muted-foreground"
          >
            公開: {formatPostDate(post.publishedAt)}
            {post.updatedAt && post.updatedAt !== post.publishedAt && (
              <> · 更新: {formatPostDate(post.updatedAt)}</>
            )}
          </time>
          {post.ogImage && (
            <div className="relative aspect-[1200/630] overflow-hidden rounded-lg border border-border">
              <Image
                src={post.ogImage}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          )}
        </header>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px]">
          <div>
            {post.affiliateDisclosure && <AffiliateDisclosure />}
            <div className="prose-site">
              {content}
            </div>
            <RelatedPosts posts={related} />
          </div>
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents items={toc} />
            </div>
          </aside>
        </div>

        <div className="mt-8 lg:hidden">
          <TableOfContents items={toc} />
        </div>
      </article>
    </Container>
  );
}
