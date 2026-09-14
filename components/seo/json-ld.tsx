import { getSiteUrl, SITE_NAME } from "@/lib/constants";
import type { PostMeta } from "@/types/post";

type JsonLdProps = {
  post: PostMeta;
};

export function PostJsonLd({ post }: JsonLdProps) {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/posts/${post.slug}`;

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    mainEntityOfPage: url,
    image: post.ogImage
      ? post.ogImage.startsWith("http")
        ? post.ogImage
        : `${siteUrl}${post.ogImage}`
      : `${url}/opengraph-image`,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "ホーム",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "記事一覧",
        item: `${siteUrl}/posts`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}
