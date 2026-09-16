import { Button } from "@/components/ui/button";

type AffiliateCtaProps = {
  href: string;
  lead: string;
  buttonText: string;
};

export function AffiliateCta({ href, lead, buttonText }: AffiliateCtaProps) {
  return (
    <div className="not-prose my-8 rounded-lg border border-border bg-muted/20 p-5">
      <p className="mb-4 text-sm leading-relaxed text-foreground">{lead}</p>
      <Button
        size="lg"
        className="h-10 px-5 text-sm"
        nativeButton={false}
        render={
          <a
            href={href}
            target="_blank"
            rel="nofollow sponsored"
          >
            {buttonText}
          </a>
        }
      />
      <p className="mt-2 text-[8px] leading-none text-muted-foreground">PR</p>
    </div>
  );
}
