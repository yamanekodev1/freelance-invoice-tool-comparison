import { createOgImage } from "@/lib/og";
import { getPostBySlug } from "@/lib/posts";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type OgProps = {
  params: Promise<{ slug: string }>;
};

export default async function OgImage({ params }: OgProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const title = post?.title ?? "記事";
  return createOgImage(title);
}
