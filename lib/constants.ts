export const SITE_NAME = "副業エンジニアの活用ガイド";

export const SITE_DESCRIPTION =
  "副業エンジニア向けのSaaS比較・ハウツーメディア。請求書・会計・契約書など業務効率化の情報を発信します。";

export const POSTS_PER_PAGE = 12;

export const HOME_LATEST_POSTS = 6;

/** 本番サイトの公開 URL（canonical / OGP / sitemap の既定値） */
export const PRODUCTION_SITE_URL = "https://sideeng.yamaneko-cafe.com";

export function getSiteUrl(): string {
  const fromPublic = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (fromPublic) {
    return fromPublic;
  }

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  return PRODUCTION_SITE_URL;
}
