import type { Metadata } from "next";
import { getSiteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";
import type { PostMeta } from "@/types/post";

export function buildHomePageMetadata(): Metadata {
  const siteUrl = getSiteUrl();
  return {
    alternates: { canonical: siteUrl },
    openGraph: {
      url: siteUrl,
    },
  };
}

export function buildDefaultMetadata(overrides?: Metadata): Metadata {
  const siteUrl = getSiteUrl();
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    openGraph: {
      type: "website",
      locale: "ja_JP",
      siteName: SITE_NAME,
    },
    ...overrides,
  };
}

export function buildPostMetadata(post: PostMeta): Metadata {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/posts/${post.slug}`;
  const ogImages = post.ogImage
    ? [{ url: post.ogImage.startsWith("http") ? post.ogImage : `${siteUrl}${post.ogImage}` }]
    : [{ url: `${siteUrl}/posts/${post.slug}/opengraph-image` }];

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      url,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ogImages.map((i) => i.url),
    },
  };
}
