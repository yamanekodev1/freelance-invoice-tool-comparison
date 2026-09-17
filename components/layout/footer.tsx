import Link from "next/link";
import { ContactFormLink } from "@/components/layout/contact-form-link";
import { Container } from "@/components/layout/container";
import { SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border py-8 text-sm text-muted-foreground">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {SITE_NAME}
        </p>
        <nav className="flex flex-wrap gap-x-4 gap-y-2">
          <Link href="/about" className="hover:text-indigo-600">
            運営者情報
          </Link>
          <ContactFormLink />
          <Link href="/privacy" className="hover:text-indigo-600">
            プライバシーポリシー
          </Link>
          <Link href="/disclaimer" className="hover:text-indigo-600">
            免責事項
          </Link>
        </nav>
      </Container>
    </footer>
  );
}
