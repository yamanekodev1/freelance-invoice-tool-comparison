import Link from "next/link";
import type { TocItem } from "@/lib/toc";

type TableOfContentsProps = {
  items: TocItem[];
};

export function TableOfContents({ items }: TableOfContentsProps) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="目次"
      className="rounded-lg border border-indigo-100 bg-indigo-50/30 p-4 text-sm"
    >
      <p className="mb-3 font-medium text-indigo-950">目次</p>
      <ol className="space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            className={item.level === 3 ? "ml-4" : undefined}
          >
            <Link
              href={`#${item.id}`}
              className="text-muted-foreground hover:text-indigo-600 hover:underline"
            >
              {item.text}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
