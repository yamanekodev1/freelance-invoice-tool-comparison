import { Megaphone } from "lucide-react";

export function AffiliateDisclosure() {
  return (
    <div
      role="note"
      className="mb-8 flex gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-100"
    >
      <Megaphone className="mt-0.5 size-4 shrink-0" aria-hidden />
      <p>本記事はプロモーションを含みます</p>
    </div>
  );
}
