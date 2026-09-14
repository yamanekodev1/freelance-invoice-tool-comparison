export const SITE_NAME = "副業エンジニアの業務ハウツー";

export const SITE_DESCRIPTION =
  "副業エンジニア向けのSaaS比較・ハウツーメディア。請求書・会計・契約書など業務効率化の情報を発信します。";

export const POSTS_PER_PAGE = 12;

export const HOME_LATEST_POSTS = 6;

export function getSiteUrl(): string {
  const fromPublic = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (fromPublic) {
    return fromPublic;
  }

  // Vercel sets VERCEL_URL (host only) when NEXT_PUBLIC_SITE_URL is unset or empty.
  const vercelHost = process.env.VERCEL_URL?.trim().replace(/\/$/, "");
  if (vercelHost) {
    const withProtocol = vercelHost.startsWith("http")
      ? vercelHost
      : `https://${vercelHost}`;
    return withProtocol.replace(/\/$/, "");
  }

  return "http://localhost:3000";
}
