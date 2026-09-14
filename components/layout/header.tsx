import Link from "next/link";
import { Container } from "@/components/layout/container";
import { getAllCategories } from "@/lib/categories";
import { SITE_NAME } from "@/lib/constants";

export function Header() {
  const categories = getAllCategories();

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <Container className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {SITE_NAME}
        </Link>
        <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <Link href="/posts" className="hover:text-foreground">
            記事一覧
          </Link>
          <Link href="/about" className="hover:text-foreground">
            運営者情報
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.categorySlug}
              href={`/category/${cat.categorySlug}`}
              className="hover:text-foreground"
            >
              {cat.category}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
