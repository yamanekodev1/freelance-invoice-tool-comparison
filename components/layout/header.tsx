import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SITE_NAME } from "@/lib/constants";

export function Header() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <Container className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-indigo-700 hover:text-indigo-800"
        >
          {SITE_NAME}
        </Link>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <Link
            href="/posts"
            className="font-medium text-foreground/80 hover:text-indigo-600"
          >
            記事一覧
          </Link>
          <Link
            href="/about"
            className="font-medium text-foreground/80 hover:text-indigo-600"
          >
            運営者情報
          </Link>
        </nav>
      </Container>
    </header>
  );
}
