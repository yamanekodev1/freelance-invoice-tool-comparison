import { Button } from "@/components/ui/button";
import { CONTACT_FORM_URL } from "@/lib/constants";

type ContactFormLinkProps = {
  variant?: "button" | "text";
  className?: string;
};

export function ContactFormLink({
  variant = "text",
  className,
}: ContactFormLinkProps) {
  if (variant === "button") {
    return (
      <Button
        size="lg"
        className="mt-4 bg-indigo-600 text-white hover:bg-indigo-700"
        nativeButton={false}
        render={
          <a
            href={CONTACT_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
          >
            お問い合わせフォーム
          </a>
        }
      />
    );
  }

  return (
    <a
      href={CONTACT_FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className ?? "hover:text-indigo-600"}
    >
      お問い合わせ
    </a>
  );
}
