import { createHash } from "node:crypto";

/** Build URL slug from article title (ASCII preferred; hash fallback for CJK-only titles). */
export function slugFromTitle(title: string): string {
  const normalized = title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[「」『』【】（）()]/g, " ")
    .trim();

  const asciiSlug = normalized
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  if (asciiSlug.length >= 3) {
    return asciiSlug;
  }

  const hash = createHash("sha256").update(title).digest("hex").slice(0, 10);
  return `article-${hash}`;
}
