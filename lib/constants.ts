export const SITE_NAME = "副業エンジニアの業務ハウツー";

export const SITE_DESCRIPTION =
  "副業エンジニア向けのSaaS比較・ハウツーメディア。請求書・会計・契約書など業務効率化の情報を発信します。";

export const POSTS_PER_PAGE = 12;

export const HOME_LATEST_POSTS = 6;

export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  return url ?? "http://localhost:3000";
}
